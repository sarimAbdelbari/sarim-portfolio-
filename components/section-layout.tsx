'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionLayoutProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  title: string;
  description: string;
}

export function SectionLayout({
  id,
  className,
  children,
  title,
  description,
}: SectionLayoutProps) {
  return (
    <section id={id} className={cn('py-24 w-full', className)}>
      <div className="container px-4 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-4 text-center mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight">{title}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {description}
          </p>
        </motion.div>
        {children}
      </div>
    </section>
  );
}