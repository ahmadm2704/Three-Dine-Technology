"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Linkedin, Twitter, Github, Mail } from "lucide-react"
import Image from "next/image"

interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  email?: string
  skills?: string[]
  image_url?: string
  linkedin_url?: string
  twitter_url?: string
  github_url?: string
  created_at?: string
}

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])

  useEffect(() => {
    fetch("/api/team/get")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const sorted = data.team.sort(
            (a: TeamMember, b: TeamMember) =>
              new Date(a.created_at!).getTime() - new Date(b.created_at!).getTime()
          )
          setTeamMembers(sorted)
        }
      })
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="border-blue-500 text-blue-400 bg-blue-500/10 mb-4">
              Meet Our Team
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              The Minds Behind <span className="text-blue-400">Innovation</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our diverse team of experts brings together years of experience, creativity, and passion to deliver
              exceptional results for our clients.
            </p>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-24 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center">
            {teamMembers.map((member) => (
              <Card
                key={member.id}
                className="bg-gradient-to-br from-gray-800 via-gray-900 to-black border border-gray-700 hover:border-blue-500/40 transition-all duration-300 group overflow-hidden rounded-3xl shadow-lg hover:shadow-blue-500/20 max-w-2xl w-full h-[340px]"
              >
                <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 h-full">
                  {/* Image */}
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-md shrink-0 border-2 border-gray-700 group-hover:border-blue-500 transition duration-300">
                    <Image
                      src={member.image_url || "/placeholder.svg"}
                      alt={member.name}
                      width={160}
                      height={160}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-center md:text-left space-y-3">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white">{member.name}</h3>
                      <p className="text-blue-400 font-medium text-sm md:text-base">{member.role}</p>
                    </div>

                    <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 md:line-clamp-4">
                      {member.bio}
                    </p>

                    <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-1">
                      {(member.skills || []).slice(0, 4).map((skill, i) => (
                        <Badge key={i} variant="outline" className="border-gray-600 text-gray-300 text-xs bg-gray-700/50 hover:bg-gray-600/50 transition">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex justify-center md:justify-start space-x-3 pt-2">
                      {member.linkedin_url && (
                        <Button size="sm" variant="ghost" className="p-2 h-auto text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-full">
                          <Linkedin className="h-4 w-4" />
                        </Button>
                      )}
                      {member.twitter_url && (
                        <Button size="sm" variant="ghost" className="p-2 h-auto text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-full">
                          <Twitter className="h-4 w-4" />
                        </Button>
                      )}
                      {member.github_url && (
                        <Button size="sm" variant="ghost" className="p-2 h-auto text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-full">
                          <Github className="h-4 w-4" />
                        </Button>
                      )}
                      {member.email && (
                        <Button size="sm" variant="ghost" className="p-2 h-auto text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-full">
                          <Mail className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Want to <span className="text-blue-400">Join</span> Our Team?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals who share our passion for innovation and excellence.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            View Open Positions
          </Button>
        </div>
      </section>
    </div>
  )
}
