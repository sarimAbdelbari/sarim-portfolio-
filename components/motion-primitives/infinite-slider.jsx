'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export function InfiniteSlider({ children, speed = 40, speedOnHover = 20, gap = 24 }) {
  const [containerWidth, setContainerWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const updateWidths = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
      if (contentRef.current) {
        setContentWidth(contentRef.current.offsetWidth);
      }
    };

    updateWidths();
    window.addEventListener('resize', updateWidths);
    return () => window.removeEventListener('resize', updateWidths);
  }, [children]);

  const duration = contentWidth / speed;
  const durationOnHover = contentWidth / speedOnHover;

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      <motion.div
        ref={contentRef}
        className="flex"
        style={{ gap: `${gap}px` }}
        animate={{
          x: [0, -contentWidth - gap],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: 'linear',
        }}
        whileHover={{
          animationPlayState: 'running',
          transition: {
            duration: durationOnHover,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
      >
        {/* Original content */}
        {children}
        {/* Duplicated content for seamless loop */}
        {children}
      </motion.div>
    </div>
  );
}

