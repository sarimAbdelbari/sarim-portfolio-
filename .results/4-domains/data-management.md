# Data Management Domain

## Overview

Data management in this portfolio is entirely static, with all content stored in a centralized `lib/data.js` file. No external APIs, databases, or dynamic fetching—pure JavaScript arrays and objects.

## Centralized Data File

### Project Categories

```1:8:lib/data.js
export const categories = [
  { id: 'all', name: 'All Projects', icon: '🎯' },
  { id: 'landing', name: 'Landing Pages', icon: '🌐' },
  { id: 'saas', name: 'SaaS / MVP', icon: '🚀' },
  { id: 'tools', name: 'Tools', icon: '🛠️' },
  { id: 'ai', name: 'AI Integration', icon: '🤖' },
  { id: 'fullstack', name: 'Full Stack', icon: '💻' }
];
```

**Structure:**
- `id`: String identifier for filtering (lowercase, URL-safe)
- `name`: Display name for UI
- `icon`: Emoji for visual appeal

### Project Data

```10:93:lib/data.js
export const projectsData = [
  {
    id: 1,
    title: "Fikrat Tech Agency",
    description: "Algeria's Premier Tech Agency specializing in creating software solutions for startups and businesses.",
    thumbnail: "/assets/images/projects/Fikrat.png",
    images: [
      "/assets/images/projects/Fikrat.png",
      "/assets/images/projects/Fikrat.png", 
      "/assets/images/projects/Fikrat.png"
    ],
    technologies: ["React", "Next.js", "Tailwind", "Framer Motion"],
    category: "landing",
    githubUrl: "https://github.com/sarimAbdelbari/Fikrat-Agency",
    liveUrl: "https://www.fikrat.tech/",
    featured: true,
    year: "2024"
  },
  // ... more projects
];
```

**Project Shape:**
- `id`: Numeric ID (used for React keys and ordering)
- `title`: Project name
- `description`: 1-2 sentence summary
- `thumbnail`: Primary image for card view
- `images`: Array of gallery images (includes duplicates for Fikrat)
- `technologies`: Array of tech stack strings
- `category`: Category ID (foreign key to categories array)
- `githubUrl`: Source code repository
- `liveUrl`: Deployed site (can be empty string)
- `featured`: Boolean flag for featured projects
- `year`: String for display purposes

## Data Access Pattern

### Direct Import

```7:7:components/sections/projects.jsx
import { projectsData, categories } from '@/lib/data';
```

**No abstraction layer:** Components import data directly. Simple and transparent.

## Data Filtering

### Category Filter with useMemo

```251:256:components/sections/projects.jsx
  const categoriesWithCounts = useMemo(() =>
    categories.map(cat => ({
      ...cat,
      count: cat.id === 'all' ? projectsData.length : projectsData.filter(p => p.category === cat.id).length
    })), [projectsData]
  );
```

**Performance Optimization:**
- Calculate counts once with `useMemo`
- Dependency: `[projectsData]` (only recalculate if data changes)
- "All" category shows total project count
- Other categories show filtered counts

### Project Filtering

```258:262:components/sections/projects.jsx
  const filteredProjects = useMemo(() =>
    selectedCategory === 'all'
      ? projectsData
      : projectsData.filter(project => project.category === selectedCategory),
    [selectedCategory, projectsData]
  );
```

**Filter Logic:**
- "all" returns entire array
- Otherwise, filter by matching category ID
- Memoized to prevent unnecessary re-filtering on re-renders

## Image URL Collection

### Gathering All Images

```265:268:components/sections/projects.jsx
  const allProjectImages = useMemo(() =>
    projectsData.flatMap(p => [p.thumbnail, ...p.images]),
    [projectsData]
  );
```

**Purpose:** Collect all image URLs for lazy loading hook.

**Method:**
- `flatMap`: Maps each project to array of images, then flattens
- Includes both `thumbnail` and `images` array
- Results in single flat array of all image URLs

## Data Constraints

### No Dynamic Updates

Data is **immutable** during runtime:
- No `POST`, `PUT`, `DELETE` operations
- No user-generated content
- No admin interface for managing projects

### Adding New Projects

**Process:**
1. Add project object to `projectsData` array in `lib/data.js`
2. Place images in `public/assets/images/projects/`
3. Deploy—no database migration needed

### Data Validation

No runtime validation—data integrity ensured by:
- TypeScript-like convention (consistent shapes)
- Manual review during development
- Static nature prevents corruption

## Asset Path Convention

### Relative Paths

All asset paths start with `/assets/`:
```javascript
thumbnail: "/assets/images/projects/Fikrat.png"
```

**Why leading slash:** Paths relative to `public/` directory.

### Folder Structure

```
public/
  assets/
    images/
      projects/
        Fikrat.png
        PyramidDoc1.png
        VitaLife.png
        Feather1.jpg
        PortfolioProject1.png
    skills/
      react.svg
      nextjs.svg
      nodejs.svg
```

## Data Relationships

### Category → Projects (One-to-Many)

```javascript
// Category
{ id: 'landing', name: 'Landing Pages' }

// Projects in this category
projectsData.filter(p => p.category === 'landing')
// [Fikrat, VitaLife, Portfolio]
```

### Project → Technologies (Many-to-Many)

```javascript
{
  title: "Fikrat Tech Agency",
  technologies: ["React", "Next.js", "Tailwind", "Framer Motion"]
}
```

**Note:** Technologies are strings, not normalized. Duplicates across projects (e.g., "React" appears in multiple projects).

## Data Display Patterns

### Rendering Projects

```296:303:components/sections/projects.jsx
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onCardClick={setSelectedProject}
                  isImageLoaded={isImageLoaded}
                />
              ))}
```

**Key Prop:** Use `project.id` for stable, unique keys.

### Technology Badges

```102:112:components/sections/projects.jsx
        <div className="flex flex-wrap gap-2 pt-2">
          {project.technologies.slice(0, 3).map((tech, i) => (
            <span key={i} className="px-3 py-1 bg-muted/20 text-foreground text-xs font-medium rounded-full">
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-3 py-1 bg-muted/20 text-muted-foreground text-xs font-medium rounded-full">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
```

**Truncation Logic:**
- Show first 3 technologies
- If more than 3, show "+N" badge
- Array index as key (safe here since array never reorders)

## Future Scalability

### If Adding CMS

Would require:
1. Create API routes in `app/api/`
2. Fetch data with `async/await` in Server Components
3. Add loading states and error handling
4. Implement caching strategy

### If Adding Search

Would require:
1. Search input component
2. Filter logic by title/description
3. Debounced search to prevent excessive filtering
4. Possibly Fuse.js for fuzzy matching

### If Adding Blog

Current placeholder in `comingSoonBlog.jsx`. Would need:
1. Blog post data structure (title, excerpt, date, content, author)
2. MDX or markdown file handling
3. Dynamic routes: `app/(pages)/blog/[slug]/page.jsx`
4. Pagination for blog list

## Best Practices

### DO:
- ✅ Keep data in single source file (`lib/data.js`)
- ✅ Use consistent object shapes across all entries
- ✅ Include numeric IDs for stable React keys
- ✅ Use `useMemo` for expensive filtering/transformations
- ✅ Follow asset path conventions

### DON'T:
- ❌ Scatter data across multiple files
- ❌ Inline data directly in components
- ❌ Use array indices as keys for dynamic lists
- ❌ Forget to optimize images before adding to public/
- ❌ Use inconsistent naming (camelCase for fields)

## Example: Adding New Project

```javascript
// 1. Add to lib/data.js
{
  id: 6,
  title: "E-Commerce Platform",
  description: "Full-featured online store with cart, checkout, and admin dashboard.",
  thumbnail: "/assets/images/projects/ecommerce-thumb.png",
  images: [
    "/assets/images/projects/ecommerce-1.png",
    "/assets/images/projects/ecommerce-2.png",
    "/assets/images/projects/ecommerce-3.png"
  ],
  technologies: ["Next.js", "Stripe", "PostgreSQL", "Prisma"],
  category: "saas",
  githubUrl: "https://github.com/yourusername/ecommerce",
  liveUrl: "https://ecommerce-demo.vercel.app",
  featured: false,
  year: "2024"
}

// 2. Add images to public/assets/images/projects/
// 3. Deploy—project automatically appears!
```

## Data Debugging

### Check Filtered Projects

```javascript
console.log({
  selectedCategory,
  filteredCount: filteredProjects.length,
  filteredProjects: filteredProjects.map(p => p.title)
});
```

### Verify Category Counts

```javascript
categories.forEach(cat => {
  const count = cat.id === 'all' 
    ? projectsData.length 
    : projectsData.filter(p => p.category === cat.id).length;
  console.log(`${cat.name}: ${count}`);
});
```

### Find Missing Images

```javascript
const allImages = projectsData.flatMap(p => [p.thumbnail, ...p.images]);
const uniqueImages = [...new Set(allImages)];
console.log(`Total images: ${allImages.length}, Unique: ${uniqueImages.length}`);
```
