"use client"

import Link from "next/link"
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, ArrowRight } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const services = [
    { name: "Web Development", href: "/services#web" },
    { name: "Mobile Apps", href: "/services#mobile" },
    { name: "Cloud Solutions", href: "/services#cloud" },
    { name: "AI Integration", href: "/services#ai" },
  ]

  const company = [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/team" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Blog", href: "/blog" },
  ]

  const contact = [
    { icon: Mail, text: "hello@threedinetech.com", href: "mailto:hello@threedinetech.com" },
    { icon: Phone, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
    { icon: MapPin, text: "San Francisco, CA", href: "#" },
  ]

  const social = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  ]

  return (
    <footer className="bg-black text-white border-t border-white/10">
      {/* Big CTA Section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-8">
            Ready to <span className="text-outline-white">Collaborate?</span>
          </h2>
          <Link href="/contact" className="inline-flex items-center text-xl font-bold uppercase border-b-2 border-white pb-2 hover:text-gray-400 hover:border-gray-400 transition-colors">
            Let's Talk <ArrowRight className="ml-4 w-6 h-6" />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">

          {/* Brand */}
          <div className="space-y-6">
            <Link href="/technology" className="block">
              <span className="text-2xl font-black uppercase tracking-tighter">
                Three Dine
              </span>
            </Link>
            <p className="text-gray-500 font-light leading-relaxed max-w-xs">
              Engineering the digital future with precision, creativity, and code.
            </p>
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

          {/* Links Columns */}
          <div>
            <h3 className="text-lg font-bold uppercase mb-8 tracking-widest">Services</h3>
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service.name}>
                  <Link href={service.href} className="text-gray-500 hover:text-white transition-colors uppercase text-sm font-bold tracking-wide">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold uppercase mb-8 tracking-widest">Company</h3>
            <ul className="space-y-4">
              {company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-500 hover:text-white transition-colors uppercase text-sm font-bold tracking-wide">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold uppercase mb-8 tracking-widest">Contact</h3>
            <ul className="space-y-4">
              {contact.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.text}>
                    <a href={item.href} className="flex items-start space-x-3 group">
                      <Icon className="w-5 h-5 text-gray-500 group-hover:text-white mt-0.5 transition-colors" />
                      <span className="text-gray-500 group-hover:text-white transition-colors text-sm font-light">
                        {item.text}
                      </span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 uppercase font-bold tracking-wider">
          <p>© {currentYear} ThreeDine Tech.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
const currentYear = new Date().getFullYear()

const services = [
  { name: "Web Development", href: "/services#web" },
  { name: "Mobile Apps", href: "/services#mobile" },
  { name: "Cloud Solutions", href: "/services#cloud" },
  { name: "AI Integration", href: "/services#ai" },
]

const company = [
  { name: "About Us", href: "/about" },
  { name: "Our Team", href: "/team" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Blog", href: "/blog" },
]

const contact = [
  { icon: Mail, text: "hello@threedinetech.com", href: "mailto:hello@threedinetech.com" },
  { icon: Phone, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
  { icon: MapPin, text: "San Francisco, CA", href: "#" },
]


