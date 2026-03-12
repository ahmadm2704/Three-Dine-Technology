"use client";

import Link from "next/link";
import { Plus, Trash2, Loader2, Edit, ChevronUp, ChevronDown } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function AdminTechServicesPage() {
    const supabase = createClient();
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [reordering, setReordering] = useState(false);

    const fetchServices = async () => {
        const { data } = await supabase
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
            setServices(prev => prev.filter(s => s.id !== id));
        }
    };

    const moveService = async (index: number, direction: "up" | "down") => {
        const swapIndex = direction === "up" ? index - 1 : index + 1;
        if (swapIndex < 0 || swapIndex >= services.length) return;

        setReordering(true);
        const updated = [...services];
        const orderA = updated[index].display_order;
        const orderB = updated[swapIndex].display_order;

        // Swap display_order values (if equal, use index-based values)
        const newOrderA = orderB !== orderA ? orderB : swapIndex;
        const newOrderB = orderB !== orderA ? orderA : index;

        updated[index] = { ...updated[index], display_order: newOrderA };
        updated[swapIndex] = { ...updated[swapIndex], display_order: newOrderB };

        // Swap positions in array
        [updated[index], updated[swapIndex]] = [updated[swapIndex], updated[index]];
        setServices(updated);

        // Persist both to DB
        await Promise.all([
            supabase.from("services").update({ display_order: newOrderB }).eq("id", updated[index].id),
            supabase.from("services").update({ display_order: newOrderA }).eq("id", updated[swapIndex].id),
        ]);
        setReordering(false);
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black uppercase text-black">Services</h1>
                    <p className="text-gray-500">Manage offered technology services. Use arrows to set the order.</p>
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
            ) : services.length === 0 ? (
                <div className="text-center text-gray-400 italic py-12">
                    No services found. Add one to get started.
                </div>
            ) : (
                <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="p-4 font-bold uppercase text-xs text-gray-500 tracking-widest w-20">Order</th>
                                <th className="p-4 font-bold uppercase text-xs text-gray-500 tracking-widest">Service</th>
                                <th className="p-4 font-bold uppercase text-xs text-gray-500 tracking-widest hidden md:table-cell">Description</th>
                                <th className="p-4 font-bold uppercase text-xs text-gray-500 tracking-widest">Status</th>
                                <th className="p-4 font-bold uppercase text-xs text-gray-500 tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map((service, index) => (
                                <tr key={service.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    {/* Order controls */}
                                    <td className="p-4">
                                        <div className="flex flex-col items-center gap-0.5">
                                            <button
                                                onClick={() => moveService(index, "up")}
                                                disabled={index === 0 || reordering}
                                                className="p-1 rounded hover:bg-gray-100 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                                                title="Move up"
                                            >
                                                <ChevronUp className="w-4 h-4 text-gray-600" />
                                            </button>
                                            <span className="text-xs font-bold text-gray-400 leading-none">{index + 1}</span>
                                            <button
                                                onClick={() => moveService(index, "down")}
                                                disabled={index === services.length - 1 || reordering}
                                                className="p-1 rounded hover:bg-gray-100 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                                                title="Move down"
                                            >
                                                <ChevronDown className="w-4 h-4 text-gray-600" />
                                            </button>
                                        </div>
                                    </td>
                                    <td className="p-4 font-bold uppercase">{service.title}</td>
                                    <td className="p-4 text-sm text-gray-500 hidden md:table-cell max-w-xs">
                                        <p className="line-clamp-2">{service.description}</p>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 text-xs font-bold uppercase rounded-full ${service.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                                            {service.is_active ? "Active" : "Inactive"}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right space-x-1">
                                        <Link href={`/admin/technology/services/${service.id}`} className="inline-block p-2 text-blue-600 hover:bg-blue-50 rounded">
                                            <Edit className="w-4 h-4" />
                                        </Link>
                                        <button onClick={() => handleDelete(service.id)} className="inline-block p-2 text-red-600 hover:bg-red-50 rounded">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
