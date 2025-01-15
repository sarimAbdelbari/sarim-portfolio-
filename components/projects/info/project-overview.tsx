'use client';

interface ProjectOverviewProps {
  description: string;
}

export function ProjectOverview({ description }: ProjectOverviewProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Overview</h2>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}