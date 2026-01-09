"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Users, FolderKanban, FileText, Server } from "lucide-react";

export default function AdminDashboard() {
    const supabase = createClient();
    const router = useRouter();
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUserEmail(user.email || "Admin");
            } else {
                router.push("/admin/login");
            }
        };
        getUser();
    }, [router, supabase]);

    const stats = [
        { label: "Active Projects", value: "12", icon: FolderKanban, color: "bg-blue-500" },
        { label: "Research Papers", value: "5", icon: FileText, color: "bg-purple-500" },
        { label: "Services", value: "4", icon: Server, color: "bg-green-500" },
        { label: "Team Members", value: "8", icon: Users, color: "bg-orange-500" },
    ];

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-4xl font-black uppercase text-black mb-2">Dashboard</h1>
                <p className="text-gray-500">Welcome back, <span className="font-bold text-black">{userEmail}</span></p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 border border-gray-200 shadow-sm flex items-center space-x-4">
                        <div className={`w-12 h-12 ${stat.color} text-white flex items-center justify-center rounded-lg`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-2xl font-black text-black">{stat.value}</div>
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
