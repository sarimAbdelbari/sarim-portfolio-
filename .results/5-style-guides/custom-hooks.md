# Style Guide: Custom Hooks

## Overview

Custom hooks extract reusable logic for lazy loading and performance optimization. They follow React hooks conventions and return objects (not arrays) for clarity.

## Unique Conventions

### 1. "use" Prefix Required

ALL custom hooks MUST start with "use":

```javascript
// ✅ Correct
useLazyLoad
usePerformanceMode
useLazyLoadMultiple

// ❌ Incorrect
lazyLoad
performanceMode
```

### 2. Return Object Pattern

Hooks MUST return objects with named keys (NOT arrays):

```javascript
// ✅ Good
export const useLazyLoad = (imageSrc, options = {}) => {
  // ...
  return {
    ref: imgRef,
    isLoaded,
    isInView,
    hasError,
    src: isLoaded ? imageSrc : null
  };
};

// Usage
const { ref, isLoaded, hasError } = useLazyLoad(src);

// ❌ Bad
return [imgRef, isLoaded, isInView];  // Array destructuring less clear
```

### 3. Options Object Parameter

Hooks with configuration MUST accept options object:

```javascript
export const useLazyLoad = (imageSrc, options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    fallbackSrc = null
  } = options;
  
  // ... hook logic
};

// Usage
useLazyLoad(src, {
  threshold: 0.2,
  rootMargin: '100px'
});
```

### 4. Cleanup Functions Required

Hooks with side effects MUST return cleanup:

```javascript
useEffect(() => {
  const observer = new IntersectionObserver(/* ... */);
  
  if (element.current) {
    observer.observe(element.current);
  }

  // ✅ Cleanup function
  return () => observer.disconnect();
}, [dependencies]);
```

### 5. Client-Side Directive

ALL custom hooks use `'use client'` since they rely on browser APIs:

```javascript
'use client';

import { useState, useEffect, useRef } from 'react';

export const useCustomHook = () => {
  // Hook implementation
};
```

## File Structure Template

```javascript
'use client';

// 1. Imports
import { useState, useEffect, useRef } from 'react';

// 2. Hook export
export const useHookName = (parameters, options = {}) => {
  // 3. Extract options with defaults
  const {
    option1 = defaultValue1,
    option2 = defaultValue2,
  } = options;

  // 4. State declarations
  const [state1, setState1] = useState(initialValue);
  const [state2, setState2] = useState(initialValue);
  const refValue = useRef();

  // 5. Effects
  useEffect(() => {
    // Effect logic
    
    // Cleanup
    return () => {
      // Cleanup logic
    };
  }, [dependencies]);

  // 6. Return object
  return {
    ref: refValue,
    state1,
    state2,
    helperFunction: (arg) => {
      // Helper implementation
    },
  };
};
```

## Common Patterns

### Browser API Hook Pattern

```javascript
'use client';

import { useState, useEffect } from 'react';

export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    const updateMatch = () => setMatches(media.matches);
    updateMatch();  // Initial check
    
    media.addEventListener('change', updateMatch);
    
    return () => media.removeEventListener('change', updateMatch);
  }, [query]);

  return { matches };
};
```

### IntersectionObserver Pattern

```javascript
export const useInView = (options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef();

  const {
    threshold = 0.1,
    rootMargin = '0px'
  } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();  // One-time check
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isInView };
};
```

## Naming Conventions

### State Variables
- `isLoaded`, `hasError`, `isInView` - Boolean flags
- `loadedImages`, `errorMessages` - Collections
- `currentIndex`, `count` - Numbers

### Functions
- camelCase
- Verb-based: `checkSize`, `loadImage`, `updateState`

## Anti-Patterns to Avoid

### ❌ DON'T: Return arrays

```javascript
// Bad
return [ref, isLoaded, hasError];
```

### ✅ DO: Return objects

```javascript
// Good
return { ref, isLoaded, hasError };
```

### ❌ DON'T: Forget cleanup

```javascript
// Bad
useEffect(() => {
  window.addEventListener('resize', handleResize);
  // Missing cleanup!
}, []);
```

### ✅ DO: Return cleanup function

```javascript
// Good
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

### ❌ DON'T: Missing dependencies

```javascript
// Bad
useEffect(() => {
  doSomethingWith(prop);
}, []);  // prop is missing!
```

### ✅ DO: Include all dependencies

```javascript
// Good
useEffect(() => {
  doSomethingWith(prop);
}, [prop]);
```

## Hook Checklist

When creating new custom hook:

- [ ] Name starts with "use"
- [ ] Include `'use client'` directive
- [ ] Accept options object with defaults
- [ ] Return object (not array)
- [ ] Clean up side effects
- [ ] Complete dependency arrays
- [ ] Document parameters and return values
- [ ] Handle edge cases (null refs, missing elements)
