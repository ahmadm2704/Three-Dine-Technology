import { type NextRequest, NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // Protect /admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {

    // 1. Not Logged In -> Login Page
    if (!user && request.nextUrl.pathname !== "/admin/login") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // 2. Logged In -> Check Role
    if (user) {
      // If on login page, go to dashboard
      if (request.nextUrl.pathname === "/admin/login") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }

      // Fetch Role
      const { data: adminProfile } = await supabase
        .from('admins')
        .select('role')
        .eq('id', user.id)
        .single();

      const role = adminProfile?.role; // super_admin, tech_admin, research_admin

      // Tech Routes Protection
      if (request.nextUrl.pathname.startsWith("/admin/technology") && role !== 'super_admin' && role !== 'tech_admin') {
        // If a research admin tries to access tech -> redirect to research or dashboard
        return NextResponse.redirect(new URL("/admin/dashboard?error=unauthorized", request.url));
      }

      // Research Routes Protection
      if (request.nextUrl.pathname.startsWith("/admin/research") && role !== 'super_admin' && role !== 'research_admin') {
        // If a tech admin tries to access research -> redirect to technology or dashboard
        return NextResponse.redirect(new URL("/admin/dashboard?error=unauthorized", request.url));
      }
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
