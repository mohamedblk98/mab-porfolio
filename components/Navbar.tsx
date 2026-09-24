'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

const navLinks = [
  { href: '/', key: 'nav.home' },
  { href: '/portfolio', key: 'nav.portfolio' },
  { href: '/about', key: 'nav.about' },
  { href: '/contact', key: 'nav.contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t, isRTL } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled ? 'bg-navy/90 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-[1440px] xl:max-w-[1600px] 2xl:max-w-[1800px] 3xl:max-w-[2200px] mx-auto px-4 md:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -260 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
              y: [0, -8, 0],
            }}
            transition={{
              opacity: { duration: 0.5 },
              scale: { duration: 0.8, ease: 'easeOut' },
              rotate: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
              y: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.4 },
            }}
            className="drop-shadow-[0_0_25px_rgba(59,130,246,0.35)]"
          >
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240.94 155.91" className="h-16 md:h-24 w-auto">
              <path className="fill-white" d="M36.74,76.17l17.57-35.37c.78-1.57,2.38-2.56,4.13-2.56h14.39c1.61,0,3.15.84,3.89,2.28,0,.01.01.03.02.04.61,1.23.56,2.36.52,2.84-7.14,15.31-14.28,30.62-21.42,45.94-.68,4.08,2.01,7.42,4.87,7.65,1.98.16,4.05-1.18,5.23-3.29,8.35-17.61,16.7-35.22,25.05-52.84.76-1.6,2.37-2.62,4.14-2.62h21.88c.08.48.67,3.63,3.48,5.16,1.15.63,2.26.76,2.97.77.76-.13,1.78-.41,2.84-1.03,2.61-1.53,3.58-4.05,3.87-4.9h24.77l17.81,37.68-18.58,40.52h-18.06c-.36-.19-1.96-1.11-2.58-3.1-.44-1.41-.15-2.62,0-3.1,6.47-14.1,12.95-28.19,19.42-42.29.36-.85.83-2.37.48-4.16-.47-2.42-2.3-5.11-4.58-5.47,0,0-1.33-.13-2.63.45-4.63,2.07-25.2,48.13-29.47,57.66h-19.1c-1.2-1.84-1.59-2.43-2.79-4.26,6.63-15.23,13.26-30.47,19.88-45.7.7-1.6.89-3.41.36-5.06-.44-1.36-1.23-2.33-2.22-2.76-2.19-.94-6.23.84-8.13,6.18-8.04,17.2-16.09,34.41-24.13,51.61h-24.52l-19.35-40.26Z" />
              <path className="fill-white" d="M186.21,96.26c.31-.54,3.15-5.59.9-11.01-1.89-4.56-6.57-7.5-11.74-7.29l-2.64,7.02c2.59-1.24,5.49-.77,7.15,1.06,1.47,1.62,1.44,3.71,1.42,4.25,0,.29,0,1.52-.9,2.52-1.31,1.46-3.27,1.09-3.38,1.06h-9.13l-9.42,21.9,21.16.66c4.91-.12,9.17-3.5,10.45-8.23,1.18-4.34-.35-9.08-3.87-11.94ZM174.79,112.6c-2.55,0-4.61-2.12-4.61-4.74s2.07-4.74,4.61-4.74,4.61,2.12,4.61,4.74-2.07,4.74-4.61,4.74Z" />
            </svg>
          </motion.div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-sm font-medium transition-colors hover:text-white ${
                pathname === link.href ? 'text-white' : 'text-neutral-gray'
              }`}
            >
              {t(link.key)}
              {pathname === link.href && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-modern-blue to-soft-purple rounded-full"
                />
              )}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-4 px-6 py-2.5 rounded-lg bg-modern-blue text-navy hover:bg-white transition-colors text-sm font-semibold cursor-pointer"
          >
            {t('nav.contact_me')}
          </Link>

          {/* Desktop Language Selector */}
          <div className={`flex items-center gap-2 border-white/10 pl-6 ml-2 ${isRTL ? 'border-r pr-6 pl-0 mr-2 ml-0' : 'border-l'}`}>
            <Globe size={14} className="text-neutral-gray/60" />
            {(['fr', 'en', 'ar'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-2 py-1 text-xs font-mono rounded transition-colors uppercase cursor-pointer ${
                  language === lang 
                    ? 'text-white bg-white/10 font-bold border border-white/15' 
                    : 'text-neutral-gray hover:text-white hover:bg-white/5'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-soft-white p-2 -mr-2 cursor-pointer z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-navy/95 backdrop-blur-xl border-b border-white/10 p-4 flex flex-col gap-4 md:hidden shadow-2xl"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`p-4 rounded-xl text-lg font-bold transition-colors ${
                pathname === link.href ? 'bg-white/10 text-white' : 'text-neutral-gray hover:bg-white/5'
              }`}
            >
              {t(link.key)}
            </Link>
          ))}
          <div className="flex justify-around items-center p-4 border-t border-white/5 mt-2">
            {(['fr', 'en', 'ar'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setLanguage(lang);
                  setMobileMenuOpen(false);
                }}
                className={`px-4 py-2 text-sm font-mono rounded-xl uppercase transition-colors cursor-pointer ${
                  language === lang 
                    ? 'text-white bg-white/10 font-bold border border-white/15' 
                    : 'text-neutral-gray hover:bg-white/5'
                }`}
              >
                {lang === 'fr' ? 'FR' : lang === 'en' ? 'EN' : 'AR'}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
}
