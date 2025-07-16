import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: cookies() }
  );

  try {
    const body = await req.json();
    const {
      id,
      name,
      role,
      bio,
      skills,
      image_url,
      email,
      linkedin,
      twitter,
      github,
    } = body;

    if (!name || !role) {
      return NextResponse.json({ success: false, message: "Name and role are required." }, { status: 400 });
    }

    const payload = {
      name,
      role,
      bio,
      email,
      linkedin_url: linkedin || null,
      twitter_url: twitter || null,
      github_url: github || null,
      skills,
      image_url: image_url || null,
      updated_at: new Date().toISOString(),
    };

    if (id) {
      // Update existing member
      const { error } = await supabase.from("team_members").update(payload).eq("id", id);
      if (error) throw error;
    } else {
      // Get max display_order
      const { data: maxOrderData, error: orderError } = await supabase
        .from("team_members")
        .select("display_order")
        .order("display_order", { ascending: false })
        .limit(1)
        .single();

      const newDisplayOrder = maxOrderData?.display_order ? maxOrderData.display_order + 1 : 0;

      const insertData = {
        ...payload,
        display_order: newDisplayOrder,
        created_at: new Date().toISOString(),
      };

      const { error } = await supabase.from("team_members").insert(insertData);
      if (error) throw error;
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Team Create Error:", err.message || err);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
