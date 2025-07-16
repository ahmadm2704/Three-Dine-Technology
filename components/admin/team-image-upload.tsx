"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X, ImageIcon } from "lucide-react"
import { supabase } from "@/lib/supabase"
import Image from "next/image"

interface TeamImageUploadProps {
  currentImageUrl?: string
  onImageChange: (imageUrl: string) => void
  teamMemberId?: string
}

export function TeamImageUpload({ currentImageUrl, onImageChange, teamMemberId }: TeamImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(currentImageUrl || "")

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.")
      }

      const file = event.target.files[0]
      const fileExt = file.name.split(".").pop()
      const fileName = `${teamMemberId || Date.now()}.${fileExt}`
      const filePath = `team-members/${fileName}`

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage.from("team-images").upload(filePath, file, {
        upsert: true,
      })

      if (uploadError) {
        throw uploadError
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("team-images").getPublicUrl(filePath)

      setPreviewUrl(publicUrl)
      onImageChange(publicUrl)
    } catch (error) {
      alert("Error uploading image!")
      console.error(error)
    } finally {
      setUploading(false)
    }
  }

  const removeImage = () => {
    setPreviewUrl("")
    onImageChange("")
  }

  return (
    <div className="space-y-4">
      <Label className="text-gray-300">Profile Image</Label>

      {previewUrl ? (
        <div className="relative w-32 h-32 mx-auto">
          <Image
            src={previewUrl || "/placeholder.svg"}
            alt="Team member"
            width={128}
            height={128}
            className="w-full h-full object-cover rounded-full border-2 border-gray-600"
          />
          <Button
            type="button"
            size="sm"
            variant="destructive"
            className="absolute -top-2 -right-2 rounded-full w-6 h-6 p-0"
            onClick={removeImage}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        <div className="w-32 h-32 mx-auto bg-gray-700 rounded-full flex items-center justify-center border-2 border-dashed border-gray-600">
          <ImageIcon className="h-8 w-8 text-gray-400" />
        </div>
      )}

      <div className="flex items-center gap-2">
        <Input
          type="file"
          accept="image/*"
          onChange={uploadImage}
          disabled={uploading}
          className="bg-gray-800 border-gray-600 text-white"
        />
        <Button type="button" disabled={uploading} size="sm" className="bg-blue-600 hover:bg-blue-700">
          <Upload className="h-4 w-4 mr-2" />
          {uploading ? "Uploading..." : "Upload"}
        </Button>
      </div>

      <p className="text-xs text-gray-400">Recommended: Square image, at least 200x200px</p>
    </div>
  )
}
