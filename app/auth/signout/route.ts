import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    cookies().delete("admin-session");
    cookies().delete("admin-role");
    return NextResponse.redirect(new URL("/admin/login", request.url));
}
