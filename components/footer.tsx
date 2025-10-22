"use client"

import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-foreground/5 border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <Image
                src="https://res.cloudinary.com/dx9bvma03/image/upload/v1761155281/WhatsApp_Image_2025-10-22_at_23.04.24_86e24633-removebg-preview_fj18tu_1_v4xuyq.png"
                alt="MedGuide Logo"
                width={130}
                height={130}
                className=""
              />
            </div>
            <p className="text-foreground/60 text-sm">Your complete healthcare companion.</p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Download
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>
                <a href="#" className="hover:text-foreground transition">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-foreground/60">© 2025 MedGuide. All rights reserved.</p>
          <div className="text-sm text-foreground/60 mt-4 md:mt-0">
            <Link
              href="https://script-verse-mu.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              ScriptVerse
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
