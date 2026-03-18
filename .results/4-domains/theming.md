# Theming Domain

## Overview

The theming system provides dark and light modes using `next-themes` library and CSS custom properties. All colors are defined as semantic tokens that adapt based on the active theme.

## Theme Provider Setup

### Root Layout Integration

```49:64:app/layout.jsx
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <LoadingWarpper>
            <ScrollIndicator>
              <NavBar />
              <SideMenu/>
              <Container>
                {children}
              </Container>
            </ScrollIndicator>
          </LoadingWarpper>
        </ThemeProvider>
```

**Configuration:**
- `attribute="class"` - Adds `dark` class to `<html>` element when dark mode active
- `defaultTheme="dark"` - Portfolio defaults to dark theme
- `enableSystem={false}` - Ignores OS preference, respects user choice only
- `disableTransitionOnChange` - Prevents flash of styles during theme switch

### Theme Provider Wrapper

```1:9:components/provider/theme-provider.jsx
'use client';

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

**Purpose:** Thin wrapper around `next-themes` with `'use client'` directive since it uses React context and hooks.

## CSS Custom Properties

### Color Token System

```46:104:app/globals.css
:root {
  /* Base settings */
  --radius: 0.75rem;
  
  /* Main colors - using your blue to purple palette */
  --blue-primary: #1e70ca;
  --blue-secondary: #3a85d9;
  --purple-light: #a479b8;
  --purple-medium: #8c79c2;
  --purple-dark: #6e63ac;
  --pink-accent: #c590c0;
  
  /* Light theme - softer, warmer tones (less bright/harsh) */
  --background: #f5f5f0;
  --foreground: #1a1a1a;
  --card: #ebebdc;
  --card-foreground: #1a1a1a;
  --popover: #f0f0e8;
  --popover-foreground: #1a1a1a;
  
  /* Primary - slightly darker for better contrast on light bg */
  --primary: #017afc;
  --primary-foreground: #ffffff;
  
  /* Secondary - subtle warm tinted background */
  --secondary: #e8e8dc;
  --secondary-foreground: #1a5fb8;
  
  /* Muted - warmer, softer grays */
  --muted: #e5e5d8;
  --muted-foreground: #525252;
  
  /* Accent - slightly darker purple for better contrast */
  --accent: #9066a3;
  --accent-foreground: #ffffff;
  
  /* Utility colors */
  --destructive: #dc2626;
  --border: #d4d4c8;
  --input: #e8e8dc;
  --ring: var(--purple-medium);
  
  /* Chart colors - adjusted for light mode */
  --chart-1: #1a5fb8;
  --chart-2: #2563eb;
  --chart-3: #7c3aed;
  --chart-4: #a855f7;
  --chart-5: #c084fc;
  
  /* Sidebar */
  --sidebar: #ebebdc;
  --sidebar-foreground: #1a1a1a;
  --sidebar-primary: #1a5fb8;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #9066a3;
  --sidebar-accent-foreground: #ffffff;
  --sidebar-border: #d4d4c8;
  --sidebar-ring: #1a5fb8;
}
```

**Semantic Token Categories:**

1. **Backgrounds**: `background`, `card`, `popover`, `sidebar`
2. **Foregrounds**: Paired with backgrounds for proper contrast
3. **Primary/Secondary/Accent**: Brand colors
4. **Muted**: Subtle backgrounds and text
5. **Utility**: `destructive`, `border`, `input`, `ring`
6. **Charts**: 5-color gradient scale

### Dark Theme Overrides

```106:153:app/globals.css
.dark {
  /* Dark theme */
  --background: #0f172a;
  --foreground: #f8fafc;
  --card: #1e293b;
  --card-foreground: #f8fafc;
  --popover: #1e293b;
  --popover-foreground: #f8fafc;
  
  /* Primary - brightened blue for dark mode */
  --primary: #017afc;
  --primary-foreground: #ffffff;
  
  /* Secondary - darker blue */
  --secondary: #1e293b;
  --secondary-foreground: #f8fafc;
  
  /* Muted - subtle gray/blue */
  --muted: #334155;
  --muted-foreground: #94a3b8;
  
  /* Accent - brightened purple for dark mode */
  --accent: #a479b8;
  --accent-foreground: #ffffff;
  
  /* Utility colors */
  --destructive: #f87171;
  --border: rgba(255, 255, 255, 0.1);
  --input: rgba(255, 255, 255, 0.15);
  --ring: var(--purple-medium);
  
  /* Chart colors - brighter for dark mode */
  --chart-1: #3a85d9;
  --chart-2: #6e93d0;
  --chart-3: #8c79c2;
  --chart-4: #a983c1;
  --chart-5: #c590c0;
  
  /* Sidebar */
  --sidebar: #1e293b;
  --sidebar-foreground: #f8fafc;
  --sidebar-primary: #1e70ca;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #a479b8;
  --sidebar-accent-foreground: #ffffff;
  --sidebar-border: rgba(255, 255, 255, 0.1);
  --sidebar-ring: #1e70ca;
}
```

**Dark Theme Adjustments:**
- Darker backgrounds: `#0f172a` (slate-900)
- Lighter foregrounds: `#f8fafc` (slate-50)
- Brighter accent colors for visibility
- Semi-transparent borders: `rgba(255, 255, 255, 0.1)`

## Tailwind CSS Integration

### Mapping Variables to Tailwind

```6:43:app/globals.css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-inter), system-ui, sans-serif;
  --font-mono: var(--font-jetbrains-mono);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}
```

**Tailwind 4 Theme System:**
- `@theme inline` directive defines Tailwind tokens
- Maps custom properties to Tailwind color system
- Allows using `bg-primary`, `text-foreground` in classes
- Radius tokens for consistent border-radius

### Base Layer Application

```155:162:app/globals.css
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

**Global Defaults:**
- All elements: `border-border` (consistent border color)
- All elements: `outline-ring/50` (accessible focus outlines)
- Body: `bg-background text-foreground` (theme-aware colors)

## Theme Toggle Component

### Toggle Implementation

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

**Icon Animation:**
- **Light Mode**: Sun visible (`scale-100 rotate-0`), Moon hidden (`scale-0 rotate-90`)
- **Dark Mode**: Sun hidden (`scale-0 -rotate-90`), Moon visible (`scale-100 rotate-0`)
- `transition-all` creates smooth 150ms transition between states
- Both icons positioned absolutely in same space

## Color Palette

### Brand Colors

```51:56:app/globals.css
  /* Main colors - using your blue to purple palette */
  --blue-primary: #1e70ca;
  --blue-secondary: #3a85d9;
  --purple-light: #a479b8;
  --purple-medium: #8c79c2;
  --purple-dark: #6e63ac;
  --pink-accent: #c590c0;
```

**Gradient Spectrum:**
Blue → Purple gradient creates cohesive brand identity across animations and accents.

### Light Mode Philosophy

```58:59:app/globals.css
  /* Light theme - softer, warmer tones (less bright/harsh) */
  --background: #f5f5f0;
```

**Design Decision:** Warmer, less saturated colors reduce eye strain compared to pure white (`#ffffff`).

## Using Theme in Components

### Class-Based Conditional Styling

```jsx
<div className="bg-primary text-primary-foreground">
  Content automatically adapts to theme
</div>
```

**How it Works:**
- `bg-primary` maps to `--color-primary`
- Light mode: `#017afc`
- Dark mode: `#017afc` (same, but contrast adjusted)

### Dark Mode Variants

```jsx
<div className="bg-background dark:bg-card">
  Different backgrounds in light vs dark
</div>
```

**Syntax:** `dark:` prefix applies styles only when `.dark` class present on `<html>`.

### Opacity Modifiers

```jsx
<div className="bg-primary/90 hover:bg-primary/100">
  Button with subtle transparency
</div>
```

**Opacity Syntax:** `/number` after color (e.g., `/90` = 90% opacity).

## Custom Scrollbar Theming

### Scrollbar Customization

```164:187:app/globals.css
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-thumb {
  background-color: var(--primary);
  border-radius: 10px;
  transition: all 0.3s ease;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
}

::-webkit-scrollbar-thumb:hover {
  background-color: var(--secondary);
  transition: all 0.3s ease;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

::-webkit-scrollbar-track {
  background-color: var(--background);
  border-radius: 10px;
  transition: all 0.3s ease;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.05);
}
```

**Theme Integration:**
- Thumb uses `--primary` (adapts to theme)
- Track uses `--background` (matches page background)
- Hover state transitions to `--secondary`

## Preventing Theme Flash

### SSR Considerations

The `disableTransitionOnChange` prop prevents:
1. CSS transition flash when theme loads from localStorage
2. Visible color shift during SSR→client hydration
3. Jarring experience on page load

**Without it:** Colors would visibly transition from one theme to another.
**With it:** Theme applies instantly, no visual transition.

## Persistence

`next-themes` automatically:
- Saves theme preference to `localStorage`
- Restores theme on page load
- Syncs across tabs (same domain)

**Storage Key:** `theme` (defaults to "dark" in this project)

## Best Practices

### DO:
- ✅ Use semantic tokens (`bg-primary`) not raw values (`bg-[#017afc]`)
- ✅ Test both themes during development
- ✅ Ensure proper contrast ratios (WCAG AA minimum)
- ✅ Use foreground pairs (`primary` + `primary-foreground`)
- ✅ Add theme toggle in accessible location (NavBar)

### DON'T:
- ❌ Hardcode colors outside of globals.css
- ❌ Use `dark:` variants excessively (prefer semantic tokens)
- ❌ Forget to test readability in both themes
- ❌ Use pure black (`#000`) or pure white (`#fff`) for large areas
- ❌ Mix color systems (HSL, RGB, HEX) within custom properties

## Adding New Colors

### Process

1. **Define in globals.css:**
```css
:root {
  --success: #10b981;
  --success-foreground: #ffffff;
}

.dark {
  --success: #34d399;
  --success-foreground: #000000;
}
```

2. **Map to Tailwind:**
```css
@theme inline {
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
}
```

3. **Use in components:**
```jsx
<div className="bg-success text-success-foreground">
  Success message!
</div>
```

## Debugging Theme Issues

### Check Current Theme

```jsx
import { useTheme } from "next-themes";

function Debug() {
  const { theme, resolvedTheme } = useTheme();
  console.log({ theme, resolvedTheme });
  // theme: user preference
  // resolvedTheme: actual applied theme (after system preference)
}
```

### Inspect CSS Variables

```javascript
// In browser console
getComputedStyle(document.documentElement).getPropertyValue('--primary');
// Returns: "#017afc"
```

### Common Issues

**Theme not applying:**
- Check `suppressHydrationWarning` on `<html>` tag (prevents React hydration errors)
- Verify ThemeProvider wraps entire app in layout
- Ensure `'use client'` directive in theme-provider.jsx

**Colors not switching:**
- Confirm CSS custom properties defined in both `:root` and `.dark`
- Check Tailwind mapping in `@theme inline`
- Verify no conflicting inline styles overriding theme

**Flash of wrong theme:**
- Ensure `disableTransitionOnChange` prop is set
- Check next-themes script is in `<head>` (auto-injected)
