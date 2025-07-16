"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FolderOpen,
  Mail,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  LogOut,
  BarChart3,
  Globe,
  Smartphone,
  Info,
} from "lucide-react"
import Link from "next/link"

// Mock data for demo
const mockProjects = [
  {
    id: "1",
    name: "E-commerce Platform",
    client_name: "TechCorp Inc.",
    status: "in_progress",
    project_type: "Web Development",
    budget: 25000,
    completion_percentage: 75,
    technologies: ["React", "Node.js", "PostgreSQL"],
    is_featured: true,
    is_public: true,
  },
  {
    id: "2",
    name: "Mobile Banking App",
    client_name: "FinanceFirst",
    status: "completed",
    project_type: "Mobile App",
    budget: 45000,
    completion_percentage: 100,
    technologies: ["React Native", "Node.js", "MongoDB"],
    is_featured: true,
    is_public: true,
  },
  {
    id: "3",
    name: "Inventory Management System",
    client_name: "RetailMax",
    status: "in_progress",
    project_type: "Custom Software",
    budget: 35000,
    completion_percentage: 60,
    technologies: ["Python", "Django", "PostgreSQL"],
    is_featured: true,
    is_public: true,
  },
]

const mockContacts = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    company: "Example Corp",
    service: "Web Development",
    status: "new",
    created_at: "2024-01-15T00:00:00Z",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@startup.com",
    company: "Startup Inc",
    service: "Mobile App",
    status: "in_progress",
    created_at: "2024-01-14T00:00:00Z",
  },
]

export default function DemoAdminDashboard() {
  const [projects, setProjects] = useState(mockProjects)
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<any>(null)

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

  const handleDeleteProject = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter((p) => p.id !== id))
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Dashboard (Demo Mode)</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-blue-600/20 border border-blue-600/30 text-blue-400 px-3 py-1 rounded-lg">
              <Info className="h-4 w-4" />
              <span className="text-sm">Demo Mode</span>
            </div>
            <Button variant="outline" className="border-gray-600 text-gray-300 bg-transparent">
              <Link href="/">
                <LogOut className="h-4 w-4 mr-2" />
                Back to Site
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        {/* Demo Notice */}
        <Card className="bg-blue-600/10 border-blue-600/30 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Info className="h-6 w-6 text-blue-400" />
              <div>
                <h3 className="text-blue-400 font-semibold">Demo Mode Active</h3>
                <p className="text-gray-300">
                  This is a demonstration of the admin dashboard. To enable full functionality, configure Supabase
                  integration.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

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
                  <p className="text-gray-400 text-sm">Completed</p>
                  <p className="text-2xl font-bold text-white">
                    {projects.filter((p) => p.status === "completed").length}
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">New Contacts</p>
                  <p className="text-2xl font-bold text-white">
                    {mockContacts.filter((c) => c.status === "new").length}
                  </p>
                </div>
                <Mail className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Section */}
        <Card className="bg-gray-900 border-gray-700 mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Client Projects (Demo)</CardTitle>
              <Button className="bg-blue-600 hover:bg-blue-700" disabled>
                <Plus className="h-4 w-4 mr-2" />
                Add Project (Demo)
              </Button>
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
                          {project.is_featured && <Badge className="bg-yellow-600 text-white text-xs">Featured</Badge>}
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
                          <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300" disabled>
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

        {/* Contact Submissions */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Contact Submissions (Demo)</CardTitle>
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
                  </tr>
                </thead>
                <tbody>
                  {mockContacts.map((contact) => (
                    <tr key={contact.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                      <td className="py-3 px-4 text-white">{contact.name}</td>
                      <td className="py-3 px-4 text-gray-300">{contact.email}</td>
                      <td className="py-3 px-4 text-gray-300">{contact.company || "N/A"}</td>
                      <td className="py-3 px-4 text-gray-300">{contact.service || "General"}</td>
                      <td className="py-3 px-4">
                        <Badge
                          className={`${
                            contact.status === "new"
                              ? "bg-blue-600"
                              : contact.status === "in_progress"
                                ? "bg-yellow-600"
                                : contact.status === "responded"
                                  ? "bg-green-600"
                                  : "bg-gray-600"
                          } text-white`}
                        >
                          {contact.status.replace("_", " ").toUpperCase()}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-300">{new Date(contact.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
