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

    // Duplicate the array to create seamless loop
    const duplicatedTopics = [...blogTopics, ...blogTopics];

    return (
        <section className="h-[25vh] flex items-center justify-center overflow-hidden bg-gradient-to-r from-background via-background/95 to-background relative">
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none" />
            
            {/* Section title */}
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20 my-2">
                <motion.h2 
                    className="text-lg md:text-xl font-semibold text-muted-foreground text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Coming Soon - Blog Posts
                </motion.h2>
                <motion.p 
                    className="text-sm text-muted-foreground/70 text-center mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Sharing knowledge & experiences
                </motion.p>
            </div>

            {/* Scrolling container */}
            <div className="flex items-center space-x-6 md:space-x-8 lg:space-x-10 relative z-0">
                <motion.div
                    className="flex space-x-6 md:space-x-8 lg:space-x-10"
                    animate={{
                        x: ["-50%", "0%"]
                    }}
                    transition={{
                        duration: 35,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    {duplicatedTopics.map((topic, index) => (
                        <motion.div
                            key={`${topic.title}-${index}`}
                            className="flex flex-col items-center space-y-2 min-w-fit relative group cursor-pointer"
                            whileHover={{ 
                                scale: 1.05, 
                                y: -3,
                                transition: { duration: 0.2 }
                            }}
                        >
                            {/* Coming soon badge */}
                            <div className="absolute -top-2 -right-2 bg-primary/20 text-primary text-xs px-2 py-1 rounded-full border border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                Soon
                            </div>
                            
                            <div className="w-16 h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-lg bg-background/60 backdrop-blur-sm border border-border/50 flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 group-hover:border-primary/30">
                                <span className="text-lg md:text-xl lg:text-2xl mb-1">
                                    {topic.icon}
                                </span>
                                <span className="text-xs text-primary/70 font-medium">
                                    {topic.category}
                                </span>
                            </div>
                            
                            <div className="text-center max-w-20">
                                <span className="text-xs md:text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-300 leading-tight block">
                                    {topic.title}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Floating code elements */}
            {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute text-primary/10 font-mono text-sm select-none"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -15, 0],
                        opacity: [0.1, 0.3, 0.1],
                        rotate: [0, 5, 0],
                    }}
                    transition={{
                        duration: 6 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 3,
                        ease: "easeInOut"
                    }}
                >
                    {['{ }', '< />', '[ ]', '( )', '=>', '&&', '||', '??'][i]}
                </motion.div>
            ))}

            {/* Central notification dot */}
            <motion.div 
                className="absolute right-6 top-6 w-3 h-3 bg-primary rounded-full shadow-lg"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </section>
    );
} 