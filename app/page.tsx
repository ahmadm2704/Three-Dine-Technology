import ProfessionalBackground from "@/components/ui/professional-background";
import ProfessionalCard from "@/components/ui/professional-card";
import { ArrowRight, Code, Zap, Users, Star, Sparkles } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const features = [
    {
      icon: Code,
      title: "Custom Development",
      description: "Tailored solutions built with cutting-edge technologies to meet your unique business needs.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance and blazing-fast load times for exceptional user experiences.",
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Seasoned professionals with years of experience in modern web technologies.",
    },
  ];

  const stats = [
    { number: "100+", label: "Projects Completed" },
    { number: "50+", label: "Happy Clients" },
    { number: "5+", label: "Years Experience" },
    { number: "24/7", label: "Support Available" },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart",
      content: "ThreeDine Tech transformed our vision into reality. Their expertise and dedication are unmatched.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "CTO, InnovateCorp",
      content: "Outstanding work quality and professional service. They delivered beyond our expectations.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Founder, DigitalFlow",
      content: "The team's technical skills and creative approach helped us achieve remarkable results.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ProfessionalBackground variant="aurora" className="min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-16">
            {/* Text Content */}
            <div className="flex-1 text-center md:text-left space-y-8">
              <div className="inline-flex items-center space-x-2 bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-full px-6 py-3">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span className="text-slate-300 font-medium">Welcome to the Future of Development</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="block text-white mb-4">Transform Your</span>
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Digital Vision
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-300 max-w-3xl leading-relaxed">
                We craft exceptional digital experiences with cutting-edge technology, innovative design, and unparalleled expertise.
              </p>

              <div className="flex flex-col sm:flex-row items-center sm:justify-start space-y-4 sm:space-y-0 sm:space-x-6 pt-4">
                <Link
                  href="/contact"
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>Start Your Project</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>

                <Link
                  href="/portfolio"
                  className="px-8 py-4 border-2 border-slate-600 text-slate-300 font-semibold rounded-xl hover:border-slate-500 hover:text-white transition-all duration-300 transform hover:scale-105"
                >
                  View Our Work
                </Link>
              </div>
            </div>

            {/* Image Side */}
            <div className="flex-1 mt-12 md:mt-0 flex justify-center">
                      <img
                     src="/home-hero.png" // ✅ Replace with your image
                 alt="Hero"
                    className="w-full max-w-xl h-[400px] object-cover rounded-xl shadow-lg"                    />
                      </div>

          </div>
        </div>
      </ProfessionalBackground>

      {/* Features Section */}
      <ProfessionalBackground variant="minimal" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose <span className="gradient-text">ThreeDine Tech</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              We combine technical excellence with creative innovation to deliver solutions that drive results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <ProfessionalCard key={index} variant="glass" className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/25">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                </ProfessionalCard>
              );
            })}
          </div>
        </div>
      </ProfessionalBackground>

      {/* Stats Section */}
      <ProfessionalBackground variant="particles" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-slate-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </ProfessionalBackground>

      {/* Testimonials Section */}
      <ProfessionalBackground variant="grid" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              What Our <span className="gradient-text">Clients Say</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our clients have to say about working with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <ProfessionalCard key={index} variant="glow" className="p-8">
                <div className="flex items-center mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-slate-400 text-sm">{testimonial.role}</div>
                </div>
              </ProfessionalCard>
            ))}
          </div>
        </div>
      </ProfessionalBackground>

      {/* CTA Section */}
      <ProfessionalBackground variant="aurora" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to <span className="gradient-text">Get Started</span>?
          </h2>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Let's discuss your project and bring your vision to life with our expertise and innovation.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105"
          >
            <span>Contact Us Today</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </ProfessionalBackground>
    </div>
  );
}
