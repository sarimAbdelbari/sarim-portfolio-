'use client';

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { particlesConfig } from "./particles-config";
import { useTheme } from 'next-themes';

interface ParticlesComponentProps {
  id: string;
  className?: string;
}

export function ParticlesComponent({ id, className }: ParticlesComponentProps) {
  const [init, setInit] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const initEngine = async () => {
      await initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      });
      setInit(true);
    };

    initEngine();
  }, []);

  if (!init || !mounted) return null;

  const isDark = theme === 'dark' || resolvedTheme === 'dark';

  return (
    <Particles
      id={id}
      options={{
        ...particlesConfig,
        particles: {
          ...particlesConfig.particles,
          color: {
            value: isDark ? "#724ce9" : "#3b82f6"
          },
          links: {
            ...particlesConfig.particles.links,
            color: isDark ? "#724ce9" : "#3b82f6"
          }
        }
      }}
      className={className}
    />
  );
}