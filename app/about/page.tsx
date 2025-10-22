"use client"

import Link from "next/link"
import Image from "next/image"
import { CheckCircle, Users, Award, Heart, Shield, Clock, Smartphone, Globe } from "lucide-react"

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-background to-background py-20 md:py-32">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8">
            <div className="mb-6">
              <Image
                src="https://res.cloudinary.com/dx9bvma03/image/upload/v1761155281/WhatsApp_Image_2025-10-22_at_23.04.24_86e24633-removebg-preview_fj18tu_1_v4xuyq.png"
                alt="MedGuide Logo"
                width={160}
                height={160}
                className="mx-auto"
              />
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight tracking-tight">
              About
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 leading-relaxed font-medium max-w-3xl mx-auto">
              Empowering you with AI-driven healthcare insights, personalized medication management, and comprehensive health tracking—all in one intuitive platform.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Our Story</h2>
              <p className="text-lg text-foreground/70 leading-relaxed">
                Founded in 2024, MedGuide was born from a simple yet powerful vision: to make healthcare accessible, understandable, and manageable for everyone. Our founders, a team of healthcare professionals and technology experts, recognized the challenges people face in managing their health in today's fast-paced world.
              </p>
              <p className="text-lg text-foreground/70 leading-relaxed">
                What started as a solution for medication management has evolved into a comprehensive healthcare companion that combines artificial intelligence, user-friendly design, and medical expertise to deliver personalized health insights and support.
              </p>
            </div>
            <div className="relative h-96 md:h-full flex items-center justify-center">
              <div className="relative w-80 h-96 bg-gradient-to-br from-primary via-secondary to-accent rounded-3xl shadow-2xl overflow-hidden border-8 border-white">
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-foreground rounded-b-2xl"></div>
                <div className="absolute inset-8 bg-white/10 rounded-2xl backdrop-blur-sm flex flex-col items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-white/30 rounded-full mx-auto"></div>
                    <div className="space-y-2">
                      <div className="h-2 bg-white/30 rounded w-24 mx-auto"></div>
                      <div className="h-2 bg-white/30 rounded w-32 mx-auto"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Our Mission & Values</h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
              We are committed to revolutionizing healthcare through technology, making it more accessible, personalized, and effective for everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background rounded-2xl p-8 shadow-lg border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Accessibility</h3>
              <p className="text-foreground/70">Making healthcare information and tools available to everyone, regardless of their technical background or medical knowledge.</p>
            </div>

            <div className="bg-background rounded-2xl p-8 shadow-lg border border-border">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Privacy & Security</h3>
              <p className="text-foreground/70">Protecting your health data with enterprise-grade security and maintaining strict privacy standards that healthcare demands.</p>
            </div>

            <div className="bg-background rounded-2xl p-8 shadow-lg border border-border">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                <Award className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Innovation</h3>
              <p className="text-foreground/70">Continuously improving our platform with the latest AI technology and medical research to provide cutting-edge healthcare solutions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features & Benefits Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">What Makes MedGuide Special</h2>
                <p className="text-lg text-foreground/70 leading-relaxed mb-8">
                  Our platform combines multiple healthcare tools into one seamless experience, powered by advanced AI and designed with real user needs in mind.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { icon: CheckCircle, text: "AI-powered symptom analysis and condition matching" },
                  { icon: Clock, text: "Smart medication reminders and tracking" },
                  { icon: Smartphone, text: "Cross-platform availability (iOS, Android, Web)" },
                  { icon: Users, text: "Personalized health insights and recommendations" },
                  { icon: Globe, text: "Multilingual support for global accessibility" },
                  { icon: Shield, text: "HIPAA-compliant data protection" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-foreground/80 font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl p-8 backdrop-blur-sm border border-white/20">
                <h3 className="text-2xl font-bold text-foreground mb-6 text-center">By The Numbers</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">100K+</div>
                    <div className="text-sm text-foreground/70">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">50+</div>
                    <div className="text-sm text-foreground/70">Health Conditions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                    <div className="text-sm text-foreground/70">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                    <div className="text-sm text-foreground/70">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Get In Touch</h2>
          <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
            Have questions about MedGuide? We'd love to hear from you. Our team is here to help you make the most of your healthcare journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="bg-gradient-to-r from-primary to-secondary hover:shadow-xl text-white rounded-lg px-8 py-3 transition-all hover:scale-105 font-semibold">
                Contact Us
              </button>
            </Link>
            <Link href="/">
              <button className="bg-background border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-lg px-8 py-3 transition-all font-semibold">
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
