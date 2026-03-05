import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function getSession() {
  try {
    const session = cookies().get("admin-session")?.value;
    if (!session) return null;
    return JSON.parse(session) as { id: string; email: string; name: string; role: string };
  } catch {
    return null;
  }
}

// PATCH - Update admin user (super_admin only)
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = getSession();
  if (!session || session.role !== "super_admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const { name, role, password } = await req.json();
    const supabase = getSupabase();

    const updateData: Record<string, string> = {};
    if (name) updateData.name = name;
    if (role) {
      const validRoles = ["super_admin", "tech_admin", "research_admin"];
      if (!validRoles.includes(role)) {
        return NextResponse.json({ error: "Invalid role" }, { status: 400 });
      }
      updateData.role = role;
    }
    if (password) {
      if (password.length < 6) {
        return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
      }
      updateData.password_hash = await bcrypt.hash(password, 10);
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }

    const { error } = await supabase
      .from("admin_users")
      .update(updateData)
      .eq("id", params.id);

    if (error) {
      console.error("Update admin error:", error);
      return NextResponse.json({ error: "Failed to update admin" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE - Delete admin user (super_admin only, cannot delete self)
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = getSession();
  if (!session || session.role !== "super_admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  if (params.id === session.id) {
    return NextResponse.json({ error: "Cannot delete your own account" }, { status: 400 });
  }

  const supabase = getSupabase();
  const { error } = await supabase
    .from("admin_users")
    .delete()
    .eq("id", params.id);

  if (error) {
    console.error("Delete admin error:", error);
    return NextResponse.json({ error: "Failed to delete admin" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
