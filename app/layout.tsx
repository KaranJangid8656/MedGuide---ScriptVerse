import type React from "react"
import type { Metadata } from "next"
import { Inter, Sono as Sohne } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const sohne = Sohne({ subsets: ["latin"], variable: "--font-display" })

export const metadata: Metadata = {
  title: "MedGuide - Your Healthcare Companion",
  description: "Navigate your health journey with confidence",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${sohne.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
