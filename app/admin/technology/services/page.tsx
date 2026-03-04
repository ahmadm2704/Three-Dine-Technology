"use client";

import Link from "next/link";
import { Plus, Trash2, Server, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function AdminTechServicesPage() {
    const supabase = createClient();
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchServices = async () => {
        const { data, error } = await supabase
            .from("services")
            .select("*")
            .order("display_order", { ascending: true });
        if (data) setServices(data);
        setLoading(false);
    };

    useEffect(() => { fetchServices(); }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this service?")) return;
        const { error } = await supabase.from("services").delete().eq("id", id);
        if (error) {
            alert("Error deleting: " + error.message);
        } else {
            setServices(services.filter(s => s.id !== id));
        }
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black uppercase text-black">Services</h1>
                    <p className="text-gray-500">Manage offered technology services.</p>
                </div>
                <Link
                    href="/admin/technology/services/new"
                    className="bg-black text-white px-6 py-3 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center"
                >
                    <Plus className="w-5 h-5 mr-2" /> Add Service
                </Link>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.length === 0 ? (
                        <div className="col-span-full text-center text-gray-400 italic py-12">
                            No services found. Add one to get started.
                        </div>
                    ) : (
                        services.map((service: any) => (
                            <div key={service.id} className="bg-white border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow relative group">
                                <button
                                    onClick={() => handleDelete(service.id)}
                                    className="absolute top-3 right-3 p-1.5 text-red-500 opacity-0 group-hover:opacity-100 hover:bg-red-50 rounded transition-all"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded">
                                        <Server className="w-5 h-5 text-black" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold uppercase mb-2">{service.title}</h3>
                                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{service.description}</p>
                                {service.is_active ? (
                                    <span className="text-xs font-bold uppercase text-green-600">Active</span>
                                ) : (
                                    <span className="text-xs font-bold uppercase text-gray-400">Inactive</span>
                                )}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
