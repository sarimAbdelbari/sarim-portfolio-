"use client";
import { motion } from "framer-motion";

export default function ComingSoonBlog() {
    const blogTopics = [
        { title: "React Best Practices", icon: "⚛️", category: "Frontend" },
        { title: "Node.js Performance Tips", icon: "🚀", category: "Backend" },
        { title: "Database Optimization", icon: "💾", category: "Database" },
        { title: "TypeScript Deep Dive", icon: "📘", category: "Language" },
        { title: "Full-Stack Architecture", icon: "🏗️", category: "Architecture" },
        { title: "API Design Patterns", icon: "🔗", category: "Backend" },
        { title: "Modern CSS Techniques", icon: "🎨", category: "Frontend" },
        { title: "DevOps Essentials", icon: "⚙️", category: "DevOps" },
        { title: "Code Review Guide", icon: "👀", category: "Best Practices" },
        { title: "Testing Strategies", icon: "🧪", category: "Testing" },
        { title: "Security Fundamentals", icon: "🔒", category: "Security" },
        { title: "Scaling Applications", icon: "📈", category: "Performance" }
    ];

    return (
        <section className="relative py-8 px-4 bg-muted/20 border-t border-border/50">
            <div className="max-w-7xl mx-auto">
                {/* Simple header */}
                <motion.div 
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                        Upcoming Blog Topics
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Here's what I'm planning to write about
                    </p>
                </motion.div>

                {/* Topics Grid - Simplified */}
                <motion.div 
                    className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {blogTopics.map((topic, index) => (
                        <motion.div
                            key={topic.title}
                            className="group relative"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ 
                                duration: 0.4, 
                                delay: 0.05 * index,
                                type: "spring",
                                stiffness: 120
                            }}
                            whileHover={{ 
                                scale: 1.05,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <div className="relative bg-background/80 backdrop-blur-sm border border-border/60 rounded-lg p-3 h-full transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-md hover:bg-background">
                                {/* Icon */}
                                <div className="text-2xl mb-2 text-center transform group-hover:scale-110 transition-transform duration-300">
                                    {topic.icon}
                                </div>
                                
                                {/* Category */}
                                <div className="text-xs font-medium text-primary/70 uppercase tracking-wider text-center mb-1">
                                    {topic.category}
                                </div>
                                
                                {/* Title */}
                                <h4 className="text-xs font-medium text-foreground/80 leading-tight text-center group-hover:text-foreground transition-colors duration-300">
                                    {topic.title}
                                </h4>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
} 