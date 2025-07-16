"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import Image from "next/image"

interface SimpleImageInputProps {
  currentImageUrl?: string
  onImageChange: (imageUrl: string) => void
  label?: string
}

export function SimpleImageInput({ currentImageUrl, onImageChange, label = "Image URL" }: SimpleImageInputProps) {
  const [imageUrl, setImageUrl] = useState(currentImageUrl || "")
  const [showPreview, setShowPreview] = useState(!!currentImageUrl)

  const handleUrlChange = (url: string) => {
    setImageUrl(url)
    onImageChange(url)
  }

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-gray-300">{label}</Label>
        <div className="flex gap-2">
          <Input
            value={imageUrl}
            onChange={(e) => handleUrlChange(e.target.value)}
            className="bg-gray-800 border-gray-600 text-white"
            placeholder="https://example.com/image.jpg"
          />
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setShowPreview(!showPreview)}
            className="border-gray-600 text-gray-300 bg-transparent"
          >
            {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {showPreview && imageUrl && (
        <div className="w-32 h-32 mx-auto">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt="Preview"
            width={128}
            height={128}
            className="w-full h-full object-cover rounded-full border-2 border-gray-600"
            onError={() => setShowPreview(false)}
          />
        </div>
      )}
    </div>
  )
}
