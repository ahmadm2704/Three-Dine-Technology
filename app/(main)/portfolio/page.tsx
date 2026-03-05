"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import PortfolioClient from "./client";
import { createClient } from "@/lib/supabase/client";

const fallbackProjects = [
  {
    id: "1",
    title: "E-commerce Platform",
    client: "TechCorp Inc.",
    description: "Modern e-commerce platform with advanced features",
    category: "Full Stack",
    tech_stack: ["React", "Node.js", "PostgreSQL"],
    demo_url: "#",
    image_url: "",
  },
  {
    id: "2",
    title: "Mobile Banking App",
    client: "FinanceFirst",
    description: "Secure mobile banking application",
    category: "Full Stack",
    tech_stack: ["React Native", "Node.js"],
    demo_url: "#",
    image_url: "",
  },
];

export default function PortfolioPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("is_public", true)
          .order("created_at", { ascending: false });

        if (error || !data || data.length === 0) {
          setProjects(fallbackProjects);
        } else {
          setProjects(
            data.map((p: any) => ({
              id: p.id,
              title: p.name,
              client: p.client_name,
              description: p.description,
              category: p.project_type || "Full Stack",
              tech_stack: p.technologies || [],
              demo_url: p.demo_url || "#",
              image_url: p.image_url || "",
            }))
          );
        }
      } catch {
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0f1c] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return <PortfolioClient projects={projects} />;
}