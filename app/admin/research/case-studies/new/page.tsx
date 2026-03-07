"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function NewResearchCaseStudyPage() {
    const supabase = createClient();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        summary: "",
        category: "",
        client_name: "",
        link_url: "",
        sort_order: 0,
        is_published: true,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.from("research_case_studies").insert(formData);

        if (error) {
            alert("Error adding case study: " + error.message);
            setLoading(false);
        } else {
            router.push("/admin/research/case-studies");
            router.refresh();
        }
    };

    return (
        <div className="p-8">
            <div className="mb-8 flex items-center">
                <Link href="/admin/research/case-studies" className="mr-4 text-gray-500 hover:text-black">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-3xl font-black uppercase text-black">New Research Case Study</h1>
            </div>

            <div className="max-w-2xl bg-white p-8 border border-gray-200 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Title</label>
                        <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full border-2 border-gray-200 p-3 font-bold focus:border-black focus:outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Summary</label>
                        <textarea rows={6} value={formData.summary} onChange={(e) => setFormData({ ...formData, summary: e.target.value })} className="w-full border-2 border-gray-200 p-3 text-sm focus:border-black focus:outline-none" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Category</label>
                            <input type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full border-2 border-gray-200 p-3 font-bold focus:border-black focus:outline-none" placeholder="e.g. Research Impact" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Client / Institution</label>
                            <input type="text" value={formData.client_name} onChange={(e) => setFormData({ ...formData, client_name: e.target.value })} className="w-full border-2 border-gray-200 p-3 font-bold focus:border-black focus:outline-none" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">External Link</label>
                            <input type="text" value={formData.link_url} onChange={(e) => setFormData({ ...formData, link_url: e.target.value })} className="w-full border-2 border-gray-200 p-3 text-sm focus:border-black focus:outline-none" placeholder="https://..." />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Sort Order</label>
                            <input type="number" value={formData.sort_order} onChange={(e) => setFormData({ ...formData, sort_order: Number(e.target.value) })} className="w-full border-2 border-gray-200 p-3 font-bold focus:border-black focus:outline-none" />
                        </div>
                    </div>
                    <label className="flex items-center gap-3 font-bold uppercase tracking-widest text-sm">
                        <input type="checkbox" checked={formData.is_published} onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })} />
                        Published
                    </label>
                    <button type="submit" disabled={loading} className="bg-black text-white px-8 py-4 font-black uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center justify-center w-full">
                        {loading ? "Saving..." : (<><Save className="w-5 h-5 mr-2" /> Add Case Study</>)}
                    </button>
                </form>
            </div>
        </div>
    );
}