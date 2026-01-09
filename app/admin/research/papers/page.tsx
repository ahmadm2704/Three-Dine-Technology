import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, Edit, FileText, Download } from "lucide-react";

export default async function AdminPapersPage() {
    const supabase = createClient();

    const { data: papers, error } = await supabase
        .from("research_papers")
        .select("*")
        .order("publication_date", { ascending: false });

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black uppercase text-black">Research Papers</h1>
                    <p className="text-gray-500">Manage academic publications and whitepapers.</p>
                </div>
                <Link
                    href="/admin/research/papers/new"
                    className="bg-black text-white px-6 py-3 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center"
                >
                    <Plus className="w-5 h-5 mr-2" /> Add Paper
                </Link>
            </div>

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
                        {!papers || papers.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-gray-400 italic">
                                    No research papers published yet.
                                </td>
                            </tr>
                        ) : (
                            papers.map((paper: any) => (
                                <tr key={paper.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="p-4 font-bold max-w-md truncate">{paper.title}</td>
                                    <td className="p-4 text-sm text-gray-600 font-mono">{paper.publication_date}</td>
                                    <td className="p-4 text-sm text-gray-500">
                                        {paper.authors?.join(", ") || "-"}
                                    </td>
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
                                        <Link href={`/admin/research/papers/${paper.id}`} className="inline-block p-2 text-blue-600 hover:bg-blue-50 rounded">
                                            <Edit className="w-4 h-4" />
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
