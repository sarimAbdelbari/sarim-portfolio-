"use client";
import React from 'react'
import ComingSoonBlog from '@/components/sections/comingSoonBlog'

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-16 bg-gradient-to-br from-background via-background/95 to-background relative">
        
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-4 h-4 bg-primary/20 rounded-full animate-pulse" />
          <div className="absolute top-40 right-20 w-6 h-6 bg-primary/10 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-primary/15 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-20 right-1/3 w-5 h-5 bg-primary/10 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
        </div>

        {/* Main Content */}
        <div className="text-center max-w-4xl mx-auto relative z-10">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium uppercase tracking-wide mb-6">
              Blog
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Coming Soon
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              I'm working on creating amazing content about web development, programming best practices, and technology insights. 
              Stay tuned for valuable tutorials and articles!
            </p>
          </div>

          {/* Feature list */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 mt-12">
            <div className="p-6 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50">
              <div className="text-2xl mb-3">📚</div>
              <h3 className="font-semibold text-foreground mb-2">Tutorials</h3>
              <p className="text-sm text-muted-foreground">Step-by-step guides and how-tos</p>
            </div>
            <div className="p-6 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50">
              <div className="text-2xl mb-3">💡</div>
              <h3 className="font-semibold text-foreground mb-2">Insights</h3>
              <p className="text-sm text-muted-foreground">Industry trends and best practices</p>
            </div>
            <div className="p-6 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50">
              <div className="text-2xl mb-3">🚀</div>
              <h3 className="font-semibold text-foreground mb-2">Projects</h3>
              <p className="text-sm text-muted-foreground">Real-world examples and case studies</p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => window.location.href = 'mailto:sarimabdelbari@gmail.com?subject=Blog Updates'}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
            >
              Get Notified
            </button>
            <a 
              href="/"
              className="px-6 py-3 border border-border rounded-xl font-medium hover:bg-background/80 transition-colors"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>

      {/* Coming Soon Blog Section */}
      <ComingSoonBlog />
      
      {/* Footer note */}
      <div className="py-8 text-center">
        <p className="text-sm text-muted-foreground">
          Expected launch: Q2 2024 • Follow my journey on this portfolio
        </p>
      </div>
    </div>
  )
} 