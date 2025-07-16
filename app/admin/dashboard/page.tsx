"use client"

import type React from "react"
import { useRef } from "react";

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FolderOpen,
  Mail,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  LogOut,
  Globe,
  Smartphone,
  Settings,
  Save,
  X,
  Users,
  FileText,
  MessageSquare,
  Info,
} from "lucide-react"
import {
  getProjects,
  getContactSubmissions,
  getCompanyStats,
  getTeamMembers,
  getServices,
  getBlogPosts,
  type Project,
  type ContactSubmission,
  type CompanyStat,
  type TeamMember,
  type Service,
  type BlogPost,
} from "@/lib/database"
import {
  adminSignOut,
  createProjectAction,
  updateProjectAction,
  deleteProjectAction,
  updateStatsAction,
  updateContactAction,
  verifyAdminAuth,
} from "@/app/actions/admin"
import { isSupabaseConfigured } from "@/lib/supabase"


export default function AdminDashboard() {
const router = useRouter()
const [isTeamDialogOpen, setIsTeamDialogOpen] = useState(false)
const [editingTeamMember, setEditingTeamMember] = useState<TeamMember | null>(null)
const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);
const [editingService, setEditingService] = useState<any | null>(null);


  const [projects, setProjects] = useState<Project[]>([])
  const [contacts, setContacts] = useState<ContactSubmission[]>([])
  const [stats, setStats] = useState<CompanyStat[]>([])
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false)
  const [isStatsDialogOpen, setIsStatsDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [editingContact, setEditingContact] = useState<ContactSubmission | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    checkAuth()
    loadData()
  }, [])

  const checkAuth = async () => {
    const auth = await verifyAdminAuth()
    if (!auth) {
      router.push("/admin/login")
    }
  }

  const loadData = async () => {
    try {
      const [projectsData, contactsData, statsData, teamData, servicesData, blogData] = await Promise.all([
        getProjects(),
        getContactSubmissions(),
        getCompanyStats(),
        getTeamMembers(),
        getServices(),
        getBlogPosts(false), // Get all blog posts including unpublished
      ])

      setProjects(projectsData)
      setContacts(contactsData)
      setStats(statsData)
      setTeamMembers(teamData)
      setServices(servicesData)
      setBlogPosts(blogData)
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await adminSignOut()
  }

  const projectFormRef = useRef<HTMLFormElement>(null);

const handleCreateProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget || projectFormRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const result = await createProjectAction(formData);

    if (result.success) {
      setIsProjectDialogOpen(false);
      loadData();
      form.reset();
    }

    setIsSubmitting(false);
  };

const handleUpdateProject = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!editingProject) return;

  setIsSubmitting(true);

  const form = e.currentTarget;
  const formData = new FormData(form);
  const result = await updateProjectAction(editingProject.id, formData);

  if (result.success) {
    setIsProjectDialogOpen(false);
    setEditingProject(null);
    loadData();
    form.reset(); // Safe reset with null check implicitly handled by form existence
  }

  setIsSubmitting(false);
};

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return

    const result = await deleteProjectAction(id)
    if (result.success) {
      loadData()
    }
  }

  const handleUpdateStats = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const result = await updateStatsAction(formData)

    if (result.success) {
      setIsStatsDialogOpen(false)
      loadData()
    }

    setIsSubmitting(false)
  }

  const handleUpdateContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingContact) return

    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const result = await updateContactAction(editingContact.id, formData)

    if (result.success) {
      setEditingContact(null)
      loadData()
    }

    setIsSubmitting(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-600"
      case "in_progress":
        return "bg-blue-600"
      case "on_hold":
        return "bg-yellow-600"
      case "planning":
        return "bg-purple-600"
      case "new":
        return "bg-blue-600"
      case "responded":
        return "bg-green-600"
      case "closed":
        return "bg-gray-600"
      default:
        return "bg-gray-600"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Web Development":
        return <Globe className="h-4 w-4" />
      case "Mobile App":
        return <Smartphone className="h-4 w-4" />
      default:
        return <FolderOpen className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    )
  }
const handleEdit = (member: TeamMember) => {
  setEditingTeamMember(member)
  setIsTeamDialogOpen(true)
}

const handleDelete = async (id: string) => {
  if (!confirm("Are you sure you want to delete this member?")) return

  const res = await fetch(`/api/team/delete`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  })

  const result = await res.json()
  if (result.success) {
    loadData()
  } else {
    alert(result.message)
  }
}

const loadServices = async () => {
  const res = await fetch("/api/services/get");
  const data = await res.json();
  if (data.success) {
    // Optional: sort by display_order
    const sorted = data.services.sort((a: any, b: any) => a.display_order - b.display_order);
    setServices(sorted);
  }
};

const handleSubmitServiceForm = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const form = e.currentTarget;
  const formData = new FormData(form);

  const payload = {
    id: editingService?.id,
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    features: formData.get("features")?.toString().split(",").map((f) => f.trim()),
    technologies: formData.get("technologies")?.toString().split(",").map((t) => t.trim()),
    icon: formData.get("icon"),
    image_url: formData.get("image_url"), // If handling image file, add upload logic here
  };

  const res = await fetch("/api/services/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();
  if (result.success) {
    setIsServiceDialogOpen(false);
    setEditingService(null);
    loadServices(); // make sure this function fetches updated data
  } else {
    alert(result.message || "Failed to save service");
  }
};


// const toBase64 = (file: File) =>
//   new Promise<string>((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result as string);
//     reader.onerror = reject;
//   });




  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            {!isSupabaseConfigured && (
              <div className="flex items-center gap-2 bg-blue-600/20 border border-blue-600/30 text-blue-400 px-3 py-1 rounded-lg">
                <Info className="h-4 w-4" />
                <span className="text-sm">Demo Mode</span>
              </div>
            )}
            <Dialog open={isStatsDialogOpen} onOpenChange={setIsStatsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-gray-600 text-gray-300 bg-transparent">
                  <Settings className="h-4 w-4 mr-2" />
                  Update Stats
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 border-gray-700 text-white">
                <DialogHeader>
                  <DialogTitle>Update Company Stats</DialogTitle>
                </DialogHeader>
                {!isSupabaseConfigured ? (
                  <div className="p-4 bg-blue-600/20 border border-blue-600/30 text-blue-400 rounded-lg">
                    <p>Demo mode - Changes won't be saved to database</p>
                  </div>
                ) : (
                  <form onSubmit={handleUpdateStats} className="space-y-4">
                    {stats.map((stat) => (
                      <div key={stat.id}>
                        <Label htmlFor={stat.stat_name} className="text-gray-300">
                          {stat.stat_label}
                        </Label>
                        <Input
                          id={stat.stat_name}
                          name={stat.stat_name}
                          defaultValue={stat.stat_value}
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                        <Save className="h-4 w-4 mr-2" />
                        {isSubmitting ? "Updating..." : "Update Stats"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsStatsDialogOpen(false)}
                        className="border-gray-600 text-gray-300 bg-transparent"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </form>
                )}
              </DialogContent>
            </Dialog>
            <Button onClick={handleLogout} variant="outline" className="border-gray-600 text-gray-300 bg-transparent">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        {/* Demo Mode Banner */}
        {!isSupabaseConfigured && (
          <Card className="bg-blue-600/10 border-blue-600/30 mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Info className="h-6 w-6 text-blue-400" />
                <div>
                  <h3 className="text-blue-400 font-semibold">Demo Mode Active</h3>
                  <p className="text-gray-300">
                    This is a demonstration of the admin dashboard. To enable full functionality, configure Supabase
                    integration by setting up your environment variables.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Projects</p>
                  <p className="text-2xl font-bold text-white">{projects.length}</p>
                </div>
                <FolderOpen className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Projects</p>
                  <p className="text-2xl font-bold text-white">
                    {projects.filter((p) => p.status === "in_progress").length}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Team Members</p>
                  <p className="text-2xl font-bold text-white">{teamMembers.length}</p>
                </div>
                <Users className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">New Contacts</p>
                  <p className="text-2xl font-bold text-white">{contacts.filter((c) => c.status === "new").length}</p>
                </div>
                <Mail className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="bg-gray-900 border-gray-700">
            <TabsTrigger value="projects" className="data-[state=active]:bg-blue-600">
              <FolderOpen className="h-4 w-4 mr-2" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="contacts" className="data-[state=active]:bg-blue-600">
              <MessageSquare className="h-4 w-4 mr-2" />
              Contacts
            </TabsTrigger>
            <TabsTrigger value="team" className="data-[state=active]:bg-blue-600">
              <Users className="h-4 w-4 mr-2" />
              Team
            </TabsTrigger>
            <TabsTrigger value="services" className="data-[state=active]:bg-blue-600">
              <Settings className="h-4 w-4 mr-2" />
              Services
            </TabsTrigger>
            <TabsTrigger value="blog" className="data-[state=active]:bg-blue-600">
              <FileText className="h-4 w-4 mr-2" />
              Blog
            </TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Client Projects</CardTitle>
                  <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setEditingProject(null)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Project
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{editingProject ? "Edit Project" : "Create New Project"}</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={editingProject ? handleUpdateProject : handleCreateProject} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="name" className="text-gray-300">
                              Project Name *
                            </Label>
                            <Input
                              id="name"
                              name="name"
                              defaultValue={editingProject?.name || ""}
                              className="bg-gray-800 border-gray-600 text-white"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="client_name" className="text-gray-300">
                              Client Name *
                            </Label>
                            <Input
                              id="client_name"
                              name="client_name"
                              defaultValue={editingProject?.client_name || ""}
                              className="bg-gray-800 border-gray-600 text-white"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="client_email" className="text-gray-300">
                              Client Email
                            </Label>
                            <Input
                              id="client_email"
                              name="client_email"
                              type="email"
                              defaultValue={editingProject?.client_email || ""}
                              className="bg-gray-800 border-gray-600 text-white"
                            />
                          </div>
                          <div>
                            <Label htmlFor="client_phone" className="text-gray-300">
                              Client Phone
                            </Label>
                            <Input
                              id="client_phone"
                              name="client_phone"
                              defaultValue={editingProject?.client_phone || ""}
                              className="bg-gray-800 border-gray-600 text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="description" className="text-gray-300">
                            Description
                          </Label>
                          <Textarea
                            id="description"
                            name="description"
                            defaultValue={editingProject?.description || ""}
                            className="bg-gray-800 border-gray-600 text-white"
                            rows={3}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="status" className="text-gray-300">
                              Status *
                            </Label>
                            <select
                              id="status"
                              name="status"
                              defaultValue={editingProject?.status || "planning"}
                              className="w-full bg-gray-800 border border-gray-600 text-white rounded-md px-3 py-2"
                              required
                            >
                              <option value="planning">Planning</option>
                              <option value="in_progress">In Progress</option>
                              <option value="completed">Completed</option>
                              <option value="on_hold">On Hold</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </div>
                          <div>
                            <Label htmlFor="project_type" className="text-gray-300">
                              Project Type *
                            </Label>
                            <Input
                              id="project_type"
                              name="project_type"
                              defaultValue={editingProject?.project_type || ""}
                              className="bg-gray-800 border-gray-600 text-white"
                              placeholder="e.g., Web Development"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="budget" className="text-gray-300">
                              Budget ($)
                            </Label>
                            <Input
                              id="budget"
                              name="budget"
                              type="number"
                              defaultValue={editingProject?.budget || ""}
                              className="bg-gray-800 border-gray-600 text-white"
                            />
                          </div>
                          <div>
                            <Label htmlFor="start_date" className="text-gray-300">
                              Start Date
                            </Label>
                            <Input
                              id="start_date"
                              name="start_date"
                              type="date"
                              defaultValue={editingProject?.start_date || ""}
                              className="bg-gray-800 border-gray-600 text-white"
                            />
                          </div>
                          <div>
                            <Label htmlFor="completion_percentage" className="text-gray-300">
                              Progress (%)
                            </Label>
                            <Input
                              id="completion_percentage"
                              name="completion_percentage"
                              type="number"
                              min="0"
                              max="100"
                              defaultValue={editingProject?.completion_percentage || 0}
                              className="bg-gray-800 border-gray-600 text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="technologies" className="text-gray-300">
                            Technologies (JSON array)
                          </Label>
                          <Textarea
                            id="technologies"
                            name="technologies"
                            defaultValue={JSON.stringify(editingProject?.technologies || [])}
                            className="bg-gray-800 border-gray-600 text-white"
                            placeholder='["React", "Node.js", "PostgreSQL"]'
                            rows={2}
                          />
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="is_featured"
                              name="is_featured"
                              defaultChecked={editingProject?.is_featured || false}
                              className="rounded border-gray-600 bg-gray-800"
                            />
                            <Label htmlFor="is_featured" className="text-gray-300">
                              Featured Project
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="is_public"
                              name="is_public"
                              defaultChecked={editingProject?.is_public || false}
                              className="rounded border-gray-600 bg-gray-800"
                            />
                            <Label htmlFor="is_public" className="text-gray-300">
                              Show Publicly
                            </Label>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                            <Save className="h-4 w-4 mr-2" />
                            {isSubmitting ? "Saving..." : editingProject ? "Update Project" : "Create Project"}
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setIsProjectDialogOpen(false)
                              setEditingProject(null)
                            }}
                            className="border-gray-600 text-gray-300 bg-transparent"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-3 px-4 text-gray-300">Project</th>
                        <th className="text-left py-3 px-4 text-gray-300">Client</th>
                        <th className="text-left py-3 px-4 text-gray-300">Type</th>
                        <th className="text-left py-3 px-4 text-gray-300">Status</th>
                        <th className="text-left py-3 px-4 text-gray-300">Progress</th>
                        <th className="text-left py-3 px-4 text-gray-300">Budget</th>
                        <th className="text-left py-3 px-4 text-gray-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((project) => (
                        <tr key={project.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                          <td className="py-3 px-4">
                            <div className="font-medium text-white">{project.name}</div>
                            <div className="flex gap-2 mt-1">
                              {project.is_featured && (
                                <Badge className="bg-yellow-600 text-white text-xs">Featured</Badge>
                              )}
                              {project.is_public && <Badge className="bg-green-600 text-white text-xs">Public</Badge>}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-300">{project.client_name}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2 text-gray-300">
                              {getTypeIcon(project.project_type)}
                              {project.project_type}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={`${getStatusColor(project.status)} text-white`}>
                              {project.status.replace("_", " ").toUpperCase()}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-gray-700 rounded-full h-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full"
                                  style={{ width: `${project.completion_percentage}%` }}
                                ></div>
                              </div>
                              <span className="text-gray-300 text-sm">{project.completion_percentage}%</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-300">
                            {project.budget ? `$${project.budget.toLocaleString()}` : "N/A"}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-blue-400 hover:text-blue-300"
                                onClick={() => {
                                  setEditingProject(project)
                                  setIsProjectDialogOpen(true)
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-red-400 hover:text-red-300"
                                onClick={() => handleDeleteProject(project.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Contact Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-3 px-4 text-gray-300">Name</th>
                        <th className="text-left py-3 px-4 text-gray-300">Email</th>
                        <th className="text-left py-3 px-4 text-gray-300">Company</th>
                        <th className="text-left py-3 px-4 text-gray-300">Service</th>
                        <th className="text-left py-3 px-4 text-gray-300">Status</th>
                        <th className="text-left py-3 px-4 text-gray-300">Date</th>
                        <th className="text-left py-3 px-4 text-gray-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.map((contact) => (
                        <tr key={contact.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                          <td className="py-3 px-4 text-white">{contact.name}</td>
                          <td className="py-3 px-4 text-gray-300">{contact.email}</td>
                          <td className="py-3 px-4 text-gray-300">{contact.company || "N/A"}</td>
                          <td className="py-3 px-4 text-gray-300">{contact.service || "General"}</td>
                          <td className="py-3 px-4">
                            <Badge className={`${getStatusColor(contact.status)} text-white`}>
                              {contact.status.replace("_", " ").toUpperCase()}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-gray-300">
                            {new Date(contact.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-blue-400 hover:text-blue-300"
                                  onClick={() => setEditingContact(contact)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-gray-900 border-gray-700 text-white">
                                <DialogHeader>
                                  <DialogTitle>Update Contact</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleUpdateContact} className="space-y-4">
                                  <div>
                                    <Label className="text-gray-300">Message</Label>
                                    <Textarea
                                      value={contact.message}
                                      readOnly
                                      className="bg-gray-800 border-gray-600 text-white"
                                      rows={3}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="status" className="text-gray-300">
                                      Status
                                    </Label>
                                    <select
                                      id="status"
                                      name="status"
                                      defaultValue={contact.status}
                                      className="w-full bg-gray-800 border border-gray-600 text-white rounded-md px-3 py-2"
                                    >
                                      <option value="new">New</option>
                                      <option value="in_progress">In Progress</option>
                                      <option value="responded">Responded</option>
                                      <option value="closed">Closed</option>
                                    </select>
                                  </div>
                                  <div>
                                    <Label htmlFor="admin_notes" className="text-gray-300">
                                      Admin Notes
                                    </Label>
                                    <Textarea
                                      id="admin_notes"
                                      name="admin_notes"
                                      defaultValue={contact.admin_notes || ""}
                                      className="bg-gray-800 border-gray-600 text-white"
                                      rows={3}
                                    />
                                  </div>
                                  <Button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700"
                                    disabled={isSubmitting}
                                  >
                                    {isSubmitting ? "Updating..." : "Update Contact"}
                                  </Button>
                                </form>
                              </DialogContent>
                            </Dialog>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Team Members</CardTitle>
                  <Button
  className="bg-blue-600 hover:bg-blue-700"
  onClick={() => {
    setEditingTeamMember(null)
    setIsTeamDialogOpen(true)
  }}
>
  <Plus className="h-4 w-4 mr-2" />
  Add Member
</Button>

                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {teamMembers.map((member) => (
                    <Card key={member.id} className="bg-gray-800/50 border-gray-700">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto mb-4"></div>
                          <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                          <p className="text-blue-400 mb-2">{member.role}</p>
                          <p className="text-gray-300 text-sm mb-4">{member.bio}</p>
                          <div className="flex flex-wrap gap-1 justify-center">
                            {member.skills.slice(0, 3).map((skill, index) => (
                              <Badge key={index} variant="outline" className="border-gray-600 text-gray-300 text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-end space-x-2 pt-4">
        <Button
          size="sm"
          variant="outline"
          className="text-blue-400 border-blue-500 hover:bg-blue-600 hover:text-white"
          onClick={() => handleEdit(member)}
        >
          Edit
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => handleDelete(member.id)}
        >
          Delete
        </Button>
      </div>



                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

<Dialog open={isTeamDialogOpen} onOpenChange={setIsTeamDialogOpen}>
  <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-lg">
    <DialogHeader>
      <DialogTitle>{editingTeamMember ? "Edit Team Member" : "Add Team Member"}</DialogTitle>
    </DialogHeader>
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        const file = formData.get("image") as File;

        const payload: any = {
          id: editingTeamMember?.id,
          name: formData.get("name"),
          role: formData.get("role"),
          bio: formData.get("bio"),
          skills: formData.get("skills")
            ?.toString()
            .split(",")
            .map((s) => s.trim()),
        };

        // Upload image if selected
        if (file && file.size > 0) {
          const uploadForm = new FormData();
          uploadForm.append("file", file);

          const uploadRes = await fetch("/api/team/upload", {
            method: "POST",
            body: uploadForm,
          });

          const uploadResult = await uploadRes.json();
          if (uploadResult.success) {
            payload.image_url = uploadResult.imageUrl;
          } else {
            alert("Image upload failed: " + uploadResult.message);
            return;
          }
        }

        // Send to backend
        const res = await fetch("/api/team/create", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await res.json();
        if (result.success) {
          setIsTeamDialogOpen(false);
          setEditingTeamMember(null);
          loadData();
        } else {
          alert(result.message);
        }
      }}
      className="space-y-4"
    >
      <div>
        <Label htmlFor="name" className="text-gray-300">Name *</Label>
        <Input
          id="name"
          name="name"
          required
          defaultValue={editingTeamMember?.name || ""}
        />
      </div>
      <div>
        <Label htmlFor="role" className="text-gray-300">Role *</Label>
        <Input
          id="role"
          name="role"
          required
          defaultValue={editingTeamMember?.role || ""}
        />
      </div>
      <div>
        <Label htmlFor="bio" className="text-gray-300">Bio *</Label>
        <Textarea
          id="bio"
          name="bio"
          rows={3}
          required
          defaultValue={editingTeamMember?.bio || ""}
        />
      </div>
      <div>
        <Label htmlFor="skills" className="text-gray-300">Skills (comma-separated)</Label>
        <Input
          id="skills"
          name="skills"
          defaultValue={editingTeamMember?.skills?.join(", ") || ""}
        />
      </div>
      <div>
        <Label htmlFor="image" className="text-gray-300">Profile Picture</Label>
        <Input
          id="image"
          name="image"
          type="file"
          accept="image/*"
        />
      </div>
      <div className="flex gap-2 pt-4">
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          {editingTeamMember ? "Update Member" : "Add Member"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="border-gray-600 text-gray-300"
          onClick={() => {
            setIsTeamDialogOpen(false);
            setEditingTeamMember(null);
          }}
        >
          Cancel
        </Button>
      </div>
    </form>
  </DialogContent>
</Dialog>





          {/* Services Tab */}
          <TabsContent value="services">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Services</CardTitle>
                  <Button
  className="bg-blue-600 hover:bg-blue-700"
  onClick={() => {
    setEditingService(null); // for fresh form
    setIsServiceDialogOpen(true);
  }}
>
  <Plus className="h-4 w-4 mr-2" />
  Add Service
</Button>

                </div>
              </CardHeader>
<CardContent>
  <div className="grid md:grid-cols-2 gap-6">
    {services.map((service) => (
      <Card key={service.id} className="bg-gray-800/50 border-gray-700">
        <CardContent className="p-6 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
            <p className="text-gray-300 text-sm mb-4">{service.description}</p>
            <div className="flex flex-wrap gap-2">
              {service.technologies?.slice(0, 4).map((tech: string, index: number) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="border-gray-600 text-gray-300 text-xs"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Edit & Delete Buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="text-white border-gray-600 hover:border-blue-500"
              onClick={() => {
                setEditingService(service);
                setIsServiceDialogOpen(true);
              }}
            >
              Edit
            </Button>

            <Button
              variant="destructive"
              onClick={async () => {
                const confirmed = confirm("Are you sure you want to delete this service?");
                if (!confirmed) return;

                const res = await fetch("/api/services/delete", {
                  method: "POST",
                  body: JSON.stringify({ id: service.id }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                });

                const result = await res.json();
                if (result.success) {
                  loadServices(); // Refresh the list
                } else {
                  alert(result.message);
                }
              }}
            >
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
</CardContent>

            </Card>
          </TabsContent>

<Dialog open={isServiceDialogOpen} onOpenChange={setIsServiceDialogOpen}>
  <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-lg">
    <DialogHeader>
      <DialogTitle>{editingService ? "Edit Service" : "Add Service"}</DialogTitle>
    </DialogHeader>

    <form
      onSubmit={handleSubmitServiceForm}
      className="space-y-4"
    >
      {/* Title */}
      <input
        type="text"
        name="title"
        placeholder="Title"
        defaultValue={editingService?.title || ""}
        className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded"
        required
      />

      {/* Slug */}
      <input
        type="text"
        name="slug"
        placeholder="Slug (unique identifier)"
        defaultValue={editingService?.slug || ""}
        className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded"
        required
      />

      {/* Icon */}
      <input
        type="text"
        name="icon"
        placeholder="Icon (e.g., 'code', 'cloud', 'server')"
        defaultValue={editingService?.icon || ""}
        className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded"
      />

      {/* Description */}
      <textarea
        name="description"
        placeholder="Description"
        defaultValue={editingService?.description || ""}
        className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded"
        rows={4}
        required
      />

      {/* Features */}
      <input
        type="text"
        name="features"
        placeholder="Features (comma-separated)"
        defaultValue={editingService?.features?.join(", ") || ""}
        className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded"
      />

      {/* Technologies */}
      <input
        type="text"
        name="technologies"
        placeholder="Technologies (comma-separated)"
        defaultValue={editingService?.technologies?.join(", ") || ""}
        className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded"
      />

      {/* Image URL (static or pre-uploaded) */}
      <input
        type="text"
        name="image_url"
        placeholder="Image URL (e.g., /backend.jpg or https://...)"
        defaultValue={editingService?.image_url || ""}
        className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded"
      />

      <Button type="submit" className="bg-blue-600 hover:bg-blue-700 w-full">
        {editingService ? "Update Service" : "Add Service"}
      </Button>
    </form>
  </DialogContent>
</Dialog>



          {/* Blog Tab */}
          <TabsContent value="blog">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Blog Posts</CardTitle>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Post
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-3 px-4 text-gray-300">Title</th>
                        <th className="text-left py-3 px-4 text-gray-300">Author</th>
                        <th className="text-left py-3 px-4 text-gray-300">Status</th>
                        <th className="text-left py-3 px-4 text-gray-300">Published</th>
                        <th className="text-left py-3 px-4 text-gray-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogPosts.map((post) => (
                        <tr key={post.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                          <td className="py-3 px-4 text-white">{post.title}</td>
                          <td className="py-3 px-4 text-gray-300">{post.author}</td>
                          <td className="py-3 px-4">
                            <Badge className={post.is_published ? "bg-green-600" : "bg-gray-600"}>
                              {post.is_published ? "Published" : "Draft"}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-gray-300">
                            {new Date(post.published_date).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
