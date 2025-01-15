import { Code2, Database, Layout, Server, Smartphone, Wrench } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Skill {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const skills: Skill[] = [
  {
    title: 'Frontend Development',
    description:
      'Expertise in React.js, Next.js, TypeScript, and modern CSS frameworks like Tailwind CSS and Material UI.',
    icon: Layout,
  },
  {
    title: 'Backend Development',
    description:
      'Strong foundation in Node.js, Express.js, and RESTful API design with experience in various databases.',
    icon: Server,
  },
  {
    title: 'Database Management',
    description:
      'Proficient in both SQL and NoSQL databases, including MongoDB, MySQL, and Firebase.',
    icon: Database,
  },
  {
    title: 'Clean Code & Best Practices',
    description:
      'Advocate for clean code, design patterns, and object-oriented programming principles.',
    icon: Code2,
  },
  {
    title: 'Development Tools',
    description:
      'Experienced with Git, npm, yarn, Webpack, and various development tools and workflows.',
    icon: Wrench,
  },
  {
    title: 'Responsive Design',
    description:
      'Creating mobile-first, responsive web applications that work seamlessly across all devices.',
    icon: Smartphone,
  },
];