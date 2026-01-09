"use client"

import Link from "next/link"
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, ArrowRight, Microscope } from "lucide-react"

export default function ResearchFooter() {
    const currentYear = new Date().getFullYear()

    const links = [
        { name: "About Division", href: "/research/about" },
        { name: "Partner Universities", href: "/research/universities" },
        { name: "Research Samples", href: "/research/samples" },
        { name: "Contact Team", href: "/research/contact" },
    ]

    const social = [
        { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
        { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    ]

    return (
        <footer className="bg-black text-white border-t border-white/10">
            {/* Big CTA Section */}
            <div className="border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <h2 className="text-4xl md:text-6xl font-black uppercase mb-8">
                        Pioneering <span className="text-outline-white">The Future?</span>
                    </h2>
                    <Link href="/research/contact" className="inline-flex items-center text-xl font-bold uppercase border-b-2 border-white pb-2 hover:text-gray-400 hover:border-gray-400 transition-colors">
                        Collaborate With Us <ArrowRight className="ml-4 w-6 h-6" />
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

                    {/* Brand */}
                    <div className="space-y-6">
                        <Link href="/research" className="block flex items-center space-x-2">
                            <div className="bg-white text-black p-1">
                                <Microscope className="w-6 h-6" />
                            </div>
                            <span className="text-2xl font-black uppercase tracking-tighter">
                                TD Research
                            </span>
                        </Link>
                        <p className="text-gray-500 font-light leading-relaxed max-w-xs">
                            Scientific rigor meets digital innovation. Advancing knowledge through comprehensive research and analysis.
                        </p>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h3 className="text-lg font-bold uppercase mb-8 tracking-widest">Navigation</h3>
                        <ul className="space-y-4">
                            {links.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-gray-500 hover:text-white transition-colors uppercase text-sm font-bold tracking-wide">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-lg font-bold uppercase mb-8 tracking-widest">Connect</h3>
                        <div className="flex space-x-4">
                            {social.map((item) => {
                                const Icon = item.icon
                                return (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
                                        aria-label={item.label}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </a>
                                )
                            })}
                        </div>
                    </div>

                </div>

                {/* Copyright */}
                <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 uppercase font-bold tracking-wider">
                    <p>© {currentYear} ThreeDine Research Division.</p>
                    <div className="flex space-x-8 mt-4 md:mt-0">
                        <Link href="/" className="hover:text-white transition-colors">Back to Main Gateway</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
