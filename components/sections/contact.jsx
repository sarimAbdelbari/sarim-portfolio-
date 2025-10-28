"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePerformanceMode } from "@/components/hooks/usePerformanceMode";
import { Github, Linkedin, Facebook, Instagram, Send } from "lucide-react";

const Contact = () => {
  // Performance mode for mobile devices
  const { shouldReduceMotion } = usePerformanceMode();
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/sarimAbdelbari",
      icon: <Github size={24} />
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/sarim-kerroucha",
      icon: <Linkedin size={24} />
    },
    {
      name: "Dev.to",
      url: "https://dev.to/sarimkerroucha",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6.1v4.36h.48c.38 0 .66-.07.84-.23.18-.16.27-.42.27-.78v-2.34c0-.36-.09-.62-.27-.78zm15.44-8.83A2.41 2.41 0 0 0 20.44 0H3.56a2.41 2.41 0 0 0-2.42 2.42v19.16A2.41 2.41 0 0 0 3.56 24h16.88a2.41 2.41 0 0 0 2.42-2.42V2.42zM8.21 15.74c-.25.24-.54.43-.88.57-.34.14-.73.21-1.17.21H4.8V7.48h1.38c.44 0 .83.07 1.17.21.34.14.63.33.88.57.25.24.44.53.57.87.13.34.2.72.2 1.13v3.98c0 .41-.07.79-.2 1.13a2.3 2.3 0 0 1-.57.87zm6.89-2.58v-1.09h-2.5v1.09h.9v3.24h-.9v1.09h2.5v-1.09h-.9v-3.24h.9zm4.25 0v-1.09h-2.5v1.09h.9v3.24h-.9v1.09h2.5v-1.09h-.9v-3.24h.9z"/>
        </svg>
      )
    },
    {
      name: "Facebook",
      url: "https://facebook.com/sarimkerroucha",
      icon: <Facebook size={24} />
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/sarimabdebari",
      icon: <Instagram size={24} />
    },
    {
      name: "X",
      url: "https://x.com/sarimabdebari",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    }
  ];

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

  const zigzagVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: { duration: 1.5, ease: "easeInOut" }
    }
  };

  return (
    <section className="min-h-screen py-16 px-3 lg:px-10 relative overflow-hidden">
      {/* Enhanced Background Effects - Disabled on mobile for performance */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Large animated gradient orbs */}
          <motion.div
            className="absolute top-10 left-5 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-primary/12 via-primary/6 to-transparent blur-3xl"
            animate={{
              x: [0, 60, 0],
              y: [0, -40, 0],
              scale: [1, 1.3, 1],
              rotate: [0, 120, 240, 360]
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute bottom-10 right-5 w-[400px] h-[400px] rounded-full bg-gradient-to-l from-primary/10 via-primary/5 to-transparent blur-3xl"
            animate={{
              x: [0, -50, 0],
              y: [0, 30, 0],
              scale: [1, 0.7, 1],
              rotate: [0, -120, -240, -360]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          />

          {/* Medium orbs */}
          <motion.div
            className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-primary/8 to-transparent blur-2xl"
            animate={{
              x: [0, 40, 0],
              y: [0, -25, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />

        {/* Floating geometric shapes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute ${i % 2 === 0 ? 'w-3 h-3 rounded-full bg-primary/15' : 'w-2 h-2 rotate-45 bg-primary/20'}`}
            style={{
              left: `${15 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.3, 1],
              rotate: i % 2 === 0 ? [0, 360] : [45, 405]
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8
            }}
          />
        ))}

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-primary/[0.01] to-primary/[0.03] opacity-50" />

        {/* Subtle mesh pattern */}
        <div className="absolute inset-0 opacity-[0.015]">
          <div className="h-full w-full" style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, currentColor 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px, 40px 40px'
          }} />
        </div>

        {/* Animated light rays */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-1 h-32 bg-gradient-to-b from-primary/20 to-transparent blur-sm"
          animate={{
            rotate: [0, 360],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ transformOrigin: 'center bottom' }}
        />
        
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-1 h-24 bg-gradient-to-t from-primary/15 to-transparent blur-sm"
          animate={{
            rotate: [180, 540],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 5
          }}
          style={{ transformOrigin: 'center top' }}
        />
      </div>
      )}

      <motion.div
        className="max-w-4xl mx-auto relative z-10 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Section Header */}
        <motion.div 
          className="mb-16"
          variants={itemVariants}
        >
         

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            <span className="border-b-4 border-primary pb-2">Contact</span>
          </h2>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          className="space-y-12"
          variants={itemVariants}
        >
          {/* Hero Message */}
          <motion.div
            className="space-y-6"
            variants={itemVariants}
          >
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
              Let's be awesome together!
            </h3>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              As a dev, I am driven by my love for coding and my desire for new challenges. 
              If you have opportunities for collaboration or want to build something amazing, don't hesitate to contact me!
            </p>
          </motion.div>

          {/* Get in Touch Button */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg" 
              className="relative rounded-full px-8 md:px-12 py-4 md:py-6 text-lg md:text-xl font-medium cursor-pointer bg-gradient-to-r from-[#1a5fb8] via-[#1e70ca] to-[#3a85d9] text-white border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden"
              onClick={() => window.location.href = 'mailto:sarimabdelbari@gmail.com'}
            >
              {/* Animated glow background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#1a5fb8] via-[#1e70ca] to-[#3a85d9] opacity-75 blur-xl group-hover:opacity-100 transition-all duration-300" />
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
              
              {/* Button content */}
              <span className="relative z-10 flex items-center gap-3">
                Get in touch!
                <motion.div
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
                  <Send size={24} />
                </motion.div>
              </span>
            </Button>
          </motion.div>

          {/* Social Media Links */}
          <motion.div
            className="space-y-8"
            variants={itemVariants}
          >
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 max-w-xl mx-auto">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-14 h-14 md:w-16 md:h-16 bg-background/50 backdrop-blur-sm border border-border rounded-full flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 group shadow-lg hover:shadow-xl"
                  onHoverStart={() => setHoveredSocial(social.name)}
                  onHoverEnd={() => setHoveredSocial(null)}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="text-muted-foreground group-hover:text-primary transition-colors duration-300">
                    {social.icon}
                  </div>
                  {hoveredSocial === social.name && (
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -bottom-8 text-xs font-medium text-primary whitespace-nowrap"
                    >
                      {social.name}
                    </motion.span>
                  )}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Message */}
          <motion.div
            className="pt-8"
            variants={itemVariants}
          >
            <motion.div
              animate={{ rotate: [0, 10, 0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-6xl mb-4"
            >
              💻
            </motion.div>
            <p className="text-foreground font-medium text-base md:text-lg mb-2">
              Coded with ❤️ by Sarim Kerroucha
            </p>
            <p className="text-sm md:text-base text-muted-foreground">
              Ready to build something amazing together!
            </p>
          </motion.div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 right-8 opacity-20">
          <motion.div
            className="flex items-center space-x-4"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-2 h-2 bg-primary rounded-full" />
            <div className="w-4 h-4 border-2 border-primary rotate-45" />
            <div className="w-2 h-2 bg-primary rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;