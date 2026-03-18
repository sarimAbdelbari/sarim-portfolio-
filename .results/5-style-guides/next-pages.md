# Style Guide: Next.js Pages

## Overview

Next.js pages define routes using the App Router file-system convention. Pages import and compose section components.

## Unique Conventions

### 1. Default Export Required

```javascript
export default function Home() {
  return (
    // Page content
  );
}
```

### 2. Section ID Pattern

Each major section wrapped with ID for anchor navigation:

```javascript
export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <section id="home">
        <Hero />
      </section>
      
      <LineSeparator variant="dashed" showDot={true} />
      
      <section id="about">
        <AboutMe />
      </section>
      
      <section id="skills">
        <Skills />
      </section>
      
      {/* ... more sections */}
    </div>
  );
}
```

**Key Attributes:**
- `id` matches href in NavBar (`#home`, `#about`)
- Separated by `LineSeparator` components
- Gap between sections: `gap-8`

### 3. No State Management in Pages

Pages are composition-only—no useState, useEffect:

```javascript
// ✅ Good - Pure composition
export default function Home() {
  return (
    <div>
      <Hero />
      <AboutMe />
    </div>
  );
}

// ❌ Bad - State in page
export default function Home() {
  const [data, setData] = useState([]);  // Move to component!
  return <div>{/* ... */}</div>;
}
```

### 4. Import Path Convention

```javascript
import Hero from "@/components/sections/hero";
import AboutMe from "@/components/sections/aboutMe";
import LineSeparator from "@/components/layout/lineSperator";
```

Use `@/` alias for imports (configured in `jsconfig.json`).

## File Structure

### Homepage (`app/page.jsx`)

```javascript
// 1. Imports
import Hero from "@/components/sections/hero";
import AboutMe from "@/components/sections/aboutMe";
import Skills from "@/components/sections/skills";
import Projects from "@/components/sections/projects";
import Blog from "@/components/sections/blog";
import Contact from "@/components/sections/contact";
import LineSeparator from "@/components/layout/lineSperator";

// 2. Page component (default export)
export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      {/* Sections with IDs and separators */}
    </div>
  );
}
```

### Sub-pages (`app/(pages)/blog/page.jsx`)

```javascript
import ComingSoonBlog from '@/components/sections/comingSoonBlog';

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="relative py-20">
        <h1>Blog & Insights</h1>
        <p>Coming Soon...</p>
      </section>
      <ComingSoonBlog />
    </div>
  );
}
```

## Metadata Export

If page needs custom metadata (optional):

```javascript
export const metadata = {
  title: "Blog | Sarim Kerroucha",
  description: "Technical articles and insights",
};

export default function BlogPage() {
  // ...
}
```

## Best Practices

### DO:
- ✅ Export default function
- ✅ Use section IDs for anchor links
- ✅ Separate sections with LineSeparator
- ✅ Keep pages as pure composition
- ✅ Import sections from components/

### DON'T:
- ❌ Add state/effects to pages
- ❌ Forget section IDs
- ❌ Mix business logic in pages
- ❌ Use relative imports
- ❌ Export named components from pages
