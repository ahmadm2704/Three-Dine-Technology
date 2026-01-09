import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, GraduationCap } from "lucide-react";

export default async function AdminResearchPartnersPage() {
    const supabase = createClient();

    const { data: partners } = await supabase
        .from("research_partners")
        .select("*")
        .order("created_at", { ascending: false });

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black uppercase text-black">Research Partners</h1>
                    <p className="text-gray-500">Collaborating universities and institutions.</p>
                </div>
                <Link
                    href="/admin/research/partners/new"
                    className="bg-black text-white px-6 py-3 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center"
                >
                    <Plus className="w-5 h-5 mr-2" /> Add Partner
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {!partners || partners.length === 0 ? (
                    <div className="col-span-full text-center text-gray-400 italic py-12">
                        No partners found.
                    </div>
                ) : (
                    partners.map((partner: any) => (
                        <div key={partner.id} className="bg-white border border-gray-200 p-6 flex items-center space-x-4 shadow-sm hover:shadow-md transition-all">
                            <div className="w-16 h-16 bg-gray-100 flex items-center justify-center shrink-0">
                                {partner.logo_url ? (
                                    <img src={partner.logo_url} alt={partner.name} className="max-w-full max-h-full p-2" />
                                ) : (
                                    <GraduationCap className="w-8 h-8 text-gray-400" />
                                )}
                            </div>
                            <div>
                                <h3 className="font-bold uppercase text-sm mb-1">{partner.name}</h3>
                                <div className="text-xs text-gray-500">{partner.location}</div>
                                {partner.website_url && (
                                    <a href={partner.website_url} target="_blank" className="text-[10px] font-bold uppercase text-blue-600 hover:underline mt-1 block">
                                        Visit Website
                                    </a>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
