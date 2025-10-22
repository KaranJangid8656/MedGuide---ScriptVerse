"use client"

import { Pill, Zap, BookOpen, Users, Stethoscope, MapPin } from "lucide-react"
import { useState } from "react"

const features = [
  {
    icon: Pill,
    title: "Smart Medication Reminders",
    description: "Never miss a dose with intelligent reminders tailored to your schedule.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Zap,
    title: "Real-Time Health Tracking",
    description: "Monitor vital signs and health metrics with advanced analytics.",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: BookOpen,
    title: "Condition Library",
    description: "Access comprehensive information about common health conditions.",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Users,
    title: "Family Health Profiles",
    description: "Manage health information for your entire family in one place.",
    color: "from-cyan-500 to-cyan-600",
  },
  {
    icon: Stethoscope,
    title: "Telemedicine Integration",
    description: "Connect with healthcare providers directly through the app.",
    color: "from-pink-500 to-pink-600",
  },
  {
    icon: MapPin,
    title: "Pharmacy Locator",
    description: "Find nearby pharmacies and check medication availability instantly.",
    color: "from-indigo-500 to-indigo-600",
  },
]

export default function Features() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="features" className="relative py-20 md:py-32 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-5 mb-20">
          <div className="inline-block">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 px-4 py-2 rounded-full">
              Powerful Features
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight">
            Your Health,{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Simplified
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to take control of your healthcare journey, all in one beautifully designed platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isHovered = hoveredIndex === index
            
            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative p-8 rounded-3xl bg-white border-2 border-slate-200 hover:border-transparent transition-all duration-500 cursor-pointer shadow-lg hover:shadow-2xl ${
                  isHovered ? "scale-105 -translate-y-2" : ""
                }`}
                style={{
                  transitionDelay: isHovered ? "0ms" : `${index * 50}ms`,
                }}
              >
                {/* Gradient border effect on hover */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}></div>
                <div className="absolute inset-0.5 rounded-3xl bg-white -z-10"></div>
                
                {/* Icon container with animation */}
                <div className="relative mb-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg transform transition-all duration-500 ${
                      isHovered ? "rotate-6 scale-110" : ""
                    }`}
                  >
                    <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                  </div>
                  
                  {/* Animated ring effect */}
                  <div
                    className={`absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} opacity-20 transition-all duration-500 ${
                      isHovered ? "scale-125 opacity-0" : ""
                    }`}
                  ></div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-800 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover indicator */}
                <div className={`mt-6 flex items-center text-sm font-semibold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                  Learn more
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}