"use client";

import { motion } from "framer-motion";

const LIGHTS = [
  { size: 320, left: "4%", top: "6%", color: "bg-teal/20", blur: "blur-3xl", x: [0, 48, 0], y: [0, -36, 0], scale: [1, 1.12, 1], duration: 34, delay: 0 },
  { size: 260, left: "68%", top: "10%", color: "bg-primary/15", blur: "blur-3xl", x: [0, -40, 0], y: [0, 32, 0], scale: [1, 1.08, 1], duration: 30, delay: 2 },
  { size: 240, left: "36%", top: "48%", color: "bg-teal/15", blur: "blur-3xl", x: [0, 28, 0], y: [0, -24, 0], scale: [1, 1.16, 1], duration: 36, delay: 4 },
  { size: 300, left: "10%", top: "72%", color: "bg-primary/12", blur: "blur-3xl", x: [0, 36, 0], y: [0, -28, 0], scale: [1, 1.1, 1], duration: 32, delay: 1 },
  { size: 150, left: "18%", top: "28%", color: "bg-primary/25", blur: "blur-2xl", x: [0, 22, 0], y: [0, 18, 0], scale: [1, 1.14, 1], duration: 24, delay: 0.5 },
  { size: 120, left: "58%", top: "4%", color: "bg-teal/30", blur: "blur-2xl", x: [0, -18, 0], y: [0, 20, 0], scale: [1, 1.1, 1], duration: 22, delay: 3 },
  { size: 160, left: "80%", top: "42%", color: "bg-primary/20", blur: "blur-2xl", x: [0, -26, 0], y: [0, -16, 0], scale: [1, 1.12, 1], duration: 26, delay: 1.5 },
  { size: 110, left: "32%", top: "78%", color: "bg-teal/25", blur: "blur-2xl", x: [0, 16, 0], y: [0, -20, 0], scale: [1, 1.18, 1], duration: 20, delay: 2.5 },
  { size: 130, left: "6%", top: "46%", color: "bg-primary/20", blur: "blur-2xl", x: [0, 20, 0], y: [0, 14, 0], scale: [1, 1.1, 1], duration: 28, delay: 5 },
  { size: 28, left: "16%", top: "18%", color: "bg-primary/50", blur: "blur-md", x: [0, 12, 0], y: [0, -10, 0], scale: [1, 1.2, 1], duration: 18, delay: 0 },
  { size: 18, left: "52%", top: "36%", color: "bg-teal/55", blur: "blur-md", x: [0, -10, 0], y: [0, 12, 0], scale: [1, 1.25, 1], duration: 19, delay: 1 },
  { size: 22, left: "74%", top: "24%", color: "bg-primary/45", blur: "blur-md", x: [0, 8, 0], y: [0, 14, 0], scale: [1, 1.15, 1], duration: 21, delay: 3.5 },
  { size: 16, left: "40%", top: "64%", color: "bg-teal/50", blur: "blur-md", x: [0, -8, 0], y: [0, -12, 0], scale: [1, 1.3, 1], duration: 18, delay: 2 },
  { size: 24, left: "86%", top: "70%", color: "bg-primary/40", blur: "blur-md", x: [0, -14, 0], y: [0, 8, 0], scale: [1, 1.2, 1], duration: 23, delay: 4.5 },
];

const ProjectsBokeh = ({ reduceMotion = false }) => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden>
    {LIGHTS.map((light, index) => {
      const className = `absolute rounded-full ${light.color} ${light.blur}`;
      const style = {
        width: light.size,
        height: light.size,
        left: light.left,
        top: light.top,
      };

      if (reduceMotion) {
        return <div key={index} className={className} style={style} />;
      }

      return (
        <motion.div
          key={index}
          className={className}
          style={style}
          animate={{ x: light.x, y: light.y, scale: light.scale }}
          transition={{
            duration: light.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: light.delay,
          }}
        />
      );
    })}
  </div>
);

export default ProjectsBokeh;
