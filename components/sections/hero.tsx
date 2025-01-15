'use client';

import { HeroBackground } from './hero/hero-background';
import { HeroTitle } from './hero/hero-title';
import { HeroActions } from './hero/hero-actions';
import { TechStack } from './tech-stack';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16">
      <HeroBackground />
      <div className="container relative z-10 px-4 flex flex-col items-center gap-8">
        <HeroTitle />
        <HeroActions />
        <TechStack />
      </div>
    </section>
  );
}