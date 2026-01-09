import { createClient } from "@/lib/supabase/server";
import { User, Shield, Trash2, AlertTriangle } from "lucide-react";
import { redirect } from "next/navigation";
import { deleteAdminAction } from "./actions";

export default async function SuperAdminUsersPage() {
    const supabase = createClient();

    // 1. Verify Super Admin Access
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/admin/login");

    const { data: myRole } = await supabase.from('admins').select('role').eq('id', user.id).single();
    if (myRole?.role !== 'super_admin') {
        redirect("/admin/dashboard?error=unauthorized");
    }

    // 2. Fetch All Admins
    const { data: admins } = await supabase
        .from("admins")
        .select("*")
        .order("created_at", { ascending: false });

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-black uppercase text-black">User Management</h1>
                <p className="text-gray-500">Manage admin access and roles. <span className="text-red-600 font-bold">Super Admin Restricted Area.</span></p>
            </div>

            <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="p-4 font-bold uppercase text-xs text-gray-500 tracking-widest">Email</th>
                            <th className="p-4 font-bold uppercase text-xs text-gray-500 tracking-widest">Role</th>
                            <th className="p-4 font-bold uppercase text-xs text-gray-500 tracking-widest">Created</th>
                            <th className="p-4 font-bold uppercase text-xs text-gray-500 tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins?.map((admin: any) => (
                            <tr key={admin.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                                <td className="p-4 font-bold text-sm">{admin.email}</td>
                                <td className="p-4">
                                    <span className={`inline-block px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded 
                         ${admin.role === 'super_admin' ? 'bg-purple-100 text-purple-700' :
                                            admin.role === 'tech_admin' ? 'bg-black text-white' :
                                                'bg-blue-100 text-blue-700'}`}>
                                        {admin.role.replace('_', ' ')}
                                    </span>
                                </td>
                                <td className="p-4 text-xs font-mono text-gray-500">{new Date(admin.created_at).toLocaleDateString()}</td>
                                <td className="p-4 text-right">
                                    {admin.role !== 'super_admin' ? (
                                        <form action={deleteAdminAction}>
                                            <input type="hidden" name="id" value={admin.id} />
                                            <button type="submit" className="text-red-500 hover:text-red-700 font-bold text-xs uppercase flex items-center justify-end">
                                                <Trash2 className="w-4 h-4 mr-1" /> Revoke Access
                                            </button>
                                        </form>
                                    ) : (
                                        <span className="text-gray-300 text-xs font-bold uppercase flex items-center justify-end cursor-not-allowed">
                                            <Shield className="w-4 h-4 mr-1" /> Protected
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-500 p-4 text-sm text-yellow-800 flex items-start">
                <AlertTriangle className="w-5 h-5 mr-3 shrink-0" />
                <div>
                    <span className="font-bold uppercase tracking-widest block mb-1">Note on Revocation</span>
                    <p>Revoking access here removes the user's ability to access the Admin Panel immediately. It effectively deletes their role permission.</p>
                </div>
            </div>

        </div>
    );
}
