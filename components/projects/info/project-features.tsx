'use client';

interface ProjectFeaturesProps {
  features: string[];
}

export function ProjectFeatures({ features }: ProjectFeaturesProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Key Features</h2>
      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
    </div>
  );
}