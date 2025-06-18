I'll help you understand your codebase by exploring the file structure and examining key files to understand your coding patterns and dependencies. Let me start by getting an overview of your project structure.
Ran tool
Now let me explore the key directories and files to understand your project structure and dependencies:
Read file: package.json
Ran tool
Ran tool
Ran tool

Now let me read the key files to understand your coding style and patterns:
Read file: app/layout.jsx
Read file: app/page.jsx
Read file: lib/utils.js
Read file: components.json

Let me explore more of your component structure to understand your coding patterns:
Ran tool
Ran tool
Ran tool

Now let me read some key component files to understand your coding style and patterns:
Read file: components/hero.jsx
Read file: components/ui/button.jsx

Read file: components/provider/theme-provider.jsx

Read file: app/globals.css

Ran tool

Ran tool

Read file: app/pages/blog/blog.jsx

Read file: components/aboutMe.jsx
Now let me read some configuration files and explore more of the structure:
Read file: next.config.mjs
Read file: eslint.config.mjs
Read file: jsconfig.json

Based on my comprehensive analysis of your codebase, here's a detailed overview of your coding style, patterns, and dependencies:

## **Project Structure & Architecture**

Your project is a **Next.js 15.2.3** portfolio website with a modern, well-organized structure:

```
my-app/
├── app/                    # Next.js App Router
│   ├── layout.jsx         # Root layout with providers
│   ├── page.jsx           # Home page
│   ├── globals.css        # Global styles & theme variables
│   └── pages/blog/        # Additional pages
├── components/            # Reusable components
│   ├── ui/               # Shadcn/ui components
│   ├── layout/           # Layout-specific components  
│   └── provider/         # Context providers
├── lib/                  # Utility functions
└── public/assets/        # Static assets
```

## **Tech Stack & Dependencies**

### **Core Framework**
- **Next.js 15.2.3** with App Router
- **React 19.0.0** - Latest version
- **JavaScript** (JSX) - No TypeScript

### **Styling & UI**
- **Tailwind CSS 4** - Latest version with custom CSS variables
- **Shadcn/ui** components with customization
- **Framer Motion 12.6.3** - Advanced animations
- **Lucide React** - Icon library
- **next-themes** - Theme switching
- **class-variance-authority** - Component variants
- **clsx & tailwind-merge** - Conditional styling

### **Additional Libraries**
- **react-simple-typewriter** - Typing animations
- **@radix-ui** components - Headless UI primitives

## **Coding Style & Patterns**

### **1. Component Structure**
You consistently use:
```javascript
"use client"; // When needed for interactivity
import { motion } from 'framer-motion';
// Other imports...

const ComponentName = () => {
  // Component logic
  return (
    <motion.section className="...">
      {/* JSX content */}
    </motion.section>
  );
};

export default ComponentName;
```

### **2. Animation Patterns**
Heavy use of **Framer Motion** with consistent patterns:
```javascript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};
```

### **3. Styling Approach**
- **Utility-first** with Tailwind CSS
- **Semantic color system** using CSS variables
- **Responsive design** with mobile-first approach
- **Custom theme** with light/dark modes

### **4. File Naming**
- **camelCase** for component files (e.g., `aboutMe.jsx`, `navBar.jsx`)
- **kebab-case** for UI components (e.g., `toggle-mode.jsx`)
- **Consistent** JSX extension usage

### **5. Import Patterns**
You use **absolute imports** with `@/` prefix:
```javascript
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Hero from "@/components/hero";
```

## **Architecture Patterns**

### **1. Component Organization**
- **Atomic design** principles
- **Separation of concerns** (UI, layout, business logic)
- **Reusable components** in `/ui` directory

### **2. State Management**
- **Local state** with React hooks
- **Context providers** for global state (theme)
- **No external state management** (Redux, Zustand)

### **3. Styling Architecture**
- **CSS-in-JS** approach with Tailwind
- **Design system** with consistent spacing, colors, typography
- **Component variants** using `class-variance-authority`

### **4. Performance Optimizations**
- **Next.js Image** component usage
- **useMemo** for expensive calculations
- **Lazy loading** with viewport-based animations

## **Theme & Design System**

Your custom theme features:
- **Blue to purple gradient** color palette
- **Comprehensive CSS variables** for both light/dark modes
- **Custom scrollbar** styling
- **Consistent border radius** and spacing
- **Typography** using Outfit and Geist Mono fonts

## **Code Quality**

- **ESLint** configuration with Next.js rules
- **Consistent formatting** and structure
- **Modern JavaScript** features (arrow functions, destructuring)
- **Clean component composition**

## **Areas of Expertise Demonstrated**

1. **Modern React patterns** and hooks
2. **Advanced animations** with Framer Motion
3. **Responsive design** and accessibility
4. **Performance optimization**
5. **Design systems** and component libraries
6. **Theme management** and dark mode
7. **Next.js App Router** architecture

Your codebase shows **professional-level** React development with modern patterns, excellent organization, and attention to user experience through smooth animations and responsive design.