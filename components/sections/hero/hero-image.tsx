'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function HeroImage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative w-64 h-64 md:w-96 md:h-96 mx-auto mb-8"
    >
      <Image
        src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop"
        alt="Developer Workspace"
        fill
        className="object-cover rounded-full shadow-xl"
        priority
      />
    </motion.div>
  );
}