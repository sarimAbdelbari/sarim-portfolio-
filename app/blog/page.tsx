import { blogPosts } from '@/lib/blog-data';
import { BlogContainer } from '@/components/blog/layout/blog-container';
import { BlogHeader } from '@/components/blog/layout/blog-header';
import { BlogGrid } from '@/components/blog/layout/blog-grid';

export default function BlogPage() {
  return (
    <BlogContainer>
      <BlogHeader
        title="Blog"
        description="Exploring web development concepts, best practices, and modern technologies"
      />
      <BlogGrid posts={blogPosts} />
    </BlogContainer>
  );
}