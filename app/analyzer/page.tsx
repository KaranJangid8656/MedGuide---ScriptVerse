"use client"
import Header from "@/components/header"
import Footer from "@/components/footer"
import SymptomAnalyzer from "@/components/symptom-analyzer"

export default function AnalyzerPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <SymptomAnalyzer />
      <Footer />
    </main>
  )
}
