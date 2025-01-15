import { PostHeader } from '@/components/blog/post-header';
import { PostContent } from '@/components/blog/post-content';
import { BlogContainer } from '@/components/blog/layout/blog-container';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/lib/blog-data';

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <BlogContainer className="max-w-4xl mx-auto">
      <PostHeader
        title={post.title}
        date={post.date}
        readingTime={post.readingTime}
        tags={post.tags}
        coverImage={post.coverImage}
      />
      <div className="mt-12">
        <PostContent content={post.content} />
      </div>
    </BlogContainer>
  );
}