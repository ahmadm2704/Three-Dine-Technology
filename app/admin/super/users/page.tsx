import { User, Shield, Trash2, AlertTriangle } from "lucide-react";

// Mock admin users data
const mockUsers = [
  {
    id: "1",
    email: "admin@threedine.com",
    name: "Super Admin",
    role: "super_admin",
    created_at: "2024-01-15T00:00:00Z",
  },
  {
    id: "2", 
    email: "tech@threedine.com",
    name: "Tech Admin",
    role: "tech_admin",
    created_at: "2024-01-10T00:00:00Z",
  },
];

export default function SuperAdminUsersPage() {
    // For now, allow access without auth check
    // TODO: Add proper auth when Supabase is configured
    const users = mockUsers;

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
                        {users?.map((user: any) => (
                            <tr key={user.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                                <td className="p-4 font-bold text-sm">{user.email}</td>
                                <td className="p-4">
                                    <span className={`inline-block px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded 
                         ${user.role === 'super_admin' ? 'bg-purple-100 text-purple-700' :
                                            user.role === 'tech_admin' ? 'bg-black text-white' :
                                                'bg-blue-100 text-blue-700'}`}>
                                        {user.role.replace('_', ' ')}
                                    </span>
                                </td>
                                <td className="p-4 text-xs font-mono text-gray-500">{new Date(user.created_at).toLocaleDateString()}</td>
                                <td className="p-4 text-right">
                                    {user.role !== 'super_admin' ? (
                                        <button className="text-red-500 hover:text-red-700 font-bold text-xs uppercase flex items-center justify-end">
                                            <Trash2 className="w-4 h-4 mr-1" /> Revoke Access
                                        </button>
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
