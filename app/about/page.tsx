'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { 
  Award, 
  Box,
  BookOpen, 
  CheckCircle2, 
  Compass, 
  Globe2,
  Layers, 
  Monitor, 
  Palette, 
  PenTool, 
  Printer, 
  Sparkles 
} from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100, damping: 20 } },
};

const STAGGER = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function About() {
  const { t } = useLanguage();

  const services = [
    { title: t("service.branding.title"), icon: Palette, desc: t("service.branding.desc") },
    { title: t("service.logo.title"), icon: Sparkles, desc: t("service.logo.desc") },
    { title: t("service.packaging.title"), icon: Layers, desc: t("service.packaging.desc") },
    { title: t("service.posters.title"), icon: PenTool, desc: t("service.posters.desc") },
    { title: t("service.brochures.title"), icon: BookOpen, desc: t("service.brochures.desc") },
    { title: t("service.cards.title"), icon: CheckCircle2, desc: t("service.cards.desc") },
    { title: t("service.ads.title"), icon: Monitor, desc: t("service.ads.desc") },
    { title: t("service.social.title"), icon: Sparkles, desc: t("service.social.desc") },
    { title: t("service.print.title"), icon: Printer, desc: t("service.print.desc") },
    { title: t("service.mockups.title"), icon: Layers, desc: t("service.mockups.desc") },
    { title: t("service.web.title"), icon: Globe2, desc: t("service.web.desc") },
    { title: t("service.blender.title"), icon: Box, desc: t("service.blender.desc") },
  ];

  const formations = [
    {
      title: t("edu.title2"),
      institution: t("edu.inst2"),
      period: "2021 – 2022",
      desc: t("edu.desc2")
    },
    {
      title: t("edu.title3"),
      institution: t("edu.inst3"),
      period: "2025 – 2026",
      desc: t("edu.desc3")
    }
  ];

  return (
    <div className="pt-20 space-y-32">
      {/* Hero / Biography */}
      <motion.section 
        variants={STAGGER} initial="hidden" animate="show"
        className="grid lg:grid-cols-2 gap-16 items-center"
      >
        <div className="space-y-8">
          <motion.div 
            variants={FADE_UP}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-soft-purple/10 border border-soft-purple/20 text-xs font-mono text-soft-purple"
          >
            <Compass size={12} className="animate-spin-slow" />
            <span>{t('about.badge')}</span>
          </motion.div>
          
          <motion.h1 variants={FADE_UP} className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight leading-tight">
            {t('about.title_p1')} <span className="text-gradient">{t('about.title_gradient')}</span> {t('about.title_p2')}
          </motion.h1>
          
          <div className="space-y-6 text-neutral-gray leading-relaxed font-sans text-base">
            <motion.p variants={FADE_UP} className="text-white/90 font-medium text-lg">
              {t('about.desc1')}
            </motion.p>
            
            <motion.p variants={FADE_UP}>
              {t('about.desc2')}
            </motion.p>

            <motion.p variants={FADE_UP}>
              {t('about.desc3')}
            </motion.p>

            <motion.p variants={FADE_UP} className="text-white/80">
              {t('about.desc4')}
            </motion.p>
          </div>
        </div>
        
        <motion.div variants={FADE_UP} className="relative h-[650px] rounded-[2.5rem] overflow-hidden glass-card p-4 hover:rotate-1 transition-all duration-700">
          <div className="absolute top-6 left-6 font-mono text-[9px] text-modern-blue/40 z-20">01 / BRAND_IDENTITY</div>
          <div className="relative w-full h-full rounded-[1.8rem] overflow-hidden bg-navy">
            <Image
              src="/moi.png"
              alt="Portrait ou illustration artistique"
              fill
              className="object-cover transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Philosophy Section */}
      <motion.section 
        initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
        variants={FADE_UP}
        className="glass-card p-8 md:p-16 max-w-5xl mx-auto text-center space-y-6 relative overflow-hidden"
      >
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-modern-blue/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-soft-purple/10 rounded-full blur-3xl pointer-events-none" />
        
        <span className="text-xs font-mono text-soft-purple tracking-widest uppercase">{t('about.phil_title')}</span>
        <blockquote className="text-2xl md:text-3xl font-heading font-medium text-white max-w-4xl mx-auto leading-relaxed">
          {t('about.phil_quote')}
        </blockquote>
      </motion.section>

      {/* Services / What I do */}
      <motion.section 
        initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
        variants={STAGGER}
        className="space-y-12"
      >
        <div className="text-center space-y-4">
          <span className="text-xs font-mono text-modern-blue tracking-widest uppercase">{t('about.skills_badge')}</span>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-white">{t('about.skills_title')}</h2>
          <p className="text-neutral-gray max-w-xl mx-auto text-sm md:text-base">{t('about.skills_desc')}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              variants={FADE_UP}
              className="glass-card p-6 flex flex-col justify-between hover:bg-white/10 transition-colors duration-300 group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-modern-blue mb-4 group-hover:scale-110 transition-transform duration-300">
                  <service.icon size={20} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                <p className="text-xs text-neutral-gray leading-relaxed">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Formations */}
      <motion.section 
        initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
        variants={STAGGER}
        className="max-w-4xl mx-auto space-y-12"
      >
        <div className="text-center space-y-4">
          <span className="text-xs font-mono text-soft-purple tracking-widest uppercase">{t('edu.badge')}</span>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-white flex items-center justify-center gap-3">
            <Award className="text-soft-purple" /> {t('edu.title')}
          </h2>
        </div>

        <div className="space-y-12 border-l border-white/10 pl-8 ml-4 md:ml-12 relative">
          {formations.map((formation, idx) => (
            <motion.div key={idx} variants={FADE_UP} className="relative group">
              <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-navy border-4 border-soft-purple group-hover:scale-125 transition-transform duration-300" />
              <span className="text-xs text-soft-purple font-mono font-bold mb-1.5 block">{formation.period}</span>
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-soft-purple transition-colors duration-300">
                {formation.title}
              </h3>
              <p className="text-neutral-gray text-xs font-semibold mb-3">{formation.institution}</p>
              <p className="text-sm text-neutral-gray/80 leading-relaxed font-sans">{formation.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
