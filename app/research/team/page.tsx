"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const fallbackTeam = [
    { name: "Dr. Sarah Chen", role: "Principal Investigator", bio: "Leading our AI Ethics and Machine Learning research program." },
    { name: "Dr. Alex Morgan", role: "Head of Data Science", bio: "Specializing in large-scale data mining and computational models." },
    { name: "Dr. Emily Johnson", role: "Quantum Computing Lead", bio: "Pioneering quantum algorithms for real-world applications." },
    { name: "Dr. Marcus Lee", role: "Neuroscience Researcher", bio: "Exploring the intersection of cognitive science and artificial intelligence." },
];

export default function ResearchTeamPage() {
    const [team, setTeam] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTeam() {
            try {
                const supabase = createClient();
                const { data, error } = await supabase
                    .from("research_team")
                    .select("*")
                    .order("created_at", { ascending: true });

                if (error || !data || data.length === 0) {
                    setTeam(fallbackTeam);
                } else {
                    setTeam(data);
                }
            } catch {
                setTeam(fallbackTeam);
            } finally {
                setLoading(false);
            }
        }
        fetchTeam();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-950 text-black dark:text-white min-h-screen">
            {/* HERO */}
            <section className="bg-black text-white py-24 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
                        Our Scientists
                    </h1>
                    <p className="text-xl text-gray-400">The minds driving Three Dine Research forward.</p>
                </div>
            </section>

            {/* TEAM GRID */}
            <section className="max-w-7xl mx-auto px-4 py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {team.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group text-center"
                        >
                            <div className="w-full aspect-square bg-gray-100 dark:bg-gray-800 mb-8 flex items-center justify-center relative overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                                {member.image_url ? (
                                    <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-20 h-20 text-gray-300 dark:text-gray-600" />
                                )}
                            </div>

                            <h3 className="text-2xl font-black uppercase tracking-tight mb-2">
                                {member.name}
                            </h3>
                            <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 border-t border-b border-gray-200 dark:border-gray-700 py-2 inline-block">
                                {member.role}
                            </div>
                            {member.bio && (
                                <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed px-4">
                                    {member.bio}
                                </p>
                            )}
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
