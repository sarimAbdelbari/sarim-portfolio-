export const categories = [
  { id: 'all', name: 'All Projects', icon: '🎯' },
  { id: 'landing', name: 'Landing Pages', icon: '🌐' },
  { id: 'saas', name: 'SaaS / MVP', icon: '🚀' },
  { id: 'tools', name: 'Tools', icon: '🛠️' },
  { id: 'ai', name: 'AI Integration', icon: '🤖' },
  { id: 'fullstack', name: 'Full Stack', icon: '💻' }
];

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
  {
    id: 2,
    title: "The Pyramid Documentary",
    description: "Full-stack Content Management System built with the MERN stack to manage and organize Firm's content and ISO documents.",
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
    year: "2024"
  },    
  {
    id: 3,
    title: "VitaLife Medical Centre",
    description: "Modern, responsive landing site for a healthcare Centre Diagnostic offering comprehensive medical services.",
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
    year: "2023"
  },
  {
    id: 4,
    title: "Feather Journalism Platform",
    description: "Modern platform for journalists to publish articles and for readers to discover and engage with content.",
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
    year: "2023"
  },
  {
    id: 5,
    title: "Portfolio Website",
    description: "Personal portfolio website with advanced loading system, lazy loading, and optimized performance.",
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
    year: "2024"
  }
];
