"use server"

import { createContactSubmission } from "@/lib/database"
import { isSupabaseConfigured } from "@/lib/supabase"
import { z } from "zod"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  phone: z.string().min(7, "Phone number is required"),
  service: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export async function submitContactForm(formData: FormData) {
  try {
    const data = {
      name: formData.get("name")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      company: formData.get("company")?.toString() || undefined,
      phone: formData.get("phone")?.toString() || undefined,
      service: formData.get("service")?.toString() || "General",
      message: formData.get("message")?.toString() || "",
    }

    const validatedData = contactSchema.parse(data)

    if (!isSupabaseConfigured) {
      // For demo purposes, simulate successful submission
      console.log("Demo contact form submission:", validatedData)
      return {
        success: true,
        message: "Thank you for your message! (Demo mode - Supabase not configured)",
      }
    }

    await createContactSubmission(validatedData)

    return {
      success: true,
      message: "Thank you for your message! We'll get back to you within 24 hours.",
    }
  } catch (error) {
    console.error("Contact form error:", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.issues?.[0]?.message || "Validation failed. Please check your inputs.",
      }
    }

    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    }
  }
}
