"use client"

import { Card } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

const conditions = [
  {
    name: "Dengue",
    symptoms: "High fever, severe headache, joint pain, rash",
    treatment: "Rest, hydration, pain relief. Seek medical care if severe.",
  },
  {
    name: "Malaria",
    symptoms: "Fever, chills, sweating, fatigue, body aches",
    treatment: "Antimalarial medications prescribed by healthcare provider.",
  },
  {
    name: "Headache",
    symptoms: "Pain in head or neck region, sensitivity to light",
    treatment: "Rest, hydration, over-the-counter pain relievers as needed.",
  },
  {
    name: "Stomach Issues",
    symptoms: "Nausea, vomiting, abdominal pain, diarrhea",
    treatment: "Clear fluids, bland diet, rest. Consult doctor if persistent.",
  },
]

export default function ConditionLibrary() {
  return (
    <section id="conditions" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Understand Common Health Conditions</h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Learn about symptoms and treatment options for common conditions
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {conditions.map((condition, index) => (
            <Card
              key={index}
              className="p-6 border border-border bg-card hover:shadow-lg transition-all hover:border-primary/50"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-3">{condition.name}</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-foreground/70">Symptoms:</p>
                      <p className="text-foreground/60">{condition.symptoms}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground/70">Treatment:</p>
                      <p className="text-foreground/60">{condition.treatment}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
