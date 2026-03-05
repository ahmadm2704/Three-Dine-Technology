"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Code2, ChevronUp } from "lucide-react";
import Link from "next/link";

export default function PortfolioClient({ projects }: { projects: any[] }) {
    const [activeFilter, setActiveFilter] = useState("All");

    // Build unique categories from projects
    const categories = useMemo(() => {
        const cats = new Set(projects.map(p => p.category));
        return ["All", ...Array.from(cats)];
    }, [projects]);

    const filtered = activeFilter === "All"
        ? projects
        : projects.filter(p => p.category === activeFilter);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <div className="bg-[#0a0f1c] min-h-screen pt-24 pb-20 text-white">

            {/* HERO */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mt-12 text-center"
                >
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-4">
                        Our <span className="text-blue-500">Portfolio</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light">
                        Showcasing our best work across web, mobile, and AI projects.
                    </p>
                </motion.div>
            </section>

            {/* FILTER TABS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="flex flex-wrap justify-center gap-3">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wide transition-all duration-300 border ${
                                activeFilter === cat
                                    ? "bg-blue-600 border-blue-600 text-white"
                                    : "bg-transparent border-gray-600 text-gray-400 hover:border-blue-500 hover:text-blue-400"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* PORTFOLIO GRID */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtered.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="group"
                        >
                            <a
                                href={project.demo_url || "#"}
                                target={project.demo_url && project.demo_url !== "#" ? "_blank" : undefined}
                                rel="noopener noreferrer"
                                className="block"
                            >
                                {/* Image */}
                                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-800 mb-5 relative">
                                    {project.image_url ? (
                                        <img
                                            src={project.image_url}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                                            <Code2 className="w-16 h-16 text-gray-600" />
                                        </div>
                                    )}
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 transition-colors duration-300 flex items-center justify-center">
                                        <ArrowUpRight className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                </div>

                                {/* Text */}
                                <h3 className="text-xl font-black uppercase tracking-tight mb-1 group-hover:text-blue-400 transition-colors">
                                    {project.title}
                                </h3>
                                {project.client && (
                                    <p className="text-sm text-gray-500 font-medium mb-2">{project.client}</p>
                                )}
                                <p className="text-gray-400 text-sm font-light leading-relaxed">
                                    {project.description}
                                </p>
                            </a>
                        </motion.div>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        <p className="text-xl font-bold uppercase">No projects in this category yet.</p>
                    </div>
                )}
            </section>

            {/* CTA */}
            <section className="mt-32 text-center px-4">
                <h2 className="text-4xl md:text-5xl font-black uppercase mb-4 tracking-tighter">Have an idea?</h2>
                <p className="text-gray-400 mb-10 text-xl font-light">Let's build something extraordinary together.</p>
                <Link href="/contact" className="inline-block px-12 py-5 bg-blue-600 text-white font-bold uppercase text-lg hover:bg-blue-700 transition-all duration-300 tracking-widest rounded-sm">
                    Start a Project
                </Link>
            </section>

            {/* Scroll to top */}
            <button
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition-colors z-50"
            >
                <ChevronUp className="w-5 h-5" />
            </button>
        </div>
    );
}
