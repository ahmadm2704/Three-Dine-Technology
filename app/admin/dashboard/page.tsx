"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { Users, FolderKanban, FileText, Server, Loader2 } from "lucide-react";

function getAdminSession(): { role: string; name: string } | null {
    try {
        const cookies = document.cookie.split(";").map(c => c.trim());
        const roleCookie = cookies.find(c => c.startsWith("admin-role="));
        if (!roleCookie) return null;
        const value = decodeURIComponent(roleCookie.split("=").slice(1).join("="));
        return JSON.parse(value);
    } catch {
        return null;
    }
}

export default function AdminDashboard() {
    const supabase = createClient();
    const [adminName, setAdminName] = useState("");
    const [counts, setCounts] = useState({ projects: 0, papers: 0, services: 0, team: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const session = getAdminSession();
        if (session) setAdminName(session.name);

        const loadDashboard = async () => {
            try {
                const [projectsRes, servicesRes, teamRes] = await Promise.all([
                    supabase.from("projects").select("id", { count: "exact", head: true }),
                    supabase.from("services").select("id", { count: "exact", head: true }),
                    supabase.from("team_members").select("id", { count: "exact", head: true }),
                ]);
                setCounts({
                    projects: projectsRes.count || 0,
                    papers: 0,
                    services: servicesRes.count || 0,
                    team: teamRes.count || 0,
                });
            } catch {}
            setLoading(false);
        };
        loadDashboard();
    }, []);

    const stats = [
        { label: "Active Projects", value: counts.projects, icon: FolderKanban, color: "bg-blue-500" },
        { label: "Research Papers", value: counts.papers, icon: FileText, color: "bg-purple-500" },
        { label: "Services", value: counts.services, icon: Server, color: "bg-green-500" },
        { label: "Team Members", value: counts.team, icon: Users, color: "bg-orange-500" },
    ];

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-4xl font-black uppercase text-black mb-2">Dashboard</h1>
                <p className="text-gray-500">Welcome back, <span className="font-bold text-black">{adminName || "Admin"}</span></p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 border border-gray-200 shadow-sm flex items-center space-x-4">
                        <div className={`w-12 h-12 ${stat.color} text-white flex items-center justify-center rounded-lg`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin text-gray-300" />
                            ) : (
                                <div className="text-2xl font-black text-black">{stat.value}</div>
                            )}
                            <div className="text-xs font-bold uppercase tracking-widest text-gray-400">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-bold uppercase mb-4">Recent Activity</h2>
                    <div className="text-gray-400 text-sm italic">No recent activity</div>
                </div>
                <div className="bg-white p-8 border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-bold uppercase mb-4">System Status</h2>
                    <div className="flex items-center space-x-2 text-green-600 font-bold">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span>All Systems Operational</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
