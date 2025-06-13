"use client"

import { useRef, useMemo, Suspense } from "react"
import { useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"

function Meteors() {
  const meteorsRef = useRef<THREE.Group>(null)

  const meteorData = useMemo(() => {
    const meteors = []
    for (let i = 0; i < 8; i++) {
      meteors.push({
        position: [Math.random() * 100 - 50, Math.random() * 50 + 25, Math.random() * 20 - 10],
        speed: Math.random() * 0.02 + 0.01,
        size: Math.random() * 0.1 + 0.05,
        color: Math.random() > 0.7 ? "#4682ff" : Math.random() > 0.5 ? "#ffd700" : "#ffffff",
      })
    }
    return meteors
  }, [])

  useFrame(() => {
    if (!meteorsRef.current) return

    try {
      meteorsRef.current.children.forEach((meteor, index) => {
        const data = meteorData[index]
        if (data && meteor && meteor.position) {
          meteor.position.x -= data.speed * 100
          meteor.position.y -= data.speed * 50

          // Reset meteor when it goes off screen
          if (meteor.position.x < -60 || meteor.position.y < -30) {
            meteor.position.x = Math.random() * 20 + 40
            meteor.position.y = Math.random() * 20 + 20
          }
        }
      })
    } catch (error) {
      console.warn("Error in meteor animation:", error)
    }
  })

  return (
    <group ref={meteorsRef}>
      {meteorData.map((meteor, index) => (
        <mesh key={index} position={meteor.position as [number, number, number]}>
          <sphereGeometry args={[meteor.size, 8, 8]} />
          <meshBasicMaterial color={meteor.color} />
        </mesh>
      ))}
    </group>
  )
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null)

  const particleCount = 50
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 100
      pos[i * 3 + 1] = (Math.random() - 0.5) * 100
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50
    }
    return pos
  }, [])

  useFrame((state) => {
    if (!particlesRef.current || !particlesRef.current.geometry?.attributes?.position) return

    try {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.01
      const positionAttribute = particlesRef.current.geometry.attributes.position
      const positions = positionAttribute.array as Float32Array

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        if (positions[i3 + 1] !== undefined) {
          positions[i3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.01
        }
      }

      positionAttribute.needsUpdate = true
    } catch (error) {
      console.warn("Error in particle animation:", error)
    }
  })

  return (
    <Points ref={particlesRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#64ffda"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

export default function GalaxyBackground() {
  const ref = useRef<THREE.Points>(null)

  // Generate galaxy particles
  const particlesCount = 4000
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3)
    const cols = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3

      // Galaxy spiral pattern
      const radius = Math.random() * 35
      const spinAngle = radius * 0.1
      const branchAngle = ((i % 3) * (Math.PI * 2)) / 3

      const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.4
      const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.4
      const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.4

      pos[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX
      pos[i3 + 1] = randomY
      pos[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

      // Colors - purple to blue gradient
      const mixedColor = new THREE.Color()
      mixedColor.setHSL(0.6 + Math.random() * 0.3, 0.8, 0.6)

      cols[i3] = mixedColor.r
      cols[i3 + 1] = mixedColor.g
      cols[i3 + 2] = mixedColor.b
    }

    return { positions: pos, colors: cols }
  }, [])

  useFrame((state) => {
    if (!ref.current) return

    try {
      ref.current.rotation.y = state.clock.elapsedTime * 0.03
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    } catch (error) {
      console.warn("Error in galaxy animation:", error)
    }
  })

  return (
    <>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particlesCount} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={particlesCount} array={colors} itemSize={3} />
        </bufferGeometry>
        <PointMaterial
          transparent
          color="#8b5cf6"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          vertexColors
          blending={THREE.AdditiveBlending}
        />
      </Points>

      <Meteors />
      <FloatingParticles />
    </>
  )
}
