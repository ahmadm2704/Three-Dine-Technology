"use client";

import Link from "next/link";
import { Plus, Edit, FileText, Download, Trash2, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function AdminPapersPage() {
    const supabase = createClient();
    const [papers, setPapers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPapers = async () => {
        const { data, error } = await supabase
            .from("research_papers")
            .select("*")
            .order("created_at", { ascending: false });
        if (data) setPapers(data);
        setLoading(false);
    };

    useEffect(() => { fetchPapers(); }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this paper?")) return;
        const { error } = await supabase.from("research_papers").delete().eq("id", id);
        if (error) {
            alert("Error deleting: " + error.message);
        } else {
            setPapers(papers.filter(p => p.id !== id));
        }
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black uppercase text-black">Research Papers</h1>
                    <p className="text-gray-500">Manage academic publications and whitepapers.</p>
                </div>
                <Link href="/admin/research/papers/new"
                    className="bg-black text-white px-6 py-3 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center">
                    <Plus className="w-5 h-5 mr-2" /> Add Paper
                </Link>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                </div>
            ) : (
                <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="p-4 font-bold uppercase text-xs text-gray-500 tracking-widest">Title</th>
                                <th className="p-4 font-bold uppercase text-xs text-gray-500 tracking-widest">Date</th>
                                <th className="p-4 font-bold uppercase text-xs text-gray-500 tracking-widest">Authors</th>
                                <th className="p-4 font-bold uppercase text-xs text-gray-500 tracking-widest">File</th>
                                <th className="p-4 font-bold uppercase text-xs text-gray-500 tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {papers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-gray-400 italic">
                                        No research papers published yet. Add one to get started.
                                    </td>
                                </tr>
                            ) : (
                                papers.map((paper: any) => (
                                    <tr key={paper.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="p-4 font-bold max-w-md truncate">{paper.title}</td>
                                        <td className="p-4 text-sm text-gray-600 font-mono">{paper.publication_date}</td>
                                        <td className="p-4 text-sm text-gray-500">{paper.authors?.join(", ") || "-"}</td>
                                        <td className="p-4">
                                            {paper.file_url ? (
                                                <a href={paper.file_url} target="_blank" className="flex items-center text-blue-600 hover:underline text-xs font-bold uppercase">
                                                    <Download className="w-3 h-3 mr-1" /> PDF
                                                </a>
                                            ) : (
                                                <span className="text-gray-400 text-xs">No File</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-right space-x-2">
                                            <button onClick={() => handleDelete(paper.id)} className="inline-block p-2 text-red-600 hover:bg-red-50 rounded">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
