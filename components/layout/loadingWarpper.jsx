'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';

export default function LoadingWrapper({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // A simple timer to control the loading screen's duration.
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    // Cleanup the timer if the component unmounts.
    return () => clearTimeout(timer);
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
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
                animate={{
                  scale: [1, 0.8, 1],
                  rotate: [0, -360]
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              />
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
            </div>

            {/* Animated Circles */}
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

            {/* Heartbeat Loader in the background */}
            <motion.div
              className="absolute w-[400px] h-[400px]"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 rounded-full border-2 border-primary/10 opacity-50 blur-lg"></div>
              <div className="absolute inset-4 rounded-full border-2 border-primary/20 opacity-75"></div>
            </motion.div>

            {/* Main content */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="z-10 flex flex-col items-center justify-center text-center"
            >
              <motion.h3 
                className="text-4xl md:text-6xl font-bold text-foreground"
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
                      'Creative Coder'
                    ]}
                    loop={true}
                    cursor
                    cursorStyle="|"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={600}
                  />
                </span>
              </motion.h3>
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