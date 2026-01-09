import { createClient } from "@/lib/supabase/server";
import { Mail, Clock, Building } from "lucide-react";

export default async function AdminResearchInquiriesPage() {
    const supabase = createClient();

    const { data: inquiries } = await supabase
        .from("research_inquiries")
        .select("*")
        .order("created_at", { ascending: false });

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-black uppercase text-black">Research Inquiries</h1>
                <p className="text-gray-500">Collaboration requests and data access applications.</p>
            </div>

            <div className="space-y-4">
                {!inquiries || inquiries.length === 0 ? (
                    <div className="text-center text-gray-400 italic py-12 bg-white border border-gray-100">
                        No inquiries yet.
                    </div>
                ) : (
                    inquiries.map((inquiry: any) => (
                        <div key={inquiry.id} className="bg-white border-l-4 border-blue-600 p-6 shadow-sm hover:shadow-md transition-shadow relative">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-bold flex items-center">
                                    {inquiry.institution && <Building className="w-4 h-4 mr-2 text-gray-400" />}
                                    {inquiry.institution || "Independent"}
                                </h3>
                                <span className="text-xs font-mono text-gray-400">{new Date(inquiry.created_at).toLocaleDateString()}</span>
                            </div>
                            <div className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-4 flex items-center">
                                <Mail className="w-3 h-3 mr-2" /> {inquiry.email} <span className="mx-2 text-gray-300">|</span> {inquiry.name}
                            </div>
                            <p className="text-gray-700 leading-relaxed bg-blue-50/50 p-4 font-mono text-sm">
                                {inquiry.message}
                            </p>
                            <div className="mt-4 flex justify-end">
                                <div className="flex items-center text-xs font-bold uppercase tracking-widest text-gray-400">
                                    <Clock className="w-3 h-3 mr-1" /> {inquiry.status}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
