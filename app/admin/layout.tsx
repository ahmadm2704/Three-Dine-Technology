import { Oswald, Open_Sans } from 'next/font/google'
import "@/app/globals.css"
import AdminSidebar from "./components/admin-sidebar"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

const oswald = Oswald({
    subsets: ['latin'],
    variable: '--font-oswald',
})

const openSans = Open_Sans({
    subsets: ['latin'],
    variable: '--font-open-sans',
})

export const metadata = {
    title: 'Admin Portal | Three Dine',
    description: 'Internal Management System',
}

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = createClient()

    // Check auth
    const { data: { user } } = await supabase.auth.getUser()

    // NOTE: In a real app, you would inspect the path here. 
    // If user is NOT logged in and path is NOT /admin/login, redirect to login.
    // If user IS logged in and path IS /admin/login, redirect to dashboard.

    // For simplicity regarding Next.js Server Component restrictions, we'll handle some of this in middleware or page-level.
    // But generally, the layout wraps protected content. 
    // We can't conditionally render the <html> tag so easily based on auth state without causing hydration issues if logic is complex.
    // Instead, we will render the Sidebar ONLY if user exists.

    return (
        <div className={`${oswald.variable} ${openSans.variable} font-sans bg-gray-50 text-black min-h-screen flex`}>
            {user && <AdminSidebar />}
            <main className={`flex-grow ${user ? 'ml-64' : ''} bg-gray-100 min-h-screen`}>
                {children}
            </main>
        </div>
    )
}
