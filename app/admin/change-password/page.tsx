"use client";

import { useState } from "react";
import { KeyRound, Loader2, CheckCircle } from "lucide-react";

export default function ChangePasswordPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        const form = new FormData(e.currentTarget);
        const currentPassword = form.get("currentPassword") as string;
        const newPassword = form.get("newPassword") as string;
        const confirmPassword = form.get("confirmPassword") as string;

        if (newPassword !== confirmPassword) {
            setError("New passwords do not match");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/admin/change-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ currentPassword, newPassword }),
            });
            const data = await res.json();
            if (res.ok) {
                setSuccess(true);
                (e.target as HTMLFormElement).reset();
            } else {
                setError(data.error || "Failed to change password");
            }
        } catch {
            setError("Server error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-black uppercase text-black">Change Password</h1>
                <p className="text-gray-500">Update your admin account password.</p>
            </div>

            <div className="max-w-md">
                {success && (
                    <div className="mb-4 bg-green-50 border-l-4 border-green-500 p-3 text-sm text-green-700 font-bold flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" /> Password changed successfully
                    </div>
                )}
                {error && (
                    <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-3 text-sm text-red-700 font-bold">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="bg-white border border-gray-200 shadow-sm p-6 space-y-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">
                            Current Password
                        </label>
                        <input
                            type="password"
                            name="currentPassword"
                            required
                            className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">
                            New Password
                        </label>
                        <input
                            type="password"
                            name="newPassword"
                            required
                            minLength={6}
                            className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            required
                            minLength={6}
                            className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-2 font-bold text-sm uppercase hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <KeyRound className="w-4 h-4" />}
                        {loading ? "Changing..." : "Change Password"}
                    </button>
                </form>
            </div>
        </div>
    );
}
