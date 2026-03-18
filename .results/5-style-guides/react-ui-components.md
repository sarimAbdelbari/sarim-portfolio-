# Style Guide: React UI Components

## Overview

UI components are reusable, primitive building blocks (Button, Container, ToggleMode, Dropdown). They typically range from 50-100 lines and focus on single responsibilities with variant support.

## Unique Conventions

### 1. Class Variance Authority (CVA)

UI primitives MUST use CVA for variant management:

```javascript
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "base-classes-here",  // Shared base classes
  {
    variants: {
      variant: {
        default: "variant-specific-classes",
        destructive: "destructive-classes",
        outline: "outline-classes",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3",
        lg: "h-10 px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

### 2. Radix Slot Composition

Components supporting composition MUST use Radix Slot with `asChild` prop:

```javascript
import { Slot } from "@radix-ui/react-slot";

function Button({ asChild = false, className, variant, size, ...props }) {
  const Comp = asChild ? Slot : "button";
  
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
```

**Usage:**
```jsx
<Button asChild>
  <Link href="/about">Navigate</Link>
</Button>
```

### 3. cn() Utility for All ClassNames

ALL className props MUST use `cn()` utility:

```javascript
import { cn } from "@/lib/utils";

<div className={cn(
  'base-classes',
  variantClasses,
  className  // User override
)}>
```

### 4. Dual Export Pattern

Export both component AND variants:

```javascript
export { Button, buttonVariants };
```

**Why:** Allows external components to reuse variant styling.

### 5. Accessibility Attributes

ALL interactive components MUST include:

```javascript
// Focus states
"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"

// Disabled states
"disabled:pointer-events-none disabled:opacity-50"

// ARIA labels for icon-only buttons
<Button>
  <Icon />
  <span className="sr-only">Accessible label</span>
</Button>
```

### 6. Props Destructuring Pattern

```javascript
function Component({
  className,
  variant,
  size,
  asChild = false,  // Defaults in destructure
  ...props           // Spread rest
}) {
  return <Element {...props} />;
}
```

### 7. Data Attributes

Add data attributes for testing/debugging:

```javascript
<button data-slot="button" className={...}>
```

## File Structure Template

```javascript
// 1. Imports
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// 2. Variant definition (CVA)
const componentVariants = cva(
  "base classes here",
  {
    variants: { /* ... */ },
    defaultVariants: { /* ... */ },
  }
);

// 3. Component function
function Component({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";  // Or appropriate element
  
  return (
    <Comp
      data-slot="component"
      className={cn(componentVariants({ variant, size, className }))}
      {...props}
    />
  );
}

// 4. Dual export
export { Component, componentVariants };
```

## Variant Naming Conventions

### Standard Variant Names

**variant prop:**
- `default` - Primary action
- `destructive` - Dangerous action
- `outline` - Secondary action
- `secondary` - Alternate styling
- `ghost` - Minimal styling
- `link` - Text-only link style

**size prop:**
- `default` - Standard size
- `sm` - Small
- `lg` - Large
- `icon` - Icon-only (square)

## Common Patterns

### Container Pattern

```javascript
const Container = ({ children, className }) => {
  return (
    <div className={cn('w-full max-w-[1366px] mx-auto px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  );
};
```

**Key Features:**
- Max-width constraint
- Responsive padding
- Horizontal centering
- Custom className support

### Theme Toggle Pattern

```javascript
'use client';

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ToggleMode() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun className="rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
```

### Icon Sizing in Buttons

```javascript
const buttonVariants = cva(
  "... [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
  // ...
);
```

**What this does:**
- `[&_svg]:pointer-events-none` - Icons don't block clicks
- `[&_svg:not([class*='size-'])]:size-4` - Default 1rem size
- `[&_svg]:shrink-0` - Prevent flex shrinking

## Semantic Color Tokens

ALWAYS use semantic tokens, never raw values:

```javascript
// ✅ Good
"bg-primary text-primary-foreground"

// ❌ Bad
"bg-[#017afc] text-[#ffffff]"
```

**Token Pairs:**
- `primary` + `primary-foreground`
- `secondary` + `secondary-foreground`
- `accent` + `accent-foreground`
- `destructive` + `destructive-foreground`
- `muted` + `muted-foreground`

## Responsive Modifiers

```javascript
"px-4 sm:px-6 lg:px-8"  // Responsive padding
"text-sm md:text-base"   // Responsive typography
"hidden md:block"        // Hide on mobile, show on desktop
```

## Anti-Patterns to Avoid

### ❌ DON'T: Mix CVA with manual conditionals

```javascript
// Bad
className={`${baseClasses} ${variant === 'primary' ? primaryClasses : secondaryClasses}`}
```

### ✅ DO: Use CVA

```javascript
// Good
className={cn(componentVariants({ variant }))}
```

### ❌ DON'T: Forget accessibility

```javascript
// Bad
<button>
  <Icon />
</button>
```

### ✅ DO: Add sr-only text

```javascript
// Good
<button>
  <Icon />
  <span className="sr-only">Button action</span>
</button>
```

### ❌ DON'T: Hardcode state styles

```javascript
// Bad
<button style={{ backgroundColor: isActive ? 'blue' : 'gray' }}>
```

### ✅ DO: Use Tailwind state variants

```javascript
// Good
<button className={cn(
  'bg-muted',
  isActive && 'bg-primary'
)}>
```

## Component Checklist

When creating new UI component:

- [ ] `'use client'` directive if using hooks
- [ ] Import CVA and define variants
- [ ] Use cn() utility for className merging
- [ ] Support `asChild` prop (if composition makes sense)
- [ ] Include focus-visible states
- [ ] Include disabled states
- [ ] Add sr-only text for icon-only elements
- [ ] Add data-slot attribute
- [ ] Export both component and variants
- [ ] Use semantic color tokens
- [ ] Support responsive sizing
