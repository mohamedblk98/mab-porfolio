'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { Compass, Mail, MapPin, Phone, Send } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '@/components/LanguageContext';

const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100, damping: 20 } },
};

const STAGGER = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function Contact() {
  const { t, language } = useLanguage();

  return (
    <div className="pt-20">
      <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-modern-blue/10 border border-modern-blue/20 text-xs font-mono text-modern-blue"
        >
          <Compass size={12} className="animate-spin-slow" />
          <span>{language === 'ar' ? 'بدء المناقشات والمشاورات' : language === 'en' ? 'INITIALIZING CONVERSATIONS' : 'INITIALISATION DES CONVERSATIONS'}</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight"
        >
          {language === 'ar' ? (
            <>لنصنع معاً<br />رائعة <span className="text-gradient">تصميمية.</span></>
          ) : language === 'en' ? (
            <>Let&apos;s create a<br />visual <span className="text-gradient">masterpiece.</span></>
          ) : (
            <>Créons ensemble<br />un <span className="text-gradient">chef-d&apos;œuvre.</span></>
          )}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-neutral-gray text-lg md:text-xl font-sans"
        >
          {t('contact.desc')}
        </motion.p>
      </div>

      <motion.div 
        variants={STAGGER} initial="hidden" animate="show"
        className="grid lg:grid-cols-3 gap-12"
      >
        {/* Contact Info */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div variants={FADE_UP} className="glass-card w-full min-w-0 overflow-hidden p-6 md:p-8 flex items-start gap-4 border border-modern-blue/20">
            <div className="shrink-0 p-3 bg-modern-blue/10 rounded-xl text-modern-blue">
              <Mail size={24} />
            </div>
            <div className="min-w-0 pt-1">
              <h3 className="text-white font-bold mb-1">{language === 'ar' ? 'عنوان البريد الإلكتروني' : language === 'en' ? 'Email Address' : 'Adresse mail'}</h3>
              <p className="text-neutral-gray text-xs sm:text-sm font-mono break-all leading-relaxed">mohamedaminebelkacemi98@gmail.com</p>
            </div>
          </motion.div>

          <motion.div variants={FADE_UP} className="glass-card p-8 flex items-start gap-4">
            <div className="p-3 bg-soft-purple/10 rounded-xl text-soft-purple">
              <Phone size={24} />
            </div>
            <div>
              <h3 className="text-white font-bold mb-1">{language === 'ar' ? 'رقم الهاتف' : language === 'en' ? 'Phone Number' : 'Numéro de téléphone'}</h3>
              <a
                href="https://wa.me/213794782086"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contacter MAB sur WhatsApp"
                className="inline-flex items-center gap-2 text-neutral-gray text-sm font-mono hover:text-[#25D366] transition-colors"
              >
                +213 794 782 086
                <FaWhatsapp size={17} className="text-[#25D366]" aria-hidden="true" />
              </a>
            </div>
          </motion.div>

          <motion.div variants={FADE_UP} className="glass-card p-8 flex items-start gap-4">
            <div className="p-3 bg-white/10 rounded-xl text-white">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="text-white font-bold mb-1">{language === 'ar' ? 'العنوان' : language === 'en' ? 'Address' : 'Adresse'}</h3>
              <p className="text-neutral-gray text-sm">Saoula, Alger, Algeria</p>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={FADE_UP} className="pt-6">
            <h3 className="text-white font-bold mb-4 uppercase text-xs tracking-wider font-mono">[{t('contact.networks')}]</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { name: 'Behance', href: 'https://www.behance.net/thesdesigner' },
                { name: 'Instagram', href: 'https://www.instagram.com/mab._dz/' },
                { name: 'Facebook', href: 'https://www.facebook.com/' }
              ].map((social) => (
                <a 
                  key={social.name} 
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-neutral-gray hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Contact Form */}
        <motion.div variants={FADE_UP} className="lg:col-span-2 glass-card p-8 md:p-12">
          <form className="space-y-6" action="https://formtorch.com/f/mphl3saq2x" method="POST">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-gray font-mono">{t('contact.label_name')}</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  maxLength={120}
                  autoComplete="name"
                  placeholder={language === 'ar' ? 'محمد أمين' : 'Mohamed Belkacemi'}
                  className="w-full bg-navy/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-modern-blue transition-colors font-sans"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-gray font-mono">{t('contact.label_email')}</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                  placeholder="contact@entreprise.com"
                  className="w-full bg-navy/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-modern-blue transition-colors font-sans"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-gray font-mono">{language === 'ar' ? 'الهاتف (اختياري)' : language === 'en' ? 'Phone (Optional)' : 'Téléphone (Optionnel)'}</label>
                <input 
                  type="tel" 
                  name="phone"
                  maxLength={30}
                  autoComplete="tel"
                  placeholder="+213 794 782 086"
                  className="w-full bg-navy/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-modern-blue transition-colors font-mono"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-gray font-mono">{t('contact.label_subject')}</label>
                <div className="relative">
                  <select name="subject" className="w-full bg-navy/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-modern-blue transition-colors appearance-none font-sans cursor-pointer">
                    <option value="branding">{t('contact.opt_print')}</option>
                    <option value="uiux">{t('contact.opt_posters')}</option>
                    <option value="packaging">{t('contact.opt_pack')}</option>
                    <option value="other">{t('contact.opt_other')}</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-gray">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-gray font-mono">{language === 'ar' ? 'مواصفات وتفاصيل المشروع المطلوب' : language === 'en' ? 'Project Brief & Details' : 'Cahier des charges & Détails du Projet'}</label>
              <textarea 
                name="message"
                required
                rows={5}
                maxLength={5000}
                placeholder={language === 'ar' ? 'يرجى كتابة أهداف علامتك التجارية ورؤيتك وتفاصيل المشروع...' : language === 'en' ? 'Please describe your brand objectives, visual vision, timeline...' : 'Exposez vos objectifs de marque, vos contraintes temporelles et budgétaires...'}
                className="w-full bg-navy/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-modern-blue transition-colors resize-none font-sans"
              ></textarea>
            </div>

            <button type="submit" className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-modern-blue to-soft-purple text-white font-bold hover:opacity-90 transition-opacity cursor-pointer shadow-lg shadow-modern-blue/10">
              {language === 'ar' ? 'إرسال تفاصيل المشروع' : language === 'en' ? 'Submit Project Details' : 'Soumettre le Projet'} <Send size={18} />
            </button>
          </form>
        </motion.div>
      </motion.div>

      {/* Map Embed */}
      <motion.div 
        initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
        variants={FADE_UP}
        className="mt-20 h-[400px] w-full rounded-[2.5rem] overflow-hidden glass-card p-2 relative"
      >
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10">
          <div className="glass-card px-6 py-3.5 flex items-center gap-2 border border-white/10 bg-navy/90 rounded-full shadow-lg">
             <MapPin className="text-modern-blue animate-bounce" size={20} />
             <span className="text-white font-bold text-sm tracking-tight">{language === 'ar' ? 'استوديو الإبداع والتصميم' : language === 'en' ? 'Creative Workshop' : 'Atelier de Création'}</span>
          </div>
        </div>
        <div className="relative w-full h-full rounded-[1.8rem] overflow-hidden contrast-125 opacity-80 mix-blend-luminosity hover:mix-blend-normal hover:opacity-100 transition-all duration-500">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51187.5255465691!2d3.0135891461247076!3d36.69255653556272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128faf7d1b32d5bd%3A0xc6c4293f7da204ce!2sSaoula%2C%20Algeria!5e0!3m2!1sen!2sus!4v1716155909249!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full object-cover"
          ></iframe>
        </div>
      </motion.div>
    </div>
  );
}
