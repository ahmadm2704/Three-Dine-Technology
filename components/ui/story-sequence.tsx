"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon } from "lucide-react";
import SketchyIcon from "./sketchy-icon";

interface StoryStage {
    icon: LucideIcon;
    label: string;
}

interface StorySequenceProps {
    stages: StoryStage[];
    color?: string;
}

export default function StorySequence({ stages, color = "currentColor" }: StorySequenceProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // We want a 10 second total duration.
        // If there are 4 stages, each stage is 2.5 seconds.
        const intervalDuration = 2500;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % stages.length);
        }, intervalDuration);

        return () => clearInterval(timer);
    }, [stages.length]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[200px] w-full">
            <div className="relative w-48 h-48 flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 1.1, rotate: 10 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <SketchyIcon
                            icon={stages[currentIndex].icon}
                            className="w-full h-full"
                            color={color}
                            // Reset animation on each change to trigger draw effect
                            delay={0}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="h-8 mt-6 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={currentIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`text-xl font-bold uppercase tracking-widest ${color}`}
                    >
                        {stages[currentIndex].label}
                    </motion.p>
                </AnimatePresence>
            </div>

            {/* Progress Bar */}
            <div className="w-32 h-1 bg-gray-200/20 rounded-full mt-4 overflow-hidden">
                <motion.div
                    key={currentIndex}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2.5, ease: "linear" }}
                    className={`h-full ${color.includes('white') ? 'bg-white' : 'bg-blue-600'}`}
                />
            </div>
        </div>
    );
}
