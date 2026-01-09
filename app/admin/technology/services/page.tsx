import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, Server, Trash2 } from "lucide-react";

export default async function AdminTechServicesPage() {
    const supabase = createClient();

    const { data: services } = await supabase
        .from("tech_services")
        .select("*")
        .order("created_at", { ascending: false });

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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {!services || services.length === 0 ? (
                    <div className="col-span-full text-center text-gray-400 italic py-12">
                        No services found.
                    </div>
                ) : (
                    services.map((service: any) => (
                        <div key={service.id} className="bg-white border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded">
                                    <Server className="w-5 h-5 text-black" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold uppercase mb-2">{service.title}</h3>
                            <p className="text-sm text-gray-600 mb-4 line-clamp-3">{service.description}</p>
                            <div className="text-xs font-bold uppercase text-gray-400">{service.price_range}</div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
