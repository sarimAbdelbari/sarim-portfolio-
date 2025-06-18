"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { useState } from "react";


export function ScrollIndicator({ children }) {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const [isHovered, setIsHovered] = useState(false);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Scroll Indicator */}
      <motion.div
        className="fixed right-10 top-1/3 h-40 w-1 bg-gray-200/30 rounded-full z-50 backdrop-blur-sm"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{ 
          width: isHovered ? "10px" : "7px",
          opacity: isHovered ? 1 : 0.7
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Track glow effect */}
        <motion.div 
          className="absolute inset-0 rounded-full opacity-0"
          style={{ 
            boxShadow: "0 0 8px rgba(100, 100, 255, 0.5)",
            opacity: isHovered ? 0.6 : 0
          }}
          transition={{ duration: 0.3 }}
        />
         
        {/* Progress thumb */}
        <motion.div
          className="w-full bg-primary/80 rounded-full origin-top"
          style={{ 
            scaleY,
            height: '100%',
            transformOrigin: 'top',
            boxShadow: isHovered ? "0 0 10px rgba(100, 100, 255, 0.7)" : "none"
          }}
        />
        
        {/* Scroll to top button */}
        <motion.button
          onClick={scrollToTop}
          className="absolute -bottom-8 -left-3 w-7 h-7 flex items-center justify-center rounded-full bg-primary/80 text-white opacity-0"
          aria-label="Scroll to top"
          animate={{ opacity: isHovered ? 0.8 : 0 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.1, opacity: 1 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 15l-6-6-6 6"/>
          </svg>
        </motion.button>
      </motion.div>

      {/* Main Content */}
      {children}
    </>
  );
}