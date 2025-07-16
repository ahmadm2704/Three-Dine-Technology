import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: cookies() }
  );

  try {
    const body = await req.json();
    const {
      id,
      title,
      slug,
      description,
      features,
      technologies,
      icon,
      image_url,
    } = body;

    const payload = {
      title,
      slug,
      description,
      features,
      technologies,
      icon,
      image_url,
      updated_at: new Date().toISOString(),
    };

    let result;

    if (id) {
      // ✏️ UPDATE logic
      result = await supabase.from("services").update(payload).eq("id", id);
    } else {
      // 📌 CREATE logic: determine display_order
      const { data: existing, error: fetchError } = await supabase
        .from("services")
        .select("display_order")
        .order("display_order", { ascending: false })
        .limit(1);

      if (fetchError) {
        return NextResponse.json({ success: false, message: fetchError.message });
      }

      const nextOrder = existing?.[0]?.display_order + 1 || 1;

      result = await supabase.from("services").insert([
        {
          ...payload,
          created_at: new Date().toISOString(),
          display_order: nextOrder,
          is_active: true, // optional default
        },
      ]);
    }

    if (result.error) {
      return NextResponse.json({ success: false, message: result.error.message });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: "Internal Server Error" });
  }
}
