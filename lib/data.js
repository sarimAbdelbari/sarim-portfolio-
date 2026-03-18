export const categories = [
  { id: 'all', name: 'All Projects', icon: 'LayoutGrid' },
  { id: 'landing', name: 'Landing Pages', icon: 'Globe' },
  { id: 'saas', name: 'SaaS / MVP', icon: 'Zap' },
  { id: 'tools', name: 'Developer Tools', icon: 'Wrench' },
  { id: 'ecommerce', name: 'E-Commerce', icon: 'ShoppingCart' },
  { id: 'enterprise', name: 'Enterprise', icon: 'Building2' },
  { id: 'fullstack', name: 'Full Stack', icon: 'Code2' }
];

export const projectsData = [
  {
    id: 1,
    title: "Fikrat Tech Agency",
    description: "Digital agency platform helping entrepreneurs and businesses launch digital products and MVPs. Specializes in website development, MVP development, startup prototypes, and digital product consulting.",
    thumbnail: "/assets/images/projects/Fikrat.png",
    images: [
      "/assets/images/projects/Fikrat.png",
      "/assets/images/projects/Fikrat.png",
      "/assets/images/projects/Fikrat.png"
    ],
    technologies: ["React", "Next.js", "Tailwind", "Framer Motion"],
    category: "saas",
    githubUrl: "https://github.com/sarimAbdelbari/Fikrat-Agency",
    liveUrl: "https://www.fikrat.tech/",
    featured: true,
    year: "2024",
    isPrivate: false
  },
  {
    id: 2,
    title: "The Pyramid Documentary",
    description: "Full-stack Content Management System built with the MERN stack to manage and organize a firm's content and ISO documents with role-based access and version tracking.",
    thumbnail: "/assets/images/projects/PyramidDoc3.png",
    images: [
      "/assets/images/projects/PyramidDoc1.png",
      "/assets/images/projects/PyramidDoc2.png",
      "/assets/images/projects/PyramidDoc3.png"
    ],
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB"],
    category: "saas",
    githubUrl: "https://github.com/sarimAbdelbari/Pyramid-Documentary",
    liveUrl: "",
    featured: true,
    year: "2024",
    isPrivate: false
  },
  {
    id: 3,
    title: "VitaLife Medical Centre",
    description: "Modern, responsive landing site for a healthcare Centre Diagnostic offering comprehensive medical services. Improves digital presence and presents services and medical solutions.",
    thumbnail: "/assets/images/projects/Vitalife1.png",
    images: [
      "/assets/images/projects/VitaLife.png",
      "/assets/images/projects/Vitalife2.png",
      "/assets/images/projects/Vitalife3.png"
    ],
    technologies: ["Next.js", "Tailwind", "Framer Motion"],
    category: "landing",
    githubUrl: "https://github.com/sarimAbdelbari/VitaLife-Project-Freelance",
    liveUrl: "https://www.vitalife-medical.dz/",
    featured: false,
    year: "2023",
    isPrivate: false
  },
  {
    id: 4,
    title: "Feather Journalism Platform",
    description: "Modern full-stack platform for journalists to publish articles and for readers to discover and engage with content. Features article management, user authentication, and content discovery.",
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
    id: 5,
    title: "Portfolio Website",
    description: "Personal portfolio website with advanced loading system, lazy loading, custom motion primitives, and optimized performance. Features dark/light mode and responsive design.",
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
    id: 6,
    title: "LazyQuery",
    description: "SaaS developer tool that converts database schemas into interactive UML/ERD diagrams. Supports multi-format parsing, automatic diagram generation, search and filtering for tables and relations, and export capabilities.",
    thumbnail: "/assets/images/projects/placeholder-preview.svg",
    images: [
      "/assets/images/projects/placeholder-preview.svg"
    ],
    technologies: ["React", "Node.js", "Express.js", "PostgreSQL", "MySQL", "MongoDB"],
    category: "tools",
    githubUrl: "",
    liveUrl: "https://www.lazy-query.online/",
    featured: true,
    year: "2025",
    isPrivate: false
  },
  {
    id: 7,
    title: "ParadiseGameDZ",
    description: "Digital subscription marketplace for gaming and streaming services. Features a digital product catalog, online order management, real-time customer chat, admin dashboard with analytics, and real-time database updates.",
    thumbnail: "/assets/images/projects/placeholder-preview.svg",
    images: [
      "/assets/images/projects/placeholder-preview.svg"
    ],
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "Socket.io"],
    category: "ecommerce",
    githubUrl: "",
    liveUrl: "http://paradisegamedz.com/",
    featured: true,
    year: "2024",
    isPrivate: false
  },
  {
    id: 8,
    title: "SamFix Repair Shop",
    description: "Modern business website for a repair shop showcasing services and enabling easy customer contact. Improves online visibility and facilitates customer inquiries for repair services.",
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
  },
  {
    id: 9,
    title: "Enterprise Document Management System",
    description: "Hierarchical document management platform for Groupe Chiali with role-based access control, document version tracking, and secure storage. Features structured document hierarchy and scalable backend architecture.",
    thumbnail: "/assets/images/projects/placeholder-enterprise.svg",
    images: [
      "/assets/images/projects/placeholder-enterprise.svg"
    ],
    technologies: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    category: "enterprise",
    githubUrl: "",
    liveUrl: "",
    featured: true,
    year: "2024",
    isPrivate: true
  },
  {
    id: 10,
    title: "GPAO Production Management System",
    description: "Full-stack production management platform for Groupe Chiali's manufacturing operations. Relational database schema with Prisma + MySQL, RESTful APIs with JWT auth, interactive dashboards with Recharts data visualization.",
    thumbnail: "/assets/images/projects/placeholder-gpao.svg",
    images: [
      "/assets/images/projects/placeholder-gpao.svg"
    ],
    technologies: ["React", "shadcn/ui", "Tailwind CSS", "Node.js", "Express", "Prisma", "MySQL", "Recharts", "JWT"],
    category: "enterprise",
    githubUrl: "",
    liveUrl: "",
    featured: true,
    year: "2025",
    isPrivate: true
  }
];
