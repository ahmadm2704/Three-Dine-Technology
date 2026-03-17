"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DarkModeToggle from "@/components/dark-mode-toggle";
import Image from "next/image";

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
        { name: "Team", href: "/research/team" },
        { name: "Global Community", href: "/research/universities" },
        { name: "Samples", href: "/research/samples" },
        { name: "Contact", href: "/research/contact" },
    ];

    if (pathname === "/") return null;

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${scrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md py-4 border-black dark:border-gray-700" : "bg-transparent py-6 border-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/research" className="group">
                        <div className="w-56 h-12 overflow-hidden">
                            <Image
                                src="/logo.png"
                                alt="Three Dine logo"
                                width={224}
                                height={48}
                                className="w-full h-full object-contain dark:hidden"
                                priority
                            />
                            <Image
                                src="/logo-dark.png"
                                alt="Three Dine logo"
                                width={224}
                                height={48}
                                className="hidden w-full h-full object-contain dark:block"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-bold uppercase tracking-widest relative group ${pathname === link.href ? "text-blue-600" : "text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400"
                                    }`}
                            >
                                {link.name}
                                <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                                    }`}></span>
                            </Link>
                        ))}

                        <DarkModeToggle className="border-gray-300 dark:border-gray-600 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800" />

                        <Link
                            href="/research/contact"
                            className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 text-sm font-bold uppercase tracking-widest hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white transition-colors flex items-center"
                        >
                            Inquire <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-2">
                        <DarkModeToggle className="border-gray-300 dark:border-gray-600 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800" />
                        <button
                            className="text-black dark:text-white p-2"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-gray-900 border-t border-black dark:border-gray-700 overflow-hidden"
                    >
                        <div className="px-4 py-8 space-y-4 flex flex-col items-center">
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-xl font-black uppercase tracking-widest text-black dark:text-white hover:text-blue-600"
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
