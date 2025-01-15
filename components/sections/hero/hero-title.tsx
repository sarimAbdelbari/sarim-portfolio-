'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Typewriter } from 'react-simple-typewriter';

export function HeroTitle() {
  const { theme, resolvedTheme } = useTheme();
  const isDark = theme === 'dark' || resolvedTheme === 'dark';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 text-center"
    >
      <h1 className="text-4xl md:text-6xl font-bold">
        <span className={isDark ? "text-white" : "text-gray-900"}>
          <Typewriter
            words={[
              'Web Developer',
              'Frontend Enthusiast',
              'MERN Stack Specialist',
            ]}
            loop={true}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </span>
      </h1>
      <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
        Hey there! I&apos;m Kerroucha Abdelbari Sarim, a passionate Web Developer
        specializing in modern web technologies and the MERN stack.
      </p>
    </motion.div>
  );
}
