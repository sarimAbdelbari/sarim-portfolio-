# Style Guide: React Section Components

## Overview

Section components are large, self-contained page sections (Hero, AboutMe, Skills, Projects, Blog, Contact). They typically range from 200-450 lines and represent major content areas of the portfolio.

## Unique Conventions

### 1. Client-Side Directive

ALL section components begin with `'use client'` directive:

```javascript
'use client';

import { motion } from 'framer-motion';
// ... other imports
```

**Why:** Section components use useState, useEffect, and browser APIs.

### 2. Performance Mode Integration

Section components with heavy animations MUST integrate `usePerformanceMode`:

```javascript
import { usePerformanceMode } from "@/components/hooks/usePerformanceMode";

export default function Hero() {
  const { shouldReduceMotion } = usePerformanceMode();
  
  // Conditionally render expensive animations
  {!shouldReduceMotion && (
    <motion.div>Heavy animation</motion.div>
  )}
}
```

**Applied in:** Hero, AboutMe, Blog, Contact

### 3. Helper Component Colocation

Small helper components are defined ABOVE the main component in the SAME file:

```javascript
// Helper components first
const ImagePlaceholder = ({ className }) => (
  <div className={`bg-muted/20 animate-pulse ${className}`}>
    <div className="flex items-center justify-center h-full">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  </div>
);

const ProjectCard = ({ project, onCardClick }) => (
  // ... card implementation
);

// Main component last
const Projects = () => {
  // ... main logic
};

export default Projects;
```

**Pattern:** Helpers → Main → Default Export

### 4. Section Wrapper Structure

```javascript
<section className="py-20 px-3 lg:px-10 [additional-classes]">
  <div className="max-w-7xl mx-auto">
    {/* Section content */}
  </div>
</section>
```

**Key Attributes:**
- `<section>` tag (semantic HTML)
- Vertical padding: `py-20`
- Responsive horizontal: `px-3 lg:px-10`
- Max-width container: `max-w-7xl mx-auto`

### 5. Entrance Animation Pattern

```javascript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
```

**Standard Animation:**
- Fade in: `opacity: 0 → 1`
- Slide up: `y: 20 → 0`
- Trigger once on scroll: `viewport={{ once: true }}`
- Duration: 0.5s

### 6. Background Decorative Elements

```javascript
{/* Animated background elements - Disabled on mobile */}
{!shouldReduceMotion && (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
    {/* Orbs, particles, floating elements */}
  </div>
)}

{/* Main content with higher z-index */}
<div className="relative z-10">
  {/* Actual content */}
</div>
```

**Pattern:**
- Absolute positioned background layer (`z-0`)
- `pointer-events-none` to allow click-through
- Conditional on `!shouldReduceMotion`
- Content layer with `z-10` or higher

### 7. Data Import Pattern

```javascript
import { projectsData, categories } from '@/lib/data';

export default function Projects() {
  // Use data directly, no API calls
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const filteredProjects = useMemo(() =>
    selectedCategory === 'all'
      ? projectsData
      : projectsData.filter(p => p.category === selectedCategory),
    [selectedCategory]
  );
}
```

**Conventions:**
- Import static data from `lib/data.js`
- Use `useMemo` for filtering/transformation
- No external API calls

### 8. Image Handling

```javascript
// Option 1: Priority images (hero, above fold)
<Image 
  src="/assets/images/hero.png"
  alt="Description"
  width={384}
  height={384}
  priority={true}
  loading="eager"
/>

// Option 2: Lazy loaded images (below fold)
const allImages = useMemo(() =>
  items.flatMap(item => [item.thumbnail, ...item.images]),
  [items]
);

const { ref, isImageLoaded } = useLazyLoadMultiple(allImages, {
  threshold: 0.1,
  rootMargin: '200px'
});

{isImageLoaded(image.src) ? (
  <Image src={image.src} alt={image.alt} fill />
) : (
  <ImagePlaceholder />
)}
```

### 9. Staggered Animation Delays

```javascript
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}  // Stagger by 100ms
  >
    {/* Item content */}
  </motion.div>
))}
```

**Formula:** `delay: index * 0.1` (100ms per item)

### 10. useMemo for Animation Arrays

```javascript
const backgroundSkills = useMemo(() => [
  { text: "Clean Code", fontSize: 24, left: 15, top: 20, duration: 25 },
  { text: "System Design", fontSize: 18, left: 80, top: 15, duration: 30 },
  // ... more items
], []);
```

**Why:** Prevents array recreation, ensures stable keys for mapped elements.

## File Structure Template

```javascript
'use client';

// 1. External imports
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react';

// 2. Internal imports
import { usePerformanceMode } from '@/components/hooks/usePerformanceMode';
import { projectsData } from '@/lib/data';

// 3. Helper components (if needed)
const HelperComponent = ({ props }) => (
  <div>Helper implementation</div>
);

// 4. Main component
export default function SectionName() {
  // Performance mode
  const { shouldReduceMotion } = usePerformanceMode();
  
  // State
  const [localState, setLocalState] = useState(initialValue);
  
  // Memoized computations
  const computedValue = useMemo(() => {
    // Expensive computation
  }, [dependencies]);
  
  // Effects
  useEffect(() => {
    // Side effects
    return () => {
      // Cleanup
    };
  }, []);
  
  return (
    <section className="py-20 px-3 lg:px-10">
      {/* Background elements (conditional) */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Decorative animations */}
        </div>
      )}
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Section content */}
        </motion.div>
      </div>
    </section>
  );
}
```

## Naming Conventions

### Component Names
- PascalCase
- Descriptive of content
- Examples: `Hero`, `AboutMe`, `Projects`, `ComingSoonBlog`

### Helper Component Names
- PascalCase
- Describe role/purpose
- Examples: `ImagePlaceholder`, `ProjectCard`, `CategoryFilter`, `ImageSwiper`

### State Variables
- camelCase
- Prefixed appropriately
- Examples: `selectedCategory`, `isLoading`, `hasError`, `currentIndex`

## Common Patterns

### Modal Pattern

```javascript
const [selectedItem, setSelectedItem] = useState(null);

// Trigger modal
<div onClick={() => setSelectedItem(item)}>Open Modal</div>

// Render modal with AnimatePresence
<AnimatePresence>
  {selectedItem && (
    <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />
  )}
</AnimatePresence>
```

### Filter Pattern

```javascript
const [selectedFilter, setSelectedFilter] = useState('all');

const filteredItems = useMemo(() =>
  selectedFilter === 'all'
    ? allItems
    : allItems.filter(item => item.category === selectedFilter),
  [selectedFilter, allItems]
);
```

### Carousel/Swiper Pattern

```javascript
const [currentIndex, setCurrentIndex] = useState(0);

const nextItem = () => setCurrentIndex((prev) => (prev + 1) % items.length);
const prevItem = () => setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));

<AnimatePresence mode="wait">
  <motion.div
    key={currentIndex}
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
  >
    {items[currentIndex]}
  </motion.div>
</AnimatePresence>
```

## Anti-Patterns to Avoid

### ❌ DON'T: Inline large helpers

```javascript
// Bad
export default function Projects() {
  return (
    <div>
      {projects.map(project => (
        <div key={project.id}>
          {/* 50 lines of JSX */}
        </div>
      ))}
    </div>
  );
}
```

### ✅ DO: Extract to helper

```javascript
// Good
const ProjectCard = ({ project }) => (
  <div>
    {/* 50 lines of JSX */}
  </div>
);

export default function Projects() {
  return (
    <div>
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
```

### ❌ DON'T: Run heavy animations on all devices

```javascript
// Bad
<motion.div animate={{ /* complex animation */ }}>
```

### ✅ DO: Check performance mode

```javascript
// Good
{!shouldReduceMotion && (
  <motion.div animate={{ /* complex animation */ }}>
)}
```

### ❌ DON'T: Recreate arrays on every render

```javascript
// Bad
const items = [
  { id: 1, value: Math.random() },  // New array every render!
  { id: 2, value: Math.random() },
];
```

### ✅ DO: Use useMemo

```javascript
// Good
const items = useMemo(() => [
  { id: 1, value: someComputation() },
  { id: 2, value: someComputation() },
], []);
```

## Testing Considerations

- Test both mobile and desktop (performance mode)
- Verify animations don't break layout
- Check lazy loading triggers correctly
- Ensure cleanup functions prevent memory leaks
- Test theme switching (light/dark)
