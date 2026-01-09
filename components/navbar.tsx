"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, Code, Zap, Users, Mail, Briefcase, Home } from "lucide-react"
import { usePathname } from 'next/navigation'

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
        ? "bg-white border-b border-black py-2"
        : "bg-transparent py-6"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/technology" className="flex items-center space-x-2 group">
            <span className="w-8 h-8 bg-black text-white flex items-center justify-center font-bold rounded-none">TD</span>
            <span className="text-xl font-black uppercase tracking-tighter">Three Dine</span>
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
                  <span className={`text-sm font-bold uppercase tracking-widest transition-colors ${scrolled ? 'text-black' : 'text-black'} hover:text-gray-500`}>
                    {item.label}
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                </Link>
              )
            })}
            <Link
              href="/contact"
              className="px-6 py-2 bg-black text-white font-bold uppercase text-xs tracking-widest hover:bg-gray-800 transition-colors"
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-black"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-black h-screen">
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-black uppercase tracking-tighter text-black hover:text-gray-500"
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

