"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, Float, Sphere, Box } from "@react-three/drei"
import { ChevronDown, Mail, Download } from "lucide-react"

function FloatingOrb({
  position,
  color,
  size = 0.1,
}: { position: [number, number, number]; color: string; size?: number }) {
  const ref = useRef<any>()

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.3
      ref.current.rotation.x = state.clock.elapsedTime * 0.5
      ref.current.rotation.y = state.clock.elapsedTime * 0.3
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.2
    }
  })

  return (
    <Float speed={3} rotationIntensity={2} floatIntensity={3}>
      <Sphere ref={ref} position={position} args={[size, 32, 32]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
      </Sphere>
    </Float>
  )
}

function FloatingCube({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<any>()

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.4
      ref.current.rotation.y = state.clock.elapsedTime * 0.6
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.2
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Box ref={ref} position={position} args={[0.15, 0.15, 0.15]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} wireframe />
      </Box>
    </Float>
  )
}

function Hero3D() {
  return (
    <>
      <FloatingOrb position={[-2.5, 0, 0]} color="#8b5cf6" size={0.12} />
      <FloatingOrb position={[2.5, 0.5, -1]} color="#3b82f6" size={0.1} />
      <FloatingOrb position={[0, -1.5, 1]} color="#06b6d4" size={0.08} />
      <FloatingOrb position={[-1.8, 1.2, 0.5]} color="#8b5cf6" size={0.15} />
      <FloatingOrb position={[1.8, -0.8, -0.5]} color="#3b82f6" size={0.09} />

      <FloatingCube position={[-1, -0.5, 0.8]} color="#64ffda" />
      <FloatingCube position={[1.2, 0.8, -0.3]} color="#a78bfa" />
      <FloatingCube position={[0.5, -1, 1.2]} color="#f472b6" />

      <Text position={[0, 0, 0]} fontSize={0.6} color="#64ffda" anchorX="center" anchorY="middle">
        {"</>"}
      </Text>
    </>
  )
}

export default function Hero() {
  const [currentTitle, setCurrentTitle] = useState(0)
  const [mounted, setMounted] = useState(false)
  const titles = ["ML Engineer", "Data Analyst", "Web Developer"]

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [mounted, titles.length])

  const scrollToSection = useCallback(
    (sectionId: string) => {
      if (!mounted || typeof window === "undefined") return

      try {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      } catch (error) {
        // Silently handle errors
      }
    },
    [mounted],
  )

  if (!mounted) {
    return (
      <section id="hero" className="relative min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full mx-auto mb-4 animate-spin" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-orbitron">
            Loading...
          </h1>
        </div>
      </section>
    )
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl lg:text-7xl font-bold mb-6 font-orbitron"
          >
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Habiba Mowafy
            </span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl lg:text-2xl text-gray-300 mb-8"
          >
            <motion.span
              key={currentTitle}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-cyan-400 font-medium"
            >
              {titles[currentTitle]}
            </motion.span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg text-gray-400 mb-12 max-w-2xl leading-relaxed"
          >
            Versatile Computer Engineer with hands-on experience in AI, data analysis, web development, and desktop
            applications. Passionate about creating real-world solutions and continuously expanding technical skills.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <motion.button
              onClick={() => scrollToSection("projects")}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(100, 255, 218, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-gray-900 px-6 py-3 rounded-full font-medium transition-all"
            >
              View My Work
            </motion.button>

            <motion.button
              onClick={() => scrollToSection("contact")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 border-2 border-cyan-500 text-cyan-400 px-6 py-3 rounded-full font-medium hover:bg-cyan-500/10 transition-all"
            >
              <Mail size={20} />
              Get In Touch
            </motion.button>

            <motion.a
              href="/Static/documents/Habiba Mowafy CV.pdf"
              download="Habiba Mowafy CV.pdf"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(244, 114, 182, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full font-medium transition-all"
            >
              <Download size={20} />
              Download CV
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right 3D Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="h-96 lg:h-[500px]"
        >
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
            <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8b5cf6" />
            <Hero3D />
          </Canvas>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={() => scrollToSection("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-cyan-400 hover:text-cyan-300 transition-colors"
      >
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}>
          <ChevronDown size={32} />
        </motion.div>
      </motion.button>
    </section>
  )
}
