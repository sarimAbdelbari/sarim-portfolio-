"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);

  const projectsData = [
    {
      id: 1,
      title: "Fikrat Agency",
      description: "Algeria's Premier MVP Agency specializing in rapid MVP development for startups and businesses.",
      image: "/assets/images/mvpro.png",
      technologies: ["React", "Next.js", "Tailwind"],
      githubUrl: "https://github.com/sarimAbdelbari/Fikrat-Agency",
      liveUrl: "https://www.fikrat.tech/",
      stars: 24,
      lastUpdated: "2 days ago"
    },
    {
      id: 2,
      title: "Task Management",
      description: "Collaborative project management tool with real-time updates and team chat functionality.",
      image: "/assets/images/mvpro.png",
      technologies: ["Next.js", "TypeScript", "Prisma"],
      githubUrl: "https://github.com/yourusername/task-manager",
      liveUrl: "https://your-taskmanager-demo.com",
      stars: 18,
      lastUpdated: "1 week ago"
    },
    {
      id: 3,
      title: "Fikrat Agency",
      description: "Algeria's Premier MVP Agency specializing in rapid MVP development for startups and businesses.",
      image: "/assets/images/mvpro.png",
      technologies: ["React", "Next.js", "Tailwind"],
      githubUrl: "https://github.com/sarimAbdelbari/Fikrat-Agency",
      liveUrl: "https://www.fikrat.tech/",
      stars: 24,
      lastUpdated: "2 days ago"
    },
    {
      id: 4,
      title: "Fikrat Agency",
      description: "Algeria's Premier MVP Agency specializing in rapid MVP development for startups and businesses.",
      image: "/assets/images/mvpro.png",
      technologies: ["React", "Next.js", "Tailwind"],
      githubUrl: "https://github.com/sarimAbdelbari/Fikrat-Agency",
      liveUrl: "https://www.fikrat.tech/",
      stars: 24,
      lastUpdated: "2 days ago"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeOut"
      }
    }
  };

  const techBadgeVariants = {
    hidden: { 
      opacity: 0, 
      y: -20,
      scale: 0.8
    },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: index * 0.1,
        duration: 0.4,
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      }
    })
  };

  return (
    <section className="py-16">
      <div className="w-full">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Featured Projects
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work, featuring modern web applications built with cutting-edge technologies
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {projectsData.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className="group"
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
            >
              {/* Project Card - Borderless */}
              <motion.div
                className="bg-transparent"
                whileHover={{ 
                  y: -4,
                  transition: { duration: 0.2 }
                }}
              >
                {/* Project Image */}
                <div className="relative h-[500px] w-full overflow-hidden rounded-xl mb-1">
                  <motion.div
                    className="relative h-full w-full"
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-contain "
                    />
                   
                  </motion.div>

                  {/* Hover Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <div className="flex space-x-3">
                      <Link 
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                          <polyline points="15,3 21,3 21,9"/>
                          <line x1="10" x2="21" y1="14" y2="3"/>
                        </svg>
                      </Link>
                      <Link 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </Link>
                    </div>
                  </motion.div>
                </div>

                {/* Card Content */}
                <div className="space-y-4">
                  {/* Project Title */}
                  <Link 
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group/title"
                  >
                    <h3 className="text-lg md:text-xl font-semibold text-foreground group-hover/title:text-primary transition-colors cursor-pointer">
                      {project.title}
                    </h3>
                  </Link>

                  {/* GitHub Stats */}
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                      </svg>
                      <span>{project.stars}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M23 4v6h-6"/>
                        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                      </svg>
                      <span>{project.lastUpdated}</span>
                    </div>
                  </div>

                  {/* Project Description */}
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technology Badges with Falling Animation */}
                  <motion.div 
                    className="flex flex-wrap gap-2 pt-2"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {project.technologies.map((tech, index) => (
                      <motion.span
                        key={index}
                        custom={index}
                        variants={techBadgeVariants}
                        className="px-3 py-1.5 bg-secondary/80 text-secondary-foreground text-sm font-medium rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-200 cursor-default"
                        whileHover={{ 
                          scale: 1.05,
                          y: -2,
                          transition: { duration: 0.2 }
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
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
          <Link 
            href="/projects"
            className="inline-flex items-center space-x-2 px-4 md:px-6 py-2 md:py-3 bg-primary text-primary-foreground rounded-lg text-sm md:text-base font-medium hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md"
          >
            <span>View All Projects</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14"/>
              <path d="M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;