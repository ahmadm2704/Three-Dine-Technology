import { cookies } from "next/headers"
import bcrypt from 'bcryptjs'

export interface User {
  id: string
  email: string
  name: string
  role: string
}

export async function createSession(user: User): Promise<void> {
  const cookieStore = await cookies()

  const sessionData = {
    user,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
  }

  cookieStore.set("session", JSON.stringify(sessionData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60, // 24 hours
  })
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete("session")
}

export async function getSession(): Promise<User | null> {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("session")

    if (!sessionCookie) {
      return null
    }

    const sessionData = JSON.parse(sessionCookie.value)

    if (sessionData.expires && new Date(sessionData.expires) < new Date()) {
      return null
    }

    return sessionData.user
  } catch (error) {
    console.error("Session error:", error)
    return null
  }
}

export async function signInAdmin(email: string, password: string): Promise<User | null> {
  // Demo credentials - in production, verify against database
  if (email === "admin@threedinetech.com" && password === "admin123") {
    const user: User = {
      id: "1",
      email: "admin@threedinetech.com",
      name: "Admin User",
      role: "admin",
    }

    await createSession(user)
    return user
  }

  return null
}

export async function requireAuth(): Promise<User> {
  const user = await getSession()
  if (!user) {
    throw new Error("Authentication required")
  }
  return user
}

export async function requireAdmin(): Promise<User> {
  const user = await requireAuth()
  if (user.role !== "admin") {
    throw new Error("Admin access required")
  }
  return user
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}

