"use client"

import type { ReactNode } from "react"

interface ProfessionalBackgroundProps {
  children: ReactNode
  variant?: "aurora" | "particles" | "grid" | "minimal"
  className?: string
}

export default function ProfessionalBackground({
  children,
  variant = "aurora",
  className = "",
}: ProfessionalBackgroundProps) {
  const getBackgroundClasses = () => {
    switch (variant) {
      case "aurora":
        return "bg-slate-900 relative overflow-hidden"
      case "particles":
        return "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative"
      case "grid":
        return "bg-slate-900 relative"
      case "minimal":
        return "bg-slate-900"
      default:
        return "bg-slate-900 relative overflow-hidden"
    }
  }

  const renderBackgroundEffects = () => {
    switch (variant) {
      case "aurora":
        return (
          <>
            {/* Aurora Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent"></div>

            {/* Animated Aurora Layers */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
              <div
                className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "2s" }}
              ></div>
            </div>
          </>
        )

      case "particles":
        return (
          <>
            {/* Particle Background */}
            <div className="absolute inset-0">
              {Array.from({ length: 50 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 2}s`,
                  }}
                ></div>
              ))}
            </div>

            {/* Connecting Lines */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full">
                {Array.from({ length: 20 }).map((_, i) => (
                  <line
                    key={i}
                    x1={`${Math.random() * 100}%`}
                    y1={`${Math.random() * 100}%`}
                    x2={`${Math.random() * 100}%`}
                    y2={`${Math.random() * 100}%`}
                    stroke="url(#gradient)"
                    strokeWidth="0.5"
                    opacity="0.3"
                  />
                ))}
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </>
        )

      case "grid":
        return (
          <>
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-transparent to-slate-900/90"></div>
          </>
        )

      default:
        return null
    }
  }

  return (
    <div className={`${getBackgroundClasses()} ${className}`}>
      {renderBackgroundEffects()}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
