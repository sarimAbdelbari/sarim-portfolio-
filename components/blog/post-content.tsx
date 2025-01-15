'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { BlogPost } from '@/lib/blog-data';

interface PostContentProps {
  content: BlogPost['content'];
}

export function PostContent({ content }: PostContentProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="prose dark:prose-invert max-w-none"
    >
      <p className="lead">{content.intro}</p>

      {content.sections.map((section) => (
        <div key={section.title} className="my-8">
          <h2>{section.title}</h2>
          <p>{section.content}</p>
          {section.image && (
            <div className="relative h-[400px] my-8 rounded-lg overflow-hidden">
              <Image
                src={section.image}
                alt={section.title}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      ))}
    </motion.article>
  );
}