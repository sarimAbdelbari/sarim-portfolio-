// components/ui/Container.tsx
import { cn } from "@/lib/utils"; // if you're using Tailwind + clsx helper



export default function Container({ children, className }) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}
