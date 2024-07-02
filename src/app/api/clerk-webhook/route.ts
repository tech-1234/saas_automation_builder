import { env } from "@/../env.mjs";
import { db } from "@/lib/db";
import {
  userDeleteSchema,
  userWebhookSchema,
  WebhookData,
  webhookSchema,
} from "@/lib/validation/webhook";
import { SvixHeaders } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    const headers: SvixHeaders = {
      "svix-id": req.headers.get("svix-id")!,
      "svix-timestamp": req.headers.get("svix-timestamp")!,
      "svix-signature": req.headers.get("svix-signature")!,
    };

    const wh = new Webhook(env.SVIX_SECRET);
    let body: WebhookData;

    try {
      body = wh.verify(JSON.stringify(payload), headers) as WebhookData;
    } catch (err) {
      return new NextResponse("Invalid webhook signature", { status: 400 });
    }

    const { type, data } = webhookSchema.parse(body);

    switch (type) {
      case "user.created": {
        const user = userWebhookSchema.parse(data);

        await db.user.create({
          data: {
            clerkId: user.id,
            email: user.email_addresses[0]?.email_address,
            name: user.first_name,
            profileImage: user.image_url,
          },
        });

        return new NextResponse("User created in database successfully", {
          status: 201,
        });
      }

      case "user.updated": {
        const user = userWebhookSchema.parse(data);

        await db.user.update({
          where: { clerkId: user.id },
          data: {
            email: user.email_addresses[0]?.email_address,
            name: user.first_name,
            profileImage: user.image_url,
          },
        });

        return new NextResponse("User updated in database successfully", {
          status: 200,
        });
      }

      case "user.deleted": {
        const { id } = userDeleteSchema.parse(data);

        await db.user.delete({
          where: { clerkId: id },
        });

        return new NextResponse("User deleted from database successfully", {
          status: 200,
        });
      }
    }
  } catch (error) {
    console.error("Error updating database:", error);
    return new NextResponse("Error updating user in database", { status: 500 });
  }
}
