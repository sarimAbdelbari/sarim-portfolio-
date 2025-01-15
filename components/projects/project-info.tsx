'use client';

import { motion } from 'framer-motion';
import { ProjectOverview } from './info/project-overview';
import { ProjectFeatures } from './info/project-features';
import { ProjectMetadata } from './info/project-metadata';
import { ProjectLinks } from './info/project-links';
import type { Project } from '@/lib/projects-data';

interface ProjectInfoProps {
  project: Project;
}

export function ProjectInfo({ project }: ProjectInfoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <ProjectOverview description={project.description} />
      <ProjectFeatures features={project.features} />
      <ProjectMetadata
        role={project.role}
        duration={project.duration}
        company={project.company}
      />
      <ProjectLinks github={project.github} demo={project.demo} />
    </motion.div>
  );
}