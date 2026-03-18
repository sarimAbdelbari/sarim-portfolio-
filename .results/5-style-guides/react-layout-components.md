# Style Guide: React Layout Components

## Overview

Layout components form the app shell (NavBar, SideMenu, LoadingWrapper, ScrollIndicator, LineSeparator). They wrap or frame content and typically range from 100-250 lines.

## Unique Conventions

### 1. Fixed Positioning for Persistent UI

NavBar and SideMenu use fixed positioning:

```javascript
<nav className="fixed top-0 left-0 right-0 z-50">
  {/* NavBar content */}
</nav>

<aside className="fixed right-6 bottom-6 z-40">
  {/* SideMenu content */}
</aside>
```

**Z-index Hierarchy:**
- Modals: `z-[100]`
- Loading curtain: `z-50`
- NavBar: `z-50`
- SideMenu: `z-40`
- Content: `z-10` or lower

### 2. Scroll Event Handling

Components tracking scroll MUST clean up listeners:

```javascript
useEffect(() => {
  const handleScroll = () => {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    setScrollProgress(scrollPercentage);
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

### 3. Children Wrapper Pattern

Layout components accept and wrap children:

```javascript
export default function LoadingWrapper({ children }) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative min-h-screen">
      {loading ? <LoadingScreen /> : children}
    </div>
  );
}
```

### 4. Backdrop Blur for Glass Effect

```javascript
<div className="bg-background/80 backdrop-blur-md">
  {/* Semi-transparent with blur */}
</div>
```

### 5. Scroll-Based State

```javascript
const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };
  
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

// Apply conditional styling
<nav className={cn(
  'fixed top-0',
  isScrolled && 'bg-background/90 backdrop-blur-md shadow-lg'
)}>
```

## Component-Specific Patterns

### NavBar Pattern

```javascript
export default function NavBar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    // ... more items
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Desktop nav */}
      <div className="hidden md:flex">
        {navItems.map(item => (
          <a 
            key={item.href}
            href={item.href}
            onClick={(e) => scrollToSection(e, item.href)}
            className={cn(
              'nav-item',
              activeSection === item.href.slice(1) && 'active'
            )}
          >
            {item.name}
          </a>
        ))}
      </div>
      
      {/* Mobile nav */}
      <div className="md:hidden">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <Menu />
        </button>
      </div>
    </nav>
  );
}
```

### LineSeparator Pattern

```javascript
const LineSeparator = ({ variant = "default", showDot = false }) => {
  const variants = {
    default: "border-t border-border",
    primary: "border-t border-primary",
    gradient: "h-px bg-gradient-to-r from-transparent via-border to-transparent",
    dashed: "border-t border-dashed border-border/50",
  };

  return (
    <div className="relative w-full py-4">
      <div className={variants[variant]} />
      {showDot && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-2 h-2 rounded-full bg-primary" />
        </div>
      )}
    </div>
  );
};
```

## Best Practices

### DO:
- ✅ Use fixed positioning for persistent UI
- ✅ Clean up scroll event listeners
- ✅ Use backdrop-blur for glass effect
- ✅ Implement mobile-responsive variants
- ✅ Close mobile menus after navigation

### DON'T:
- ❌ Forget to clean up scroll listeners
- ❌ Use high z-index values unnecessarily
- ❌ Block content with fixed elements
- ❌ Forget mobile menu close on navigate
- ❌ Use window object without client directive
