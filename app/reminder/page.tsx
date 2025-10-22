"use client"
import Header from "@/components/header"
import Footer from "@/components/footer"
import MedicineReminder from "@/components/medicine-reminder"

export default function ReminderPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <MedicineReminder />
      <Footer />
    </main>
  )
}
