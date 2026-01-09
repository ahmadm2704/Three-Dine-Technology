import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Award, Users, Lightbulb, Heart } from "lucide-react";
import Image from "next/image";
import { getCompanyStats } from "@/lib/database";

// Define the Stat interface based on the database schema
interface Stat {
  id: string;
  stat_name: string;
  stat_value: string;
  stat_label: string;
}

export const revalidate = 10; // Revalidate every 10 seconds

export default async function AboutPage() {
  const stats: Stat[] = await getCompanyStats();
  console.log('Stats from getCompanyStats:', stats); // Debug log to check fetched data

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="border-blue-500 text-blue-400 bg-blue-500/10 mb-4">
              About Three Dine Technology
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Innovating the <span className="text-blue-400">Future</span> of Technology
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We are a passionate team of technology enthusiasts dedicated to transforming businesses through innovative
              digital solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                Our <span className="text-blue-400">Story</span>
              </h2>
              <div className="space-y-6 text-gray-300">
                <p className="text-lg">
                  Founded with a vision to bridge the gap between innovative technology and business success, Three Dine
                  Technology has been at the forefront of digital transformation since our inception.
                </p>
                <p className="text-lg">
                  Our journey began with a simple belief: every business deserves access to cutting-edge technology
                  solutions that drive growth and efficiency. Today, we've helped over 25 clients across various
                  industries achieve their digital goals.
                </p>
                <p className="text-lg">
                  We combine technical expertise with creative thinking to deliver solutions that not only meet current
                  needs but also prepare our clients for future challenges.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-3xl opacity-20"></div>
              <Image
                src="/about.png"
                alt="Our Story"
                width={600}
                height={500}
                className="relative rounded-3xl border border-gray-800"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-blue-500/30">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Target className="h-8 w-8 text-blue-400 mr-3" />
                  <h3 className="text-2xl font-bold text-white">Our Mission</h3>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  To empower businesses with innovative technology solutions that drive growth, efficiency, and
                  competitive advantage in the digital age. We strive to be the trusted partner that transforms ideas
                  into reality.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-500/30">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Eye className="h-8 w-8 text-purple-400 mr-3" />
                  <h3 className="text-2xl font-bold text-white">Our Vision</h3>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  To be the leading technology partner that shapes the future of digital innovation, creating solutions
                  that make a meaningful impact on businesses and communities worldwide.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Our <span className="text-blue-400">Values</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Lightbulb className="h-8 w-8" />,
                title: "Innovation",
                description:
                  "We constantly push boundaries and embrace new technologies to deliver cutting-edge solutions.",
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Collaboration",
                description: "We believe in the power of teamwork and work closely with our clients as partners.",
              },
              {
                icon: <Award className="h-8 w-8" />,
                title: "Excellence",
                description: "We are committed to delivering the highest quality in everything we do.",
              },
              {
                icon: <Heart className="h-8 w-8" />,
                title: "Integrity",
                description: "We conduct business with honesty, transparency, and ethical practices.",
              },
              {
                icon: <Target className="h-8 w-8" />,
                title: "Results-Driven",
                description: "We focus on delivering measurable outcomes that drive business success.",
              },
              {
                icon: <Eye className="h-8 w-8" />,
                title: "Vision",
                description: "We think ahead and create solutions that prepare our clients for the future.",
              },
            ].map((value, index) => (
              <Card
                key={index}
                className="bg-gray-800/50 border-gray-700 hover:border-blue-500/50 transition-all duration-300 group"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Dynamic from Database */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.length > 0 ? (
              stats.map((stat: Stat) => (
                <div key={stat.id} className="text-center">
                  <div className="text-4xl lg:text-6xl font-bold text-blue-400 mb-2">{stat.stat_value}</div>
                  <div className="text-gray-300">{stat.stat_label}</div>
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <h3 className="text-2xl font-bold text-white mb-4">No Stats Available</h3>
                <p className="text-gray-400">Check back later for updated company statistics.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}