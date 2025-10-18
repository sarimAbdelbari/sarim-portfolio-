"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";

export default function Hero() {
    // For the typing effect
    const [text, setText] = useState("");
    const fullText = ["A Fullstack Developer", "A React Enthusiast", "A NextJS Advocate", "A NodeJS Backend Developer"];
    const [textIndex, setTextIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showCursor, setShowCursor] = useState(true);

    // Background skills array with pre-generated random values
    const backgroundSkills = useMemo(() => [
        { text: "Clean Code", fontSize: 24, left: 15, top: 20, duration: 25, moveX: 30, moveY: 20, rotate: 3 },
        { text: "System Design", fontSize: 18, left: 80, top: 15, duration: 30, moveX: -25, moveY: 35, rotate: -2 },
        { text: "UI Friendly", fontSize: 22, left: 10, top: 60, duration: 28, moveX: 40, moveY: -15, rotate: 4 },
        { text: "API Development", fontSize: 20, left: 70, top: 70, duration: 26, moveX: -30, moveY: -25, rotate: -3 },
        { text: "Database Design", fontSize: 19, left: 25, top: 80, duration: 32, moveX: 20, moveY: 30, rotate: 2 },
        { text: "Performance", fontSize: 21, left: 85, top: 40, duration: 27, moveX: -35, moveY: 15, rotate: -4 },
        { text: "Security", fontSize: 23, left: 5, top: 35, duration: 29, moveX: 45, moveY: -20, rotate: 3 },
        { text: "Scalability", fontSize: 17, left: 60, top: 25, duration: 31, moveX: -20, moveY: 40, rotate: -2 },
        { text: "Code Review", fontSize: 20, left: 30, top: 10, duration: 24, moveX: 25, moveY: 30, rotate: 4 },
        { text: "Testing", fontSize: 18, left: 90, top: 60, duration: 33, moveX: -40, moveY: -10, rotate: -3 },
        { text: "DevOps", fontSize: 22, left: 40, top: 85, duration: 26, moveX: 15, moveY: -35, rotate: 2 },
        { text: "Git Workflow", fontSize: 19, left: 75, top: 5, duration: 28, moveX: -30, moveY: 25, rotate: -4 },
        { text: "Problem Solving", fontSize: 21, left: 20, top: 50, duration: 30, moveX: 35, moveY: 20, rotate: 3 },
        { text: "Team Work", fontSize: 18, left: 65, top: 90, duration: 25, moveX: -25, moveY: -30, rotate: -2 },
        { text: "Innovation", fontSize: 20, left: 50, top: 30, duration: 27, moveX: 20, moveY: 35, rotate: 4 },
        { text: "Best Practices", fontSize: 16, left: 95, top: 75, duration: 29, moveX: -45, moveY: 10, rotate: -3 }
    ], []);

    useEffect(() => {
        const currentText = fullText[textIndex];
        
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (charIndex < currentText.length) {
                    setText(currentText.substring(0, charIndex + 1));
                    setCharIndex(charIndex + 1);
                } else {
                    setTimeout(() => setIsDeleting(true), 1500);
                }
            } else {
                if (charIndex > 0) {
                    setText(currentText.substring(0, charIndex - 1));
                    setCharIndex(charIndex - 1);
                } else {
                    setIsDeleting(false);
                    setTextIndex((textIndex + 1) % fullText.length);
                }
            }
        }, isDeleting ? 50 : 100);

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, textIndex, fullText]);

    useEffect(() => {
        const interval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 530);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="min-h-screen flex justify-center items-center flex-col lg:flex-row gap-12 px-3 lg:px-10 py-16 overflow-hidden mt-16 lg:mt-0 relative">
            
            {/* Animated Background Skills */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
    {backgroundSkills.map((skill, index) => (
        <motion.div
            key={skill.text}
            className="absolute text-muted-foreground/50 font-semibold select-none"
            style={{
                fontSize: `${skill.fontSize}px`,
                left: `${skill.left}%`,
                top: `${skill.top}%`,
            }}
            animate={{
                x: [0, skill.moveX, 0, -skill.moveX, 0],
                y: [0, skill.moveY, 0, -skill.moveY, 0],
                opacity: [0.1, 0.3, 0.1, 0.3, 0.1],
                rotate: [0, skill.rotate, 0, -skill.rotate, 0],
            }}
            transition={{
                duration: skill.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.3,
            }}
        >
            {skill.text}
        </motion.div>
    ))}
</div>

            {/* Left Content */}
            <motion.div 
                className="flex justify-center items-start gap-4 flex-col max-w-xl relative z-10"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <motion.p 
                    className="text-primary text-lg md:text-xl font-medium tracking-wide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    Salam, my name is
                </motion.p>
                
                <motion.h1 
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-9"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                >
                    Sarim Kerroucha <br/> <span className="text-secondary text-lg">Full-Stack Developer</span>
                </motion.h1>
                
                <motion.h2 
                    className="text-xl md:text-2xl font-medium text-primary flex"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                >
                    {text}
                    <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span>
                </motion.h2>
                
                <motion.p 
                    className="text-muted-foreground mt-3 text-sm md:text-base leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                >
                    I am a Full-Stack Developer with a passion for delivering exceptional results.
                    With my expertise in React and NextJS on the frontend, and NodeJS, and Express on the backend, 
                    I bring a unique combination of technical skills and creative problem-solving to every project I work on.
                    <br/>
                    <br/>
                    <motion.span className="text-foreground font-medium tracking-wide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }} >   I'm not just a developer—I code like I'm in a Ghibli movie. 🎋✨</motion.span>
                </motion.p>
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.3 }}
                    className="mt-4 flex flex-col sm:flex-row gap-4"
                >
                    <Button 
                        variant="default" 
                        size="lg" 
                        className="relative rounded-full px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-medium cursor-pointer bg-gradient-to-r from-[#1a5fb8] via-[#1e70ca] to-[#3a85d9] text-white border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden"
                        onClick={() => window.location.href = 'mailto:sarimabdelbari@gmail.com'}
                    >
                        {/* Animated glow background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#1a5fb8] via-[#1e70ca] to-[#3a85d9] opacity-75 blur-xl group-hover:opacity-100 transition-all duration-300" />
                        
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
                        
                        {/* Button content */}
                        <span className="relative z-10 flex items-center gap-2">
                            Contact Me
                            <motion.svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="20" 
                                height="20" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                                className="group-hover:translate-x-1 transition-transform duration-300"
                                animate={{ 
                                    x: [0, 3, 0],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <path d="m3 3 3 9-3 9 19-9Z"/>
                                <path d="m6 12 13 0"/>
                            </motion.svg>
                        </span>
                        
                        {/* Pulsing glow ring */}
                        <motion.div 
                            className="absolute inset-0 rounded-full border-2 border-white/30"
                            animate={{ 
                                scale: [1, 1.1, 1],
                                opacity: [0.5, 0.8, 0.5]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </Button>
                    <Button 
                        variant="outline" 
                        size="lg" 
                        className="relative rounded-full px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-medium cursor-pointer bg-background/80 backdrop-blur-sm text-foreground border-2 border-primary/40 shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden hover:border-primary hover:bg-primary/5"
                        onClick={() => window.open('https://drive.google.com/file/d/1i3Ca4eqr8GafWu6EsI8p39ermS8k59s_/view?usp=drive_link', '_blank', 'noopener,noreferrer')}
                    >
                        {/* Animated glow background */}
                        <div className="absolute inset-0 bg-primary/5 blur-xl group-hover:bg-primary/10 transition-all duration-300" />
                        
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
                        
                        {/* Button content */}
                        <span className="relative z-10 flex items-center gap-2">
                            View Resume
                            <motion.svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="20" 
                                height="20" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                                className="group-hover:scale-110 transition-transform duration-300"
                                animate={{ 
                                    scale: [1, 1.05, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.5
                                }}
                            >
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14,2 14,8 20,8"/>
                                <line x1="16" y1="13" x2="8" y2="13"/>
                                <line x1="16" y1="17" x2="8" y2="17"/>
                                <polyline points="10,9 9,9 8,9"/>
                            </motion.svg>
                        </span>
                        
                        {/* Pulsing glow ring */}
                        <motion.div 
                            className="absolute inset-0 rounded-full border-2 border-primary/20"
                            animate={{ 
                                scale: [1, 1.05, 1],
                                opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.5
                            }}
                        />
                    </Button>
                </motion.div>
            </motion.div>
            
            {/* Right Image */}
            <motion.div
                className="relative z-10"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                {/* Decorative elements */}
                <motion.div 
                    className="absolute -z-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl"
                    animate={{ 
                        x: [0, 10, 0, -10, 0],
                        y: [0, -10, 0, 10, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                
                
                {/* Main image with floating animation */}
                <motion.div
                    className="relative z-10 overflow-hidden rounded-2xl border-4 border-background shadow-xl"
                    animate={{ 
                        y: [0, -10, 0, 10, 0],
                        rotate: [0, 1, 0, -1, 0]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <Image 
                        src="/assets/images/GuibleHero.png" 
                        alt="Sarim Kerroucha" 
                        width={384}
                        height={384}
                        className="w-72 md:w-80 lg:w-96 h-auto object-cover"
                        priority={true}
                        loading="eager"
                    />
                    
                    {/* Tech stack floating elements */}
                    <motion.div 
                        className="absolute -right-4 -bottom-4 bg-background p-3 rounded-lg shadow-lg border border-border"
                        animate={{ 
                            y: [0, 5, 0, -5, 0],
                            x: [0, -5, 0, 5, 0],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1
                        }}
                    >
                        <Image 
                            src="/assets/svg/reactjs-svgrepo-com.svg" 
                            alt="React" 
                            width={24}
                            height={24}
                            className="w-6 h-6 text-primary"
                            style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(100%) saturate(7500%) hue-rotate(210deg) brightness(100%) contrast(100%)' }}
                        />
                    </motion.div>

                    <motion.div 
                        className="absolute -left-4 top-6 bg-background p-3 rounded-lg shadow-lg border border-border"
                        animate={{ 
                            y: [0, -5, 0, 5, 0],
                            x: [0, 5, 0, -5, 0],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5
                        }}
                    >
                        <Image 
                            src="/assets/svg/nextjs-svgrepo-com.svg" 
                            alt="NextJS" 
                            width={24}
                            height={24}
                            className="w-6 h-6"
                            style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(100%) saturate(7500%) hue-rotate(210deg) brightness(100%) contrast(100%)' }}
                        />
                    </motion.div>

                    <motion.div 
                        className="absolute right-6 top-4 bg-background p-3 rounded-lg shadow-lg border border-border"
                        animate={{ 
                            y: [0, 8, 0, -8, 0],
                            rotate: [0, 5, 0, -5, 0]
                        }}
                        transition={{
                            duration: 7,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 2
                        }}
                    >
                        <Image 
                            src="/assets/svg/nodejs-svgrepo-com.svg" 
                            alt="NodeJS" 
                            width={24}
                            height={24}
                            className="w-6 h-6"
                            style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(100%) saturate(7500%) hue-rotate(210deg) brightness(100%) contrast(100%)' }}
                        />
                    </motion.div>

                    <motion.div 
                        className="absolute -left-6 bottom-8 bg-background p-3 rounded-lg shadow-lg border border-border"
                        animate={{ 
                            y: [0, -6, 0, 6, 0],
                            x: [0, 3, 0, -3, 0],
                            rotate: [0, -3, 0, 3, 0]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1.5
                        }}
                    >
                        <Image 
                            src="/assets/svg/typescript-official-svgrepo-com.svg" 
                            alt="TypeScript" 
                            width={24}
                            height={24}
                            className="w-6 h-6"
                            style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(100%) saturate(7500%) hue-rotate(210deg) brightness(100%) contrast(100%)' }}
                        />
                    </motion.div>

                   
                </motion.div>
            </motion.div>

             <motion.div 
                        className="absolute  hover:scale-110 transition-transform duration-300 bottom-2 cursor-pointer bg-background p-3 rounded-lg shadow-lg border border-border"
                        animate={{ 
                            y: [0, -6, 0, 6, 0],
                            x: [0, 3, 0, -3, 0],
                            rotate: [0, -3, 0, 3, 0]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5
                        }}
                        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                    >
                        <Image 
                            src="/assets/svg/mouse-cursor-click-svgrepo-com.svg" 
                            alt="Scroll down" 
                            width={24}
                            height={24}
                            className="w-6 h-6"
                            style={{ filter: 'brightness(80) saturate(100%) invert(27%) sepia(100%) saturate(7500%) hue-rotate(210deg) brightness(100%) contrast(100%)' }}
                        />
            </motion.div>
        </section>
    );
}