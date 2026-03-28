"use client";

import { Mail, Clock, Building2, Loader2, MessageSquare, Phone } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function AdminResearchInquiriesPage() {
    const supabase = createClient();
    const [inquiries, setInquiries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInquiries = async () => {
            const { data, error } = await supabase
                .from("contact_submissions")
                .select("*")
                .eq("service", "Research Division")
                .order("created_at", { ascending: false });
            if (data) setInquiries(data);
            setLoading(false);
        };
        fetchInquiries();
    }, []);

    const updateStatus = async (id: string, status: string) => {
        const { error } = await supabase.from("contact_submissions").update({ status }).eq("id", id);
        if (!error) {
            setInquiries(inquiries.map(i => i.id === id ? { ...i, status } : i));
        }
    };

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-black uppercase text-black">Research Inquiries</h1>
                <p className="text-gray-500">Academic collaboration and research requests.</p>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                </div>
            ) : (
                <div className="space-y-4">
                    {inquiries.length === 0 ? (
                        <div className="text-center text-gray-400 italic py-12 bg-white border border-gray-100">No inquiries yet.</div>
                    ) : (
                        inquiries.map((inquiry: any) => (
                            <div key={inquiry.id} className="bg-white border-l-4 border-black p-6 shadow-sm hover:shadow-md transition-shadow relative">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-bold flex items-center">
                                        {inquiry.company ? <Building2 className="w-4 h-4 mr-2 text-gray-400" /> : <Building2 className="w-4 h-4 mr-2 text-gray-400" />}
                                        {inquiry.company || "Independent Researcher"}
                                    </h3>
                                    <span className="text-xs font-mono text-gray-400">{new Date(inquiry.created_at).toLocaleDateString()}</span>
                                </div>
                                <div className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-4 flex flex-wrap gap-y-2 items-center">
                                    <Mail className="w-3 h-3 mr-2" /> {inquiry.email} 
                                    <span className="mx-2 text-gray-300">|</span> {inquiry.name}
                                    <span className="mx-2 text-gray-300">|</span> 
                                    <Phone className="w-3 h-3 mr-1 inline" /> {inquiry.phone || "No Phone"}
                                </div>
                                <div className="bg-gray-50 p-4 relative group">
                                     <MessageSquare className="absolute right-4 top-4 w-4 h-4 text-gray-200" />
                                     <p className="text-gray-700 leading-relaxed font-mono text-sm">{inquiry.message}</p>
                                </div>
                                <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                                    <div className="flex flex-wrap gap-2">
                                        {["new", "in_progress", "responded", "closed"].map(s => (
                                            <button
                                                key={s}
                                                onClick={() => updateStatus(inquiry.id, s)}
                                                className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 transition-all ${
                                                    inquiry.status === s
                                                        ? "bg-black text-white"
                                                        : "bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
                                                }`}
                                            >
                                                {s.replace("_", " ")}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                                        <Clock className="w-3 h-3 mr-2" /> Status: <span className="ml-1 text-black underline underline-offset-4">{inquiry.status}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
