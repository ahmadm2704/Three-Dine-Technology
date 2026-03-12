"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SketchyIcon from "@/components/ui/sketchy-icon";
import {
  Code2, Smartphone, Cloud, Brain,
  ShoppingCart, Shield, Database, Layout,
  ArrowRight, Loader2, Network, Server, ServerCog,
  HardDrive, Globe, Lock, Cpu, Wifi, Monitor,
  Settings, Wrench, BarChart, LineChart, PieChart,
  Layers, GitBranch, Terminal, Bot, Zap, Search,
  Mail, MessageSquare, FileCode, Blocks, Boxes,
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const iconMap: Record<string, any> = {
  Code2, Smartphone, Cloud, Brain, ShoppingCart, Shield, Database, Layout,
  Network, Server, ServerCog, HardDrive, Globe, Lock, Cpu, Wifi, Monitor,
  Settings, Wrench, BarChart, LineChart, PieChart, Layers, GitBranch,
  Terminal, Bot, Zap, Search, Mail, MessageSquare, FileCode, Blocks, Boxes,
};

const fallbackServices = [
  { id: "web", icon: "Code2", title: "Web Development", description: "Scalable, high-performance web applications using React, Next.js, and Node.js." },
  { id: "mobile", icon: "Smartphone", title: "Mobile Apps", description: "Native and cross-platform mobile solutions for iOS and Android." },
  { id: "cloud", icon: "Cloud", title: "Cloud Solutions", description: "AWS, Azure, and Google Cloud infrastructure design and management." },
  { id: "ai", icon: "Brain", title: "AI Integration", description: "Machine learning models and AI-powered automation integration." },
  { id: "ecommerce", icon: "ShoppingCart", title: "E-Commerce", description: "Custom online stores with seamless payment processing and inventory management." },
  { id: "cyber", icon: "Shield", title: "Cybersecurity", description: "Advanced security audits and implementation to protect your data." },
  { id: "data", icon: "Database", title: "Data Analytics", description: "Transforming raw data into actionable insights for business growth." },
  { id: "design", icon: "Layout", title: "UI/UX Design", description: "User-centric design that drives engagement and conversion." },
];

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("services")
          .select("*")
          .eq("is_active", true)
          .order("display_order", { ascending: true });

        if (error || !data || data.length === 0) {
          setServices(fallbackServices);
        } else {
          setServices(
            data.map((s: any) => ({
              id: s.slug || s.id,
              icon: s.icon || "Code2",
              title: s.title,
              description: s.description,
            }))
          );
        }
      } catch {
        setServices(fallbackServices);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen pt-24 pb-20">
      {/* HERO SECTION */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-32">
        <div className="absolute top-0 right-0 -z-10 opacity-[0.05] pointer-events-none select-none">
          <span className="text-[15rem] leading-none font-bold uppercase">EXP</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-20"
        >
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tight mb-8 dark:text-white">
            Our <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-400" style={{ WebkitTextStroke: '1px black' }}>
              Expertise
            </span>
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed font-light">
            We deliver comprehensive technical solutions tailored to your unique business challenges. From code to cloud, we have you covered.
          </p>
        </motion.div>
      </section>

      {/* SERVICES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 dark:bg-gray-700 border border-gray-200 dark:border-gray-700">
          {services.map((service, index) => (
            <div key={index} id={service.id} className="bg-white dark:bg-gray-950 p-12 hover:bg-blue-600 hover:text-white transition-all duration-500 group relative overflow-hidden">
              {/* Number Background */}
              <span className="absolute top-4 right-6 text-6xl font-black text-gray-100 dark:text-gray-800 group-hover:text-white/10 transition-colors">
                0{index + 1}
              </span>

              <div className="w-16 h-16 mb-8 text-black dark:text-white group-hover:text-white transition-colors">
                <SketchyIcon icon={iconMap[service.icon] || Code2} className="w-full h-full" color="currentColor" delay={index * 0.1} />
              </div>

              <h3 className="text-2xl font-bold uppercase tracking-tight mb-4 group-hover:translate-x-2 transition-transform duration-300">
                {service.title}
              </h3>

              <p className="text-gray-500 group-hover:text-gray-300 transition-colors leading-relaxed font-light relative z-10">
                {service.description}
              </p>

              <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                <Link href="/contact" className="inline-flex items-center text-sm font-bold uppercase tracking-widest border-b border-white pb-1">
                  Get Started <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mt-32 text-center px-4">
        <h2 className="text-4xl font-black uppercase mb-8 dark:text-white">Need a Custom Solution?</h2>
        <Link href="/contact" className="inline-block px-10 py-5 bg-blue-600 text-white font-bold uppercase tracking-widest hover:bg-blue-700 transition-colors">
          Contact Engineering
        </Link>
      </section>
    </div>
  );
}
