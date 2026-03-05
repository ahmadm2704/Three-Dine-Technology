"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { ImageUploadField } from "@/components/admin/image-upload-field";

const researchCategories = [
    { value: "ceo", label: "CEO" },
    { value: "top_management", label: "Top Management" },
    { value: "writing_team", label: "Writing Team" },
];

export default function NewResearcherPage() {
    const supabase = createClient();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        roleTitle: "",
        bio: "",
        image_url: "",
        category: "writing_team",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.from("research_team").insert({
            name: formData.name,
            role: `${formData.category}::${formData.roleTitle}`,
            bio: formData.bio,
            image_url: formData.image_url,
        });

        if (error) {
            alert("Error adding researcher: " + error.message);
            setLoading(false);
        } else {
            router.push("/admin/research/team");
            router.refresh();
        }
    };

    return (
        <div className="p-8">
            <div className="mb-8 flex items-center">
                <Link href="/admin/research/team" className="mr-4 text-gray-500 hover:text-black">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-3xl font-black uppercase text-black">New Research Member</h1>
            </div>

            <div className="max-w-xl bg-white p-8 border border-gray-200 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Section</label>
                        <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full border-2 border-gray-200 p-3 font-bold focus:border-black focus:outline-none bg-white">
                            {researchCategories.map(c => (<option key={c.value} value={c.value}>{c.label}</option>))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
                        <input type="text" required value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full border-2 border-gray-200 p-3 font-bold focus:border-black focus:outline-none" />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Role / Specialty</label>
                        <input type="text" required value={formData.roleTitle}
                            onChange={(e) => setFormData({ ...formData, roleTitle: e.target.value })}
                            className="w-full border-2 border-gray-200 p-3 font-bold focus:border-black focus:outline-none" />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                            {formData.category === "ceo" ? "CEO Message / Quote" : "Bio"}
                        </label>
                        <textarea rows={formData.category === "ceo" ? 5 : 3} value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            placeholder={formData.category === "ceo" ? "Enter the CEO's leadership message..." : "Short bio description..."}
                            className="w-full border-2 border-gray-200 p-3 text-sm focus:border-black focus:outline-none" />
                    </div>

                    <div>
                        <ImageUploadField label="Profile Image" value={formData.image_url} onChange={(url) => setFormData({ ...formData, image_url: url })} />
                    </div>

                    <button type="submit" disabled={loading}
                        className="bg-black text-white px-8 py-4 font-black uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center justify-center w-full">
                        {loading ? "Saving..." : (<><Save className="w-5 h-5 mr-2" /> Add Member</>)}
                    </button>
                </form>
            </div>
        </div>
    );
}
