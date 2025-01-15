'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function GradientBackground() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark' || resolvedTheme === 'dark';

  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden ${
      isDark 
        ? 'bg-gradient-to-br from-background via-secondary/50 to-background' 
        : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'
    }`}>
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        style={{
          backgroundImage: `radial-gradient(circle at center, ${
            isDark ? 'var(--primary)' : '#3b82f6'
          } 0%, transparent 50%)`,
          backgroundSize: '100% 100%',
        }}
      />
    </div>
  );
}