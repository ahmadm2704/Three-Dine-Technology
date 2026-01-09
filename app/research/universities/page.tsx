"use client";

import { Building2, Globe, GraduationCap } from "lucide-react";

export default function ResearchUniversitiesPage() {
    const universities = [
        { name: "Stanford University", location: "USA", description: "Joint AI Ethics Lab Partnership." },
        { name: "MIT", location: "USA", description: "Computational Systems Research." },
        { name: "University of Cambridge", location: "UK", description: "Quantum Computing Algorithms." },
        { name: "ETH Zurich", location: "Switzerland", description: "Robotics and Automation Control." },
        { name: "Tsinghua University", location: "China", description: "Large Scale Data Mining." },
        { name: "University of Toronto", location: "Canada", description: "Deep Learning Fundamentals." },
    ];

    return (
        <div className="bg-white text-black">
            <section className="bg-black text-white py-24 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
                        Academic Partners
                    </h1>
                    <p className="text-xl text-gray-400">Collaborating with the world's brightest minds.</p>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {universities.map((uni, i) => (
                        <div key={i} className="border border-black p-8 hover:bg-black hover:text-white transition-all group cursor-default">
                            <div className="w-16 h-16 mb-6 bg-gray-100 text-black flex items-center justify-center rounded-none group-hover:bg-white transition-colors">
                                <GraduationCap className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold uppercase mb-2">{uni.name}</h3>
                            <div className="flex items-center text-sm font-bold uppercase tracking-widest text-gray-500 group-hover:text-gray-300 mb-4">
                                <Globe className="w-4 h-4 mr-2" /> {uni.location}
                            </div>
                            <p className="text-gray-600 group-hover:text-gray-400 leading-relaxed font-light">
                                {uni.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
