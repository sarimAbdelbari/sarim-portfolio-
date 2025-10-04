"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLazyLoadMultiple } from '@/components/hooks/useLazyLoad';
import { projectsData, categories } from '@/lib/data';

// --- Helper Components ---

const ImagePlaceholder = ({ className }) => (
  <div className={`bg-muted/20 animate-pulse ${className}`}>
    <div className="flex items-center justify-center h-full">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  </div>
);

const GithubIcon = (props) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const ExternalLinkIcon = (props) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15,3 21,3 21,9"/>
    <line x1="10" x2="21" y1="14" y2="3"/>
  </svg>
);

const ChevronLeftIcon = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M15 18l-6-6 6-6"/>
  </svg>
);

const ChevronRightIcon = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M9 18l6-6-6-6"/>
  </svg>
);

const CloseIcon = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
);


// --- Main Components ---

const CategoryFilter = ({ categoriesWithCounts, selectedCategory, onSelectCategory }) => (
  <motion.div
    className="flex flex-wrap justify-center gap-2 md:gap-3 mb-16"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
  >
    {categoriesWithCounts.map((category) => (
      <motion.button
        key={category.id}
        onClick={() => onSelectCategory(category.id)}
        className={`px-4 py-2 md:px-6 md:py-3 text-sm md:text-base rounded-full font-medium transition-all duration-300 ${
          selectedCategory === category.id
            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
            : 'bg-muted/20 text-muted-foreground hover:bg-muted/40 hover:text-foreground'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="flex items-center gap-2">
          <span>{category.icon}</span>
          <span>{category.name}</span>
          <span className={`text-xs font-bold ${selectedCategory === category.id ? 'opacity-80' : 'opacity-60'}`}>
            {category.count}
          </span>
        </span>
      </motion.button>
    ))}
  </motion.div>
);

const ProjectCard = ({ project, onCardClick, isImageLoaded }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: project.id * 0.1 }}
    className="group cursor-pointer"
    onClick={() => onCardClick(project)}
  >
    <div className="relative">
      <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 bg-muted/10">
        {isImageLoaded(project.thumbnail) ? (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <ImagePlaceholder className="w-full h-full rounded-2xl" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
            {project.liveUrl && (
              <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm text-white text-xs font-medium rounded-lg">
                Live Demo
              </span>
            )}
            <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm text-white text-xs font-medium rounded-lg">
              View Details
            </span>
          </div>
        </div>
        <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium rounded-full">
          {project.year}
        </div>
        {project.featured && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-bold rounded-full">
            Featured
          </div>
        )}
      </div>
      <div className="space-y-3">
        <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {project.technologies.slice(0, 3).map((tech, i) => (
            <span key={i} className="px-3 py-1 bg-muted/20 text-foreground text-xs font-medium rounded-full">
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-3 py-1 bg-muted/20 text-muted-foreground text-xs font-medium rounded-full">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  </motion.div>
);

const ImageSwiper = ({ images, isImageLoaded }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  return (
    <div className="relative w-full  aspect-video rounded-2xl overflow-hidden bg-muted/10">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="relative w-full h-full"
        >
          {isImageLoaded(images[currentIndex]) ? (
            <Image src={images[currentIndex]} alt={`Project image ${currentIndex + 1}`} fill className="object-cover" />
          ) : (
            <ImagePlaceholder className="w-full h-full" />
          )}
        </motion.div>
      </AnimatePresence>
      {images.length > 1 && (
        <>
          <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/50 backdrop-blur-sm hover:bg-background rounded-full flex items-center justify-center text-foreground transition-all shadow-lg z-10">
            <ChevronLeftIcon />
          </button>
          <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/50 backdrop-blur-sm hover:bg-background rounded-full flex items-center justify-center text-foreground transition-all shadow-lg z-10">
            <ChevronRightIcon />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button key={index} onClick={(e) => { e.stopPropagation(); setCurrentIndex(index); }} className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-primary w-6' : 'bg-white/50'}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const ProjectModal = ({ project, onClose, isImageLoaded }) => {
  useEffect(() => {
    const handleEscape = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-md z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative bg-background rounded-3xl p-6 md:p-8 max-w-7xl w-full max-h-[95vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-muted/50 hover:bg-muted transition-colors z-20" aria-label="Close modal">
          <CloseIcon />
        </button>

        <div className="lg:grid lg:grid-cols-5 lg:gap-16 items-start">
          <div className="lg:col-span-3 mb-6 lg:mb-0">
            <ImageSwiper images={project.images} isImageLoaded={isImageLoaded} />
          </div>

          <div className="lg:col-span-2 flex flex-col h-full">
            <div>
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">{project.title}</h3>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full shrink-0">{project.year}</span>
                </div>
                <p className="text-md text-muted-foreground leading-relaxed">{project.description}</p>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-4 py-2 bg-muted/30 text-foreground text-sm font-medium rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex-grow"></div>

            <div className="flex gap-4 mt-auto">
              {project.liveUrl && (
                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <motion.button className="w-full px-6 py-3 lg:px-6 lg:py-4 text-sm lg:text-sm text-nowrap bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <ExternalLinkIcon />
                    <span>View Live</span>
                  </motion.button>
                </Link>
              )}
              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                <motion.button className="w-full px-6 py-3 lg:px-6 lg:py-4 text-sm lg:text-sm text-nowrap bg-muted/30 text-foreground rounded-xl font-medium hover:bg-muted/50 transition-colors flex items-center justify-center gap-2" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <GithubIcon />
                  <span>View Code</span>
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};


const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const categoriesWithCounts = useMemo(() =>
    categories.map(cat => ({
      ...cat,
      count: cat.id === 'all' ? projectsData.length : projectsData.filter(p => p.category === cat.id).length
    })), [projectsData]
  );

  const filteredProjects = useMemo(() =>
    selectedCategory === 'all'
      ? projectsData
      : projectsData.filter(project => project.category === selectedCategory),
    [selectedCategory, projectsData]
  );

  const allProjectImages = useMemo(() =>
    projectsData.flatMap(p => [p.thumbnail, ...p.images]),
    [projectsData]
  );

  const { ref: projectsRef, isImageLoaded } = useLazyLoadMultiple(allProjectImages, { threshold: 0.1, rootMargin: '200px' });

  return (
    <>
      <section ref={projectsRef} className="py-20 px-3 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Featured Projects</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Explore my work across different categories and technologies</p>
          </motion.div>

          <CategoryFilter
            categoriesWithCounts={categoriesWithCounts}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onCardClick={setSelectedProject}
                  isImageLoaded={isImageLoaded}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-foreground mb-2">No projects yet</h3>
              <p className="text-muted-foreground">Projects in this category are coming soon</p>
            </motion.div>
          )}

          <motion.div className="text-center mt-20" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <Link href="https://github.com/sarimAbdelbari" target="_blank" rel="noopener noreferrer">
              <motion.button className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl inline-flex items-center gap-2" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <span>View More on GitHub</span>
                <GithubIcon />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
            isImageLoaded={isImageLoaded}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Projects;