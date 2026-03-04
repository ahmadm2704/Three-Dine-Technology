"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import { ImageUploadField } from "@/components/admin/image-upload-field";

export default function EditProjectPage() {
    const supabase = createClient();
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        client_name: "",
        project_type: "Web App",
        image_url: "",
        demo_url: "",
        repo_url: "",
        tech_stack: "",
        is_featured: false,
        is_public: true,
        status: "in_progress",
    });

    useEffect(() => {
        async function fetchProject() {
            const { data, error } = await supabase.from("projects").select("*").eq("id", id).single();
            if (data) {
                setFormData({
                    name: data.name || "",
                    description: data.description || "",
                    client_name: data.client_name || "",
                    project_type: data.project_type || "Web App",
                    image_url: data.image_url || "",
                    demo_url: data.demo_url || "",
                    repo_url: data.repo_url || "",
                    tech_stack: (data.technologies || []).join(", "),
                    is_featured: data.is_featured || false,
                    is_public: data.is_public || true,
                    status: data.status || "in_progress",
                });
            }
            setFetching(false);
        }
        fetchProject();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const techArray = formData.tech_stack.split(",").map(s => s.trim()).filter(s => s);

        const { error } = await supabase.from("projects").update({
            name: formData.name,
            description: formData.description,
            client_name: formData.client_name,
            project_type: formData.project_type,
            image_url: formData.image_url,
            demo_url: formData.demo_url,
            repo_url: formData.repo_url,
            technologies: techArray,
            is_featured: formData.is_featured,
            is_public: formData.is_public,
            status: formData.status,
        }).eq("id", id);

        if (error) {
            alert("Error updating project: " + error.message);
            setLoading(false);
        } else {
            router.push("/admin/technology/projects");
            router.refresh();
        }
    };

    if (fetching) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="mb-8 flex items-center">
                <Link href="/admin/technology/projects" className="mr-4 text-gray-500 hover:text-black">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-3xl font-black uppercase text-black">Edit Project</h1>
            </div>

            <div className="max-w-2xl bg-white p-8 border border-gray-200 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Project Name</label>
                            <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full border-2 border-gray-200 p-3 font-bold focus:border-black focus:outline-none" />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Description</label>
                            <textarea rows={4} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full border-2 border-gray-200 p-3 text-sm focus:border-black focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Client Name</label>
                            <input type="text" required value={formData.client_name} onChange={(e) => setFormData({ ...formData, client_name: e.target.value })} className="w-full border-2 border-gray-200 p-3 font-bold focus:border-black focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Project Type</label>
                            <input type="text" value={formData.project_type} onChange={(e) => setFormData({ ...formData, project_type: e.target.value })} className="w-full border-2 border-gray-200 p-3 font-bold focus:border-black focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Status</label>
                            <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full border-2 border-gray-200 p-3 font-bold focus:border-black focus:outline-none bg-white">
                                <option value="planning">Planning</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                                <option value="on_hold">On Hold</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                        <div className="col-span-2">
                            <ImageUploadField label="Project Image" value={formData.image_url} onChange={(url) => setFormData({ ...formData, image_url: url })} />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Tech Stack (comma separated)</label>
                            <input type="text" value={formData.tech_stack} onChange={(e) => setFormData({ ...formData, tech_stack: e.target.value })} className="w-full border-2 border-gray-200 p-3 text-sm focus:border-black focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Demo URL</label>
                            <input type="text" value={formData.demo_url} onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })} className="w-full border-2 border-gray-200 p-3 text-sm focus:border-black focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Repo URL</label>
                            <input type="text" value={formData.repo_url} onChange={(e) => setFormData({ ...formData, repo_url: e.target.value })} className="w-full border-2 border-gray-200 p-3 text-sm focus:border-black focus:outline-none" />
                        </div>
                        <div className="col-span-2 flex gap-6">
                            <label className="flex items-center space-x-3 cursor-pointer">
                                <input type="checkbox" checked={formData.is_featured} onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })} className="w-5 h-5 border-2 border-gray-300 rounded" />
                                <span className="font-bold uppercase tracking-widest text-sm">Featured</span>
                            </label>
                            <label className="flex items-center space-x-3 cursor-pointer">
                                <input type="checkbox" checked={formData.is_public} onChange={(e) => setFormData({ ...formData, is_public: e.target.checked })} className="w-5 h-5 border-2 border-gray-300 rounded" />
                                <span className="font-bold uppercase tracking-widest text-sm">Public</span>
                            </label>
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="bg-black text-white px-8 py-4 font-black uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center justify-center w-full">
                        {loading ? "Saving..." : (<><Save className="w-5 h-5 mr-2" /> Update Project</>)}
                    </button>
                </form>
            </div>
        </div>
    );
}
