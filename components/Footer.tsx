'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/10 bg-navy mt-24">
      <div className="max-w-[1440px] xl:max-w-[1600px] 2xl:max-w-[1800px] 3xl:max-w-[2200px] mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-soft-white max-w-md leading-tight">
              {t('footer.title')}
            </h2>
            <p className="text-neutral-gray max-w-sm text-lg leading-relaxed font-sans">
              {t('footer.desc')}
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 mt-4 px-8 py-4 bg-gradient-to-r from-modern-blue to-soft-purple text-white rounded-full font-bold hover:opacity-90 transition-opacity cursor-pointer text-sm shadow-lg shadow-modern-blue/10"
            >
              {t('footer.cta')} <ArrowUpRight size={20} />
            </Link>
          </div>
          
          <div>
            <ul className="space-y-4 text-sm font-semibold">
              {[
                { label: t('nav.home'), path: '/' },
                { label: t('nav.portfolio'), path: '/portfolio' },
                { label: t('nav.about'), path: '/about' },
                { label: t('nav.contact'), path: '/contact' }
              ].map((item) => (
                <li key={item.path}>
                  <Link 
                    href={item.path}
                    className="text-neutral-gray hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ul className="space-y-4 text-sm font-semibold">
              {[
                { name: 'Behance', href: 'https://www.behance.net/thesdesigner' },
                { name: 'Instagram', href: 'https://www.instagram.com/mab._dz/' },
                { name: 'Facebook', href: 'https://www.facebook.com/' }
              ].map((social) => (
                <li key={social.name}>
                  <a 
                    href={social.href}
                    target={social.href !== '#' ? '_blank' : undefined}
                    rel={social.href !== '#' ? 'noopener noreferrer' : undefined}
                    className="group flex items-center gap-2 text-neutral-gray hover:text-white transition-colors"
                  >
                    {social.name}
                    <ArrowUpRight size={14} className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-modern-blue" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs text-neutral-gray font-mono">
          <div className="flex items-center gap-4">
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240.94 155.91" className="h-6 w-auto">
              <path className="fill-white" d="M36.74,76.17l17.57-35.37c.78-1.57,2.38-2.56,4.13-2.56h14.39c1.61,0,3.15.84,3.89,2.28,0,.01.01.03.02.04.61,1.23.56,2.36.52,2.84-7.14,15.31-14.28,30.62-21.42,45.94-.68,4.08,2.01,7.42,4.87,7.65,1.98.16,4.05-1.18,5.23-3.29,8.35-17.61,16.7-35.22,25.05-52.84.76-1.6,2.37-2.62,4.14-2.62h21.88c.08.48.67,3.63,3.48,5.16,1.15.63,2.26.76,2.97.77.76-.13,1.78-.41,2.84-1.03,2.61-1.53,3.58-4.05,3.87-4.9h24.77l17.81,37.68-18.58,40.52h-18.06c-.36-.19-1.96-1.11-2.58-3.1-.44-1.41-.15-2.62,0-3.1,6.47-14.1,12.95-28.19,19.42-42.29.36-.85.83-2.37.48-4.16-.47-2.42-2.3-5.11-4.58-5.47,0,0-1.33-.13-2.63.45-4.63,2.07-25.2,48.13-29.47,57.66h-19.1c-1.2-1.84-1.59-2.43-2.79-4.26,6.63-15.23,13.26-30.47,19.88-45.7.7-1.6.89-3.41.36-5.06-.44-1.36-1.23-2.33-2.22-2.76-2.19-.94-6.23.84-8.13,6.18-8.04,17.2-16.09,34.41-24.13,51.61h-24.52l-19.35-40.26Z" />
              <path className="fill-white" d="M186.21,96.26c.31-.54,3.15-5.59.9-11.01-1.89-4.56-6.57-7.5-11.74-7.29l-2.64,7.02c2.59-1.24,5.49-.77,7.15,1.06,1.47,1.62,1.44,3.71,1.42,4.25,0,.29,0,1.52-.9,2.52-1.31,1.46-3.27,1.09-3.38,1.06h-9.13l-9.42,21.9,21.16.66c4.91-.12,9.17-3.5,10.45-8.23,1.18-4.34-.35-9.08-3.87-11.94ZM174.79,112.6c-2.55,0-4.61-2.12-4.61-4.74s2.07-4.74,4.61-4.74,4.61,2.12,4.61,4.74-2.07,4.74-4.61,4.74Z" />
            </svg>
            <p>© {new Date().getFullYear()} {t('footer.rights')}</p>
          </div>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">{t('footer.privacy')}</Link>
            <Link href="#" className="hover:text-white transition-colors">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
