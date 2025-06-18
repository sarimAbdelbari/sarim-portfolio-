"use client";
import React from 'react';
import { motion } from 'framer-motion';

const LineSeparator = ({ 
  variant = 'default', 
  className = '', 
  showDot = true,
  animated = true 
}) => {
  const variants = {
    default: 'border-border',
    primary: 'border-primary',
    gradient: 'border-transparent bg-gradient-to-r from-transparent via-primary to-transparent',
    dashed: 'border-border border-dashed'
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6, delay: 0.4, ease: "easeOut" }
    }
  };

  if (!animated) {
    return (
      <div className={`flex items-center justify-center py-8 ${className}`}>
        <div className="flex items-center w-full max-w-md">
          <div className={`flex-1 h-px border-t ${variants[variant]}`} />
          {showDot && (
            <div className="mx-4 w-2 h-2 bg-primary rounded-full" />
          )}
          <div className={`flex-1 h-px border-t ${variants[variant]}`} />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center py-8 ${className}`}>
      <div className="flex items-center w-full max-w-md">
        <motion.div 
          className={`flex-1 h-0.5 border-t ${variants[variant]} origin-left`}
          variants={lineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
        {showDot && (
          <motion.div 
            className="mx-4 w-2 h-2 bg-primary rounded-full"
            variants={dotVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          />
        )}
        <motion.div 
          className={`flex-1 h-0.5 border-t ${variants[variant]} origin-right`}
          variants={lineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
      </div>
    </div>
  );
};

export default LineSeparator;