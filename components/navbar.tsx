"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, Code, Zap, Users, Mail, Briefcase, Home } from "lucide-react"
import { usePathname } from 'next/navigation'
import DarkModeToggle from "@/components/dark-mode-toggle"
import Image from "next/image"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Check if we are on the intro gateway page
  const isGateway = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (isGateway) return null; // Don't show navbar on gateway

  const navItems = [
    { href: "/technology", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/team", label: "Team" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-white dark:bg-gray-900 border-b border-black dark:border-gray-700 py-2"
        : "bg-transparent py-6"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/technology" className="group">
            <span className="w-56 h-12 flex items-center justify-center overflow-hidden">
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
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative group overflow-hidden"
                >
                  <span className={`text-sm font-bold uppercase tracking-widest transition-colors text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400`}>
                    {item.label}
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                </Link>
              )
            })}
            <DarkModeToggle className="border-gray-300 dark:border-gray-600 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800" />
            <Link
              href="/contact"
              className="px-6 py-2 bg-blue-600 text-white font-bold uppercase text-xs tracking-widest hover:bg-blue-700 transition-colors"
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <DarkModeToggle className="border-gray-300 dark:border-gray-600 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800" />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-black dark:text-white"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-black dark:border-gray-700 h-screen">
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-black uppercase tracking-tighter text-black dark:text-white hover:text-gray-500 dark:hover:text-gray-400"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

