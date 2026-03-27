import type React from "react"
import type { Metadata } from "next"
import { Inter, Oswald, Open_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" })
const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-open-sans" })

export const metadata: Metadata = {
  title: {
    default: "Three Dine Technology | Innovative Tech Solutions",
    template: "%s | Three Dine Technology"
  },
  description: "Three Dine Technology is a leading technology and computing research agency specializing in innovative software solutions, digital transformation, data analytics, and cutting-edge research.",
  keywords: ["Three Dine", "Three Dine Technology", "Three Dine Tech", "Three Dine Group", "Three Dine Research", "software solutions", "tech agency", "digital transformation", "technology innovation", "data analytics"],
  authors: [{ name: "Three Dine Technology" }],
  creator: "Three Dine Technology",
  publisher: "Three Dine Technology",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Three Dine Technology | Innovative Tech Solutions",
    description: "Three Dine Technology is a leading technology and computing research agency specializing in innovative software solutions, digital transformation, data analytics, and cutting-edge research.",
    url: 'https://threedinecorporation.com',
    siteName: 'Three Dine Technology',
    images: [
      {
        url: '/White Icon.png',
        width: 800,
        height: 600,
        alt: 'Three Dine Technology Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Three Dine Technology | Innovative Tech Solutions',
    description: 'Three Dine Technology is a leading technology and computing research agency specializing in innovative software solutions, digital transformation, data analytics, and cutting-edge research.',
    images: ['/White Icon.png'],
    creator: '@threedinetech',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/White Icon.png',
    apple: '/White Icon.png'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${oswald.variable} ${openSans.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Three Dine Technology",
              "url": "https://threedinecorporation.com",
              "logo": "https://threedinecorporation.com/White%20Icon.png",
              "description": "Three Dine Technology is a leading technology and computing research agency specializing in innovative software solutions, digital transformation, data analytics, and cutting-edge research.",
              "sameAs": [
                "https://www.linkedin.com/company/threedinetech",
                "https://twitter.com/threedinetech",
                "https://www.instagram.com/threedinetech"
              ]
            })
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
