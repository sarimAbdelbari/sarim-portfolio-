# Custom Hooks Domain

## Overview

Custom hooks extract reusable logic for lazy loading and performance optimization.

## Hook: useLazyLoad

**Location:** `components/hooks/useLazyLoad.js`

**Purpose:** Lazy load single image using Intersection Observer.

**Returns:**
```javascript
{
  ref,         // Attach to container element
  isLoaded,    // Boolean: image loaded successfully
  isInView,    // Boolean: element in viewport
  hasError,    // Boolean: image failed to load
  src          // Image src (or null if not loaded)
}
```

**Configuration:**
```javascript
useLazyLoad(imageSrc, {
  threshold: 0.1,        // % of element visible to trigger
  rootMargin: '50px',    // Load before entering viewport
  fallbackSrc: null      // Optional fallback image
});
```

## Hook: useLazyLoadMultiple

**Purpose:** Lazy load multiple images with staggered loading.

**Returns:**
```javascript
{
  ref,                      // Attach to container
  isInView,                 // Boolean: container in viewport
  loadedImages,             // Set of loaded image URLs
  isImageLoaded(src),       // Function: check if specific image loaded
  allImagesLoaded          // Boolean: all images loaded
}
```

**Usage:**
```javascript
const allImages = useMemo(() =>
  projects.flatMap(p => [p.thumbnail, ...p.images]),
  [projects]
);

const { ref, isImageLoaded } = useLazyLoadMultiple(allImages, {
  threshold: 0.1,
  rootMargin: '200px'
});
```

## Hook: usePerformanceMode

**Location:** `components/hooks/usePerformanceMode.js`

**Purpose:** Detect mobile screens to reduce animations.

**Returns:**
```javascript
{
  shouldReduceMotion  // Boolean: true if width < 768px
}
```

**Usage:**
```javascript
const { shouldReduceMotion } = usePerformanceMode();

return (
  <>
    {!shouldReduceMotion && <ExpensiveAnimation />}
    <EssentialContent />
  </>
);
```

## Hook Patterns

### Client-Side Only

All custom hooks use `'use client'` directive since they rely on browser APIs:
- `useState`, `useEffect`, `useRef`
- `window` object
- IntersectionObserver API

### Cleanup Pattern

```javascript
useEffect(() => {
  const observer = new IntersectionObserver(/* ... */);
  observer.observe(element);

  return () => observer.disconnect(); // Cleanup
}, []);
```

### Return Object Pattern

Hooks return objects (not arrays) for clear, named returns:

```javascript
// Good
const { ref, isLoaded, hasError } = useLazyLoad(src);

// Bad (less clear)
const [ref, isLoaded, hasError] = useLazyLoad(src);
```

## Best Practices

### DO:
- ✅ Start hook names with "use"
- ✅ Return objects with descriptive keys
- ✅ Clean up observers and listeners
- ✅ Include 'use client' directive
- ✅ Accept options object for configuration

### DON'T:
- ❌ Conditionally call hooks
- ❌ Forget cleanup functions
- ❌ Return arrays (use objects)
- ❌ Mix concerns in single hook
- ❌ Forget dependencies in useEffect
