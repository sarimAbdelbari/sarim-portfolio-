'use client';

import { motion } from 'framer-motion';

interface BlogHeaderProps {
  title: string;
  description: string;
}

export function BlogHeader({ title, description }: BlogHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 text-center mb-16"
    >
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
        {description}
      </p>
    </motion.div>
  );
}