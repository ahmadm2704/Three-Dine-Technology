"use client";

import { Globe, GraduationCap, ArrowUpRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useMemo, useState } from "react";

type CommunityUniversity = {
    id: string;
    name: string;
    location: string | null;
    website_url: string | null;
    logo_url: string | null;
};

export default function ResearchUniversitiesPage() {
    const supabase = createClient();
    const [universities, setUniversities] = useState<CommunityUniversity[]>([]);

    useEffect(() => {
        async function fetchUniversities() {
            const { data } = await supabase
                .from("research_partners")
                .select("id, name, location, website_url, logo_url")
                .order("location", { ascending: true })
                .order("name", { ascending: true });

            setUniversities((data as CommunityUniversity[]) || []);
        }

        fetchUniversities();
    }, []);

    const groupedUniversities = useMemo(() => {
        return universities.reduce((acc, university) => {
            const country = (university.location || "Unassigned").trim() || "Unassigned";
            if (!acc[country]) acc[country] = [];
            acc[country].push(university);
            return acc;
        }, {} as Record<string, CommunityUniversity[]>);
    }, [universities]);

    const countries = Object.entries(groupedUniversities);

    return (
        <div className="bg-white dark:bg-gray-950 text-black dark:text-white">
            <section className="bg-black text-white py-24 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
                        Global Community
                    </h1>
                    <p className="text-xl text-gray-400">Universities grouped by country and managed from the research admin panel.</p>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 py-24">
                {countries.length === 0 ? (
                    <div className="border border-black dark:border-gray-700 p-10 text-center text-gray-500 italic">
                        No countries or universities have been added yet.
                    </div>
                ) : (
                    <div className="space-y-12">
                        {countries.map(([country, countryUniversities]) => (
                            <div key={country} className="border border-black dark:border-gray-700">
                                <div className="border-b border-black dark:border-gray-700 px-8 py-6 bg-gray-50 dark:bg-gray-900 flex items-center justify-between gap-4 flex-wrap">
                                    <div>
                                        <h2 className="text-3xl font-black uppercase tracking-tight">{country}</h2>
                                        <p className="text-sm uppercase tracking-widest text-gray-500 mt-1">
                                            {countryUniversities.length} universit{countryUniversities.length === 1 ? "y" : "ies"}
                                        </p>
                                    </div>
                                    <div className="flex items-center text-sm font-bold uppercase tracking-widest text-gray-500">
                                        <Globe className="w-4 h-4 mr-2" /> Country Group
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
                                    {countryUniversities.map((university) => (
                                        <div key={university.id} className="p-8 border-b md:border-b-0 md:border-r border-black dark:border-gray-700 last:border-r-0 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all group">
                                            <div className="w-16 h-16 mb-6 bg-gray-100 dark:bg-gray-800 text-black dark:text-white flex items-center justify-center rounded-none group-hover:bg-white dark:group-hover:bg-black transition-colors overflow-hidden">
                                                {university.logo_url ? (
                                                    <img src={university.logo_url} alt={university.name} className="max-w-full max-h-full object-contain p-2" />
                                                ) : (
                                                    <GraduationCap className="w-8 h-8" />
                                                )}
                                            </div>
                                            <h3 className="text-2xl font-bold uppercase mb-2">{university.name}</h3>
                                            <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-300 dark:group-hover:text-gray-700 leading-relaxed font-light mb-4">
                                                Part of the Three Dine global learners community in {country}.
                                            </p>
                                            {university.website_url ? (
                                                <a href={university.website_url} target="_blank" rel="noreferrer" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-blue-600 group-hover:text-white dark:group-hover:text-black">
                                                    Visit University <ArrowUpRight className="w-3.5 h-3.5 ml-2" />
                                                </a>
                                            ) : null}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}
