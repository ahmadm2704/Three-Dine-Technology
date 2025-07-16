// /app/api/team/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises"; // ✅ FIXED
import path from "path";
import { v4 as uuid } from "uuid";
// This must be enabled to handle FormData
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file: File | null = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${uuid()}_${file.name.replaceAll(" ", "_")}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");

  try {
    await writeFile(`${uploadDir}/${filename}`, buffer);
    return NextResponse.json({
      success: true,
      imageUrl: `/uploads/${filename}`,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, message: "Upload failed" }, { status: 500 });
  }
}
