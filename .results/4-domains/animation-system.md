# Animation System Domain

## Overview

The animation system is built entirely on Framer Motion and provides smooth, performant animations throughout the portfolio. The system includes entrance animations, hover effects, infinite loops, and performance optimizations for mobile devices.

## Core Library: Framer Motion

All animations use Framer Motion exclusively:

```3:4:components/layout/loadingWarpper.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
```

**Key Imports:**
- `motion` - Creates animated elements (`motion.div`, `motion.button`)
- `AnimatePresence` - Handles exit animations when components unmount

## Animation Props Pattern

### Basic Animation Structure

```107:122:components/sections/hero.jsx
            <motion.div 
                className="flex justify-center items-start gap-4 flex-col max-w-xl relative z-10"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
```

**Standard Props:**
- `initial` - Starting state before animation
- `animate` - Target state to animate toward
- `transition` - Timing and easing configuration

### Scroll-Triggered Animations

```276:277:components/sections/projects.jsx
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
```

**Viewport-Based Animation:**
- `whileInView` - Animate when element enters viewport
- `viewport={{ once: true }}` - Trigger only once (prevents re-animation on scroll back)
- Ideal for section entrance animations

### Hover Effects

```39:40:components/sections/projects.jsx
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
```

**Interaction States:**
- `whileHover` - Animation during mouse hover
- `whileTap` - Animation during click/tap
- Common pattern: scale up on hover (1.05), scale down on tap (0.95)

## Performance Mode Integration

### The usePerformanceMode Hook

```1:26:components/hooks/usePerformanceMode.js
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
```

**Purpose:** Automatically disable heavy animations on mobile devices (< 768px) to improve performance.

### Using Performance Mode in Components

```6:6:components/sections/hero.jsx
import { usePerformanceMode } from "@/components/hooks/usePerformanceMode";
```

```10:11:components/sections/hero.jsx
    // Performance mode for mobile devices
    const { shouldReduceMotion } = usePerformanceMode();
```

### Conditional Animation Rendering

```76:105:components/sections/hero.jsx
            {/* Animated Background Skills - Disabled on mobile for performance */}
            {!shouldReduceMotion && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                    {backgroundSkills.map((skill, index) => (
                        <motion.div
                            key={skill.text}
                            className="absolute text-muted-foreground/50 font-semibold select-none"
                            style={{
                                fontSize: `${skill.fontSize}px`,
                                left: `${skill.left}%`,
                                top: `${skill.top}%`,
                            }}
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

**Pattern:** Wrap expensive animations in `{!shouldReduceMotion && ...}` conditional.

**What Gets Disabled on Mobile:**
- Background floating elements (particles, orbs)
- Complex transform animations (multi-axis movement)
- Decorative animations that don't affect functionality

**What Stays Enabled:**
- Entrance animations (fade in, slide in)
- Hover effects on buttons and cards
- Page transition animations

## Keyframe Animations

### Array Syntax for Keyframes

```88:92:components/sections/hero.jsx
                            animate={{
                                x: [0, skill.moveX, 0, -skill.moveX, 0],
                                y: [0, skill.moveY, 0, -skill.moveY, 0],
                                opacity: [0.1, 0.3, 0.1, 0.3, 0.1],
                                rotate: [0, skill.rotate, 0, -skill.rotate, 0],
                            }}
```

**Array Format:**
- Each value is a keyframe
- Values interpolated evenly across duration
- Creates smooth looping motion: `[start, peak1, middle, peak2, end]`

### Infinite Loop Pattern

```94:98:components/sections/hero.jsx
                            transition={{
                                duration: skill.duration,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: index * 0.3,
                            }}
```

**Infinite Animation Configuration:**
- `repeat: Infinity` - Loop forever
- `ease: "easeInOut"` - Smooth acceleration/deceleration
- `delay: index * 0.3` - Stagger start times for visual variety

## AnimatePresence for Exit Animations

### Mount/Unmount Transitions

```52:59:components/layout/loadingWarpper.jsx
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
```

**Key Concepts:**
- Wrap conditional renders in `<AnimatePresence>`
- `mode="wait"` - Wait for exit animation before rendering next component
- `exit` prop defines exit animation
- `key` prop required to track component identity

### Cinema Curtain Effect

```22:35:components/layout/loadingWarpper.jsx
      {/* Cinema curtain top */}
      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: "-100%" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -top-0.5 left-0 w-full h-1/2 bg-background z-50"
            style={{ transformOrigin: "top" }}
          >
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-chart-1 to-chart-2"></div>
          </motion.div>
        )}
      </AnimatePresence>
```

**Custom Easing:**
- `ease: [0.22, 1, 0.36, 1]` - Custom cubic-bezier curve
- Creates dramatic, cinematic reveal effect
- Top curtain slides up (`y: "-100%"`), bottom slides down (`y: "100%"`)

## Transition Configuration

### Common Easing Functions

```112:112:components/sections/hero.jsx
                transition={{ duration: 0.5, ease: "easeOut" }}
```

**Easing Types Used:**
- `"easeOut"` - Fast start, slow end (good for entrances)
- `"easeInOut"` - Slow start and end (smooth continuous motion)
- `"linear"` - Constant speed (infinite scrollers)
- `[0.22, 1, 0.36, 1]` - Custom cubic-bezier for dramatic effects

### Duration Guidelines

Based on observed patterns in the codebase:

| Animation Type | Duration | Example |
|----------------|----------|---------|
| Fast interactions | 0.2-0.3s | Modal open, tab switch |
| Entrance animations | 0.5-0.8s | Fade in sections |
| Page transitions | 1.0-1.2s | Loading curtain |
| Background loops | 10-30s | Floating orbs, particles |

## Stagger Children Pattern

### Container with Staggered Children

```22:32:components/sections/projects.jsx
const CategoryFilter = ({ categoriesWithCounts, selectedCategory, onSelectCategory }) => (
  <motion.div
    className="flex flex-wrap justify-center gap-2 md:gap-3 mb-16"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
  >
    {categoriesWithCounts.map((category) => (
      <motion.button
        key={category.id}
        onClick={() => onSelectCategory(category.id)}
```

**Pattern:**
1. Parent `motion.div` sets container animation
2. Child elements each have their own `motion` wrapper
3. Can add `transition={{ staggerChildren: 0.1 }}` to parent for sequential reveals

## Hover and Tap Animations

### Card Hover Effect

```55:70:components/sections/projects.jsx
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: project.id * 0.1 }}
    className="group cursor-pointer"
    onClick={() => onCardClick(project)}
  >
    <div className="relative">
      <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 bg-muted/10 border-4 border-background shadow-2xl">
        {isImageLoaded(project.thumbnail) ? (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500 rounded-xl"
          />
```

**Technique:**
- Use CSS `group` utility from Tailwind
- `group-hover:scale-110` - Scale image on card hover
- `transition-transform duration-500` - Smooth 500ms transition
- Mix of Framer Motion (entrance) and CSS transitions (hover) for optimal performance

### Button Hover with Multiple Animations

```196:207:components/sections/hero.jsx
                        {/* Pulsing glow ring */}
                        <motion.div 
                            className="absolute inset-0 rounded-full border-2 border-white/30"
                            animate={{ 
                                scale: [1, 1.1, 1],
                                opacity: [0.5, 0.8, 0.5]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
```

**Layered Effects:**
- Multiple `motion.div` elements for different effects
- Shimmer effect (translate across)
- Glow background (opacity pulse)
- Ring pulse (scale + opacity)
- All synchronized on same button

## Image Swiper Animation

### Transition Between Images

```127:142:components/sections/projects.jsx
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
          )}
        </motion.div>
      </AnimatePresence>
```

**Slide Transition:**
- Enter from right: `initial={{ x: 50 }}`
- Exit to left: `exit={{ x: -50 }}`
- `mode="wait"` prevents overlap during transition
- `key={currentIndex}` triggers animation on index change

## Modal Animations

### Modal Enter/Exit

```174:189:components/sections/projects.jsx
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-md z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative bg-background rounded-3xl p-6 md:p-8 max-w-7xl w-full max-h-[95vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
```

**Two-Layer Animation:**
1. **Backdrop** - Simple fade in/out (200ms)
2. **Modal Content** - Scale + fade + slide (300ms)
   - `scale: 0.9` → `1.0` creates zoom effect
   - `y: 30` → `0` adds subtle upward motion
   - Feels natural and premium

## Loading Animation

### Heartbeat Pulse Effect

```140:147:components/layout/loadingWarpper.jsx
            {/* Heartbeat Loader in the background */}
            <motion.div
              className="absolute w-[400px] h-[400px]"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 rounded-full border-2 border-primary/10 opacity-50 blur-lg"></div>
              <div className="absolute inset-4 rounded-full border-2 border-primary/20 opacity-75"></div>
```

**Layered Rings:**
- Outer ring with blur for glow effect
- Inner ring for definition
- Subtle pulse: `scale: [1, 1.05, 1]`
- 3-second duration for calm rhythm

### Floating Particles

```89:109:components/layout/loadingWarpper.jsx
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-primary/20 rounded-full"
                  style={{
                    left: `${20 + i * 12}%`,
                    top: `${30 + i * 8}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.5, 1]
                  }}
                  transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5
                  }}
                />
              ))}
```

**Particle System:**
- Generate 8 particles with `Array(8).map()`
- Each particle has unique position based on index
- Staggered delays: `delay: i * 0.5`
- Variable durations: `duration: 4 + i` (4-12s)
- Creates organic, non-uniform motion

## useMemo for Performance

### Memoizing Animation Values

```22:39:components/sections/hero.jsx
    // Background skills array with pre-generated random values
    const backgroundSkills = useMemo(() => [
        { text: "Clean Code", fontSize: 24, left: 15, top: 20, duration: 25, moveX: 30, moveY: 20, rotate: 3 },
        { text: "System Design", fontSize: 18, left: 80, top: 15, duration: 30, moveX: -25, moveY: 35, rotate: -2 },
        { text: "UI Friendly", fontSize: 22, left: 10, top: 60, duration: 28, moveX: 40, moveY: -15, rotate: 4 },
        // ... more entries
    ], []);
```

**Why useMemo:**
- Animation values don't change between renders
- Prevents array recreation on every render
- Ensures `key` stability in mapped components
- Critical for performance with many animated elements

## Animation Sequencing

### Delayed Entrance Animations

```114:128:components/sections/hero.jsx
                <motion.p 
                    className="text-primary text-lg md:text-xl font-medium tracking-wide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    Salam, my name is
                </motion.p>
                
                <motion.h1 
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-9"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                >
```

**Sequential Reveals:**
- Each element has incremental delay: 0.3s, 0.3s, 0.4s, 0.6s, 0.8s
- Creates cascading entrance effect
- User's eye naturally follows the sequence
- Total sequence: ~1.4s for complete hero reveal

## Best Practices Summary

### DO:
- ✅ Use `usePerformanceMode()` for components with heavy animations
- ✅ Wrap exit animations in `<AnimatePresence>`
- ✅ Use `viewport={{ once: true }}` for scroll animations
- ✅ Memoize complex animation arrays with `useMemo()`
- ✅ Stagger entrance animations with incremental delays
- ✅ Use keyframe arrays `[start, mid, end]` for smooth loops

### DON'T:
- ❌ Animate layout properties (width, height) - use transform instead
- ❌ Run heavy animations on mobile without performance checks
- ❌ Forget `key` prop on AnimatePresence children
- ❌ Mix Framer Motion and CSS transitions on same property
- ❌ Use extremely short durations (< 150ms) - feels janky
- ❌ Forget cleanup in useEffect (event listeners, intervals)

## Common Animation Values

```javascript
// Entrance fade + slide up
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}

// Hover scale
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}

// Infinite floating
animate={{ y: [0, -10, 0] }}
transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}

// Exit to left
exit={{ opacity: 0, x: -50 }}
transition={{ duration: 0.3 }}
```
