# Routing Domain

## Overview

This portfolio uses Next.js 15 App Router for a **single-page application** with smooth scroll navigation between sections. No traditional page-to-page routing—all content on one page with anchor-based section navigation.

## App Router Structure

### File-System Routes

```
app/
├── layout.jsx               # Root layout (wraps all pages)
├── page.jsx                 # Homepage (/)
├── globals.css              # Global styles
└── (pages)/                 # Route group (doesn't affect URL)
    └── blog/
        └── page.jsx         # Blog page (/blog)
```

**Route Group `(pages)`:** Organizational folder that doesn't create URL segments.

### Root Layout

```43:68:app/layout.jsx
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
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
      </body>
    </html>
  );
}
```

**Wraps All Pages With:**
- Google Fonts (Inter, JetBrains Mono)
- ThemeProvider for dark/light mode
- LoadingWrapper with cinema curtain animation
- ScrollIndicator for scroll progress bar
- NavBar (top navigation)
- SideMenu (right-side social links)
- Container (max-width wrapper)

### Homepage Structure

```9:36:app/page.jsx
export default function Home() {
  return (
   <div className="flex flex-col gap-8">
    <section id="home">
      <Hero/>
    </section>
    <LineSeparator variant="dashed" showDot={true} />
    <section id="about">
      <AboutMe/>
    </section>
    <LineSeparator variant="dashed" showDot={true} />
    <section id="skills">
      <Skills/>
    </section>
    <LineSeparator variant="dashed" showDot={true} />
    <section id="projects">
      <Projects/>
    </section>
    <LineSeparator variant="dashed" showDot={true} />
    <section id="blog">
      <Blog/>
    </section>
    <LineSeparator variant="dashed" showDot={true} />
    <section id="contact">
      <Contact/>
    </section>
   </div>
  );
}
```

**Key Structure:**
- Each section wrapped in `<section id="...">` for anchor links
- LineSeparator between sections for visual hierarchy
- All sections rendered on initial page load (no lazy loading of sections)

## Anchor-Based Navigation

### Navigation Links

NavBar contains anchor links to page sections:

```javascript
const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" }
];
```

### Smooth Scroll Implementation

```javascript
// In NavBar component
const scrollToSection = (e, href) => {
  e.preventDefault();
  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
```

**Behavior:**
- Prevent default anchor jump
- Find section by ID selector
- Smooth scroll to section
- Native browser smooth scrolling

### Active Section Tracking

NavBar tracks which section is currently visible:

```javascript
const [activeSection, setActiveSection] = useState("home");

useEffect(() => {
  const handleScroll = () => {
    const sections = ["home", "about", "skills", "projects", "blog", "contact"];
    const current = sections.find(section => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      }
      return false;
    });
    if (current) setActiveSection(current);
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

**Logic:**
- On scroll, check which section is in viewport
- Section is "active" if top is above threshold and bottom is below
- Update `activeSection` state
- NavBar item with matching section gets highlighted

## SEO Metadata

### Static Metadata Export

```24:41:app/layout.jsx
export const metadata = {
  title: "Sarim Kerroucha | Full-Stack Developer Portfolio",
  description: "Welcome to the portfolio of Sarim Kerroucha, a passionate Full-Stack Developer specializing in React, Next.js, and Node.js. Explore my projects and articles.",
  keywords: "Sarim Kerroucha, Full Stack Developer, React, Next.js, Node.js, TypeScript, Tailwind CSS, Framer Motion, Radix UI, Portfolio, Web Developer",
  authors: [{ name: "Sarim Kerroucha", url: "https://sarimabdelbari.vercel.app" }],
  creator: "Sarim Kerroucha",
  publisher: "Sarim Kerroucha",
  website: "https://sarimabdelbari.vercel.app",
  openGraph: {
    title: "Sarim Kerroucha | Full-Stack Developer Portfolio",
    description: "Welcome to the portfolio of Sarim Kerroucha, a passionate Full-Stack Developer specializing in React, Next.js, and Node.js. Explore my projects and articles.",
    url: "https://sarimabdelbari.vercel.app",
    siteName: "Sarim Kerroucha's Portfolio",
  },
  icons: {
    icon: "/assets/svg/Black-and-White-Minimalist-Luxury-fashion-Logo.ico",
  },
};
```

**Includes:**
- Title, description, keywords for search engines
- Author and creator metadata
- Open Graph tags for social media sharing
- Custom favicon

## Blog Page Route

### Coming Soon Page

```1:20:app/(pages)/blog/page.jsx
import ComingSoonBlog from '@/components/sections/comingSoonBlog';
import { motion } from 'framer-motion';

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 px-3 lg:px-10 overflow-hidden">
        {/* Animated background elements */}
        <motion.div className="...">
          {/* Background orbs and decorations */}
        </motion.div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1>Blog & Insights</h1>
          <p>Coming Soon...</p>
        </div>
      </section>
      <ComingSoonBlog />
    </div>
  );
}
```

**Purpose:** Placeholder page showing upcoming blog features.

## No Page Transitions

Unlike traditional multi-page sites:
- **No page-to-page navigation** (except blog page which is separate)
- **No route transitions** (all content loaded upfront)
- **Smooth scrolling** instead of page changes
- **Instant navigation** (no loading states between sections)

## Link Component Usage

### External Links

```316:321:components/sections/projects.jsx
            <Link href="https://github.com/sarimAbdelbari" target="_blank" rel="noopener noreferrer">
              <motion.button className="...">
                <span>View More on GitHub</span>
                <Github size={18} />
              </motion.button>
            </Link>
```

**Attributes:**
- `target="_blank"` - Opens in new tab
- `rel="noopener noreferrer"` - Security best practice for external links

### Internal Links (Future Blog)

```javascript
// Would be used in blog post list:
<Link href="/blog/post-slug">
  Read Article
</Link>
```

## Scroll Restoration

### Auto-Scroll to Top

```javascript
// In hero section scroll indicator
<motion.div 
  onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
  className="cursor-pointer"
>
  <Image src="/assets/svg/mouse-cursor-click.svg" alt="Scroll down" />
</motion.div>
```

### Scroll-to-Top Button

```javascript
// In SideMenu component
<button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
  <ArrowUp size={20} />
</button>
```

## Performance Considerations

### Single-Page Benefits

**Pros:**
- ✅ No full page reloads
- ✅ Instant "navigation" (just scrolling)
- ✅ Maintains application state
- ✅ Smooth user experience

**Cons:**
- ❌ Larger initial bundle (all sections loaded)
- ❌ No code-splitting by route (everything in one page)
- ❌ SEO: Single URL for all content (mitigated by anchor links)

### Optimization Strategy

- Lazy load images (not sections)
- Disable heavy animations on mobile
- Use Turbopack for fast development builds
- Next.js automatic code splitting for external imports

## Best Practices

### DO:
- ✅ Use semantic `<section>` tags with IDs
- ✅ Implement smooth scroll for better UX
- ✅ Track active section for navigation highlighting
- ✅ Use Next.js Link for internal navigation
- ✅ Add security attributes to external links

### DON'T:
- ❌ Use hash routing for multi-page feel (keep it simple)
- ❌ Forget to cleanup scroll event listeners
- ❌ Use window.location for section navigation (too jarring)
- ❌ Omit section IDs (breaks anchor navigation)
- ❌ Overload single page with too much content (current size is fine)

## Future Enhancements

### If Adding More Pages

```
app/
├── layout.jsx
├── page.jsx              # Homepage
├── (pages)/
│   ├── blog/
│   │   ├── page.jsx      # Blog list
│   │   └── [slug]/
│   │       └── page.jsx  # Individual post
│   ├── projects/
│   │   └── [id]/
│   │       └── page.jsx  # Project detail page
│   └── about/
│       └── page.jsx      # Dedicated about page
```

Would enable:
- Dedicated project detail pages
- Blog with individual post URLs
- Better SEO (each page has unique URL)
- Smaller bundle per route (code splitting)
