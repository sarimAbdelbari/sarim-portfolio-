// Portfolio projects data, aligned with the CVs.
// - Existing ids are unchanged; PlugNPretty is the new id 10.
// - Array order = display order (strongest projects first).
// - New optional fields: role, highlights, results (ignored by the UI until you use them).
// - Search this file for "TODO" before publishing.

export const categories = [
  { id: 'all', name: 'All Projects', icon: 'LayoutGrid' },
  { id: 'ecommerce', name: 'E-Commerce', icon: 'ShoppingCart' },
  { id: 'enterprise', name: 'Enterprise', icon: 'Building2' },
  { id: 'tools', name: 'Developer Tools', icon: 'Wrench' },
  { id: 'fullstack', name: 'Full Stack', icon: 'Code2' },
  { id: 'landing', name: 'Websites', icon: 'Globe' }
];

export const projectsData = [
  {
    id: 6,
    title: "Paradise Game DZ",
    description: "Production digital-subscription marketplace for gaming and streaming services in the Algerian market. Bilingual French/Arabic with full RTL, real-time customer chat and order fulfillment, multi-currency pricing with exchange-rate management, promotional campaigns, customer reviews, and an admin back office with business analytics.",
    role: "Full Stack Developer",
    highlights: [
      "Real-time support and order-fulfillment chat on Supabase Realtime with staff assignment, unread tracking and quick-reply templates",
      "Hierarchical catalog with multi-level variations and per-variant pricing, discounts and availability, plus multi-currency pricing",
      "Email OTP, email/password and Google and Facebook OAuth 2.0 authentication, plus Web Push notifications",
      "Cloudflare R2 media storage and RBAC for Clients, Moderators and Administrators, aligned with Algerian Law 18-07"
    ],
    results: "About 7.5K weekly active users (Google Analytics 4)", // TODO: replace with the 28/90-day figure once checked
    // TODO: replace the placeholder with real screenshots (storefront, chat, admin analytics)
    thumbnail: "/assets/images/projects/placeholder-preview.svg",
    images: [
      "/assets/images/projects/placeholder-preview.svg"
    ],
    technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Supabase Realtime", "Cloudflare R2", "Tailwind CSS", "Vercel"],
    category: "ecommerce",
    githubUrl: "",
    liveUrl: "https://paradisegamedz.com/",
    featured: true,
    year: "2024",
    isPrivate: false
  },
  {
    id: 10,
    title: "PlugNPretty",
    description: "Bilingual French/Arabic e-commerce platform for a beauty and personal-care business: searchable catalog with variants and promotions, guest and authenticated checkout, order history, and an admin back office for products, banners and orders.",
    role: "Full Stack Developer",
    highlights: [
      "Product catalog with categories, variants, pricing, promotions, images, search and filtering",
      "Complete ordering workflow for guest and authenticated customers: cart, delivery details, order confirmation and order history",
      "Admin back office for products, categories, banners, variants, promotions and order status management",
      "Email/password and Google OAuth authentication on Supabase, with full Arabic RTL support and SEO-optimized localized pages"
    ],
    // TODO: add a results line (orders, traffic or Lighthouse score) when you have one
    // TODO: replace the placeholder with real screenshots
    thumbnail: "/assets/images/projects/placeholder-preview.svg",
    images: [
      "/assets/images/projects/placeholder-preview.svg"
    ],
    technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS", "Google OAuth", "Vercel"],
    category: "ecommerce",
    githubUrl: "",
    liveUrl: "https://plugnpretty.com/",
    featured: true,
    year: "2026",
    isPrivate: false
  },
  {
    id: 9,
    title: "GPAO Production Management System",
    description: "Production management platform built from scratch for Groupe Chiali's manufacturing operations, tracking workflows, production orders and operational metrics, and integrated with an existing Laboratory Management System.",
    role: "Full Stack Developer",
    highlights: [
      "Relational schema with Prisma and MySQL modeling production orders, components and operational data",
      "RESTful APIs with JWT authentication (Node.js, Express) and role-based UI for operational teams",
      "Operational dashboards and data visualizations with React, shadcn/ui, Tailwind CSS and Recharts",
      "Shared MySQL layer connecting production and quality-control workflows; deployed with multi-container Docker on a Linux server"
    ],
    // TODO: add an anonymized dashboard screenshot or an architecture diagram
    thumbnail: "/assets/images/projects/placeholder-gpao.svg",
    images: [
      "/assets/images/projects/placeholder-gpao.svg"
    ],
    technologies: ["React", "shadcn/ui", "Tailwind CSS", "Node.js", "Express", "Prisma", "MySQL", "Recharts", "JWT", "Docker"],
    category: "enterprise",
    githubUrl: "",
    liveUrl: "",
    featured: true,
    year: "2025",
    isPrivate: true
  },
  {
    id: 8,
    title: "Enterprise Document Management System",
    description: "Internal document management platform for Groupe Chiali organizing documents across departments, with hierarchical storage, metadata tagging, version control, secure uploads, audit logging and group-level role-based access control.",
    role: "Full Stack Developer",
    highlights: [
      "Hierarchical storage with metadata tagging and document version control",
      "Complete RBAC system with group-level permissions for structured, secure access",
      "Secure uploads and audit logging",
      "Full stack on Node.js, Express and MongoDB with a React and Material UI frontend, containerized with Docker"
    ],
    // TODO: add an anonymized screenshot or an architecture diagram
    thumbnail: "/assets/images/projects/placeholder-enterprise.svg",
    images: [
      "/assets/images/projects/placeholder-enterprise.svg"
    ],
    technologies: ["React", "Material UI", "Node.js", "Express", "MongoDB", "RBAC", "Docker"],
    category: "enterprise",
    githubUrl: "",
    liveUrl: "",
    featured: true,
    year: "2024",
    isPrivate: true
  },
  {
    id: 5,
    title: "LazyQuery",
    description: "Developer tool that converts SQL, JSON and Prisma schemas into interactive ERD diagrams with automatic layout. Supports search and filtering for tables and relations, and export.",
    role: "Creator and developer",
    highlights: [
      "Schema parsing with @prisma/internals and custom SQL-to-Prisma converters",
      "Interactive graph visualization with React Flow and automatic layout powered by Dagre"
    ],
    // TODO: add a screenshot and a short GIF of an ERD being generated
    thumbnail: "/assets/images/projects/placeholder-preview.svg",
    images: [
      "/assets/images/projects/placeholder-preview.svg"
    ],
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "React Flow", "Dagre"],
    category: "tools",
    githubUrl: "", // TODO: add the public repo URL (the CV calls it open-source), or remove that claim from the CV
    liveUrl: "https://www.lazy-query.online/",
    featured: true,
    year: "2025",
    isPrivate: false
  },
  {
    id: 1,
    title: "Fikrat Tech",
    description: "Agency website for Fikrat, a digital studio helping entrepreneurs and businesses launch websites, MVPs and prototypes. Built with fluid Framer Motion animations, structured SEO content and lead-capture workflows.",
    role: "Developer",
    // TODO: use one agency name and URL everywhere (here it is Fikrat Tech / fikrat.tech; the CV says Fikrat DZ Tech / fikratdz.tech)
    // TODO: add distinct screenshots instead of repeating one image
    thumbnail: "/assets/images/projects/Fikrat.png",
    images: [
      "/assets/images/projects/Fikrat.png"
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Framer Motion"],
    category: "landing",
    githubUrl: "https://github.com/sarimAbdelbari/Fikrat-Agency",
    liveUrl: "https://www.fikrat.tech/",
    featured: false,
    year: "2024",
    isPrivate: false
  },
  {
    id: 2,
    title: "VitaLife Medical Centre",
    description: "Responsive, SEO-optimized corporate website for a medical diagnostic centre, presenting its services and medical solutions and improving its digital presence.",
    role: "Developer",
    thumbnail: "/assets/images/projects/Vitalife1.png",
    images: [
      "/assets/images/projects/VitaLife.png",
      "/assets/images/projects/Vitalife2.png",
      "/assets/images/projects/Vitalife3.png"
    ],
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
    category: "landing",
    githubUrl: "https://github.com/sarimAbdelbari/VitaLife-Project-Freelance",
    liveUrl: "https://www.vitalife-medical.dz/",
    featured: false,
    year: "2023",
    isPrivate: false
  },
  {
    id: 3,
    title: "Feather Journalism Platform",
    description: "Full-stack platform for journalists to publish articles and for readers to discover and engage with content. Features article management, user authentication and content discovery.",
    role: "Full Stack Developer",
    thumbnail: "/assets/images/projects/Feather1.jpg",
    images: [
      "/assets/images/projects/Feather2.png",
      "/assets/images/projects/Feather3.png"
    ],
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB"],
    category: "fullstack",
    githubUrl: "https://github.com/sarimAbdelbari/Feather-Journalism-Platform",
    liveUrl: "https://feather-journalism-platform.vercel.app/",
    featured: false,
    year: "2023",
    isPrivate: false
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "Personal portfolio with a custom loading system, lazy loading, custom motion primitives, dark/light mode and a responsive design.",
    thumbnail: "/assets/images/projects/PortfolioProject1.png",
    images: [
      "/assets/images/projects/PortfolioProject1.png",
      "/assets/images/projects/PortfolioProject2.png"
    ],
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS"],
    category: "landing",
    githubUrl: "https://github.com/sarimAbdelbari/sarim-portfolio-",
    liveUrl: "https://sarimabdelbari.vercel.app/",
    featured: false,
    year: "2024",
    isPrivate: false
  },
  {
    id: 7,
    title: "SamFix Repair Shop",
    description: "Business website for a repair shop showcasing its services and making it easy for customers to get in touch.",
    // TODO: add a real screenshot, or remove this low-signal project
    thumbnail: "/assets/images/projects/placeholder-preview.svg",
    images: [
      "/assets/images/projects/placeholder-preview.svg"
    ],
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
    category: "landing",
    githubUrl: "",
    liveUrl: "https://samfix.netlify.app/",
    featured: false,
    year: "2024",
    isPrivate: false
  }
];