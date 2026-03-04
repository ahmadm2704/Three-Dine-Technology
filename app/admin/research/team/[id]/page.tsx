"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import { ImageUploadField } from "@/components/admin/image-upload-field";

export default function EditResearcherPage() {
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
    });

    useEffect(() => {
        async function fetchResearcher() {
            const { data } = await supabase.from("research_team").select("*").eq("id", id).single();
            if (data) {
                setFormData({
                    name: data.name || "",
                    role: data.role || "",
                    bio: data.bio || "",
                    image_url: data.image_url || "",
                });
            }
            setFetching(false);
        }
        fetchResearcher();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.from("research_team").update({
            name: formData.name,
            role: formData.role,
            bio: formData.bio,
            image_url: formData.image_url,
        }).eq("id", id);

        if (error) {
            alert("Error updating researcher: " + error.message);
            setLoading(false);
        } else {
            router.push("/admin/research/team");
            router.refresh();
        }
    };

    if (fetching) {
        return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>;
    }

    return (
        <div className="p-8">
            <div className="mb-8 flex items-center">
                <Link href="/admin/research/team" className="mr-4 text-gray-500 hover:text-black"><ArrowLeft className="w-6 h-6" /></Link>
                <h1 className="text-3xl font-black uppercase text-black">Edit Researcher</h1>
            </div>
            <div className="max-w-xl bg-white p-8 border border-gray-200 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
                        <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full border-2 border-gray-200 p-3 font-bold focus:border-black focus:outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Role / Specialty</label>
                        <input type="text" required value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full border-2 border-gray-200 p-3 font-bold focus:border-black focus:outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Bio</label>
                        <textarea rows={3} value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} className="w-full border-2 border-gray-200 p-3 text-sm focus:border-black focus:outline-none" />
                    </div>
                    <div>
                        <ImageUploadField label="Profile Image" value={formData.image_url} onChange={(url) => setFormData({ ...formData, image_url: url })} />
                    </div>
                    <button type="submit" disabled={loading} className="bg-black text-white px-8 py-4 font-black uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center justify-center w-full">
                        {loading ? "Saving..." : (<><Save className="w-5 h-5 mr-2" /> Update Researcher</>)}
                    </button>
                </form>
            </div>
        </div>
    );
}
