import { createClient } from "@/lib/supabase/server";
import ResearchSamplesClient from "./client";

export const dynamic = 'force-dynamic';

export default async function ResearchSamplesPage() {
    const supabase = createClient();

    const { data: papers } = await supabase
        .from("research_papers")
        .select("*")
        .order("publication_date", { ascending: false });

    return <ResearchSamplesClient samples={papers || []} />;
}
