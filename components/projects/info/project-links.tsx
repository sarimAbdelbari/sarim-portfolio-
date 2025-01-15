'use client';

import { Button } from '@/components/ui/button';
import { Github, Globe } from 'lucide-react';

interface ProjectLinksProps {
  github?: string;
  demo?: string;
}

export function ProjectLinks({ github, demo }: ProjectLinksProps) {
  return (
    <div className="flex gap-4">
      {github && (
        <Button asChild>
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <Github className="h-4 w-4" />
            View Source
          </a>
        </Button>
      )}
      {demo && (
        <Button asChild>
          <a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <Globe className="h-4 w-4" />
            Live Demo
          </a>
        </Button>
      )}
    </div>
  );
}