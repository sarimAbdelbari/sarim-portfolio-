# UI Components Domain

## Overview

The UI components domain represents reusable, primitive UI elements that form the foundation of the design system. These components live in `components/ui/` and provide consistent, accessible, and composable building blocks.

## Core Patterns

### 1. Client-Side Component Declaration

All interactive UI components begin with the `"use client"` directive:

```1:1:components/ui/button.jsx
import * as React from "react"
```

This is required because UI components use hooks (useState, useEffect) and handle browser events.

### 2. Class Variance Authority (CVA) for Variants

UI primitives use CVA to define type-safe component variants:

```7:36:components/ui/button.jsx
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

**Key Characteristics:**
- Base classes define shared styles across all variants
- `variants` object defines different visual treatments
- `defaultVariants` specifies fallback values
- Semantic naming: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`

### 3. Radix Slot Composition Pattern

Components support composition via the `asChild` prop using Radix Slot:

```38:52:components/ui/button.jsx
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} />
  );
}
```

**Usage Example:**
```jsx
// Renders as button
<Button>Click me</Button>

// Renders as Link component, preserving Button styles
<Button asChild>
  <Link href="/projects">View Projects</Link>
</Button>
```

This pattern prevents unnecessary DOM nesting and allows semantic HTML control.

### 4. cn() Utility for Class Merging

All components use the `cn()` utility for intelligent className merging:

```5:5:components/ui/button.jsx
import { cn } from "@/lib/utils"
```

```1:6:lib/utils.js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

**Benefits:**
- Resolves Tailwind class conflicts (e.g., `bg-primary bg-secondary` → keeps only last)
- Handles conditional classes: `cn('base', condition && 'conditional')`
- Merges user-provided className with component defaults

## Component Structure Pattern

UI components follow a consistent structure:

1. **Imports** - React, Radix, CVA, utilities
2. **Variant Definition** - CVA configuration
3. **Component Function** - Main component with destructured props
4. **Export** - Named exports for component and variants

### Container Component Example

```1:13:components/ui/container.jsx
import React from 'react';
import { cn } from '@/lib/utils';

const Container = ({ children, className }) => {
  return (
    <div className={cn('w-full max-w-[1366px] mx-auto px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  );
};

export default Container;
```

**Key Features:**
- Responsive padding: `px-4 sm:px-6 lg:px-8`
- Max-width constraint: `max-w-[1366px]`
- Horizontal centering: `mx-auto`
- Accepts custom className for overrides

### Toggle Mode Component

```1:27:components/ui/toggle-mode.jsx
'use client';

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ToggleMode() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative rounded-full"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
```

**Implementation Details:**
- Uses `next-themes` hook for theme access
- Icon rotation/scale transitions: `rotate-0 scale-100` → `rotate-90 scale-0`
- Duration controlled via Tailwind: `transition-all` (default 150ms)
- Screen reader text: `sr-only` class for accessibility

## Accessibility Patterns

All UI components implement comprehensive accessibility:

### Focus Management

```8:8:components/ui/button.jsx
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
```

**Focus States:**
- `outline-none` - Removes default browser outline
- `focus-visible:border-ring` - Custom border color on keyboard focus
- `focus-visible:ring-ring/50` - Ring color with opacity
- `focus-visible:ring-[3px]` - 3px ring width for visibility

### ARIA Attributes

```17:19:components/ui/toggle-mode.jsx
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
```

- `sr-only` class for screen reader-only text
- `aria-invalid` states for form validation feedback

### Disabled States

```8:8:components/ui/button.jsx
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
```

- `disabled:pointer-events-none` - Prevents interaction
- `disabled:opacity-50` - Visual feedback for disabled state

## Dropdown Menu Component

The dropdown menu demonstrates advanced composition with Radix UI:

```1:10:components/ui/dropdown-menu.jsx
"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import {
  CheckIcon,
  ChevronRightIcon,
  DotFilledIcon,
} from "@radix-ui/react-icons"
```

**Key Primitives Wrapped:**
- `DropdownMenu` - Root component
- `DropdownMenuTrigger` - Button to open menu
- `DropdownMenuContent` - Popover container
- `DropdownMenuItem` - Individual menu items
- `DropdownMenuCheckboxItem` - Checkbox items
- `DropdownMenuRadioItem` - Radio group items
- `DropdownMenuSeparator` - Visual divider

**Styling Pattern:**
Each primitive receives consistent styling via cn():
- Background colors from theme tokens
- Hover and focus states
- Animations (fade, zoom, slide)
- Typography and spacing

## Design Token Integration

UI components rely exclusively on semantic design tokens:

```12:13:components/ui/button.jsx
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
```

**Token Categories:**
- **Colors**: `primary`, `secondary`, `accent`, `muted`, `destructive`, `background`, `foreground`
- **Foreground Pairs**: `primary-foreground`, `secondary-foreground` (ensure contrast)
- **Opacity Modifiers**: `/90`, `/50`, `/20` for hover and inactive states
- **Borders**: `border`, `ring` for focus indicators

Tokens map to CSS custom properties defined in `globals.css`:

```67:69:app/globals.css
  /* Primary - slightly darker for better contrast on light bg */
  --primary: #017afc;
  --primary-foreground: #ffffff;
```

## Responsive Behavior

UI components adapt to screen sizes using Tailwind breakpoints:

```3:7:components/ui/container.jsx
const Container = ({ children, className }) => {
  return (
    <div className={cn('w-full max-w-[1366px] mx-auto px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
```

**Breakpoint System:**
- Base (mobile): `px-4`
- Small (`sm`: 640px): `sm:px-6`
- Large (`lg`: 1024px): `lg:px-8`

## Icon Integration

Components seamlessly integrate Lucide React icons:

```8:8:components/ui/button.jsx
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
```

**SVG Handling:**
- `[&_svg]:pointer-events-none` - Icons don't block clicks
- `[&_svg:not([class*='size-'])]:size-4` - Default 1rem size unless overridden
- `[&_svg]:shrink-0` - Prevent icon distortion in flex layouts
- `gap-2` - Automatic spacing between icon and text

## Component Exports

Each component file exports both the component and its variants:

```55:55:components/ui/button.jsx
export { Button, buttonVariants }
```

**Why Export Variants:**
- External components can reuse variant styling
- Enables extending components with additional variants
- Allows using variant classes without full component overhead

## Common Usage Patterns

### Basic Button

```jsx
<Button variant="default" size="lg">
  Click me
</Button>
```

### Button as Link

```jsx
<Button asChild>
  <Link href="/about">Learn More</Link>
</Button>
```

### Button with Icon

```jsx
<Button variant="outline">
  <Send size={18} />
  Send Message
</Button>
```

### Icon-Only Button

```jsx
<Button variant="ghost" size="icon">
  <X size={20} />
</Button>
```

## Testing Considerations

UI components are designed for testability:

1. **Semantic HTML** - Use proper button/link elements for easy querying
2. **ARIA Labels** - Screen reader text enables accessible testing
3. **Data Attributes** - `data-slot="button"` for targeting in tests
4. **Consistent Structure** - Predictable DOM output for snapshot testing

## Future Extension Points

The UI component architecture supports easy extension:

1. **New Variants** - Add to CVA variant object
2. **New Sizes** - Add to size variant object
3. **New Components** - Follow same pattern (CVA + Radix + cn)
4. **Theme Tokens** - Add new tokens to globals.css, reference in components
