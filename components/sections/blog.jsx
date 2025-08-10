"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Blog = () => {
  const [hoveredPost, setHoveredPost] = useState(null);
  const swiperRef = useRef(null);

  // Sample blog data
  const blogPosts = [
    {
      id: 1,
      title: "How Do I Develop My Terminal Portfolio Website with React",
      description: "Developing a terminal-like website using ReactJS, TypeScript and Styled-Components. Includes features like autocomplete, multiple themes, command...",
      date: "June 9, 2022",
      readTime: "8 min",
      category: "React",
      slug: "building-scalable-react-applications",
      image: "/assets/images/projects/PortfolioProject1.png"
    },
    {
      id: 2,
      title: "How Do I Develop My Portfolio Website & Blog",
      description: "My journey about planning, designing and developing my very first portfolio website and my personal blog. Thoughts about my motivation for this project and experiences.",
      date: "March 25, 2022",
      readTime: "12 min",
      category: "Portfolio",
      slug: "nodejs-performance-tips",
      image: "/assets/images/projects/PortfolioProject2.png"
    },
    {
      id: 3,
      title: "Haru Fashion ecommerce",
      description: "Myanmar language e-commerce အတွက် Haru Fashion အတွက် e-commerce အတွက်ခုနစ်တစ်ရေ အတွေ့အကြံု technologies စတင်လုပ်ငန်း",
      date: "March 20, 2022",
      readTime: "6 min",
      category: "E-commerce",
      slug: "modern-css-grid-layouts",
      image: "/assets/images/projects/mvpro.png"
    },
    {
      id: 4,
      title: "VitaLife Health Platform",
      description: "A comprehensive health platform built with modern web technologies, focusing on user experience and medical data management.",
      date: "February 15, 2022",
      readTime: "10 min",
      category: "Healthcare",
      slug: "typescript-best-practices",
      image: "/assets/images/projects/VitaLife.png"
    },
    {
      id: 5,
      title: "Feather Design System",
      description: "Building a scalable design system for modern web applications with React components and design tokens.",
      date: "January 28, 2022",
      readTime: "15 min",
      category: "Design System",
      slug: "feather-design-system",
      image: "/assets/images/projects/Feather1.jpg"
    }
  ];

  const formatDate = (dateString) => {
    return dateString;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section className="min-h-screen py-16 px-3 lg:px-10 relative overflow-hidden">
      {/* Background Effects - matching hero and aboutMe */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-l from-primary/8 via-primary/4 to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 25, 0],
            scale: [1, 0.8, 1],
            rotate: [0, -180, -360]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${20 + i * 10}%`,
              top: `${30 + i * 8}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="h-full w-full" style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }} />
        </div>
      </div>

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <motion.div
            className="inline-block mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium uppercase tracking-wide">
              Latest Posts
            </span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Blog
          </h2>
          
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            I write blog posts about what I've done and what I'm doing as a documenting practice. Here are some of my recent blog posts.
          </p>
        </motion.div>

        {/* Blog Swiper */}
        <motion.div
          className="relative"
          variants={itemVariants}
        >
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              prevEl: '.swiper-button-prev-custom',
              nextEl: '.swiper-button-next-custom',
            }}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet-custom',
              bulletActiveClass: 'swiper-pagination-bullet-active-custom',
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="blog-swiper pb-16"
          >
            {blogPosts.map((post) => (
              <SwiperSlide key={post.id}>
                <Link href="/blog">
                  <motion.article
                    className="group relative bg-background/60 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer h-full"
                    whileHover={{ 
                      y: -8,
                      scale: 1.02
                    }}
                    onHoverStart={() => setHoveredPost(post.id)}
                    onHoverEnd={() => setHoveredPost(null)}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <motion.img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-semibold rounded-full uppercase tracking-wide backdrop-blur-sm">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      {/* Date and Read Time */}
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{formatDate(post.date)}</span>
                        <span>•</span>
                        <span>{post.readTime} read</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-3">
                        {post.description}
                      </p>

                      {/* Read More */}
                      <motion.div
                        className="flex items-center space-x-2 text-primary font-medium text-sm"
                        animate={{
                          x: hoveredPost === post.id ? 8 : 0
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <span>Read more</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14"/>
                          <path d="M12 5l7 7-7 7"/>
                        </svg>
                      </motion.div>
                    </div>

                    {/* Decorative Glow */}
                    <div className="absolute -inset-1 bg-primary/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                  </motion.article>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <motion.button
            className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-background/80 backdrop-blur-sm border border-border/50 rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </motion.button>

          <motion.button
            className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-background/80 backdrop-blur-sm border border-border/50 rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </motion.button>
        </motion.div>

        {/* View All Posts CTA */}
        <motion.div 
          className="text-center mt-12"
          variants={itemVariants}
        >
          <Link href="/blog">
            <motion.button
              className="inline-flex items-center space-x-2 px-6 md:px-8 py-3 md:py-4 bg-primary text-primary-foreground rounded-xl text-sm md:text-base font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Read all blog posts</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14"/>
                <path d="M12 5l7 7-7 7"/>
              </svg>
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      <style jsx global>{`
        .blog-swiper .swiper-pagination {
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          position: absolute;
          width: auto;
          display: flex;
          justify-content: center;
          gap: 8px;
        }
        
        .swiper-pagination-bullet-custom {
          width: 12px;
          height: 12px;
          background: hsl(var(--muted-foreground));
          border-radius: 50%;
          opacity: 0.3;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .swiper-pagination-bullet-active-custom {
          background: hsl(var(--primary));
          opacity: 1;
          transform: scale(1.2);
        }
        
        .swiper-pagination-bullet-custom:hover {
          opacity: 0.7;
          transform: scale(1.1);
        }
      `}</style>
    </section>
  );
};

export default Blog;