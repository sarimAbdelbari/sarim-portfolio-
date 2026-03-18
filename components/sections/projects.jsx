"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import { useLazyLoadMultiple } from '@/components/hooks/useLazyLoad';
import { projectsData, categories } from '@/lib/data';
import {
  Github,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
  Search,
  Shield,
  Lock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// --- Helper Components ---

const ImagePlaceholder = ({ className }) => (
  <div className={`bg-muted/20 animate-pulse ${className}`}>
    <div className="flex items-center justify-center h-full">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  </div>
);

// --- Main Components ---

const CategoryFilter = ({ categoriesWithCounts, selectedCategory, onSelectCategory }) => (
  <motion.div
    className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
  >
    {categoriesWithCounts.map((category) => {
      const Icon = LucideIcons[category.icon];
      const isActive = selectedCategory === category.id;
      return (
        <motion.button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={`px-3 py-2 md:px-5 md:py-2.5 text-xs md:text-sm rounded-full font-medium transition-all duration-300 flex items-center gap-2 border ${
            isActive
              ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 border-primary'
              : 'bg-background text-muted-foreground hover:bg-muted/40 hover:text-foreground border-border'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {Icon && <Icon size={15} />}
          <span>{category.name}</span>
          <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center ${
            isActive ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            {category.count}
          </span>
        </motion.button>
      );
    })}
  </motion.div>
);

const ProjectCard = ({ project, onCardClick, isImageLoaded }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.35 }}
    className="group cursor-pointer"
    onClick={() => onCardClick(project)}
  >
    <div className="relative bg-card rounded-2xl overflow-hidden border border-border shadow-md hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col">

      {/* Image area */}
      <div className="relative aspect-video overflow-hidden bg-black">
        {/* Blurred backdrop prevents letterbox bars on non-cropped screenshots */}
        {isImageLoaded(project.thumbnail) && !project.isPrivate && (
          <Image
            src={project.thumbnail}
            alt=""
            aria-hidden
            fill
            className="object-cover scale-110 blur-xl opacity-40 pointer-events-none select-none"
          />
        )}
        {isImageLoaded(project.thumbnail) ? (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className={`object-contain relative z-10 transition-transform duration-500 group-hover:scale-105 ${project.isPrivate ? 'blur-sm scale-110' : ''}`}
          />
        ) : (
          <ImagePlaceholder className="w-full h-full" />
        )}

        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top badges row */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 z-10">
          {project.isPrivate ? (
            <span className="flex items-center gap-1 px-2.5 py-1 bg-destructive/90 backdrop-blur-sm text-destructive-foreground text-xs font-bold rounded-full">
              <Shield size={11} />
              NDA / Private
            </span>
          ) : project.featured ? (
            <span className="px-2.5 py-1 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-bold rounded-full">
              Featured
            </span>
          ) : (
            <span />
          )}

          <span className="px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium rounded-full shrink-0">
            {project.year}
          </span>
        </div>

        {/* Hover action hint */}
        {!project.isPrivate && (
          <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            {project.liveUrl && (
              <span className="px-3 py-1.5 bg-white/15 backdrop-blur-sm text-white text-xs font-medium rounded-lg">
                Live Demo
              </span>
            )}
            <span className="px-3 py-1.5 bg-white/15 backdrop-blur-sm text-white text-xs font-medium rounded-lg">
              View Details
            </span>
          </div>
        )}
      </div>

      {/* Card content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base md:text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-tight line-clamp-2">
            {project.title}
          </h3>
        </div>

        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech, i) => (
            <span key={i} className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-md">
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs font-medium rounded-md">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 pt-1 mt-auto">
          {project.isPrivate ? (
            <Button variant="outline" size="sm" className="flex-1 text-xs" disabled>
              <Lock size={12} className="mr-1.5" />
              Confidential
            </Button>
          ) : (
            <>
              {project.liveUrl && (
                <Button
                  variant="default"
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={(e) => { e.stopPropagation(); window.open(project.liveUrl, '_blank', 'noopener,noreferrer'); }}
                >
                  <ExternalLink size={12} className="mr-1.5" />
                  Live Demo
                </Button>
              )}
              {project.githubUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={(e) => { e.stopPropagation(); window.open(project.githubUrl, '_blank', 'noopener,noreferrer'); }}
                >
                  <Github size={12} className="mr-1.5" />
                  Code
                </Button>
              )}
              {!project.liveUrl && !project.githubUrl && (
                <Button variant="ghost" size="sm" className="flex-1 text-xs" disabled>
                  View Details
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  </motion.div>
);

const ImageSwiper = ({ images, isImageLoaded, isPrivate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const currentSrc = images[currentIndex];
  const loaded = isImageLoaded(currentSrc);

  return (
    <div className="relative w-full aspect-video overflow-hidden bg-black">
      {/* Blurred backdrop — same image scaled up, fills dead space without cropping the main image */}
      {loaded && !isPrivate && (
        <Image
          src={currentSrc}
          alt=""
          aria-hidden
          fill
          className="object-cover scale-110 blur-2xl opacity-50 pointer-events-none select-none"
          priority={false}
        />
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full h-full z-10"
        >
          {loaded ? (
            <Image
              src={currentSrc}
              alt={`Project image ${currentIndex + 1}`}
              fill
              className={`object-contain ${isPrivate ? 'blur-lg scale-105' : ''}`}
            />
          ) : (
            <ImagePlaceholder className="w-full h-full" />
          )}
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && !isPrivate && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 backdrop-blur-sm hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-all shadow-lg z-20"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 backdrop-blur-sm hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-all shadow-lg z-20"
          >
            <ChevronRight size={18} />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(index); }}
                className={`h-1.5 rounded-full transition-all ${index === currentIndex ? 'bg-white w-5' : 'bg-white/40 w-1.5'}`}
              />
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
      transition={{ duration: 0.25 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[100] flex items-center justify-center p-2 md:p-4 lg:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 40 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-background rounded-2xl md:rounded-3xl w-full max-w-6xl max-h-[95vh] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.5)] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Full-bleed image header — visible on all screen sizes */}
        <div className="relative w-full" style={{ aspectRatio: '16/7' }}>
          <ImageSwiper
            images={project.images}
            isImageLoaded={isImageLoaded}
            isPrivate={project.isPrivate}
          />

          {/* Top-left badge */}
          <div className="absolute top-4 left-4 z-20 flex gap-2">
            {project.isPrivate ? (
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-destructive/90 backdrop-blur-sm text-destructive-foreground text-xs font-bold rounded-full shadow-lg">
                <Shield size={12} />
                NDA / Private
              </span>
            ) : project.featured ? (
              <span className="px-3 py-1.5 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-bold rounded-full shadow-lg">
                Featured
              </span>
            ) : null}
          </div>

          {/* Close button — top right, always visible */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white transition-colors shadow-lg"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {/* Year pill */}
          <span className="absolute bottom-4 right-4 z-20 px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
            {project.year}
          </span>
        </div>

        {/* Scrollable content body */}
        <div className="overflow-y-auto flex-1">
          {/* Private project notice */}
          {project.isPrivate && (
            <div className="mx-6 md:mx-8 mt-6 p-4 bg-destructive/8 border border-destructive/20 rounded-xl flex items-start gap-3">
              <Shield size={20} className="text-destructive shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground mb-0.5">Private Enterprise Project</h4>
                <p className="text-sm text-muted-foreground">
                  This project was developed for Groupe Chiali under NDA. Screenshots and sensitive implementation details are confidential.
                </p>
              </div>
            </div>
          )}

          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left — title + description */}
            <div className="md:col-span-2 flex flex-col gap-4">
              <div>
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                    {project.title}
                  </h3>
                  {project.isPrivate && (
                    <span className="flex items-center gap-1 px-2.5 py-1 bg-destructive/10 text-destructive text-xs font-semibold rounded-full border border-destructive/20">
                      <Shield size={10} />
                      NDA
                    </span>
                  )}
                </div>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Action buttons */}
              {!project.isPrivate ? (
                <div className="flex gap-3 pt-2 flex-wrap">
                  {project.liveUrl && (
                    <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <motion.button
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-lg shadow-primary/20"
                        whileHover={{ scale: 1.03, y: -1 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <ExternalLink size={16} />
                        View Live Site
                      </motion.button>
                    </Link>
                  )}
                  {project.githubUrl && (
                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <motion.button
                        className="px-6 py-3 bg-muted/50 text-foreground rounded-xl text-sm font-semibold hover:bg-muted/80 transition-colors flex items-center gap-2 border border-border"
                        whileHover={{ scale: 1.03, y: -1 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <Github size={16} />
                        Source Code
                      </motion.button>
                    </Link>
                  )}
                </div>
              ) : (
                <div className="pt-2">
                  <Button variant="outline" disabled className="gap-2">
                    <Lock size={14} />
                    Confidential — Not Available Publicly
                  </Button>
                </div>
              )}
            </div>

            {/* Right — tech stack */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-muted/40 text-foreground text-xs font-medium rounded-lg border border-border hover:border-primary/40 hover:bg-primary/5 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
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
      count: cat.id === 'all'
        ? projectsData.length
        : projectsData.filter(p => p.category === cat.id).length
    })),
    []
  );

  const filteredProjects = useMemo(() =>
    selectedCategory === 'all'
      ? projectsData
      : projectsData.filter(project => project.category === selectedCategory),
    [selectedCategory]
  );

  const allProjectImages = useMemo(() =>
    projectsData.flatMap(p => [p.thumbnail, ...p.images]),
    []
  );

  const { ref: projectsRef, isImageLoaded } = useLazyLoadMultiple(allProjectImages, {
    threshold: 0.1,
    rootMargin: '200px'
  });

  return (
    <>
      <section ref={projectsRef} className="py-20 px-3 lg:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              My Projects
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              A collection of work spanning SaaS tools, enterprise systems, digital commerce, and more
            </p>
          </motion.div>

          {/* Category filter */}
          <CategoryFilter
            categoriesWithCounts={categoriesWithCounts}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* Project grid — responsive masonry */}
          <AnimatePresence mode="wait">
            {filteredProjects.length > 0 ? (
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
              >
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.07 }}
                  >
                    <ProjectCard
                      project={project}
                      onCardClick={setSelectedProject}
                      isImageLoaded={isImageLoaded}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-24"
              >
                <Search size={56} className="mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="text-xl font-bold text-foreground mb-2">No projects found</h3>
                <p className="text-muted-foreground text-sm">Try selecting a different category</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* GitHub CTA */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link href="https://github.com/sarimAbdelbari" target="_blank" rel="noopener noreferrer">
              <motion.button
                className="px-8 py-3.5 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl inline-flex items-center gap-2 text-sm md:text-base"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={18} />
                View More on GitHub
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Project modal */}
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
