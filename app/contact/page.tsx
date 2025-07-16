"use client"

import type React from "react"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from "lucide-react"
import { submitContactForm } from "@/app/actions/contact"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null)

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const form = e.currentTarget; // ✅ Save the form reference early

  setIsSubmitting(true);
  setSubmitResult(null);

  const formData = new FormData(form);
  const result = await submitContactForm(formData);

  setSubmitResult(result);
  setIsSubmitting(false);

  if (result.success) {
    form.reset(); // ✅ Works safely now
  }
};


  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="border-blue-500 text-blue-400 bg-blue-500/10 mb-4">
              Get In Touch
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Let's Build Something <span className="text-blue-400">Amazing</span> Together
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to transform your ideas into reality? We'd love to hear about your project and discuss how we can
              help you achieve your goals.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>

                {submitResult && (
                  <div
                    className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                      submitResult.success
                        ? "bg-green-600/20 border border-green-600/30 text-green-400"
                        : "bg-red-600/20 border border-red-600/30 text-red-400"
                    }`}
                  >
                    {submitResult.success ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                    <span>{submitResult.message}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-300">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        required
                        className="bg-gray-700 border-gray-600 text-white mt-1"
                        placeholder="Name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-300">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="bg-gray-700 border-gray-600 text-white mt-1"
                        placeholder="name@example.com"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company" className="text-gray-300">
                        Company
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        className="bg-gray-700 border-gray-600 text-white mt-1"
                        placeholder="Your Company"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-gray-300">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        className="bg-gray-700 border-gray-600 text-white mt-1"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="service" className="text-gray-300">
                      Service Interested In
                    </Label>
                    <select
                      id="service"
                      name="service"
                      className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2 mt-1"
                    >
                      <option value="">Select a service</option>
                      <option value="web-development">Web Development</option>
                      <option value="mobile-apps">Mobile App Development</option>
                      <option value="custom-software">Custom Software</option>
                      <option value="database-design">Database Design</option>
                      <option value="cloud-solutions">Cloud Solutions</option>
                      <option value="cybersecurity">Cybersecurity</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-gray-300">
                      Project Details *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="bg-gray-700 border-gray-600 text-white mt-1"
                      placeholder="Tell us about your project requirements, timeline, and any specific needs..."
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
                <p className="text-gray-300 text-lg mb-8">
                  We're here to help you bring your vision to life. Reach out to us through any of the following
                  channels.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-600 p-3 rounded-lg">
                        <Mail className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Email Us</h3>
                        <p className="text-gray-300">info@threedinetech.com</p>
                        <p className="text-gray-300">support@threedinetech.com</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-600 p-3 rounded-lg">
                        <Phone className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Call Us</h3>
                        <p className="text-gray-300">+1 (555) 123-4567</p>
                        <p className="text-gray-300">+1 (555) 987-6543</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-purple-600 p-3 rounded-lg">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Visit Us</h3>
                        <p className="text-gray-300">123 Tech Street</p>
                        <p className="text-gray-300">Digital City, DC 12345</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-orange-600 p-3 rounded-lg">
                        <Clock className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Business Hours</h3>
                        <p className="text-gray-300">Mon - Fri: 9:00 AM - 6:00 PM</p>
                        <p className="text-gray-300">Sat: 10:00 AM - 4:00 PM</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Frequently Asked <span className="text-blue-400">Questions</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "How long does a typical project take?",
                answer:
                  "Project timelines vary based on complexity and scope. Simple websites take 2-4 weeks, while complex applications can take 3-6 months.",
              },
              {
                question: "Do you provide ongoing support?",
                answer:
                  "Yes, we offer comprehensive support and maintenance packages to ensure your solution continues to perform optimally.",
              },
              {
                question: "What technologies do you work with?",
                answer:
                  "We work with modern technologies including React, Node.js, Python, mobile frameworks, and cloud platforms like AWS and Azure.",
              },
              {
                question: "Can you work with our existing team?",
                answer:
                  "We can integrate with your existing team or work as an extension of your development resources.",
              },
            ].map((faq, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-6">
                  <h3 className="text-white font-semibold mb-3">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
