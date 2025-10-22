"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Mail, Lock, User } from "lucide-react"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    // Simulate API call
    setTimeout(() => {
      if (name && email && password && confirmPassword) {
        if (password !== confirmPassword) {
          setMessage("Passwords do not match")
        } else {
          setMessage(`Account created successfully! Welcome ${name}`)
          setName("")
          setEmail("")
          setPassword("")
          setConfirmPassword("")
        }
      } else {
        setMessage("Please fill in all fields")
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground mb-8 transition"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Home</span>
        </Link>

        <div className="bg-card rounded-2xl shadow-xl p-8 border border-border">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Create Account</h1>
            <p className="text-foreground/60 font-medium">Join MedGuide and take control of your health</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-foreground/40" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-foreground/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-foreground/40" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-foreground/40" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition font-medium"
                />
              </div>
            </div>

            {message && (
              <div
                className={`p-4 rounded-lg font-medium ${message.includes("successfully") ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"}`}
              >
                {message}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg py-3 font-semibold transition-all hover:shadow-lg disabled:opacity-50"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-center text-foreground/60 font-medium">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:text-primary/90 font-semibold transition">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
