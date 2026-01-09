import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, User, Trash2 } from "lucide-react";

export default async function AdminTechTeamPage() {
    const supabase = createClient();

    const { data: members } = await supabase
        .from("tech_team")
        .select("*")
        .order("created_at", { ascending: false });

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black uppercase text-black">Tech Team</h1>
                    <p className="text-gray-500">Manage your engineering and design team.</p>
                </div>
                <Link
                    href="/admin/technology/team/new"
                    className="bg-black text-white px-6 py-3 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center"
                >
                    <Plus className="w-5 h-5 mr-2" /> Add Member
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {!members || members.length === 0 ? (
                    <div className="col-span-full text-center text-gray-400 italic py-12">
                        No team members found.
                    </div>
                ) : (
                    members.map((member: any) => (
                        <div key={member.id} className="bg-white border border-gray-200 p-6 flex flex-col items-center text-center shadow-sm">
                            <div className="w-24 h-24 bg-gray-100 rounded-full mb-4 overflow-hidden border-2 border-transparent hover:border-black transition-all">
                                {member.image_url ? (
                                    <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                        <User className="w-8 h-8 text-gray-400" />
                                    </div>
                                )}
                            </div>
                            <h3 className="text-lg font-bold uppercase">{member.name}</h3>
                            <div className="text-xs font-bold uppercase text-blue-600 tracking-widest mb-2">{member.role}</div>
                            <p className="text-xs text-gray-500 line-clamp-2">{member.bio}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
