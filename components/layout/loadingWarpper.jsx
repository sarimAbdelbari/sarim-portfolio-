'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';

export default function LoadingWrapper({ children }) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('Initializing...');

  // Only critical images that need to be loaded before site reveal
  const criticalImagesToPreload = [
    // Hero section - Above the fold, critical for first impression
    '/assets/images/GuibleHero.png',
    '/assets/svg/reactjs-svgrepo-com.svg',
    '/assets/svg/nextjs-svgrepo-com.svg',
    '/assets/svg/nodejs-svgrepo-com.svg',
    '/assets/svg/typescript-official-svgrepo-com.svg',
    '/assets/svg/mouse-cursor-click-svgrepo-com.svg',
    
    // About Me section - Second most important section
    '/assets/images/MeChilling.jpg'
    
    // Note: Projects and Blog images will be lazy loaded when user scrolls to them
  ];

  useEffect(() => {
    let loadedImages = 0;
    let failedImages = 0;
    const totalImages = criticalImagesToPreload.length;
    let timeoutId;
    
    setLoadingMessage('Loading assets...');

    // Fallback timeout (reduced to 5 seconds for critical images only)
    timeoutId = setTimeout(() => {
      console.warn('Image loading timeout reached, proceeding anyway...');
      setLoadingMessage('Ready! (timeout)');
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }, 5000);

    // Create image preloading promises
    const imagePromises = criticalImagesToPreload.map((src, index) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        
        img.onload = () => {
          loadedImages++;
          const currentProgress = Math.floor((loadedImages / totalImages) * 90); // Reserve 10% for final initialization
          setProgress(currentProgress);
          setLoadingMessage(`Loading ...`);
          resolve(src);
        };
        
        img.onerror = () => {
          failedImages++;
          loadedImages++; // Count failed images as loaded to continue
          const currentProgress = Math.floor((loadedImages / totalImages) * 90);
          setProgress(currentProgress);
          setLoadingMessage(`Loading ...`);
          console.warn(`Failed to load image: ${src}`);
          resolve(src); // Resolve anyway to continue
        };
        
        img.src = src;
      });
    });

    // Wait for all images to load (or fail)
    Promise.allSettled(imagePromises).then((results) => {
      clearTimeout(timeoutId); // Clear the timeout since we completed
      
      const successfulLoads = results.filter(result => result.status === 'fulfilled').length;
      const failedLoads = results.filter(result => result.status === 'rejected').length;
      
      if (failedLoads > 0) {
        console.log(`Successfully loaded ${successfulLoads}/${totalImages} images. ${failedLoads} images failed to load but that's okay!`);
      } else {
        console.log(`Successfully loaded all ${totalImages} images!`);
      }
      
      setLoadingMessage('Finalizing...');
      setProgress(95);
      
      // Small delay for final loading steps
      setTimeout(() => {
        setProgress(100);
        setLoadingMessage('Ready!');
        
        // Final delay before showing content
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }, 300);
    }).catch((error) => {
      clearTimeout(timeoutId); // Clear the timeout
      // Fallback in case something goes wrong
      console.error('Error during image preloading:', error);
      setLoadingMessage('Ready! (with fallback)');
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    });

    // Cleanup function
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };

  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Cinema curtain top */}
      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: "-100%" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -top-0.5 left-0 w-full h-1/2 bg-background z-50"
            style={{ transformOrigin: "top" }}
          >
            {/* Decorative bottom edge for top curtain */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-chart-1 to-chart-2"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinema curtain bottom */}
      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: "100%" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-0.5 left-0 w-full h-1/2 bg-background z-50"
            style={{ transformOrigin: "bottom" }}
          >
            {/* Decorative top edge for bottom curtain */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-chart-1 to-chart-2"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-background"
          >
            {/* Enhanced Background Effects - matching your sections */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Large animated gradient orbs */}
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
                className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-l from-accent/8 via-accent/4 to-transparent rounded-full blur-3xl"
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
                    left: `${20 + i * 12}%`,
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

            {/* Animated circles - using global colors */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute w-64 h-64 rounded-full border-2 border-primary/20"
            />
            
            <motion.div
              animate={{
                scale: [1.1, 1, 1.1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute w-80 h-80 rounded-full border-2 border-accent/20"
            />

            {/* Main content */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="z-10 flex flex-col items-center justify-center text-center space-y-8"
            >
              
              <motion.h3 
                className="text-4xl md:text-6xl font-bold mb-6 text-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <span className="text-primary">
                  <Typewriter
                    words={[
                      'Full Stack Developer',
                      'Software Developer', 
                      'MERN Stack Specialist',
                    ]}
                    loop={true}
                    cursor
                    cursorStyle="|"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                  />
                </span>
              </motion.h3>

              {/* Loading progress container - matching your button style */}
              <motion.div 
                className="w-64 md:w-80 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <div className="relative h-3 bg-muted rounded-full overflow-hidden shadow-inner">
                  {/* Progress fill - using global gradient */}
                  <motion.div 
                    className="h-full bg-gradient-to-r from-primary via-chart-1 to-chart-2 relative overflow-hidden"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "easeInOut" }}
                  >
                    {/* Shimmer effect - matching your button pattern */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-pulse" 
                         style={{ 
                           animation: progress > 0 ? 'shimmer 2s infinite' : 'none',
                           transform: 'translateX(-100%) skewX(-12deg)'
                         }} />
                  </motion.div>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-chart-1/20 to-chart-2/20 blur-sm opacity-50" />
                </div>
                
                <motion.p
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-sm text-muted-foreground font-medium"
                >
                  {loadingMessage} {Math.floor(progress)}%
                </motion.p>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="min-h-screen overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
      `}</style>
    </div>
  );
}