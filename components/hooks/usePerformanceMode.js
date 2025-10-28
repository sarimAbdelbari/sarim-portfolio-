import { useState, useEffect } from 'react';

/**
 * Hook to detect small screens and enable performance mode
 * Works like CSS media queries - simple screen width check
 */
export const usePerformanceMode = () => {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      // Simple check: screen width < 768px (mobile/tablet breakpoint)
      setShouldReduceMotion(window.innerWidth < 768);
    };

    // Check on mount
    checkScreenSize();

    // Update on window resize
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return { shouldReduceMotion };
};

