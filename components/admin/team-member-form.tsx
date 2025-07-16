"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Save, X, Plus, Trash2 } from "lucide-react"
import { TeamImageUpload } from "./team-image-upload"
import type { TeamMember } from "@/lib/database"

interface TeamMemberFormProps {
  isOpen: boolean
  onClose: () => void
  onSave: (memberData: Partial<TeamMember>) => void
  editingMember?: TeamMember | null
  isSubmitting: boolean
}

export function TeamMemberForm({ isOpen, onClose, onSave, editingMember, isSubmitting }: TeamMemberFormProps) {
  const [imageUrl, setImageUrl] = useState(editingMember?.image_url || "")
  const [skills, setSkills] = useState<string[]>(editingMember?.skills || [])
  const [newSkill, setNewSkill] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const memberData = {
      name: formData.get("name") as string,
      role: formData.get("role") as string,
      bio: formData.get("bio") as string,
      email: formData.get("email") as string,
      linkedin_url: formData.get("linkedin_url") as string,
      twitter_url: formData.get("twitter_url") as string,
      github_url: formData.get("github_url") as string,
      display_order: Number.parseInt(formData.get("display_order") as string) || 0,
      is_active: formData.get("is_active") === "on",
      image_url: imageUrl,
      skills: skills,
    }

    onSave(memberData)
  }

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingMember ? "Edit Team Member" : "Add Team Member"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <TeamImageUpload currentImageUrl={imageUrl} onImageChange={setImageUrl} teamMemberId={editingMember?.id} />

          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-gray-300">
                Full Name *
              </Label>
              <Input
                id="name"
                name="name"
                defaultValue={editingMember?.name || ""}
                className="bg-gray-800 border-gray-600 text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="role" className="text-gray-300">
                Role/Position *
              </Label>
              <Input
                id="role"
                name="role"
                defaultValue={editingMember?.role || ""}
                className="bg-gray-800 border-gray-600 text-white"
                placeholder="e.g., Senior Developer"
                required
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <Label htmlFor="bio" className="text-gray-300">
              Bio
            </Label>
            <Textarea
              id="bio"
              name="bio"
              defaultValue={editingMember?.bio || ""}
              className="bg-gray-800 border-gray-600 text-white"
              rows={3}
              placeholder="Brief description about the team member..."
            />
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email" className="text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={editingMember?.email || ""}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label htmlFor="display_order" className="text-gray-300">
                Display Order
              </Label>
              <Input
                id="display_order"
                name="display_order"
                type="number"
                defaultValue={editingMember?.display_order || 0}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Social Links</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="linkedin_url" className="text-gray-300">
                  LinkedIn URL
                </Label>
                <Input
                  id="linkedin_url"
                  name="linkedin_url"
                  defaultValue={editingMember?.linkedin_url || ""}
                  className="bg-gray-800 border-gray-600 text-white"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              <div>
                <Label htmlFor="twitter_url" className="text-gray-300">
                  Twitter URL
                </Label>
                <Input
                  id="twitter_url"
                  name="twitter_url"
                  defaultValue={editingMember?.twitter_url || ""}
                  className="bg-gray-800 border-gray-600 text-white"
                  placeholder="https://twitter.com/username"
                />
              </div>
              <div>
                <Label htmlFor="github_url" className="text-gray-300">
                  GitHub URL
                </Label>
                <Input
                  id="github_url"
                  name="github_url"
                  defaultValue={editingMember?.github_url || ""}
                  className="bg-gray-800 border-gray-600 text-white"
                  placeholder="https://github.com/username"
                />
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Skills</h3>
            <div className="flex gap-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white"
                placeholder="Add a skill..."
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
              />
              <Button type="button" onClick={addSkill} size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge key={index} variant="outline" className="border-gray-600 text-gray-300 bg-gray-800">
                  {skill}
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="ml-2 h-auto p-0 text-gray-400 hover:text-red-400"
                    onClick={() => removeSkill(skill)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Active Status */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="is_active"
              name="is_active"
              defaultChecked={editingMember?.is_active !== false}
              className="rounded border-gray-600 bg-gray-800"
            />
            <Label htmlFor="is_active" className="text-gray-300">
              Active (show on website)
            </Label>
          </div>

          {/* Form Actions */}
          <div className="flex gap-2 pt-4">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
              <Save className="h-4 w-4 mr-2" />
              {isSubmitting ? "Saving..." : editingMember ? "Update Member" : "Add Member"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-600 text-gray-300 bg-transparent"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
