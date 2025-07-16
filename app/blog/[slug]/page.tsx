import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getBlogPostBySlug } from "@/lib/database"
import { notFound } from "next/navigation"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="py-24 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>

            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="border-blue-500 text-blue-400 bg-blue-500/10">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold mb-6">{post.title}</h1>

            <div className="flex items-center gap-6 text-gray-400 mb-8">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{new Date(post.published_date).toLocaleDateString()}</span>
              </div>
            </div>

            {post.excerpt && <p className="text-xl text-gray-300 leading-relaxed">{post.excerpt}</p>}
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.featured_image && (
        <section className="py-12 bg-gray-900/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Image
                src={post.featured_image || "/placeholder.svg"}
                alt={post.title}
                width={800}
                height={400}
                className="w-full h-96 object-cover rounded-lg border border-gray-700"
              />
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-12 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-invert prose-lg max-w-none">
              <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">{post.content}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-blue-600/10 to-purple-600/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Transform Your <span className="text-blue-400">Business?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and create something amazing together.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/contact">Get Started Today</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
