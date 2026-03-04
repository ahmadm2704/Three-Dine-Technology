// app/api/team/get/route.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const result = await supabase
    .from("team_members")
    .select("*")
 .order("display_order", { ascending: true });
  if (result.error) {
    return NextResponse.json({ success: false, message: result.error.message });
  }

  return NextResponse.json({ success: true, team: result.data });
}
