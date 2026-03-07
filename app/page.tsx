"use client";

import Link from "next/link";
import {
    ArrowRight,
    Code2, Terminal, Database, Globe,
    Microscope, Search, FlaskConical, Dna,
    Mail,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StorySequence from "@/components/ui/story-sequence";

export default function GatewayPage() {
    const router = useRouter();
    const [hoveredSide, setHoveredSide] = useState<"left" | "right" | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [showSplash, setShowSplash] = useState(true);
    const [splashExiting, setSplashExiting] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    useEffect(() => {
        const exitTimer = setTimeout(() => setSplashExiting(true), 2800);
        const hideTimer = setTimeout(() => setShowSplash(false), 4200);
        return () => { clearTimeout(exitTimer); clearTimeout(hideTimer); };
    }, []);

    const leftWidth = hoveredSide === "left" ? "65%" : hoveredSide === "right" ? "35%" : "50%";
    const rightWidth = hoveredSide === "right" ? "65%" : hoveredSide === "left" ? "35%" : "50%";

    const textVariant = {
        hidden: { y: 30, opacity: 0 },
        visible: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: i * 0.1,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1] as any,
            },
        }),
    };

    const techStory = [
        { icon: Terminal, label: "Coding Logic" },
        { icon: Database, label: "Processing Data" },
        { icon: Globe, label: "Connectivity" },
        { icon: Code2, label: "Three Dine Tech" },
    ];

    const researchStory = [
        { icon: Search, label: "Hypothesis" },
        { icon: FlaskConical, label: "Experiment" },
        { icon: Dna, label: "Analysis" },
        { icon: Microscope, label: "Three Dine Research" },
    ];

    return (
        <>
            {/* SPLASH INTRO */}
            <AnimatePresence>
                {showSplash && (
                    <motion.div key="splash" className="fixed inset-0 z-[100] pointer-events-none">

                        {/* TOP HALF — slides up on exit */}
                        <motion.div
                            className="absolute top-0 left-0 right-0 h-1/2 bg-[#080808] overflow-hidden"
                            exit={{ y: "-100%", transition: { duration: 1.3, ease: [0.76, 0, 0.24, 1], delay: 0.08 } }}
                        >
                            {/* seam rule top-half bottom */}
                        <motion.div
                            className="absolute bottom-0 left-16 right-16 h-px"
                            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)" }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: splashExiting ? 0 : 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        />
                        {/* top-left wordmark */}
                        <div className="absolute top-9 left-10 overflow-hidden">
                            <motion.div
                                initial={{ y: "120%" }}
                                animate={{ y: splashExiting ? "-120%" : "0%" }}
                                transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <span className="flex items-center gap-2.5">
                                    <span className="w-5 h-5 bg-blue-600 flex items-center justify-center text-white font-black text-[9px] tracking-tighter flex-shrink-0">TD</span>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Three Dine Corporation</span>
                                </span>
                            </motion.div>
                        </div>
                        {/* top-right index */}
                        <div className="absolute top-9 right-10 overflow-hidden">
                            <motion.div
                                initial={{ y: "120%" }}
                                animate={{ y: splashExiting ? "-120%" : "0%" }}
                                transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <span className="text-[10px] font-medium tracking-[0.3em] text-white/20 uppercase">001 / 001</span>
                            </motion.div>
                        </div>
                        </motion.div>

                        {/* BOTTOM HALF — slides down on exit */}
                        <motion.div
                            className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#080808] overflow-hidden"
                            exit={{ y: "100%", transition: { duration: 1.3, ease: [0.76, 0, 0.24, 1], delay: 0.08 } }}
                        >
                        {/* seam rule bottom-half top */}
                        <motion.div
                            className="absolute top-0 left-16 right-16 h-px"
                            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)" }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: splashExiting ? 0 : 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        />
                        {/* bottom-left tagline */}
                        <div className="absolute bottom-9 left-10 overflow-hidden">
                            <motion.div
                                initial={{ y: "120%" }}
                                animate={{ y: splashExiting ? "120%" : "0%" }}
                                transition={{ delay: 1.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/20">Where Research Meets Technology</span>
                            </motion.div>
                        </div>
                        {/* bottom-right year */}
                        <div className="absolute bottom-9 right-10 overflow-hidden">
                            <motion.div
                                initial={{ y: "120%" }}
                                animate={{ y: splashExiting ? "120%" : "0%" }}
                                transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <span className="text-[10px] font-medium tracking-[0.3em] text-white/20 uppercase">© 2026</span>
                            </motion.div>
                        </div>
                        </motion.div>

                        {/* CENTER CONTENT — floats over the seam */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">

                            {/* TD mark */}
                            <div className="overflow-hidden mb-8">
                                <motion.div
                                    initial={{ y: "130%" }}
                                    animate={{ y: splashExiting ? "-130%" : "0%" }}
                                    transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <div className="relative w-16 h-16 flex items-center justify-center">
                                        {/* Outer border box */}
                                        <span className="absolute inset-0 border border-white/8" />
                                        {/* Blue corner accents */}
                                        <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-blue-500/70" />
                                        <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-blue-500/70" />
                                        <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-blue-500/70" />
                                        <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-blue-500/70" />
                                        <span className="text-white font-black text-lg tracking-tighter z-10">TD</span>
                                    </div>
                                </motion.div>
                            </div>

                            {/* THREE DINE */}
                            <div className="overflow-hidden">
                                <motion.div
                                    initial={{ y: "105%" }}
                                    animate={{ y: splashExiting ? "-105%" : "0%" }}
                                    transition={{ delay: 0.15, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <h1 className="text-white font-black text-5xl sm:text-6xl md:text-7xl uppercase tracking-[0.12em] leading-[0.9] text-center">
                                        Three Dine
                                    </h1>
                                </motion.div>
                            </div>

                            {/* CORPORATION */}
                            <div className="overflow-hidden mb-9">
                                <motion.div
                                    initial={{ y: "105%" }}
                                    animate={{ y: splashExiting ? "-105%" : "0%" }}
                                    transition={{ delay: 0.26, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <h1 className="text-blue-500 font-black text-5xl sm:text-6xl md:text-7xl uppercase tracking-[0.12em] leading-[0.9] text-center">
                                        Corporation
                                    </h1>
                                </motion.div>
                            </div>

                            {/* Horizontal rule */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: splashExiting ? 0 : 1 }}
                                transition={{ delay: 0.55, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                                className="w-48 h-px origin-center mb-7"
                                style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.5) 50%, transparent)" }}
                            />

                            {/* Tagline */}
                            <div className="overflow-hidden">
                                <motion.div
                                    initial={{ y: "110%" }}
                                    animate={{ y: splashExiting ? "-110%" : "0%" }}
                                    transition={{ delay: 0.75, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.5em] text-white/35 text-center">
                                        Where Research Meets Technology
                                    </p>
                                </motion.div>
                            </div>

                        </div>

                        {/* Vertical edge lines */}
                        <motion.div
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: splashExiting ? 0 : 1 }}
                            transition={{ delay: 0.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute left-10 top-0 bottom-0 w-px bg-white/[0.04] origin-center"
                        />
                        <motion.div
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: splashExiting ? 0 : 1 }}
                            transition={{ delay: 0.45, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute right-10 top-0 bottom-0 w-px bg-white/[0.04] origin-center"
                        />

                    </motion.div>
                )}
            </AnimatePresence>

            {/* GATEWAY PAGE */}
            <div className="h-[100dvh] w-full flex flex-col overflow-hidden bg-black">

                {/* TOP NAVBAR */}
                <div className="flex-shrink-0 z-50 bg-black flex items-center justify-between px-6 md:px-10 py-4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 2.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="flex items-center gap-2.5"
                    >
                        <span className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center font-black text-xs tracking-tighter flex-shrink-0">TD</span>
                        <div className="flex flex-col leading-none">
                            <span className="text-white font-black text-xs uppercase tracking-widest leading-tight">Three Dine</span>
                            <span className="text-blue-400 font-black text-xs uppercase tracking-widest leading-tight">Corporation</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 2.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Link
                            href="/get-in-touch"
                            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white border border-white/30 px-4 py-2 hover:bg-white hover:text-black transition-all duration-300"
                        >
                            <Mail className="w-3.5 h-3.5" />
                            Get in Touch
                        </Link>
                    </motion.div>
                </div>

                {/* SPLIT PANELS */}
                <div className="flex-1 min-h-0 flex flex-col-reverse md:flex-row">

                    {/* LEFT: TECHNOLOGY */}
                    <motion.div
                        onClick={() => router.push('/technology')}
                        className="relative flex-1 md:flex-none flex items-center justify-center overflow-hidden cursor-pointer"
                        initial={false}
                        animate={isMobile ? { width: "100%", height: "50%" } : { width: leftWidth, height: "100%" }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        onMouseEnter={() => !isMobile && setHoveredSide("left")}
                        onMouseLeave={() => !isMobile && setHoveredSide(null)}
                    >
                        <div className="absolute inset-0 bg-white z-0" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 overflow-hidden">
                            <motion.span
                                className="text-[6rem] sm:text-[10rem] md:text-[20rem] font-bold text-outline opacity-20 whitespace-nowrap block"
                                animate={{ x: hoveredSide === "left" ? -20 : 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                TECH
                            </motion.span>
                        </div>
                        <div className="relative z-10 max-w-lg px-6 py-2 md:p-10 flex flex-col items-center justify-center h-full w-full">
                            <motion.div custom={0} initial="hidden" animate="visible" variants={textVariant} className="hidden lg:flex w-full justify-center mb-4">
                                <StorySequence stages={techStory} color="text-black" />
                            </motion.div>
                            <div className="text-center">
                                <motion.h2 custom={1} variants={textVariant} initial="hidden" animate="visible" className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2 md:mb-3 text-black tracking-tight leading-none">
                                    <span className="block">THREE DINE</span>
                                    <span className="mt-1 block text-blue-600 md:mt-2">TECHNOLOGY</span>
                                </motion.h2>
                                <motion.p custom={2} variants={textVariant} initial="hidden" animate="visible" className="text-sm sm:text-base md:text-base text-gray-500 mb-4 md:mb-6 leading-relaxed max-w-md mx-auto">
                                    Building the digital future with cutting-edge web development and custom software.
                                </motion.p>
                                <motion.div custom={3} variants={textVariant} initial="hidden" animate="visible">
                                    <Link href="/technology" className="group inline-flex items-center text-sm sm:text-base md:text-lg font-bold text-black border-b-2 border-black pb-1 hover:text-blue-600 hover:border-blue-600 transition-all">
                                        <span className="mr-2 md:mr-3">ENTER TECHNOLOGY</span>
                                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-2" />
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT: RESEARCH */}
                    <motion.div
                        onClick={() => router.push('/research')}
                        className="relative flex-1 md:flex-none flex items-center justify-center overflow-hidden cursor-pointer bg-black"
                        initial={false}
                        animate={isMobile ? { width: "100%", height: "50%" } : { width: rightWidth, height: "100%" }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        onMouseEnter={() => !isMobile && setHoveredSide("right")}
                        onMouseLeave={() => !isMobile && setHoveredSide(null)}
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
                            <motion.span
                                className="text-[6rem] sm:text-[10rem] md:text-[20rem] font-bold text-outline-white opacity-10 whitespace-nowrap block"
                                animate={{ x: hoveredSide === "right" ? 20 : 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                LABS
                            </motion.span>
                        </div>
                        <div className="relative z-10 max-w-lg px-6 py-2 md:p-10 md:pl-16 flex flex-col items-center justify-center h-full w-full">
                            <motion.div custom={0} initial="hidden" animate="visible" variants={textVariant} className="hidden lg:flex w-full justify-center mb-4">
                                <StorySequence stages={researchStory} color="text-white" />
                            </motion.div>
                            <div className="text-center">
                                <motion.h2 custom={1} variants={textVariant} initial="hidden" animate="visible" className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2 md:mb-3 text-white tracking-tight leading-none">
                                    <span className="block">THREE DINE</span>
                                    <span className="mt-1 block text-gray-500 md:mt-2">RESEARCH</span>
                                </motion.h2>
                                <motion.p custom={2} variants={textVariant} initial="hidden" animate="visible" className="text-sm sm:text-base md:text-base text-gray-400 mb-4 md:mb-6 leading-relaxed max-w-md mx-auto">
                                    Delivering and Shaping the Epitome of Academia for Scholars and Innovators.
                                </motion.p>
                                <motion.div custom={3} variants={textVariant} initial="hidden" animate="visible">
                                    <Link href="/research" className="group inline-flex items-center text-sm sm:text-base md:text-lg font-bold text-white border-b-2 border-white pb-1 hover:text-gray-300 hover:border-gray-300 transition-all">
                                        <span className="mr-2 md:mr-3">ENTER RESEARCH</span>
                                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-2" />
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </>
    );
}
