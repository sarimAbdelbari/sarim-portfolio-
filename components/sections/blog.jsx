"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useLazyLoadMultiple } from '@/components/hooks/useLazyLoad';
import { usePerformanceMode } from '@/components/hooks/usePerformanceMode';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Blog = () => {
  // Performance mode for mobile devices
  const { shouldReduceMotion } = usePerformanceMode();
  const [hoveredPost, setHoveredPost] = useState(null);
  const swiperRef = useRef(null);

  // Sample blog data
  const blogPosts = [
    {
      id: 1,
      title: "How ORM differs from ODM",
      description: "Object-Relational Mapping (ORM) and Object-Document Mapping (ODM) are two approaches to mapping between object-oriented programming languages and relational databases or document-oriented databases. They are used to simplify the interaction between the application and the database, making it easier to write code that is independent of the database.",
      date: "December 7, 2024",
      readTime: "5 min",
      category: "Database",
      slug: "how-orm-differs-from-odm",
      image: "/assets/images/blogs/ORMvsODM.webp"
    },
    {
      id: 2,
      title: "How i developed my own UML Diagram generator",
      description: "I developed my own UML Diagram generator using React and TypeScript. It is a simple tool that allows you to generate UML diagrams from a text description.",
      date: "October 28, 2025",
      readTime: "15 min",
      category: "Frontend",
      slug: "how-i-developed-my-own-uml-diagram-generator",
      image: "/assets/images/blogs/UMLDiagramGenerator.png"
    },
    {
      id: 3,
      title: "How SQL differs from NoSQL",
      description: "SQL and NoSQL are two different approaches to storing and querying data. SQL is a relational database management system (RDBMS) that uses tables to store data, while NoSQL is a non-relational database management system that uses documents to store data.",
      date: "October 10, 2025",
      readTime: "5 min",
      category: "Database",
      slug: "how-sql-differs-from-nosql",
      image: "/assets/images/blogs/SQLvsNoSQL.jpg"
    },
    {
      id: 4,
      title: "How Node Js Works multiple threads",
      description: "Node.js is a runtime environment that allows you to run JavaScript code outside of a browser. It is built on top of the V8 JavaScript engine and is designed to be fast and efficient.",
      date: "August 22, 2025",
      readTime: "5 min",
      category: "Backend",
      slug: "how-node-js-works-multiple-threads",
      image: "/assets/images/blogs/NodeJS-Tips.png"
    },
   
  ];

  // Extract all blog images for lazy loading
  const allBlogImages = blogPosts.map(post => post.image);
  
  // Use lazy loading hook for all blog images
  const { ref: blogRef, isInView, isImageLoaded } = useLazyLoadMultiple(allBlogImages, {
    threshold: 0.1,
    rootMargin: '200px' // Start loading when section is 200px away
  });

  // Loading placeholder component
  const ImagePlaceholder = ({ className }) => (
    <div className={`bg-muted animate-pulse rounded-xl ${className}`}>
      <div className="flex items-center justify-center h-full">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );

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
    <section ref={blogRef} className="min-h-screen py-16 px-3 lg:px-10 relative overflow-hidden">
      {/* Background Effects - Disabled on mobile for performance */}
      {!shouldReduceMotion && (
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
      )}

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
                    className="group h-full relative bg-background/60 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer "
                    whileHover={{ 
                      y: -8,
                      scale: 1.02
                    }}
                    onHoverStart={() => setHoveredPost(post.id)}
                    onHoverEnd={() => setHoveredPost(null)}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden border-4 border-background shadow-2xl rounded-2xl">
                      {isImageLoaded(post.image) ? (
                        <motion.img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover rounded-xl"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.4 }}
                        />
                      ) : (
                        <ImagePlaceholder className="w-full h-full rounded-xl" />
                      )}
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
                        <ArrowRight size={16} />
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
            <ChevronLeft size={20} />
          </motion.button>

          <motion.button
            className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-background/80 backdrop-blur-sm border border-border/50 rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={20} />
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
              <ArrowRight size={16} />
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