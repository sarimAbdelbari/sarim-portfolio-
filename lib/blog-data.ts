export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  readingTime: number;
  tags: string[];
  coverImage: string;
  content: {
    intro: string;
    sections: {
      title: string;
      content: string;
      image?: string;
    }[];
  };
}

export const blogPosts: BlogPost[] = [
  {
    title: "Understanding ORM vs ODM in Modern Web Development",
    slug: "orm-vs-odm",
    excerpt: "Explore the key differences between Object-Relational Mapping (ORM) and Object-Document Mapping (ODM), and when to use each in your projects.",
    date: "2024-03-15",
    readingTime: 8,
    tags: ["Database", "Backend", "Architecture"],
    coverImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=2071&auto=format&fit=crop",
    content: {
      intro: "When building modern web applications, choosing the right data mapping strategy is crucial for your application's performance and maintainability.",
      sections: [
        {
          title: "What is ORM?",
          content: "Object-Relational Mapping (ORM) is a technique that lets you query and manipulate data from a database using an object-oriented paradigm. Instead of writing raw SQL queries, you work with objects that represent your data.",
          image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"
        },
        {
          title: "What is ODM?",
          content: "Object-Document Mapping (ODM) is similar to ORM but is specifically designed for document databases like MongoDB. It provides a way to model your application data and define schemas for documents.",
          image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop"
        }
      ]
    }
  },
  {
    title: "IAM Permissions: A Comprehensive Guide",
    slug: "iam-permissions-guide",
    excerpt: "Deep dive into Identity and Access Management (IAM) permissions, best practices for security, and implementation strategies.",
    date: "2024-03-10",
    readingTime: 12,
    tags: ["Security", "AWS", "DevOps"],
    coverImage: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2070&auto=format&fit=crop",
    content: {
      intro: "Understanding IAM permissions is crucial for maintaining secure and well-organized cloud infrastructure.",
      sections: [
        {
          title: "What is IAM?",
          content: "Identity and Access Management (IAM) is a framework that enables you to manage digital identities and their access to various resources and services.",
          image: "https://images.unsplash.com/photo-1633265486064-086b219458ec?q=80&w=2070&auto=format&fit=crop"
        },
        {
          title: "Best Practices",
          content: "Follow the principle of least privilege, use groups for better management, and regularly audit access patterns.",
          image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop"
        }
      ]
    }
  },
  {
    title: "CMS vs DMS: Choosing the Right System",
    slug: "cms-vs-dms",
    excerpt: "Compare Content Management Systems (CMS) and Document Management Systems (DMS) to make informed decisions for your projects.",
    date: "2024-03-05",
    readingTime: 10,
    tags: ["CMS", "DMS", "Enterprise"],
    coverImage: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2070&auto=format&fit=crop",
    content: {
      intro: "Choosing between a CMS and DMS depends on your specific needs for content organization and document handling.",
      sections: [
        {
          title: "Content Management Systems (CMS)",
          content: "A CMS is designed to manage digital content, typically for websites. It focuses on creating, editing, and publishing content in various formats.",
          image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2070&auto=format&fit=crop"
        },
        {
          title: "Document Management Systems (DMS)",
          content: "A DMS specializes in storing, tracking, and managing document files. It emphasizes version control, metadata, and document workflows.",
          image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop"
        }
      ]
    }
  }
];