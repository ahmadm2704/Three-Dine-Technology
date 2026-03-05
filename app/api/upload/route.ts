import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuid } from "uuid";

export const dynamic = "force-dynamic";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file: File | null = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ success: false, message: "Invalid file type. Only JPEG, PNG, GIF, WebP, SVG allowed." }, { status: 400 });
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ success: false, message: "File too large. Max 5MB." }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = file.name.split(".").pop() || "jpg";
    const filename = `${uuid()}.${ext}`;
    const filePath = `uploads/${filename}`;

    const { error } = await supabase.storage
      .from("team-images")
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (error) {
      console.error("Supabase upload error:", error);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    const { data: { publicUrl } } = supabase.storage
      .from("team-images")
      .getPublicUrl(filePath);

    return NextResponse.json({
      success: true,
      url: publicUrl,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, message: "Upload failed" }, { status: 500 });
  }
}
