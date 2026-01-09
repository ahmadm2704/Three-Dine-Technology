"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function NewServicePage() {
    const supabase = createClient();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        icon_name: "Code2", // Default
        price_range: "$$$",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.from("tech_services").insert(formData);

        if (error) {
            alert("Error creating service: " + error.message);
            setLoading(false);
        } else {
            router.push("/admin/technology/services");
            router.refresh();
        }
    };

    return (
        <div className="p-8">
            <div className="mb-8 flex items-center">
                <Link href="/admin/technology/services" className="mr-4 text-gray-500 hover:text-black">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-3xl font-black uppercase text-black">New Service</h1>
            </div>

            <div className="max-w-xl bg-white p-8 border border-gray-200 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Service Title</label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full border-2 border-gray-200 p-3 font-bold focus:border-black focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Description</label>
                        <textarea
                            rows={4}
                            required
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full border-2 border-gray-200 p-3 text-sm focus:border-black focus:outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Icon Name (Lucide)</label>
                            <input
                                type="text"
                                value={formData.icon_name}
                                onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
                                className="w-full border-2 border-gray-200 p-3 text-sm focus:border-black focus:outline-none"
                                placeholder="e.g. Code2, Server"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Price Range</label>
                            <input
                                type="text"
                                value={formData.price_range}
                                onChange={(e) => setFormData({ ...formData, price_range: e.target.value })}
                                className="w-full border-2 border-gray-200 p-3 text-sm focus:border-black focus:outline-none"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-black text-white px-8 py-4 font-black uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center justify-center w-full"
                    >
                        {loading ? "Saving..." : (
                            <>
                                <Save className="w-5 h-5 mr-2" /> Save Service
                            </>
                        )}
                    </button>

                </form>
            </div>
        </div>
    );
}
