'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useDesignSystem } from './DesignSystemContext';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { archetype } = useDesignSystem();
  
  // State to handle the transition overlay duration
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // Defer state updates to prevent React cascade rendering warnings
    const frame = requestAnimationFrame(() => {
      setIsInitialLoading(true);
    });

    const loadingTimer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1200);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(loadingTimer);
    };
  }, [pathname]);

  // Define page content motion settings matching current active archetype
  const getContentMotionProps = () => {
    switch (archetype) {
      case 'swiss':
        return {
          initial: { opacity: 0, y: 40 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -30 },
          transition: {
            type: 'spring',
            stiffness: 140,
            damping: 20,
            mass: 0.8,
          },
        };
      case 'editorial':
        return {
          initial: { opacity: 0, y: 20, scale: 0.99 },
          animate: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, y: -15, scale: 0.99 },
          transition: {
            duration: 0.7,
            ease: [0.25, 1, 0.5, 1], // Silk deceleration curve
          },
        };
      case 'brutalist':
        return {
          initial: { opacity: 0, x: -20, scale: 0.99 },
          animate: { opacity: 1, x: 0, scale: 1 },
          exit: { opacity: 0, x: 20, scale: 0.99 },
          transition: {
            duration: 0.25,
            ease: 'linear', // Solid structural change
          },
        };
      case 'cosmic':
      default:
        return {
          initial: { opacity: 0, y: 30, scale: 0.96, filter: 'blur(10px)' },
          animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
          exit: { opacity: 0, y: -30, scale: 0.96, filter: 'blur(10px)' },
          transition: {
            duration: 0.75,
            ease: [0.16, 1, 0.3, 1], // Ethereal portal curve
          },
        };
    }
  };

  const motionProps = getContentMotionProps();

  return (
    <div className="relative w-full flex-grow flex flex-col">
      <AnimatePresence>
        {isInitialLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.45, ease: 'easeInOut' } }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-[#050A12]"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.72 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex h-32 w-44 items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
                className="absolute h-32 w-32 rounded-full border border-soft-purple/50 border-t-transparent"
              />
              <div className="absolute h-24 w-36 rounded-full bg-modern-blue/10 blur-2xl" />
              <img src="/icon.svg" alt="MAB Studio" className="relative h-24 w-36 object-contain" />
            </motion.div>
            <div className="mt-8 h-px w-32 overflow-hidden bg-white/10">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 1, ease: 'easeInOut' }}
                className="h-full w-full bg-soft-purple"
              />
            </div>
            <span className="mt-4 font-mono text-[10px] uppercase tracking-[0.35em] text-neutral-gray">
              Studio de création
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CORE PAGE CONTENT WRAPPER WITH ARCHETYPE ANIMATION */}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={pathname}
          {...(motionProps as any)}
          className="w-full flex-grow flex flex-col"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
