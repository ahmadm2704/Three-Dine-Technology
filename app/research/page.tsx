"use client";

import {
    ArrowRight,
    Microscope, BookOpen, FlaskConical, Atom, GraduationCap, FileText,
    Search, Brain, LineChart, CheckCircle2, Share2, ClipboardList
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SketchyIcon from "@/components/ui/sketchy-icon";
import StorySequence from "@/components/ui/story-sequence";
import { createClient } from "@/lib/supabase/client";

export default function ResearchHomePage() {
    const supabase = createClient();
    const [stats, setStats] = useState({
        publications: 0,
        universities: 0,
        countries: 0,
        caseStudies: 0,
    });

    // 15-Second Research Story
    const researchProcessStory = [
        { icon: Search, label: "Observation" },
        { icon: Brain, label: "Hypothesis" },
        { icon: FlaskConical, label: "Experimentation" },
        { icon: LineChart, label: "Data Analysis" },
        { icon: ClipboardList, label: "Peer Review" },
        { icon: Share2, label: "Publication" },
    ];

    useEffect(() => {
        async function fetchStats() {
            const [papersResult, partnersResult, caseStudiesResult] = await Promise.all([
                supabase.from("research_papers").select("id"),
                supabase.from("research_partners").select("id, location"),
                supabase.from("research_case_studies").select("id"),
            ]);

            const partnerRows = partnersResult.data || [];
            const uniqueCountries = new Set(
                partnerRows
                    .map((partner) => (partner.location || "").trim())
                    .filter(Boolean)
            );

            setStats({
                publications: papersResult.data?.length || 0,
                universities: partnerRows.length,
                countries: uniqueCountries.size,
                caseStudies: caseStudiesResult.data?.length || 0,
            });
        }

        fetchStats();
    }, []);

    const highlights = [
        {
            icon: Atom,
            eyebrow: "Publication Archive",
            title: "Our Publications",
            description: `${stats.publications} research publication${stats.publications === 1 ? "" : "s"} available from the admin-managed archive.`,
            detail: "Browse published papers, abstracts, and downloadable files in a dedicated archive built for academic visibility and credibility.",
            statLabel: "Published Records",
            href: "/research/publications",
        },
        {
            icon: GraduationCap,
            eyebrow: "Academic Network",
            title: "Global Learners Community",
            description: `${stats.universities} universiti${stats.universities === 1 ? "y" : "ies"} across ${stats.countries} countr${stats.countries === 1 ? "y" : "ies"}.`,
            detail: "Explore countries first, then see the universities connected to the Three Dine research ecosystem in each region.",
            statLabel: "Country Groups",
            href: "/research/universities",
        },
        {
            icon: FileText,
            eyebrow: "Applied Outcomes",
            title: "Case Studies",
            description: `${stats.caseStudies} admin-managed case stud${stats.caseStudies === 1 ? "y" : "ies"} showing real research outcomes.`,
            detail: "Showcase implementation stories, institutional outcomes, and practical research impact through curated case study entries.",
            statLabel: "Research Stories",
            href: "/research/case-studies",
        },
    ];

    return (
        <div className="bg-white dark:bg-gray-950 text-black dark:text-white font-sans selection:bg-black selection:text-white">

            {/* 1. HERO SECTION */}
            <section className="relative min-h-[calc(100svh-80px)] overflow-hidden border-b border-black dark:border-gray-700 pt-20 pb-10 md:py-0 md:flex md:items-center md:justify-center">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

                {/* Massive Background Text - Always visible now */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.03]">
                    <span className="text-[24vw] md:text-[15vw] font-bold uppercase tracking-tighter leading-none whitespace-nowrap">
                        DISCOVERY
                    </span>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 items-center">

                    {/* Left: Text Content (Always Visible) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-6 md:space-y-8 text-center md:text-left order-2 md:order-1"
                    >
                        <div className="inline-block px-3 py-1 border border-black dark:border-white text-xs font-bold uppercase tracking-widest bg-black dark:bg-white text-white dark:text-black">
                            The Reserach Division
                        </div>

                        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black uppercase leading-[0.9] tracking-tight">
                            Scientific<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-500 dark:from-white dark:to-gray-400" style={{ WebkitTextStroke: '2px black' }}>
                                Excellence
                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed font-light mx-auto md:mx-0">
                            Pushing the boundaries of knowledge by bringing the epitome of academia within your reach.
                        </p>

                        <div className="pt-4 space-y-4">
                            <p className="text-sm md:text-base font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 text-center md:text-left">
                                Need academic support?
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Link href="/research/about" className="group relative inline-flex items-center justify-center px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-bold text-base md:text-lg uppercase tracking-wide hover:bg-gray-800 dark:hover:bg-gray-200 transition-all sm:min-w-[210px]">
                                <span className="flex items-center space-x-3">
                                    <span>Get Yours</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>
                            <Link href="/research/samples" className="group inline-flex items-center justify-center px-8 py-4 border-2 border-black dark:border-white text-black dark:text-white font-bold text-base md:text-lg uppercase tracking-wide hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all sm:min-w-[210px]">
                                View Samples
                            </Link>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Research Story Loop (Always on Right) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        className="flex justify-center items-center relative order-1 md:order-2 w-full place-self-center py-8 md:py-20"
                    >
                        {/* Decorative Circle */}
                        <div className="absolute inset-0 border border-dashed border-gray-300 dark:border-gray-600 rounded-full animate-spin-slow pointer-events-none opacity-50" style={{ animationDuration: '30s' }}></div>

                        <div className="bg-white dark:bg-gray-900 p-6 md:p-12 rounded-full shadow-2xl shadow-gray-200 dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-800 z-10 w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] md:w-[450px] md:h-[450px] flex items-center justify-center relative">
                            <StorySequence stages={researchProcessStory} color="text-black dark:text-white" />
                        </div>
                    </motion.div>

                </div>
            </section>

            {/* RESEARCH DESTINATIONS */}
            <section className="py-24 border-t border-black dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-0 border border-black dark:border-gray-700">
                        {highlights.map((item, i) => (
                            <Link
                                href={item.href}
                                key={i}
                                className="group grid grid-cols-1 lg:grid-cols-[220px_1fr_220px] gap-8 p-10 md:p-14 border-b border-black dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                            >
                                <div className="flex flex-col justify-between gap-6">
                                    <div className="w-16 h-16">
                                        <SketchyIcon icon={item.icon} className="w-full h-full" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400 mb-2">
                                            {item.eyebrow}
                                        </div>
                                        <div className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
                                            0{i + 1}
                                        </div>
                                    </div>
                                </div>

                                <div className="max-w-3xl">
                                    <h3 className="text-4xl md:text-5xl font-black uppercase leading-[0.92] tracking-tight mb-5 group-hover:text-blue-600 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-4 max-w-2xl">
                                        {item.description}
                                    </p>
                                    <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl">
                                        {item.detail}
                                    </p>
                                </div>

                                <div className="flex flex-col justify-between items-start lg:items-end gap-8">
                                    <div className="text-left lg:text-right">
                                        <div className="text-xs font-bold uppercase tracking-[0.22em] text-gray-500 dark:text-gray-400 mb-2">
                                            {item.statLabel}
                                        </div>
                                        <div className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                                            {i === 0 ? stats.publications : i === 1 ? stats.countries : stats.caseStudies}
                                        </div>
                                    </div>

                                    <div className="inline-flex items-center text-sm font-bold uppercase tracking-[0.18em] border-b-2 border-black dark:border-white pb-1 group-hover:text-blue-600 group-hover:border-blue-600 transition-colors">
                                        Explore Section
                                        <ArrowRight className="w-4 h-4 ml-3 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    )
}
