"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, Eye, EyeOff, AlertCircle, CheckCircle, Info } from "lucide-react"
import { adminSignIn } from "@/app/actions/admin"
import { useRouter } from "next/navigation"
import { isSupabaseConfigured } from "@/lib/supabase"

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const router = useRouter()

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);
  setResult(null);

  const formData = new FormData(e.currentTarget);
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString().trim();

  if (!email || !password) {
    setResult({ success: false, message: "Email and password are required" });
    setIsSubmitting(false);
    return;
  }

  try {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await res.json();
    setResult(result);

    if (result.success) {
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 1000);
    }
  } catch (error) {
    console.error("Login error:", error);
    setResult({ success: false, message: "Login request failed" });
  } finally {
    setIsSubmitting(false);
  }
};



  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-700">
        <CardHeader className="text-center">
          <div className="mx-auto bg-blue-600 p-3 rounded-full w-fit mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-white">Admin Login</CardTitle>
          <p className="text-gray-400">Access the admin dashboard</p>
        </CardHeader>
        <CardContent>
          {!isSupabaseConfigured && (
            <div className="mb-4 p-3 rounded-lg flex items-center gap-2 bg-blue-600/20 border border-blue-600/30 text-blue-400">
              <Info className="h-4 w-4" />
              <span className="text-sm">Demo mode - Supabase not configured</span>
            </div>
          )}

          {result && (
            <div
              className={`mb-4 p-3 rounded-lg flex items-center gap-2 ${
                result.success
                  ? "bg-green-600/20 border border-green-600/30 text-green-400"
                  : "bg-red-600/20 border border-red-600/30 text-red-400"
              }`}
            >
              {result.success ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <span className="text-sm">{result.message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                className="bg-gray-800 border-gray-600 text-white"
                placeholder="admin@threedinetech.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-gray-300">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="bg-gray-800 border-gray-600 text-white pr-10"
                  placeholder="Enter password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
              {isSubmitting ? "Signing In..." : "Login"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-400">
            {!isSupabaseConfigured
              ? "Demo credentials: admin@threedinetech.com / admin123"
              : "Use your admin credentials"}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
