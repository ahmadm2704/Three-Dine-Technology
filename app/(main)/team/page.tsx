"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Loader2 } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const fallbackCeo = {
    name: "Ahmad Mujtaba",
    role: "Founder & CEO",
    image_url: "",
    bio: "At Three Dine Technology, we don't just build software — we engineer the future. Our mission is to push the boundaries of what's possible, delivering digital solutions that transform businesses and create lasting impact. Every line of code we write is driven by purpose, precision, and passion."
};

const fallbackTopManagement = [
    { name: "James Carter", role: "Chief Technology Officer", image_url: "", bio: "Architecting our technology stack and driving engineering excellence across all platforms." },
    { name: "Olivia Martinez", role: "Chief Financial Officer", image_url: "", bio: "Strategic financial leadership ensuring sustainable growth and operational efficiency." },
    { name: "Liam Anderson", role: "Chief Marketing Officer", image_url: "", bio: "Crafting our brand narrative and driving market expansion through data-driven strategies." },
];

const fallbackItTeam = [
    { name: "Sarah Chen", role: "Lead Full-Stack Developer", image_url: "", bio: "Building robust web applications with React, Next.js, and Node.js." },
    { name: "David Kim", role: "Frontend Engineer", image_url: "", bio: "Crafting pixel-perfect interfaces and seamless user experiences." },
    { name: "Marcus Johnson", role: "Backend Engineer", image_url: "", bio: "Designing scalable APIs and database architectures." },
    { name: "Emily Davis", role: "DevOps Engineer", image_url: "", bio: "Automating infrastructure and ensuring zero-downtime deployments." },
    { name: "Raj Patel", role: "Mobile Developer", image_url: "", bio: "Building native and cross-platform mobile applications." },
    { name: "Anna Wright", role: "UI/UX Designer", image_url: "", bio: "Translating complex problems into intuitive, user-centered designs." },
];

const fallbackSupportTeam = [
    { name: "Jessica Lee", role: "Project Manager", image_url: "", bio: "Ensuring on-time delivery and seamless client communication." },
    { name: "Michael Torres", role: "QA Lead", image_url: "", bio: "Guardian of quality — testing every feature to perfection." },
    { name: "Sophie Bennett", role: "Client Success Manager", image_url: "", bio: "Building lasting relationships and ensuring client satisfaction." },
];

function getCategory(member: any): string {
    const skills = member.skills;
    if (Array.isArray(skills) && skills.length > 0) return skills[0];
    return "it_team";
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
            <h3 className="text-xl font-black uppercase tracking-tight mb-1 group-hover:text-blue-600 transition-colors">
                {member.name}
            </h3>
            <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 py-1 inline-block">
                {member.role}
            </div>
            {member.bio && (
                <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed text-sm px-2">
                    {member.bio}
                </p>
            )}
        </motion.div>
    );
}

export default function TeamPage() {
    const [ceo, setCeo] = useState(fallbackCeo);
    const [topManagement, setTopManagement] = useState(fallbackTopManagement);
    const [itTeam, setItTeam] = useState(fallbackItTeam);
    const [supportTeam, setSupportTeam] = useState(fallbackSupportTeam);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTeam() {
            try {
                const supabase = createClient();
                const { data, error } = await supabase
                    .from("team_members")
                    .select("*")
                    .order("display_order", { ascending: true });

                if (!error && data && data.length > 0) {
                    const ceoMembers = data.filter(m => getCategory(m) === "ceo");
                    const topMgmt = data.filter(m => getCategory(m) === "top_management");
                    const it = data.filter(m => getCategory(m) === "it_team");
                    const support = data.filter(m => getCategory(m) === "support_team");

                    if (ceoMembers.length > 0) {
                        setCeo({ name: ceoMembers[0].name, role: ceoMembers[0].role, image_url: ceoMembers[0].image_url || "", bio: ceoMembers[0].bio || "" });
                    }
                    if (topMgmt.length > 0) setTopManagement(topMgmt);
                    if (it.length > 0) setItTeam(it);
                    if (support.length > 0) setSupportTeam(support);
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
                            <div className="inline-block px-3 py-1 border border-blue-600 text-xs font-bold uppercase tracking-widest bg-blue-600 text-white mb-6">
                                Leadership
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4 leading-none">
                                {ceo.name}
                            </h1>
                            <p className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-8">{ceo.role}</p>
                            <blockquote className="text-lg md:text-xl text-gray-300 leading-relaxed font-light italic border-l-4 border-blue-600 pl-6">
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
                        <div className="h-1 w-24 bg-blue-600 mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                        {topManagement.map((member, i) => (
                            <TeamMemberCard key={i} member={member} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* IT TEAM */}
            <section className="py-24 border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4 dark:text-white">IT Team</h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">The engineers and designers building the digital future.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {itTeam.map((member, i) => (
                            <TeamMemberCard key={i} member={member} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* SUPPORT TEAM */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4 dark:text-white">Support Team</h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">Ensuring seamless operations and exceptional client experiences.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                        {supportTeam.map((member, i) => (
                            <TeamMemberCard key={i} member={member} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* JOIN US CTA */}
            <section className="bg-black text-white py-24 text-center">
                <h2 className="text-4xl md:text-5xl font-black uppercase mb-6">We are Hiring</h2>
                <p className="text-gray-400 mb-10 max-w-lg mx-auto">
                    Looking for a new challenge? Join our team and help build the future.
                </p>
                <Link href="/contact" className="inline-block px-8 py-4 border border-blue-600 text-white font-bold uppercase tracking-widest hover:bg-blue-600 transition-all">
                    View Openings
                </Link>
            </section>
        </div>
    );
}
