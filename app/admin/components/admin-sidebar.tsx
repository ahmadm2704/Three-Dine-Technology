"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FolderKanban,
    Server,
    Users,
    FileText,
    GraduationCap,
    LogOut,
    Mail,
    Shield
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function AdminSidebar() {
    const pathname = usePathname();
    const [role, setRole] = useState<string | null>(null);
    const supabase = createClient();

    useEffect(() => {
        const getRole = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data } = await supabase.from('admins').select('role').eq('id', user.id).single();
                setRole(data?.role || null);
            }
        };
        getRole();
    }, [supabase]);

    const isActive = (path: string) => pathname.startsWith(path);

    // TECH LINKS (Visible to tech_admin & super_admin)
    const showTech = role === 'tech_admin' || role === 'super_admin';
    const techLinks = [
        { name: "Projects", href: "/admin/technology/projects", icon: FolderKanban },
        { name: "Services", href: "/admin/technology/services", icon: Server }, // Needs Update
        { name: "Team", href: "/admin/technology/team", icon: Users }, // Needs Update
        { name: "Inquiries", href: "/admin/technology/inquiries", icon: Mail }, // Needs Update
    ];

    // RESEARCH LINKS (Visible to research_admin & super_admin)
    const showResearch = role === 'research_admin' || role === 'super_admin';
    const researchLinks = [
        { name: "Papers", href: "/admin/research/papers", icon: FileText },
        { name: "Partners", href: "/admin/research/partners", icon: GraduationCap }, // Needs Update
        { name: "Team", href: "/admin/research/team", icon: Users }, // Needs Update
        { name: "Inquiries", href: "/admin/research/inquiries", icon: Mail }, // Needs Update
    ];

    return (
        <aside className="w-64 bg-black text-white border-r border-gray-800 min-h-screen flex flex-col fixed left-0 top-0 bottom-0 z-50">

            {/* Brand */}
            <div className="p-6 border-b border-gray-800">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-bold">TD</div>
                    <div className="flex flex-col">
                        <span className="text-xl font-black uppercase tracking-tighter leading-none">Admin</span>
                        <span className="text-[10px] text-gray-400 font-mono uppercase">{role?.replace('_', ' ')}</span>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-grow p-6 space-y-8 overflow-y-auto">

                {/* Main */}
                <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Overview</div>
                    <Link
                        href="/admin/dashboard"
                        className={`flex items-center space-x-3 p-2 rounded hover:bg-white/10 transition-colors ${isActive('/admin/dashboard') ? 'text-white bg-white/10' : 'text-gray-400'}`}
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        <span className="font-bold">Dashboard</span>
                    </Link>
                </div>

                {/* Technology */}
                {showTech && (
                    <div>
                        <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Technology</div>
                        <div className="space-y-1">
                            {techLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`flex items-center space-x-3 p-2 rounded hover:bg-white/10 transition-colors ${isActive(link.href) ? 'text-white bg-white/10' : 'text-gray-400'}`}
                                >
                                    <link.icon className="w-5 h-5" />
                                    <span className="font-bold">{link.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Research */}
                {showResearch && (
                    <div>
                        <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Research</div>
                        <div className="space-y-1">
                            {researchLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`flex items-center space-x-3 p-2 rounded hover:bg-white/10 transition-colors ${isActive(link.href) ? 'text-white bg-white/10' : 'text-gray-400'}`}
                                >
                                    <link.icon className="w-5 h-5" />
                                    <span className="font-bold">{link.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Super Admin Only */}
                {role === 'super_admin' && (
                    <div>
                        <div className="text-xs font-bold uppercase tracking-widest text-purple-500 mb-4">Super Admin</div>
                        <div className="space-y-1">
                            <Link
                                href="/admin/super/users"
                                className={`flex items-center space-x-3 p-2 rounded hover:bg-white/10 transition-colors ${isActive('/admin/super/users') ? 'text-white bg-white/10' : 'text-gray-400'}`}
                            >
                                <Shield className="w-5 h-5 text-purple-400" />
                                <span className="font-bold text-purple-100">User Management</span>
                            </Link>
                        </div>
                    </div>
                )}

            </nav>

            {/* Footer */}
            <div className="p-6 border-t border-gray-800">
                <form action="/auth/signout" method="post">
                    <button type="submit" className="flex items-center space-x-3 text-red-500 hover:text-red-400 transition-colors w-full font-bold">
                        <LogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                    </button>
                </form>
            </div>

        </aside>
    );
}
