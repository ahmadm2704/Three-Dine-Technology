import { Badge } from "@/components/ui/badge"

interface SectionHeaderProps {
  badge?: string
  title: string
  subtitle?: string
  centered?: boolean
}

export function SectionHeader({ badge, title, subtitle, centered = true }: SectionHeaderProps) {
  return (
    <div className={`mb-16 ${centered ? "text-center" : ""}`}>
      {badge && (
        <Badge variant="outline" className="border-blue-500 text-blue-400 bg-blue-500/10 mb-4 animate-pulse-glow">
          {badge}
        </Badge>
      )}
      <h2 className="text-4xl lg:text-6xl font-bold mb-6">
        <span className="gradient-text">{title}</span>
      </h2>
      {subtitle && <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">{subtitle}</p>}
    </div>
  )
}
