// app/api/team/get/route.ts
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createServerComponentClient({ cookies });

  const result = await supabase
    .from("team_members")
    .select("*")
 .order("display_order", { ascending: true });
  if (result.error) {
    return NextResponse.json({ success: false, message: result.error.message });
  }

  return NextResponse.json({ success: true, team: result.data });
}
