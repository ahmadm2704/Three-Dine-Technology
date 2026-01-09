"use client";

import { motion } from "framer-motion";
import SketchyIcon from "@/components/ui/sketchy-icon";
import { User, Code2, PenTool, Layout, Terminal, Coffee } from "lucide-react";
import Link from "next/link";

export default function TeamPage() {
  const team = [
    {
      name: "Alex Morgan",
      role: "Founder & CEO",
      icon: Terminal,
      bio: "Visionary leader with 10+ years in software architecture.",
    },
    {
      name: "Sarah Chen",
      role: "Lead Developer",
      icon: Code2,
      bio: "Full-stack expert obsessed with clean code and performance.",
    },
    {
      name: "Marcus Johnson",
      role: "Creative Director",
      icon: PenTool,
      bio: "Award-winning designer bridging art and usability.",
    },
    {
      name: "Emily Davis",
      role: "Product Manager",
      icon: Layout,
      bio: "Ensuring smooth delivery and exceptional user experiences.",
    },
    {
      name: "David Kim",
      role: "Frontend Engineer",
      icon: User,
      bio: "React and animation wizard bringing interfaces to life.",
    },
    {
      name: "Jessica Lee",
      role: "Backend Specialist",
      icon: Coffee,
      bio: "Building robust APIs and scalable database architectures.",
    },
  ];

  return (
    <div className="bg-white min-h-screen pt-24 pb-20">

      {/* HERO */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-32">
        <div className="absolute top-0 left-0 -z-10 opacity-[0.05] pointer-events-none select-none">
          <span className="text-[15rem] leading-none font-bold uppercase">TEAM</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-20 text-center md:text-left"
        >
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tight mb-8">
            The <br />
            <span className="text-black">Squad</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl leading-relaxed font-light mx-auto md:mx-0">
            A collective of thinkers, makers, and problem solvers dedicated to digital excellence.
          </p>
        </motion.div>
      </section>

      {/* TEAM GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group text-center"
            >
              {/* Avatar Placeholder */}
              <div className="w-full aspect-square bg-gray-100 mb-8 flex items-center justify-center relative overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                <div className="w-1/3 h-1/3 opacity-20 group-hover:opacity-100 transition-opacity">
                  <SketchyIcon icon={member.icon} className="w-full h-full text-black" color="currentColor" />
                </div>
              </div>

              <h3 className="text-2xl font-black uppercase tracking-tight mb-2 group-hover:text-blue-600 transition-colors">
                {member.name}
              </h3>
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 border-t border-b border-gray-100 py-2 inline-block">
                {member.role}
              </div>
              <p className="text-gray-600 font-light leading-relaxed px-4">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* JOIN US CTA */}
      <section className="mt-40 bg-black text-white py-24 text-center">
        <h2 className="text-4xl md:text-5xl font-black uppercase mb-6">We are Hiring</h2>
        <p className="text-gray-400 mb-10 max-w-lg mx-auto">
          Looking for a new challenge? Join our team and help build the future.
        </p>
        <Link href="/contact" className="inline-block px-8 py-4 border border-white text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
          View Openings
        </Link>
      </section>
    </div>
  );
}
