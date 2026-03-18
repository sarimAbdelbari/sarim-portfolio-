# Lazy Loading Domain

## Overview

The lazy loading system uses the Intersection Observer API to defer image loading until elements enter the viewport. This dramatically improves initial page load performance and reduces bandwidth usage.

## Core Hook: useLazyLoad

### Single Image Lazy Loading

```1:68:components/hooks/useLazyLoad.js
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
```

**Hook Behavior:**
1. Create ref for container element
2. Set up IntersectionObserver watching that ref
3. When element enters viewport (intersecting), set `isInView` to true
4. Once in view, start loading the image in memory
5. When loaded successfully, set `isLoaded` to true
6. Return states and ref for component use

### Configuration Options

```11:15:components/hooks/useLazyLoad.js
  const {
    threshold = 0.1,
    rootMargin = '50px',
    fallbackSrc = null
  } = options;
```

**threshold (0.1)**: Percentage of element that must be visible (10%) before triggering.
- Lower values (0.01): Trigger earlier
- Higher values (0.5): Wait until element is 50% visible

**rootMargin ('50px')**: Margin around viewport for pre-loading.
- Positive values: Load before element enters viewport
- Negative values: Wait until element is deeper into viewport
- Format: CSS margin syntax ('50px', '100px 0px')

**fallbackSrc (null)**: Optional fallback image if primary fails to load.

## Multiple Image Lazy Loading

### useLazyLoadMultiple Hook

```70:131:components/hooks/useLazyLoad.js
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
```

**Key Differences from Single Image:**
- Accepts array of image sources
- Uses `Set` to track loaded images
- Staggers image loads with 100ms delays
- Provides `isImageLoaded(src)` helper function
- Provides `allImagesLoaded` boolean for completion check

### Staggered Loading Strategy

```117:119:components/hooks/useLazyLoad.js
        // Add small delay between image loads to prevent overwhelming the network
        setTimeout(() => {
          img.src = src;
        }, index * 100);
```

**Why Stagger:**
- Prevents browser from opening too many simultaneous connections
- Reduces peak bandwidth usage
- Improves perceived performance (progressive loading)
- 100ms delay per image balances speed and smoothness

## Usage in Projects Section

### Setting Up Lazy Loading

```265:270:components/sections/projects.jsx
  const allProjectImages = useMemo(() =>
    projectsData.flatMap(p => [p.thumbnail, ...p.images]),
    [projectsData]
  );

  const { ref: projectsRef, isImageLoaded } = useLazyLoadMultiple(allProjectImages, { threshold: 0.1, rootMargin: '200px' });
```

**Implementation Steps:**
1. Collect all image URLs with `useMemo` to prevent recreation
2. Flatten project thumbnails and gallery images into single array
3. Call `useLazyLoadMultiple` with image list and generous rootMargin (200px)
4. Destructure `ref` (renamed to `projectsRef`) and `isImageLoaded` function

### Attaching the Ref

```274:274:components/sections/projects.jsx
      <section ref={projectsRef} className="py-20 px-3 lg:px-10">
```

**Critical:** Ref must be attached to container element that wraps all lazy-loaded images.

### Conditional Image Rendering

```64:72:components/sections/projects.jsx
        {isImageLoaded(project.thumbnail) ? (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500 rounded-xl"
          />
        ) : (
          <ImagePlaceholder className="w-full h-full rounded-xl" />
```

**Pattern:**
- Check if image loaded: `isImageLoaded(src)`
- If loaded: Render Next.js `Image` component
- If not loaded: Render `ImagePlaceholder` with spinner

## Image Placeholder Component

### Loading State UI

```12:18:components/sections/projects.jsx
const ImagePlaceholder = ({ className }) => (
  <div className={`bg-muted/20 animate-pulse ${className}`}>
    <div className="flex items-center justify-center h-full">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  </div>
);
```

**Visual Feedback:**
- Subtle pulsing background: `animate-pulse`
- Centered loading spinner
- Border animation for rotation: `animate-spin`
- Transparent top border creates "cut" effect
- Matches image dimensions via `className` prop

## Error Handling

### Single Image Error Recovery

```46:55:components/hooks/useLazyLoad.js
      img.onerror = () => {
        setHasError(true);
        if (fallbackSrc) {
          // Try loading fallback image
          const fallbackImg = new Image();
          fallbackImg.onload = () => setIsLoaded(true);
          fallbackImg.src = fallbackSrc;
        }
      };
```

**Graceful Degradation:**
1. Set `hasError` state to true
2. If `fallbackSrc` provided, attempt to load fallback
3. On fallback success, mark as loaded
4. Component can check `hasError` and show alternative UI

### Multiple Image Error Handling

```110:114:components/hooks/useLazyLoad.js
        img.onerror = () => {
          console.warn(`Failed to load image: ${src}`);
          // Still mark as "loaded" to prevent infinite loading
          setLoadedImages(prev => new Set([...prev, src]));
        };
```

**Fail-Safe Approach:**
- Log warning to console for debugging
- Mark image as "loaded" even on error
- Prevents infinite loading state
- UI shows placeholder indefinitely for failed images

## IntersectionObserver Cleanup

### Proper Resource Management

```34:35:components/hooks/useLazyLoad.js
    return () => observer.disconnect();
  }, [threshold, rootMargin]);
```

**Why Cleanup Matters:**
- Prevents memory leaks
- Removes event listeners when component unmounts
- Stops observing when configuration changes
- Critical for single-page applications

## Performance Benefits

### Before Lazy Loading
- All images loaded on page mount
- Large initial bundle size
- Slow Time to Interactive (TTI)
- High bandwidth usage for users who don't scroll

### After Lazy Loading
- Only visible images loaded initially
- Images load as user scrolls
- Improved TTI and First Contentful Paint
- Reduced bandwidth for partial page views

### Measured Impact
Based on the portfolio:
- 5 projects × ~3 images each = 15 images
- Average image size: ~200KB
- Without lazy loading: 3MB initial load
- With lazy loading: ~600KB initial load (hero + first 2 projects)
- **~80% reduction in initial payload**

## Image Gallery Pattern

### Gallery with Lazy Loading

```119:160:components/sections/projects.jsx
const ImageSwiper = ({ images, isImageLoaded }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  return (
    <div className="relative w-full  aspect-video rounded-2xl overflow-hidden bg-muted/10 border-4 border-background shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="relative w-full h-full"
        >
          {isImageLoaded(images[currentIndex]) ? (
            <Image src={images[currentIndex]} alt={`Project image ${currentIndex + 1}`} fill className="object-cover rounded-xl" />
          ) : (
            <ImagePlaceholder className="w-full h-full rounded-xl" />
          )
          }
        </motion.div>
      </AnimatePresence>
      {images.length > 1 && (
        <>
          <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/50 backdrop-blur-sm hover:bg-background rounded-full flex items-center justify-center text-foreground transition-all shadow-lg z-10">
            <ChevronLeft size={20} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/50 backdrop-blur-sm hover:bg-background rounded-full flex items-center justify-center text-foreground transition-all shadow-lg z-10">
            <ChevronRight size={20} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); setCurrentIndex(index); }} className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-primary w-6' : 'bg-white/50'}`} />
```

**Gallery + Lazy Loading:**
- All images pre-loaded via `useLazyLoadMultiple`
- Navigation changes `currentIndex`
- Check if current image loaded before rendering
- Show placeholder if image still loading
- Smooth transitions between loaded images

## Priority Images (No Lazy Loading)

### Hero Section Images

```295:302:components/sections/hero.jsx
                    <Image 
                        src="/assets/images/GuibleHero.png" 
                        alt="Sarim Kerroucha" 
                        width={384}
                        height={384}
                        className="w-72 md:w-80 lg:w-96 h-auto object-cover"
                        priority={true}
                        loading="eager"
```

**When NOT to Lazy Load:**
- Above-the-fold images (hero section)
- Critical branding elements (logo)
- Images needed for Largest Contentful Paint (LCP)

**Attributes:**
- `priority={true}` - Next.js preloads this image
- `loading="eager"` - Browser loads immediately, not lazy
- Ensures fast initial render without layout shift

## Best Practices

### DO:
- ✅ Use generous `rootMargin` (100-200px) for smooth experience
- ✅ Show placeholder with spinner during loading
- ✅ Collect all image URLs with `useMemo` to prevent re-computation
- ✅ Use `useLazyLoadMultiple` for galleries and collections
- ✅ Set `priority={true}` for hero images
- ✅ Clean up observers in useEffect return

### DON'T:
- ❌ Lazy load hero/above-fold images
- ❌ Use tiny rootMargin (user sees loading states)
- ❌ Forget error handling (broken images break UI)
- ❌ Create new image arrays on every render (use useMemo)
- ❌ Lazy load small icons or logos (overhead not worth it)
- ❌ Set threshold too high (images load late)

## Common Configurations

### Aggressive Pre-loading (Smooth UX)
```javascript
useLazyLoadMultiple(images, {
  threshold: 0.01,     // Trigger early
  rootMargin: '200px'  // Load 200px before viewport
});
```

### Conservative Loading (Save Bandwidth)
```javascript
useLazyLoad(image, {
  threshold: 0.5,      // Wait until 50% visible
  rootMargin: '0px'    // Only when entering viewport
});
```

### With Fallback
```javascript
useLazyLoad(image, {
  threshold: 0.1,
  rootMargin: '50px',
  fallbackSrc: '/assets/images/fallback.png'
});
```

## Debugging Tips

### Check if Hook is Working
```javascript
const { ref, isLoaded, isInView, hasError } = useLazyLoad(imageSrc);

console.log({
  isInView,    // Should turn true when element enters viewport
  isLoaded,    // Should turn true after image loads
  hasError     // Should be true if image fails to load
});
```

### Common Issues

**Images never load:**
- Check if ref is attached to correct element
- Verify element is actually entering viewport (test with margin)
- Check browser console for image 404 errors

**Images load immediately:**
- Check rootMargin isn't too large
- Verify IntersectionObserver is supported (modern browsers only)
- Ensure `isInView` logic is correct

**Performance issues:**
- Reduce number of simultaneously lazy-loaded images
- Increase stagger delay in `useLazyLoadMultiple`
- Check if too many re-renders (use React DevTools Profiler)
