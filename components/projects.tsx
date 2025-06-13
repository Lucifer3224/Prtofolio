"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ExternalLink, Github, ChevronLeft, ChevronRight, X, AlertCircle } from "lucide-react"
import { Dialog, DialogContent } from "./ui/dialog"

const projects = [
	{
		title: "Cartnest Web Application",
		description:
			"Containerized marketplace app using FastAPI, PostgreSQL, and Docker. Features user roles, item listings, transactions, deposits, JWT-based authentication, and primary-replica DB setup for high availability.",
		images: [
			"/Static/Cartnest-0.png",
			"/Static/Cartnest-1.png",
			"/Static/Cartnest-2.png",
			"/Static/Cartnest-3.png",
			"/Static/Cartnest-4.png",
			"/Static/Cartnest-5.png",
			"/Static/Cartnest-6.png",
		],
		technologies: ["FastAPI", "PostgreSQL", "Docker", "SQLModel"],
		category: "Web Application",
		color: "from-blue-400 to-blue-600",
		githubUrl: "https://github.com/moazragab12/Cartnest",
	},
	{
		title: "TimeSlice",
		description:
			"Python-based desktop application with a modern GUI using CustomTkinter and Pillow to simulate CPU scheduling algorithms (FCFS, SJF, Priority, Round Robin). Features real-time animations, live Gantt chart updates, performance metrics, and light/dark theme support.",
		images: [
			"/Static/TimeSlice-0.png",
			"/Static/TimeSlice-1.png",
			"/Static/TimeSlice-2.png",
			"/Static/TimeSlice-3.png",
			"/Static/TimeSlice-4.png",
		],
		technologies: ["Python", "CustomTkinter", "Pillow", "Algorithms"],
		category: "Desktop Application",
		color: "from-purple-400 to-purple-600",
		githubUrl: "https://github.com/Lucifer3224/TimeSlice",
	},
	{
		title: "PocketPilot",
		description:
			"Machine learning model deployed using Django framework. Tackled large, real-world datasets with advanced preprocessing and feature engineering techniques for accurate predictions.",
		images: [
			"/Static/PocketPilot-0.png",
			"/Static/PocketPilot-1.png",
			"/Static/PocketPilot-2.png",
			"/Static/PocketPilot-3.png",
		],
		technologies: ["Django", "Machine Learning", "Python", "Data Processing"],
		category: "Machine Learning",
		color: "from-green-400 to-green-600",
		githubUrl: "https://github.com/Lucifer3224/PocketPilot",
	},
	{
		title: "StayPredict",
		description:
			"End-to-end machine learning pipeline from data analysis to deployment using Flask. Emphasized comprehensive data preprocessing, model building, and insightful presentation.",
		images: [
			"/Static/StayPredict-0.png",
      "/Static/StayPredict-1.png",
      "/Static/StayPredict-2.png",
      "/Static/StayPredict-3.png",
		],
		technologies: ["Flask", "ML Pipeline", "Data Analysis", "Python"],
		category: "Machine Learning",
		color: "from-cyan-400 to-cyan-600",
		githubUrl: "https://github.com/Lucifer3224/StayPredict",
	},
	{
		title: "Library Management System",
		description:
			"Desktop application using Python, Tkinter, and OOP principles to manage personal libraries with MySQL database integration for efficient data management.",
		images: [
			"/Static/LMS-0.png",
      "/Static/LMS-1.png",
      "/Static/LMS-2.png",
      "/Static/LMS-3.png",
      "/Static/LMS-4.png",
		],
		technologies: ["Python", "Tkinter", "MySQL", "OOP"],
		category: "Desktop Application",
		color: "from-yellow-400 to-yellow-600",
		githubUrl: "https://github.com/Lucifer3224/Library_Management_System",
	},
]

function ProjectGallery({ images, title }: { images: string[]; title: string }) {
	const [currentImage, setCurrentImage] = useState(0)
	const [isHovered, setIsHovered] = useState(false)
	const [isModalOpen, setIsModalOpen] = useState(false)

	const nextImage = () => {
		setCurrentImage((prev) => (prev + 1) % images.length)
	}

	const prevImage = () => {
		setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
	}

	return (
		<>
			<div className="relative h-64 mb-4 rounded-lg overflow-hidden group">
				<motion.img
					key={currentImage}
					src={images[currentImage]}
					alt={`${title} - Image ${currentImage + 1}`}
					className="w-full h-full object-cover transition-transform duration-300 cursor-pointer"
					style={{
						transform: isHovered ? "scale(1.2)" : "scale(1)",
						transformOrigin: "center center",
					}}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
					onClick={() => setIsModalOpen(true)}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.3 }}
				/>

				{/* Fun click indicator that appears on hover */}
				<motion.div
					className="absolute inset-0 flex items-center justify-center pointer-events-none"
					initial={{ opacity: 0 }}
					animate={{ opacity: isHovered ? 1 : 0 }}
					transition={{ duration: 0.2 }}
				>
					<motion.div
						className="bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm border border-white/20"
						initial={{ scale: 0.8 }}
						animate={{ scale: isHovered ? [1, 1.1, 1] : 0.8 }}
						transition={{
							duration: 1.5,
							repeat: Infinity,
							repeatType: "reverse",
						}}
					>
						<span className="mr-2">👀</span>
						Click for full view!
					</motion.div>
				</motion.div>

				{images.length > 1 && (
					<>
						<button
							onClick={prevImage}
							className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10"
						>
							<ChevronLeft size={16} />
						</button>
						<button
							onClick={nextImage}
							className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10"
						>
							<ChevronRight size={16} />
						</button>

						<div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity z-10">
							{currentImage + 1}/{images.length}
						</div>
					</>
				)}
			</div>

			{/* Image Modal */}
			<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
				<DialogContent className="max-w-6xl w-[90vw] max-h-[90vh] p-0 bg-gray-900/95 border border-gray-700">
					<div className="relative h-full">
						<motion.button
							onClick={() => setIsModalOpen(false)}
							className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-full z-20 hover:bg-black/80 transition-colors"
							whileHover={{ rotate: [0, 15, -15, 0], scale: 1.2 }}
							transition={{ duration: 0.5 }}
						>
							<X size={20} />
						</motion.button>

						<div className="relative flex items-center justify-center h-full">
							<motion.img
								src={images[currentImage]}
								alt={`${title} - Image ${currentImage + 1} (Full Size)`}
								className="max-h-[80vh] max-w-full object-contain"
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.4, ease: "easeOut" }}
							/>

							{images.length > 1 && (
								<>
									<motion.button
										onClick={(e) => {
											e.stopPropagation()
											prevImage()
										}}
										className="absolute left-4 bg-black/60 text-white p-3 rounded-full hover:bg-black/80 transition-colors"
										whileHover={{ x: -5 }}
										whileTap={{ scale: 0.9 }}
									>
										<ChevronLeft size={24} />
									</motion.button>
									<motion.button
										onClick={(e) => {
											e.stopPropagation()
											nextImage()
										}}
										className="absolute right-4 bg-black/60 text-white p-3 rounded-full hover:bg-black/80 transition-colors"
										whileHover={{ x: 5 }}
										whileTap={{ scale: 0.9 }}
									>
										<ChevronRight size={24} />
									</motion.button>

									<motion.div
										className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full"
										initial={{ y: 20, opacity: 0 }}
										animate={{ y: 0, opacity: 1 }}
										transition={{ delay: 0.3 }}
									>
										{currentImage + 1} / {images.length}
									</motion.div>
								</>
							)}

							{/* Fun message that appears when modal opens */}
							<motion.div
								className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-5 py-2 rounded-full font-medium text-sm"
								initial={{ y: -50, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
							>
								<span className="mr-2">✨</span>
								Looking good, right?
							</motion.div>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</>
	)
}

function DemoNotFoundModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl w-[90vw] bg-gray-900/95 border border-gray-700 p-0 overflow-hidden">
        <motion.div 
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-full z-20 hover:bg-black/80 transition-colors"
            whileHover={{ rotate: [0, 15, -15, 0], scale: 1.2 }}
            transition={{ duration: 0.5 }}
          >
            <X size={20} />
          </motion.button>

          {/* Main content with image and message */}
          <div className="flex flex-col items-center py-6 px-4">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 20, 
                delay: 0.2 
              }}
              className="mb-4 text-yellow-400"
            >
              <AlertCircle size={50} />
            </motion.div>
            
            <motion.h3 
              className="text-xl font-bold text-white mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Demo Coming Soon!
            </motion.h3>
            
            <motion.p 
              className="text-gray-300 text-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              The demo for this project is still being prepared. Check back later!
            </motion.p>
            
            {/* Image with animation */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="relative w-full max-w-md rounded-lg overflow-hidden"
            >
              <motion.img 
                src="/Static/demo-not-found.jpg" 
                alt="Demo Not Available"
                className="w-full rounded-lg shadow-xl"
                initial={{ scale: 1 }}
                animate={{ 
                  scale: [1, 1.02, 1],
                }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  duration: 2.5,
                  ease: "easeInOut"
                }}
              />
              
              <motion.div 
                className="absolute inset-0 border-4 border-yellow-400/50 rounded-lg"
                animate={{ 
                  boxShadow: ["0 0 0px rgba(250, 204, 21, 0.2)", "0 0 15px rgba(250, 204, 21, 0.6)", "0 0 0px rgba(250, 204, 21, 0.2)"]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2 
                }}
              />
            </motion.div>
            
            <motion.button
              className="mt-6 px-6 py-2 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full text-white font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Got it!
            </motion.button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false)
  
  return (
    <section id="projects" ref={ref} className="py-20 px-4">
      <DemoNotFoundModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
      <div className="max-w-7xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
					transition={{ duration: 0.8 }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl lg:text-5xl font-bold mb-6 font-orbitron">
						<span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
							Top 5 Projects
						</span>
					</h2>
					<div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto mb-6"></div>
					<p className="text-gray-400 text-lg max-w-3xl mx-auto">
						A showcase of my technical projects spanning web development, machine learning, desktop applications, and
						embedded systems.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
					{projects.map((project, index) => (
						<motion.div
							key={project.title}
							initial={{ opacity: 0, y: 50 }}
							animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
							transition={{ delay: index * 0.1, duration: 0.8 }}
							whileHover={{ y: -10 }}
							className="group bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/40 transition-all duration-300 relative overflow-hidden flex flex-col h-full"
						>
							{/* Gradient top border */}
							<div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${project.color}`}></div>

							{/* Project Gallery */}
							<ProjectGallery images={project.images} title={project.title} />

							{/* Project Header */}
							<div className="flex items-start justify-between mb-4">
								<h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
									{project.title}
								</h3>
								<span
									className={`text-xs px-2 py-1 bg-gradient-to-r ${project.color} bg-opacity-20 text-white rounded-full`}
								>
									{project.category}
								</span>
							</div>

							{/* Project Description */}
							<p className="text-gray-300 text-sm mb-4 leading-relaxed h-[4.5rem] overflow-y-auto">
								{project.description}
							</p>

							{/* Flex spacer to push technologies and buttons to bottom */}
							<div className="flex-grow"></div>

							{/* Technologies */}
							<div className="mb-6 mt-auto">
								<div className="flex flex-wrap gap-1 min-h-[2rem]">
									{project.technologies.map((tech, techIndex) => (
										<span
											key={techIndex}
											className="text-xs px-2 py-1 bg-gray-700/50 text-gray-300 rounded border border-gray-600/50"
										>
											{tech}
										</span>
									))}
								</div>
							</div>

							{/* Action Buttons */}
							<div className="flex gap-3 mt-auto">
								<motion.a
									href={project.githubUrl}
									target="_blank"
									rel="noopener noreferrer"
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className={`flex items-center gap-2 px-3 py-2 bg-gradient-to-r ${project.color} bg-opacity-20 text-white text-sm rounded-lg hover:bg-opacity-30 transition-all flex-1 justify-center`}
								>
									<Github size={16} />
									<span>Code</span>
								</motion.a>

								<motion.button
									onClick={() => setIsDemoModalOpen(true)}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="flex items-center gap-2 px-3 py-2 border border-gray-600 text-gray-300 text-sm rounded-lg hover:border-cyan-500 hover:text-cyan-400 transition-all flex-1 justify-center group"
								>
									<ExternalLink size={16} className="group-hover:rotate-12 transition-transform" />
									<span>Demo</span>
								</motion.button>
							</div>
						</motion.div>
					))}

					{/* Explore More Projects Card */}
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
						transition={{ delay: projects.length * 0.1, duration: 0.8 }}
						whileHover={{ y: -10 }}
						className="group bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/40 transition-all duration-300 flex flex-col h-full text-center"
					>
						<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-400 to-purple-600"></div>

						{/* Top section with title */}
						<h3 className="text-xl font-semibold text-cyan-400 mb-4">Explore More Projects</h3>
						
						{/* Middle section with buttons */}
						<div className="flex-1 flex flex-col items-center justify-center py-8">
							<p className="text-gray-300 text-sm mb-8 leading-relaxed max-w-xs">
								These are just a few highlights from my portfolio. Discover more of my projects and contributions on my
								GitHub and LinkedIn profiles.
							</p>
							
							<div className="flex gap-4 justify-center">
								<motion.a
									href="https://github.com/Lucifer3224"
									target="_blank"
									rel="noopener noreferrer"
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="flex items-center gap-2 px-5 py-3 border-2 border-cyan-500 text-cyan-400 rounded-lg hover:bg-cyan-500/10 transition-all"
								>
									<Github size={18} />
									<span>GitHub</span>
								</motion.a>

								<motion.a
									href="https://www.linkedin.com/in/habiba-el-sayed"
									target="_blank"
									rel="noopener noreferrer"
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="flex items-center gap-2 px-5 py-3 border-2 border-blue-500 text-blue-400 rounded-lg hover:bg-blue-500/10 transition-all"
								>
									<span>💼</span>
									<span>LinkedIn</span>
								</motion.a>
							</div>
						</div>
						
						{/* Bottom spacer to maintain card height consistency */}
						<div className="min-h-[2rem]"></div>
					</motion.div>
				</div>
			</div>
		</section>
	)
}
