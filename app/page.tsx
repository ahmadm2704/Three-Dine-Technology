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
        const exitTimer = setTimeout(() => setSplashExiting(true), 3000);
        const hideTimer = setTimeout(() => setShowSplash(false), 4400);
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
                    <motion.div
                        key="splash"
                        className="fixed inset-0 z-[100] overflow-hidden"
                        exit={{ y: "-100%", transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.15 } }}
                    >
                        {/* Base background */}
                        <div className="absolute inset-0 bg-[#060606]" />

                        {/* Very subtle blue radial glow */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: splashExiting ? 0 : 1 }}
                            transition={{ delay: 0.6, duration: 1.4 }}
                            className="absolute inset-0 pointer-events-none"
                            style={{ background: "radial-gradient(ellipse 55% 45% at 50% 52%, rgba(37,99,235,0.09), transparent)" }}
                        />

                        {/* Corner cross marks — top left */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: splashExiting ? 0 : 0.35 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="absolute top-8 left-8 w-4 h-4 pointer-events-none"
                        >
                            <div className="absolute top-1/2 left-0 w-full h-px bg-white -translate-y-1/2" />
                            <div className="absolute left-1/2 top-0 h-full w-px bg-white -translate-x-1/2" />
                        </motion.div>

                        {/* Corner cross marks — top right */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: splashExiting ? 0 : 0.35 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="absolute top-8 right-8 w-4 h-4 pointer-events-none"
                        >
                            <div className="absolute top-1/2 left-0 w-full h-px bg-white -translate-y-1/2" />
                            <div className="absolute left-1/2 top-0 h-full w-px bg-white -translate-x-1/2" />
                        </motion.div>

                        {/* Corner cross marks — bottom left */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: splashExiting ? 0 : 0.35 }}
                            transition={{ delay: 0.55, duration: 0.6 }}
                            className="absolute bottom-8 left-8 w-4 h-4 pointer-events-none"
                        >
                            <div className="absolute top-1/2 left-0 w-full h-px bg-white -translate-y-1/2" />
                            <div className="absolute left-1/2 top-0 h-full w-px bg-white -translate-x-1/2" />
                        </motion.div>

                        {/* Corner cross marks — bottom right */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: splashExiting ? 0 : 0.35 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="absolute bottom-8 right-8 w-4 h-4 pointer-events-none"
                        >
                            <div className="absolute top-1/2 left-0 w-full h-px bg-white -translate-y-1/2" />
                            <div className="absolute left-1/2 top-0 h-full w-px bg-white -translate-x-1/2" />
                        </motion.div>

                        {/* Main content — lifts out when exiting */}
                        <motion.div
                            animate={splashExiting ? { opacity: 0, y: -36 } : { opacity: 1, y: 0 }}
                            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-0 flex flex-col items-center justify-center px-6"
                        >
                            {/* TD lettermark */}
                            <div className="overflow-hidden mb-10">
                                <motion.div
                                    initial={{ y: "120%" }}
                                    animate={{ y: "0%" }}
                                    transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <div className="w-20 h-20 border border-white/10 bg-white/[0.04] flex items-center justify-center relative">
                                        <span className="text-white font-black text-2xl tracking-tighter relative z-10">TD</span>
                                        <span className="absolute inset-0 bg-blue-600/20 blur-2xl" />
                                        {/* Corner ticks on badge */}
                                        <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-blue-500/60" />
                                        <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-blue-500/60" />
                                        <span className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-blue-500/60" />
                                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-blue-500/60" />
                                    </div>
                                </motion.div>
                            </div>

                            {/* THREE DINE — clip reveal */}
                            <div className="overflow-hidden">
                                <motion.div
                                    initial={{ y: "105%" }}
                                    animate={{ y: "0%" }}
                                    transition={{ delay: 0.18, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <h1 className="text-white font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-[0.15em] leading-none text-center">
                                        Three Dine
                                    </h1>
                                </motion.div>
                            </div>

                            {/* CORPORATION — clip reveal, staggered */}
                            <div className="overflow-hidden mb-8">
                                <motion.div
                                    initial={{ y: "105%" }}
                                    animate={{ y: "0%" }}
                                    transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <h1 className="text-blue-500 font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-[0.15em] leading-none text-center">
                                        Corporation
                                    </h1>
                                </motion.div>
                            </div>

                            {/* Divider line sweeps outward from center */}
                            <div className="relative w-60 h-px mb-7 overflow-hidden">
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent origin-center"
                                />
                            </div>

                            {/* Tagline — fades in with wide tracking */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: splashExiting ? 0 : 0.4 }}
                                transition={{ delay: 0.9, duration: 1 }}
                                className="text-[9px] sm:text-[11px] font-semibold uppercase tracking-[0.45em] text-white text-center"
                            >
                                Where Research Meets Technology
                            </motion.p>
                        </motion.div>

                        {/* Bottom status bar */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: splashExiting ? 0 : 1 }}
                            transition={{ delay: 0.7, duration: 0.7 }}
                            className="absolute bottom-10 left-0 right-0 px-10 flex items-center gap-4 pointer-events-none"
                        >
                            <span className="text-[9px] uppercase tracking-[0.25em] text-white/20 font-medium">©2026</span>
                            <div className="flex-1 h-px bg-white/10 overflow-hidden">
                                <motion.div
                                    initial={{ x: "-100%" }}
                                    animate={{ x: "0%" }}
                                    transition={{ delay: 0.8, duration: 2.0, ease: [0.4, 0, 0.6, 1] }}
                                    className="h-full w-full bg-gradient-to-r from-white/20 via-blue-500 to-white/20"
                                />
                            </div>
                            <span className="text-[9px] uppercase tracking-[0.25em] text-white/20 font-medium">001</span>
                        </motion.div>
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
                                <motion.h2 custom={1} variants={textVariant} initial="hidden" animate="visible" className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2 md:mb-3 text-black tracking-tight leading-tight">
                                    THREE DINE <br />
                                    <span className="text-blue-600">TECHNOLOGY</span>
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
                                <motion.h2 custom={1} variants={textVariant} initial="hidden" animate="visible" className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2 md:mb-3 text-white tracking-tight leading-tight">
                                    THREE DINE <br />
                                    <span className="text-gray-500">RESEARCH</span>
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
