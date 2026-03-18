# GitHub Copilot Instructions for Sarim Portfolio

## Purpose of This File

This file enables AI coding assistants (GitHub Copilot, Cursor, etc.) to generate features aligned with this portfolio's architecture and style. All conventions documented here are based on **actual, observed patterns** from the codebase—not invented best practices.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [File Categories & Conventions](#file-categories--conventions)
4. [Architectural Domains](#architectural-domains)
5. [Feature Scaffold Guide](#feature-scaffold-guide)
6. [Integration Rules](#integration-rules)
7. [Example Prompt Usage](#example-prompt-usage)

---

## Project Overview

**Type:** Personal Portfolio / Resume Website  
**Stack:** Next.js 15 + React 19 + Tailwind CSS 4 + Framer Motion 12  
**Architecture:** Single-page application with anchor-based section navigation  
**Data:** Static content in `lib/data.js` (no API, no database)

### Application Boundaries

**Within Scope:**
- Static content management via code changes
- Frontend-only architecture
- Framer Motion animations with performance optimization
- Lazy loading and image optimization
- Dark/light theme switching
- Responsive design with mobile-first approach

**Out of Scope:**
- Backend APIs or server routes
- Database integration
- User authentication
- Real-time features (WebSockets, live updates)
- Content Management System (CMS)
- User-generated content

---

## Tech Stack

### Core Technologies

**Framework:** Next.js 15.2.8 (App Router)
- App Router architecture (`app/` directory)
- Server and Client Components
- Built-in image optimization
- Turbopack for development

**UI Library:** React 19.0
- Hooks-based state management (useState, useEffect, useMemo)
- No class components
- Context API for theme

**Styling:** Tailwind CSS 4.0
- Utility-first approach
- Custom design tokens via `@theme inline`
- Mobile-first responsive design

**Animations:** Framer Motion 12.6.3
- Declarative animation API
- Performance mode for mobile
- AnimatePresence for exit animations

**Additional Libraries:**
- **Radix UI** - Accessible component primitives
- **Class Variance Authority (CVA)** - Type-safe variant management
- **next-themes** - Dark/light mode
- **Lucide React** - Icon library
- **Swiper** - Carousel component

### State Management

- Local state: `useState`
- Derived state: `useMemo`
- Side effects: `useEffect`
- Theme: Context API (`next-themes`)
- **No** Redux, Zustand, or global state libraries

### Custom Hooks

- `useLazyLoad` - Single image lazy loading
- `useLazyLoadMultiple` - Batch image lazy loading
- `usePerformanceMode` - Mobile performance optimization

---

## File Categories & Conventions

### React Section Components (`components/sections/`)

**Purpose:** Large page sections (Hero, AboutMe, Skills, Projects, Blog, Contact)  
**Size:** 200-450 lines  
**Examples:** `hero.jsx`, `projects.jsx`, `aboutMe.jsx`

**Key Conventions:**
- Start with `'use client'` directive
- Import and use `usePerformanceMode()` for heavy animations
- Wrap expensive animations in `{!shouldReduceMotion && ...}`
- Define helper components above main component in same file
- Use `<section>` tag with consistent padding: `py-20 px-3 lg:px-10`
- Include entrance animations with `whileInView` and `viewport={{ once: true }}`

**Template:**
```javascript
'use client';

import { motion } from 'framer-motion';
import { usePerformanceMode } from '@/components/hooks/usePerformanceMode';

const HelperComponent = ({ prop }) => (/* ... */);

export default function SectionName() {
  const { shouldReduceMotion } = usePerformanceMode();
  
  return (
    <section className="py-20 px-3 lg:px-10">
      {!shouldReduceMotion && <ExpensiveAnimation />}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        {/* Content */}
      </motion.div>
    </section>
  );
}
```

### React UI Components (`components/ui/`)

**Purpose:** Reusable primitives (Button, Container, ToggleMode, Dropdown)  
**Size:** 50-100 lines  
**Examples:** `button.jsx`, `container.jsx`

**Key Conventions:**
- Use CVA (Class Variance Authority) for variant management
- Support `asChild` prop with Radix Slot for composition
- Use `cn()` utility for all className props
- Export both component and variants
- Include accessibility attributes (focus-visible, disabled, sr-only)

**Template:**
```javascript
import { cva } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const componentVariants = cva(
  "base-classes",
  {
    variants: {
      variant: { default: "...", outline: "..." },
      size: { default: "...", sm: "...", lg: "..." },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

function Component({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(componentVariants({ variant, size, className }))} {...props} />;
}

export { Component, componentVariants };
```

### React Layout Components (`components/layout/`)

**Purpose:** App shell (NavBar, SideMenu, LoadingWrapper, ScrollIndicator)  
**Size:** 100-250 lines  
**Examples:** `navBar.jsx`, `loadingWarpper.jsx`

**Key Conventions:**
- Use fixed positioning with appropriate z-index
- Clean up scroll event listeners in useEffect
- Accept and wrap `children` prop
- Use backdrop-blur for glass effects: `bg-background/80 backdrop-blur-md`

### Custom Hooks (`components/hooks/`)

**Purpose:** Reusable logic (lazy loading, performance checks)  
**Size:** 50-150 lines  
**Examples:** `useLazyLoad.js`, `usePerformanceMode.js`

**Key Conventions:**
- Start with `'use client'` directive
- Name with "use" prefix
- Return objects (not arrays) with named keys
- Accept options object with defaults
- Clean up side effects with return function

**Template:**
```javascript
'use client';

import { useState, useEffect } from 'react';

export const useCustomHook = (param, options = {}) => {
  const { option1 = default1 } = options;
  const [state, setState] = useState(initial);

  useEffect(() => {
    // Effect logic
    return () => {
      // Cleanup
    };
  }, [dependencies]);

  return { state, helperFunction: () => {} };
};
```

### Next.js Pages (`app/`)

**Purpose:** Define routes and compose sections  
**Examples:** `app/page.jsx`, `app/(pages)/blog/page.jsx`

**Key Conventions:**
- Pure composition—no useState or useEffect
- Wrap sections in `<section id="...">` for anchor navigation
- Separate sections with `<LineSeparator>`
- Use `@/` import alias

**Template:**
```javascript
import Hero from "@/components/sections/hero";
import AboutMe from "@/components/sections/aboutMe";
import LineSeparator from "@/components/layout/lineSperator";

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <section id="home"><Hero /></section>
      <LineSeparator variant="dashed" showDot={true} />
      <section id="about"><AboutMe /></section>
    </div>
  );
}
```

### Data Management (`lib/data.js`)

**Purpose:** Centralized static content  
**Structure:**
```javascript
export const categories = [
  { id: 'all', name: 'All Projects', icon: '🎯' },
  // ...
];

export const projectsData = [
  {
    id: 1,
    title: "Project Name",
    description: "...",
    thumbnail: "/assets/images/projects/thumb.png",
    images: ["/assets/images/projects/1.png", ...],
    technologies: ["React", "Next.js"],
    category: "landing",
    githubUrl: "https://github.com/...",
    liveUrl: "https://...",
    featured: true,
    year: "2024"
  },
];
```

**Conventions:**
- All data exported as named exports
- Consistent object shapes across all entries
- Numeric IDs for stable React keys
- Asset paths relative to `public/`: `/assets/...`

### Utility Functions (`lib/utils.js`)

**Purpose:** Helper functions  
**Key Function:**
```javascript
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

Use `cn()` for all dynamic className logic.

---

## Architectural Domains

### Animation System

**Library:** Framer Motion exclusively

**Core Patterns:**

1. **Entrance Animations:**
```javascript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
```

2. **Hover Effects:**
```javascript
<motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
```

3. **Infinite Loops:**
```javascript
<motion.div
  animate={{ y: [0, -10, 0] }}
  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
>
```

4. **Performance Mode:**
```javascript
const { shouldReduceMotion } = usePerformanceMode();
{!shouldReduceMotion && <ExpensiveAnimation />}
```

**Constraints:**
- Disable heavy animations on mobile (< 768px)
- Use `AnimatePresence` for exit animations
- Memoize complex animation arrays with `useMemo`
- Prefer `transform` properties over layout properties

### Lazy Loading

**Hooks:** `useLazyLoad`, `useLazyLoadMultiple`

**Pattern:**
```javascript
const allImages = useMemo(() =>
  projects.flatMap(p => [p.thumbnail, ...p.images]),
  [projects]
);

const { ref, isImageLoaded } = useLazyLoadMultiple(allImages, {
  threshold: 0.1,
  rootMargin: '200px'
});

<section ref={ref}>
  {isImageLoaded(image.src) ? (
    <Image src={image.src} alt="..." fill />
  ) : (
    <ImagePlaceholder />
  )}
</section>
```

**Constraints:**
- Hero images: `priority={true}`, `loading="eager"`
- Below-fold images: Lazy load with generous `rootMargin`
- Always provide placeholder during loading

### Theming

**System:** `next-themes` + CSS custom properties

**Setup:**
```javascript
// app/layout.jsx
<ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
```

**Token Usage:**
```javascript
// Always use semantic tokens
<div className="bg-primary text-primary-foreground">
```

**Color Pairs:**
- `primary` + `primary-foreground`
- `secondary` + `secondary-foreground`
- `accent` + `accent-foreground`
- `muted` + `muted-foreground`

**Constraints:**
- Never use raw hex values in components
- Define all colors in `app/globals.css`
- Support both light and dark themes

### Styling

**Framework:** Tailwind CSS 4

**Patterns:**

1. **cn() Utility:**
```javascript
<div className={cn('base-class', condition && 'conditional-class', className)}>
```

2. **Responsive:**
```javascript
<div className="px-4 sm:px-6 lg:px-8">
```

3. **State Variants:**
```javascript
<button className="bg-primary hover:bg-primary/90 focus-visible:ring-2">
```

**Constraints:**
- Mobile-first responsive design
- Use semantic color tokens
- Avoid inline styles except for dynamic values
- Keep custom CSS minimal

### Image Optimization

**Component:** Next.js `<Image>`

**Patterns:**

1. **Hero Images:**
```javascript
<Image 
  src="/assets/images/hero.png"
  alt="Description"
  width={384}
  height={384}
  priority={true}
  loading="eager"
/>
```

2. **Gallery Images:**
```javascript
<Image src={src} alt="..." fill className="object-cover" />
```

**Constraints:**
- Always specify width/height OR use `fill` prop
- Use `priority={true}` for above-fold images
- Include descriptive `alt` text
- Lazy load below-fold images

---

## Feature Scaffold Guide

### Adding a New Section Component

**Steps:**

1. **Create file:** `components/sections/newSection.jsx`

2. **Use template:**
```javascript
'use client';

import { motion } from 'framer-motion';
import { usePerformanceMode } from '@/components/hooks/usePerformanceMode';

export default function NewSection() {
  const { shouldReduceMotion } = usePerformanceMode();
  
  return (
    <section className="py-20 px-3 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold">Section Title</h2>
          {/* Section content */}
        </motion.div>
      </div>
    </section>
  );
}
```

3. **Add to page:** `app/page.jsx`
```javascript
import NewSection from "@/components/sections/newSection";

<section id="newSection">
  <NewSection />
</section>
<LineSeparator variant="dashed" showDot={true} />
```

4. **Update NavBar:** Add to navigation items

### Adding a New UI Component

**Steps:**

1. **Create file:** `components/ui/newComponent.jsx`

2. **Use CVA template:**
```javascript
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const newComponentVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        outline: "border bg-background",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-8 px-3",
        lg: "h-12 px-6",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

function NewComponent({ className, variant, size, ...props }) {
  return (
    <div
      className={cn(newComponentVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { NewComponent, newComponentVariants };
```

3. **Import and use:**
```javascript
import { NewComponent } from "@/components/ui/newComponent";

<NewComponent variant="outline" size="lg">Content</NewComponent>
```

### Adding a New Project

**Steps:**

1. **Add images:** Place in `public/assets/images/projects/`

2. **Update data:** `lib/data.js`
```javascript
{
  id: 6,  // Next sequential ID
  title: "New Project",
  description: "Project description...",
  thumbnail: "/assets/images/projects/new-thumb.png",
  images: [
    "/assets/images/projects/new-1.png",
    "/assets/images/projects/new-2.png",
  ],
  technologies: ["React", "Next.js", "Tailwind"],
  category: "saas",  // Must match category id
  githubUrl: "https://github.com/...",
  liveUrl: "https://...",
  featured: false,
  year: "2024"
}
```

3. **Deploy** - Project automatically appears!

### Adding a Custom Hook

**Steps:**

1. **Create file:** `components/hooks/useNewHook.js`

2. **Use template:**
```javascript
'use client';

import { useState, useEffect } from 'react';

export const useNewHook = (param, options = {}) => {
  const { option1 = default1 } = options;
  const [state, setState] = useState(initial);

  useEffect(() => {
    // Logic
    return () => {
      // Cleanup
    };
  }, [param]);

  return { state, helper: () => {} };
};
```

3. **Import and use:**
```javascript
import { useNewHook } from '@/components/hooks/useNewHook';

const { state, helper } = useNewHook(value, { option1: true });
```

---

## Integration Rules

These rules prevent inconsistent or non-compliant code:

### Animation Rules

✅ **DO:**
- Use `usePerformanceMode()` in components with heavy animations
- Wrap expensive animations in `{!shouldReduceMotion && ...}`
- Use `whileInView` with `viewport={{ once: true }}` for scroll animations
- Memoize animation arrays with `useMemo`

❌ **DON'T:**
- Animate layout properties (width, height) - use transform instead
- Run heavy animations on mobile without performance checks
- Mix Framer Motion and CSS transitions on same property
- Forget `key` prop on AnimatePresence children

### Component Rules

✅ **DO:**
- Start interactive components with `'use client'`
- Use CVA for UI component variants
- Use `cn()` utility for all className logic
- Export both component and variants from UI components
- Colocate helper components in same file as main component

❌ **DON'T:**
- Create separate files for one-off helpers
- Inline large helpers (extract to component)
- Use inline styles except for truly dynamic values
- Forget accessibility attributes (focus, disabled, sr-only)

### Data Rules

✅ **DO:**
- Import data from `lib/data.js`
- Use `useMemo` for filtering and transformations
- Use numeric IDs for stable React keys
- Place assets in `public/assets/` with leading slash paths

❌ **DON'T:**
- Scatter data across multiple files
- Inline data in components
- Use array indices as keys for dynamic lists
- Make API calls (this is a static site)

### Theming Rules

✅ **DO:**
- Use semantic color tokens (`bg-primary`, not `bg-[#017afc]`)
- Test both light and dark themes
- Use token pairs (`primary` + `primary-foreground`)
- Define new colors in `globals.css` first

❌ **DON'T:**
- Hardcode colors outside of globals.css
- Use `dark:` variants excessively (prefer semantic tokens)
- Use pure black (#000) or white (#fff) for large areas

### Lazy Loading Rules

✅ **DO:**
- Use `useLazyLoadMultiple` for galleries
- Set generous `rootMargin` (100-200px) for smooth UX
- Show placeholder during loading
- Collect image URLs with `useMemo`

❌ **DON'T:**
- Lazy load hero/above-fold images (use `priority={true}` instead)
- Forget error handling for failed images
- Create new image arrays on every render

---

## Example Prompt Usage

### Example 1: Add New Section

**User Prompt:**
> "Create a testimonials section showing client feedback with star ratings"

**Expected AI Response:**

Creates `components/sections/testimonials.jsx`:
```javascript
'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TestimonialCard = ({ name, role, text, rating }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-card p-6 rounded-lg"
  >
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={i < rating ? "text-primary" : "text-muted"} size={16} />
      ))}
    </div>
    <p className="text-foreground mb-4">{text}</p>
    <div>
      <p className="font-semibold">{name}</p>
      <p className="text-sm text-muted-foreground">{role}</p>
    </div>
  </motion.div>
);

export default function Testimonials() {
  const testimonials = [
    { name: "Client Name", role: "CEO, Company", text: "Great work!", rating: 5 },
    // ...
  ];

  return (
    <section className="py-20 px-3 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16"
        >
          Client Testimonials
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={i} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

Then adds to `app/page.jsx`:
```javascript
import Testimonials from "@/components/sections/testimonials";

<section id="testimonials">
  <Testimonials />
</section>
<LineSeparator variant="dashed" showDot={true} />
```

### Example 2: Create Modal Component

**User Prompt:**
> "Create a reusable modal component with backdrop and close button"

**Expected AI Response:**

Creates `components/ui/modal.jsx`:
```javascript
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';

export function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    const handleEscape = (e) => e.key === 'Escape' && onClose();
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-background rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">{title}</h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

**Usage:**
```javascript
const [isOpen, setIsOpen] = useState(false);

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Modal Title">
  <p>Modal content here</p>
</Modal>
```

### Example 3: Add Filter Feature

**User Prompt:**
> "Add a search/filter feature to the blog section"

**Expected AI Response:**

Updates `components/sections/blog.jsx`:
```javascript
const [searchQuery, setSearchQuery] = useState('');

const filteredPosts = useMemo(() =>
  blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.description.toLowerCase().includes(searchQuery.toLowerCase())
  ),
  [searchQuery, blogPosts]
);

return (
  <section className="py-20 px-3 lg:px-10">
    <div className="max-w-7xl mx-auto">
      <input
        type="text"
        placeholder="Search blog posts..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full max-w-md mx-auto mb-8 px-4 py-2 bg-background border border-border rounded-lg"
      />
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map(post => (
          <BlogCard key={post.id} {...post} />
        ))}
      </div>
      
      {filteredPosts.length === 0 && (
        <p className="text-center text-muted-foreground">No posts found</p>
      )}
    </div>
  </section>
);
```

---

## Summary

This portfolio follows a consistent, production-grade architecture with clear patterns for:

- **Animations:** Framer Motion with performance mode
- **Styling:** Tailwind CSS with semantic tokens
- **Components:** CVA variants + Radix composition
- **Data:** Static centralized in lib/data.js
- **Images:** Lazy loading with Next.js optimization
- **Theme:** next-themes with CSS custom properties

When adding features, follow these established patterns to maintain consistency and code quality. All conventions documented here are **extracted from actual code**, not theoretical best practices.

For detailed implementation examples, refer to existing section and UI components in the codebase.
