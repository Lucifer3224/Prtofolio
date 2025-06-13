import type React from "react"
import type { Metadata } from "next"
import { Inter, Orbitron, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { ErrorBoundary } from "@/components/error-boundary"
import EmailServiceInitializer from "@/components/email-service-initializer"

const inter = Inter({ subsets: ["latin"] })
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "700", "900"],
})
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Habiba Mowafy - Computer Engineer",
  description: "Portfolio of Habiba Mowafy, Computer Engineering Student specializing in AI, ML, and Web Development",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${spaceGrotesk.variable}`}>
      <body className={`${spaceGrotesk.className} font-space`}>
        <EmailServiceInitializer />
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  )
}
