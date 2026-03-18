# State Management Domain

## Overview

State management using React hooks (useState, useMemo) and Context API for theme. No global state library.

## Local State with useState

### UI Toggles

```248:249:components/sections/projects.jsx
const [selectedCategory, setSelectedCategory] = useState('all');
const [selectedProject, setSelectedProject] = useState(null);
```

**Common Patterns:**
- Modal open/close
- Selected items
- Form inputs
- UI flags (loading, error)

### Animation State

```14:19:components/sections/hero.jsx
const [text, setText] = useState("");
const [textIndex, setTextIndex] = useState(0);
const [charIndex, setCharIndex] = useState(0);
const [isDeleting, setIsDeleting] = useState(false);
const [showCursor, setShowCursor] = useState(true);
```

**Typewriter Effect:** Multiple coordinated states.

## Derived State with useMemo

### Filtered Data

```258:262:components/sections/projects.jsx
const filteredProjects = useMemo(() =>
  selectedCategory === 'all'
    ? projectsData
    : projectsData.filter(project => project.category === selectedCategory),
  [selectedCategory, projectsData]
);
```

**Benefits:**
- Prevents unnecessary filtering on re-renders
- Updates only when dependencies change
- Performance optimization

## Context for Theme

### ThemeProvider (next-themes)

```49:54:app/layout.jsx
<ThemeProvider
  attribute="class"
  defaultTheme="dark"
  enableSystem={false}
  disableTransitionOnChange
>
```

**Access in Components:**
```javascript
import { useTheme } from "next-themes";

const { theme, setTheme } = useTheme();
```

## State Lifting Pattern

### Parent Manages, Children Consume

```297:302:components/sections/projects.jsx
{filteredProjects.map((project) => (
  <ProjectCard
    key={project.id}
    project={project}
    onCardClick={setSelectedProject}  // Lift state up
  />
))}
```

**ProjectCard** doesn't manage its own selection—parent does.

## Controlled Components

### Form Pattern

```jsx
const [value, setValue] = useState('');

<input 
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

## Best Practices

### DO:
- ✅ Keep state as local as possible
- ✅ Use useMemo for expensive computations
- ✅ Lift state to common parent when sharing
- ✅ Use Context for truly global concerns
- ✅ Clean up effects with return function

### DON'T:
- ❌ Use global state for local UI
- ❌ Forget dependency arrays in useMemo
- ❌ Create new arrays/objects in render
- ❌ Over-optimize with useMemo (profile first)
- ❌ Use Context for frequently changing state
