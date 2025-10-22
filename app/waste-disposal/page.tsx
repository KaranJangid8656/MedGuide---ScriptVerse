"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Pill, AlertTriangle, Shield, MapPin, CheckCircle2, XCircle } from "lucide-react"

export default function WasteDisposalPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Medical Waste Disposal Guide</h1>
            <p className="text-lg text-foreground/70">
              Learn how to safely dispose of medications, sharps, and medical supplies to protect your health and the
              environment.
            </p>
          </div>

          <div className="space-y-8">
            {/* Medications */}
            <div className="bg-card rounded-2xl shadow-lg p-6 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Pill size={28} className="text-primary" />
                Expired/Unused Medications
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-foreground mb-3">Steps for Safe Disposal:</h3>
                  <ol className="list-decimal list-inside space-y-2 text-foreground/80">
                    <li>Check expiration date on medication packaging</li>
                    <li>Do NOT flush medications down the toilet</li>
                    <li>Mix medications with unpalatable substances (coffee grounds, cat litter)</li>
                    <li>Place in sealed plastic bag</li>
                    <li>Take to pharmacy take-back program or DEA disposal event</li>
                    <li>If unavailable, dispose in household trash in sealed container</li>
                  </ol>
                </div>
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <p className="text-sm text-foreground/80">
                    <strong>Tip:</strong> Most pharmacies offer free medication take-back programs. Check with your
                    local pharmacy for details.
                  </p>
                </div>
              </div>
            </div>

            {/* Sharps */}
            <div className="bg-card rounded-2xl shadow-lg p-6 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <AlertTriangle size={28} className="text-accent" />
                Sharps (Needles, Syringes)
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-foreground mb-3">Steps for Safe Disposal:</h3>
                  <ol className="list-decimal list-inside space-y-2 text-foreground/80">
                    <li>Use FDA-approved sharps container</li>
                    <li>Never recap needles</li>
                    <li>Fill container only 3/4 full</li>
                    <li>Seal container when full</li>
                    <li>Label as "Biohazard"</li>
                    <li>Contact local waste management for pickup</li>
                    <li>Never throw in regular trash</li>
                  </ol>
                </div>
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                  <p className="text-sm text-foreground/80">
                    <strong>Warning:</strong> Improper disposal of sharps poses serious injury and infection risks.
                    Always use proper containers.
                  </p>
                </div>
              </div>
            </div>

            {/* Medical Supplies */}
            <div className="bg-card rounded-2xl shadow-lg p-6 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Shield size={28} className="text-secondary" />
                Medical Supplies (Bandages, Gauze, etc.)
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-foreground mb-3">Steps for Safe Disposal:</h3>
                  <ol className="list-decimal list-inside space-y-2 text-foreground/80">
                    <li>Place used bandages/gauze in sealed plastic bag</li>
                    <li>If contaminated with blood, use biohazard bag</li>
                    <li>Dispose in regular trash if not heavily contaminated</li>
                    <li>For heavily contaminated items, contact medical waste service</li>
                    <li>Wash hands after disposal</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Do's and Don'ts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-2xl shadow-lg p-6 border border-green-200">
                <h3 className="text-xl font-bold text-green-700 mb-4">Do's</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">Use proper containers for disposal</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">Label hazardous waste clearly</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">Wear gloves when handling waste</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">Wash hands thoroughly after disposal</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">Use pharmacy take-back programs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">Contact local authorities for guidance</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-50 rounded-2xl shadow-lg p-6 border border-red-200">
                <h3 className="text-xl font-bold text-red-700 mb-4">Don'ts</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <XCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">Don't flush medications down toilet</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">Don't throw sharps in regular trash</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">Don't recap needles</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">Don't mix different waste types</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">Don't dispose without gloves</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">Don't ignore local regulations</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Nearby Drop-off Locator */}
            <div className="bg-card rounded-2xl shadow-lg p-6 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <MapPin size={28} className="text-primary" />
                Find Nearby Drop-off Locations
              </h2>
              <p className="text-foreground/70 mb-4">
                Search for pharmacies and medical waste disposal centers near you that accept medications and medical
                supplies.
              </p>
              <button className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold transition cursor-pointer">
                Search Pharmacies & Disposal Centers
              </button>
            </div>

            {/* Environmental Impact */}
            <div className="bg-secondary/10 rounded-2xl shadow-lg p-6 border border-secondary/20">
              <h2 className="text-2xl font-bold text-foreground mb-4">Why Proper Disposal Matters</h2>
              <div className="space-y-3 text-foreground/80">
                <p>
                  <strong>Environmental Protection:</strong> Improper medication disposal can contaminate water supplies
                  and harm aquatic life.
                </p>
                <p>
                  <strong>Public Health:</strong> Sharps and contaminated materials pose serious infection risks if not
                  handled properly.
                </p>
                <p>
                  <strong>Community Safety:</strong> Proper disposal prevents accidental exposure to hazardous materials
                  in landfills and water systems.
                </p>
                <p>
                  <strong>Legal Compliance:</strong> Following disposal guidelines ensures compliance with local and
                  federal regulations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
