import ProfessionalBackground from "@/components/ui/professional-background";
import ProfessionalCard from "@/components/ui/professional-card";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { CheckCircle, ArrowRight, Star, Sparkles } from "lucide-react";
import Link from "next/link";
import * as LucideIcons from "lucide-react";

export default async function ServicesPage() {
  const supabase = createServerComponentClient({ cookies });
const { data } = await supabase
  .from("services")
  .select("*")
  .eq("is_active", true)
  .order("display_order", { ascending: true });

const services = data ?? [];

  return (
    <div className="min-h-screen pt-0">
      {/* Hero Section */}
      <ProfessionalBackground variant="aurora" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center space-x-2 bg-slate-800/50 border border-slate-700/50 rounded-full px-6 py-3">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span className="text-slate-300 font-medium">Professional Services</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            <span className="block text-white mb-4">Our</span>
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent text-glow">
              Services
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive digital solutions tailored to your business needs.
          </p>
        </div>
      </ProfessionalBackground>

      {/* Services Grid */}
      <ProfessionalBackground variant="minimal" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = (LucideIcons as any)[service.icon] || LucideIcons["Code"];
              return (
                <ProfessionalCard
                  key={service.id}
                  variant="glass"
                  className="p-8 relative"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/25">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-slate-400 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {(service.features || []).map((feature: string, index: number) => (
                      <li key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-slate-700 pt-6">
                    <Link
                      href="/contact"
                      className="group w-full inline-flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-blue-500/40 transition-transform transform hover:scale-105"
                    >
                      <span>Get Started</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </ProfessionalCard>
              );
            })}
          </div>
        </div>
      </ProfessionalBackground>
    </div>
  );
}
