"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience & Certifications" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ]

  const handleScroll = useCallback(() => {
    if (!mounted || typeof window === "undefined") return

    try {
      const scrollY = window.scrollY || 0
      const scrollPosition = scrollY + 100

      setScrolled(scrollY > 100)

      let foundActiveSection = "hero"
      for (const item of navItems) {
        const element = document.getElementById(item.id)
        if (element && element.offsetTop <= scrollPosition) {
          foundActiveSection = item.id
        }
      }
      setActiveSection(foundActiveSection)
    } catch (error) {
      // Silently handle errors
    }
  }, [mounted, navItems])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return

    handleScroll()

    const throttledScroll = () => {
      requestAnimationFrame(handleScroll)
    }

    window.addEventListener("scroll", throttledScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", throttledScroll)
    }
  }, [mounted, handleScroll])

  const scrollToSection = useCallback(
    (sectionId: string) => {
      if (!mounted || typeof window === "undefined") return

      try {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
        setIsOpen(false)
      } catch (error) {
        // Silently handle errors
      }
    },
    [mounted],
  )

  if (!mounted) {
    return null
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gray-900/95 backdrop-blur-md border-b border-cyan-500/30"
          : "bg-gray-900/80 backdrop-blur-sm border-b border-cyan-500/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <motion.div whileHover={{ scale: 1.05 }} className="text-2xl font-bold text-cyan-400 font-orbitron">
            <button onClick={() => scrollToSection("hero")}>HM</button>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  activeSection === item.id ? "text-cyan-400" : "text-gray-300 hover:text-cyan-400"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div layoutId="activeSection" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400" />
                )}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-300 hover:text-cyan-400">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left px-3 py-2 text-sm font-medium transition-colors ${
                  activeSection === item.id ? "text-cyan-400" : "text-gray-300 hover:text-cyan-400"
                }`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
