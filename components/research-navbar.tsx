"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Microscope } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ResearchNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Research specific links
    const links = [
        { name: "Home", href: "/research" },
        { name: "About", href: "/research/about" },
        { name: "Universities", href: "/research/universities" },
        { name: "Samples", href: "/research/samples" },
        { name: "Contact", href: "/research/contact" },
    ];

    if (pathname === "/") return null;

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${scrolled ? "bg-white/90 backdrop-blur-md py-4 border-black" : "bg-transparent py-6 border-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/research" className="flex items-center space-x-2 group">
                        <div className="bg-black text-white p-2 group-hover:bg-blue-600 transition-colors">
                            <Microscope className="w-6 h-6" />
                        </div>
                        <span className="text-2xl font-black uppercase tracking-tighter text-black">
                            TD <span className="text-gray-400">RESEARCH</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-bold uppercase tracking-widest relative group ${pathname === link.href ? "text-blue-600" : "text-black hover:text-gray-600"
                                    }`}
                            >
                                {link.name}
                                <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                                    }`}></span>
                            </Link>
                        ))}

                        <Link
                            href="/research/contact"
                            className="bg-black text-white px-6 py-2 text-sm font-bold uppercase tracking-widest hover:bg-blue-600 transition-colors flex items-center"
                        >
                            Inquire <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-black p-2"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-black overflow-hidden"
                    >
                        <div className="px-4 py-8 space-y-4 flex flex-col items-center">
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-xl font-black uppercase tracking-widest hover:text-blue-600"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
