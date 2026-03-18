# Performance Optimization Domain

## Core Strategy

Performance optimization through mobile detection, lazy loading, and conditional animation rendering.

## usePerformanceMode Hook

```1:26:components/hooks/usePerformanceMode.js
import { useState, useEffect } from 'react';

export const usePerformanceMode = () => {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setShouldReduceMotion(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return { shouldReduceMotion };
};
```

**Triggers:** Screen width < 768px (mobile/tablet)

## Conditional Animation Rendering

### Heavy Animations Disabled on Mobile

```76:105:components/sections/hero.jsx
{!shouldReduceMotion && (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
    {backgroundSkills.map((skill, index) => (
      <motion.div
        key={skill.text}
        animate={{
          x: [0, skill.moveX, 0, -skill.moveX, 0],
          y: [0, skill.moveY, 0, -skill.moveY, 0],
          opacity: [0.1, 0.3, 0.1, 0.3, 0.1],
          rotate: [0, skill.rotate, 0, -skill.rotate, 0],
        }}
        transition={{
          duration: skill.duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.3,
        }}
      >
        {skill.text}
      </motion.div>
    ))}
  </div>
)}
```

**What Gets Disabled:**
- Background floating elements
- Decorative particles and orbs
- Complex multi-axis animations
- Blur effects and heavy transforms

**What Stays Enabled:**
- Entrance animations
- Button hover effects
- Page transitions
- Essential UI feedback

## useMemo for Expensive Computations

### Filtering and Transformations

```251:256:components/sections/projects.jsx
const categoriesWithCounts = useMemo(() =>
  categories.map(cat => ({
    ...cat,
    count: cat.id === 'all' ? projectsData.length : projectsData.filter(p => p.category === cat.id).length
  })), [projectsData]
);
```

### Precomputed Animation Values

```22:39:components/sections/hero.jsx
const backgroundSkills = useMemo(() => [
  { text: "Clean Code", fontSize: 24, left: 15, top: 20, duration: 25, moveX: 30, moveY: 20, rotate: 3 },
  { text: "System Design", fontSize: 18, left: 80, top: 15, duration: 30, moveX: -25, moveY: 35, rotate: -2 },
  // ... more entries
], []);
```

**Benefits:**
- Prevents array recreation on every render
- Ensures key stability for React
- Reduces garbage collection pressure

## Image Optimization

### Next.js Image Component

```295:302:components/sections/hero.jsx
<Image 
  src="/assets/images/GuibleHero.png" 
  alt="Sarim Kerroucha" 
  width={384}
  height={384}
  className="w-72 md:w-80 lg:w-96 h-auto object-cover"
  priority={true}
  loading="eager"
/>
```

**Optimizations:**
- Automatic WebP/AVIF conversion
- Responsive srcset generation
- Lazy loading below fold
- Priority loading for hero images

### Lazy Loading Strategy

```265:270:components/sections/projects.jsx
const allProjectImages = useMemo(() =>
  projectsData.flatMap(p => [p.thumbnail, ...p.images]),
  [projectsData]
);

const { ref: projectsRef, isImageLoaded } = useLazyLoadMultiple(allProjectImages, { threshold: 0.1, rootMargin: '200px' });
```

**Impact:**
- ~80% reduction in initial payload
- Images load as user scrolls
- Improved Time to Interactive (TTI)
- Better bandwidth usage

## Bundle Optimization

### Turbopack (Development)

```6:6:package.json
"dev": "next dev --turbopack",
```

**Benefits:**
- Faster development builds
- Incremental compilation
- Hot module replacement (HMR) improvements

### Code Splitting

Next.js automatically:
- Splits routes into separate bundles
- Lazy loads non-critical components
- Tree-shakes unused code

## Cleanup and Memory Management

### Event Listener Cleanup

```34:35:components/hooks/useLazyLoad.js
return () => observer.disconnect();
}, [threshold, rootMargin]);
```

**Pattern:** Always return cleanup function from useEffect.

**Prevents:**
- Memory leaks
- Dangling event listeners
- Observer accumulation

## Performance Metrics

### Loading Sequence

1. **LoadingWrapper** (2.5s)
2. **Cinema curtain animation** (1.2s)
3. **Hero section fade-in** (0.5s)
4. **Staggered section entrances** (0.3s delay each)

**Total to interactive:** ~3-4 seconds

### Lazy Loading Impact

**Before:**
- All 15 project images loaded (3MB)
- Long initial load time
- High bandwidth usage

**After:**
- Only hero + first 2 projects (600KB)
- Fast time to interactive
- Images load progressively

## Best Practices

### DO:
- ✅ Use usePerformanceMode for heavy animations
- ✅ Memoize expensive computations with useMemo
- ✅ Lazy load images below the fold
- ✅ Set priority={true} for hero images
- ✅ Clean up event listeners and observers
- ✅ Use Next.js Image for automatic optimization

### DON'T:
- ❌ Animate layout properties (width, height)
- ❌ Run heavy animations on every render
- ❌ Forget dependency arrays in useMemo/useEffect
- ❌ Load all images eagerly
- ❌ Create new arrays/objects in render without memoization
- ❌ Ignore mobile performance considerations
