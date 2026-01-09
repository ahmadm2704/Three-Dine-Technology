"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Save, Upload } from "lucide-react";
import Link from "next/link";

export default function NewPaperPage() {
    const supabase = createClient();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        abstract: "",
        file_url: "",
        publication_date: "",
        authors: "", // Comma separated
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const authorsArray = formData.authors.split(",").map(s => s.trim()).filter(s => s);

        const { error } = await supabase.from("research_papers").insert({
            title: formData.title,
            abstract: formData.abstract,
            file_url: formData.file_url,
            publication_date: formData.publication_date,
            authors: authorsArray,
        });

        if (error) {
            alert("Error publishing paper: " + error.message);
            setLoading(false);
        } else {
            router.push("/admin/research/papers");
            router.refresh();
        }
    };

    return (
        <div className="p-8">
            <div className="mb-8 flex items-center">
                <Link href="/admin/research/papers" className="mr-4 text-gray-500 hover:text-black">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-3xl font-black uppercase text-black">New Publication</h1>
            </div>

            <div className="max-w-2xl bg-white p-8 border border-gray-200 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Paper Title</label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full border-2 border-gray-200 p-3 font-bold focus:border-black focus:outline-none"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Abstract</label>
                            <textarea
                                rows={6}
                                value={formData.abstract}
                                onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                                className="w-full border-2 border-gray-200 p-3 text-sm focus:border-black focus:outline-none"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">PDF URL (Upload to Storage first)</label>
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    value={formData.file_url}
                                    onChange={(e) => setFormData({ ...formData, file_url: e.target.value })}
                                    className="w-full border-2 border-gray-200 p-3 text-sm focus:border-black focus:outline-none"
                                    placeholder="https://..."
                                />
                                {/* 
                     NOTE: Real file upload requires bucket setup. 
                     For now we assume user pastes a URL from Supabase Storage dashboard or external.
                 */}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Publication Date</label>
                            <input
                                type="date"
                                required
                                value={formData.publication_date}
                                onChange={(e) => setFormData({ ...formData, publication_date: e.target.value })}
                                className="w-full border-2 border-gray-200 p-3 text-sm focus:border-black focus:outline-none"
                            />
                        </div>

                        <div>
                            {/* Empty for grid balance */}
                        </div>

                        <div className="col-span-2">
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Authors (comma separated)</label>
                            <input
                                type="text"
                                value={formData.authors}
                                onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
                                className="w-full border-2 border-gray-200 p-3 text-sm focus:border-black focus:outline-none"
                                placeholder="Dr. Smith, A. Johnson..."
                            />
                        </div>

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-black text-white px-8 py-4 font-black uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center justify-center w-full"
                    >
                        {loading ? "Publishing..." : (
                            <>
                                <Save className="w-5 h-5 mr-2" /> Publish Paper
                            </>
                        )}
                    </button>

                </form>
            </div>
        </div>
    );
}
