"use client";
import { motion } from "framer-motion";

export default function Skills() {
    const technologies = [
        { name: "React", icon: "⚛️", color: "text-blue-400" },
        { name: "Next.js", icon: "▲", color: "text-white" },
        { name: "Node.js", icon: "🟢", color: "text-green-400" },
        { name: "TypeScript", icon: "TS", color: "text-blue-500" },
        { name: "JavaScript", icon: "JS", color: "text-yellow-400" },
        { name: "MongoDB", icon: "🍃", color: "text-green-500" },
        { name: "PostgreSQL", icon: "🐘", color: "text-blue-600" },
        { name: "Express", icon: "🚀", color: "text-gray-300" },
        { name: "Tailwind", icon: "💨", color: "text-cyan-400" },
        { name: "Git", icon: "🔧", color: "text-orange-500" },
        { name: "Docker", icon: "🐳", color: "text-blue-400" },
        { name: "AWS", icon: "☁️", color: "text-orange-400" },
        { name: "Python", icon: "🐍", color: "text-yellow-300" },
        { name: "HTML5", icon: "🌐", color: "text-orange-500" },
        { name: "CSS3", icon: "🎨", color: "text-blue-500" },
        { name: "Firebase", icon: "🔥", color: "text-yellow-600" }
    ];

    // Duplicate the array to create seamless loop
    const duplicatedTechnologies = [...technologies, ...technologies];

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
                    Technologies I work with
                </motion.h2>
            </div>

            {/* Scrolling container */}
            <div className="flex items-center space-x-8 md:space-x-12 lg:space-x-16 relative z-0">
                <motion.div
                    className="flex space-x-8 md:space-x-12 lg:space-x-16"
                    animate={{
                        x: ["0%", "-50%"]
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    {duplicatedTechnologies.map((tech, index) => (
                        <motion.div
                            key={`${tech.name}-${index}`}
                            className="flex flex-col items-center space-y-2 min-w-fit"
                            whileHover={{ 
                                scale: 1.1, 
                                y: -5,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <span className="text-2xl md:text-3xl lg:text-4xl font-bold">
                                    {tech.icon}
                                </span>
                            </div>
                            <span className={`text-sm md:text-base font-medium ${tech.color} opacity-80 hover:opacity-100 transition-opacity duration-300`}>
                                {tech.name}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Floating particles effect */}
            {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-primary/20 rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.2, 0.5, 0.2],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 4 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </section>
    );
}
