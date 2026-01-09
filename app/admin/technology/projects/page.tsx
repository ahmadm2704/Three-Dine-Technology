import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import { redirect } from "next/navigation";

export default async function AdminProjectsPage() {
    const supabase = createClient();

    // Fetch projects from tech_projects table
    const { data: projects, error } = await supabase
        .from("tech_projects")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching projects:", error);
        // In a real app we'd show an error state
    }

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

            <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="p-4 font-bold uppercase text-xs text-gray-500 tracking-widest">Title</th>
                            <th className="p-4 font-bold uppercase text-xs text-gray-500 tracking-widest">Category</th>
                            <th className="p-4 font-bold uppercase text-xs text-gray-500 tracking-widest">Stack</th>
                            <th className="p-4 font-bold uppercase text-xs text-gray-500 tracking-widest">Status</th>
                            <th className="p-4 font-bold uppercase text-xs text-gray-500 tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!projects || projects.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-gray-400 italic">
                                    No projects found. Create one to get started.
                                </td>
                            </tr>
                        ) : (
                            projects.map((project: any) => (
                                <tr key={project.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="p-4 font-bold">{project.title}</td>
                                    <td className="p-4 text-sm text-gray-600 uppercase">{project.category}</td>
                                    <td className="p-4 text-sm text-gray-500">
                                        {project.tech_stack?.join(", ") || "-"}
                                    </td>
                                    <td className="p-4">
                                        {project.is_featured ? (
                                            <span className="bg-green-100 text-green-700 px-2 py-1 text-xs font-bold uppercase rounded-full">Featured</span>
                                        ) : (
                                            <span className="bg-gray-100 text-gray-500 px-2 py-1 text-xs font-bold uppercase rounded-full">Normal</span>
                                        )}
                                    </td>
                                    <td className="p-4 text-right space-x-2">
                                        <Link href={`/admin/technology/projects/${project.id}`} className="inline-block p-2 text-blue-600 hover:bg-blue-50 rounded">
                                            <Edit className="w-4 h-4" />
                                        </Link>
                                        {/* Delete would need a client component or server action form */}
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
