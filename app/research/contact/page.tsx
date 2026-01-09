"use client";

import { Send, MapPin, Mail } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export default function ResearchContactPage() {
    const supabase = createClient();
    const [formData, setFormData] = useState({
        name: "",
        institution: "",
        email: "", // Missing from original UI but needed for DB, adding input
        subject: "Proposal for Collaboration",
        message: ""
    });
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Assuming 'research_inquiries' table exists
        const { error } = await supabase.from("research_inquiries").insert({
            name: formData.name,
            email: formData.email,
            institution: formData.institution,
            message: formData.message,
            // DB structure might not have subject column based on previous SQL? 
            // Let's check SQL... yes it does NOT have subject, but it has 'institution'.
            // Wait, 'research_inquiries' has (name, email, institution, message, status).
            // So I will just use these fields.
            status: "new"
        });

        if (error) {
            alert("Error sending inquiry: " + error.message);
        } else {
            setSent(true);
            setFormData({ name: "", institution: "", email: "", subject: "Proposal for Collaboration", message: "" });
        }
        setLoading(false);
    };

    return (
        <div className="bg-white text-black min-h-screen flex flex-col md:flex-row">

            {/* LEFT: Info */}
            <div className="w-full md:w-1/2 bg-black text-white p-12 md:p-24 flex flex-col justify-center">
                <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-none">
                    Start The <br /> Dialogue
                </h1>
                <p className="text-xl text-gray-400 font-light mb-12">
                    Partner with Three Dine Research for academic collaboration, R&D projects, or speaking engagements.
                </p>

                <div className="space-y-8">
                    <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 border border-white/20 flex items-center justify-center shrink-0">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="uppercase font-bold tracking-widest mb-1 text-sm">Headquarters</h3>
                            <p className="text-gray-400">123 Innovation Blvd, Tech District<br />San Francisco, CA 94105</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 border border-white/20 flex items-center justify-center shrink-0">
                            <Mail className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="uppercase font-bold tracking-widest mb-1 text-sm">Email Us</h3>
                            <p className="text-gray-400">research@threedinetech.com</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT: Form */}
            <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center bg-white">
                {sent ? (
                    <div className="text-center w-full">
                        <div className="text-6xl mb-4">🔬</div>
                        <h2 className="text-4xl font-black uppercase mb-4">Inquiry Received</h2>
                        <p className="text-gray-500 text-xl font-light">Our research team will review your proposal.</p>
                        <button onClick={() => setSent(false)} className="mt-8 text-black underline font-bold uppercase tracking-widest text-sm">Submit Another</button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-widest text-gray-500">Full Name</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full border-b-2 border-gray-200 py-3 focus:outline-none focus:border-black transition-colors text-xl font-bold bg-transparent"
                                placeholder="John Doe"
                            />
                        </div>

                        {/* Added Email Field manually since it was missing but required by DB */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-widest text-gray-500">Email Address</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full border-b-2 border-gray-200 py-3 focus:outline-none focus:border-black transition-colors text-xl font-bold bg-transparent"
                                placeholder="john@university.edu"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-widest text-gray-500">Institution / Organization</label>
                            <input
                                type="text"
                                value={formData.institution}
                                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                                className="w-full border-b-2 border-gray-200 py-3 focus:outline-none focus:border-black transition-colors text-xl font-bold bg-transparent"
                                placeholder="University of X"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-widest text-gray-500">Research Interest</label>
                            <select
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className="w-full border-b-2 border-gray-200 py-3 focus:outline-none focus:border-black transition-colors text-xl font-bold bg-transparent"
                            >
                                <option>Proposal for Collaboration</option>
                                <option>Access to Data</option>
                                <option>Speaking Opportunity</option>
                                <option>General Inquiry</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-widest text-gray-500">Message</label>
                            <textarea
                                required
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full border-b-2 border-gray-200 py-3 focus:outline-none focus:border-black transition-colors text-lg bg-transparent min-h-[100px]"
                                placeholder="Describe your inquiry..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black text-white py-6 font-black uppercase tracking-widest hover:bg-blue-600 transition-colors flex items-center justify-center group"
                        >
                            {loading ? "Sending..." : (
                                <>
                                    Send Inquiry <Send className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                )}
            </div>

        </div>
    )
}
