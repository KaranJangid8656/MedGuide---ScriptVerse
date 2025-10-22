"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function FinalCTA() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Start Your Journey to Better Health Today
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Join thousands taking control of their healthcare. Download MedGuide now and experience the difference.
          </p>
        </div>

        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 transition-all hover:scale-105 inline-flex items-center gap-2"
        >
          <Download className="w-5 h-5" />
          Download MedGuide
        </Button>

        <p className="text-sm text-foreground/50">Available on iOS, Android, and Web</p>
      </div>
    </section>
  )
}
