"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const SideMenu = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/sarimAbdelbari',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/kerroucha-abdelbari-sarim/',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: 'DEV.to',
      url: 'https://dev.to/sarim_abdelbari',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45h.56c.42 0 .63-.09.83-.26.24-.22.26-.26.26-1.3 0-.8-.01-.98-.07-1.1-.1-.29-.25-.44-.48-.5-.12-.04-.18-.04-.33-.04s-.21 0-.33.04zm15.05-6.7v13.3c0 .99-.8 1.8-1.8 1.8H3.33c-.99 0-1.8-.81-1.8-1.8V3.35c0-.99.81-1.8 1.8-1.8h17.4c.99 0 1.8.81 1.8 1.8zM8.5 7.26c-.32-.02-.84-.02-1.18 0-.41.02-.74.05-.95.08-.64.09-1.14.3-1.49.63-.18.17-.28.28-.37.46-.12.24-.18.54-.18 1.02v3.09c0 .5.06.78.21 1.04.1.2.25.37.46.52.42.32.91.51 1.53.58.16.02.26.02.73.02.4 0 .52 0 .73-.02.05 0 .12-.01.18-.02zm4.9-.84c-.32.06-.66.25-.87.53-.17.23-.31.53-.31 1.07v2.8c0 .54.14.84.31 1.07.21.28.55.47.87.53.13.02.36.02.49 0 .32-.06.66-.25.87-.53.17-.23.31-.53.31-1.07v-2.8c0-.54-.14-.84-.31-1.07-.21-.28-.55-.47-.87-.53-.13-.02-.36-.02-.49 0zm2.09.24c0 .15.04.32.1.48.14.36.39.66.73.9.27.19.55.31.85.36.13.02.49.02.62 0 .3-.05.58-.17.85-.36.34-.24.59-.54.73-.9.06-.16.1-.33.1-.48v-.09h-.51c-.41 0-.51.01-.51.05 0 .23-.09.43-.26.6-.11.12-.24.19-.38.23-.07.02-.12.02-.26.02s-.19 0-.26-.02c-.14-.04-.27-.11-.38-.23-.17-.17-.26-.37-.26-.6 0-.04-.1-.05-.51-.05h-.51v.09zm-6.02.36c.2 0 .36.14.36.32v2.32c0 .18-.16.32-.36.32s-.36-.14-.36-.32v-2.32c0-.18.16-.32.36-.32z"/>
        </svg>
      )
    },
    {
      name: 'Facebook',
      url: 'https://facebook.com/yourusername',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    }
  ];

  return (
    <motion.div 
      className="fixed right-6 bottom-0 z-40 flex flex-col items-center"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 2 }}
    >
      {/* Social Icons */}
      <div className="flex flex-col gap-4 mb-6">
        {socialLinks.map((social, index) => (
          <motion.div
            key={social.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2 + index * 0.1, duration: 0.5 }}
          >
            <Link
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block"
            >
              <motion.div
                className="w-12 h-12 bg-background border border-border rounded-full flex items-center justify-center text-foreground hover:text-primary transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                {social.icon}
              </motion.div>
              
              {/* Tooltip */}
              <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-foreground text-background px-2 py-1 rounded text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {social.name}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      
      {/* Vertical Line */}
      <motion.div
        className="w-1.5 h-24 bg-muted-foreground"
        initial={{ height: 0 }}
        animate={{ height: 96 }}
        transition={{ delay: 2.8, duration: 0.8 }}
      />
        <motion.div 
        className="fixed bottom-8 right-8 flex flex-col space-y-2 z-40"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        
          <motion.button
            className="w-8 h-8 flex items-center justify-center bg-background border border-border rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            animate={{ 
              y: [0, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay:  0.2
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="m18 15-6-6-6 6"/>
            </svg>
          </motion.button>
       
      </motion.div>
    </motion.div>

    
  );
};

export default SideMenu;