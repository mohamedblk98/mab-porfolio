'use client';

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

export type DesignArchetype = 'swiss' | 'editorial' | 'brutalist' | 'cosmic';

interface DesignSystemContextType {
  archetype: DesignArchetype;
  setArchetype: (archetype: DesignArchetype) => void;
  showGridGuides: boolean;
  setShowGridGuides: (show: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  playHoverSound: () => void;
  playClickSound: () => void;
}

const DesignSystemContext = createContext<DesignSystemContextType | undefined>(undefined);

export function DesignSystemProvider({ children }: { children: React.ReactNode }) {
  const [archetype, setArchetype] = useState<DesignArchetype>('cosmic');
  const [showGridGuides, setShowGridGuides] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Mouse coords for custom award-winning responsive custom cursor
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [trailPos, setTrailPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const requestRef = useRef<number | null>(null);

  // Update mouse coordinates smoothly using interpolation (easing)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer');
      
      setIsHovered(!!isInteractive);
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Easing trail effect
  useEffect(() => {
    const tick = () => {
      setTrailPos((prev) => {
        const dx = mousePos.x - prev.x;
        const dy = mousePos.y - prev.y;
        // Interpolation factor
        const ease = 0.15;
        return {
          x: prev.x + dx * ease,
          y: prev.y + dy * ease,
        };
      });
      requestRef.current = requestAnimationFrame(tick);
    };
    requestRef.current = requestAnimationFrame(tick);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [mousePos]);

  // Web Audio Synthesizer (Zero asset dependency, instant load)
  const audioCtxRef = useRef<AudioContext | null>(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const playHoverSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      const now = ctx.currentTime;

      if (archetype === 'swiss') {
        // High fidelity minimal design click/blip
        osc.type = 'sine';
        osc.frequency.setValueAtTime(2200, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05);
        gainNode.gain.setValueAtTime(0.015, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (archetype === 'editorial') {
        // Soft wooden organic sound
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(240, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.12);
        gainNode.gain.setValueAtTime(0.08, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (archetype === 'brutalist') {
        // Square wave chiptune blip
        osc.type = 'square';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(880, now + 0.04);
        gainNode.gain.setValueAtTime(0.01, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (archetype === 'cosmic') {
        // Beautiful floating ambient chime
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(1760, now + 0.2);
        gainNode.gain.setValueAtTime(0.03, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      }
    } catch (e) {
      console.warn('Audio failed to play', e);
    }
  }, [soundEnabled, archetype]);

  const playClickSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      const now = ctx.currentTime;

      if (archetype === 'swiss') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1500, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.1);
        gainNode.gain.setValueAtTime(0.04, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (archetype === 'editorial') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.setValueAtTime(90, now + 0.05);
        gainNode.gain.setValueAtTime(0.15, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (archetype === 'brutalist') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.15);
        gainNode.gain.setValueAtTime(0.03, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (archetype === 'cosmic') {
        // Ethereal bell
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(1500, now + 0.05);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.4);
        gainNode.gain.setValueAtTime(0.05, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
      }
    } catch (e) {
      console.warn('Audio click failed to play', e);
    }
  }, [soundEnabled, archetype]);

  // Bind audio clicks to any page click when enabled
  useEffect(() => {
    const handleGlobalClick = () => {
      if (soundEnabled) {
        playClickSound();
      }
    };
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [soundEnabled, playClickSound]);

  // Auto-wire hover sound effects to all buttons/links on the fly
  useEffect(() => {
    const handleGlobalMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer')
      ) {
        // Check standard cooldown or attribute to avoid multi-triggering
        const element = target.closest('button, a, .cursor-pointer') || target;
        if (element && !element.classList.contains('sound-triggered-once')) {
          playHoverSound();
          element.classList.add('sound-triggered-once');
          setTimeout(() => {
            element.classList.remove('sound-triggered-once');
          }, 450);
        }
      }
    };
    window.addEventListener('mouseover', handleGlobalMouseOver);
    return () => window.removeEventListener('mouseover', handleGlobalMouseOver);
  }, [soundEnabled, playHoverSound]);

  // Apply CSS class or custom styles to body/html
  useEffect(() => {
    const root = document.documentElement;
    // Remove previous classes
    root.classList.remove('arch-swiss', 'arch-editorial', 'arch-brutalist', 'arch-cosmic');
    // Add current
    root.classList.add(`arch-${archetype}`);

    // Dynamic variable overrides for Tailwind v4
    if (archetype === 'swiss') {
      root.style.setProperty('--font-heading', 'var(--font-space-grotesk)');
      root.style.setProperty('--font-sans', 'var(--font-inter)');
      root.style.setProperty('--color-navy', '#0F172A');
      root.style.setProperty('--color-soft-white', '#F8FAFC');
      root.style.setProperty('--color-modern-blue', '#3B82F6');
      root.style.setProperty('--color-soft-purple', '#8B5CF6');
    } else if (archetype === 'editorial') {
      root.style.setProperty('--font-heading', 'var(--font-playfair)');
      root.style.setProperty('--font-sans', 'var(--font-inter)');
      root.style.setProperty('--color-navy', '#151210'); // Extra warm editorial charcoal
      root.style.setProperty('--color-soft-white', '#F6F3EE'); // Silk Warm Alabaster
      root.style.setProperty('--color-modern-blue', '#CDA26B'); // Burnished Champagne Gold
      root.style.setProperty('--color-soft-purple', '#967850'); // Deep Bronze
    } else if (archetype === 'brutalist') {
      root.style.setProperty('--font-heading', 'var(--font-space-grotesk)');
      root.style.setProperty('--font-sans', 'var(--font-mono)');
      root.style.setProperty('--color-navy', '#050505'); // Extreme Contrast Ink
      root.style.setProperty('--color-soft-white', '#FAFAFA'); // Pure raw paper white
      root.style.setProperty('--color-modern-blue', '#FAEA19'); // Shocking Cyber Lemon
      root.style.setProperty('--color-soft-purple', '#0FF095'); // Toxic Poison Mint Green
    } else if (archetype === 'cosmic') {
      root.style.setProperty('--font-heading', 'var(--font-space-grotesk)');
      root.style.setProperty('--font-sans', 'var(--font-inter)');
      root.style.setProperty('--color-navy', '#050A12');
      root.style.setProperty('--color-soft-white', '#F4EEE2');
      root.style.setProperty('--color-modern-blue', '#2C67A0');
      root.style.setProperty('--color-soft-purple', '#D5AE62');
    }
  }, [archetype]);

  return (
    <DesignSystemContext.Provider value={{ 
      archetype, 
      setArchetype, 
      showGridGuides, 
      setShowGridGuides,
      soundEnabled,
      setSoundEnabled,
      playHoverSound,
      playClickSound
    }}>
      {children}
      
      {/* Dynamic Cursor Trail following mouse with gorgeous custom archetypal states */}
      <div 
        className="fixed inset-0 pointer-events-none z-50 overflow-hidden hidden md:block"
        style={{ mixBlendMode: archetype === 'brutalist' ? 'normal' : 'difference' }}
      >
        {/* Core trailing bubble or vector */}
        <div 
          className="absolute rounded-full transition-transform duration-200 ease-out"
          style={{
            transform: `translate3d(${trailPos.x}px, ${trailPos.y}px, 0) translate(-50%, -50%) scale(${isHovered ? 1.5 : 1})`,
            width: archetype === 'editorial' ? '44px' : archetype === 'swiss' ? '20px' : archetype === 'cosmic' ? '30px' : '16px',
            height: archetype === 'editorial' ? '44px' : archetype === 'swiss' ? '20px' : archetype === 'cosmic' ? '30px' : '16px',
            backgroundColor: archetype === 'editorial' ? 'rgba(205, 162, 107, 0.25)' : archetype === 'swiss' ? 'transparent' : archetype === 'cosmic' ? 'rgba(255, 90, 31, 0.3)' : 'transparent',
            border: archetype === 'swiss' ? '1.5px solid var(--color-modern-blue)' : archetype === 'brutalist' ? '2px solid var(--color-modern-blue)' : 'none',
            borderRadius: archetype === 'brutalist' ? '0px' : '50%',
            filter: archetype === 'editorial' || archetype === 'cosmic' ? 'blur(8px)' : 'none',
            boxShadow: archetype === 'cosmic' ? '0 0 20px var(--color-modern-blue)' : 'none'
          }}
        />

        {/* Outer pointer dot */}
        <div 
          className="absolute w-2 h-2 bg-white rounded-full transition-transform duration-100"
          style={{
            transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0) translate(-50%, -50%) scale(${isMouseDown ? 0.7 : 1})`,
            borderRadius: archetype === 'brutalist' ? '0px' : '50%',
            backgroundColor: archetype === 'brutalist' ? 'var(--color-modern-blue)' : '#FFFFFF'
          }}
        />

        {/* Vector coordinates overlay following cursor if grid is active */}
        {showGridGuides && (
          <div 
            className="absolute font-mono text-[8px] text-modern-blue/60 pointer-events-none ml-4 mt-4 select-none whitespace-nowrap"
            style={{ transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)` }}
          >
            X: {Math.round(mousePos.x)}px | Y: {Math.round(mousePos.y)}px
          </div>
        )}
      </div>

      {/* Swiss Grid Guidelines overlay */}
      {showGridGuides && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {/* Vertical Guides */}
          <div className="max-w-[1440px] xl:max-w-[1680px] 2xl:max-w-[1920px] 3xl:max-w-[2400px] mx-auto h-full px-4 md:px-8 grid grid-cols-4 md:grid-cols-12 gap-6 opacity-25">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-full border-x border-dashed border-modern-blue/40 relative">
                <span className="absolute top-2 left-1 font-mono text-[9px] text-modern-blue tracking-tighter">COL {i + 1}</span>
              </div>
            ))}
          </div>

          {/* Spacing / Coordinate Overlay */}
          <div className="absolute top-4 left-4 font-mono text-[10px] text-modern-blue bg-navy/90 border border-modern-blue/30 px-3 py-1.5 rounded-md shadow-lg flex items-center gap-3 backdrop-blur-md">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-modern-blue animate-pulse"></span>
            <span>GRID: ACTIVE (12 COLUMNS)</span>
            <span>|</span>
            <span>ARCH: {archetype.toUpperCase()}</span>
          </div>

          {/* Decorative Blueprint Corner coordinates */}
          <div className="absolute bottom-4 right-4 font-mono text-[10px] text-modern-blue/60 flex flex-col items-end">
            <span>W: FLUID MONITORS (3000PX MAX)</span>
            <span>H: 100% RESPONSIVE</span>
            <span>COORD: 48.8566° N, 2.3522° E</span>
          </div>
        </div>
      )}
    </DesignSystemContext.Provider>
  );
}

export function useDesignSystem() {
  const context = useContext(DesignSystemContext);
  if (!context) {
    throw new Error('useDesignSystem must be used within a DesignSystemProvider');
  }
  return context;
}
