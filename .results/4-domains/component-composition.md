# Component Composition Domain

## File Organization

### Section Components

**Location:** `components/sections/`
**Purpose:** Large page sections (Hero, AboutMe, Skills, Projects, Blog, Contact)
**Size:** 200-450 lines

### UI Components

**Location:** `components/ui/`
**Purpose:** Reusable primitives (Button, Container, Dropdown)
**Size:** 50-100 lines

### Layout Components

**Location:** `components/layout/`
**Purpose:** App shell elements (NavBar, SideMenu, LoadingWrapper)
**Size:** 100-250 lines

## Helper Component Pattern

### Colocation

```12:18:components/sections/projects.jsx
const ImagePlaceholder = ({ className }) => (
  <div className={`bg-muted/20 animate-pulse ${className}`}>
    <div className="flex items-center justify-center h-full">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  </div>
);
```

**Small helpers defined in same file as main component.**

### Structure

```javascript
// 1. Imports
import { motion } from 'framer-motion';

// 2. Helper Components
const Helper = ({ prop }) => <div>...</div>;

// 3. Main Component
const MainComponent = () => {
  return (
    <div>
      <Helper prop="value" />
    </div>
  );
};

// 4. Export
export default MainComponent;
```

## Props Destructuring

```38:44:components/ui/button.jsx
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
```

**Pattern:** Destructure known props, spread rest.

## Children Prop

```3:7:components/ui/container.jsx
const Container = ({ children, className }) => {
  return (
    <div className={cn('w-full max-w-[1366px] mx-auto px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
```

**Layout components wrap children content.**

## Composition Over Props

### Radix Slot Pattern

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

**Usage:**
```jsx
<Button asChild>
  <Link href="/projects">View Projects</Link>
</Button>
```

Renders as `Link` with Button styles—no wrapper div.

## Component Sizes

### Guidelines

- **Section Components:** 200-450 lines
- **Layout Components:** 100-250 lines
- **UI Primitives:** 50-100 lines
- **Helper Components:** 20-80 lines

### When to Split

Split component if:
- Exceeds ~500 lines
- Has multiple responsibilities
- Contains reusable sub-patterns
- Difficult to test as unit

## Best Practices

### DO:
- ✅ Colocate helper components
- ✅ Destructure props in signature
- ✅ Use children prop for composition
- ✅ Keep components focused (single responsibility)
- ✅ Extract reusable patterns to separate files

### DON'T:
- ❌ Create files for one-off helpers
- ❌ Inline large components
- ❌ Pass too many props (use composition)
- ❌ Prop drill beyond 2 levels
- ❌ Mix concerns in single component
