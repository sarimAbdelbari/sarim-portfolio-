'use client';

import { cn } from '@/lib/utils';

export function ProgressiveBlur({
  className,
  direction = 'right',
  blurIntensity = 1,
}) {
  const gradientDirection = {
    left: 'to right',
    right: 'to left',
    top: 'to bottom',
    bottom: 'to top',
  };

  return (
    <div
      className={cn('pointer-events-none', className)}
      style={{
        background: `linear-gradient(${gradientDirection[direction]}, 
          hsl(var(--background)) 0%, 
          transparent 100%)`,
        backdropFilter: `blur(${blurIntensity * 8}px)`,
        WebkitBackdropFilter: `blur(${blurIntensity * 8}px)`,
      }}
    />
  );
}

