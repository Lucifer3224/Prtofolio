"use client"

import { Suspense, useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { Stars } from "@react-three/drei"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Navigation from "@/components/navigation"
import GalaxyBackground from "@/components/galaxy-background"
import LoadingScreen from "@/components/loading-screen"
import { ErrorBoundary } from "@/components/error-boundary"
import { ThreeErrorBoundary } from "@/components/three-error-boundary"

function FallbackComponent() {
  return (
    <div className="w-full h-full bg-gray-900 flex items-center justify-center">
      <div className="text-center text-gray-400">
        <p>Loading 3D content...</p>
      </div>
    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full mx-auto mb-4 animate-spin" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-orbitron">
          Habiba Mowafy
        </h1>
        <p className="text-gray-400 mt-2">Loading Portfolio...</p>
      </div>
    </div>
  )
}

export default function Portfolio() {
  const [isClient, setIsClient] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Ensure we're fully mounted on the client
    setIsClient(true)
    
    // Small delay to ensure all components are ready
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  if (!isClient) {
    return <LoadingFallback />
  }

  return (
    <div className="relative min-h-screen bg-gray-900 overflow-x-hidden">
      {/* 3D Galaxy Background */}
      <div className="fixed inset-0 z-0">
        <ThreeErrorBoundary fallback={<FallbackComponent />}>
          {typeof window !== 'undefined' && isLoaded && (
            <Canvas 
              camera={{ position: [0, 0, 1] }} 
              dpr={[1, 2]}
              gl={{ 
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance'
              }}
              style={{ background: 'transparent' }}
            >
              <Suspense fallback={null}>
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
                <GalaxyBackground />
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={0.6} />
                <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8b5cf6" />
              </Suspense>
            </Canvas>
          )}
        </ThreeErrorBoundary>
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Content */}
      <div className="relative z-10">
        {isLoaded && (
          <>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Contact />
          </>
        )}
      </div>

      {/* Loading Screen */}
      {isClient && <LoadingScreen />}
    </div>
  )
}
