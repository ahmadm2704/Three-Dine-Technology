import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, User, DollarSign } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getProjects } from "@/lib/database";

// Define the Project interface based on the expected data structure
interface Project {
  id: string;
  name: string;
  image_url: string;
  status: string;
  project_type: string;
  client_name: string;
  description: string;
  start_date?: Date;
  budget?: number;
  technologies: string[];
  completion_percentage: number;
}

export const revalidate = 10; // Revalidate every 10 seconds

export default async function PortfolioPage() {
  const projects: Project[] = await getProjects(); // Removed 'true' argument to match function signature
  console.log('Projects:', projects); // ✅ Debug log

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="border-blue-500 text-blue-400 bg-blue-500/10 mb-4">
              Our Portfolio
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Our <span className="text-blue-400">Success</span> Stories
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our portfolio of successful projects that showcase our expertise in delivering innovative digital
              solutions across various industries.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 bg-gray-900/50">
        <div className="container mx-auto px-4">
          {projects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project: Project) => (
                <Card
                  key={project.id}
                  className="bg-gray-800/50 border-gray-700 hover:border-blue-500/50 transition-all duration-300 group overflow-hidden"
                >
                  <CardContent className="p-0">
                    {/* <div className="relative overflow-hidden">
                      <Image
                        src={project.image_url || "/placeholder.svg"}
                        alt={project.name}
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge
                          className={`${
                            project.status === "completed"
                              ? "bg-green-600"
                              : project.status === "in_progress"
                              ? "bg-blue-600"
                              : "bg-yellow-600"
                          } text-white`}
                        >
                          {project.status.replace("_", " ").toUpperCase()}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <Badge variant="outline" className="border-gray-600 text-gray-300 bg-black/50">
                          {project.project_type}
                        </Badge>
                      </div>
                    </div> */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
                      <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                        <User className="h-4 w-4" />
                        <span>{project.client_name}</span>
                      </div>
                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">{project.description}</p>
                      <div className="space-y-2 mb-4">
                        {project.start_date && (
                          <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <Calendar className="h-4 w-4" />
                            <span>Started: {new Date(project.start_date).toLocaleDateString()}</span>
                          </div>
                        )}
                        {project.budget && (
                          <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <DollarSign className="h-4 w-4" />
                            <span>Budget: ${project.budget.toLocaleString()}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies?.slice(0, 3).map((tech: string, index: number) => (
                          <Badge key={index} variant="outline" className="border-gray-600 text-gray-300 text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies?.length > 3 && (
                          <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                            +{project.technologies.length - 3} more
                          </Badge>
                        )}
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-400 mb-1">
                          <span>Progress</span>
                          <span>{project.completion_percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.completion_percentage}%` }}
                          ></div>
                        </div>
                      </div>

                      <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300 w-full">
                        View Case Study <ExternalLink className="ml-2 h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-white mb-4">No Projects Available</h3>
              <p className="text-gray-400">Check back soon for our latest work!</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600/10 to-purple-600/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Ready to Start Your <span className="text-blue-400">Project?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss your requirements and create a solution that drives your business forward.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/contact">Get Free Consultation</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
            >
              <Link href="/services">View Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}