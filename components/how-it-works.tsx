"use client"

import { useState } from "react"
import { UserPlus, Clock, BookMarked, CheckCircle, ArrowRight } from "lucide-react"

const steps = [
  {
    icon: UserPlus,
    title: "Create Profile",
    description: "Set up your health profile with personal information and medical history.",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: Clock,
    title: "Set Reminders",
    description: "Configure medication schedules and health tracking reminders.",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: BookMarked,
    title: "Access Health Info",
    description: "Browse our comprehensive library of health conditions and treatments.",
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-50",
  },
  {
    icon: CheckCircle,
    title: "Dispose Safely",
    description: "Get guidance on proper medication disposal and environmental safety.",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
  },
]

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState<number | null>(null)

  return (
    <section id="how-it-works" className="relative py-20 md:py-32 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-5 mb-20">
          <div className="inline-block">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider bg-blue-100 px-4 py-2 rounded-full">
              Simple Process
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight">
            Get Started in{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Four Steps
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Your journey to better health management starts here
          </p>
        </div>

        <div className="relative">
          {/* Desktop connection line */}
          <div className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-1">
            <div className="relative h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 rounded-full"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full animate-pulse opacity-50"></div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = activeStep === index
              
              return (
                <div 
                  key={index} 
                  className="relative"
                  onMouseEnter={() => setActiveStep(index)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  <div
                    className={`relative h-full p-8 rounded-3xl bg-white border-2 transition-all duration-500 cursor-pointer ${
                      isActive 
                        ? "border-transparent shadow-2xl -translate-y-4 scale-105" 
                        : "border-slate-200 shadow-lg hover:shadow-xl hover:-translate-y-1"
                    }`}
                  >
                    {/* Gradient border on hover */}
                    {isActive && (
                      <>
                        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${step.color} -z-10`}></div>
                        <div className="absolute inset-0.5 rounded-3xl bg-white -z-10"></div>
                      </>
                    )}

                    {/* Step number badge */}
                    <div className={`absolute -top-4 -right-4 w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg transition-all duration-500 bg-gradient-to-br ${step.color} ${
                      isActive ? "scale-125 rotate-12" : ""
                    }`}>
                      <span className="text-white">{index + 1}</span>
                    </div>

                    {/* Icon container */}
                    <div className="mb-6">
                      <div
                        className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto transition-all duration-500 relative ${step.bgColor} ${
                          isActive ? "scale-110 rotate-3" : ""
                        }`}
                      >
                        <Icon className={`w-10 h-10 bg-gradient-to-br ${step.color} bg-clip-text text-transparent`} strokeWidth={2} />
                        
                        {/* Pulsing ring on active */}
                        {isActive && (
                          <div className={`absolute inset-0 rounded-2xl ${step.bgColor} animate-ping opacity-75`}></div>
                        )}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 text-center leading-relaxed mb-6">
                      {step.description}
                    </p>

                    {/* Action indicator */}
                    <div className={`flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-300 bg-gradient-to-r ${step.color} bg-clip-text text-transparent ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}>
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4" strokeWidth={3} />
                    </div>
                  </div>

                </div>
              )
            })}
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-20 text-center">
          <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <span className="flex items-center gap-3">
              Start Your Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}