# Tech Stack Analysis

## Core Technology Analysis

### Programming Language(s)
- **JavaScript (JSX)**: Primary language for all components and logic
- No TypeScript usage detected (despite TypeScript logos in hero section for branding purposes)

### Primary Framework
- **Next.js 15.2.8**: Modern React framework using the App Router architecture
  - Leveraging Next.js App Router (`app/` directory structure)
  - Server and Client Components pattern
  - Built-in image optimization via `next/image`
  - Turbopack for ultra-fast development builds
  - Route-based code splitting

### Secondary/Tertiary Frameworks
- **React 19.0**: UI library powering all interactive components
- **Framer Motion 12.6.3**: Advanced animation library for all motion effects
- **Tailwind CSS 4.0**: Utility-first CSS framework with custom design tokens
- **Radix UI**: Headless accessible UI primitives for dropdown menus and components
  - `@radix-ui/react-dropdown-menu`
  - `@radix-ui/react-slot`

### State Management Approach
- **React Hooks Pattern**: All state management using built-in React hooks
  - `useState` for local component state
  - `useEffect` for side effects and lifecycle
  - `useRef` for DOM references and mutable values
  - `useMemo` for performance optimization
- **Context API**: Theme management via `ThemeProvider` from `next-themes`
- **Custom Hooks Pattern**: Reusable logic extracted into dedicated hooks
  - `useLazyLoad` - Intersection Observer-based image lazy loading
  - `usePerformanceMode` - Responsive performance optimization
  - `useLazyLoadMultiple` - Batch image lazy loading
- **No Global State Library**: No Redux, Zustand, or similar state management libraries

### Other Relevant Technologies & Patterns

#### UI & Design System
- **Class Variance Authority (CVA) 0.7.1**: Type-safe component variant management
- **Tailwind Merge 3.1.0**: Intelligent className conflict resolution
- **tw-animate-css 1.2.5**: Additional CSS animation utilities
- **Lucide React 0.487**: Comprehensive icon library for UI elements
- **Google Fonts**: Inter (body text), JetBrains Mono (code/monospace)

#### Third-Party Libraries
- **Swiper 11.2.10**: Touch-enabled carousel/slider for blog section
- **react-simple-typewriter 5.0.1**: Typewriter effect for hero section
- **clsx 2.1.1**: Utility for constructing className strings conditionally

#### Development Tools
- **ESLint 9.x**: Code linting with Next.js configuration
- **PostCSS**: CSS processing with Tailwind
- **npm**: Package management

#### Build & Performance Optimizations
- **Turbopack**: Next.js experimental fast bundler for development
- **Custom Loading System**: Advanced image preloading with progress tracking
- **Lazy Loading Pattern**: IntersectionObserver API for deferred loading
- **Performance Mode**: Automatic motion reduction on mobile (< 768px screens)
- **Next.js Image Optimization**: Automatic WebP/AVIF conversion

---

## Domain Specificity Analysis

### Problem Domain
**Personal Portfolio/Resume Website**: Digital showcase for a Full-Stack Developer's professional profile, emphasizing:
- Technical expertise and skills
- Project portfolio with detailed case studies
- Professional timeline and experience
- Personal branding with distinctive visual identity
- Content presentation with blog integration

### Core Business Concepts
1. **Professional Identity Presentation**
   - Developer credentials and expertise
   - Technology stack proficiency
   - Career timeline and achievements
   - Contact information and social presence

2. **Portfolio Management**
   - Project categorization (Landing Pages, SaaS/MVP, Tools, AI, Full Stack)
   - Project showcasing with image galleries
   - Technology stack attribution per project
   - External links (GitHub repositories, live demos)

3. **Content Organization**
   - Section-based navigation (Hero, About, Skills, Projects, Blog, Contact)
   - Category filtering for projects
   - Blog post previews with metadata
   - Hierarchical information architecture

4. **Brand Experience**
   - Theme customization (dark/light mode)
   - Animation-driven storytelling
   - Visual identity consistency
   - User engagement through interactive elements

### User Interaction Types

1. **Passive Content Consumption**
   - Reading professional information
   - Viewing project galleries
   - Browsing skills and technologies
   - Consuming blog content

2. **Interactive Navigation**
   - Smooth scroll navigation between sections
   - Section-based anchor links
   - Mobile drawer menu
   - Scroll progress tracking

3. **Project Exploration**
   - Category-based project filtering
   - Multi-image gallery navigation per project
   - Technology stack inspection
   - External link navigation (GitHub, live demos)

4. **Theme Personalization**
   - Dark/light mode toggle
   - Persistent theme preference
   - Seamless theme transitions

5. **Call-to-Action Engagement**
   - Email contact initiation
   - Resume viewing/download
   - Social media link navigation

### Primary Data Types & Structures

#### Static Data Collections (`lib/data.js`)
```javascript
// Category taxonomy
categories: Array<{
  id: string,
  name: string,
  icon: string (emoji)
}>

// Project portfolio
projectsData: Array<{
  id: number,
  title: string,
  description: string,
  thumbnail: string,
  images: string[],
  technologies: string[],
  category: CategoryId,
  githubUrl: string,
  liveUrl: string,
  featured: boolean,
  year: string
}>
```

#### Component State Patterns
- **Animation States**: Framer Motion variants and keyframe animations
- **Loading States**: Boolean flags for lazy-loaded resources
- **UI States**: Typewriter text progression, carousel indices, menu visibility
- **Viewport States**: IntersectionObserver entries, scroll positions
- **Theme State**: Dark/light mode preference (managed by `next-themes`)

#### Asset Management
- **Static Assets**: Images (PNG, JPG, WebP), SVG icons, PDF documents
- **Dynamic Imports**: Client-side components with `"use client"` directive
- **Font Loading**: Google Fonts with Next.js font optimization

---

## Application Boundaries

### Features Clearly Within Scope

1. **Static Content Management**
   - Hardcoded portfolio data in `lib/data.js`
   - Manual content updates through code changes
   - Static asset management via `public/` directory

2. **Frontend-Only Architecture**
   - No backend server or API routes
   - No database connections
   - No server-side data fetching
   - Pure static site generation (SSG) capability

3. **Visual & Interactive Enhancements**
   - Complex Framer Motion animations
   - Custom loading screens and transitions
   - Responsive design across devices
   - Performance-optimized animations

4. **SEO & Metadata Management**
   - Static metadata in `layout.jsx`
   - Open Graph tags for social sharing
   - Semantic HTML structure

5. **Third-Party Integrations**
   - External links (GitHub, live demos, social media)
   - Google Drive for resume hosting
   - Email client integration (`mailto:`)

### Features Architecturally Inconsistent

1. **Dynamic Content Management**
   - CMS integration would conflict with static data structure
   - Database-driven blog would require architectural overhaul
   - User-generated content not supported

2. **Backend Services**
   - Authentication/authorization systems
   - API endpoints for data operations
   - Server-side form processing
   - Database operations (CRUD)

3. **Real-Time Features**
   - Live chat or messaging
   - Real-time notifications
   - WebSocket connections
   - Server-sent events

4. **User Accounts & Profiles**
   - Multi-user systems
   - User authentication
   - Profile management
   - Permission systems

5. **Complex State Management**
   - Global application state across pages
   - Cross-component data synchronization
   - Real-time data updates

### Domain Constraints

#### Specialized Libraries
1. **Framer Motion**: All animations must follow declarative Framer Motion patterns
2. **IntersectionObserver API**: Lazy loading implementations tied to browser API
3. **Tailwind CSS**: Styling strictly via utility classes and design tokens
4. **Next.js Image**: All images must use `next/image` for optimization
5. **Swiper.js**: Carousel/slider implementations bound to Swiper configuration

#### Mathematical/Technical Concepts
- **CSS Custom Properties**: Theme system relies on CSS variables for color tokens
- **Intersection Observer Thresholds**: Lazy loading timing based on viewport intersection calculations
- **Animation Keyframes**: Motion timing functions and easing curves for smooth transitions
- **Viewport Breakpoints**: Responsive design based on Tailwind's breakpoint system (640px, 768px, 1024px, 1280px)
- **Performance Budgets**: Motion reduction at < 768px screen width threshold

#### Content Constraints
- **Portfolio Projects**: Limited to 5 projects in `projectsData` array
- **Project Categories**: Fixed taxonomy of 6 categories
- **Image Galleries**: Multiple images per project with fixed navigation patterns
- **Section Architecture**: Fixed 6-section page structure (Hero, About, Skills, Projects, Blog, Contact)

### Suitable Feature Additions
- Additional portfolio projects following existing data structure
- New animation variations using Framer Motion
- Enhanced UI components with Radix UI primitives
- New custom hooks for reusable logic
- Additional page sections following existing patterns
- Blog post data structures (currently placeholder)

### Unsuitable Feature Additions
- Backend APIs or server routes
- Database integration
- User authentication systems
- Real-time collaborative features
- Third-party CMS integrations requiring API calls
- Dynamic content generation from external sources
