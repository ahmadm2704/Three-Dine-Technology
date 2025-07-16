import { supabase, isSupabaseConfigured } from "./supabase"

export interface Project {
  id: string
  name: string
  client_name: string
  client_email?: string
  client_phone?: string
  description?: string
  status: "planning" | "in_progress" | "completed" | "on_hold" | "cancelled"
  project_type: string
  budget?: number
  start_date?: string
  end_date?: string
  completion_percentage: number
  technologies: string[]
  image_url?: string
  is_featured: boolean
  is_public: boolean
  created_at: string
  updated_at: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio?: string
  skills: string[]
  image_url?: string
  email?: string
  linkedin_url?: string
  twitter_url?: string
  github_url?: string
  is_active: boolean
  display_order: number
}

export interface Service {
  id: string
  title: string
  description: string
  features: string[]
  technologies: string[]
  icon?: string
  image_url?: string
  is_active: boolean
  display_order: number
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  company?: string
  phone?: string
  service?: string
  message: string
  status: "new" | "in_progress" | "responded" | "closed"
  admin_notes?: string
  created_at: string
}

export interface CompanyStat {
  id: string
  stat_name: string
  stat_value: string
  stat_label: string
  display_order: number
  is_active: boolean
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  published_date: string
  featured_image?: string
  tags: string[]
  is_published: boolean
  created_at: string
  updated_at: string
}

// Mock data for when Supabase isn't configured
const mockProjects: Project[] = [
  {
    id: "1",
    name: "E-commerce Platform",
    client_name: "TechCorp Inc.",
    client_email: "contact@techcorp.com",
    description:
      "Modern e-commerce platform with advanced features including inventory management, payment processing, and analytics dashboard.",
    status: "in_progress",
    project_type: "Web Development",
    budget: 25000,
    start_date: "2024-01-15",
    completion_percentage: 75,
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
    is_featured: true,
    is_public: true,
    created_at: "2024-01-15T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z",
  },
  {
    id: "2",
    name: "Mobile Banking App",
    client_name: "FinanceFirst",
    client_email: "info@financefirst.com",
    description:
      "Secure mobile banking application with biometric authentication, real-time transactions, and financial analytics.",
    status: "completed",
    project_type: "Mobile App",
    budget: 45000,
    start_date: "2023-11-20",
    completion_percentage: 100,
    technologies: ["React Native", "Node.js", "MongoDB", "JWT", "Biometric Auth"],
    is_featured: true,
    is_public: true,
    created_at: "2023-11-20T00:00:00Z",
    updated_at: "2024-02-20T00:00:00Z",
  },
  {
    id: "3",
    name: "Inventory Management System",
    client_name: "RetailMax",
    client_email: "admin@retailmax.com",
    description:
      "Comprehensive inventory management system with real-time tracking, automated reordering, and detailed reporting.",
    status: "in_progress",
    project_type: "Custom Software",
    budget: 35000,
    start_date: "2024-02-01",
    completion_percentage: 60,
    technologies: ["Python", "Django", "PostgreSQL", "Redis", "Docker"],
    is_featured: true,
    is_public: true,
    created_at: "2024-02-01T00:00:00Z",
    updated_at: "2024-02-01T00:00:00Z",
  },
]

const mockStats: CompanyStat[] = [
  {
    id: "1",
    stat_name: "projects_completed",
    stat_value: "50+",
    stat_label: "Projects Completed",
    display_order: 1,
    is_active: true,
  },
  {
    id: "2",
    stat_name: "happy_clients",
    stat_value: "25+",
    stat_label: "Happy Clients",
    display_order: 2,
    is_active: true,
  },
  {
    id: "3",
    stat_name: "years_experience",
    stat_value: "3+",
    stat_label: "Years Experience",
    display_order: 3,
    is_active: true,
  },
  {
    id: "4",
    stat_name: "client_satisfaction",
    stat_value: "99%",
    stat_label: "Client Satisfaction",
    display_order: 4,
    is_active: true,
  },
]

const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Web Development in 2024",
    slug: "future-of-web-development-2024",
    excerpt: "Exploring the latest trends and technologies shaping the future of web development.",
    content:
      "Web development continues to evolve at a rapid pace. In 2024, we're seeing exciting developments in areas like AI integration, serverless architecture, and progressive web apps...",
    author: "Sarah Chen",
    published_date: "2024-01-15T00:00:00Z",
    tags: ["Web Development", "Technology", "Trends"],
    is_published: true,
    created_at: "2024-01-15T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z",
  },
  {
    id: "2",
    title: "Building Scalable Mobile Applications",
    slug: "building-scalable-mobile-applications",
    excerpt: "Best practices for creating mobile apps that can grow with your business.",
    content:
      "Scalability is crucial when building mobile applications. Here are the key considerations and best practices we follow at Three Dine Technology...",
    author: "Emily Davis",
    published_date: "2024-01-10T00:00:00Z",
    tags: ["Mobile Development", "Scalability", "Best Practices"],
    is_published: true,
    created_at: "2024-01-10T00:00:00Z",
    updated_at: "2024-01-10T00:00:00Z",
  },
]

// Projects

export async function getProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')

  if (error) {
    console.error('Supabase Error:', error)
    return []
  }

  return data
}

export async function getFeaturedProjects() {
  if (!isSupabaseConfigured) {
    console.log("Using mock data - Supabase not configured")
    return mockProjects.filter((p) => p.is_featured && p.is_public).slice(0, 6)
  }

  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("is_featured", true)
      .eq("is_public", true)
      .order("created_at", { ascending: false })
      .limit(6)

    if (error) {
      console.error("Error fetching featured projects:", error)
      return mockProjects.filter((p) => p.is_featured && p.is_public).slice(0, 6)
    }

    return data as Project[]
  } catch (error) {
    console.error("Error fetching featured projects:", error)
    return mockProjects.filter((p) => p.is_featured && p.is_public).slice(0, 6)
  }
}

export async function getProjectBySlug(slug: string) {
  if (!isSupabaseConfigured) {
    console.log("Using mock data - Supabase not configured")
    return mockProjects.find((p) => p.name.toLowerCase().replace(/\s+/g, "-") === slug && p.is_public) || null
  }

  try {
    const { data, error } = await supabase.from("projects").select("*").eq("slug", slug).eq("is_public", true).single()

    if (error) {
      console.error("Error fetching project:", error)
      return null
    }

    return data as Project
  } catch (error) {
    console.error("Error fetching project:", error)
    return null
  }
}

export async function createProject(project: Omit<Project, "id" | "created_at" | "updated_at">) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase not configured")
  }

  const { start_date, end_date, ...rest } = project

  const { data, error } = await supabase
    .from("projects")
    .insert([{
      ...rest,
      start_date: start_date === "" ? null : start_date,
      end_date: end_date === "" ? null : end_date,
    }])
    .select()
    .single()

  if (error) {
    throw error
  }

  return data as Project
}


export async function updateProject(id: string, updates: Partial<Project>) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase not configured")
  }

  const { start_date, end_date, ...rest } = updates

  const { data, error } = await supabase
    .from("projects")
    .update({
      ...rest,
      start_date: start_date === "" ? null : start_date,
      end_date: end_date === "" ? null : end_date,
    })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data as Project
}


export async function deleteProject(id: string) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase not configured")
  }

  const { error } = await supabase.from("projects").delete().eq("id", id)

  if (error) {
    throw error
  }
}

// Team Members
export async function getTeamMembers() {
  if (!isSupabaseConfigured) {
    console.log("Using mock data - Supabase not configured")
    return []
  }

  try {
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true })

    if (error) {
      console.error("Error fetching team members:", error)
      return []
    }

    return data as TeamMember[]
  } catch (error) {
    console.error("Error fetching team members:", error)
    return []
  }
}

export async function createTeamMember(member: Omit<TeamMember, "id">) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase not configured")
  }

  const { data, error } = await supabase.from("team_members").insert([member]).select().single()

  if (error) {
    throw error
  }

  return data as TeamMember
}

export async function updateTeamMember(id: string, updates: Partial<TeamMember>) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase not configured")
  }

  const { data, error } = await supabase.from("team_members").update(updates).eq("id", id).select().single()

  if (error) {
    throw error
  }

  return data as TeamMember
}

export async function deleteTeamMember(id: string) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase not configured")
  }

  const { error } = await supabase.from("team_members").delete().eq("id", id)

  if (error) {
    throw error
  }
}

// Services
export async function getServices() {
  if (!isSupabaseConfigured) {
    console.log("Using mock data - Supabase not configured")
    return []
  }

  try {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true })

    if (error) {
      console.error("Error fetching services:", error)
      return []
    }

    return data as Service[]
  } catch (error) {
    console.error("Error fetching services:", error)
    return []
  }
}

export async function createService(service: Omit<Service, "id">) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase not configured")
  }

  const { data, error } = await supabase.from("services").insert([service]).select().single()

  if (error) {
    throw error
  }

  return data as Service
}

export async function updateService(id: string, updates: Partial<Service>) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase not configured")
  }

  const { data, error } = await supabase.from("services").update(updates).eq("id", id).select().single()

  if (error) {
    throw error
  }

  return data as Service
}

export async function deleteService(id: string) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase not configured")
  }

  const { error } = await supabase.from("services").delete().eq("id", id)

  if (error) {
    throw error
  }
}

// Contact Submissions
export async function createContactSubmission(
  submission: Omit<ContactSubmission, "id" | "status" | "created_at" | "admin_notes">,
) {
  if (!isSupabaseConfigured) {
    // For demo purposes, just return a mock response
    console.log("Demo contact form submission:", submission)
    return {
      id: "mock-" + Date.now(),
      ...submission,
      status: "new" as const,
      created_at: new Date().toISOString(),
    } as ContactSubmission
  }

  try {
    const { data, error } = await supabase
      .from("contact_submissions")
      .insert([{ ...submission, status: "new" }])
      .select()
      .single()

    if (error) {
      throw error
    }

    return data as ContactSubmission
  } catch (error) {
    console.error("Error creating contact submission:", error)
    throw error
  }
}

export async function getContactSubmissions() {
  if (!isSupabaseConfigured) {
    console.log("Using mock data - Supabase not configured")
    return []
  }

  try {
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching contact submissions:", error)
      return []
    }

    return data as ContactSubmission[]
  } catch (error) {
    console.error("Error fetching contact submissions:", error)
    return []
  }
}

export async function updateContactSubmission(id: string, updates: Partial<ContactSubmission>) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase not configured")
  }

  const { data, error } = await supabase.from("contact_submissions").update(updates).eq("id", id).select().single()

  if (error) {
    throw error
  }

  return data as ContactSubmission
}

// Company Stats
export async function getCompanyStats() {
  try {
    const { data, error } = await supabase.from('company_stats').select('id, stat_name, stat_value, stat_label');
    if (error) throw error;
    console.log('Fetched stats:', data); 
    return data || [];
  } catch (error) {
    console.error('Error fetching stats:', error);
    return [];
  }
}

export async function updateCompanyStat(statName: string, statValue: string) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase not configured")
  }

  const { data, error } = await supabase
    .from("company_stats")
    .update({ stat_value: statValue })
    .eq("stat_name", statName)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data as CompanyStat
}

// Blog Posts
export async function getBlogPosts(isPublished = true) {
  if (!isSupabaseConfigured) {
    console.log("Using mock data - Supabase not configured")
    return isPublished ? mockBlogPosts.filter((p) => p.is_published) : mockBlogPosts
  }

  try {
    let query = supabase.from("blog_posts").select("*").order("published_date", { ascending: false })

    if (isPublished) {
      query = query.eq("is_published", true)
    }

    const { data, error } = await query

    if (error) {
      console.error("Error fetching blog posts:", error)
      return mockBlogPosts
    }

    return data as BlogPost[]
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return mockBlogPosts
  }
}

export async function getBlogPostBySlug(slug: string) {
  if (!isSupabaseConfigured) {
    console.log("Using mock data - Supabase not configured")
    return mockBlogPosts.find((p) => p.slug === slug && p.is_published) || null
  }

  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single()

    if (error) {
      console.error("Error fetching blog post:", error)
      return null
    }

    return data as BlogPost
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return null
  }
}

export async function createBlogPost(post: Omit<BlogPost, "id" | "created_at" | "updated_at">) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase not configured")
  }

  const { data, error } = await supabase.from("blog_posts").insert([post]).select().single()

  if (error) {
    throw error
  }

  return data as BlogPost
}

export async function updateBlogPost(id: string, updates: Partial<BlogPost>) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase not configured")
  }

  const { data, error } = await supabase.from("blog_posts").update(updates).eq("id", id).select().single()

  if (error) {
    throw error
  }

  return data as BlogPost
}

export async function deleteBlogPost(id: string) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase not configured")
  }

  const { error } = await supabase.from("blog_posts").delete().eq("id", id)

  if (error) {
    throw error
  }
}
