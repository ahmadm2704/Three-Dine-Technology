// app/actions/admin.ts

"use server"

import { createSession, destroySession } from "@/lib/auth";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  createProject as createProjectInDatabase,
  updateProject,
  deleteProject,
  updateCompanyStat,
  updateContactSubmission,
} from "@/lib/database";
import { isSupabaseConfigured } from "@/lib/supabase";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcryptjs";

const contactStatusEnum = z.enum(["new", "in_progress", "responded", "closed"]);
type ContactStatus = z.infer<typeof contactStatusEnum>;

const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  client_name: z.string().min(1, "Client name is required"),
  client_email: z.string().email().optional().or(z.literal("")),
  client_phone: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(["planning", "in_progress", "completed", "on_hold", "cancelled"]),
  project_type: z.string().min(1, "Project type is required"),
  budget: z.number().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  completion_percentage: z.number().min(0).max(100),
  technologies: z.array(z.string()),
  is_featured: z.boolean(),
  is_public: z.boolean(),
});

function getFormData(formData: FormData) {
  const status = formData.get("status") as string;
  if (!["planning", "in_progress", "completed", "on_hold", "cancelled"].includes(status)) {
    throw new Error("Invalid project status value");
  }
  return {
    name: formData.get("name") as string || "",
    client_name: formData.get("client_name") as string || "",
    client_email: formData.get("client_email") as string || "",
    client_phone: formData.get("client_phone") as string || "",
    description: formData.get("description") as string || "",
    status: status as "planning" | "in_progress" | "completed" | "on_hold" | "cancelled",
    project_type: formData.get("project_type") as string || "",
    budget: formData.get("budget") ? Number.parseFloat(formData.get("budget") as string) : undefined,
    start_date: formData.get("start_date") as string || "",
    end_date: formData.get("end_date") as string || "",
    completion_percentage: formData.get("completion_percentage")
      ? Number.parseInt(formData.get("completion_percentage") as string)
      : 0,
    technologies: formData.get("technologies") ? JSON.parse(formData.get("technologies") as string) : [],
    is_featured: formData.get("is_featured") === "true",
    is_public: formData.get("is_public") === "true",
  };
}

export async function upsertTeamMember(formData: FormData, id?: string) {
  try {
    const supabase = createServerComponentClient({ cookies });
    const data = {
      name: formData.get("name"),
      role: formData.get("role"),
      image_url: formData.get("image_url"),
      bio: formData.get("bio"),
      skills: formData.get("skills") ? JSON.parse(formData.get("skills") as string) : [],
      email: formData.get("email"),
      linkedin: formData.get("linkedin"),
      github: formData.get("github"),
      twitter: formData.get("twitter"),
    };

    const result = id
      ? await supabase.from("teams").update(data).eq("id", id)
      : await supabase.from("teams").insert([data]);

    if (result.error) throw result.error;

    return {
      success: true,
      message: id ? "Team member updated" : "Team member created",
      data: result.data?.[0] || null,
    };
  } catch (error) {
    console.error("Upsert team member error:", error);
    return { success: false, message: "Error saving team member" };
  }
}

export async function fetchTeamMembers() {
  try {
    const supabase = createServerComponentClient({ cookies });
    const { data, error } = await supabase.from("teams").select("*");
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Fetch team members error:", error);
    return [];
  }
}

export async function upsertService(formData: FormData, id?: string) {
  try {
    const supabase = createServerComponentClient({ cookies });
    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
      icon: formData.get("icon"),
    };
    const result = id
      ? await supabase.from("services").update(data).eq("id", id)
      : await supabase.from("services").insert([data]);
    if (result.error) throw result.error;
    return { success: true, message: id ? "Service updated" : "Service created" };
  } catch (error) {
    console.error("Upsert service error:", error);
    return { success: false, message: "Error saving service" };
  }
}

export async function deleteTeamMember(id: string) {
  try {
    const supabase = createServerComponentClient({ cookies });
    const { error } = await supabase.from("teams").delete().eq("id", id);
    if (error) throw error;
    return { success: true, message: "Team member deleted" };
  } catch (error) {
    return { success: false, message: "Error deleting team member" };
  }
}

export async function deleteService(id: string) {
  try {
    const supabase = createServerComponentClient({ cookies });
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) throw error;
    return { success: true, message: "Service deleted" };
  } catch (error) {
    return { success: false, message: "Error deleting service" };
  }
}



export async function adminSignIn(formData: FormData) {
  try {
    const email = (formData.get("email") as string).trim();
    const password = (formData.get("password") as string).trim();

    const supabase = createServerComponentClient({ cookies });
    const { data: admin, error } = await supabase
      .from("admin_users")
      .select("id, email, password_hash")
      .eq("email", email)
      .maybeSingle();

    if (error || !admin) {
      console.error("Admin not found or Supabase error", error);
      return { success: false, message: "Invalid credentials or Supabase error" };
    }

    const isMatch = await bcrypt.compare(password, admin.password_hash);
    if (!isMatch) {
      return { success: false, message: "Invalid email or password." };
    }

    const cookieStore = cookies();
    await cookieStore.set("admin-session", admin.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
    });

    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    console.error("Admin sign in error:", error);
    return { success: false, message: "Server error during sign in" };
  }
}


export async function adminSignOut() {
  const cookieStore = await cookies();
  cookieStore.delete("admin-session");
  redirect("/admin/login");
}

export async function verifyAdminAuth() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin-session")?.value;
    if (!session) return null;
    return { userId: session, role: "admin" };
  } catch (error) {
    console.error("Verify admin auth error:", JSON.stringify(error, null, 2));
    return null;
  }
}

export async function createProjectAction(formData: FormData) {
  try {
    const auth = await verifyAdminAuth();
    if (!auth) return { success: false, message: "Unauthorized" };

    const parsed = projectSchema.parse(getFormData(formData));
    console.log("Parsed Data:", parsed);

    const sanitizedData = {
      ...parsed,
      start_date: parsed.start_date === "" ? null : parsed.start_date,
      end_date: parsed.end_date === "" ? null : parsed.end_date,
    };

    const supabase = createServerComponentClient({ cookies });
    const { error } = await supabase.from("projects").insert([sanitizedData]);

    if (error) {
      console.error("Supabase Error:", error);
      return { success: false, message: error.message };
    }

    return { success: true, message: "Project created successfully" };
  } catch (error) {
    console.error("Create project error:", error);
    return {
      success: false,
      message:
        error instanceof z.ZodError
          ? error.errors?.[0]?.message
          : error instanceof Error
          ? error.message
          : "Failed to create project",
    };
  }
}

export async function updateProjectAction(id: string, formData: FormData) {
  try {
    const auth = await verifyAdminAuth();
    if (!auth) return { success: false, message: "Unauthorized" };

    const parsed = projectSchema.parse(getFormData(formData));

    const sanitizedData = {
      ...parsed,
      start_date: parsed.start_date === "" ? null : parsed.start_date,
      end_date: parsed.end_date === "" ? null : parsed.end_date,
    };

    const supabase = createServerComponentClient({ cookies });
    const { error } = await supabase.from("projects").update(sanitizedData).eq("id", id);

    if (error) {
      console.error("Update project error:", error);
      return { success: false, message: error.message };
    }

    return { success: true, message: "Project updated successfully" };
  } catch (error) {
    console.error("Update project exception:", error);
    return {
      success: false,
      message:
        error instanceof z.ZodError
          ? error.errors[0].message
          : error instanceof Error
          ? error.message
          : "Failed to update project",
    };
  }
}

export async function deleteProjectAction(id: string) {
  try {
    const auth = await verifyAdminAuth();
    if (!auth) return { success: false, message: "Unauthorized" };

    if (!isSupabaseConfigured) return { success: false, message: "Supabase not configured - demo mode only" };

    const supabase = createServerComponentClient({ cookies });
    await deleteProject(id);

    return { success: true, message: "Project deleted successfully" };
  } catch (error) {
    console.error("Delete project error:", JSON.stringify(error, null, 2));
    return { success: false, message: "Failed to delete project" };
  }
}

export async function updateContactAction(id: string, formData: FormData) {
  try {
    const auth = await verifyAdminAuth();
    if (!auth) return { success: false, message: "Unauthorized" };

    if (!isSupabaseConfigured) return { success: false, message: "Supabase not configured - demo mode only" };

    const status = (formData.get("status") as string) || "new";
    const admin_notes = (formData.get("admin_notes") as string) || "";

    const parsedStatus = contactStatusEnum.parse(status);

    const supabase = createServerComponentClient({ cookies });
    await updateContactSubmission(id, { status: parsedStatus, admin_notes });

    return { success: true, message: "Contact updated successfully" };
  } catch (error) {
    console.error("Update contact error:", JSON.stringify(error, null, 2));
    return {
      success: false,
      message:
        error instanceof z.ZodError
          ? error.errors[0].message
          : error instanceof Error
          ? error.message
          : "Failed to update contact",
    };
  }
}

export async function updateStatsAction(formData: FormData) {
  try {
    const supabase = createServerComponentClient({ cookies });
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Fallback to custom admin-session if Supabase auth fails
    let authenticated = false;
    if (!user) {
      const cookieStore = await cookies();
      const session = cookieStore.get("admin-session")?.value;
      if (session) {
        console.log("Using fallback admin session:", session, "at", new Date().toISOString());
        authenticated = true;
      } else {
        console.log("No authenticated user or session found at", new Date().toISOString());
        return { success: false, message: "No authenticated user found" };
      }
    } else {
      console.log("Authenticated user found:", user.id, "at", new Date().toISOString());
      authenticated = true;
    }

    if (!authenticated || !isSupabaseConfigured) {
      console.log("Authentication failed or Supabase not configured at", new Date().toISOString());
      return { success: false, message: "Supabase not configured or unauthorized" };
    }

    // Log all form data to verify input
    console.log("Received form data at", new Date().toISOString());
    for (const [key, value] of formData.entries()) {
      console.log(`  ${key}: ${value}`);
    }

    const stats = [
      { name: "projects_completed", value: formData.get("projects_completed") as string || "" },
      { name: "happy_clients", value: formData.get("happy_clients") as string || "" },
      { name: "years_experience", value: formData.get("years_experience") as string || "" },
      { name: "client_satisfaction", value: formData.get("client_satisfaction") as string || "" },
    ];

    for (const stat of stats) {
      if (stat.value && stat.value.trim() !== "") {
        console.log(`Attempting to upsert stat: ${stat.name} with value: ${stat.value} at`, new Date().toISOString());
        const response = await supabase
          .from("company_stats")
          .upsert(
            { stat_name: stat.name, stat_value: stat.value.trim(), stat_label: stat.name },
            { onConflict: "stat_name" }
          )
          .select("*");

        const { error, data, status } = response;

        console.log(`Upsert result for ${stat.name} at`, new Date().toISOString(), { error, data, status });

        if (error) {
          console.error(`Update stat error for ${stat.name} at`, new Date().toISOString(), error);
          return { success: false, message: `Failed to update ${stat.name}: ${error.message || "Unknown error"}` };
        }

        if (!data || (Array.isArray(data) && data.length === 0)) {
          console.warn(`No data returned for ${stat.name} at`, new Date().toISOString(), { data });
          return { success: false, message: `No data updated for ${stat.name}` };
        }

        console.log(`Successfully upserted ${stat.name} with data:`, data);
      } else {
        console.log(`Skipping ${stat.name} due to empty or invalid value at`, new Date().toISOString());
      }
    }

    return {
      success: true,
      message: "Stats updated successfully",
    };
  } catch (error) {
    console.error("Update stats error (catch block) at", new Date().toISOString(), {
      error: error instanceof Error ? error.message : JSON.stringify(error, null, 2),
      stack: error instanceof Error ? error.stack : undefined,
    });
    return {
      success: false,
      message: "Failed to update stats",
    };
  }
}

export async function loginAction(formData: FormData) {
  const email = (formData.get("email") as string) || "";
  const password = (formData.get("password") as string) || "";

  if (email === "admin@threedinetech.com" && password === "password") {
    const user = { id: "1", email, name: "Admin User", role: "admin" };
    await createSession(user);
    redirect("/admin/dashboard");
  } else {
    throw new Error("Invalid credentials");
  }
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}

export async function updateTeamMember(formData: FormData) {
  try {
    const name = (formData.get("name") as string) || "";
    const role = (formData.get("role") as string) || "";
    const bio = (formData.get("bio") as string) || "";

    console.log("Updating team member:", { name, role, bio });

    return { success: true, message: "Team member updated successfully" };
  } catch (error) {
    console.error("Update team member error:", JSON.stringify(error, null, 2));
    return { success: false, message: "Failed to update team member" };
  }
}