"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Sparkles, Check, Shield, Heart } from "lucide-react"

// Seeded random function for consistent results
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    { icon: Shield, text: "HIPAA Compliant" },
    { icon: Heart, text: "Trusted by 100K+ Users" },
    { icon: Check, text: "Free to Start" },
  ]

  // Generate particle positions using seeded random for consistency
  const particles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    top: seededRandom(i * 1001) * 100,
    left: seededRandom(i * 2002) * 100,
    delay: i * 0.5,
    duration: 3 + (seededRandom(i * 3003) * 2),
  }))

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 min-h-screen flex items-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-500"></div>

        {/* Floating particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20 animate-float"
            style={{
              top: `${particle.top}%`,
              left: `${particle.left}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-1000 -mt-10 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Main heading */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight">
                Your Complete{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Healthcare
                  </span>
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    height="8"
                    viewBox="0 0 200 8"
                    fill="none"
                  >
                    <path
                      d="M1 5.5C50 2.5 150 2.5 199 5.5"
                      stroke="url(#gradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="50%" stopColor="#9333ea" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>{" "}
                Companion
              </h1>

              <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-xl">
                Navigate your health journey with confidence. Manage medications, track conditions, and access healthcare information—all in one place.
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link href="/analyzer">
                <button className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg px-5 py-2.5 font-medium text-sm shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                  <span>Start Your Journey</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />
                </button>
              </Link>

              <Link href="/about">
                <button className="group relative bg-white border-2 border-slate-300 text-slate-700 rounded-lg px-5 py-2.5 font-medium text-sm shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 hover:border-blue-600">
                  <span>Learn More</span>
                  <Heart className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                </button>
              </Link>
            </div>

          </div>

          {/* Right - 3D Phone Model */}
          <div className={`relative transition-all duration-1000 delay-300 -mt-14 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-72 h-72 bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl opacity-20 blur-2xl animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-72 h-72 bg-gradient-to-br from-pink-500 to-orange-500 rounded-3xl opacity-20 blur-2xl animate-pulse delay-500"></div>

            {/* 3D Phone Model Container */}
            <div className="relative perspective-1000">
              <div className="relative transform-3d hover:rotate-y-12 transition-transform duration-700">
                {/* Phone Frame */}
                <div className="relative w-80 h-[600px] bg-slate-900 rounded-[3rem] shadow-2xl p-3 mx-auto">
                  {/* Screen */}
                  <div className="relative w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                    {/* Status bar */}
                    <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-r from-blue-600 to-purple-600 z-20">
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-36 h-7 bg-slate-900 rounded-b-3xl"></div>
                      <div className="flex items-center justify-between px-8 pt-2 text-white text-xs">
                        <span className="font-semibold">9:41</span>
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-3 border border-white rounded-sm"></div>
                          <div className="flex gap-0.5">
                            <div className="w-0.5 h-3 bg-white rounded"></div>
                            <div className="w-0.5 h-3 bg-white rounded"></div>
                            <div className="w-0.5 h-3 bg-white rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* App Dashboard */}
                    <div className="absolute inset-0 pt-12 bg-gradient-to-br from-slate-50 to-blue-50">
                      {/* Header */}
                      <div className="px-6 pt-6 pb-4">
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <h3 className="text-2xl font-bold text-slate-900">Dashboard</h3>
                            <p className="text-slate-600 text-sm">Welcome back, Trisha</p>
                          </div>
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full"></div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="bg-white rounded-2xl p-4 shadow-md">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Heart className="w-4 h-4 text-blue-600" />
                              </div>
                              <span className="text-xs font-semibold text-slate-600">Health Score</span>
                            </div>
                            <p className="text-2xl font-bold text-slate-900">92</p>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2">
                              <div className="w-11/12 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                            </div>
                          </div>

                          <div className="bg-white rounded-2xl p-4 shadow-md">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                <Check className="w-4 h-4 text-green-600" />
                              </div>
                              <span className="text-xs font-semibold text-slate-600">Meds Taken</span>
                            </div>
                            <p className="text-2xl font-bold text-slate-900">3/4</p>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2">
                              <div className="w-3/4 h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                            </div>
                          </div>
                        </div>

                        {/* Medication Reminder Card */}
                        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-5 shadow-xl text-white">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <p className="text-sm opacity-90 mb-1">Next Medication</p>
                              <p className="text-xl font-bold">Aspirin 100mg</p>
                            </div>
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                              <Sparkles className="w-5 h-5" />
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            <span>Due in 2 hours</span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Navigation */}
                      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200">
                        <div className="flex items-center justify-around px-6 py-4">
                          {[Heart, Shield, Sparkles, Check].map((Icon, index) => (
                            <button
                              key={index}
                              className={`p-3 rounded-2xl transition-all ${
                                index === 0
                                  ? 'bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg'
                                  : 'bg-slate-100'
                              }`}
                            >
                              <Icon
                                className={`w-5 h-5 ${
                                  index === 0 ? 'text-white' : 'text-slate-600'
                                }`}
                                strokeWidth={2.5}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Physical buttons */}
                  <div className="absolute -left-1 top-32 w-1 h-12 bg-slate-800 rounded-l"></div>
                  <div className="absolute -left-1 top-48 w-1 h-12 bg-slate-800 rounded-l"></div>
                  <div className="absolute -right-1 top-40 w-1 h-16 bg-slate-800 rounded-r"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .delay-300 {
          animation-delay: 300ms;
        }
        .delay-500 {
          animation-delay: 500ms;
        }
        .delay-1000 {
          animation-delay: 1000ms;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-3d {
          transform-style: preserve-3d;
        }
        .rotate-y-12:hover {
          transform: rotateY(12deg) scale(1.05);
        }
      `}</style>
    </section>
  )
}