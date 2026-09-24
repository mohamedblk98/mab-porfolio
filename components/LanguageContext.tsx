'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'fr' | 'en' | 'ar';

export type TranslationKey = string;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, defaultValue?: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Core translation dictionary
const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Navbar / Common
    "nav.home": "Accueil",
    "nav.portfolio": "Portfolio",
    "nav.about": "À Propos",
    "nav.contact": "Contact",
    "nav.contact_me": "Contactez-moi",
    "nav.lang_select": "Langue",

    // Home - Hero
    "hero.badge": "Direction Artistique & Design Graphique d'Élite",
    "hero.title_welcome": "Bienvenue sur",
    "hero.title_portfolio": "mon portfolio.",
    "hero.desc_p1": "Graphiste créatif spécialisé en identité visuelle, branding, packaging, affiches et supports imprimés.",
    "hero.desc_p2": "Je conçois des designs modernes, clairs et percutants qui valorisent chaque marque.",
    "hero.desc_p3": "Chaque projet allie créativité, stratégie et souci du détail.",
    "hero.cta_explore": "Explorer mes Œuvres",
    "hero.cta_hire": "Engager un Projet",
    "hero.grid_title": "Grille de Construction Structurale",
    "hero.grid_desc": "Affiche l'ossature mathématique de la page",
    "hero.grid_active": "Grille Active",
    "hero.grid_inactive": "Activer Plan",

    // Home - Marquee
    "marquee.branding": "Identités de Marque d'Élite",
    "marquee.minimalism": "Minimalisme Absolu",
    "marquee.typography": "Typographie Suisse de Haute Précision",
    "marquee.interaction": "Interactions de Prestige",
    "marquee.purism": "Épuration Visuelle",

    // Home - Philosophy
    "phil.badge": "[ Philosophie Studio ]",
    "phil.title": "Guidé par la passion, sculpté par la rigueur.",
    "phil.desc": "Depuis plus de 8 ans, j'accompagne les marques audacieuses dans la définition de leur empreinte esthétique. Mon approche refuse l'ornement superflu pour se concentrer sur l'impact structurel et typographique.",
    "phil.service1_title": "Identités de Prestige",
    "phil.service1_desc": "Création de chartes graphiques rigoureuses et de systèmes visuels mémorables.",
    "phil.service2_title": "Architectures UI/UX",
    "phil.service2_desc": "Interfaces minimalistes et fluides conçues pour capter et fidéliser l'attention.",

    // Home - Toolkit
    "tool.badge": "[ Maîtrise Applicative ]",
    "tool.title": "Arsenal Technologique",
    "tool.desc": "Mes outils quotidiens pour transformer des abstractions conceptuelles en chefs-d'œuvre visuels.",

    // Home - Works
    "works.badge": "[ Sélection Exclusive ]",
    "works.title": "Œuvres Majeures",
    "works.desc": "Aperçu de mes dernières créations alliant pertinence d'usage et rigueur artistique.",
    "works.cta_all": "Voir la Galerie Complète",
    "works.case_study": "Analyse du Cas",

    // Home - Testimonials
    "test.badge": "[ Retours d'Expérience ]",
    "test.title": "La Voix des Partenaires",
    "test.role_client": "Cliente",
    "test.quote1": "Travail professionnel, sérieux, Bonne continuation.",
    "test.quote2": "Merci pour votre professionnalisme ! Toujours satisfaite de votre service.",
    "test.quote3": "Travail professionnel, sérieux, Bonne continuation.",
    "test.quote4": "Une personne très sérieuse, très honnête, il m'a fait cette conception et j'étais très satisfaite. Un vrai professionnel à l'écoute.",

    // Home - Stats
    "stat.expertise": "Années d'Expertise",
    "stat.projects": "Projets Concluants",
    "stat.satisfied": "Partenaires Comblés",
    "stat.awards": "Awwwards & Distinctions",

    // About Page
    "about.badge": "À PROPOS",
    "about.title_p1": "Je transforme les",
    "about.title_gradient": "idées",
    "about.title_p2": "en identités visuelles.",
    "about.desc1": "Graphiste spécialisé en branding, identité visuelle, packaging et communication visuelle, je conçois des créations qui allient esthétique, stratégie et efficacité. Mon objectif est de créer des designs qui renforcent l'image des marques et captent immédiatement l'attention.",
    "about.desc2": "Au fil de mes expériences en agence, en imprimerie et en freelance, j'ai développé une expertise dans la conception de logos, packagings, affiches, brochures, roll-ups, cartes de visite, contenus pour les réseaux sociaux et supports publicitaires. Chaque projet est pensé pour répondre aux besoins du client tout en respectant les exigences de l'impression et de la communication moderne.",
    "about.desc3": "J'accorde une importance particulière à la cohérence visuelle, au choix des couleurs, à la typographie et aux détails qui font la différence. Que ce soit pour une nouvelle marque ou pour la refonte d'une identité existante, je recherche toujours l'équilibre entre créativité, lisibilité et impact.",
    "about.desc4": "Aujourd'hui, j'accompagne des entreprises, des startups et des entrepreneurs dans la création d'une image de marque forte à travers des solutions graphiques modernes, professionnelles et adaptées à tous les supports.",
    "about.phil_title": "Ma Philosophie",
    "about.phil_quote": "« Un bon design ne se contente pas d'être beau : il raconte une histoire, transmet un message et crée une connexion durable entre une marque et son public. »",
    "about.skills_badge": "COMPÉTENCES & EXPERTISE",
    "about.skills_title": "Ce que je réalise",
    "about.skills_desc": "Des solutions créatives de bout en bout pour propulser votre communication physique et digitale.",
    "portfolio.desc": "Je conçois des identités visuelles premium, des systèmes de marque et des mises en page qui font la différence.",
    "portfolio.status": "Auto-entrepreneur agréé",
    
    // About Services list
    "service.branding.title": "Identité visuelle & Branding",
    "service.branding.desc": "Logos uniques, chartes graphiques complètes et guidelines de marque cohérentes.",
    "service.logo.title": "Design de logos",
    "service.logo.desc": "Création de logotypes sur-mesure vectoriels mémorables et intemporels.",
    "service.packaging.title": "Packaging & Étiquettes",
    "service.packaging.desc": "Conception de packagings produits innovants et étiquetages accrocheurs.",
    "service.posters.title": "Affiches & Posters",
    "service.posters.desc": "Compositions éditoriales et artistiques pour l'affichage de vos événements.",
    "service.brochures.title": "Brochures & Catalogues",
    "service.brochures.desc": "Mise en page éditoriale soignée pour vos supports commerciaux multi-pages.",
    "service.cards.title": "Cartes de visite & Flyers",
    "service.cards.desc": "Papeterie professionnelle et supports de communication imprimés percutants.",
    "service.ads.title": "Supports publicitaires (PLV, Roll-ups)",
    "service.ads.desc": "Présentoirs publicitaires, roll-ups d'exposition et goodies d'entreprise.",
    "service.social.title": "Création de contenus sociaux",
    "service.social.desc": "Création visuelle moderne de templates et posts pour engager vos communautés.",
    "service.print.title": "Préparation des fichiers d'impression",
    "service.print.desc": "Gestion rigoureuse des profils de couleurs, fonds perdus et finitions techniques.",
    "service.mockups.title": "Mockups & Présentations",
    "service.mockups.desc": "Rendus 3D et mises en situation photoréalistes pour valoriser vos produits.",
    "service.web.title": "Création de sites web",
    "service.web.desc": "Conception de sites web modernes, clairs et adaptés à votre identité visuelle.",
    "service.blender.title": "3D & Blender",
    "service.blender.desc": "Modélisation, rendu et présentation 3D de produits et concepts avec Blender.",

    // About Education
    "edu.badge": "ACADÉMIQUE & APPRENTISSAGE",
    "edu.title": "Formations",
    "edu.title1": "Technicien en Infographie & Design Graphique",
    "edu.inst1": "INSiAG Alger",
    "edu.desc1": "Formation en identité visuelle, PAO, typographie, branding, packaging et préparation des fichiers pour l'impression.",
    "edu.title2": "Adobe Certified Training – Photoshop, Illustrator & InDesign",
    "edu.inst2": "GO MY CODE",
    "edu.desc2": "Maîtrise des logiciels Adobe pour les supports de Communication Visuelle.",
    "edu.title3": "Formation 3D",
    "edu.inst3": "BRAINER X",
    "edu.desc3": "Formation spécialisée en modélisation et rendu 3D appliquée au design graphique et de packaging.",

    // Portfolio Page
    "port.badge": "PORTFOLIO D'ÉLITE",
    "port.title": "Œuvres Choisies",
    "port.desc": "Une collection rigoureuse de créations visuelles alliant précision technique et pureté esthétique.",
    "port.cat_all": "Tous",
    "port.cat_print": "Supports Imprimés",
    "port.cat_pack": "Packaging",
    "port.cat_posters": "Affiches",

    // Portfolio Details Modal
    "port.details_year": "Année",
    "port.details_tools": "Outils",
    "port.details_palette": "Aperçu de la Palette",
    "port.details_typo": "Typographie",
    "port.details_process": "Processus Créatif",
    "port.details_quote": "Témoignage Client",
    "port.details_close": "Fermer",

    // Contact Page
    "contact.title": "Discutons de votre projet d'élite.",
    "contact.desc": "Remplissez le formulaire ci-dessous ou écrivez-moi directement par email. Réponse sous 24 heures garantie.",
    "contact.form_title": "Formulaire de Contact",
    "contact.label_name": "Votre Nom",
    "contact.label_email": "Votre Email",
    "contact.label_subject": "Axe Conceptuel / Sujet",
    "contact.opt_print": "Supports Imprimés",
    "contact.opt_posters": "Affiches",
    "contact.opt_pack": "Ligne de Packagings Éco-Luxe",
    "contact.opt_other": "Autre Projet d'Élite",
    "contact.label_message": "Votre Message (Décrivez votre vision)",
    "contact.placeholder_msg": "Bonjour Mohamed, j'aimerais concevoir...",
    "contact.btn_send": "Envoyer le Message",
    "contact.networks": "Réseaux Professionnels",
    "contact.success_msg": "Message envoyé avec succès ! Je reviens vers vous très vite.",

    // Footer
    "footer.rights": "Tous droits réservés.",
    "footer.subtitle": "Direction Artistique d'Élite & Design Minimaliste",
    "footer.title": "Créons quelque chose d'incroyable.",
    "footer.desc": "Disponible pour de nouvelles opportunités d'envergure. Collaborons pour bâtir des identités et des architectures numériques prestigieuses.",
    "footer.cta": "Me Contacter",
    "footer.sitemap": "[ Plan du Site ]",
    "footer.socials": "[ Réseaux ]",
    "footer.privacy": "Politique de Confidentialité",
    "footer.terms": "Conditions d'Utilisation"
  },
  en: {
    // Navbar / Common
    "nav.home": "Home",
    "nav.portfolio": "Portfolio",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.contact_me": "Contact Me",
    "nav.lang_select": "Language",

    // Home - Hero
    "hero.badge": "Elite Art Direction & Graphic Design",
    "hero.title_welcome": "Welcome to",
    "hero.title_portfolio": "my portfolio.",
    "hero.desc_p1": "Creative graphic designer specializing in visual identity, branding, packaging, posters, and printed media.",
    "hero.desc_p2": "I design modern, clear, and impactful layouts that elevate every brand.",
    "hero.desc_p3": "Each project combines creativity, strategy, and meticulous attention to detail.",
    "hero.cta_explore": "Explore My Works",
    "hero.cta_hire": "Hire Me for a Project",
    "hero.grid_title": "Structural Construction Grid",
    "hero.grid_desc": "Displays the mathematical structure of the page",
    "hero.grid_active": "Grid Active",
    "hero.grid_inactive": "Activate Grid",

    // Home - Marquee
    "marquee.branding": "Elite Brand Identities",
    "marquee.minimalism": "Absolute Minimalism",
    "marquee.typography": "High-Precision Swiss Typography",
    "marquee.interaction": "Prestige Interactions",
    "marquee.purism": "Visual Purism",

    // Home - Philosophy
    "phil.badge": "[ Studio Philosophy ]",
    "phil.title": "Guided by passion, sculpted by rigor.",
    "phil.desc": "For over 8 years, I have accompanied bold brands in defining their aesthetic footprint. My approach rejects superfluous ornament to focus on structural and typographic impact.",
    "phil.service1_title": "Prestige Identities",
    "phil.service1_desc": "Creation of rigorous brand identity books and memorable visual systems.",
    "phil.service2_title": "UI/UX Architectures",
    "phil.service2_desc": "Minimalist and fluid interfaces designed to capture and hold attention.",

    // Home - Toolkit
    "tool.badge": "[ Tool Mastery ]",
    "tool.title": "Technological Arsenal",
    "tool.desc": "My daily tools to transform conceptual abstractions into visual masterpieces.",

    // Home - Works
    "works.badge": "[ Exclusive Selection ]",
    "works.title": "Featured Works",
    "works.desc": "An overview of my latest creations combining functional relevance and artistic rigor.",
    "works.cta_all": "View Full Gallery",
    "works.case_study": "Case Study Analysis",

    // Home - Testimonials
    "test.badge": "[ Client Testimonials ]",
    "test.title": "The Partners' Voice",
    "test.role_client": "Client",
    "test.quote1": "Professional and serious work. Best of luck!",
    "test.quote2": "Thank you for your professionalism! Always satisfied with your service.",
    "test.quote3": "Professional and serious work. Best of luck!",
    "test.quote4": "A very serious and honest professional. He created this design for me and I was highly satisfied. A true professional who really listens.",

    // Home - Stats
    "stat.expertise": "Years of Expertise",
    "stat.projects": "Successful Projects",
    "stat.satisfied": "Satisfied Partners",
    "stat.awards": "Awards & Distinctions",

    // About Page
    "about.badge": "ABOUT ME",
    "about.title_p1": "I transform",
    "about.title_gradient": "ideas",
    "about.title_p2": "into visual identities.",
    "about.desc1": "As a graphic designer specializing in branding, visual identity, packaging, and visual communication, I create designs that combine aesthetics, strategy, and efficiency. My goal is to build strong layouts that elevate brands and immediately capture attention.",
    "about.desc2": "Throughout my experiences in agencies, print shops, and freelance, I have developed expertise in designing logos, packaging, posters, brochures, roll-ups, business cards, social media content, and advertising materials. Each project is thought out to meet the client's needs while respecting the demands of modern print and communication.",
    "about.desc3": "I pay special attention to visual coherence, color choices, typography, and details that make the difference. Whether it is for a new brand or the redesign of an existing identity, I always seek the balance between creativity, readability, and impact.",
    "about.desc4": "Today, I support businesses, startups, and entrepreneurs in building a strong brand image through modern, professional graphic solutions tailored to all media.",
    "about.phil_title": "My Philosophy",
    "about.phil_quote": "“A good design doesn't just look beautiful: it tells a story, conveys a message, and builds a lasting connection between a brand and its audience.”",
    "about.skills_badge": "SKILLS & EXPERTISE",
    "about.skills_title": "What I Create",
    "about.skills_desc": "End-to-end creative solutions to propel your physical and digital communication.",
    "portfolio.desc": "I design premium visual identities, brand systems, and layouts that create a lasting impression.",
    "portfolio.status": "Registered self-employed professional",
    
    // About Services list
    "service.branding.title": "Visual Identity & Branding",
    "service.branding.desc": "Unique logos, comprehensive brand identity books, and consistent brand guidelines.",
    "service.logo.title": "Logo Design",
    "service.logo.desc": "Creation of bespoke, memorable, and timeless vector logotypes.",
    "service.packaging.title": "Packaging & Product Labels",
    "service.packaging.desc": "Design of innovative product packaging and eye-catching labels.",
    "service.posters.title": "Posters & Signs",
    "service.posters.desc": "Editorial and artistic compositions for displaying your events.",
    "service.brochures.title": "Brochures & Catalogs",
    "service.brochures.desc": "Meticulous editorial layout for your multi-page marketing collateral.",
    "service.cards.title": "Business Cards & Flyers",
    "service.cards.desc": "Professional stationery and high-impact print communication materials.",
    "service.ads.title": "Advertising Materials (POS, Roll-ups)",
    "service.ads.desc": "Advertising stands, exhibition roll-ups, and corporate merchandise.",
    "service.social.title": "Social Media Content Creation",
    "service.social.desc": "Modern visual design of templates and posts to engage your communities.",
    "service.print.title": "Print File Preparation",
    "service.print.desc": "Rigorous management of color profiles, bleeds, and technical finishes.",
    "service.mockups.title": "Mockups & Product Showcases",
    "service.mockups.desc": "3D renders and photorealistic mockups to showcase your products.",
    "service.web.title": "Website Creation",
    "service.web.desc": "Design of modern, clear websites aligned with your visual identity.",
    "service.blender.title": "3D & Blender",
    "service.blender.desc": "3D modeling, rendering, and presentation of products and concepts with Blender.",

    // About Education
    "edu.badge": "ACADEMIC & EDUCATION",
    "edu.title": "Education",
    "edu.title1": "Graphic Design & Computer Graphics Technician",
    "edu.inst1": "INSiAG Algiers",
    "edu.desc1": "Training in visual identity, desktop publishing, typography, branding, packaging, and print-ready file preparation.",
    "edu.title2": "Adobe Certified Training – Photoshop, Illustrator & InDesign",
    "edu.inst2": "GO MY CODE",
    "edu.desc2": "Mastery of Adobe software for Visual Communication media.",
    "edu.title3": "3D Training",
    "edu.inst3": "BRAINER X",
    "edu.desc3": "Specialized training in 3D modeling and rendering applied to graphic and packaging design.",

    // Portfolio Page
    "port.badge": "ELITE PORTFOLIO",
    "port.title": "Selected Works",
    "port.desc": "A rigorous collection of visual creations combining technical precision and aesthetic purity.",
    "port.cat_all": "All",
    "port.cat_print": "Print Media",
    "port.cat_pack": "Packaging",
    "port.cat_posters": "Posters",

    // Portfolio Details Modal
    "port.details_year": "Year",
    "port.details_tools": "Tools",
    "port.details_palette": "Palette Preview",
    "port.details_typo": "Typography",
    "port.details_process": "Creative Process",
    "port.details_quote": "Client Testimony",
    "port.details_close": "Close",

    // Contact Page
    "contact.title": "Let's discuss your elite project.",
    "contact.desc": "Fill out the form below or write to me directly by email. Guaranteed response within 24 hours.",
    "contact.form_title": "Contact Form",
    "contact.label_name": "Your Name",
    "contact.label_email": "Your Email",
    "contact.label_subject": "Conceptual Axis / Subject",
    "contact.opt_print": "Print Media",
    "contact.opt_posters": "Posters",
    "contact.opt_pack": "Eco-Luxury Packaging Line",
    "contact.opt_other": "Other Elite Project",
    "contact.label_message": "Your Message (Describe your vision)",
    "contact.placeholder_msg": "Hello Mohamed, I would like to design...",
    "contact.btn_send": "Send Message",
    "contact.networks": "Professional Networks",
    "contact.success_msg": "Message sent successfully! I will get back to you very soon.",

    // Footer
    "footer.rights": "All rights reserved.",
    "footer.subtitle": "Elite Art Direction & Minimalist Design",
    "footer.title": "Let's create something incredible.",
    "footer.desc": "Available for high-impact opportunities. Let's collaborate to build prestigious identities and digital architectures.",
    "footer.cta": "Contact Me",
    "footer.sitemap": "[ Sitemap ]",
    "footer.socials": "[ Networks ]",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Use"
  },
  ar: {
    // Navbar / Common
    "nav.home": "الرئيسية",
    "nav.portfolio": "أعمالي",
    "nav.about": "من أنا",
    "nav.contact": "اتصل بي",
    "nav.contact_me": "تواصل معي",
    "nav.lang_select": "اللغة",

    // Home - Hero
    "hero.badge": "الإدارة الفنية والتصميم الجرافيكي المتميز",
    "hero.title_welcome": "مرحباً بكم في",
    "hero.title_portfolio": "معرض أعمالي.",
    "hero.desc_p1": "مصمم جرافيك مبدع متخصص في الهوية البصرية، العلامات التجارية، التعبئة والتغليف، الملصقات والمطبوعات الإعلانية.",
    "hero.desc_p2": "أصمم تصاميم حديثة، واضحة ومؤثرة تبرز القيمة الحقيقية لكل علامة تجارية.",
    "hero.desc_p3": "كل مشروع يجمع بين الإبداع البصري، التخطيط الاستراتيجي، والاهتمام البالغ بالتفاصيل.",
    "hero.cta_explore": "استكشف أعمالي",
    "hero.cta_hire": "ابدأ مشروعاً معي",
    "hero.grid_title": "شبكة البناء الهيكلية",
    "hero.grid_desc": "تعرض الهيكل الرياضي الهندسي المكون لصفحات الويب",
    "hero.grid_active": "الشبكة نشطة",
    "hero.grid_inactive": "تفعيل المخطط",

    // Home - Marquee
    "marquee.branding": "هويات تجارية متميزة",
    "marquee.minimalism": "تبسيط مطلق ونقاء بصري",
    "marquee.typography": "خطوط سويسرية عالية الدقة",
    "marquee.interaction": "تفاعلات وتجربة مستخدم راقية",
    "marquee.purism": "النقاء البصري الخالص",

    // Home - Philosophy
    "phil.badge": "[ فلسفة الاستوديو ]",
    "phil.title": "موجه بالشغف البصري، ومصقول بالدقة والصرامة.",
    "phil.desc": "لأكثر من 8 سنوات، رافقت العلامات التجارية الجريئة في تحديد هويتها وبصمتها الجمالية الاستثنائية. يرفض نهجي أي زينة زائدة للتركيز فقط على الأثر الهيكلي وقوة الخطوط البصرية.",
    "phil.service1_title": "هويات بصرية متميزة",
    "phil.service1_desc": "إنشاء أدلة بصرية متكاملة وأنظمة بصرية لا تُنسى تعزز حضور علامتك.",
    "phil.service2_title": "تصاميم واجهات المستخدم UI/UX",
    "phil.service2_desc": "واجهات مستخدم بسيطة، سلسلة وجذابة صُممت خصيصاً لجذب الانتباه والحفاظ عليه.",

    // Home - Toolkit
    "tool.badge": "[ إتقان الأدوات ]",
    "tool.title": "الترسانة التقنية والبرمجية",
    "tool.desc": "أدواتي ومهاراتي اليومية لتحويل الأفكار والخيالات النظرية إلى تحف فنية ملموسة.",

    // Home - Works
    "works.badge": "[ مجموعة حصرية مختارة ]",
    "works.title": "أعمال ومشاريع بارزة",
    "works.desc": "لمحة سريعة عن أحدث أعمالي التي تجمع بين الملاءمة والهدف العملي والصرامة الفنية العالية.",
    "works.cta_all": "مشاهدة المعرض كاملاً",
    "works.case_study": "تحليل ودراسة الحالة",

    // Home - Testimonials
    "test.badge": "[ آراء وانطباعات الشركاء ]",
    "test.title": "ماذا يقول شركاؤنا",
    "test.role_client": "عميلة",
    "test.quote1": "عمل احترافي وجاد، بالتوفيق والنجاح المستمر.",
    "test.quote2": "شكراً لك على احترافيتك! ممتنة دائماً لخدماتك الممتازة.",
    "test.quote3": "عمل احترافي وجاد، بالتوفيق والنجاح المستمر.",
    "test.quote4": "شخص جاد وأمين للغاية، لقد قام بهذا التصميم لي وكنت راضية جداً. محترف حقيقي يستمع باهتمام لمتطلبات العميل.",

    // Home - Stats
    "stat.expertise": "سنوات من الخبرة الفنية",
    "stat.projects": "المشاريع الناجحة المنجزة",
    "stat.satisfied": "نسبة رضا شركائنا",
    "stat.awards": "الجوائز والتقديرات الدولية",

    // About Page
    "about.badge": "من أنا",
    "about.title_p1": "أقوم بتحويل",
    "about.title_gradient": "الأفكار الخيالية",
    "about.title_p2": "إلى هويات بصرية حية.",
    "about.desc1": "بصفتي مصمماً جرافيكياً متخصصاً في بناء العلامات التجارية، الهوية البصرية، تصميم التعبئة والتغليف والتواصل البصري، فإنني أبتكر تصاميم تجمع بين الجمالية الجذابة، التخطيط الاستراتيجي، والفاعلية المطلقة. هدفي الأساسي هو صياغة أعمال تعزز صورة علامتك وتلفت الانتباه فوراً.",
    "about.desc2": "من خلال خبراتي السابقة المتنوعة في الوكالات الإعلانية، المطابع، والعمل الحر، قمت بتطوير مهارة عالية في تصميم الشعارات، العبوات، الملصقات، الكتيبات، الرول أب، بطاقات العمل، محتوى منصات التواصل، والمواد الإعلانية. يُخطط لكل مشروع بعناية ليلبي احتياجاتك مع مراعاة دقيقة لمتطلبات الطباعة والتواصل الحديث.",
    "about.desc3": "أهتم بشكل استثنائي بالتماسك والاتساق البصري، اختيار تناغم الألوان، الخطوط والتفاصيل الصغيرة التي تحدث الفارق الفعلي. سواء أكان العمل لعلامة تجارية جديدة بالكامل أو لإعادة صياغة هوية حالية، أسعى دائماً لتحقيق التوازن بين الإبداع الفني والوضوح التام.",
    "about.desc4": "اليوم، أقوم بدعم الشركات الناشئة، رواد الأعمال، والمؤسسات لبناء حضور وعلامة تجارية قوية وراسخة من خلال حلول جرافيكية حديثة واحترافية ملائمة لجميع الوسائط.",
    "about.phil_title": "فلسفتي المهنية",
    "about.phil_quote": "«التصميم الممتاز لا يكتفي بكونه جميلاً وجذاباً فحسب: بل يروي قصة عميقة، ينقل رسالة هادفة، ويبني صلة تواصل قوية ودائمة بين العلامة التجارية وجمهورها المستهدف.»",
    "about.skills_badge": "المهارات والخبرات والخدمات",
    "about.skills_title": "ما أبدعه لعملائي",
    "about.skills_desc": "حلول إبداعية وتصميمات متكاملة من البداية وحتى التسليم لدعم تواصلك الفعلي والرقمي.",
    "portfolio.desc": "أصمم هوية بصرية فاخرة، أنظمة علامات تجارية وتصاميم تجعل الفرق وتترك أثرًا دائمًا.",
    "portfolio.status": "مستقل معتمد / Auto-entrepreneur agréé",
    
    // About Services list
    "service.branding.title": "الهوية البصرية وبناء العلامة",
    "service.branding.desc": "شعارات فريدة ومبتكرة، كتب أدلة الهوية البصرية المتكاملة وإرشادات واضحة ومتسقة.",
    "service.logo.title": "تصميم وابتكار الشعارات",
    "service.logo.desc": "صياغة رموز لوجوتيب خطية مخصصة، مميزة، راسخة وخالدة لا تفقد قيمتها بالزمن.",
    "service.packaging.title": "التعبئة والتغليف وملصقات المنتجات",
    "service.packaging.desc": "تصميم وتطوير عبوات منتجات مبتكرة وصديقة للبيئة مع ملصقات جذابة وذكية.",
    "service.posters.title": "الملصقات والإعلانات والبوسترات",
    "service.posters.desc": "تكوينات بصرية وفنية فريدة للإعلانات والترويج لمناسباتكم وفعالياتكم المتنوعة.",
    "service.brochures.title": "الكتيبات، البروشورات والكتالوجات",
    "service.brochures.desc": "تنسيق وتحرير دقيق وتصميم صفحات متعددة للمطبوعات التسويقية والتجارية الخاصة بك.",
    "service.cards.title": "بطاقات العمل والمطبوعات الصغيرة",
    "service.cards.desc": "قرطاسية مكتبية احترافية ومواد ترويجية وتواصلية ذات تأثير فعال وقوي.",
    "service.ads.title": "وسائل الدعاية والمعارض (رول أب، منصات عرض)",
    "service.ads.desc": "تصميم منصات العرض، رول أب المعارض، والمنتجات الدعائية والهدايا الترويجية للشركات.",
    "service.social.title": "صناعة وتصميم محتوى منصات التواصل",
    "service.social.desc": "تصميمات وقوالب بصرية حديثة ومنشورات جذابة لزيادة التفاعل وبناء جمهورك.",
    "service.print.title": "تجهيز وتدقيق ملفات الطباعة الاحترافية",
    "service.print.desc": "إدارة دقيقة لملفات وأنظمة الألوان، حواف القطع الفنية، واللمسات الفنية والتقنية للمطابع.",
    "service.mockups.title": "نماذج العرض ثلاثية الأبعاد",
    "service.mockups.desc": "رندرة ثلاثية الأبعاد ونماذج واقعية وصور ثلاثية الأبعاد لعرض وإبراز قيمة منتجاتكم.",
    "service.web.title": "تصميم وإنشاء المواقع الإلكترونية",
    "service.web.desc": "تصميم مواقع عصرية وواضحة ومتوافقة مع هويتكم البصرية.",
    "service.blender.title": "التصميم ثلاثي الأبعاد وBlender",
    "service.blender.desc": "نمذجة ورندرة وعرض المنتجات والمفاهيم ثلاثية الأبعاد باستخدام Blender.",

    // About Education
    "edu.badge": "التعليم والمسار الأكاديمي والتدريب",
    "edu.title": "المسار التعليمي",
    "edu.title1": "تقني سامي في التصميم الجرافيكي والمعلوماتية",
    "edu.inst1": "المعهد الوطني INSiAG الجزائر",
    "edu.desc1": "تخصص متكامل في الهوية البصرية، النشر المكتبي، التصميم الخطوطي، العلامات التجارية، التعبئة وإعداد ملفات الطباعة الكبرى.",
    "edu.title2": "تدريب معتمد من أدوبي – فوتوشوب، إليستريتور وإن ديزاين",
    "edu.inst2": "أكاديمية GO MY CODE",
    "edu.desc2": "إتقان كامل واحترافي لبرمجيات أدوبي المتخصصة في وسائط التواصل البصري والإعلاني.",
    "edu.title3": "تخصص التصميم ثلاثي الأبعاد والنمذجة",
    "edu.inst3": "مؤسسة BRAINER X",
    "edu.desc3": "تدريب احترافي متقدم في النمذجة والرندرة ثلاثية الأبعاد وتطبيقها على تصميم المنتجات والتعبئة والتغليف والعلب.",

    // Portfolio Page
    "port.badge": "معرض الأعمال المميز والفاخر",
    "port.title": "مشاريع وأعمال مختارة",
    "port.desc": "مجموعة منسقة وصارمة من الإبداعات المرئية التي تجمع بين الدقة التقنية والنقاء الجمالي.",
    "port.cat_all": "الكل",
    "port.cat_print": "مطبوعات ورقية",
    "port.cat_pack": "تعبئة وتغليف",
    "port.cat_posters": "ملصقات وإعلانات",

    // Portfolio Details Modal
    "port.details_year": "سنة العمل",
    "port.details_tools": "الأدوات والبرامج",
    "port.details_palette": "لوحة تناغم الألوان",
    "port.details_typo": "الخطوط المستخدمة",
    "port.details_process": "العملية الإبداعية ومراحل التصميم",
    "port.details_quote": "شهادة وانطباع العميل",
    "port.details_close": "إغلاق النافذة",

    // Contact Page
    "contact.title": "لنناقش معاً تفاصيل مشروعك الرائد القادم.",
    "contact.desc": "يرجى ملء النموذج أدناه ببياناتك ورؤيتك أو مراسلتي مباشرة عبر البريد الإلكتروني. الرد مضمون في أقل من 24 ساعة.",
    "contact.form_title": "نموذج الاتصال وإرسال طلب",
    "contact.label_name": "الاسم الكامل",
    "contact.label_email": "بريدك الإلكتروني",
    "contact.label_subject": "مجال المشروع / موضوع الرسالة",
    "contact.opt_print": "المطبوعات الورقية والدعاية",
    "contact.opt_posters": "الملصقات والإعلانات والبوسترات",
    "contact.opt_pack": "خط تصميم علب وتعبئة فاخر وصديق للبيئة",
    "contact.opt_other": "مشروع إبداعي رائد آخر",
    "contact.label_message": "نص الرسالة (صف رؤيتك وتفاصيل مشروعك)",
    "contact.placeholder_msg": "مرحباً محمد، أود تصميم...",
    "contact.btn_send": "إرسال الرسالة الآن",
    "contact.networks": "شبكات التواصل المهنية والاجتماعية",
    "contact.success_msg": "تم إرسال رسالتك بنجاح تام! سأتواصل معك في أقرب وقت ممكن.",

    // Footer
    "footer.rights": "جميع الحقوق محفوظة.",
    "footer.subtitle": "إدارة فنية راقية وتصميم تبسيطي خالص",
    "footer.title": "فلنصنع شيئاً مذهلاً معاً.",
    "footer.desc": "متاح للفرص والمشاريع الكبرى والتعاون البصري الاستراتيجي. فلنعمل معاً لبناء هويات وتصميمات متميزة ومرموقة.",
    "footer.cta": "تواصل معي",
    "footer.sitemap": "[ خريطة الموقع ]",
    "footer.socials": "[ شبكات التواصل ]",
    "footer.privacy": "سياسة الخصوصية",
    "footer.terms": "شروط الاستخدام"
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('fr');

  // Load language from localStorage if available
  useEffect(() => {
    const savedLang = localStorage.getItem('app-language') as Language;
    if (savedLang && (savedLang === 'fr' || savedLang === 'en' || savedLang === 'ar')) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app-language', lang);
  };

  const isRTL = language === 'ar';

  // Apply RTL directly to html tag
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    if (isRTL) {
      document.documentElement.classList.add('font-arabic');
    } else {
      document.documentElement.classList.remove('font-arabic');
    }
  }, [language, isRTL]);

  const t = (key: string, defaultValue?: string): string => {
    const translation = translations[language]?.[key] || translations['fr']?.[key];
    return translation || defaultValue || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
