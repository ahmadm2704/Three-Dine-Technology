"use client";

import Link from "next/link";
import { Plus, Edit, Trash2, Loader2, ClipboardList } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function AdminResearchCaseStudiesPage() {
    const supabase = createClient();
    const [caseStudies, setCaseStudies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCaseStudies = async () => {
        const { data } = await supabase
            .from("research_case_studies")
            .select("*")
            .order("sort_order", { ascending: true })
            .order("created_at", { ascending: false });

        if (data) setCaseStudies(data);
        setLoading(false);
    };

    useEffect(() => { fetchCaseStudies(); }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this case study?")) return;
        const { error } = await supabase.from("research_case_studies").delete().eq("id", id);
        if (error) {
            alert("Error deleting: " + error.message);
        } else {
            setCaseStudies(caseStudies.filter((item) => item.id !== id));
        }
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black uppercase text-black">Research Case Studies</h1>
                    <p className="text-gray-500">Manage the case studies shown on the public research side.</p>
                </div>
                <Link href="/admin/research/case-studies/new" className="bg-black text-white px-6 py-3 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center">
                    <Plus className="w-5 h-5 mr-2" /> Add Case Study
                </Link>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {caseStudies.length === 0 ? (
                        <div className="col-span-full text-center text-gray-400 italic py-12">No case studies found. Add one to get started.</div>
                    ) : (
                        caseStudies.map((item) => (
                            <div key={item.id} className="bg-white border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all relative group">
                                <div className="absolute top-3 right-3 flex space-x-1 opacity-0 group-hover:opacity-100 transition-all">
                                    <Link href={`/admin/research/case-studies/${item.id}`} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                                        <Edit className="w-4 h-4" />
                                    </Link>
                                    <button onClick={() => handleDelete(item.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="w-14 h-14 bg-gray-100 flex items-center justify-center mb-6">
                                    <ClipboardList className="w-7 h-7 text-gray-400" />
                                </div>
                                <div className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">{item.category || "Case Study"}</div>
                                <h3 className="font-bold uppercase text-xl mb-2">{item.title}</h3>
                                {item.client_name ? <div className="text-xs text-gray-500 uppercase tracking-widest mb-3">{item.client_name}</div> : null}
                                <p className="text-sm text-gray-500 line-clamp-3">{item.summary || "No summary provided."}</p>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}