"use client";

import Link from "next/link";
import {
    ArrowRight,
    // Tech Icons
    Code2, Terminal, Database, Globe, Cpu,
    // Research Icons
    Microscope, Search, FlaskConical, Dna, BrainCircuit
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import StorySequence from "@/components/ui/story-sequence";

export default function GatewayPage() {
    const [hoveredSide, setHoveredSide] = useState<"left" | "right" | null>(null);

    const leftWidth = hoveredSide === "left" ? "65%" : hoveredSide === "right" ? "35%" : "50%";
    const rightWidth = hoveredSide === "right" ? "65%" : hoveredSide === "left" ? "35%" : "50%";

    const textVariant = {
        hidden: { y: 50, opacity: 0 },
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

    // Define the 10-second stories (4 stages * 2.5s)
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
        <div className="h-screen w-full flex flex-col md:flex-row overflow-hidden bg-black">
            {/* LEFT SIDE: TECHNOLOGY */}
            <motion.div
                className="relative h-1/2 md:h-full flex items-center justify-center overflow-hidden cursor-pointer"
                initial={false}
                animate={{ width: typeof window !== 'undefined' && window.innerWidth >= 768 ? leftWidth : "100%", height: typeof window !== 'undefined' && window.innerWidth < 768 ? "50%" : "100%" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHoveredSide("left")}
                onMouseLeave={() => setHoveredSide(null)}
            >
                {/* White Background */}
                <div className="absolute inset-0 bg-white z-0" />

                {/* Background Outline Text (Parallax-ish effect could be added here) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 overflow-hidden">
                    <motion.span
                        className="text-[10rem] md:text-[20rem] font-bold text-outline opacity-20 whitespace-nowrap block"
                        animate={{ x: hoveredSide === "left" ? -20 : 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        TECH
                    </motion.span>
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-lg p-8 md:p-12 flex flex-col justify-center h-full w-full">
                    <motion.div
                        custom={0}
                        initial="hidden"
                        animate="visible"
                        variants={textVariant}
                        className="w-full flex justify-center mb-8"
                    >
                        {/* Tech Story Animation */}
                        <StorySequence stages={techStory} color="text-black" />
                    </motion.div>

                    <div className="text-center md:text-left">
                        <div className="overflow-hidden">
                            <motion.h2 custom={1} variants={textVariant} initial="hidden" animate="visible" className="text-4xl md:text-6xl font-bold mb-4 text-black tracking-tight leading-tight">
                                THREE DINE <br />
                                <span className="text-blue-600">TECHNOLOGY</span>
                            </motion.h2>
                        </div>

                        <motion.p
                            custom={2}
                            variants={textVariant}
                            initial="hidden"
                            animate="visible"
                            className="text-lg text-gray-500 mb-8 leading-relaxed max-w-md mx-auto md:mx-0"
                        >
                            Building the digital future with cutting-edge web development and custom software.
                        </motion.p>

                        <motion.div custom={3} variants={textVariant} initial="hidden" animate="visible">
                            <Link href="/technology" className="group inline-flex items-center text-lg font-bold text-black border-b-2 border-black pb-1 hover:text-blue-600 hover:border-blue-600 transition-all">
                                <span className="mr-3">ENTER TECHNOLOGY</span>
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* RIGHT SIDE: RESEARCH */}
            <motion.div
                className="relative h-1/2 md:h-full flex items-center justify-center overflow-hidden cursor-pointer bg-black"
                initial={false}
                animate={{ width: typeof window !== 'undefined' && window.innerWidth >= 768 ? rightWidth : "100%", height: typeof window !== 'undefined' && window.innerWidth < 768 ? "50%" : "100%" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHoveredSide("right")}
                onMouseLeave={() => setHoveredSide(null)}
            >

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
                    <motion.span
                        className="text-[10rem] md:text-[20rem] font-bold text-outline-white opacity-10 whitespace-nowrap block"
                        animate={{ x: hoveredSide === "right" ? 20 : 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        LABS
                    </motion.span>
                </div>

                <div className="relative z-10 max-w-lg p-8 md:p-12 flex flex-col justify-center h-full w-full pl-12 md:pl-24">
                    <motion.div
                        custom={0}
                        initial="hidden"
                        animate="visible"
                        variants={textVariant}
                        className="w-full flex justify-center mb-8"
                    >
                        {/* Research Story Animation */}
                        <StorySequence stages={researchStory} color="text-white" />
                    </motion.div>

                    <div className="text-center md:text-left">
                        <div className="overflow-hidden">
                            <motion.h2 custom={1} variants={textVariant} initial="hidden" animate="visible" className="text-4xl md:text-6xl font-bold mb-4 text-white tracking-tight leading-tight">
                                THREE DINE <br />
                                <span className="text-gray-500">RESEARCH</span>
                            </motion.h2>
                        </div>

                        <motion.p
                            custom={2}
                            variants={textVariant}
                            initial="hidden"
                            animate="visible"
                            className="text-lg text-gray-400 mb-8 leading-relaxed max-w-md mx-auto md:mx-0"
                        >
                            Pioneering the unknown. AI, Machine Learning, and next-gen computational models.
                        </motion.p>

                        <motion.div custom={3} variants={textVariant} initial="hidden" animate="visible">
                            <Link href="/research" className="group inline-flex items-center text-lg font-bold text-white border-b-2 border-white pb-1 hover:text-gray-300 hover:border-gray-300 transition-all">
                                <span className="mr-3">ENTER RESEARCH</span>
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

