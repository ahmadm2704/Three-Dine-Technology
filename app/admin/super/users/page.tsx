"use client";

import { useEffect, useState } from "react";
import { Shield, Trash2, Plus, KeyRound, Pencil, X, Loader2 } from "lucide-react";

interface AdminUser {
    id: string;
    email: string;
    name: string;
    role: string;
    created_at: string;
}

const roleBadge = (role: string) => {
    const styles = role === "super_admin"
        ? "bg-purple-100 text-purple-700"
        : role === "tech_admin"
            ? "bg-black text-white"
            : "bg-blue-100 text-blue-700";
    return (
        <span className={`inline-block px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded ${styles}`}>
            {role.replace("_", " ")}
        </span>
    );
};

export default function SuperAdminUsersPage() {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editUser, setEditUser] = useState<AdminUser | null>(null);
    const [passwordUser, setPasswordUser] = useState<AdminUser | null>(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const fetchUsers = async () => {
        const res = await fetch("/api/admin/users");
        if (res.ok) {
            const data = await res.json();
            setUsers(data.users || []);
        }
        setLoading(false);
    };

    useEffect(() => { fetchUsers(); }, []);

    const clearMessages = () => { setError(""); setSuccess(""); };

    // ---- Add Admin ----
    const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        clearMessages();
        const form = new FormData(e.currentTarget);
        const body = {
            name: form.get("name"),
            email: form.get("email"),
            password: form.get("password"),
            role: form.get("role"),
        };
        const res = await fetch("/api/admin/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        const data = await res.json();
        if (res.ok) {
            setSuccess("Admin created successfully");
            setShowAddModal(false);
            fetchUsers();
        } else {
            setError(data.error || "Failed to create admin");
        }
    };

    // ---- Edit Admin ----
    const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!editUser) return;
        clearMessages();
        const form = new FormData(e.currentTarget);
        const body = { name: form.get("name"), role: form.get("role") };
        const res = await fetch(`/api/admin/users/${editUser.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        const data = await res.json();
        if (res.ok) {
            setSuccess("Admin updated successfully");
            setEditUser(null);
            fetchUsers();
        } else {
            setError(data.error || "Failed to update admin");
        }
    };

    // ---- Change Password (super admin changing another admin's password) ----
    const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!passwordUser) return;
        clearMessages();
        const form = new FormData(e.currentTarget);
        const password = form.get("password") as string;
        const confirm = form.get("confirm") as string;
        if (password !== confirm) {
            setError("Passwords do not match");
            return;
        }
        const res = await fetch(`/api/admin/users/${passwordUser.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
        });
        const data = await res.json();
        if (res.ok) {
            setSuccess(`Password changed for ${passwordUser.name}`);
            setPasswordUser(null);
        } else {
            setError(data.error || "Failed to change password");
        }
    };

    // ---- Delete Admin ----
    const handleDelete = async (user: AdminUser) => {
        if (!confirm(`Delete admin "${user.name}" (${user.email})?`)) return;
        clearMessages();
        const res = await fetch(`/api/admin/users/${user.id}`, { method: "DELETE" });
        const data = await res.json();
        if (res.ok) {
            setSuccess("Admin deleted");
            fetchUsers();
        } else {
            setError(data.error || "Failed to delete admin");
        }
    };

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        );
    }

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black uppercase text-black">User Management</h1>
                    <p className="text-gray-500">
                        Manage admin access and roles.{" "}
                        <span className="text-purple-600 font-bold">Super Admin Only.</span>
                    </p>
                </div>
                <button
                    onClick={() => { clearMessages(); setShowAddModal(true); }}
                    className="flex items-center gap-2 bg-black text-white px-4 py-2 font-bold text-sm uppercase hover:bg-gray-800 transition-colors"
                >
                    <Plus className="w-4 h-4" /> Add Admin
                </button>
            </div>

            {/* Messages */}
            {error && (
                <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-3 text-sm text-red-700 font-bold">
                    {error}
                </div>
            )}
            {success && (
                <div className="mb-4 bg-green-50 border-l-4 border-green-500 p-3 text-sm text-green-700 font-bold">
                    {success}
                </div>
            )}

            {/* Table */}
            <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="p-4 font-bold uppercase text-xs text-gray-500 tracking-widest">Name</th>
                            <th className="p-4 font-bold uppercase text-xs text-gray-500 tracking-widest">Email</th>
                            <th className="p-4 font-bold uppercase text-xs text-gray-500 tracking-widest">Role</th>
                            <th className="p-4 font-bold uppercase text-xs text-gray-500 tracking-widest">Created</th>
                            <th className="p-4 font-bold uppercase text-xs text-gray-500 tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                                <td className="p-4 font-bold text-sm">{user.name}</td>
                                <td className="p-4 text-sm text-gray-600">{user.email}</td>
                                <td className="p-4">{roleBadge(user.role)}</td>
                                <td className="p-4 text-xs font-mono text-gray-500">
                                    {new Date(user.created_at).toLocaleDateString()}
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-3">
                                        <button
                                            onClick={() => { clearMessages(); setEditUser(user); }}
                                            className="text-gray-500 hover:text-black"
                                            title="Edit"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => { clearMessages(); setPasswordUser(user); }}
                                            className="text-gray-500 hover:text-blue-600"
                                            title="Change Password"
                                        >
                                            <KeyRound className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user)}
                                            className="text-gray-400 hover:text-red-600"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ---- Add Modal ---- */}
            {showAddModal && (
                <Modal title="Add New Admin" onClose={() => setShowAddModal(false)}>
                    <form onSubmit={handleAdd} className="space-y-4">
                        <Input label="Name" name="name" required />
                        <Input label="Email" name="email" type="email" required />
                        <Input label="Password" name="password" type="password" required minLength={6} />
                        <RoleSelect name="role" />
                        <SubmitButton label="Create Admin" />
                    </form>
                </Modal>
            )}

            {/* ---- Edit Modal ---- */}
            {editUser && (
                <Modal title={`Edit: ${editUser.name}`} onClose={() => setEditUser(null)}>
                    <form onSubmit={handleEdit} className="space-y-4">
                        <Input label="Name" name="name" defaultValue={editUser.name} required />
                        <RoleSelect name="role" defaultValue={editUser.role} />
                        <SubmitButton label="Save Changes" />
                    </form>
                </Modal>
            )}

            {/* ---- Change Password Modal ---- */}
            {passwordUser && (
                <Modal title={`Change Password: ${passwordUser.name}`} onClose={() => setPasswordUser(null)}>
                    <form onSubmit={handleChangePassword} className="space-y-4">
                        <Input label="New Password" name="password" type="password" required minLength={6} />
                        <Input label="Confirm Password" name="confirm" type="password" required minLength={6} />
                        <SubmitButton label="Change Password" />
                    </form>
                </Modal>
            )}
        </div>
    );
}

// ---- Reusable sub-components ----

function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
            <div className="bg-white w-full max-w-md mx-4 p-6 shadow-2xl relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-black">
                    <X className="w-5 h-5" />
                </button>
                <h2 className="text-lg font-black uppercase mb-4">{title}</h2>
                {children}
            </div>
        </div>
    );
}

function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">{label}</label>
            <input
                {...props}
                className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
            />
        </div>
    );
}

function RoleSelect({ name, defaultValue }: { name: string; defaultValue?: string }) {
    return (
        <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Role</label>
            <select
                name={name}
                defaultValue={defaultValue || "tech_admin"}
                className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
            >
                <option value="tech_admin">Tech Admin</option>
                <option value="research_admin">Research Admin</option>
                <option value="super_admin">Super Admin</option>
            </select>
        </div>
    );
}

function SubmitButton({ label }: { label: string }) {
    return (
        <button
            type="submit"
            className="w-full bg-black text-white py-2 font-bold text-sm uppercase hover:bg-gray-800 transition-colors"
        >
            {label}
        </button>
    );
}
