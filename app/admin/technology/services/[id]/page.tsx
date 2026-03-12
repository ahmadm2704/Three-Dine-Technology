"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import IconPicker from "@/components/admin/icon-picker";

export default function EditServicePage() {
    const supabase = createClient();
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        icon: "Code2",
        price_range: "$$$",
        is_active: true,
    });

    useEffect(() => {
        async function fetchService() {
            const { data } = await supabase.from("services").select("*").eq("id", id).single();
            if (data) {
                setFormData({
                    title: data.title || "",
                    description: data.description || "",
                    icon: data.icon || "Code2",
                    price_range: data.price_range || "$$$",
                    is_active: data.is_active ?? true,
                });
            }
            setFetching(false);
        }
        fetchService();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.from("services").update({
            title: formData.title,
            description: formData.description,
            icon: formData.icon,
            price_range: formData.price_range,
            is_active: formData.is_active,
        }).eq("id", id);

        if (error) {
            alert("Error updating service: " + error.message);
            setLoading(false);
        } else {
            router.push("/admin/technology/services");
            router.refresh();
        }
    };

    if (fetching) {
        return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>;
    }

    return (
        <div className="p-8">
            <div className="mb-8 flex items-center">
                <Link href="/admin/technology/services" className="mr-4 text-gray-500 hover:text-black"><ArrowLeft className="w-6 h-6" /></Link>
                <h1 className="text-3xl font-black uppercase text-black">Edit Service</h1>
            </div>
            <div className="max-w-xl bg-white p-8 border border-gray-200 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Service Title</label>
                        <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full border-2 border-gray-200 p-3 font-bold focus:border-black focus:outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Description</label>
                        <textarea rows={4} required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full border-2 border-gray-200 p-3 text-sm focus:border-black focus:outline-none" />
                    </div>
                    <div>
                        <IconPicker value={formData.icon} onChange={(name) => setFormData({ ...formData, icon: name })} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Price Range</label>
                            <input type="text" value={formData.price_range} onChange={(e) => setFormData({ ...formData, price_range: e.target.value })} className="w-full border-2 border-gray-200 p-3 text-sm focus:border-black focus:outline-none" />
                        </div>
                    </div>
                    <label className="flex items-center space-x-3 cursor-pointer">
                        <input type="checkbox" checked={formData.is_active} onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })} className="w-5 h-5 border-2 border-gray-300 rounded" />
                        <span className="font-bold uppercase tracking-widest text-sm">Active</span>
                    </label>
                    <button type="submit" disabled={loading} className="bg-black text-white px-8 py-4 font-black uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center justify-center w-full">
                        {loading ? "Saving..." : (<><Save className="w-5 h-5 mr-2" /> Update Service</>)}
                    </button>
                </form>
            </div>
        </div>
    );
}
