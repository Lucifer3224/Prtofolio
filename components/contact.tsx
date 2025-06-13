"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Mail, Phone, MapPin, Github, Linkedin, Send, ExternalLink } from "lucide-react"
import { sendEmail, initEmailService } from "../lib/email-service"

export default function Contact() {
  const ref = useRef(null)
  const formRef = useRef<HTMLFormElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  // State mapped to match the form field names used by EmailJS
  const [formData, setFormData] = useState({
    from_name: "",  // Name field - matches EmailJS template parameter
    reply_to: "",   // Email field - matches EmailJS template parameter
    subject: "",    // Subject field
    message: "",    // Message field
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' })

  // Initialize EmailJS once when the component mounts
  useEffect(() => {
    initEmailService();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formRef.current) return

    try {
      setIsSubmitting(true)
      setSubmitStatus({ type: null, message: '' })
      
      // Try EmailJS first
      let success = false;
      
      try {
        success = await sendEmail(formRef.current);
      } catch (emailjsError) {
        console.error('EmailJS error:', emailjsError);
        // Will try the API route as fallback
      }
      
      // If EmailJS fails, try our API route as a fallback
      if (!success) {
        // Get form data to send to our API
        const formData = new FormData(formRef.current);
        const formDataObj: Record<string, string> = {};
        formData.forEach((value, key) => {
          formDataObj[key] = value.toString();
        });
        
        // Call our API route
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formDataObj),
        });
        
        const result = await response.json();
        success = result.success;
        
        if (!success) {
          throw new Error(result.message || 'Failed to send message');
        }
      }
      
      // Reset form after successful submission
      setFormData({
        from_name: "",
        reply_to: "",
        subject: "",
        message: "",
      })
      
      setSubmitStatus({
        type: 'success',
        message: 'Message sent successfully! I will get back to you soon.'
      })
    } catch (error: any) {
      console.error('Error sending message:', error)
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Failed to send message. Please try again or contact me directly via email.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // No mapping needed now since state field names match form field names
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "habibamowafy24@gmail.com",
      href: "mailto:habibamowafy24@gmail.com",
      color: "from-violet-400 to-purple-600",
      bgColor: "bg-violet-500/10",
      borderColor: "border-violet-500/30",
      hoverBorderColor: "group-hover:border-violet-500/60",
      iconAnimation: { rotate: [0, -5, 5, -5, 0], scale: [1, 1.1, 1] },
      iconColor: "#9333ea", // Solid purple color
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+20 100 101 2983",
      href: "tel:+201001012983",
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      hoverBorderColor: "group-hover:border-blue-500/60",
      iconAnimation: { rotate: [0, 15, -15, 5, 0], scale: [1, 1.1, 1] },
      iconColor: "#3b82f6", // Solid blue color
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Cairo, Egypt",
      href: "#",
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      hoverBorderColor: "group-hover:border-green-500/60",
      iconAnimation: { y: [0, -5, 0], scale: [1, 1.2, 1] },
      iconColor: "#10b981", // Solid green color
    },
  ]

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/Lucifer3224",
      color: "from-gray-400 to-gray-600",
      bgColor: "bg-gray-700/50",
      hoverBgColor: "hover:bg-gray-700/80",
      borderColor: "border-gray-600/50",
      hoverBorderColor: "hover:border-gray-400/70",
      iconColor: "#c9d1d9", // GitHub icon color
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/habiba-mowafy",
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-700/30",
      hoverBgColor: "hover:bg-blue-700/50",
      borderColor: "border-blue-500/50",
      hoverBorderColor: "hover:border-blue-400/70",
      iconColor: "#0a66c2", // LinkedIn blue
    },
    {
      icon: ExternalLink, // We'll replace this with a Kaggle icon
      label: "Kaggle",
      href: "https://kaggle.com/habibamowafy",
      color: "from-cyan-400 to-cyan-600",
      bgColor: "bg-cyan-700/30",
      hoverBgColor: "hover:bg-cyan-700/50",
      borderColor: "border-cyan-500/50",
      hoverBorderColor: "hover:border-cyan-400/70",
      iconColor: "#20BEFF", // Kaggle blue
      isKaggle: true, // Flag to render a custom Kaggle icon
    },
  ]

  return (
    <section id="contact" ref={ref} className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto mb-6"></div>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            I'm always open to discussing new opportunities, collaborations, or just having a chat about technology.
            Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-4 p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl hover:border-gray-600/70 transition-all group"
                  >
                    <motion.div
                      className={`${info.bgColor} p-4 rounded-xl ${info.borderColor} border ${info.hoverBorderColor} shadow-lg transition-all duration-300 flex items-center justify-center`}
                      whileHover={info.iconAnimation}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <info.icon 
                        style={{ color: info.iconColor }}
                        size={26} 
                        strokeWidth={2.5}
                      />
                    </motion.div>
                    <div>
                      <p className="text-gray-400 text-sm">{info.label}</p>
                      <p className="text-white font-medium">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Follow Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                    whileHover={{ 
                      scale: 1.1,
                      y: -5,
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 ${social.bgColor} ${social.hoverBgColor} rounded-lg transition-all duration-300 border ${social.borderColor} ${social.hoverBorderColor} shadow-md ${social.label === "Kaggle" ? "min-w-[3.5rem]" : ""}`}
                    aria-label={`Follow me on ${social.label}`}
                  >
                    {social.isKaggle ? (
                      <div className="flex items-center justify-center font-bold text-2xl w-7" style={{ color: social.iconColor }}>
                        K
                      </div>
                    ) : (
                      <social.icon
                        size={28}
                        style={{ color: social.iconColor }}
                        strokeWidth={social.label === "GitHub" ? 2 : 2.5}
                      />
                    )}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8"
          >
            <h3 className="text-2xl font-semibold text-white mb-6">Send a Message</h3>

            {/* Status messages */}
            {submitStatus.type && (
              <div 
                className={`mb-6 p-4 rounded-lg ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-500/20 border border-green-500/40 text-green-200' 
                    : 'bg-red-500/20 border border-red-500/40 text-red-200'
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="from_name" // EmailJS template parameter name
                    value={formData.from_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="reply_to" // EmailJS template parameter name
                    value={formData.reply_to}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-gray-300 text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject" // EmailJS template parameter name
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-300 text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message" // EmailJS template parameter name
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none"
                  placeholder="Tell me about your project or just say hello!"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r ${
                  isSubmitting ? 'from-purple-500/70 to-blue-500/70' : 'from-purple-600 to-blue-600'
                } text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all ${
                  isSubmitting ? 'cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-16 pt-8 border-t border-gray-700"
        >
          <p className="text-gray-400">© 2025 Habiba Mowafy. Built with Next.js, React Three Fiber, and lots of ☕</p>
        </motion.div>
      </div>
    </section>
  )
}
