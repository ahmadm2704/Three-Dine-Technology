// /middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get("admin-session")?.value;
  const isLoginPage = request.nextUrl.pathname === "/admin/login";

  // Redirect to login if not logged in and accessing any /admin route
  if (request.nextUrl.pathname.startsWith("/admin") && !isLoginPage && !isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
