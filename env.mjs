import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z
      .string()
      .url()
      .regex(/postgres/),
    CLERK_SECRET_KEY: z.string().min(1, "Missing CLERK_SECRET_KEY"),
    SVIX_SECRET: z
      .string()
      .min(1, "Missing SVIX_SECRET")
      .regex(/^whsec_/),
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
  },
  client: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
    NEXT_PUBLIC_UPLOAD_CARE_CSS_SRC: z.string().url(),
    NEXT_PUBLIC_UPLOAD_CARE_SRC_PACKAGE: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_UPLOAD_CARE_CSS_SRC:
      process.env.NEXT_PUBLIC_UPLOAD_CARE_CSS_SRC,
    NEXT_PUBLIC_UPLOAD_CARE_SRC_PACKAGE:
      process.env.NEXT_PUBLIC_UPLOAD_CARE_SRC_PACKAGE,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,

    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    SVIX_SECRET: process.env.SVIX_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
  },
});
