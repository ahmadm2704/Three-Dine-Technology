import type { Metadata } from 'next'
import { Oswald, Open_Sans } from 'next/font/google'
import ResearchNavbar from '@/components/research-navbar'
import ResearchFooter from '@/components/research-footer'
// import "@/app/globals.css" // Removed redundant import

const oswald = Oswald({
    subsets: ['latin'],
    variable: '--font-oswald',
})

const openSans = Open_Sans({
    subsets: ['latin'],
    variable: '--font-open-sans',
})

export const metadata: Metadata = {
    title: 'Three Dine Research | Scientific Excellence',
    description: 'The research division of Three Dine Group.',
}

export default function ResearchLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className={`${oswald.variable} ${openSans.variable} font-sans bg-white text-black min-h-screen flex flex-col`}>
            <ResearchNavbar />
            <main className="flex-grow pt-16">
                {children}
            </main>
            <ResearchFooter />
        </div>
    )
}
