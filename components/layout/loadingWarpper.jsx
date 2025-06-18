'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';

export default function LoadingWrapper({ children }) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 200);

    // Set the overall loading time
    const timer = setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);
      setTimeout(() => setLoading(false), 300); // Small delay after reaching 100%
    }, 2000); 

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
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
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#1e70ca] via-[#3a85d9] to-[#017afc]"></div>
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
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1e70ca] via-[#3a85d9] to-[#017afc]"></div>
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
            className="space-y-6 text-center flex flex-col items-center justify-center min-h-screen relative"
          >
            {/* Subtle background gradient - blue focused */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{ 
                background: `radial-gradient(circle at center, #3a85d9 0%, #1e70ca 40%, #017afc 100%)`,
                filter: "blur(100px)"
              }}
            />

            {/* Animated circles - blue tones */}
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
              className="absolute w-64 h-64 rounded-full border-2"
              style={{ borderColor: '#1e70ca20' }}
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
              className="absolute w-80 h-80 rounded-full border-2"
              style={{ borderColor: '#3a85d920' }}
            />

            {/* Main content */}
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5 }}
              className = "z-10 flex flex-col items-center justify-center text-center"
            >
              <h3 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#1e70ca] via-[#3a85d9] to-[#017afc] bg-clip-text text-transparent">
                <Typewriter
                  words={[
                    'Full Stack Developer',
                    'Software Developer',
                    'MERN Stack Specialist',
                  ]}
                  loop={true}
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </h3>

              {/* Loading progress container */}
              <div className="w-64 md:w-80 h-2 bg-muted rounded-full overflow-hidden mt-8 mb-4">
                {/* Progress fill - clean blue gradient */}
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#1e70ca] via-[#3a85d9] to-[#017afc]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeInOut" }}
                />
              </div>
              
              <motion.p
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-sm text-muted-foreground"
              >
                Loading Experience... {Math.floor(progress)}%
              </motion.p>
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
    </div>
  );
}