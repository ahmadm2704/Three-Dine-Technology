"use client";

import { createClient } from "@/lib/supabase/client";
import { ClipboardList, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

type CaseStudy = {
    id: string;
    title: string;
    summary: string | null;
    category: string | null;
    client_name: string | null;
    link_url: string | null;
};

export default function ResearchCaseStudiesPage() {
    const supabase = createClient();
    const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);

    useEffect(() => {
        async function fetchCaseStudies() {
            const { data } = await supabase
                .from("research_case_studies")
                .select("id, title, summary, category, client_name, link_url")
                .eq("is_published", true)
                .order("sort_order", { ascending: true })
                .order("created_at", { ascending: false });

            setCaseStudies((data as CaseStudy[]) || []);
        }

        fetchCaseStudies();
    }, []);

    return (
        <div className="bg-white dark:bg-gray-950 text-black dark:text-white min-h-screen">
            <section className="py-24 px-4 text-center border-b border-black dark:border-gray-700">
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">Case Studies</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">Admin-managed research outcomes, implementation stories, and academic impact snapshots.</p>
            </section>

            <section className="max-w-6xl mx-auto px-4 py-16">
                {caseStudies.length === 0 ? (
                    <div className="border border-black dark:border-gray-700 p-10 text-center text-gray-500 italic">
                        No case studies available yet. Add one from research admin.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {caseStudies.map((caseStudy) => (
                            <div key={caseStudy.id} className="border border-black dark:border-gray-700 p-8 flex flex-col h-full hover:shadow-xl transition-all">
                                <div className="w-14 h-14 mb-6 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center">
                                    <ClipboardList className="w-7 h-7" />
                                </div>
                                <div className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">{caseStudy.category || "Case Study"}</div>
                                <h2 className="text-2xl font-black uppercase leading-tight mb-4">{caseStudy.title}</h2>
                                {caseStudy.client_name ? (
                                    <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">{caseStudy.client_name}</p>
                                ) : null}
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed flex-grow">{caseStudy.summary || "No summary provided."}</p>
                                {caseStudy.link_url ? (
                                    <a href={caseStudy.link_url} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center font-bold uppercase text-sm hover:text-blue-600 transition-colors">
                                        Read Case Study <ArrowUpRight className="w-4 h-4 ml-2" />
                                    </a>
                                ) : null}
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}