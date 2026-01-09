import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, User, FlaskConical } from "lucide-react";

export default async function AdminResearchTeamPage() {
    const supabase = createClient();

    const { data: members } = await supabase
        .from("research_team")
        .select("*")
        .order("created_at", { ascending: false });

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black uppercase text-black">Research Team</h1>
                    <p className="text-gray-500">Manage principal investigators and scientists.</p>
                </div>
                <Link
                    href="/admin/research/team/new"
                    className="bg-black text-white px-6 py-3 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center"
                >
                    <Plus className="w-5 h-5 mr-2" /> Add Scientist
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {!members || members.length === 0 ? (
                    <div className="col-span-full text-center text-gray-400 italic py-12">
                        No researchers found.
                    </div>
                ) : (
                    members.map((member: any) => (
                        <div key={member.id} className="bg-white border border-gray-200 p-6 flex flex-col items-center text-center shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-2 opacity-10">
                                <FlaskConical className="w-16 h-16" />
                            </div>
                            <div className="w-24 h-24 bg-gray-100 rounded-full mb-4 overflow-hidden border-2 border-transparent hover:border-black transition-all z-10">
                                {member.image_url ? (
                                    <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                        <User className="w-8 h-8 text-gray-400" />
                                    </div>
                                )}
                            </div>
                            <h3 className="text-lg font-bold uppercase z-10">{member.name}</h3>
                            <div className="text-xs font-bold uppercase text-blue-600 tracking-widest mb-2 z-10">{member.role}</div>
                            <p className="text-xs text-gray-500 line-clamp-2 z-10">{member.bio}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
