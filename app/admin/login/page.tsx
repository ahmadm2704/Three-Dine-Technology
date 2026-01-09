"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const supabase = createClient();
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.push("/admin/dashboard");
            router.refresh(); // Refresh to update server components (layout sidebar)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="w-full max-w-md p-8 bg-white border border-gray-800 shadow-2xl">

                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-black text-white mx-auto flex items-center justify-center mb-4">
                        <Lock className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-black uppercase text-black">Admin Access</h1>
                    <p className="text-gray-500 mt-2">Enter credentials to continue.</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 mb-6 text-sm font-bold border-l-4 border-red-600">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border-2 border-gray-200 p-3 font-bold text-black focus:border-black focus:outline-none transition-colors"
                            placeholder="admin@threedine.com"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border-2 border-gray-200 p-3 font-bold text-black focus:border-black focus:outline-none transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-4 font-black uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center justify-center group"
                    >
                        {loading ? "Authenticating..." : (
                            <>
                                Enter Portal <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

            </div>
        </div>
    );
}
