"use client";

import {
  ArrowRight,
  Code2, Zap, Users, Star,
  Lightbulb, PenTool, Bug, Rocket, Trophy, Layout,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import SketchyIcon from "@/components/ui/sketchy-icon";
import StorySequence from "@/components/ui/story-sequence";

export default function TechnologyPage() {

  // 15-Second Story (6 stages * 2.5s = 15s total loop)
  const techProcessStory = [
    { icon: Lightbulb, label: "Concept & Strategy" },
    { icon: PenTool, label: "UI/UX Design" },
    { icon: Code2, label: "Development" },
    { icon: Bug, label: "Quality Assurance" },
    { icon: Rocket, label: "Deployment" },
    { icon: Trophy, label: "Market Success" },
  ];

  const features = [
    {
      icon: Code2,
      title: "Custom Development",
      description: "Tailored solutions built with cutting-edge technologies.",
    },
    {
      icon: Zap,
      title: "High Performance",
      description: "Optimized for speed, scalability, and efficiency.",
    },
    {
      icon: Users,
      title: "Dedicated Team",
      description: "Expert developers working as an extension of your team.",
    },
  ];

  const stats = [
    { number: "100+", label: "Projects" },
    { number: "50+", label: "Clients" },
    { number: "5+", label: "Years" },
    { number: "24/7", label: "Support" },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart",
      content: "ThreeDine Tech transformed our vision into reality. Unmatched expertise.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "CTO, InnovateCorp",
      content: "Outstanding work quality. They delivered beyond our expectations.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Founder, DigitalFlow",
      content: "Technical skills and creative approach helped us achieve remarkable results.",
      rating: 5,
    },
  ];

  return (
    <div className="bg-white min-h-screen text-black font-sans selection:bg-black selection:text-white">

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-black">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        {/* Massive Background Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.03]">
          <span className="text-[15vw] font-bold uppercase tracking-tighter leading-none whitespace-nowrap">
            INNOVATION
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-center md:text-left"
          >
            <div className="inline-block px-3 py-1 border border-black text-xs font-bold uppercase tracking-widest bg-black text-white">
              Premium Development Agency
            </div>

            <h1 className="text-6xl md:text-8xl font-black uppercase leading-[0.9] tracking-tight">
              We Build <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-500" style={{ WebkitTextStroke: '2px black' }}>
                Digital
              </span>
              <br />
              Realities.
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-lg leading-relaxed font-light mx-auto md:mx-0">
              From initial concept to market dominance. We engineer robust digital solutions that scale.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <Link
                href="/contact"
                className="group relative px-8 py-4 bg-black text-white font-bold text-lg uppercase tracking-wide hover:bg-gray-800 transition-all"
              >
                <span className="flex items-center space-x-3">
                  <span>Start Project</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <Link
                href="/portfolio"
                className="group inline-flex items-center justify-center px-8 py-4 border-2 border-black text-black font-bold text-lg uppercase tracking-wide hover:bg-black hover:text-white transition-all"
              >
                View Work
              </Link>
            </div>
          </motion.div>

          {/* Right: 15-Second Video Story */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center items-center relative"
          >
            {/* Decorative Circle */}
            <div className="absolute inset-0 border border-dashed border-gray-300 rounded-full animate-spin-slow pointer-events-none" style={{ animationDuration: '30s' }}></div>
            <div className=" bg-white p-12 rounded-full shadow-2xl shadow-gray-200 border border-gray-100 z-10 w-[400px] h-[400px] flex items-center justify-center">
              <StorySequence stages={techProcessStory} color="text-black" />
            </div>
          </motion.div>

        </div>
      </section>

      {/* 2. SERVICES SECTION - "Services" Background Text */}
      <section className="bg-black text-white py-32 relative overflow-hidden">
        {/* Huge Background Text */}
        <div className="absolute top-0 right-0 pointer-events-none select-none opacity-20 transform translate-x-1/4">
          <span className="text-[20rem] font-bold text-outline-white whitespace-nowrap leading-none">
            CODE
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-20 border-b border-gray-800 pb-8 flex flex-col md:flex-row justify-between items-end">
            <div>
              <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-4">Core Services</h2>
              <p className="text-gray-400 max-w-md text-lg">Precision engineering for the modern web.</p>
            </div>
            <div className="mt-8 md:mt-0">
              <Link href="/services" className="text-white border-b border-white pb-1 hover:text-gray-300 transition-colors uppercase font-bold tracking-widest text-sm flex items-center">
                All Services <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-gray-800">
            {features.map((feature, index) => (
              <div key={index} className="group p-12 border-b border-r border-gray-800 hover:bg-white/5 transition-colors cursor-default relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="text-6xl font-bold font-serif italic">{index + 1}</span>
                </div>

                <div className="w-20 h-20 mb-8 text-white">
                  <SketchyIcon icon={feature.icon} className="w-full h-full" color="text-white" delay={index * 0.2} />
                </div>

                <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight group-hover:text-blue-400 transition-colors">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed font-light">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. STATS SECTION - Minimalist */}
      <section className="py-24 bg-white border-b border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-6xl md:text-7xl font-black text-black mb-2 group-hover:scale-110 transition-transform duration-300 inline-block font-sans">
                  {stat.number}
                </div>
                <div className="text-gray-500 font-bold uppercase tracking-widest text-sm border-t-2 border-transparent group-hover:border-black pt-4 inline-block transition-all">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TESTIMONIALS - Clean Grid */}
      <section className="py-32 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-6">Clients Trust Us</h2>
            <div className="h-1 w-24 bg-black mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-10 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="flex items-center mb-6 text-black">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-gray-800 mb-8 leading-loose italic text-lg">"{testimonial.content}"</p>
                <div className="flex items-center border-t border-gray-100 pt-6">
                  <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold mr-4">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-black uppercase text-sm tracking-wide">{testimonial.name}</div>
                    <div className="text-gray-500 text-xs font-bold uppercase">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION - Footer Style */}
      <section className="bg-black text-white py-40 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-6xl md:text-8xl font-black uppercase mb-8 leading-none">
            Let's create <br /> <span className="text-outline-white">Greatness</span>
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-xl mx-auto">
            Ready to start your digital transformation?
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-black font-black text-xl px-16 py-6 hover:bg-transparent hover:text-white hover:border-white border-2 border-white transition-all duration-300 uppercase tracking-widest"
          >
            Get In Touch
          </Link>
        </div>
      </section>

    </div>
  );
}
