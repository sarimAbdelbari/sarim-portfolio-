# Styling Domain

## Tailwind CSS 4 System

All styling uses Tailwind CSS 4 utility classes with custom design tokens via inline `@theme` directive.

## Global Styles

```1:3:app/globals.css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));
```

**Imports:**
- `tailwindcss` - Core framework
- `tw-animate-css` - Additional animation utilities
- Custom `dark` variant for theme-aware styling

## Design Token System

All colors, spacing, and typography defined as CSS custom properties, then mapped to Tailwind classes via `@theme inline` directive.

### Color Usage Pattern

```jsx
<div className="bg-primary text-primary-foreground">
  Content with theme-aware colors
</div>
```

Maps to `--color-primary` and `--color-primary-foreground` CSS variables.

## Responsive Design

### Mobile-First Approach

```jsx
<div className="px-4 sm:px-6 lg:px-8">
  Responsive padding
</div>
```

**Breakpoints:**
- Base (< 640px): Mobile
- `sm` (640px+): Large mobile/small tablet
- `md` (768px+): Tablet
- `lg` (1024px+): Desktop
- `xl` (1280px+): Large desktop

## State Variants

### Hover and Focus

```jsx
<button className="bg-primary hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring">
  Button with states
</button>
```

**Common Patterns:**
- `hover:` - Mouse hover
- `focus:` - Keyboard focus
- `focus-visible:` - Only keyboard focus (not mouse click)
- `group-hover:` - Parent hover triggers child style
- `dark:` - Dark theme variant

## Utility Composition

### cn() Helper

```1:6:lib/utils.js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

**Purpose:**
- Combines multiple className strings
- Resolves Tailwind class conflicts
- Handles conditional classes

**Usage:**
```jsx
<div className={cn(
  'base-class',
  isActive && 'active-class',
  className  // User-provided className
)}>
```

## Custom Animations

### Tailwind Animations

```jsx
<div className="animate-spin">Loading...</div>
<div className="animate-pulse">Skeleton</div>
```

### CSS Custom Animations

```css
@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

.animate-slideIn {
  animation: slideIn 0.3s ease-out;
}
```

## Layout Patterns

### Container Pattern

```jsx
<Container className="py-20">
  {/* Max-width: 1366px, responsive padding */}
</Container>
```

### Flexbox Layouts

```jsx
<div className="flex items-center justify-between gap-4">
  Centered with spacing
</div>
```

### Grid Layouts

```jsx
<div className="grid grid-cols-2 grid-rows-2 gap-8">
  {projects.map(project => <ProjectCard key={project.id} />)}
</div>
```

## Typography

### Font System

```10:22:app/layout.jsx
const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: "--font-jetbrains-mono",
});
```

**Usage:**
```jsx
<p className="font-sans">Body text (Inter)</p>
<code className="font-mono">Code (JetBrains Mono)</code>
```

## Best Practices

### DO:
- ✅ Use semantic color tokens (`bg-primary`) not raw values
- ✅ Use cn() utility for conditional classes
- ✅ Follow mobile-first responsive pattern
- ✅ Use Tailwind state variants (`hover:`, `focus:`)
- ✅ Keep custom CSS minimal (prefer Tailwind utilities)

### DON'T:
- ❌ Use inline styles except for dynamic values
- ❌ Create custom CSS classes for one-off styling
- ❌ Hardcode pixel values (use Tailwind spacing scale)
- ❌ Forget responsive modifiers on layout properties
- ❌ Mix conflicting Tailwind classes (cn() will merge)
