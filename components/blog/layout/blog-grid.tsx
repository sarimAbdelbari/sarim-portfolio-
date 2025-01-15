'use client';

import { motion } from 'framer-motion';
import { PostCard } from '@/components/blog/post-card';
import type { BlogPost } from '@/lib/blog-data';

interface BlogGridProps {
  posts: BlogPost[];
}

export function BlogGrid({ posts }: BlogGridProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, index) => (
        <PostCard key={post.slug} post={post} index={index} />
      ))}
    </div>
  );
}