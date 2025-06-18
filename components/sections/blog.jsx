"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const Blog = () => {
  const [hoveredPost, setHoveredPost] = useState(null);

  // Sample blog data
  const blogPosts = [
    {
      id: 1,
      title: "Building Scalable React Applications",
      description: "Learn the best practices and patterns for creating maintainable React applications that scale with your team.",
      date: "2024-01-15",
      readTime: "8 min",
      category: "React",
      slug: "building-scalable-react-applications",
      featured: true
    },
    {
      id: 2,
      title: "Node.js Performance Tips",
      description: "Optimize your Node.js applications with these proven performance techniques and monitoring strategies.",
      date: "2024-01-10",
      readTime: "12 min",
      category: "Node.js",
      slug: "nodejs-performance-tips"
    },
    {
      id: 3,
      title: "Modern CSS Grid Layouts",
      description: "Master CSS Grid to create responsive, flexible layouts that work perfectly across all devices.",
      date: "2024-01-05",
      readTime: "6 min",
      category: "CSS",
      slug: "modern-css-grid-layouts"
    },
    {
      id: 4,
      title: "TypeScript Best Practices",
      description: "Write better, more maintainable code with these essential TypeScript patterns and techniques.",
      date: "2023-12-28",
      readTime: "10 min",
      category: "TypeScript",
      slug: "typescript-best-practices"
    }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.3 }
    }
  };

  const zigzagVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: { duration: 2, ease: "easeInOut" }
    }
  };

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8">
      <motion.div
        className="max-w-6xl mx-auto"
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
            Thoughts, tutorials, and insights about web development, technology, and building great software.
          </p>
        </motion.div>

        {/* Featured Post */}
        {blogPosts.filter(post => post.featured).map((post) => (
          <motion.div
            key={post.id}
            className="mb-16"
            variants={itemVariants}
          >
            <Link href={`/blog/${post.slug}`}>
              <motion.article
                className="group relative bg-background border border-border rounded-2xl p-6 md:p-8 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
                whileHover={{ y: -4 }}
                onHoverStart={() => setHoveredPost(post.id)}
                onHoverEnd={() => setHoveredPost(null)}
              >
                {/* Featured Badge */}
                <div className="absolute top-6 right-6">
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full uppercase tracking-wide">
                    Featured
                  </span>
                </div>

                <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                  {/* Content */}
                  <div className="md:col-span-2 space-y-4">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs font-medium">
                        {post.category}
                      </span>
                      <span>{formatDate(post.date)}</span>
                      <span>•</span>
                      <span>{post.readTime} read</span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                      {post.description}
                    </p>

                    <motion.div
                      className="flex items-center space-x-2 text-primary font-medium"
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

                  {/* Visual Element */}
                  <div className="md:col-span-1 flex items-center justify-center">
                    <motion.div
                      className="w-full h-32 md:h-40 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-primary text-4xl md:text-5xl font-bold opacity-60">
                        {post.category.charAt(0)}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.article>
            </Link>
          </motion.div>
        ))}

        {/* Regular Posts Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          variants={containerVariants}
        >
          {blogPosts.filter(post => !post.featured).map((post, index) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
            >
              <Link href={`/blog/${post.slug}`}>
                <motion.article
                  className="group bg-background border border-border rounded-xl p-6 hover:shadow-md transition-all duration-300 cursor-pointer h-full flex flex-col"
                  whileHover={{ y: -2 }}
                  onHoverStart={() => setHoveredPost(post.id)}
                  onHoverEnd={() => setHoveredPost(null)}
                >
                  {/* Category Icon */}
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-primary text-lg font-bold">
                        {post.category.charAt(0)}
                      </span>
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center space-x-3 text-xs text-muted-foreground mb-3">
                    <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded font-medium">
                      {post.category}
                    </span>
                    <span>{formatDate(post.date)}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-3 line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4 flex-grow line-clamp-3">
                    {post.description}
                  </p>

                  {/* Read More + Read Time */}
                  <div className="flex items-center justify-between">
                    <motion.div
                      className="flex items-center space-x-1 text-primary text-sm font-medium"
                      animate={{
                        x: hoveredPost === post.id ? 4 : 0
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <span>Read more</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14"/>
                        <path d="M12 5l7 7-7 7"/>
                      </svg>
                    </motion.div>
                    
                    <span className="text-xs text-muted-foreground">
                      {post.readTime} read
                    </span>
                  </div>
                </motion.article>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Posts CTA */}
        <motion.div 
          className="text-center"
          variants={itemVariants}
        >
          <Link href="/blog">
            <motion.button
              className="inline-flex items-center space-x-2 px-6 md:px-8 py-3 md:py-4 bg-primary text-primary-foreground rounded-xl text-sm md:text-base font-medium hover:bg-primary/90 transition-all duration-300 shadow-sm hover:shadow-md"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>View All Posts</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14"/>
                <path d="M12 5l7 7-7 7"/>
              </svg>
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Blog;