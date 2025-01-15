'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MobileNav } from './mobile-nav';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const navItems = [
  { href: '/#about', label: 'About' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/#contact', label: 'Contact' },
];

export function Header() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.replace('/#', ''));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <header className="fixed w-full z-50">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md border-b" />
      <div className="container relative mx-auto px-4">
        <div className="h-20 flex items-center justify-between">
          <Link 
            href="/" 
            className="relative text-xl font-bold hover:text-primary transition-colors"
          >
            {theme === 'dark' ? <Image  src="/assets/darkLogo.png" alt="Logo" width={100} height={100} className='object-contain' /> : <Image  src="/assets/lightLogo.png" alt="Logo" width={100} height={100} /> }
            
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <div className="flex items-center bg-muted/50 rounded-full p-1.5">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('/#', '');
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium rounded-full transition-colors",
                      "hover:text-primary",
                      isActive && "text-primary"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute inset-0 bg-muted rounded-full"
                        transition={{ type: "spring", duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                );
              })}
            </div>
            
            <div className="w-px h-6 bg-border mx-2" />
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-full"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </nav>

          <MobileNav />
        </div>
      </div>
    </header>
  );
}