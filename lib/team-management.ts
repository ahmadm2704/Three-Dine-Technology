import { supabase, isSupabaseConfigured } from "./supabase"
import type { TeamMember } from "./database"

export async function createTeamMember(memberData: Omit<TeamMember, "id">) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase not configured")
  }

  const { data, error } = await supabase.from("team_members").insert([memberData]).select().single()

  if (error) {
    throw error
  }

  return data as TeamMember
}

export async function updateTeamMember(id: string, updates: Partial<TeamMember>) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase not configured")
  }

  const { data, error } = await supabase.from("team_members").update(updates).eq("id", id).select().single()

  if (error) {
    throw error
  }

  return data as TeamMember
}

export async function deleteTeamMember(id: string) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase not configured")
  }

  // Also delete the image from storage if it exists
  const { data: member } = await supabase.from("team_members").select("image_url").eq("id", id).single()

  if (member?.image_url) {
    const imagePath = member.image_url.split("/").pop()
    if (imagePath) {
      await supabase.storage.from("team-images").remove([`team-members/${imagePath}`])
    }
  }

  const { error } = await supabase.from("team_members").delete().eq("id", id)

  if (error) {
    throw error
  }
}

export async function uploadTeamImage(file: File, teamMemberId: string): Promise<string> {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase not configured")
  }

  const fileExt = file.name.split(".").pop()
  const fileName = `${teamMemberId}.${fileExt}`
  const filePath = `team-members/${fileName}`

  const { error: uploadError } = await supabase.storage.from("team-images").upload(filePath, file, {
    upsert: true,
  })

  if (uploadError) {
    throw uploadError
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("team-images").getPublicUrl(filePath)

  return publicUrl
}
