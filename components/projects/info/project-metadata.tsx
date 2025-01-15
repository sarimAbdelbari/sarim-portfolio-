'use client';

interface ProjectMetadataProps {
  role: string;
  duration: string;
  company: string;
}

export function ProjectMetadata({ role, duration, company }: ProjectMetadataProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Project Details</h2>
      <div className="space-y-2 text-muted-foreground">
        <p>Role: {role}</p>
        <p>Duration: {duration}</p>
        <p>Company: {company}</p>
      </div>
    </div>
  );
}