"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="hover:opacity-80 transition">
          <Image
            src="https://res.cloudinary.com/dx9bvma03/image/upload/v1761155281/WhatsApp_Image_2025-10-22_at_23.04.24_86e24633-removebg-preview_fj18tu_1_v4xuyq.png"
            alt="MedGuide Logo"
            width={130}
            height={130}
            className=""
          />
        </Link>

        {/* Desktop Menu - Right Side */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={`font-medium text-sm transition-colors ${
              pathname === "/" ? "text-primary" : "text-foreground/70 hover:text-primary"
            }`}
          >
            Home
          </Link>
          <Link
            href="/analyzer"
            className={`font-medium text-sm transition-colors ${
              pathname === "/analyzer" ? "text-primary" : "text-foreground/70 hover:text-primary"
            }`}
          >
            Analysis
          </Link>
          <Link
            href="/reminder"
            className={`font-medium text-sm transition-colors ${
              pathname === "/reminder" ? "text-primary" : "text-foreground/70 hover:text-primary"
            }`}
          >
            Reminder
          </Link>
          <Link
            href="/about"
            className={`font-medium text-sm transition-colors ${
              pathname === "/about" ? "text-primary" : "text-foreground/70 hover:text-primary"
            }`}
          >
            About
          </Link>
          <div className="h-6 w-px bg-border mx-2"></div>
          <Link
            href="/login"
            className={`font-medium text-sm px-4 py-2 transition-colors ${
              pathname === "/login" ? "text-primary" : "text-foreground/70 hover:text-foreground"
            }`}
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className={`bg-gradient-to-r from-primary to-secondary hover:shadow-lg text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 text-sm ${
              pathname === "/signup" ? "ring-2 ring-primary/50" : ""
            }`}
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 hover:bg-muted rounded-lg transition">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/"
              className={`block py-2 font-medium transition ${
                pathname === "/" ? "text-primary" : "text-foreground/70 hover:text-primary"
              }`}
            >
              Home
            </Link>
            <Link
              href="/analyzer"
              className={`block py-2 font-medium transition ${
                pathname === "/analyzer" ? "text-primary" : "text-foreground/70 hover:text-primary"
              }`}
            >
              Analysis
            </Link>
            <Link
              href="/reminder"
              className={`block py-2 font-medium transition ${
                pathname === "/reminder" ? "text-primary" : "text-foreground/70 hover:text-primary"
              }`}
            >
              Reminder
            </Link>
            <Link
              href="/about"
              className={`block py-2 font-medium transition ${
                pathname === "/about" ? "text-primary" : "text-foreground/70 hover:text-primary"
              }`}
            >
              About
            </Link>
            <div className="pt-4 space-y-2 border-t border-border">
              <Link
                href="/login"
                className={`block text-center py-2 font-medium transition ${
                  pathname === "/login" ? "text-primary" : "text-foreground/70 hover:text-foreground"
                }`}
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className={`block text-center bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-lg font-semibold transition-all ${
                  pathname === "/signup" ? "ring-2 ring-primary/50" : ""
                }`}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
