"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { GraduationCap, MapPin, Calendar, Mail, Phone, User, Code, Heart } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
}

const cardHoverVariants = {
  hover: {
    y: -10,
    scale: 1.02,
    rotateY: 5,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
}

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" ref={ref} className="py-20 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="inline-block">
            <motion.h2
              className="text-4xl lg:text-6xl font-bold mb-6 font-orbitron relative"
              whileHover={{ scale: 1.05 }}
            >
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                About Me
              </span>
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-lg blur-xl"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </motion.h2>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: 128 } : { width: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </motion.div>

          <motion.p variants={itemVariants} className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Passionate about creating innovative solutions that bridge the gap between technology and human needs
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start"
        >
          {/* Enhanced Profile Card */}
          <motion.div variants={itemVariants} whileHover="hover" className="relative group">
            <motion.div
              variants={cardHoverVariants}
              className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-8 relative overflow-hidden"
            >
              {/* Animated Border */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-purple-400/20 rounded-2xl"
                animate={{
                  background: [
                    "linear-gradient(0deg, rgba(6,182,212,0.2), rgba(59,130,246,0.2), rgba(147,51,234,0.2))",
                    "linear-gradient(120deg, rgba(6,182,212,0.2), rgba(59,130,246,0.2), rgba(147,51,234,0.2))",
                    "linear-gradient(240deg, rgba(6,182,212,0.2), rgba(59,130,246,0.2), rgba(147,51,234,0.2))",
                    "linear-gradient(360deg, rgba(6,182,212,0.2), rgba(59,130,246,0.2), rgba(147,51,234,0.2))",
                  ],
                }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />

              <div className="relative z-10">
                {/* Profile Image with Enhanced Animation */}
                <motion.div
                  className="w-48 h-48 mx-auto mb-8 relative"
                  whileHover={{ scale: 1.1, rotateY: 15 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div
                    className="w-full h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 p-1"
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 8,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  >
                    <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-8xl relative overflow-hidden">
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                        className="filter drop-shadow-[0_0_8px_rgba(103,232,249,0.3)]"
                      >
                        👩🏻‍💻
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Floating Icons */}
                  <motion.div
                    className="absolute -top-2 -right-2 bg-cyan-500/20 p-2 rounded-full"
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <Code className="text-cyan-400" size={20} />
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-2 -left-2 bg-purple-500/20 p-2 rounded-full"
                    animate={{
                      y: [0, 10, 0],
                      rotate: [360, 180, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                  >
                    <Heart className="text-purple-400" size={20} />
                  </motion.div>
                </motion.div>

                {/* Enhanced Title Section */}
                <motion.div
                  className="text-center mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  <motion.h3
                    className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    Computer Engineer
                  </motion.h3>
                  <motion.p
                    className="text-gray-300 text-lg mb-6"
                    animate={{
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    AIN SHAMS University
                  </motion.p>

                  {/* Contact Info with Enhanced Animation */}
                  <div className="space-y-4">
                    {[
                      { icon: Mail, text: "habibamowafy24@gmail.com", color: "cyan" },
                      { icon: Phone, text: "01001012983", color: "purple" },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center justify-center gap-3 group cursor-pointer"
                        whileHover={{ scale: 1.05, x: 10 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ delay: 1 + index * 0.2, duration: 0.6 }}
                      >
                        <motion.div
                          className={`p-2 rounded-lg bg-${item.color}-500/20 group-hover:bg-${item.color}-500/30 transition-all`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <item.icon className={`text-${item.color}-400`} size={18} />
                        </motion.div>
                        <span className="text-gray-300 group-hover:text-white transition-colors">{item.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Top right - My Journey Section */}
          <motion.div variants={itemVariants}>
            <motion.div
              className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-8 relative overflow-hidden"
              whileHover={{ scale: 1.02, rotateY: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-cyan-400"
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 1.5, delay: 1.2 }}
              />

              <motion.div
                className="flex items-center gap-3 mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 1.4, duration: 0.6 }}
              >
                <motion.div
                  className="bg-purple-500/20 p-3 rounded-xl"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <User className="text-purple-400" size={24} />
                </motion.div>
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                  My Journey
                </h3>
              </motion.div>

              <div className="space-y-6">
                {[
                  "I'm a dedicated Computer Engineering student at AIN SHAMS University with a strong passion for artificial intelligence, machine learning, and full-stack development.",
                  "My journey in technology spans across various domains including data analysis, web development, and embedded systems, always driven by curiosity and innovation.",
                  "With hands-on experience in machine learning projects and web application development, I enjoy tackling complex problems and creating innovative solutions that make a real difference.",
                ].map((text, index) => (
                  <motion.p
                    key={index}
                    className="text-lg text-gray-300 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 1.6 + index * 0.2, duration: 0.8 }}
                    whileHover={{ x: 10, color: "#ffffff" }}
                  >
                    {text}
                  </motion.p>
                ))}
              </div>
            </motion.div>


          </motion.div>

          {/* Bottom left - Language card */}
          <motion.div variants={itemVariants} className="mt-2">
            <motion.div
              className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-green-500/30 rounded-2xl p-8 relative overflow-hidden"
              whileHover={{ scale: 1.02, rotateY: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-400"
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 1.5, delay: 2.8 }}
              />

              <motion.h4
                className="text-2xl font-bold text-white mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 3, duration: 0.6 }}
              >
                Languages
              </motion.h4>

              <div className="space-y-6">
                {[
                  { name: "Arabic", level: "Native/Bilingual", percentage: 100, color: "green" },
                  { name: "English", level: "Proficient", percentage: 80, color: "blue" },
                  { name: "German", level: "Basic", percentage: 33, color: "yellow" },
                ].map((lang, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 3.2 + index * 0.2, duration: 0.6 }}
                    whileHover={{ x: 10 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300 font-medium">{lang.name}</span>
                      <span className={`text-${lang.color}-400 text-sm font-medium`}>{lang.level}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                      <motion.div
                        className={`bg-gradient-to-r from-${lang.color}-400 to-${lang.color}-500 h-3 rounded-full relative`}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${lang.percentage}%` } : { width: 0 }}
                        transition={{ delay: 3.4 + index * 0.2, duration: 1.5, ease: "easeOut" }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white/20 rounded-full"
                          animate={{
                            x: ["-100%", "100%"],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                            delay: 4 + index * 0.5,
                          }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom right - Education Card */}
          <motion.div variants={itemVariants} className="-mt-11">
            <motion.div
              className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-8 relative overflow-hidden"
              whileHover={{ scale: 1.02, rotateY: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-400"
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 1.5, delay: 2 }}
              />

              <motion.div
                className="flex items-start gap-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ delay: 2.2, duration: 0.8 }}
              >
                <motion.div
                  className="bg-cyan-500/20 p-4 rounded-xl"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                >
                  <GraduationCap className="text-cyan-400" size={32} />
                </motion.div>

                <div className="flex-1">
                  <motion.h4
                    className="text-2xl font-bold text-white mb-2"
                    whileHover={{ scale: 1.05, color: "#06b6d4" }}
                  >
                    Bachelor of Science in Computer Engineering
                  </motion.h4>
                  <motion.p
                    className="text-cyan-400 font-medium mb-4 text-lg"
                    animate={{
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    Faculty of Engineering - Ain Shams University
                  </motion.p>

                  <div className="flex flex-wrap gap-4 text-gray-400">
                    {[
                      { icon: Calendar, text: "09/2021 – Present" },
                      { icon: MapPin, text: "Cairo, Egypt" },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-2 group"
                        whileHover={{ scale: 1.05, x: 5 }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={{ delay: 2.4 + index * 0.1, duration: 0.6 }}
                      >
                        <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                          <item.icon size={16} className="group-hover:text-cyan-400 transition-colors" />
                        </motion.div>
                        <span className="group-hover:text-white transition-colors">{item.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
