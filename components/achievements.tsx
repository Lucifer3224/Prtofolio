"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { X, ExternalLink, Award, Users } from "lucide-react"

const achievements = [
  {
    id: "certifications",
    icon: "🏆",
    title: "Technical Certifications",
    description:
      "Professional certifications in machine learning, web development, and data science from industry-leading organizations.",
    color: "from-yellow-400 to-yellow-600",
  },
  {
    id: "recommendations",
    icon: "👩‍💼",
    title: "Professional Recommendations",
    description: "Endorsements from mentors and clients highlighting my technical skills and collaborative approach.",
    color: "from-blue-400 to-blue-600",
  },
]

const certifications = [
  { name: "Machine Learning Specialization", image: "/placeholder.svg?height=200&width=300&text=ML+Certificate" },
  { name: "Full Stack Web Development", image: "/placeholder.svg?height=200&width=300&text=Web+Dev+Certificate" },
  { name: "Data Science Professional", image: "/placeholder.svg?height=200&width=300&text=Data+Science+Certificate" },
  { name: "Python Programming", image: "/placeholder.svg?height=200&width=300&text=Python+Certificate" },
  { name: "Database Management", image: "/placeholder.svg?height=200&width=300&text=Database+Certificate" },
  { name: "Cloud Computing", image: "/placeholder.svg?height=200&width=300&text=Cloud+Certificate" },
]

const recommendations = [
  {
    text: "Habiba's technical skills in machine learning and data analysis are exceptional. Her ability to translate complex concepts into practical solutions made her an invaluable team member.",
    author: "Data Science Team Lead",
    company: "Cellula",
  },
  {
    text: "Working with Habiba on web development projects was a pleasure. Her attention to detail and commitment to clean, efficient code resulted in high-quality applications that exceeded client expectations.",
    author: "Web Development Project Manager",
    company: "Tech Solutions Inc.",
  },
  {
    text: "Habiba demonstrates remarkable problem-solving abilities and a deep understanding of computer engineering principles. Her contributions to our embedded systems project were outstanding.",
    author: "Senior Engineer",
    company: "Innovation Labs",
  },
]

function Modal({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-gray-800/95 border border-cyan-500/30 rounded-xl max-w-4xl max-h-[80vh] overflow-y-auto p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-cyan-400 transition-colors"
        >
          <X size={24} />
        </button>
        {children}
      </motion.div>
    </motion.div>
  )
}

export default function Achievements() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeModal, setActiveModal] = useState<string | null>(null)

  return (
    <section id="achievements" ref={ref} className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-orbitron">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Achievements Galaxy
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto mb-6"></div>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Explore my professional journey through certifications, awards, and recommendations that showcase my
            expertise and growth in various technical domains.
          </p>
        </motion.div>

        <div className="flex justify-center gap-8 mb-12">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              whileHover={{ y: -10, scale: 1.03 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-8 hover:border-cyan-500/40 transition-all duration-300 max-w-sm text-center"
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${achievement.color}`}></div>

              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                className="text-6xl mb-4"
              >
                {achievement.icon}
              </motion.div>

              <h3 className="text-xl font-semibold text-cyan-400 mb-4">{achievement.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">{achievement.description}</p>

              <motion.button
                onClick={() => setActiveModal(achievement.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 border-2 border-cyan-500/30 text-cyan-400 rounded-full hover:bg-cyan-500/10 transition-all"
              >
                View {achievement.title.split(" ")[1]}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center"
        >
          <motion.a
            href="https://drive.google.com/drive/folders/1xHK5RWtODOdegZbuRP8ylg-0nhdssNIA?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-gray-900 rounded-full font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
          >
            <span className="text-xl">🌟</span>
            <span>Explore Full Achievements Collection</span>
            <ExternalLink size={20} />
          </motion.a>
        </motion.div>

        {/* Modals */}
        <Modal isOpen={activeModal === "certifications"} onClose={() => setActiveModal(null)}>
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-cyan-400 mb-2">Technical Certifications</h3>
            <p className="text-gray-400">Recognized credentials validating expertise across multiple domains</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-700/50 rounded-lg overflow-hidden cursor-pointer group"
              >
                <img src={cert.image || "/placeholder.svg"} alt={cert.name} className="w-full h-32 object-cover" />
                <div className="p-3">
                  <p className="text-sm text-gray-300 group-hover:text-cyan-400 transition-colors">{cert.name}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="https://drive.google.com/drive/folders/1xHK5RWtODOdegZbuRP8ylg-0nhdssNIA?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2 border-2 border-cyan-500 text-cyan-400 rounded-full hover:bg-cyan-500/10 transition-all"
            >
              <Award size={16} />
              View All Certificates
            </a>
          </div>
        </Modal>

        <Modal isOpen={activeModal === "recommendations"} onClose={() => setActiveModal(null)}>
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-cyan-400 mb-2">Professional Recommendations</h3>
            <p className="text-gray-400">Testimonials from colleagues and industry professionals</p>
          </div>

          <div className="space-y-6 mb-6">
            {recommendations.map((rec, index) => (
              <motion.blockquote
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="border-l-4 border-cyan-500 pl-6 py-4 bg-gray-700/30 rounded-r-lg"
              >
                <p className="text-gray-300 italic mb-3 leading-relaxed">"{rec.text}"</p>
                <footer className="text-cyan-400 font-medium">
                  — {rec.author}, {rec.company}
                </footer>
              </motion.blockquote>
            ))}
          </div>

          <div className="text-center">
            <a
              href="https://drive.google.com/drive/folders/1k1q3ZxzzzOO2wyLGZkvjsPmFJhvggv0Q?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2 border-2 border-cyan-500 text-cyan-400 rounded-full hover:bg-cyan-500/10 transition-all"
            >
              <Users size={16} />
              View All Recommendations
            </a>
          </div>
        </Modal>
      </div>
    </section>
  )
}
