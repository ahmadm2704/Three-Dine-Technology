"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import { ImageUploadField } from "@/components/admin/image-upload-field";

const techCategories = [
    { value: "ceo", label: "CEO" },
    { value: "top_management", label: "Top Management" },
    { value: "it_team", label: "IT Team" },
    { value: "support_team", label: "Support Team" },
];

export default function EditTeamMemberPage() {
    const supabase = createClient();
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const [formData, setFormData] = useState({
        name: "",
        role: "",
        bio: "",
        image_url: "",
        email: "",
        is_active: true,
        category: "it_team",
    });

    useEffect(() => {
        async function fetchMember() {
            const { data } = await supabase.from("team_members").select("*").eq("id", id).single();
            if (data) {
                const cat = Array.isArray(data.skills) && data.skills.length > 0 ? data.skills[0] : "it_team";
                setFormData({
                    name: data.name || "",
                    role: data.role || "",
                    bio: data.bio || "",
                    image_url: data.image_url || "",
                    email: data.email || "",
                    is_active: data.is_active ?? true,
                    category: cat,
                });
            }
            setFetching(false);
        }
        fetchMember();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.from("team_members").update({
            name: formData.name,
            role: formData.role,
            bio: formData.bio,
            image_url: formData.image_url,
            email: formData.email,
            is_active: formData.is_active,
            skills: [formData.category],
        }).eq("id", id);

        if (error) {
            alert("Error updating member: " + error.message);
            setLoading(false);
        } else {
            router.push("/admin/technology/team");
            router.refresh();
        }
    };

    if (fetching) {
        return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>;
    }

    return (
        <div className="p-8">
            <div className="mb-8 flex items-center">
                <Link href="/admin/technology/team" className="mr-4 text-gray-500 hover:text-black"><ArrowLeft className="w-6 h-6" /></Link>
                <h1 className="text-3xl font-black uppercase text-black">Edit Team Member</h1>
            </div>
            <div className="max-w-xl bg-white p-8 border border-gray-200 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Section</label>
                        <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full border-2 border-gray-200 p-3 font-bold focus:border-black focus:outline-none bg-white">
                            {techCategories.map(c => (<option key={c.value} value={c.value}>{c.label}</option>))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
                        <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full border-2 border-gray-200 p-3 font-bold focus:border-black focus:outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Role / Title</label>
                        <input type="text" required value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full border-2 border-gray-200 p-3 font-bold focus:border-black focus:outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                            {formData.category === "ceo" ? "CEO Message / Quote" : "Bio"}
                        </label>
                        <textarea rows={formData.category === "ceo" ? 5 : 3} value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            placeholder={formData.category === "ceo" ? "Enter the CEO's leadership message..." : "Short bio description..."}
                            className="w-full border-2 border-gray-200 p-3 text-sm focus:border-black focus:outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email</label>
                        <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full border-2 border-gray-200 p-3 text-sm focus:border-black focus:outline-none" />
                    </div>
                    <div>
                        <ImageUploadField label="Profile Image" value={formData.image_url} onChange={(url) => setFormData({ ...formData, image_url: url })} />
                    </div>
                    <label className="flex items-center space-x-3 cursor-pointer">
                        <input type="checkbox" checked={formData.is_active} onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })} className="w-5 h-5 border-2 border-gray-300 rounded" />
                        <span className="font-bold uppercase tracking-widest text-sm">Active</span>
                    </label>
                    <button type="submit" disabled={loading} className="bg-black text-white px-8 py-4 font-black uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center justify-center w-full">
                        {loading ? "Saving..." : (<><Save className="w-5 h-5 mr-2" /> Update Member</>)}
                    </button>
                </form>
            </div>
        </div>
    );
}
