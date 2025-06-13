"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, Suspense, useState } from "react"
import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber"
import { Float, OrbitControls, Text } from "@react-three/drei"
import { Code, Database, Globe, Brain, Wrench, ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react"

const skillCategories = [
  {
    title: "Programming Languages",
    skills: ["Python", "C++", "Java", "JavaScript", "Embedded C", "MIPS Assembly", "ARM Assembly"],
    color: "from-purple-400 to-purple-600",
    icon: Code,
    description: "Core programming languages for diverse applications",
  },
  {
    title: "Web Development",
    skills: ["HTML", "CSS3", "Flask", "Django", "Laravel", "FastAPI"],
    color: "from-blue-400 to-blue-600",
    icon: Globe,
    description: "Full-stack web development technologies",
  },
  {
    title: "Data & ML",
    skills: ["Pandas", "Matplotlib", "Seaborn", "Scikit-Learn", "Keras", "Excel"],
    color: "from-cyan-400 to-cyan-600",
    icon: Brain,
    description: "Machine learning and data analysis tools",
  },
  {
    title: "Databases",
    skills: ["MySQL", "PostgreSQL", "MongoDB"],
    color: "from-green-400 to-green-600",
    icon: Database,
    description: "Database management and optimization",
  },
  {
    title: "Tools & Others",
    skills: ["Git & GitHub", "Docker", "Verilog", "Microsoft Office", "OOP"],
    color: "from-pink-400 to-pink-600",
    icon: Wrench,
    description: "Development tools and methodologies",
  },
]

function FloatingSkill({
  text,
  position,
  color,
}: {
  text: string
  position: [number, number, number]
  color: string
}) {
  const ref = useRef<any>()
  const glowRef = useRef<any>()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (ref.current) {
      // Gentler animation with reduced rotation for better readability
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.25 + position[0]) * 0.15
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15 + position[1]) * 0.08
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.25
      
      // Enhanced pulsing glow effect
      if (glowRef.current && hovered) {
        glowRef.current.material.opacity = 0.2 + Math.sin(state.clock.elapsedTime * 1.5) * 0.15
      }
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
      <group 
        ref={ref} 
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.2 : 1.05}
      >
        {/* Main skill card */}
        <mesh>
          <boxGeometry args={[4.5, 1.2, 0.4]} />
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={hovered ? 1.2 : 0.6}
            roughness={0.25}
            metalness={0.85}
          />
        </mesh>
        
        {/* Top edge highlight */}
        <mesh position={[0, 0.375, 0]} rotation={[Math.PI/2, 0, 0]}>
          <planeGeometry args={[3.5, 0.3]} />
          <meshBasicMaterial color="white" transparent opacity={0.12} />
        </mesh>
        
        {/* Enhanced glow effect for hover */}
        {hovered && (
          <>
            {/* Inner glow */}
            <mesh scale={[4.5, 1.2, 0.5]}>
              <boxGeometry />
              <meshBasicMaterial 
                color={color} 
                transparent={true}
                opacity={0.3}
              />
            </mesh>
            
            {/* Outer glow with animation */}
            <mesh ref={glowRef} scale={[4.8, 1.4, 0.7]}>
              <boxGeometry />
              <meshBasicMaterial 
                color={color} 
                transparent={true}
                opacity={0.2}
              />
            </mesh>
          </>
        )}
        
        {/* Text with background for better readability */}
        <group position={[0, 0, 0.21]}>
          {/* Text background for better contrast */}
          <mesh position={[0, 0, -0.01]} scale={[3.2, 0.7, 0.01]}>
            <boxGeometry />
            <meshBasicMaterial color="black" transparent opacity={0.4} />
          </mesh>
          
          {/* Skill text */}
          <Text
            position={[0, 0, 0.01]}
            fontSize={0.4}
            color="white"
            anchorX="center"
            anchorY="middle"
            fontWeight={700}
            outlineWidth={0.02}
            outlineColor="black"
          >
            {text}
          </Text>
          
          {/* Additional text glow for better visibility */}
          {hovered && (
            <Text
              position={[0, 0, 0]}
              fontSize={0.4}
              color={color}
              anchorX="center"
              anchorY="middle"
              fontWeight={700}
              outlineWidth={0.03}
              outlineColor={color}
              material-toneMapped={false}
              material-transparent={true}
              material-opacity={0.5}
            >
              {text}
            </Text>
          )}
        </group>
      </group>
    </Float>
  )
}

interface Skill3D {
  name: string;
  color: string;
  position: [number, number, number];
  category: string;
}

function Skills3D({ onSkillClick }: { onSkillClick: (category: string) => void }) {
  // Map each skill category to a 3D element with its own color
  const skills3D: Skill3D[] = [
    // Programming Languages - Better distributed across the scene
    { name: "Python", color: "#EE82EE", position: [-6.0, 2.5, 0], category: "Programming Languages" },
    { name: "C++", color: "#FF7F50", position: [0, -2.8, 3.0], category: "Programming Languages" },
    
    // Web Development - Placed in visible areas with good spacing
    { name: "Django", color: "#092e20", position: [-2.5, -1.0, -4.0], category: "Web Development" },
    
    // Data & ML - Positioned to create balance
    { name: "AI/ML", color: "#ff6b6b", position: [5.0, 0.5, -1.5], category: "Data & ML" },
    { name: "Numpy", color: "#EEE8AA", position: [3.0, -3.0, 0], category: "Data & ML" },
    
    // Databases - Strategically placed for visibility
    { name: "PostgreSQL", color: "#336791", position: [-3.5, 0, 2.8], category: "Databases" },
    { name: "MongoDB", color: "#4db33d", position: [2.8, 2.8, 2.0], category: "Databases" },
    
    // Tools & Others - Filling remaining key viewpoints
    { name: "Docker", color: "#2496ed", position: [-1.0, 3.5, -2.0], category: "Tools & Others" },
    { name: "Git", color: "#f05033", position: [4.0, -0.5, 3.5], category: "Tools & Others" },
    { name: "Microsoft Office", color: "#e535ab", position: [0.5, 1.5, -5.0], category: "Tools & Others" },
  ]

  const handleClick = (category: string) => {
    onSkillClick(category);
  }

  return (
    <>
      {/* Enhanced lighting for better visibility across distributed elements */}
      <ambientLight intensity={0.85} />
      <pointLight position={[10, 10, 10]} intensity={1.3} />
      <pointLight position={[-10, -10, -10]} intensity={0.7} color="#8b5cf6" />
      <pointLight position={[0, 5, 5]} intensity={0.5} color="#61dafb" />
      <pointLight position={[0, -5, 0]} intensity={0.4} color="#ff6b6b" />
      {/* Additional lighting for wider distribution */}
      <pointLight position={[8, -8, 0]} intensity={0.4} color="#3dd6d0" />
      <pointLight position={[-8, 8, 0]} intensity={0.4} color="#ff9e64" />
      
      {/* Optimized controls for better viewing experience */}
      <OrbitControls 
        enableZoom={false} 
        autoRotate 
        autoRotateSpeed={0.2}
        maxPolarAngle={Math.PI / 1.3}
        minPolarAngle={Math.PI / 4}
        maxAzimuthAngle={Math.PI / 1.2}
        minAzimuthAngle={-Math.PI / 1.2}
        enablePan={false}
        rotateSpeed={0.5}
      />

      {skills3D.map((skill) => (
        <group 
          key={skill.name} 
          onClick={() => handleClick(skill.category)}
          onPointerMissed={(e) => e.stopPropagation()}
        >
          <FloatingSkill
            text={skill.name}
            position={skill.position}
            color={skill.color}
          />
        </group>
      ))}
    </>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.8,
    rotateX: -15,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      duration: 0.8,
    },
  },
}

const skillVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 20,
    },
  },
}

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showAllSkills, setShowAllSkills] = useState(false)

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
    setShowAllSkills(true)
  }

  const handleCloseModal = () => {
    setShowAllSkills(false)
    setSelectedCategory(null)
  }

  // Find the category data based on selected category
  const activeCategoryData = selectedCategory
    ? skillCategories.find((cat) => cat.title === selectedCategory)
    : null

  return (
    <section id="skills" ref={ref} className="py-20 px-4 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div variants={cardVariants} className="inline-block relative">
            <motion.h2
              className="text-4xl lg:text-6xl font-bold mb-6 font-orbitron relative"
              whileHover={{ scale: 1.05 }}
            >
              <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Skills & Technologies
              </span>
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-purple-400/20 via-cyan-400/20 to-blue-400/20 rounded-xl blur-xl"
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </motion.h2>
          </motion.div>

          <motion.div variants={cardVariants} className="flex justify-center mb-6">
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: 128 } : { width: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </motion.div>

          <motion.p variants={cardVariants} className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            A comprehensive toolkit of modern technologies and programming languages for building innovative solutions
          </motion.p>
        </motion.div>

        {/* Single full-width 3D Skills showcase */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="h-96 lg:h-[600px] relative mx-auto w-full max-w-4xl"
        >
          <motion.div
            className="w-full h-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-cyan-500/30 rounded-2xl overflow-hidden relative"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Enhanced 3D Canvas */}
            <Canvas 
              camera={{ 
                position: [0, 0, 12], 
                fov: 65, 
                near: 0.1, 
                far: 1000 
              }} 
              gl={{ 
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance',
                precision: 'highp',
                logarithmicDepthBuffer: true
              }}
              dpr={[1, 2]}
              shadows
              legacy={false}
            >
              <Suspense fallback={null}>
                <Skills3D onSkillClick={handleCategoryClick} />
              </Suspense>
            </Canvas>

            {/* Overlay Info */}
            <motion.div
              className="absolute bottom-4 left-4 right-4 bg-gray-900/80 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <motion.p
                className="text-cyan-400 text-sm font-medium"
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                🎮 Drag to explore!
              </motion.p>
              <motion.button
                onClick={() => setShowAllSkills(true)}
                className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-5 py-1.5 rounded-md flex items-center gap-1.5 hover:shadow-lg hover:shadow-purple-500/20 transition-all font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Skills <ChevronDown size={14} />
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Skills Details Modal */}
      {showAllSkills && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm" 
            onClick={handleCloseModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto z-10 border border-purple-500/30"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring" as const, damping: 25, stiffness: 300 }}
          >
            <div className="flex items-center justify-between mb-8 sticky top-0 bg-gray-900 py-2 z-10">
              <div className="flex items-center gap-3">
                {selectedCategory && (
                  <button
                    className="text-gray-400 hover:text-white p-1.5 rounded-full hover:bg-gray-800/70 transition-colors"
                    onClick={() => setSelectedCategory(null)}
                    title="Back to all categories"
                  >
                    <ChevronLeft size={20} />
                  </button>
                )}
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  {selectedCategory ? selectedCategory : "All Skills"} 
                </h3>
              </div>
              <div className="flex items-center gap-1">
                {selectedCategory && (
                  <div className="flex items-center mr-2">
                    <button
                      className="text-gray-400 hover:text-white p-1.5 rounded-full hover:bg-gray-800/70 transition-colors"
                      onClick={() => {
                        const currentIndex = skillCategories.findIndex(cat => cat.title === selectedCategory);
                        const prevIndex = (currentIndex - 1 + skillCategories.length) % skillCategories.length;
                        setSelectedCategory(skillCategories[prevIndex].title);
                      }}
                      title="Previous category"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      className="text-gray-400 hover:text-white p-1.5 rounded-full hover:bg-gray-800/70 transition-colors"
                      onClick={() => {
                        const currentIndex = skillCategories.findIndex(cat => cat.title === selectedCategory);
                        const nextIndex = (currentIndex + 1) % skillCategories.length;
                        setSelectedCategory(skillCategories[nextIndex].title);
                      }}
                      title="Next category"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                )}
                <button
                  className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-800"
                  onClick={handleCloseModal}
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedCategory ? (
                // Show specific category
                <motion.div 
                  className="col-span-1 md:col-span-2 space-y-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {activeCategoryData && (
                    <>
                      <motion.div
                        variants={cardVariants}
                        className={`p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-${activeCategoryData.color.split(' ')[1].replace('to-', '')}/30`}
                      >
                        <div className="flex items-center gap-4 mb-3">
                          <div className={`bg-gradient-to-r ${activeCategoryData.color} bg-opacity-20 p-3 rounded-lg`}>
                            <activeCategoryData.icon className="text-white" size={24} />
                          </div>
                          <h4 className={`text-xl font-bold bg-gradient-to-r ${activeCategoryData.color} bg-clip-text text-transparent`}>
                            {activeCategoryData.title}
                          </h4>
                        </div>
                        <p className="text-gray-300 mb-4">{activeCategoryData.description}</p>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {activeCategoryData.skills.map((skill, index) => (
                            <motion.div
                              key={skill}
                              variants={skillVariants}
                              custom={index}
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              className={`px-4 py-3.5 bg-gradient-to-r ${activeCategoryData.color} bg-opacity-10 text-white rounded-xl border border-${activeCategoryData.color.split(' ')[1].replace('to-', '')}/30 flex items-center justify-center text-center relative overflow-hidden group`}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ 
                                opacity: 1, 
                                y: 0,
                                transition: { 
                                  delay: index * 0.05,
                                  type: "spring",
                                  stiffness: 260,
                                  damping: 20 
                                }
                              }}
                            >
                              <motion.div 
                                className={`absolute inset-0 bg-gradient-to-r ${activeCategoryData.color} opacity-0 group-hover:opacity-15 transition-opacity duration-300`}
                              />
                              <motion.span 
                                className="relative z-10 font-medium"
                                initial={{ opacity: 0.8 }}
                                whileHover={{ opacity: 1 }}
                              >
                                {skill}
                              </motion.span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </>
                  )}
                </motion.div>
              ) : (
                // Show all categories
                skillCategories.map((category) => (
                  <motion.div
                    key={category.title}
                    variants={cardVariants}
                    className="bg-gray-800/50 rounded-xl p-4 border border-purple-500/20 hover:border-purple-500/50 transition-all cursor-pointer relative group overflow-hidden"
                    onClick={() => setSelectedCategory(category.title)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div 
                      className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-20 bg-gradient-to-r from-purple-500 to-cyan-500"
                      animate={{ 
                        scale: [0.1, 1.5],
                        opacity: [0, 0.3, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    
                    <div className="flex items-center gap-3 mb-3 relative z-10">
                      <div className={`bg-gradient-to-r ${category.color} p-2 rounded-lg`}>
                        <category.icon size={20} className="text-white" />
                      </div>
                      <h4 className={`text-lg font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                        {category.title}
                      </h4>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{category.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.slice(0, 3).map((skill) => (
                        <span 
                          key={skill} 
                          className={`text-xs px-2 py-1 rounded-md bg-gradient-to-r ${category.color} bg-opacity-10 border border-${category.color.split(' ')[1].replace('to-', '')}/30 text-white`}
                        >
                          {skill}
                        </span>
                      ))}
                      {category.skills.length > 3 && (
                        <span className="text-xs px-2 py-1 rounded-md bg-gray-700 text-gray-300">
                          +{category.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
