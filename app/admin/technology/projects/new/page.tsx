"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function NewProjectPage() {
    const supabase = createClient();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        client: "",
        category: "Web App",
        image_url: "",
        demo_url: "",
        repo_url: "",
        tech_stack: "", // Comma separated
        is_featured: false
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const stackArray = formData.tech_stack.split(",").map(s => s.trim()).filter(s => s);

        const { error } = await supabase.from("tech_projects").insert({
            title: formData.title,
            description: formData.description,
            client: formData.client, // Added client field support
            image_url: formData.image_url,
            demo_url: formData.demo_url,
            repo_url: formData.repo_url,
            tech_stack: stackArray,
            is_featured: formData.is_featured
        });

        if (error) {
            alert("Error creating project: " + error.message);
            setLoading(false);
        } else {
            router.push("/admin/technology/projects");
            router.refresh();
        }
    };

    return (
        <div className="p-8">
            <div className="mb-8 flex items-center">
                <Link href="/admin/technology/projects" className="mr-4 text-gray-500 hover:text-black">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-3xl font-black uppercase text-black">New Project</h1>
            </div>

            <div className="max-w-2xl bg-white p-8 border border-gray-200 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Title</label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full border-2 border-gray-200 p-3 font-bold focus:border-black focus:outline-none"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Description</label>
                            <textarea
                                rows={4}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full border-2 border-gray-200 p-3 text-sm focus:border-black focus:outline-none"
                            />
                        </div>

                        <div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Client</label>
                                <input
                                    type="text"
                                    value={formData.client}
                                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                                    className="w-full border-2 border-gray-200 p-3 font-bold focus:border-black focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Category</label>
                                <input
                                    type="text"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full border-2 border-gray-200 p-3 font-bold focus:border-black focus:outline-none"
                                    placeholder="e.g. Fintech, Healthcare"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Image URL</label>
                            <input
                                type="text"
                                value={formData.image_url}
                                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                className="w-full border-2 border-gray-200 p-3 text-sm focus:border-black focus:outline-none"
                                placeholder="https://..."
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Tech Stack (comma separated)</label>
                            <input
                                type="text"
                                value={formData.tech_stack}
                                onChange={(e) => setFormData({ ...formData, tech_stack: e.target.value })}
                                className="w-full border-2 border-gray-200 p-3 text-sm focus:border-black focus:outline-none"
                                placeholder="React, Next.js, TypeScript..."
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Demo URL</label>
                            <input
                                type="text"
                                value={formData.demo_url}
                                onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
                                className="w-full border-2 border-gray-200 p-3 text-sm focus:border-black focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Repo URL</label>
                            <input
                                type="text"
                                value={formData.repo_url}
                                onChange={(e) => setFormData({ ...formData, repo_url: e.target.value })}
                                className="w-full border-2 border-gray-200 p-3 text-sm focus:border-black focus:outline-none"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.is_featured}
                                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                                    className="w-5 h-5 text-black border-2 border-gray-300 rounded focus:ring-black"
                                />
                                <span className="font-bold uppercase tracking-widest text-sm">Feature on Homepage?</span>
                            </label>
                        </div>

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-black text-white px-8 py-4 font-black uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center justify-center w-full"
                    >
                        {loading ? "Saving..." : (
                            <>
                                <Save className="w-5 h-5 mr-2" /> Save Project
                            </>
                        )}
                    </button>

                </form>
            </div>
        </div>
    );
}
