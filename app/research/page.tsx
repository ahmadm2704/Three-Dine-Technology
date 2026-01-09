"use client";

import {
    ArrowRight,
    Microscope, BookOpen, FlaskConical, Atom, GraduationCap, FileText,
    Search, Brain, LineChart, CheckCircle2, Share2, ClipboardList
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import SketchyIcon from "@/components/ui/sketchy-icon";
import StorySequence from "@/components/ui/story-sequence";

export default function ResearchHomePage() {

    // 15-Second Research Story
    const researchProcessStory = [
        { icon: Search, label: "Observation" },
        { icon: Brain, label: "Hypothesis" },
        { icon: FlaskConical, label: "Experimentation" },
        { icon: LineChart, label: "Data Analysis" },
        { icon: ClipboardList, label: "Peer Review" },
        { icon: Share2, label: "Publication" },
    ];

    const highlights = [
        {
            icon: Atom,
            title: "Academic Papers",
            description: "Published research in top-tier journals regarding AI and Compute.",
        },
        {
            icon: GraduationCap,
            title: "University Partnerships",
            description: "Collaborative studies with leading global institutions.",
        },
        {
            icon: FileText,
            title: "Case Studies",
            description: "Real-world application of theoretical models.",
        },
    ];

    return (
        <div className="bg-white text-black font-sans selection:bg-black selection:text-white">

            {/* 1. HERO SECTION */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden border-b border-black pt-16">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

                {/* Massive Background Text - Always visible now */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.03]">
                    <span className="text-[15vw] font-bold uppercase tracking-tighter leading-none whitespace-nowrap">
                        DISCOVERY
                    </span>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">

                    {/* Left: Text Content (Always Visible) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-8 text-center md:text-left order-2 md:order-1"
                    >
                        <div className="inline-block px-3 py-1 border border-black text-xs font-bold uppercase tracking-widest bg-black text-white">
                            Scientific Division
                        </div>

                        <h1 className="text-6xl md:text-8xl font-black uppercase leading-[0.9] tracking-tight">
                            Scientific<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-500" style={{ WebkitTextStroke: '2px black' }}>
                                Excellence
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-600 max-w-lg leading-relaxed font-light mx-auto md:mx-0">
                            Pushing the boundaries of knowledge through rigorous inquiry and innovation.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                            <Link href="/research/about" className="group relative px-8 py-4 bg-black text-white font-bold text-lg uppercase tracking-wide hover:bg-gray-800 transition-all">
                                <span className="flex items-center space-x-3">
                                    <span>Explore Mission</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>
                            <Link href="/research/samples" className="group inline-flex items-center justify-center px-8 py-4 border-2 border-black text-black font-bold text-lg uppercase tracking-wide hover:bg-black hover:text-white transition-all">
                                View Samples
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right: Research Story Loop (Always on Right) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        className="flex justify-center items-center relative order-1 md:order-2 w-full place-self-center py-20"
                    >
                        {/* Decorative Circle */}
                        <div className="absolute inset-0 border border-dashed border-gray-300 rounded-full animate-spin-slow pointer-events-none opacity-50" style={{ animationDuration: '30s' }}></div>

                        <div className="bg-white p-6 md:p-12 rounded-full shadow-2xl shadow-gray-200 border border-gray-100 z-10 w-[300px] h-[300px] md:w-[450px] md:h-[450px] flex items-center justify-center relative">
                            <StorySequence stages={researchProcessStory} color="text-black" />
                        </div>
                    </motion.div>

                </div>
            </section>

            {/* HIGHLIGHTS */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-black">
                        {highlights.map((item, i) => (
                            <div key={i} className="p-12 border-b md:border-b-0 md:border-r border-black last:border-r-0 hover:bg-gray-50 transition-colors group">
                                <div className="w-16 h-16 mb-6">
                                    <SketchyIcon icon={item.icon} className="w-full h-full" />
                                </div>
                                <h3 className="text-2xl font-bold uppercase mb-4 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    )
}
