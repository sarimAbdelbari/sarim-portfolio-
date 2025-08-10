"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const projectsData = [
    {
      id: 1,
      title: "Fikrat Tech",
      description: "Algeria's Premier Tech Agency specializing Creating software solutions for startups and businesses.",
      thumbnail: "/assets/images/projects/mvpro.png",
      images: [
        "/assets/images/projects/mvpro.png",
        "/assets/images/projects/mvpro.png", 
        "/assets/images/projects/mvpro.png",
        "/assets/images/projects/mvpro.png"
      ],
      technologies: ["React", "Next.js", "Tailwind"],
      githubUrl: "https://github.com/sarimAbdelbari/Fikrat-Agency",
      liveUrl: "https://www.fikrat.tech/",
      featured: true
    },
    {
      id: 2,
      title: "The Pyramid Documentary",
      description: "A full-stack Content Management System built with the MERN stack to manage, organize Firm's content and Iso documents, featuring role-based access and intuitive content editing.",
      thumbnail: "/assets/images/projects/PyramidDoc3.png",
      images: [
        "/assets/images/projects/PyramidDoc1.png",
        "/assets/images/projects/PyramidDoc2.png", 
        "/assets/images/projects/PyramidDoc3.png"
      ],
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB"],
      githubUrl: "https://github.com/yourusername/pyramid-documentary",
      liveUrl: "",
      featured: false
    },    
    {
      id: 3,
      title: "VitaLife",
      description: "A modern, responsive landing site for a healthcare Centre Diagnostic offering services like Médecine générale, Radiologie, Traumatologie, Cardiologie, Gastro-entérologie, and Analyses médicales.",
      thumbnail: "/assets/images/projects/Vitalife.png",
      images: [
        "/assets/images/projects/Vitalife1.png",
        "/assets/images/projects/Vitalife2.png", 
        "/assets/images/projects/Vitalife3.png"
      ],
      technologies: ["Next Js", "Tailwind", "Framer Motion"],
      githubUrl: "https://github.com/sarimAbdelbari/VitaLife-Project-Freelance",
      liveUrl: "https://vita-life-preview.vercel.app/",
      featured: false
    },
    {
      id: 4,
      title: "Feather Journalism Platform",
      description: "Feather is a full-stack web application designed as a modern platform for journalists to publish articles and for readers to discover and engage with content. It features distinct roles for users, journalists, and administrators, each with a tailored set of functionalities.",
      thumbnail: "/assets/images/projects/Feather1.jpg",
      images: [
        "/assets/images/projects/Feather2.png",
        "/assets/images/projects/Feather3.png"
      ],
      technologies: ["ReactJs", "NodeJs", "ExpressJs", "MongoDb"],
      githubUrl: "https://github.com/sarimAbdelbari/Feather-Journalism-Platform",
      liveUrl: "https://feather-journalism-platform.vercel.app/",
      featured: false
    },
    {
      id: 5,
      title: "Portfolio Website",
      description: "Personal portfolio website built with modern technologies and smooth animations.",
      thumbnail: "/assets/images/projects/PortfolioProject1.png",
      images: [
        "/assets/images/projects/PortfolioProject1.png",
        "/assets/images/projects/PortfolioProject2.png", 
        "/assets/images/projects/PortfolioProject1.png",
        "/assets/images/projects/PortfolioProject1.png"
      ],
      technologies: ["Next.js", "Framer Motion", "Tailwind"],
      githubUrl: "https://github.com/sarimAbdelbari/portfolio",
      liveUrl: "https://portfolio-demo.com",
      featured: false
    }
  ];

  // Image Swiper Component
  const ImageSwiper = ({ images, currentIndex, onIndexChange }) => {
    const nextImage = () => {
      onIndexChange((currentIndex + 1) % images.length);
    };

    const prevImage = () => {
      onIndexChange(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
    };

    return (
      <div className="relative w-full h-64 rounded-xl overflow-hidden bg-background/20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full"
          >
            <Image
              src={images[currentIndex]}
              alt={`Project image ${currentIndex + 1}`}
              fill
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={(e) => { e.stopPropagation(); prevImage(); }}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        
        <button
          onClick={(e) => { e.stopPropagation(); nextImage(); }}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => { e.stopPropagation(); onIndexChange(index); }}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

  // Project Popup Component
  const ProjectPopup = ({ project, onClose }) => {
    const [imageIndex, setImageIndex] = useState(0);

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="bg-background border border-border rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">{project.title}</h3>
              <p className="text-muted-foreground">{project.description}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18"/>
                <path d="M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* Image Swiper */}
          <div className="mb-6">
            <ImageSwiper 
              images={project.images} 
              currentIndex={imageIndex} 
              onIndexChange={setImageIndex} 
            />
          </div>

          {/* Technologies */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-foreground mb-3">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {project.liveUrl && (
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                <motion.button
                  className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15,3 21,3 21,9"/>
                    <line x1="10" x2="21" y1="14" y2="3"/>
                  </svg>
                  <span>Live Demo</span>
                </motion.button>
              </Link>
            )}
            
            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
              <motion.button
                className="w-full px-6 py-3 bg-foreground text-background rounded-xl font-medium hover:bg-foreground/90 transition-colors flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>View Code</span>
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.3, 
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <section className="py-16 px-3 lg:px-10">
        <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            <span className="border-b-4 border-primary pb-2">Featured Projects</span>
          </h2>
          
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work, featuring modern web applications built with cutting-edge technologies.
          </p>
        </motion.div>

        {/* Featured Project */}
        {projectsData.filter(project => project.featured).map((project) => (
          <motion.div
            key={`featured-${project.id}`}
            className="mb-16 "
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div 
              className="group bg-background/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 hover:bg-background/70 transition-all duration-300"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                      Featured
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-secondary text-secondary-foreground text-sm font-medium rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4 pt-4">
                   {project.liveUrl && <Link 
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <motion.button
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="flex items-center space-x-2">
                          <span>Live Demo</span>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                            <polyline points="15,3 21,3 21,9"/>
                            <line x1="10" x2="21" y1="14" y2="3"/>
                          </svg>
                        </span>
                      </motion.button>
                    </Link>}
                    
                    <Link 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <motion.button
                        className="px-6 py-3 bg-foreground text-background rounded-xl font-medium hover:bg-foreground/90 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="flex items-center space-x-2">
                          <span>Source Code</span>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </span>
                      </motion.button>
                    </Link>
                  </div>
                </div>

                {/* Project Image */}
                <div className="relative">
                  <motion.div
                    className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setSelectedProject(project)}
                  >
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover"
                    />
                    
                    {/* Hover Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                      whileHover={{ opacity: 1 }}
                    >
                      <div className="text-center text-white">
                        <motion.div
                          className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center"
                          whileHover={{ scale: 1.1 }}
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 3h6v6"/>
                            <path d="M10 14L21 3"/>
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                          </svg>
                        </motion.div>
                        <p className="text-sm font-medium">Click to view gallery</p>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Regular Projects Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {projectsData.filter(project => !project.featured).map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="group"
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
            >
              <div className="bg-background/50 backdrop-blur-sm rounded-2xl p-6 h-full hover:bg-background/70 transition-all duration-300">
                {/* Project Image */}
                <div 
                  className="relative h-48 rounded-xl overflow-hidden mb-6 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Hover overlay with gallery preview */}
                  <motion.div
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <div className="text-center text-white">
                      <motion.div
                        className="w-12 h-12 mx-auto mb-2 bg-white/20 rounded-full flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                          <circle cx="9" cy="9" r="2"/>
                          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                        </svg>
                      </motion.div>
                      <p className="text-xs font-medium">View Gallery</p>
                      <div className="flex justify-center space-x-1 mt-2">
                        {project.images.slice(0, 4).map((_, index) => (
                          <div key={index} className="w-1.5 h-1.5 bg-white/60 rounded-full" />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Projects Button */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link href="https://github.com/sarimAbdelbari" target="_blank" rel="noopener noreferrer">
            <motion.button
              className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl text-base font-medium hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>View All Projects</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14"/>
                <path d="M12 5l7 7-7 7"/>
              </svg>
            </motion.button>
          </Link>
        </motion.div>
        </div>
      </section>

      {/* Project Popup */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectPopup 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Projects;