"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Briefcase, Calendar, MapPin } from "lucide-react"

const experiences = [
  {
    title: "Machine Learning Intern",
    company: "Cellula",
    period: "2025",
    location: "Remote",
    description: "Performed EDA and preprocessing on large datasets to extract insights and predict trends.",
    achievements: [
      "Created visualizations to support data-driven decision-making",
      "Applied machine learning models using Python, Pandas, Seaborn, and Scikit-Learn",
      "Developed and deployed ML models, integrating them into two web applications (Django & Flask)",
    ],
    color: "from-purple-400 to-purple-600",
  },
]

const certifications = [
  "Machine Learning Specialization",
  "Web Development",
  "Data Analysis",
  "Networks",
]

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="experience" ref={ref} className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Experience & Certifications
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Experience */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-white mb-6">Professional Experience</h3>

            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="relative"
              >
                {/* Timeline Line */}
                <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gradient-to-b from-purple-400 to-transparent"></div>

                <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 ml-12">
                  <div className="absolute -left-3 top-6 w-6 h-6 bg-purple-500 rounded-full border-4 border-gray-900"></div>

                  <div className="flex flex-wrap items-start justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-1">{exp.title}</h4>
                      <p className={`text-lg font-medium bg-gradient-to-r ${exp.color} bg-clip-text text-transparent`}>
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-gray-400 text-sm space-y-1">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4">{exp.description}</p>

                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, achIndex) => (
                      <motion.li
                        key={achIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ delay: index * 0.2 + achIndex * 0.1, duration: 0.5 }}
                        className="flex items-start gap-2 text-gray-300"
                      >
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-white mb-6">Certifications</h3>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-500/20 p-3 rounded-lg">
                  <Briefcase className="text-blue-400" size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white">Professional Certifications</h4>
                  <p className="text-gray-400">Continuous learning and skill development</p>
                </div>
              </div>

              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-all cursor-pointer"
                  >
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300">{cert}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="mt-6 pt-6 border-t border-gray-700"
              >
                <p className="text-gray-400 text-sm">
                  Access my full certification portfolio and recommendation letter through my
                  <span className="text-blue-400 ml-1"><a href="https://drive.google.com/drive/u/1/folders/1qxpBudWBc30L8hfBcjQFenvX5NcSwRYj">Certification Portfolio & Recommendation</a></span> link.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
