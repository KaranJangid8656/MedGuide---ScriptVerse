import Header from "@/components/header"
import Hero from "@/components/hero"
import Features from "@/components/features"
import HowItWorks from "@/components/how-it-works"
import ConditionLibrary from "@/components/condition-library"
import SmartReminders from "@/components/smart-reminders"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <ConditionLibrary />
      <SmartReminders />
      <Footer />
    </main>
  )
}
