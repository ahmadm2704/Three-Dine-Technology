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

// GET - List all admin users (super_admin only)
export async function GET() {
  const session = getSession();
  if (!session || session.role !== "super_admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("admin_users")
    .select("id, email, name, role, created_at")
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }

  return NextResponse.json({ users: data });
}

// POST - Create new admin user (super_admin only)
export async function POST(req: Request) {
  const session = getSession();
  if (!session || session.role !== "super_admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const validRoles = ["super_admin", "tech_admin", "research_admin"];
    if (!validRoles.includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    const supabase = getSupabase();

    // Check if email already exists
    const { data: existing } = await supabase
      .from("admin_users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const { error } = await supabase.from("admin_users").insert({
      name,
      email,
      password_hash,
      role,
    });

    if (error) {
      console.error("Create admin error:", error);
      return NextResponse.json({ error: "Failed to create admin" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
