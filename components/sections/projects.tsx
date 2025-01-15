'use client';

import { ProjectCard } from './projects/project-card';
import { SectionLayout } from '@/components/section-layout';
import { projects } from '@/lib/projects-data';

export function ProjectsSection() {
  return (
    <SectionLayout
      id="projects"
      className="bg-secondary/5"
      title="Featured Projects"
      description="Here are some of the projects I've worked on that showcase my skills and experience"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </SectionLayout>
  );
}