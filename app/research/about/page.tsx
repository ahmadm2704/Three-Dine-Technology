"use client";

import { motion } from "framer-motion";
import { Users, Target, Lightbulb } from "lucide-react";
import SketchyIcon from "@/components/ui/sketchy-icon";

export default function ResearchAboutPage() {
    return (
        <div className="bg-white text-black">
            <section className="py-24 border-b border-black bg-black text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8">
                        The Mission
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed">
                        To bridge the gap between theoretical academia and practical industrial application.
                    </p>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <h2 className="text-4xl font-black uppercase">Our Methodology</h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            We employ a multi-disciplinary approach, combining data science, behavioral psychology, and systems engineering to solve complex problems. Our research is not just for show; it drives the core logic of Three Dine Technology's products.
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Founded by a team of PhDs and Industry veterans, we believe in open-source knowledge sharing and rigorous peer review.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                        {[
                            { icon: Target, title: "Precision", desc: "Data-driven accuracy in every study." },
                            { icon: Users, title: "Collaboration", desc: "Working with global minds." },
                            { icon: Lightbulb, title: "Innovation", desc: "Finding novel solutions to old problems." }
                        ].map((item, i) => (
                            <div key={i} className="flex items-start space-x-6 p-6 border border-black hover:shadow-xl transition-all">
                                <div className="w-12 h-12 shrink-0">
                                    <SketchyIcon icon={item.icon} className="w-full h-full" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold uppercase mb-2">{item.title}</h3>
                                    <p className="text-gray-600">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
