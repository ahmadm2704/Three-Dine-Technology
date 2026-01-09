"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";
import SketchyIcon from "@/components/ui/sketchy-icon";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export default function ContactPage() {
  const supabase = createClient();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Web Development", // Default
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("tech_inquiries").insert({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      status: "new"
    });

    if (error) {
      alert("Error sending message: " + error.message);
    } else {
      setSent(true);
      setFormData({ name: "", email: "", subject: "Web Development", message: "" });
    }
    setLoading(false);
  };

  return (
    <div className="bg-white min-h-screen pt-20 flex flex-col md:flex-row">

      {/* LEFT SIDE: INFO (Black) */}
      <div className="w-full md:w-1/2 bg-black text-white p-12 md:p-24 flex flex-col justify-between relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none select-none">
          <span className="text-[20rem] font-bold text-outline-white whitespace-nowrap hidden md:block rotate-90">
            HELLO
          </span>
        </div>

        <div className="relative z-10">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-none">
            Let's <br /> Talk.
          </h1>
          <p className="text-xl text-gray-400 max-w-sm font-light">
            We are ready to engineer your vision. Tell us about your project.
          </p>
        </div>

        <div className="relative z-10 space-y-8 mt-12 md:mt-0">
          <div className="flex items-start space-x-6 group">
            <div className="w-12 h-12 text-white">
              <SketchyIcon icon={Mail} className="w-full h-full" color="currentColor" />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-1">Email</h3>
              <p className="text-xl font-bold">hello@threedinetech.com</p>
            </div>
          </div>
          {/* ... other info items (Phone, Studio) ... */}
        </div>
      </div>

      {/* RIGHT SIDE: FORM (White) */}
      <div className="w-full md:w-1/2 bg-white p-12 md:p-24 flex items-center">
        {sent ? (
          <div className="text-center w-full">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-4xl font-black uppercase mb-4">Message Sent</h2>
            <p className="text-gray-500 text-xl font-light">We will get back to you shortly.</p>
            <button onClick={() => setSent(false)} className="mt-8 text-black underline font-bold uppercase tracking-widest text-sm">Send Another</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-12">

            <div className="space-y-2 group">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 group-focus-within:text-black transition-colors">
                Your Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border-b-2 border-gray-200 py-4 text-xl font-bold text-black focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-200"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2 group">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 group-focus-within:text-black transition-colors">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border-b-2 border-gray-200 py-4 text-xl font-bold text-black focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-200"
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-2 group">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 group-focus-within:text-black transition-colors">
                Services Interested In
              </label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full border-b-2 border-gray-200 py-4 text-xl font-bold text-black focus:outline-none focus:border-black transition-colors bg-transparent cursor-pointer"
              >
                <option>Web Development</option>
                <option>Mobile App</option>
                <option>UI/UX Design</option>
                <option>Custom Software</option>
                <option>Other</option>
              </select>
            </div>

            <div className="space-y-2 group">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 group-focus-within:text-black transition-colors">
                Project Details
              </label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full border-b-2 border-gray-200 py-4 text-xl font-bold text-black focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-200 resize-none"
                placeholder="Tell us about your idea..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-4 bg-black text-white px-10 py-5 font-bold uppercase tracking-widest hover:bg-gray-800 transition-all group w-full md:w-auto justify-center"
            >
              <span>{loading ? "Sending..." : "Send Message"}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>

          </form>
        )}
      </div>
    </div>
  );
}
