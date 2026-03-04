import { Oswald, Open_Sans } from 'next/font/google'
import "@/app/globals.css"
import AdminSidebar from "./components/admin-sidebar"

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

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // For now, render admin interface without authentication
    // TODO: Add proper Supabase auth when environment is configured
    const user = true; // Mock authenticated user

    return (
        <div className={`${oswald.variable} ${openSans.variable} font-sans bg-gray-50 text-black min-h-screen flex`}>
            {user && <AdminSidebar />}
            <main className={`flex-grow ${user ? 'ml-64' : ''} bg-gray-100 min-h-screen`}>
                {children}
            </main>
        </div>
    )
}
