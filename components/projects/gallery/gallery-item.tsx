'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface GalleryItemProps {
  src: string;
  alt: string;
  index: number;
}

export function GalleryItem({ src, alt, index }: GalleryItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative h-[300px] rounded-lg overflow-hidden"
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
      />
    </motion.div>
  );
}