"use client"

import Link from "next/link"
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Code, Zap, Users } from "lucide-react"

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
    <footer className="relative bg-slate-900 border-t border-slate-800">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-lg blur-md opacity-50"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                ThreeDine Tech
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Transforming ideas into powerful digital solutions with cutting-edge technology and innovative design.
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
                    className="w-10 h-10 bg-slate-800 hover:bg-gradient-to-br hover:from-blue-500 hover:to-cyan-500 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-blue-500/25"
                    aria-label={item.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
              <Zap className="w-5 h-5 text-blue-400" />
              <span>Services</span>
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-300 hover:translate-x-1 transform inline-block"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
              <Users className="w-5 h-5 text-purple-400" />
              <span>Company</span>
            </h3>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-purple-400 transition-colors duration-300 hover:translate-x-1 transform inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
              <Mail className="w-5 h-5 text-cyan-400" />
              <span>Contact</span>
            </h3>
            <ul className="space-y-4">
              {contact.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.text}>
                    <a
                      href={item.href}
                      className="flex items-center space-x-3 text-slate-400 hover:text-cyan-400 transition-colors duration-300 group"
                    >
                      <Icon className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                      <span className="group-hover:translate-x-1 transform transition-transform duration-300">
                        {item.text}
                      </span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-sm">© {currentYear} ThreeDine Tech. All rights reserved.</p>
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-slate-400 hover:text-blue-400 transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-slate-400 hover:text-blue-400 transition-colors duration-300">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-slate-400 hover:text-blue-400 transition-colors duration-300">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
