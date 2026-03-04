import { redirect } from "next/navigation"

export default function AdminPage() {
    // Redirect to dashboard by default
    // TODO: Add proper auth check when Supabase is configured
    redirect("/admin/dashboard")
}
