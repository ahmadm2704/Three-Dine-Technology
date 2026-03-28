"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Code2, Microscope, Mail, Phone, User, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { submitContactForm } from "@/app/actions/contact";

type Service = "technology" | "research" | null;

export default function GetInTouchPage() {
    const [selected, setSelected] = useState<Service>(null);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("email", form.email);
        formData.append("phone", form.phone);
        formData.append("message", form.message);
        formData.append("service", selected === "technology" ? "Technology Division" : "Research Division");

        const result = await submitContactForm(formData);

        setLoading(false);
        if (result.success) {
            setSubmitted(true);
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">

            {/* NAVBAR */}
            <div className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-gray-100">
                <Link href="/" className="flex items-center gap-2.5">
                    <span className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center font-black text-xs tracking-tighter">TD</span>
                    <div className="flex flex-col leading-none">
                        <span className="text-black font-black text-xs uppercase tracking-widest leading-tight">Three Dine</span>
                        <span className="text-blue-600 font-black text-xs uppercase tracking-widest leading-tight">Corporation</span>
                    </div>
                </Link>
                <Link href="/" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors">
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back
                </Link>
            </div>

            {/* CONTENT */}
            <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">

                <AnimatePresence mode="wait">

                    {/* STEP 1 — Pick a service */}
                    {!selected && (
                        <motion.div
                            key="pick"
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -24 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="w-full max-w-2xl"
                        >
                            <div className="text-center mb-12">
                                <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-3">Get in Touch</p>
                                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-black mb-4">
                                    What can we<br />help you with?
                                </h1>
                                <p className="text-gray-500 text-sm">Select a division to get started.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Technology card */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelected("technology")}
                                    className="group relative bg-white border-2 border-gray-200 hover:border-blue-600 p-8 text-left transition-all duration-300 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                                    <div className="relative z-10">
                                        <div className="w-12 h-12 bg-blue-100 group-hover:bg-white/20 flex items-center justify-center mb-5 transition-colors">
                                            <Code2 className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                                        </div>
                                        <h2 className="text-xl font-black uppercase tracking-tight text-black group-hover:text-white mb-2 transition-colors">Technology</h2>
                                        <p className="text-sm text-gray-500 group-hover:text-blue-100 transition-colors leading-relaxed">
                                            Web development, software solutions, and digital transformation.
                                        </p>
                                        <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600 group-hover:text-white transition-colors">
                                            Select <ArrowRight className="w-3.5 h-3.5" />
                                        </div>
                                    </div>
                                </motion.button>

                                {/* Research card */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelected("research")}
                                    className="group relative bg-black border-2 border-black hover:border-black p-8 text-left transition-all duration-300 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gray-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                                    <div className="relative z-10">
                                        <div className="w-12 h-12 bg-white/10 flex items-center justify-center mb-5">
                                            <Microscope className="w-6 h-6 text-white" />
                                        </div>
                                        <h2 className="text-xl font-black uppercase tracking-tight text-white mb-2">Research</h2>
                                        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                                            Academic support, thesis writing, journals, and statistical analysis.
                                        </p>
                                        <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">
                                            Select <ArrowRight className="w-3.5 h-3.5" />
                                        </div>
                                    </div>
                                </motion.button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 2 — Contact form */}
                    {selected && !submitted && (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -24 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="w-full max-w-xl"
                        >
                            <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors mb-8">
                                <ArrowLeft className="w-3.5 h-3.5" /> Change selection
                            </button>

                            <div className="mb-8">
                                <div className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase tracking-widest mb-4 ${selected === "technology" ? "bg-blue-600 text-white" : "bg-black text-white"}`}>
                                    {selected === "technology" ? <Code2 className="w-3.5 h-3.5" /> : <Microscope className="w-3.5 h-3.5" />}
                                    {selected === "technology" ? "Three Dine Technology" : "Three Dine Research"}
                                </div>
                                <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-black">
                                    Tell us about<br />your project
                                </h1>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5 block">Full Name</label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                required
                                                type="text"
                                                placeholder="Enter your full name"
                                                value={form.name}
                                                onChange={e => setForm({ ...form, name: e.target.value })}
                                                className="w-full border-2 border-gray-200 pl-10 pr-4 py-3 text-sm focus:border-black focus:outline-none transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5 block">Email</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                required
                                                type="email"
                                                placeholder="Enter your email address"
                                                value={form.email}
                                                onChange={e => setForm({ ...form, email: e.target.value })}
                                                className="w-full border-2 border-gray-200 pl-10 pr-4 py-3 text-sm focus:border-black focus:outline-none transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5 block">Phone Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            required
                                            type="tel"
                                            placeholder="Enter Your Phone Number"
                                            value={form.phone}
                                            onChange={e => setForm({ ...form, phone: e.target.value })}
                                            className="w-full border-2 border-gray-200 pl-10 pr-4 py-3 text-sm focus:border-black focus:outline-none transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5 block">Message</label>
                                    <div className="relative">
                                        <MessageSquare className="absolute left-3 top-4 w-4 h-4 text-gray-400" />
                                        <textarea
                                            required
                                            rows={4}
                                            placeholder={selected === "technology"
                                                ? "Describe your software or web project..."
                                                : "Describe your research requirements..."}
                                            value={form.message}
                                            onChange={e => setForm({ ...form, message: e.target.value })}
                                            className="w-full border-2 border-gray-200 pl-10 pr-4 py-3 text-sm focus:border-black focus:outline-none transition-colors resize-none"
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <div className="p-3 bg-red-50 text-red-600 text-xs font-bold uppercase tracking-widest text-center">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full py-4 font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all ${selected === "technology" ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-black hover:bg-gray-900 text-white"}`}
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</span>
                                    ) : (
                                        <><Send className="w-4 h-4" /> Send Message</>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    )}

                    {/* STEP 3 — Success */}
                    {submitted && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="text-center max-w-sm"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.1, duration: 0.4, type: "spring", stiffness: 200 }}
                                className="w-16 h-16 bg-green-100 flex items-center justify-center mx-auto mb-6"
                            >
                                <CheckCircle2 className="w-8 h-8 text-green-600" />
                            </motion.div>
                            <h2 className="text-3xl font-black uppercase tracking-tight mb-3">We got it!</h2>
                            <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                                Thanks for reaching out to{" "}
                                <strong>{selected === "technology" ? "Three Dine Technology" : "Three Dine Research"}</strong>.
                                Our team will get back to you within 24 hours.
                            </p>
                            <Link href="/" className="inline-block px-8 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
                                Back to Home
                            </Link>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}
