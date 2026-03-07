"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { ArrowRight, Download, FileText } from "lucide-react";
import { useEffect, useState } from "react";

type Publication = {
    id: string;
    title: string;
    abstract: string | null;
    file_url: string | null;
    publication_date: string | null;
    authors: string[] | null;
};

export default function ResearchPublicationsPage() {
    const supabase = createClient();
    const [publications, setPublications] = useState<Publication[]>([]);

    useEffect(() => {
        async function fetchPublications() {
            const { data } = await supabase
                .from("research_papers")
                .select("id, title, abstract, file_url, publication_date, authors")
                .order("publication_date", { ascending: false });

            setPublications((data as Publication[]) || []);
        }

        fetchPublications();
    }, []);

    return (
        <div className="bg-white dark:bg-gray-950 text-black dark:text-white min-h-screen">
            <section className="py-24 px-4 text-center border-b border-black dark:border-gray-700">
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">Our Publications</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">Research papers and publication records managed from the admin panel.</p>
            </section>

            <section className="max-w-5xl mx-auto px-4 py-16">
                <div className="space-y-4">
                    {publications.length === 0 ? (
                        <div className="text-center text-gray-500 italic py-12">No publications available at this time. Add one from research admin.</div>
                    ) : (
                        publications.map((publication) => (
                            <div key={publication.id} className="flex flex-col md:flex-row items-start border border-black dark:border-gray-700 p-6 hover:shadow-lg transition-all gap-6">
                                <div className="w-12 h-12 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shrink-0">
                                    <FileText className="w-6 h-6" />
                                </div>

                                <div className="flex-grow">
                                    <div className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-1">Publication</div>
                                    <h3 className="text-xl font-bold uppercase">{publication.title}</h3>
                                    <div className="text-sm text-gray-500 mt-1">
                                        Published: {publication.publication_date || "Date not set"}
                                    </div>
                                    {publication.authors?.length ? (
                                        <div className="text-sm text-gray-500 mt-1">Authors: {publication.authors.join(", ")}</div>
                                    ) : null}
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">{publication.abstract || "No abstract provided."}</p>
                                </div>

                                {publication.file_url ? (
                                    <a href={publication.file_url} target="_blank" rel="noreferrer" className="flex items-center px-6 py-3 border-2 border-black dark:border-white font-bold uppercase text-sm hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors shrink-0">
                                        Download <Download className="ml-2 w-4 h-4" />
                                    </a>
                                ) : (
                                    <span className="px-6 py-3 border-2 border-gray-200 text-gray-400 font-bold uppercase text-sm cursor-not-allowed shrink-0">
                                        Unavailable
                                    </span>
                                )}
                            </div>
                        ))
                    )}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">Looking for tailored academic help?</p>
                    <Link href="/research/contact" className="inline-flex items-center font-bold uppercase border-b-2 border-black dark:border-white pb-1 hover:text-blue-600 hover:border-blue-600 transition-colors">
                        Contact Research Team <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                </div>
            </section>
        </div>
    );
}