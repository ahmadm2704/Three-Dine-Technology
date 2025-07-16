"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface MorphingCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
}

export function MorphingCard({ children, className = "", glowColor = "blue" }: MorphingCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const glowColors = {
    blue: "rgba(59, 130, 246, 0.3)",
    purple: "rgba(139, 92, 246, 0.3)",
    green: "rgba(16, 185, 129, 0.3)",
    orange: "rgba(245, 158, 11, 0.3)",
    red: "rgba(239, 68, 68, 0.3)",
    cyan: "rgba(6, 182, 212, 0.3)",
  }

  return (
    <Card
      className={`card-3d hover-morph glass-ultra neon-border interactive-glow ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        boxShadow: isHovered
          ? `0 30px 60px rgba(0, 0, 0, 0.4), 0 0 50px ${glowColors[glowColor as keyof typeof glowColors]}`
          : "0 8px 32px rgba(0, 0, 0, 0.3)",
      }}
    >
      <CardContent className="relative overflow-hidden">{children}</CardContent>
    </Card>
  )
}
