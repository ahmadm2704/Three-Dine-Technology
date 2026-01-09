"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function NewPartnerPage() {
    const supabase = createClient();
    const useRouterObj = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        location: "", // City, Country
        website_url: "",
        logo_url: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.from("research_partners").insert(formData);

        if (error) {
            alert("Error adding partner: " + error.message);
            setLoading(false);
        } else {
            useRouterObj.push("/admin/research/partners");
            useRouterObj.refresh();
        }
    };

    return (
        <div className="p-8">
            <div className="mb-8 flex items-center">
                <Link href="/admin/research/partners" className="mr-4 text-gray-500 hover:text-black">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-3xl font-black uppercase text-black">New Research Partner</h1>
            </div>

            <div className="max-w-xl bg-white p-8 border border-gray-200 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Institution Name</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full border-2 border-gray-200 p-3 font-bold focus:border-black focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Location</label>
                        <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="w-full border-2 border-gray-200 p-3 font-bold focus:border-black focus:outline-none"
                            placeholder="e.g. Cambridge, MA"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Website URL</label>
                        <input
                            type="text"
                            value={formData.website_url}
                            onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                            className="w-full border-2 border-gray-200 p-3 text-sm focus:border-black focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Logo URL (Optional)</label>
                        <input
                            type="text"
                            value={formData.logo_url}
                            onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                            className="w-full border-2 border-gray-200 p-3 text-sm focus:border-black focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-black text-white px-8 py-4 font-black uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center justify-center w-full"
                    >
                        {loading ? "Saving..." : (
                            <>
                                <Save className="w-5 h-5 mr-2" /> Add Partner
                            </>
                        )}
                    </button>

                </form>
            </div>
        </div>
    );
}
