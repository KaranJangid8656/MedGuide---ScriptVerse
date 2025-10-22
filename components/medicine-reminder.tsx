"use client"

import { useState } from "react"
import { Clock, Pill, X, CheckCircle2, XCircle, Bell, Plus, Trash2, Shield, AlertCircle, Phone } from "lucide-react"

interface MedicationReminder {
  id: string
  medicineName: string
  dosage: string
  frequency: string
  timing: string[]
  startDate: string
  endDate: string
  taken: boolean[]
}

export default function MedicineReminder() {
  const [medicationReminders, setMedicationReminders] = useState<MedicationReminder[]>([])
  const [showMedicationReminder, setShowMedicationReminder] = useState(false)
  const [showDisposalModal, setShowDisposalModal] = useState(false)
  const [reminderForm, setReminderForm] = useState({
    medicineName: "",
    dosage: "",
    frequency: "",
    timing: "",
    startDate: "",
    endDate: "",
  })

  const addMedicationReminder = () => {
    if (reminderForm.medicineName && reminderForm.dosage && reminderForm.frequency) {
      const timingArray = reminderForm.timing.split(",").map((t) => t.trim())
      const newReminder: MedicationReminder = {
        id: Date.now().toString(),
        medicineName: reminderForm.medicineName,
        dosage: reminderForm.dosage,
        frequency: reminderForm.frequency,
        timing: timingArray,
        startDate: reminderForm.startDate,
        endDate: reminderForm.endDate,
        taken: new Array(timingArray.length).fill(false),
      }
      setMedicationReminders([...medicationReminders, newReminder])
      setReminderForm({
        medicineName: "",
        dosage: "",
        frequency: "",
        timing: "",
        startDate: "",
        endDate: "",
      })
      setShowMedicationReminder(false)
      alert("Medication reminder added successfully!")
    }
  }

  const toggleMedicineTaken = (reminderId: string, index: number) => {
    setMedicationReminders(
      medicationReminders.map((reminder) =>
        reminder.id === reminderId
          ? {
              ...reminder,
              taken: reminder.taken.map((t, i) => (i === index ? !t : t)),
          }
          : reminder,
      ),
    )
  }

  const removeMedicationReminder = (id: string) => {
    setMedicationReminders(medicationReminders.filter((r) => r.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Clock className="w-8 h-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Medicine Reminder</h1>
          </div>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Never miss a dose with our smart medication reminder system. Set up personalized alerts and track your medication schedule easily.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Add New Reminder */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-card via-card to-primary/5 rounded-3xl shadow-xl p-8 border border-border/50 space-y-6 backdrop-blur-sm">
              {/* Header Section */}
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-br from-primary via-primary to-secondary rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  <Pill className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-1">Add Reminder</h2>
                  <p className="text-sm text-foreground/60">Set up your medication schedule</p>
                </div>
              </div>

              {/* Quick Add Button */}
              <button
                onClick={() => setShowMedicationReminder(true)}
                className="w-full bg-gradient-to-r from-primary via-primary to-secondary text-white py-4 px-6 rounded-2xl font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <span className="relative flex items-center justify-center gap-2">
                  <Plus className="w-5 h-5" />
                  Add New Reminder
                </span>
              </button>

              {/* Stats */}
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 rounded-2xl p-4">
                <h5 className="font-semibold text-foreground mb-3 text-sm">Today's Summary</h5>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-background/50 rounded-lg p-3">
                    <p className="text-lg font-bold text-primary">{medicationReminders.length}</p>
                    <p className="text-xs text-foreground/60">Active Reminders</p>
                  </div>
                  <div className="bg-background/50 rounded-lg p-3">
                    <p className="text-lg font-bold text-green-600">
                      {medicationReminders.reduce((acc, reminder) => acc + reminder.taken.filter(t => t).length, 0)}
                    </p>
                    <p className="text-xs text-foreground/60">Doses Taken</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Active Reminders */}
          <div className="lg:col-span-2">
            {medicationReminders.length === 0 ? (
              <div className="bg-card rounded-2xl shadow-lg p-8 border border-border text-center">
                <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-8 h-8 text-foreground/40" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">No Active Reminders</h3>
                <p className="text-foreground/60 mb-6">Add your first medication reminder to get started</p>
                <button
                  onClick={() => setShowMedicationReminder(true)}
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold transition"
                >
                  Add Your First Reminder
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-6">
                  <Bell className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">Your Active Reminders</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {medicationReminders.map((reminder) => (
                    <div key={reminder.id} className="bg-card rounded-2xl shadow-lg p-6 border border-border">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-foreground">{reminder.medicineName}</h3>
                          <p className="text-foreground/60">{reminder.dosage} • {reminder.frequency}</p>
                        </div>
                        <button
                          onClick={() => removeMedicationReminder(reminder.id)}
                          className="text-foreground/50 hover:text-destructive transition p-1"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <div className="mb-4 p-3 bg-primary/10 rounded-lg">
                        <p className="text-xs text-foreground/60 mb-2">Frequency: {reminder.frequency}</p>
                        <div className="flex gap-2 flex-wrap">
                          {reminder.timing.map((time, idx) => (
                            <button
                              key={idx}
                              onClick={() => toggleMedicineTaken(reminder.id, idx)}
                              className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
                                reminder.taken[idx]
                                  ? "bg-green-500 text-white"
                                  : "bg-foreground/10 text-foreground hover:bg-foreground/20"
                              }`}
                            >
                              {time} {reminder.taken[idx] ? "✓" : ""}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-foreground/60">
                        <span>{reminder.startDate} to {reminder.endDate}</span>
                        <span>
                          {reminder.taken.filter(t => t).length}/{reminder.taken.length} taken
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Disposal Guide Section */}
        <div className="mt-12">
          <div className="bg-card border border-border rounded-3xl p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Pill className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Safe Medication Disposal</h3>
              <p className="text-foreground/60">Environmentally responsible disposal methods</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Tablets & Capsules */}
              <div className="bg-background rounded-lg p-4 border border-border">
                <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <Pill className="w-5 h-5" />
                  Tablets & Capsules
                </h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground/70">Mix with coffee grounds or cat litter</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground/70">Seal in container and dispose</p>
                  </div>
                </div>
              </div>

              {/* Liquid Medications */}
              <div className="bg-background rounded-lg p-4 border border-border">
                <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <Pill className="w-5 h-5" />
                  Liquid Medications
                </h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground/70">Mix with absorbent material</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground/70">Seal and dispose in trash</p>
                  </div>
                </div>
              </div>

              {/* Safety Notes */}
              <div className="bg-background rounded-lg p-4 border border-border">
                <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Safety Notes
                </h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground/70">Never flush medications</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground/70">Keep away from children</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => setShowDisposalModal(true)}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                View Complete Disposal Guide
              </button>
            </div>
          </div>
        </div>
        {showMedicationReminder && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-card rounded-2xl shadow-xl p-6 max-w-md w-full border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-foreground">Add Medication Reminder</h3>
                <button
                  onClick={() => setShowMedicationReminder(false)}
                  className="text-foreground/50 hover:text-foreground transition"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Medicine Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Paracetamol"
                    value={reminderForm.medicineName}
                    onChange={(e) => setReminderForm({ ...reminderForm, medicineName: e.target.value })}
                    className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Dosage</label>
                  <input
                    type="text"
                    placeholder="e.g., 500mg"
                    value={reminderForm.dosage}
                    onChange={(e) => setReminderForm({ ...reminderForm, dosage: e.target.value })}
                    className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Frequency</label>
                  <input
                    type="text"
                    placeholder="e.g., Twice daily"
                    value={reminderForm.frequency}
                    onChange={(e) => setReminderForm({ ...reminderForm, frequency: e.target.value })}
                    className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Timing (comma-separated)</label>
                  <input
                    type="text"
                    placeholder="e.g., 8:00 AM, 2:00 PM, 8:00 PM"
                    value={reminderForm.timing}
                    onChange={(e) => setReminderForm({ ...reminderForm, timing: e.target.value })}
                    className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Start Date</label>
                    <input
                      type="date"
                      value={reminderForm.startDate}
                      onChange={(e) => setReminderForm({ ...reminderForm, startDate: e.target.value })}
                      className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">End Date</label>
                    <input
                      type="date"
                      value={reminderForm.endDate}
                      onChange={(e) => setReminderForm({ ...reminderForm, endDate: e.target.value })}
                      className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowMedicationReminder(false)}
                  className="flex-1 bg-muted hover:bg-muted/80 text-foreground px-4 py-3 rounded-xl font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  onClick={addMedicationReminder}
                  disabled={!reminderForm.medicineName || !reminderForm.dosage || !reminderForm.frequency}
                  className="flex-1 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-foreground/50 text-white px-4 py-3 rounded-xl font-semibold transition disabled:cursor-not-allowed"
                >
                  Add Reminder
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Waste Disposal Modal */}
        {showDisposalModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-card rounded-2xl shadow-xl p-6 max-w-2xl w-full border border-border max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                    <Pill className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Safe Medication Disposal Guide</h3>
                    <p className="text-sm text-foreground/70">Environmentally responsible disposal methods</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDisposalModal(false)}
                  className="text-foreground/50 hover:text-foreground transition cursor-pointer"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Tablet Disposal */}
                <div className="bg-background rounded-lg p-4 border border-border">
                  <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                    <Pill className="w-5 h-5" />
                    Tablets & Capsules
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-foreground">Mix with undesirable substance</p>
                        <p className="text-sm text-foreground/70">Mix tablets with coffee grounds, dirt, or cat litter</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-foreground">Seal in container</p>
                        <p className="text-sm text-foreground/70">Place in sealed plastic bag or empty container</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-foreground">Dispose in trash</p>
                        <p className="text-sm text-foreground/70">Throw in household trash (not recycling)</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Liquid Medication Disposal */}
                <div className="bg-background rounded-lg p-4 border border-border">
                  <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                    <Pill className="w-5 h-5" />
                    Liquid Medications
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-foreground">Mix with absorbent material</p>
                        <p className="text-sm text-foreground/70">Mix with coffee grounds, flour, or cat litter</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-foreground">Seal and dispose</p>
                        <p className="text-sm text-foreground/70">Place in sealed container and throw in trash</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Inhalers & Sprays */}
                <div className="bg-background rounded-lg p-4 border border-border">
                  <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                    <Pill className="w-5 h-5" />
                    Inhalers & Nasal Sprays
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-foreground">Use up completely</p>
                        <p className="text-sm text-foreground/70">Continue using until empty if possible</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-foreground">Remove personal info</p>
                        <p className="text-sm text-foreground/70">Scratch off or remove any personal information</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-foreground">Dispose in trash</p>
                        <p className="text-sm text-foreground/70">Throw in household trash</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Important Safety Notes */}
                <div className="bg-background rounded-lg p-4 border border-border">
                  <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Important Safety Notes
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground/70">Never flush medications down the toilet or drain</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground/70">Keep medications out of reach of children and pets</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground/70">Check for local take-back programs or pharmacy disposal options</p>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="bg-background rounded-lg p-4 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="w-5 h-5 text-red-600" />
                    <h4 className="font-bold text-foreground">Emergency? Call Poison Control</h4>
                  </div>
                  <p className="text-sm text-foreground/70 mb-2">
                    If you suspect medication poisoning or overdose:
                  </p>
                  <p className="font-semibold text-foreground">1-800-222-1222 (US National Poison Hotline)</p>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowDisposalModal(false)}
                  className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition cursor-pointer"
                >
                  Close Guide
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
