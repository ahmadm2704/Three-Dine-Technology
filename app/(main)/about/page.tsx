"use client";

import { motion } from "framer-motion";
import SketchyIcon from "@/components/ui/sketchy-icon";
import { Flag, Target, Heart, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    const values = [
        {
            icon: Flag,
            title: "Integrity",
            desc: "We build with honesty and transparency at every step."
        },
        {
            icon: Target,
            title: "Precision",
            desc: "Pixel-perfect design and bulletproof code is our standard."
        },
        {
            icon: Heart,
            title: "Passion",
            desc: "We love what we do, and it shows in our products."
        },
        {
            icon: Zap,
            title: "Speed",
            desc: "Rapid delivery without compromising on quality."
        }
    ];

    return (
        <div className="bg-white min-h-screen pt-24 pb-20">

            {/* HERO */}
            <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-32">
                <div className="absolute top-0 right-0 -z-10 opacity-[0.05] pointer-events-none select-none">
                    <span className="text-[15rem] leading-none font-bold uppercase">ABT</span>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                >
                    <div>
                        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tight mb-8">
                            Who <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-500" style={{ WebkitTextStroke: '2px black' }}>
                                We Are
                            </span>
                        </h1>
                        <div className="h-1 w-24 bg-black mb-8"></div>
                    </div>

                    <div className="text-xl leading-relaxed font-light text-gray-600">
                        <p className="mb-6">
                            Three Dine Technology is a forward-thinking digital innovation agency. We bridge the gap between complex problems and elegant, scalable solutions.
                        </p>
                        <p>
                            Born from a desire to redefine the industry standard, we combine artistic vision with rigorous engineering to build software that matters.
                        </p>
                    </div>
                </motion.div>
            </section>

            {/* VALUES GRID */}
            <section className="bg-black text-white py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-black uppercase mb-16 text-center tracking-tighter">Our Core DNA</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {values.map((value, index) => (
                            <div key={index} className="text-center group">
                                <div className="w-24 h-24 mx-auto mb-8 text-white relative">
                                    <div className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                                    <SketchyIcon icon={value.icon} className="w-full h-full relative z-10" color="currentColor" delay={index * 0.2} />
                                </div>
                                <h3 className="text-2xl font-bold uppercase mb-4 tracking-wide">{value.title}</h3>
                                <p className="text-gray-400 font-light leading-relaxed">
                                    {value.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* STORY SECTION */}
            <section className="py-32 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start gap-16">
                <div className="md:w-1/3">
                    <h2 className="text-5xl font-black uppercase sticky top-32 leading-none">
                        Our <br /> <span className="text-outline-black">Origin</span>
                    </h2>
                </div>
                <div className="md:w-2/3 space-y-12 text-lg text-gray-800 leading-loose border-l-2 border-black pl-8 md:pl-16">
                    <div>
                        <span className="text-4xl font-black block mb-4">2018</span>
                        <p>Four engineers in a garage with a shared skepticism of "bloated software." The first line of code for Three Dine was written on a napkin.</p>
                    </div>
                    <div>
                        <span className="text-4xl font-black block mb-4">2020</span>
                        <p>Expanded to a team of 15. Delivered our first enterprise-grade system for a Fortune 500 logistics company.</p>
                    </div>
                    <div>
                        <span className="text-4xl font-black block mb-4">2024</span>
                        <p>Launched the Research division to explore AI and Quantum Computing applications. Technology isn't just our job; it's our playground.</p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="text-center py-24 border-t border-black">
                <Link href="/team" className="group inline-flex items-center text-4xl font-black uppercase hover:text-gray-500 transition-colors">
                    Meet the Team <ArrowRight className="ml-4 w-12 h-12 group-hover:translate-x-4 transition-transform" />
                </Link>
            </section>

        </div>
    );
}
