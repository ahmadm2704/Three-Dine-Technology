import type React from "react"
import type { Metadata } from "next"
import { Inter, Oswald, Open_Sans } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" })
const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-open-sans" })

export const metadata: Metadata = {
  title: "Three Dine Group",
  description: "Three Dine Technology & Research",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${oswald.variable} ${openSans.variable} font-sans bg-white text-black antialiased`}>
        {children}
      </body>
    </html>
  )
}
