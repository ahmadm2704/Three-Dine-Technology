"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Layout, Smartphone, Code2 } from "lucide-react";
import Link from "next/link";
import SketchyIcon from "@/components/ui/sketchy-icon";

// Map database categories/icons if needed, or just use defaults
const iconMap: any = {
    "Web Application": Layout,
    "Mobile App": Smartphone,
    "Blockchain": Code2,
    "E-Commerce": Layout,
    "IoT Platform": Code2,
    "LMS": Smartphone,
    // Default fallback
    "tech": Code2,
    "research": Code2,
    "other": Layout
};

export default function PortfolioClient({ projects }: { projects: any[] }) {


    return (
        <div className="bg-white min-h-screen pt-24 pb-20">

            {/* HERO */}
            <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-32">
                <div className="absolute top-0 right-0 -z-10 opacity-[0.05] pointer-events-none select-none">
                    <span className="text-[15rem] leading-none font-bold uppercase">WORK</span>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mt-20"
                >
                    <div className="inline-block px-3 py-1 bg-black text-white text-xs font-bold uppercase tracking-widest mb-6">
                        Selected Projects
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tight mb-8">
                        Digital <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-500" style={{ WebkitTextStroke: '2px black' }}>
                            Masterpieces
                        </span>
                    </h1>
                </motion.div>
            </section>

            {/* PORTFOLIO GRID */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => {
                        const Icon = iconMap[project.category] || Code2;

                        return (
                            <div key={project.id} className="group bg-gray-50 border-2 border-transparent hover:border-black transition-all duration-300 p-8 md:p-12 relative overflow-hidden">

                                {/* Category Label */}
                                <div className="flex justify-between items-start mb-12">
                                    <span className="text-xs font-bold uppercase tracking-widest bg-gray-200 px-2 py-1 text-gray-600 group-hover:bg-black group-hover:text-white transition-colors">
                                        {project.category}
                                    </span>
                                    <a href={project.demo_url || "#"} target="_blank" className="pointer-events-auto">
                                        <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </a>
                                </div>

                                {/* Icon Representation */}
                                <div className="w-20 h-20 mb-8 opacity-50 group-hover:opacity-100 transition-opacity">
                                    <SketchyIcon icon={Icon} className="w-full h-full text-black" color="currentColor" delay={index * 0.1} />
                                </div>

                                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-2">
                                    {project.title}
                                </h3>
                                {project.client && (
                                    <p className="text-sm font-bold uppercase text-gray-400 mb-6 tracking-wide">
                                        Client: {project.client}
                                    </p>
                                )}

                                <p className="text-gray-600 font-light leading-relaxed max-w-sm">
                                    {project.description}
                                </p>

                                {project.tech_stack && (
                                    <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-bold uppercase text-gray-400">
                                        {project.tech_stack.map((t: string) => <span key={t}>#{t}</span>)}
                                    </div>
                                )}

                                {/* Hover Overlay Effect */}
                                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 pointer-events-none transition-opacity"></div>
                            </div>
                        )
                    })}
                </div>
            </section>

            {/* CTA */}
            <section className="mt-40 text-center px-4">
                <h2 className="text-5xl font-black uppercase mb-4 tracking-tighter">Have an idea?</h2>
                <p className="text-gray-500 mb-10 text-xl font-light">Let's build something extraordinary together.</p>
                <Link href="/contact" className="inline-block px-12 py-6 bg-black text-white font-bold uppercase text-xl hover:bg-white hover:text-black border-2 border-black transition-all duration-300 tracking-widest">
                    Start a Project
                </Link>
            </section>
        </div>
    );
}
