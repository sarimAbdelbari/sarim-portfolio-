import { ISourceOptions } from '@tsparticles/engine';

export const particlesConfig: ISourceOptions = {
  background: {
    color: { value: "transparent" },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: { enable: true, mode: "repulse" },
      onHover: { enable: true, mode: "grab" },
    },
    modes: {
      push: { distance: 200, duration: 15 },
      grab: { distance: 150 },
    },
  },
  particles: {
    color: { 
      value: "#724ce9",
      animation: {
        enable: true,
        speed: 2,
        sync: true
      }
    },
    links: {
      color: "#724ce9",
      distance: 150,
      enable: true,
      opacity: 0.2,
      width: 1,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: { default: "bounce" },
      random: true,
      speed: 1,
      straight: false,
    },
    number: {
      density: { enable: true },
      value: 100,
    },
    opacity: { 
      value: 0.4,
      animation: {
        enable: true,
        speed: 0.5,
        sync: false
      }
    },
    shape: { type: "circle" },
    size: { 
      value: { min: 1, max: 3 },
      animation: {
        enable: true,
        speed: 2,
        sync: false
      }
    },
  },
  detectRetina: true,
};
