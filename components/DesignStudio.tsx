'use client';

import { useDesignSystem, DesignArchetype } from './DesignSystemContext';
import { motion, AnimatePresence } from 'motion/react';
import { Sliders, Grid, Sparkles, BookOpen, Skull, Check, Volume2, VolumeX, Compass } from 'lucide-react';
import { useState } from 'react';

export function DesignStudio() {
  const { 
    archetype, 
    setArchetype, 
    showGridGuides, 
    setShowGridGuides,
    soundEnabled,
    setSoundEnabled
  } = useDesignSystem();
  const [isOpen, setIsOpen] = useState(false);

  const archetypesList: { id: DesignArchetype; label: string; desc: string; icon: any; color: string }[] = [
    {
      id: 'swiss',
      label: 'Swiss Grid',
      desc: 'Minimalist geometry, clean sans-serif typography, precise line layout guides.',
      icon: Grid,
      color: 'bg-blue-600',
    },
    {
      id: 'editorial',
      label: 'Editorial Lux',
      desc: 'Elegant serif headings, warm organic bronze tones, classic publication feels.',
      icon: BookOpen,
      color: 'bg-amber-700',
    },
    {
      id: 'brutalist',
      label: 'Neo-Brutalist',
      desc: 'High contrast toxic neon, raw mono fonts, solid solid shadows, heavy borders.',
      icon: Skull,
      color: 'bg-emerald-500',
    },
    {
      id: 'cosmic',
      label: 'Hyper Obsidian',
      desc: 'Obsidian luxury space, glowing electric tangerine & vibrant cyber lime volt.',
      icon: Sparkles,
      color: 'bg-orange-600',
    },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="mb-4 w-80 glass-card p-6 shadow-2xl border border-white/10 flex flex-col gap-5 bg-navy/95 backdrop-blur-xl rounded-2xl text-left"
          >
            <div>
              <h4 className="text-sm uppercase tracking-wider font-bold text-modern-blue flex items-center gap-2">
                <Compass size={14} className="animate-spin-slow" /> Studio Controller
              </h4>
              <p className="text-xs text-neutral-gray mt-1">
                Awwwards-grade real-time engine: toggle structural guidelines and theme-specific soundscapes.
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              {archetypesList.map((arch) => {
                const IconComp = arch.icon;
                const isActive = archetype === arch.id;
                return (
                  <button
                    key={arch.id}
                    onClick={() => setArchetype(arch.id)}
                    className={`w-full text-left p-3 rounded-xl border flex items-start gap-3 transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white/10 border-modern-blue'
                        : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                    }`}
                  >
                    <div className={`p-2 rounded-lg text-white ${arch.color}`}>
                      <IconComp size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{arch.label}</span>
                        {isActive && <Check size={12} className="text-modern-blue" />}
                      </div>
                      <p className="text-[10px] text-neutral-gray leading-normal mt-0.5">{arch.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Micro-Soundscapes Controller */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  {soundEnabled ? <Volume2 size={14} className="text-modern-blue animate-bounce" /> : <VolumeX size={14} className="text-neutral-gray" />}
                  Soundscape FX
                </span>
                <span className="text-[10px] text-neutral-gray">Interactive tone feedback synthesis</span>
              </div>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  soundEnabled ? 'bg-modern-blue' : 'bg-white/10'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    soundEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Grid Guides Controller */}
            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white">Guides de Construction</span>
                <span className="text-[10px] text-neutral-gray">Reveal 12-col architectural grid overlays</span>
              </div>
              <button
                onClick={() => setShowGridGuides(!showGridGuides)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  showGridGuides ? 'bg-modern-blue' : 'bg-white/10'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    showGridGuides ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-gradient-to-r from-modern-blue to-soft-purple text-white font-semibold text-sm shadow-xl shadow-modern-blue/20 cursor-pointer border border-white/10 backdrop-blur-md"
      >
        <Sliders size={16} className={isOpen ? 'rotate-90 transition-transform' : ''} />
        <span>Design Studio</span>
        <span className="text-[10px] font-mono px-2 py-0.5 bg-white/20 rounded-full uppercase">
          {archetype}
        </span>
      </motion.button>
    </div>
  );
}
