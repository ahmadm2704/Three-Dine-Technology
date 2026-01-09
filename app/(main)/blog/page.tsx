import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, User, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getBlogPosts } from "@/lib/database"

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="border-blue-500 text-blue-400 bg-blue-500/10 mb-4">
              Our Blog
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Latest <span className="text-blue-400">Insights</span> & Updates
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Stay updated with the latest trends, technologies, and insights from our team of experts.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-24 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="bg-gray-800/50 border-gray-700 hover:border-blue-500/50 transition-all duration-300 group overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <Image
                      src={post.featured_image || "/placeholder.svg?height=200&width=400"}
                      alt={post.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="outline" className="border-gray-600 text-gray-300 text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">{post.title}</h3>

                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">{post.excerpt}</p>

                    <div className="flex items-center justify-between text-gray-400 text-sm mb-4">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.published_date).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-white mb-4">No Blog Posts Available</h3>
              <p className="text-gray-400">Check back soon for our latest insights!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
