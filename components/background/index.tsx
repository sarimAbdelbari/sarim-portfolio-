'use client';

import { ParticlesComponent } from './particles';
import { GradientBackground } from './gradient-background';

export function Background() {
  return (
    <>
      <GradientBackground />
      <ParticlesComponent
        id="tsparticles"
        className="fixed inset-0 -z-10"
      />
    </>
  );
}