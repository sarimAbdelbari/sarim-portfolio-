'use client';

import { ProjectHeader } from './project-header';
import { ProjectInfo } from './project-info';
import { ProjectGallery } from './project-gallery';
import { projects } from '@/lib/projects-data';
import { notFound } from 'next/navigation';

interface ProjectDetailsProps {
  slug: string;
}

export function ProjectDetails({ slug }: ProjectDetailsProps) {
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container px-4">
        <ProjectHeader project={project} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <ProjectInfo project={project} />
          <ProjectGallery project={project} />
        </div>
      </div>
    </div>
  );
}