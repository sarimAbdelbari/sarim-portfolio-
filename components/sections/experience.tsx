'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Calendar } from 'lucide-react';
import { SectionLayout } from '@/components/section-layout';
import { experiences } from '@/lib/experience-data';

export function ExperienceSection() {
  return (
    <SectionLayout
      id="experience"
      title="Professional Experience"
      description="My journey in web development, from freelancing to full-time roles"
    >
      <div className="space-y-8 max-w-4xl mx-auto w-full px-4">
        {experiences.map((experience, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{experience.position}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Building className="h-4 w-4" />
                    <span>{experience.company}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{experience.period}</span>
                    <span>•</span>
                    <span>{experience.location}</span>
                    <span>•</span>
                    <span>{experience.type}</span>
                  </div>
                </div>
              </div>
              <p className="mb-4 text-muted-foreground">{experience.description}</p>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionLayout>
  );
}