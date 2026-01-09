import { createClient } from "@/lib/supabase/server";
import PortfolioClient from "./client";

export const dynamic = 'force-dynamic'; // Ensure we fetch fresh data

export default async function PortfolioPage() {
  const supabase = createClient();

  // Fetch projects from DB
  const { data: projects } = await supabase
    .from("tech_projects")
    .select("*")
    .order("is_featured", { ascending: false });

  // Use DB data if available, otherwise fall back to empty array or handle error
  // If no DB setup yet, this might return null/empty.

  return <PortfolioClient projects={projects || []} />;
}