  "use client"

import { Card } from "@/components/ui/card"
import { Plus, Clock, Bell, TrendingUp, ArrowRight, CheckCircle } from "lucide-react"
import { useState } from "react"

const reminderSteps = [
  {
    icon: Plus,
    title: "Add Medications",
    description: "Easily add your medications, dosages, and frequency with our intuitive interface",
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-50",
    step: "01",
    details: "Smart scanning and autocomplete for quick entry"
  },
  {
    icon: Clock,
    title: "Set Smart Schedules",
    description: "Create personalized reminder schedules that adapt to your daily routine and time zones",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    step: "02",
    details: "AI-powered scheduling that learns your patterns"
  },
  {
    icon: Bell,
    title: "Get Notifications",
    description: "Receive gentle, timely reminders across all your devices with customizable alert styles",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    step: "03",
    details: "Multiple notification channels for reliability"
  },
  {
    icon: TrendingUp,
    title: "Track Progress",
    description: "Monitor your adherence patterns and health improvements with detailed analytics",
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    step: "04",
    details: "Visual progress tracking and health insights"
  },
]

export default function SmartReminders() {
  const [activeStep, setActiveStep] = useState<number | null>(null)

  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-5 mb-20">
          <div className="inline-block">
            <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-4 py-2 rounded-full">
              Smart Health Management
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight">
            Never Miss a{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Dose Again
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Our intelligent reminder system keeps you on track with your health routine through smart automation and personalization
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Desktop connection line */}
          <div className="hidden lg:block absolute top-20 left-[12.5%] right-[12.5%] h-1">
            <div className="relative h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-200 via-blue-200 to-orange-200 rounded-full"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-blue-500 to-orange-500 rounded-full animate-pulse opacity-50"></div>
            </div>
          </div>

          {reminderSteps.map((step, index) => {
            const Icon = step.icon
            const isActive = activeStep === index

            return (
              <div
                key={index}
                className="relative group cursor-pointer"
                onMouseEnter={() => setActiveStep(index)}
                onMouseLeave={() => setActiveStep(null)}
              >
                <Card className={`relative p-6 bg-white border-2 transition-all duration-500 hover:shadow-lg hover:-translate-y-1 h-full ${
                  isActive ? 'border-emerald-300 shadow-lg scale-105' : 'border-slate-200'
                }`}>
                  {/* Gradient border effect on hover */}
                  {isActive && (
                    <>
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} -z-10`}></div>
                      <div className="absolute inset-0.5 rounded-2xl bg-white -z-10"></div>
                    </>
                  )}

                  {/* Icon container with animation */}
                  <div className="relative mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-500 ${isActive ? 'rotate-3 scale-110' : ''}`}>
                      <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                    </div>

                    {/* Animated ring effect */}
                    <div className={`absolute inset-0 w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} opacity-20 transition-all duration-500 ${isActive ? 'scale-125 opacity-0' : ''}`}></div>
                  </div>

                  <h3 className={`text-lg font-bold mb-2 transition-colors duration-300 ${isActive ? 'text-slate-900' : 'text-slate-800'}`}>
                    {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm mb-3">
                    {step.description}
                  </p>

                  {/* Compact action indicator */}
                  <div className={`flex items-center justify-center gap-1 text-xs font-semibold bg-gradient-to-r ${step.color} bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                    <span>Learn more</span>
                    <ArrowRight className="w-3 h-3" strokeWidth={3} />
                  </div>
                </Card>
              </div>
            )
          })}
        </div>

        {/* Success indicator */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-blue-50 px-8 py-4 rounded-full border border-emerald-100">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span className="text-slate-700 font-medium">Join thousands who never miss their medications</span>
            <button className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all hover:scale-105">
              Start Now
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
