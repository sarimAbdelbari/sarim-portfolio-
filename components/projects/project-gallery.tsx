'use client';

import { GalleryItem } from './gallery/gallery-item';
import type { Project } from '@/lib/projects-data';

interface ProjectGalleryProps {
  project: Project;
}

export function ProjectGallery({ project }: ProjectGalleryProps) {
  const previewImages = [
    project.image,
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop',
  ];

  return (
    <div className="space-y-6">
      {previewImages.map((image, index) => (
        <GalleryItem
          key={index}
          src={image}
          alt={`Project preview ${index + 1}`}
          index={index}
        />
      ))}
    </div>
  );
}