"use client";

import Link from "next/link";
import { Plus, User, Trash2, FlaskConical, Loader2, Edit, Crown, Briefcase, PenTool } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

const categoryLabels: Record<string, string> = {
    ceo: "CEO",
    top_management: "Top Management",
    writing_team: "Writing Team",
};

const categoryColors: Record<string, string> = {
    ceo: "bg-yellow-100 text-yellow-800",
    top_management: "bg-purple-100 text-purple-800",
    writing_team: "bg-emerald-100 text-emerald-800",
};

const categoryIcons: Record<string, any> = {
    ceo: Crown,
    top_management: Briefcase,
    writing_team: PenTool,
};

function parseRole(role: string): { category: string; displayRole: string } {
    if (role.includes("::")) {
        const [cat, ...rest] = role.split("::");
        return { category: cat, displayRole: rest.join("::") };
    }
    return { category: "writing_team", displayRole: role };
}

export default function AdminResearchTeamPage() {
    const supabase = createClient();
    const [members, setMembers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchMembers = async () => {
        const { data } = await supabase
            .from("research_team")
            .select("*")
            .order("created_at", { ascending: true });
        if (data) setMembers(data);
        setLoading(false);
    };

    useEffect(() => { fetchMembers(); }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to remove this researcher?")) return;
        const { error } = await supabase.from("research_team").delete().eq("id", id);
        if (error) { alert("Error deleting: " + error.message); }
        else { setMembers(members.filter(m => m.id !== id)); }
    };

    const sections = ["ceo", "top_management", "writing_team"];

    const grouped = sections.reduce((acc, cat) => {
        acc[cat] = members.filter(m => parseRole(m.role).category === cat);
        return acc;
    }, {} as Record<string, any[]>);

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black uppercase text-black">Research Team</h1>
                    <p className="text-gray-500">Manage your research team by section.</p>
                </div>
                <Link href="/admin/research/team/new"
                    className="bg-black text-white px-6 py-3 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center">
                    <Plus className="w-5 h-5 mr-2" /> Add Member
                </Link>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                </div>
            ) : members.length === 0 ? (
                <div className="text-center text-gray-400 italic py-12">No researchers found. Add one to get started.</div>
            ) : (
                <div className="space-y-10">
                    {sections.map(cat => {
                        const catMembers = grouped[cat];
                        if (catMembers.length === 0) return null;
                        const Icon = categoryIcons[cat];
                        return (
                            <div key={cat}>
                                <div className="flex items-center gap-3 mb-4 border-b border-gray-200 pb-3">
                                    <Icon className="w-5 h-5 text-gray-600" />
                                    <h2 className="text-lg font-black uppercase tracking-widest text-gray-700">{categoryLabels[cat]}</h2>
                                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full font-bold">{catMembers.length}</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {catMembers.map((member: any) => {
                                        const { category, displayRole } = parseRole(member.role);
                                        return (
                                            <div key={member.id} className="bg-white border border-gray-200 p-6 flex flex-col items-center text-center shadow-sm relative overflow-hidden group">
                                                <div className="absolute top-3 right-3 flex space-x-1 opacity-0 group-hover:opacity-100 transition-all z-20">
                                                    <Link href={`/admin/research/team/${member.id}`} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                                                        <Edit className="w-4 h-4" />
                                                    </Link>
                                                    <button onClick={() => handleDelete(member.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <span className={`absolute top-3 left-3 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded z-10 ${categoryColors[category]}`}>
                                                    {categoryLabels[category]}
                                                </span>
                                                <div className="w-24 h-24 bg-gray-100 rounded-full mb-4 overflow-hidden border-2 border-transparent hover:border-black transition-all z-10">
                                                    {member.image_url ? (
                                                        <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                                            <User className="w-8 h-8 text-gray-400" />
                                                        </div>
                                                    )}
                                                </div>
                                                <h3 className="text-lg font-bold uppercase z-10">{member.name}</h3>
                                                <div className="text-xs font-bold uppercase text-blue-600 tracking-widest mb-2 z-10">{displayRole}</div>
                                                <p className="text-xs text-gray-500 line-clamp-2 z-10">{member.bio}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
