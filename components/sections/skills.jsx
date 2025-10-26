"use client";
import Image from 'next/image';
import { InfiniteSlider } from '@/components/motion-primitives/infinite-slider';
import { ProgressiveBlur } from '@/components/motion-primitives/progressive-blur';

export default function Skills() {
    const technologies = [
        { name: "React", logo: "/assets/skills/react.svg", color: "text-blue-400" },
        { name: "Next.js", logo: "/assets/skills/nextdotjs.svg", color: "text-white" },
        { name: "Node.js", logo: "/assets/skills/nodedotjs.svg", color: "text-green-400" },
        { name: "TypeScript", logo: "/assets/skills/typescript.svg", color: "text-blue-500" },
        { name: "JavaScript", logo: "/assets/skills/javascript.svg", color: "text-yellow-400" },
        { name: "MongoDB", logo: "/assets/skills/mongodb.svg", color: "text-green-500" },
        { name: "PostgreSQL", logo: "/assets/skills/postgresql.svg", color: "text-blue-600" },
        { name: "Express", logo: "/assets/skills/express.svg", color: "text-gray-300" },
        { name: "Tailwind CSS", logo: "/assets/skills/tailwindcss.svg", color: "text-cyan-400" },
        { name: "Git", logo: "/assets/skills/git.svg", color: "text-orange-500" },
        { name: "GitHub", logo: "/assets/skills/github.svg", color: "text-foreground" },
        { name: "MySQL", logo: "/assets/skills/mysql.svg", color: "text-blue-600" }
    ];

    return (
        <section className="bg-background overflow-hidden py-16">
            <div className="group relative m-auto max-w-7xl px-6">
                <div className="flex flex-col items-center md:flex-row justify-center">
                    
                    <div className="relative py-6 md:w-[calc(100%-11rem)] w-full">
                        <InfiniteSlider
                            speedOnHover={20}
                            speed={40}
                            gap={64}>
                            {technologies.map((tech) => (
                                <div
                                    key={tech.name}
                                    className="flex flex-col items-center justify-center min-w-fit group/tech"
                                >
                                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center shadow-md group-hover/tech:shadow-xl transition-all duration-300 group-hover/tech:scale-110 p-3">
                                        <Image
                                            src={tech.logo}
                                            alt={tech.name}
                                            width={40}
                                            height={40}
                                            className="w-full h-full object-contain dark:invert"
                                        />
                                    </div>
                                    <span className={`mt-2 text-xs md:text-sm font-medium  opacity-70 group-hover/tech:opacity-100 transition-opacity duration-300`}>
                                        {tech.name}
                                    </span>
                                </div>
                            ))}
                        </InfiniteSlider>

                        {/* Progressive blur edges */}
                        <ProgressiveBlur
                            className="pointer-events-none absolute left-0 top-0 h-full w-20"
                            direction="left"
                            blurIntensity={1}
                        />
                        <ProgressiveBlur
                            className="pointer-events-none absolute right-0 top-0 h-full w-20"
                            direction="right"
                            blurIntensity={1}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
