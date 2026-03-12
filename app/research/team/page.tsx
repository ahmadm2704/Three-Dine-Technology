"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const fallbackCeo = {
    name: "Ahmad Mujtaba",
    role: "Founder & CEO",
    image_url: "",
    bio: "Our vision at ThreeDine Researchers is to make excellence accessible to every student and researcher worldwide. Leading this mission, I’ve seen that true scholarship thrives on expert guidance and unwavering support. We empower learners across the globe with the insight, tools, and confidence they need to take the first step toward success and achieve breakthroughs that shape the future."
};

const fallbackTopManagement = [
    { name: "Dr. Nadia Hussain", role: "Chief Academic Officer", image_url: "", bio: "Overseeing all academic operations with 15+ years of scholarly leadership and curriculum expertise." },
    { name: "Fatima Zahra", role: "Quality Assurance Manager", image_url: "", bio: "Ensuring every deliverable meets the highest standards of accuracy, originality, and academic rigor." },
    { name: "Dr. Ammar Sheikh", role: "Lead Research Analyst (Engineering/Medical)", image_url: "", bio: "Guiding complex technical and medical research projects with domain-specific expertise." },
];

const fallbackWritingTeam = [
    { name: "Hira Malik", role: "Senior Research Writer", image_url: "", bio: "Specializing in social sciences and humanities research with published journal contributions." },
    { name: "Usman Raza", role: "Technical Writer", image_url: "", bio: "Expert in engineering, computer science, and data-driven research documentation." },
    { name: "Ayesha Khan", role: "Medical Research Writer", image_url: "", bio: "Focused on clinical studies, medical literature reviews, and healthcare research." },
    { name: "Bilal Ahmed", role: "Academic Editor", image_url: "", bio: "Refining manuscripts for clarity, coherence, and adherence to publication standards." },
    { name: "Sara Noor", role: "Dissertation Specialist", image_url: "", bio: "Supporting students through every stage of thesis and dissertation development." },
    { name: "Hassan Ali", role: "Data Analyst & Statistician", image_url: "", bio: "Providing quantitative analysis, SPSS, and statistical modeling for research projects." },
];

function parseRole(role: string): { category: string; displayRole: string } {
    if (role && role.includes("::")) {
        const [cat, ...rest] = role.split("::");
        return { category: cat, displayRole: rest.join("::") };
    }
    return { category: "writing_team", displayRole: role };
}

function TeamMemberCard({ member, index }: { member: any; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group text-center"
        >
            <div className="w-full aspect-square bg-gray-100 dark:bg-gray-800 mb-6 flex items-center justify-center relative overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                {member.image_url ? (
                    <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                    <User className="w-16 h-16 text-gray-300 dark:text-gray-600" />
                )}
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight mb-1 group-hover:text-emerald-600 transition-colors">
                {member.name}
            </h3>
            <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 py-1 inline-block">
                {member.displayRole || member.role}
            </div>
            {member.bio && (
                <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed text-sm px-2">
                    {member.bio}
                </p>
            )}
        </motion.div>
    );
}

export default function ResearchTeamPage() {
    const [ceo, setCeo] = useState(fallbackCeo);
    const [topManagement, setTopManagement] = useState(fallbackTopManagement);
    const [writingTeam, setWritingTeam] = useState(fallbackWritingTeam);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTeam() {
            try {
                const supabase = createClient();
                const { data, error } = await supabase
                    .from("research_team")
                    .select("*")
                    .order("created_at", { ascending: true });

                if (!error && data && data.length > 0) {
                    const parsed = data.map(m => {
                        const { category, displayRole } = parseRole(m.role || "");
                        return { ...m, category, displayRole };
                    });

                    const ceoMembers = parsed.filter(m => m.category === "ceo");
                    const topMgmt = parsed.filter(m => m.category === "top_management");
                    const writers = parsed.filter(m => m.category === "writing_team");

                    if (ceoMembers.length > 0) {
                        setCeo({ name: ceoMembers[0].name, role: ceoMembers[0].displayRole, image_url: ceoMembers[0].image_url || "", bio: ceoMembers[0].bio || "" });
                    }
                    if (topMgmt.length > 0) setTopManagement(topMgmt);
                    if (writers.length > 0) setWritingTeam(writers);
                }
            } catch {}
            setLoading(false);
        }
        fetchTeam();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-950 min-h-screen pb-20">

            {/* CEO SECTION */}
            <section className="bg-black text-white py-24 md:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="flex justify-center"
                        >
                            <div className="w-72 h-72 md:w-96 md:h-96 bg-gray-800 flex items-center justify-center overflow-hidden">
                                {ceo.image_url ? (
                                    <img src={ceo.image_url} alt={ceo.name} className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-24 h-24 text-gray-600" />
                                )}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-center md:text-left"
                        >
                            <div className="inline-block px-3 py-1 border border-emerald-600 text-xs font-bold uppercase tracking-widest bg-emerald-600 text-white mb-6">
                                Leadership
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4 leading-none">
                                {ceo.name}
                            </h1>
                            <p className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-8">{ceo.role}</p>
                            <blockquote className="text-lg md:text-xl text-gray-300 leading-relaxed font-light italic border-l-4 border-emerald-600 pl-6">
                                &ldquo;{ceo.bio}&rdquo;
                            </blockquote>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* TOP MANAGEMENT */}
            <section className="py-24 border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4 dark:text-white">Top Management</h2>
                        <div className="h-1 w-24 bg-emerald-600 mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                        {topManagement.map((member, i) => (
                            <TeamMemberCard key={i} member={member} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* WRITING TEAM */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4 dark:text-white">Writing Team</h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">Expert writers and analysts delivering high-quality academic research.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {writingTeam.map((member, i) => (
                            <TeamMemberCard key={i} member={member} index={i} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
