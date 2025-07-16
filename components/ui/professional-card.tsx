"use client"

import type { ReactNode } from "react"

interface ProfessionalCardProps {
  children: ReactNode
  variant?: "glass" | "glow" | "neon" | "minimal"
  className?: string
  hover?: boolean
}

export default function ProfessionalCard({
  children,
  variant = "glass",
  className = "",
  hover = true,
}: ProfessionalCardProps) {
  const getCardClasses = () => {
    const baseClasses = "rounded-xl transition-all duration-300"
    const hoverClasses = hover ? "hover:scale-105 hover:shadow-2xl" : ""

    switch (variant) {
      case "glass":
        return `${baseClasses} ${hoverClasses} bg-slate-800/50 backdrop-blur-md border border-slate-700/50 shadow-xl hover:bg-slate-800/70 hover:border-slate-600/50`

      case "glow":
        return `${baseClasses} ${hoverClasses} bg-slate-800/80 border border-blue-500/30 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:border-blue-400/50`

      case "neon":
        return `${baseClasses} ${hoverClasses} bg-slate-900/90 border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/50 hover:border-cyan-400/70`

      case "minimal":
        return `${baseClasses} ${hoverClasses} bg-slate-800/30 border border-slate-600/30 hover:bg-slate-800/50 hover:border-slate-500/50`

      default:
        return `${baseClasses} ${hoverClasses} bg-slate-800/50 backdrop-blur-md border border-slate-700/50`
    }
  }

  const renderCardEffects = () => {
    switch (variant) {
      case "glow":
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-xl"></div>
        )

      case "neon":
        return (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 rounded-xl"></div>
            <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl blur opacity-30"></div>
          </>
        )

      default:
        return null
    }
  }

  return (
    <div className={`relative ${getCardClasses()} ${className}`}>
      {renderCardEffects()}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
