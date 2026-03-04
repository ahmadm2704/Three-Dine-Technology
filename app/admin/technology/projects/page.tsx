"use client";

import Link from "next/link";
import { Plus, Edit, Trash2, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function AdminProjectsPage() {
    const supabase = createClient();
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProjects = async () => {
        const { data, error } = await supabase
            .from("projects")
            .select("*")
            .order("created_at", { ascending: false });
        if (data) setProjects(data);
        setLoading(false);
    };

    useEffect(() => { fetchProjects(); }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;
        const { error } = await supabase.from("projects").delete().eq("id", id);
        if (error) {
            alert("Error deleting: " + error.message);
        } else {
            setProjects(projects.filter(p => p.id !== id));
        }
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black uppercase text-black">Projects</h1>
                    <p className="text-gray-500">Manage your portfolio and case studies.</p>
                </div>
                <Link
                    href="/admin/technology/projects/new"
                    className="bg-black text-white px-6 py-3 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center"
                >
                    <Plus className="w-5 h-5 mr-2" /> Add Project
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
                                <th className="p-4 font-bold uppercase text-xs text-gray-500 tracking-widest">Name</th>
                                <th className="p-4 font-bold uppercase text-xs text-gray-500 tracking-widest">Client</th>
                                <th className="p-4 font-bold uppercase text-xs text-gray-500 tracking-widest">Status</th>
                                <th className="p-4 font-bold uppercase text-xs text-gray-500 tracking-widest">Technologies</th>
                                <th className="p-4 font-bold uppercase text-xs text-gray-500 tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-gray-400 italic">
                                        No projects found. Create one to get started.
                                    </td>
                                </tr>
                            ) : (
                                projects.map((project: any) => (
                                    <tr key={project.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="p-4 font-bold">{project.name}</td>
                                        <td className="p-4 text-sm text-gray-600">{project.client_name || "-"}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 text-xs font-bold uppercase rounded-full ${
                                                project.status === "completed" ? "bg-green-100 text-green-700" :
                                                project.status === "in_progress" ? "bg-blue-100 text-blue-700" :
                                                "bg-gray-100 text-gray-500"
                                            }`}>{project.status?.replace("_", " ") || "N/A"}</span>
                                        </td>
                                        <td className="p-4 text-sm text-gray-500">
                                            {project.technologies?.join(", ") || "-"}
                                        </td>
                                        <td className="p-4 text-right space-x-2">
                                            <Link href={`/admin/technology/projects/${project.id}`} className="inline-block p-2 text-blue-600 hover:bg-blue-50 rounded">
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                            <button onClick={() => handleDelete(project.id)} className="inline-block p-2 text-red-600 hover:bg-red-50 rounded">
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
