'use client';

import { useState, useEffect, useRef } from 'react';

export const useLazyLoad = (imageSrc, options = {}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef();

  const {
    threshold = 0.1,
    rootMargin = '50px',
    fallbackSrc = null
  } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  useEffect(() => {
    if (isInView && imageSrc) {
      const img = new Image();
      
      img.onload = () => {
        setIsLoaded(true);
        setHasError(false);
      };
      
      img.onerror = () => {
        setHasError(true);
        if (fallbackSrc) {
          // Try loading fallback image
          const fallbackImg = new Image();
          fallbackImg.onload = () => setIsLoaded(true);
          fallbackImg.src = fallbackSrc;
        }
      };
      
      img.src = imageSrc;
    }
  }, [isInView, imageSrc, fallbackSrc]);

  return {
    ref: imgRef,
    isLoaded,
    isInView,
    hasError,
    src: isLoaded ? imageSrc : null
  };
};

export const useLazyLoadMultiple = (imageSources, options = {}) => {
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef();

  const {
    threshold = 0.1,
    rootMargin = '100px'
  } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  useEffect(() => {
    if (isInView && imageSources.length > 0) {
      imageSources.forEach((src, index) => {
        const img = new Image();
        
        img.onload = () => {
          setLoadedImages(prev => new Set([...prev, src]));
        };
        
        img.onerror = () => {
          console.warn(`Failed to load image: ${src}`);
          // Still mark as "loaded" to prevent infinite loading
          setLoadedImages(prev => new Set([...prev, src]));
        };
        
        // Add small delay between image loads to prevent overwhelming the network
        setTimeout(() => {
          img.src = src;
        }, index * 100);
      });
    }
  }, [isInView, imageSources]);

  return {
    ref: containerRef,
    isInView,
    loadedImages,
    isImageLoaded: (src) => loadedImages.has(src),
    allImagesLoaded: loadedImages.size === imageSources.length
  };
};
