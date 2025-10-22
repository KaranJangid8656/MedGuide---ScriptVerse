"use client"

import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "New York, USA",
    text: "MedGuide has completely transformed how I manage my medications. The reminders are so helpful!",
    rating: 5,
  },
  {
    name: "Rajesh Kumar",
    location: "Mumbai, India",
    text: "The condition library is incredibly detailed. I feel more informed about my health now.",
    rating: 5,
  },
  {
    name: "Maria Garcia",
    location: "Madrid, Spain",
    text: "Managing my family's health has never been easier. Highly recommend MedGuide!",
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">What Our Users Say</h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Join thousands of people taking control of their healthcare
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 border border-border bg-card hover:shadow-lg transition-all">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground/70 mb-4 leading-relaxed italic">"{testimonial.text}"</p>
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-foreground/60">{testimonial.location}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
