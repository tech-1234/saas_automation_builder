import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware((auth, req) => {
  const res = NextResponse.next();

  /*
  .
  . check for authenticated user and redirect to the respective page
  .
  const url = new URL(req.url);
  const { userId } = auth();

  if (url.pathname.startsWith("/auth")) {
    if (userId) return NextResponse.redirect(new URL("/profile", url));
    return res;
  }

  if (!userId) return NextResponse.redirect(new URL("/auth", url));
  .
  .
  .
  */

  return res;
});

export const config = {
  matcher: [
    "/auth/:path*",
    "/api/clerk-webhook",
    "/api/drive-activity/:path*",
    "/",
  ],
};
