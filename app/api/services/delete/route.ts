import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: cookies() }
  );

  const { id } = await req.json();

  const { error } = await supabase.from("services").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ success: false, message: error.message });
  }

  return NextResponse.json({ success: true });
}
