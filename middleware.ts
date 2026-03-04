import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // Simple middleware - just pass through for now
  // TODO: Re-enable Supabase auth when environment variables are configured
  
  // Basic admin route protection without Supabase
  if (request.nextUrl.pathname.startsWith("/admin") && request.nextUrl.pathname !== "/admin/login") {
    // For now, allow access to admin routes
    // TODO: Add proper authentication when Supabase is configured
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
