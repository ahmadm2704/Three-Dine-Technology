import { createClient as createSupabaseClient } from "@supabase/supabase-js"


// Get environment variables with fallbacks for development
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Check if Supabase is properly configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey && supabaseUrl !== "" && supabaseAnonKey !== "")

// Create a dummy client for when Supabase isn't configured
const createDummyClient = () => {
  return {
    from: () => ({
      select: () => Promise.resolve({ data: [], error: null }),
      insert: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }),
      update: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }),
      delete: () => Promise.resolve({ error: new Error("Supabase not configured") }),
      eq: function () {
        return this
      },
      order: function () {
        return this
      },
      limit: function () {
        return this
      },
      single: function () {
        return this
      },
    }),
    storage: {
      from: () => ({
        upload: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }),
        download: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }),
        remove: () => Promise.resolve({ error: new Error("Supabase not configured") }),
        getPublicUrl: () => ({ data: { publicUrl: "" } }),
      }),
    },
  } as any
}

// Export the Supabase client (or dummy client if not configured)
export const supabase = isSupabaseConfigured ? createSupabaseClient(supabaseUrl, supabaseAnonKey) : createDummyClient()

// Named export for createClient
export const createClient = () => {
  return isSupabaseConfigured ? createSupabaseClient(supabaseUrl, supabaseAnonKey) : createDummyClient()
}

// Server-side client for admin operations
export const createServerClient = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!isSupabaseConfigured || !serviceRoleKey) {
    return createDummyClient()
  }

  return createSupabaseClient(supabaseUrl, serviceRoleKey)
}
