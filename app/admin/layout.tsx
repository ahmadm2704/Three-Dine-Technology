"use client";

import { Oswald, Open_Sans } from 'next/font/google'
import "@/app/globals.css"
import AdminSidebar from "./components/admin-sidebar"
import { usePathname } from "next/navigation"

const oswald = Oswald({
    subsets: ['latin'],
    variable: '--font-oswald',
})

const openSans = Open_Sans({
    subsets: ['latin'],
    variable: '--font-open-sans',
})

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/admin/login';

    return (
        <div className={`${oswald.variable} ${openSans.variable} font-sans bg-gray-50 text-black min-h-screen flex`}>
            {!isLoginPage && <AdminSidebar />}
            <main className={`flex-grow ${!isLoginPage ? 'ml-64' : ''} bg-gray-100 min-h-screen`}>
                {children}
            </main>
        </div>
    )
}
