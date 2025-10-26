import { useState, useEffect } from 'react';

/**
 * Hook to detect mobile devices and enable performance mode
 * Returns shouldReduceMotion boolean to conditionally render expensive animations
 */
export const usePerformanceMode = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isSmallScreen = window.innerWidth < 768;
      const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      return isMobileDevice || (isSmallScreen && hasTouchScreen);
    };

    // Check user's motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const mobile = checkMobile();
    setIsMobile(mobile);
    
    // Enable performance mode on mobile OR if user prefers reduced motion
    setShouldReduceMotion(mobile || prefersReducedMotion);
  }, []);

  return { isMobile, shouldReduceMotion };
};

