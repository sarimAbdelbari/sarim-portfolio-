export interface Experience {
  company: string;
  position: string;
  period: string;
  location: string;
  type: string;
  description: string;
  technologies: string[];
}

export const experiences: Experience[] = [
  {
    company: 'Groupe Chiali',
    position: 'Full Stack Web Developer',
    period: '06/2024 – Present',
    location: 'Algeria',
    type: 'Full-time',
    description: 'Developing a Content Management System (CMS) called the "Pyramid of Documents," designed as a document library with structured and hierarchical access. Implementing group permissions to control access and editing rights across different document levels.',
    technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'TypeScript'],
  },
  {
    company: 'ProductionSphere',
    position: 'Web Developer',
    period: '01/2024 – 03/2024',
    location: 'Lithuania',
    type: 'Remote',
    description: 'Worked on various projects including lead magnets, portfolio pages, and landing pages. Managed multiple projects simultaneously while ensuring timely delivery and client satisfaction.',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'MongoDB', 'Node.js', 'WordPress'],
  },
  {
    company: 'Jar Bricola',
    position: 'Freelance Web Developer',
    period: '07/2023 – 09/2023',
    location: 'Algeria',
    type: 'Remote',
    description: 'Developed a dashboard for a startup connecting clients with skilled workers. Collaborated with a mobile developer to ensure seamless integration between web dashboard and mobile app.',
    technologies: ['React', 'Tailwind CSS', 'Firebase', 'Recharts'],
  },
];