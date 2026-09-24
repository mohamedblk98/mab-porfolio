'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ArrowUpRight, X, FileText, Compass, Award } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  tools: string;
  image: string;
  description: string;
  colors: string[];
  typography: { heading: string; body: string };
  process: string;
  clientQuote: string;
}

const projects: Project[] = [
  { 
    id: 1, 
    title: 'Parfum Chath', 
    category: 'Packagings & Etiquettes', 
    year: '2025', 
    tools: 'Illustrator, Blender, Photoshop', 
    image: '/parfumchath.jpg',
    description: 'Un concept de packaging de parfum haut de gamme alliant élégance olfactive et design de flacon minimaliste.',
    colors: ['#1A1A1A', '#E5A93C', '#FFFFFF', '#4A4A4A'],
    typography: { heading: 'Playfair Display', body: 'Inter' },
    process: 'Conception 3D du flacon, travail sur la texture du verre dépoli et application de la dorure à chaud pour un positionnement de luxe.',
    clientQuote: 'Le design final est d&apos;une poésie rare, incarnant parfaitement l&apos;esprit de notre fragrance.'
  },
  { 
    id: 2, 
    title: 'Medenila', 
    category: 'Packagings & Etiquettes', 
    year: '2025', 
    tools: 'Illustrator, Figma, InDesign', 
    image: '/médinila.jpg',
    description: 'Une identité visuelle complète et épurée pour la marque Medenila, transmettant élégance et authenticité.',
    colors: ['#2C302E', '#A3B899', '#EAE7DC', '#1C1D1F'],
    typography: { heading: 'Outfit', body: 'Inter' },
    process: 'Développement d&apos;une charte graphique harmonieuse, création du logotype et déclinaison sur divers supports imprimés et numériques.',
    clientQuote: 'Une collaboration exceptionnelle qui a permis de donner une âme visuelle forte à notre marque.'
  },
  { 
    id: 3, 
    title: 'Menu Concept', 
    category: 'Supports Imprimés', 
    year: '2024', 
    tools: 'InDesign, Illustrator, Photoshop', 
    image: '/menu_2.jpg',
    description: 'Design éditorial haut de gamme et mise en page raffinée pour un menu gastronomique d&apos;exception.',
    colors: ['#0F0F0F', '#D4AF37', '#F5F5F7', '#333333'],
    typography: { heading: 'Playfair Display', body: 'Inter' },
    process: 'Sélection minutieuse de papiers texturés, grille typographique rigoureuse et hiérarchisation claire des plats pour une expérience sensorielle unique.',
    clientQuote: 'Nos clients soulignent fréquemment la beauté et la clarté du menu, qui reflète parfaitement notre cuisine.'
  },
  { 
    id: 4, 
    title: 'Menu Sushi', 
    category: 'Supports Imprimés', 
    year: '2025', 
    tools: 'Illustrator, InDesign, Photoshop', 
    image: '/menu.png',
    description: 'Design de menu de restaurant de sushi raffiné et épuré, alliant élégance minimaliste japonaise et lisibilité optimale.',
    colors: ['#1A1A1A', '#EF4444', '#FFFFFF', '#8A8A8A'],
    typography: { heading: 'Outfit', body: 'Inter' },
    process: 'Création d\'un design moderne avec une structure de grille équilibrée, des touches de rouge écarlate et une mise en page aérée pour mettre en valeur les plats.',
    clientQuote: 'Un design de menu exceptionnel qui complète parfaitement l\'ambiance de notre restaurant.'
  },
  { 
    id: 5, 
    title: 'Roll Up Concept 1', 
    category: 'Supports Imprimés', 
    year: '2025', 
    tools: 'Illustrator, Photoshop, InDesign', 
    image: '/roll_up1.png',
    description: 'Conception de kakémonos et roll-ups événementiels à fort impact visuel, alliant rigueur informative et élégance structurelle.',
    colors: ['#0A0A0A', '#1E40AF', '#F3F4F6', '#6B7280'],
    typography: { heading: 'Space Grotesk', body: 'Inter' },
    process: 'Recherche de compositions asymétriques favorisant une lecture verticale fluide et un équilibre optimal entre visuels accrocheurs et blocs textuels.',
    clientQuote: 'Une présence remarquable lors de nos salons professionnels. L&apos;impact esthétique a immédiatement séduit nos visiteurs.'
  },
  { 
    id: 6, 
    title: 'Aranix', 
    category: 'Packagings & Etiquettes', 
    year: '2025', 
    tools: 'Illustrator, Photoshop, Blender', 
    image: '/aranix.png',
    description: 'Une identité et un design de packaging innovants créés pour Aranix, valorisant un style audacieux, moderne et sophistiqué.',
    colors: ['#0F172A', '#D97706', '#E2E8F0', '#475569'],
    typography: { heading: 'Outfit', body: 'Inter' },
    process: 'Développement d&apos;un graphisme d&apos;emballage percutant mettant l&apos;accent sur des lignes épurées et des textures raffinées.',
    clientQuote: 'Le design d&apos;Aranix a dépassé nos espérances, créant une véritable icône visuelle pour notre gamme.'
  },
  { 
    id: 7, 
    title: 'Packaging d\'Huile Moteur Premium', 
    category: 'Packagings & Etiquettes', 
    year: '2025', 
    tools: 'Adobe Illustrator, Adobe Photoshop, Adobe Dimension (ou 3ds Max)', 
    image: '/huile_de_moteur.png',
    description: 'Design d\'emballage haut de gamme développé pour une huile moteur synthétique de qualité supérieure. Le packaging met en avant la protection du moteur, la performance mécanique, la durabilité et la technologie automobile moderne tout en transmettant fiabilité et qualité professionnelle.',
    colors: ['#0C0A09', '#1E8F4B', '#6ECF4D', '#D9D9D9', '#4E4E4E'],
    typography: { heading: 'Outfit Bold', body: 'Inter Regular' },
    process: 'Conception d\'une identité visuelle dynamique basée sur la performance moteur, développement de la structure 3D sous 3ds Max et mise en valeur des contrastes vert de course et noir métallique.',
    clientQuote: 'Une réussite visuelle exceptionnelle qui communique immédiatement la puissance, la durabilité et l\'excellence technologique de notre formule d\'huile moteur.'
  },
  { 
    id: 8, 
    title: 'Roll Up Concept 2', 
    category: 'Supports Imprimés', 
    year: '2025', 
    tools: 'Illustrator, Photoshop, InDesign', 
    image: '/roll_up2.png',
    description: 'Deuxième concept de roll-up événementiel haut de gamme, développé pour une lisibilité accrue et une communication visuelle de haute précision.',
    colors: ['#0B0F19', '#10B981', '#F8FAFC', '#64748B'],
    typography: { heading: 'Space Grotesk', body: 'Inter' },
    process: 'Création de structures graphiques verticales claires, favorisant un parcours de lecture hiérarchisé et un équilibre entre contenu informatif et branding.',
    clientQuote: 'Un design de roll-up remarquable qui attire instantanément l&apos;attention tout en restant très professionnel.'
  },
  { 
    id: 9, 
    title: 'Roll Up Concept 3', 
    category: 'Supports Imprimés', 
    year: '2025', 
    tools: 'Illustrator, Photoshop, InDesign', 
    image: '/roll_up3.png',
    description: 'Troisième concept de roll-up événementiel haut de gamme, mettant l&apos;accent sur une esthétique moderne, épurée et d&apos;un impact visuel maximal.',
    colors: ['#1E1B4B', '#F59E0B', '#F8FAFC', '#475569'],
    typography: { heading: 'Space Grotesk', body: 'Inter' },
    process: 'Conception d&apos;une hiérarchie visuelle audacieuse avec des éléments graphiques contrastés pour captiver le public cible.',
    clientQuote: 'Une mise en page exceptionnelle et dynamique qui répond parfaitement à nos besoins de communication sur site.'
  },
  { 
    id: 10, 
    title: 'Roll Up Concept 4', 
    category: 'Supports Imprimés', 
    year: '2025', 
    tools: 'Illustrator, Photoshop, InDesign', 
    image: '/roll_up4.png',
    description: 'Quatrième concept de roll-up événementiel de haute qualité, offrant une esthétique moderne et un message clair pour vos espaces d&apos;exposition.',
    colors: ['#0F172A', '#3B82F6', '#F8FAFC', '#475569'],
    typography: { heading: 'Space Grotesk', body: 'Inter' },
    process: 'Création d&apos;un visuel épuré combiné à une hiérarchie de texte optimisée pour garantir une lisibilité maximale de loin.',
    clientQuote: 'Un design de roll-up exceptionnel qui s&apos;aligne parfaitement avec l&apos;image professionnelle de notre marque.'
  },
  { 
    id: 11, 
    title: 'Thisti Parfum', 
    category: 'Packagings & Etiquettes', 
    year: '2025', 
    tools: 'Illustrator, Blender, Photoshop', 
    image: '/thisti_parfum_all-1.jpg',
    description: 'Une gamme de packagings de parfum de luxe, alliant minimalisme contemporain et délicatesse des formes flaconneuses.',
    colors: ['#D4C5B9', '#8C7A6B', '#1A1A1A', '#FFFFFF'],
    typography: { heading: 'Playfair Display', body: 'Inter' },
    process: 'Recherche volumétrique 3D et composition chromatique douce inspirée d&apos;arômes floraux délicats.',
    clientQuote: 'Une création magnifique qui insuffle une élégance intemporelle à notre collection parfumée.'
  },
  { 
    id: 12, 
    title: 'Ozone Bleu', 
    category: 'Packagings & Etiquettes', 
    year: '2025', 
    tools: 'Illustrator, Blender, Photoshop', 
    image: '/ozone_bleu.jpg',
    description: 'Design de packaging innovant et flaconnage de parfum pour Ozone Bleu, capturant l&apos;esprit de la fraîcheur marine.',
    colors: ['#0EA5E9', '#0369A1', '#F8FAFC', '#1E293B'],
    typography: { heading: 'Space Grotesk', body: 'Inter' },
    process: 'Modélisation 3D avancée du flacon en verre bleu translucide avec des accents argentés et un bouchon sculptural texturé.',
    clientQuote: 'Une réussite totale qui transmet instantanément la pureté, la fraîcheur et la qualité premium de notre fragrance.'
  },
  { 
    id: 13, 
    title: 'Ozone Vert', 
    category: 'Packagings & Etiquettes', 
    year: '2025', 
    tools: 'Illustrator, Blender, Photoshop', 
    image: '/ozone_vert.png',
    description: 'Design de packaging haut de gamme et concept flacon pour Ozone Vert, incarnant l&apos;énergie végétale et la vivacité naturelle.',
    colors: ['#10B981', '#047857', '#F0FDF4', '#1F2937'],
    typography: { heading: 'Space Grotesk', body: 'Inter' },
    process: 'Recherche créative autour des textures organiques, transparence du verre vert émeraude et finitions métalliques brossées en 3D.',
    clientQuote: 'Une création remarquable qui retranscrit parfaitement les notes boisées et la fraîcheur naturelle de notre nouveau parfum.'
  },
  {
    id: 14,
    title: 'Pika Cheval',
    category: 'Packagings & Etiquettes',
    year: '2025',
    tools: 'Illustrator, Blender, Photoshop', 
    image: '/pika_cheval.png',
    description: 'Un concept de packaging dynamique et prestigieux, fusionnant l&apos;élégance de la thématique équestre avec une esthétique moderne et colorée.',
    colors: ['#EAB308', '#CA8A04', '#1E1B4B', '#F8FAFC'],
    typography: { heading: 'Space Grotesk', body: 'Inter' },
    process: 'Développement de l&apos;identité de marque, conception structurelle sur Blender et mise en valeur des textures dorées et du contraste graphique.',
    clientQuote: 'Une réalisation magistrale qui allie puissance, modernité et finitions d&apos;une précision remarquable.'
  },
  {
    id: 16,
    title: 'Lavesol : Shield & Cleans',
    category: 'Packagings & Etiquettes',
    year: '2025',
    tools: 'Illustrator, Photoshop',
    image: '/succi.jpg',
    description: 'Un concept de packaging gourmand et coloré pour Succi, conçu pour attirer le regard et installer une identité de marque mémorable.',
    colors: ['#F97316', '#FACC15', '#FFFFFF', '#1F2937'],
    typography: { heading: 'Space Grotesk', body: 'Inter' },
    process: 'Création d’un univers graphique chaleureux, déclinaison de l’identité sur l’emballage et recherche d’un équilibre entre lisibilité et impact visuel.',
    clientQuote: 'Une identité joyeuse et immédiatement reconnaissable pour notre gamme.'
  },
  {
    id: 17,
    title: 'MooChoco',
    category: 'Packagings & Etiquettes',
    year: '2025',
    tools: 'Illustrator, Photoshop',
    image: '/mochoco.jpg',
    description: 'Une direction artistique gourmande pour MooChoco, mêlant douceur, contraste et présence en rayon.',
    colors: ['#6B3E26', '#F4C27A', '#FFF7ED', '#27150F'],
    typography: { heading: 'Playfair Display', body: 'Inter' },
    process: 'Composition d’un système visuel gourmand, hiérarchisation des informations et mise en valeur du produit par une palette chocolatée.',
    clientQuote: 'Le packaging traduit parfaitement le plaisir et la qualité de notre produit.'
  },
  {
    id: 18,
    title: 'Coockies',
    category: 'Packagings & Etiquettes',
    year: '2025',
    tools: 'Illustrator, Photoshop',
    image: '/kokies.png',
    description: 'Un packaging ludique et expressif pour Coockies, pensé pour créer une connexion immédiate avec un public gourmand.',
    colors: ['#EF4444', '#FDE68A', '#FFFFFF', '#172554'],
    typography: { heading: 'Space Grotesk', body: 'Inter' },
    process: 'Développement d’un langage graphique accessible, création des éléments illustratifs et adaptation du design au support packaging.',
    clientQuote: 'Une création vivante qui donne envie de découvrir la marque dès le premier regard.'
  },
  {
    id: 19,
    title: 'Sadja',
    category: 'Packagings & Etiquettes',
    year: '2025',
    tools: 'Illustrator, Photoshop',
    image: '/saja.png',
    description: 'Un design de packaging élégant pour Sadja, construit autour d’une identité claire, expressive et facilement reconnaissable.',
    colors: ['#0F766E', '#F8FAFC', '#F59E0B', '#164E63'],
    typography: { heading: 'Space Grotesk', body: 'Inter' },
    process: 'Mise en place d’une direction graphique équilibrée, travail sur la hiérarchie des informations et adaptation du visuel au support d’emballage.',
    clientQuote: 'Une identité forte qui donne à notre produit une présence professionnelle et mémorable.'
  },
  {
    id: 20,
    title: 'Katrina : Callus Remover',
    category: 'Packagings & Etiquettes',
    year: '2025',
    tools: 'Illustrator, Photoshop',
    image: '/katrina1.jpg',
    description: 'Un concept de packaging élégant pour Katrina, pensé pour valoriser le produit par une identité visuelle claire et raffinée.',
    colors: ['#111827', '#D5AE62', '#F4EEE2', '#334155'],
    typography: { heading: 'Space Grotesk', body: 'Inter' },
    process: 'Développement d’une composition premium, travail sur les contrastes et déclinaison de l’identité sur le support d’emballage.',
    clientQuote: 'Une présentation élégante qui renforce immédiatement la valeur perçue du produit.'
  },
  {
    id: 23,
    title: 'Al Sharifayn Shampoo',
    category: 'Packagings & Etiquettes',
    year: '2025',
    tools: 'Illustrator, Photoshop, Blender',
    image: '/al sharifayn shampoo.png',
    description: 'Un packaging de shampooing premium pour Al Sharifayn, inspiré par l’élégance orientale et construit autour d’un contraste sophistiqué entre noir profond et détails dorés.',
    colors: ['#0A0A0A', '#D5AE62', '#F4EEE2', '#3B2A1C'],
    typography: { heading: 'Cinzel Display', body: 'Inter' },
    process: 'Création d’un univers visuel luxueux, composition de motifs orientaux, travail sur les finitions dorées et mise en scène du coffret dans un décor chaleureux.',
    clientQuote: 'Un packaging majestueux qui exprime immédiatement la qualité, la tradition et la dimension premium du shampooing.'
  },
  {
    id: 21,
    title: 'Lavesol : Shield & Cleans',
    category: 'Packagings & Etiquettes',
    year: '2025',
    tools: 'Illustrator, Photoshop',
    image: '/katrina%202.jpg',
    description: 'Une seconde proposition de packaging Katrina, combinant impact visuel, lisibilité et finition contemporaine.',
    colors: ['#0F172A', '#2C67A0', '#D5AE62', '#E2E8F0'],
    typography: { heading: 'Space Grotesk', body: 'Inter' },
    process: 'Recherche d’un équilibre entre branding, hiérarchie typographique et mise en valeur du produit pour une lecture immédiate.',
    clientQuote: 'Une déclinaison moderne et distinctive qui donne une vraie présence à la gamme.'
  },
  {
    id: 15,
    title: 'Exposition Murmures de l’âme',
    category: 'Affiches',
    year: '2025',
    tools: 'Illustrator, Photoshop',
    image: '/affiche%20mermures.jpeg',
    description: 'Une affiche visuelle forte et immersive, pensée pour un impact immédiat avec une composition dramatique et une atmosphère cinématographique.',
    colors: ['#0B1020', '#F97316', '#F8FAFC', '#1E293B'],
    typography: { heading: 'Space Grotesk', body: 'Inter' },
    process: 'Mise en scène visuelle puissante, travail sur le contraste, la hiérarchie typographique et la composition pour maximiser l’impact sur support affiché.',
    clientQuote: 'Une affiche qui capte immédiatement l’attention et donne une vraie présence visuelle au projet.'
  },
  {
    id: 22,
    title: 'Exposition Regards Croisés',
    category: 'Affiches',
    year: '2025',
    tools: 'Illustrator, Photoshop',
    image: '/lounga.png',
    description: 'Une affiche expressive et élégante pour l’exposition Regards Croisés, conçue pour attirer le regard et installer une présence visuelle forte.',
    colors: ['#0F172A', '#2C67A0', '#D5AE62', '#F4EEE2'],
    typography: { heading: 'Space Grotesk', body: 'Inter' },
    process: 'Travail sur la composition, le contraste et la hiérarchie graphique afin de créer une affiche lisible et immédiatement mémorable.',
    clientQuote: 'Une affiche distinctive qui donne au projet une vraie personnalité visuelle.'
  }
];

const projectTranslations: Record<string, Record<number, { title?: string; category: string; description: string; process: string; clientQuote: string }>> = {
  fr: {
    1: {
      category: 'Packagings & Etiquettes',
      description: 'Un concept de packaging de parfum haut de gamme alliant élégance olfactive et design de flacon minimaliste.',
      process: 'Conception 3D du flacon, travail sur la texture du verre dépoli et application de la dorure à chaud pour un positionnement de luxe.',
      clientQuote: 'Le design final est d\'une poésie rare, incarnant parfaitement l\'esprit de notre fragrance.'
    },
    2: {
      category: 'Packagings & Etiquettes',
      description: 'Une identité visuelle complète et épurée pour la marque Medenila, transmettant élégance et authenticité.',
      process: 'Développement d\'une charte graphique harmonieuse, création du logotype et déclinaison sur divers supports imprimés et numériques.',
      clientQuote: 'Une collaboration exceptionnelle qui a permis de donner une âme visuelle forte à notre marque.'
    },
    3: {
      category: 'Supports Imprimés',
      description: 'Design éditorial haut de gamme et mise en page raffinée pour un menu gastronomique d\'exception.',
      process: 'Sélection minutieuse de papiers texturés, grille typographique rigoureuse et hiérarchisation claire des plats pour une expérience sensorielle unique.',
      clientQuote: 'Nos clients soulignent fréquemment la beauté et la clarté du menu, qui reflète parfaitement notre cuisine.'
    },
    4: {
      category: 'Supports Imprimés',
      description: 'Design de menu de restaurant de sushi raffiné et épuré, alliant élégance minimaliste japonaise et lisibilité optimale.',
      process: 'Création d\'un design moderne avec une structure de grille équilibrée, des touches de rouge écarlate et une mise en page aérée pour mettre en valeur les plats.',
      clientQuote: 'Un design de menu exceptionnel qui complète parfaitement l\'ambiance de notre restaurant.'
    },
    5: {
      category: 'Supports Imprimés',
      description: 'Conception de kakémonos et roll-ups événementiels à fort impact visuel, alliant rigueur informative et élégance structurelle.',
      process: 'Recherche de compositions asymétriques favorisant une lecture verticale fluide et un équilibre optimal entre visuels accrocheurs et blocs textuels.',
      clientQuote: 'Une présence remarquable lors de nos salons professionnels. L\'impact esthétique a immédiatement séduit nos visiteurs.'
    },
    6: {
      category: 'Packagings & Etiquettes',
      description: 'Une identité et un design de packaging innovants créés pour Aranix, valorisant un style audacieux, moderne et sophistiqué.',
      process: 'Développement d\'un graphisme d\'emballage percutant mettant l\'accent sur des lignes épurées et des textures raffinées.',
      clientQuote: 'Le design d\'Aranix a dépassé nos espérances, créant une véritable icône visuelle pour notre gamme.'
    },
    7: {
      title: 'Packaging d\'Huile Moteur Premium',
      category: 'Packagings & Etiquettes',
      description: 'Design d\'emballage haut de gamme développé pour une huile moteur synthétique de qualité supérieure. Le packaging met en avant la protection du moteur, la performance mécanique, la durabilité et la technologie automobile moderne tout en transmettant fiabilité et qualité professionnelle.',
      process: 'Conception d\'une identité visuelle dynamique basée sur la performance moteur, développement de la structure 3D sous 3ds Max et mise en valeur des contrastes vert de course et noir métallique.',
      clientQuote: 'Une réussite visuelle exceptionnelle qui communique immédiatement la puissance, la durabilité et l\'excellence technologique de notre formule d\'huile moteur.'
    },
    8: {
      category: 'Supports Imprimés',
      description: 'Deuxième concept de roll-up événementiel haut de gamme, développé pour une lisibilité accrue et une communication visuelle de haute précision.',
      process: 'Création de structures graphiques verticales claires, favorisant un parcours de lecture hiérarchisé et un équilibre entre contenu informatif et branding.',
      clientQuote: 'Un design de roll-up remarquable qui attire instantanément l\'attention tout en restant très professionnel.'
    },
    9: {
      category: 'Supports Imprimés',
      description: 'Troisième concept de roll-up événementiel haut de gamme, mettant l\'accent sur une esthétique moderne, épurée et d\'un impact visuel maximal.',
      process: 'Conception d\'une hiérarchie visuelle audacieuse avec des éléments graphiques contrastés pour captiver le public cible.',
      clientQuote: 'Une mise en page exceptionnelle et dynamique qui répond parfaitement à nos besoins de communication sur site.'
    },
    10: {
      category: 'Supports Imprimés',
      description: 'Quatrième concept de roll-up événementiel de haute qualité, offrant une esthétique moderne et un message clair pour vos espaces d\'exposition.',
      process: 'Création d\'un visuel épuré combiné à une hiérarchie de texte optimisée pour garantir une lisibilité maximale de loin.',
      clientQuote: 'Un design de roll-up exceptionnel qui s\'aligne parfaitement avec l\'image professionnelle de notre marque.'
    },
    11: {
      category: 'Packagings & Etiquettes',
      description: 'Une gamme de packagings de parfum de luxe, alliant minimalisme contemporain et délicatesse des formes flaconneuses.',
      process: 'Recherche volumétrique 3D et composition chromatique douce inspirée d\'arômes floraux délicats.',
      clientQuote: 'Une création magnifique qui insuffle une élégance intemporelle à notre collection parfumée.'
    },
    12: {
      category: 'Packagings & Etiquettes',
      description: 'Design de packaging innovant et flaconnage de parfum pour Ozone Bleu, capturant l\'esprit de la fraîcheur marine.',
      process: 'Modélisation 3D avancée du flacon en verre bleu translucide avec des accents argentés et un bouchon sculptural texturé.',
      clientQuote: 'Une réussite totale qui transmet instantanément la pureté, la fraîcheur et la qualité premium de notre fragrance.'
    },
    13: {
      category: 'Packagings & Etiquettes',
      description: 'Design de packaging haut de gamme et concept flacon pour Ozone Vert, incarnant l\'énergie végétale et la vivacité naturelle.',
      process: 'Recherche créative autour des textures organiques, transparence du verre vert émeraude et finitions métalliques brossées en 3D.',
      clientQuote: 'Une création remarquable qui retranscrit parfaitement les notes boisées et la fraîcheur naturelle de notre nouveau parfum.'
    },
    14: {
      category: 'Packagings & Etiquettes',
      description: 'Un concept de packaging dynamique et prestigieux, fusionnant l\'élégance de la thématique équestre avec une esthétique moderne et colorée.',
      process: 'Développement de l\'identité de marque, conception structurelle sur Blender et mise en valeur des textures dorées et du contraste graphique.',
      clientQuote: 'Une réalisation magistrale qui allie puissance, modernité et finitions d\'une précision remarquable.'
      },
    23: {
      title: 'Al Sharifayn Shampoo',
      category: 'Packagings & Etiquettes',
      description: 'Un packaging de shampooing premium pour Al Sharifayn, inspiré par l’élégance orientale et construit autour d’un contraste sophistiqué entre noir profond et détails dorés.',
      process: 'Création d’un univers visuel luxueux, composition de motifs orientaux, travail sur les finitions dorées et mise en scène du coffret dans un décor chaleureux.',
      clientQuote: 'Un packaging majestueux qui exprime immédiatement la qualité, la tradition et la dimension premium du shampooing.'
    },
  },
  en: {
    1: {
      category: 'Packagings & Labels',
      description: 'A high-end perfume packaging concept blending olfactory elegance with minimalist bottle design.',
      process: '3D bottle design, work on frosted glass texture and gold foil stamping for luxury positioning.',
      clientQuote: 'The final design has a rare poetry, perfectly embodying the spirit of our fragrance.'
    },
    2: {
      category: 'Packagings & Labels',
      description: 'A complete and clean visual identity for the Medenila brand, transmitting elegance and authenticity.',
      process: 'Development of a harmonious brand book, logo creation and rollout on print and digital supports.',
      clientQuote: 'An exceptional collaboration that gave a strong visual soul to our brand.'
    },
    3: {
      category: 'Print Materials',
      description: 'High-end editorial design and refined layout for an exceptional culinary menu.',
      process: 'Meticulous selection of textured papers, strict typographic grid and clear menu hierarchy for a unique sensory experience.',
      clientQuote: 'Our clients frequently praise the beauty and clarity of the menu, which perfectly reflects our cuisine.'
    },
    4: {
      category: 'Print Materials',
      description: 'Sleek and refined sushi restaurant menu design, combining Japanese minimalist elegance and optimal legibility.',
      process: 'Creating a modern design with balanced grids, deep scarlet touches and airy space to highlight culinary dishes.',
      clientQuote: 'An outstanding menu design that perfectly complements our restaurant atmosphere.'
    },
    5: {
      category: 'Print Materials',
      description: 'High-impact exhibition banners and roll-ups, combining informative clarity and structural elegance.',
      process: 'Researching asymmetrical compositions favoring smooth vertical reading and visual-to-textual balance.',
      clientQuote: 'A remarkable presence at our trade shows. The aesthetic impact immediately won over visitors.'
    },
    6: {
      category: 'Packagings & Labels',
      description: 'An innovative packaging design and brand identity for Aranix, emphasizing a bold, modern, and sophisticated style.',
      process: 'Developing striking packaging graphics with polished lines and refined textures.',
      clientQuote: 'The Aranix design surpassed our expectations, creating a true visual icon for our range.'
    },
    7: {
      title: 'Premium Engine Oil Packaging',
      category: 'Packagings & Labels',
      description: 'Premium packaging design developed for high-performance synthetic motor oil. Highlighting engine protection, mechanical performance, and modern automotive technology.',
      process: 'Dynamic visual identity design based on engine performance, 3D modeling in 3ds Max with contrast of racing green and metallic black.',
      clientQuote: 'An exceptional visual success that immediately communicates power, durability, and technological excellence.'
    },
    8: {
      category: 'Print Materials',
      description: 'Second premium roll-up banner concept, developed for high readability and maximum visual communication precision.',
      process: 'Structured vertical graphic layout promoting a hierarchized reading journey and balanced branding.',
      clientQuote: 'A remarkable roll-up design that instantly attracts attention while remaining professional.'
    },
    9: {
      category: 'Print Materials',
      description: 'Third premium roll-up concept, focusing on modern, clean, and highly impactful exhibition visuals.',
      process: 'Bold visual hierarchy design with high-contrast graphic elements to engage audiences.',
      clientQuote: 'An exceptional and dynamic layout that perfectly suits our on-site communication needs.'
    },
    10: {
      category: 'Print Materials',
      description: 'Fourth high-quality roll-up concept, offering clean modern aesthetics and a crystal-clear display message.',
      process: 'Clean graphics combined with text layout optimized for readability from a distance.',
      clientQuote: 'An outstanding roll-up design that aligns perfectly with our brand professional image.'
    },
    11: {
      category: 'Packagings & Labels',
      description: 'A luxurious perfume packaging range, merging contemporary minimalism with delicate glass silhouettes.',
      process: '3D volumetric research and soft chromatic composition inspired by delicate floral aromas.',
      clientQuote: 'A magnificent creation breathing timeless elegance into our fragrance collection.'
    },
    12: {
      category: 'Packagings & Labels',
      description: 'Innovative packaging and bottle design for Ozone Bleu, capturing the essence of marine freshness.',
      process: 'Advanced 3D modeling of translucent blue glass with silver accents and sculptural texturized cap.',
      clientQuote: 'A total success transmitting purity, freshness, and premium quality of our fragrance.'
    },
    13: {
      category: 'Packagings & Labels',
      description: 'High-end packaging design and bottle concept for Ozone Vert, embodying natural vegetative energy.',
      process: 'Creative work on organic textures, emerald green glass transparency, and 3D brushed metal finishes.',
      clientQuote: 'A remarkable creation echoing woody notes and natural freshness of our new perfume.'
    },
    14: {
      category: 'Packagings & Labels',
      description: 'Dynamic and prestigious packaging concept, merging equestrian theme elegance with modern colorful aesthetics.',
      process: 'Brand identity development, structural 3D design in Blender, and gold texture rendering with graphic contrast.',
      clientQuote: 'A masterful execution combining power, modernity, and remarkably precise finishes.'
    },
    15: {
      category: 'Posters',
      description: 'A strong and immersive poster design created for immediate impact, with a dramatic composition and cinematic atmosphere.',
      process: 'High-impact visual staging, contrast work, typography hierarchy and composition optimized for maximum poster visibility.',
      clientQuote: 'A poster that immediately grabs attention and gives the project real visual presence.'
    },
    23: {
      title: 'Al Sharifayn Shampoo',
      category: 'Packagings & Labels',
      description: 'Premium shampoo packaging for Al Sharifayn, inspired by oriental elegance and built around a sophisticated contrast of deep black and gold details.',
      process: 'Luxury art direction, ornamental pattern composition, gold finish treatment and warm product staging for a premium presentation.',
      clientQuote: 'A majestic package that immediately communicates quality, tradition and the premium character of the shampoo.'
    }
  },
  ar: {
    1: {
      category: 'التغليف والعلامات',
      description: 'تصميم مبتكر لتغليف عطر فاخر يجمع بين الأناقة الشمية والتصميم البسيط والحديث للزجاجة.',
      process: 'تصميم ثلاثي الأبعاد للزجاجة، والعمل على ملمس الزجاج المصنفر والخطوط الذهبية لمكانة فاخرة في السوق.',
      clientQuote: 'التصميم النهائي يحمل شاعرية نادرة، مجسداً تماماً روح وجوهر عطرنا.'
    },
    2: {
      category: 'التغليف والعلامات',
      description: 'هوية بصرية كاملة وأنيقة لعلامة Medenila، تنقل الرقي والجمال الأصيل.',
      process: 'تطوير كتيب هوية متناسق، وابتكار الشعار وتطبيقه على مختلف المطبوعات والوسائط الرقمية.',
      clientQuote: 'تعاون استثنائي سمح بمنح روح بصرية قوية ومميزة لعلامتنا التجارية.'
    },
    3: {
      category: 'مطبوعات ورقية',
      description: 'تصميم تحريري راقٍ وتنسيق دقيق لقائمة طعام فاخرة واستثنائية.',
      process: 'اختيار دقيق للأوراق ذات الملمس الغني، وشبكة طباعية صارمة وهيكلة واضحة للأطباق لتجربة حسية فريدة.',
      clientQuote: 'يشيد عملاؤنا باستمرار بجمال ووضوح قائمة الطعام، والتي تعكس تماماً فلسفة مطبخنا.'
    },
    4: {
      category: 'مطبوعات ورقية',
      description: 'تصميم قائمة طعام لمطعم سوشي أنيق وبسيط، يجمع بين البساطة اليابانية والوضوح المثالي للقراءة.',
      process: 'إنشاء تصميم حديث بشبكة متوازنة، ولمسات باللون الأحمر القرمزي ومساحة واسعة لإبراز الأطباق بشكل شهي.',
      clientQuote: 'تصميم استثنائي لقائمة الطعام يكمل تماماً أجواء مطعمنا الراقية.'
    },
    5: {
      category: 'مطبوعات ورقية',
      description: 'تصميم لافتات الرول اب (Roll-up) للمعارض والفعاليات ذات تأثير بصري قوي وتواصل معلوماتي واضح.',
      process: 'دراسة تركيبات غير متناظرة تدعم القراءة العمودية السلسة والتوازن المثالي بين العناصر الجذابة والنصوص.',
      clientQuote: 'حضور لافت ومتميز في معارضنا المهنية. لقد نال التصميم البصري إعجاب زوارنا على الفور.'
    },
    6: {
      category: 'التغليف والعلامات',
      description: 'هوية وتصميم تغليف مبتكر تم إنشاؤه لعلامة Aranix، يبرز الأسلوب الجريء والحديث والراقي.',
      process: 'تطوير رسومات تغليف مذهلة مع التركيز على الخطوط النقية والقوام الغني والمصقول.',
      clientQuote: 'تجاوز تصميم Aranix توقعاتنا، ليصبح رمزاً بصرياً حقيقياً لمجموعتنا.'
    },
    7: {
      title: 'تغليف زيت محرك فاخر',
      category: 'التغليف والعلامات',
      description: 'تصميم علب فاخرة تم تطويرها لزيت محركات اصطناعي فائق الجودة. يركز التصميم على حماية المحرك، الأداء الميكانيكي، والتكنولوجيا الحديثة لنقل الموثوقية والاحترافية.',
      process: 'تصميم هوية بصرية ديناميكية بناءً على أداء المحرك، وابتكار الهيكل ثلاثي الأبعاد عبر 3ds Max مع إبراز تباين الأخضر والأسود المعدني.',
      clientQuote: 'نجاح بصري استثنائي يعبر فوراً عن القوة، والمتانة، والتميز التكنولوجي لتركيبة زيت المحركات الخاصة بنا.'
    },
    8: {
      category: 'مطبوعات ورقية',
      description: 'المفهوم الثاني لتصميم لافتة رول اب فاخرة، تم تطويرها لسهولة قراءة متميزة وتواصل بصري عالي الدقة.',
      process: 'تنسيق عمودي واضح يدعم تسلسل القراءة، متوازناً بشكل كامل مع العلامة التجارية لمظهر احترافي متميز.',
      clientQuote: 'تصميم رائع يجذب الانتباه على الفور مع الحفاظ على الهوية الرسمية والمهنية.'
    },
    9: {
      category: 'مطبوعات ورقية',
      description: 'المفهوم الثالث لتصميم لافتة رول اب للفعاليات، يركز على الجماليات الحديثة وتأثير بصري فوري وأقصى.',
      process: 'تطوير هيكل بصري جريء وتنسيق عناصر متباينة الألوان للتفاعل السريع مع الجمهور المستهدف.',
      clientQuote: 'تنسيق ديناميكي استثنائي يلبي تماماً متطلبات التواصل والعرض في معارضنا.'
    },
    10: {
      category: 'مطبوعات ورقية',
      description: 'المفهوم الرابع لتصميم رول اب عالي الجودة، يوفر جمالية مذهلة ورسالة واضحة تماماً لمساحات العرض الخاصة بكم.',
      process: 'رسومات نقية وبسيطة مدمجة مع تنظيم نصوص محسن لضمان سهولة القراءة الكاملة حتى من مسافات بعيدة.',
      clientQuote: 'تصميم استثنائي يتماشى بشكل ممتاز مع الصورة المهنية المرموقة لعلامتنا التجارية.'
    },
    11: {
      category: 'التغليف والعلامات',
      description: 'مجموعة متكاملة من تصاميم العطور الفاخرة، تمزج بين البساطة المعاصرة وأناقة ورقة زجاجات العطور.',
      process: 'أبحاث ودراسات ثلاثية الأبعاد للأحجام مع تركيبة ألوان ناعمة مستوحاة من روائح الأزهار الرقيقة.',
      clientQuote: 'ابتكار رائع يضفي أناقة خالدة وجاذبية خاصة على مجموعة عطورنا الفاخرة.'
    },
    12: {
      category: 'التغليف والعلامات',
      description: 'تصميم تغليف وزجاجة مبتكر لعطر Ozone Bleu، يجسد تماماً انتعاش ونقاء نسيم البحر.',
      process: 'نمذجة متقدمة ثلاثية الأبعاد للزجاجة باللون الأزرق الشفاف مع تفاصيل فضية وغطاء فني محكم.',
      clientQuote: 'نجاح باهر ينقل على الفور النقاء والانتعاش والجودة الفائقة لعطرنا المميز.'
    },
    13: {
      category: 'التغليف والعلامات',
      description: 'تصميم تغليف وزجاجة راقٍ لعطر Ozone Vert، يرمز إلى الطاقة النباتية والانتعاش الطبيعي الخصب.',
      process: 'بحث إبداعي حول الملامس العضوية، وشفافية الزجاج الزمردي الأخضر مع لمسات نهائية معدنية ثلاثية الأبعاد.',
      clientQuote: 'تصميم رائع يجسد نغمات الخشب العطرية والانتعاش الطبيعي لعطرنا الجديد.'
    },
    14: {
      category: 'التغليف والعلامات',
      description: 'مفهوم تغليف ديناميكي ومرموق، يدمج أناقة الطابع الفروسي والخيول الأصيلة مع الجماليات الحديثة الغنية بالألوان.',
      process: 'تطوير الهوية البصرية، وتصميم الهيكل الإنشائي عبر Blender مع إبراز اللمسات الذهبية والتباين الرسومي.',
      clientQuote: 'عمل متقن يجمع بين القوة، واللمسة العصرية، والتشطيبات الفنية بالغة الدقة.'
    },
    15: {
      category: 'الملصقات والبوسترات',
      description: 'ملصق بصري قوي ومغرى، صُمّم لتحقيق تأثير فوري من خلال تكوين درامي وأجواء سينمائية.',
      process: 'مشهد بصري مؤثر، عمل على التباين، وتسلسل الطباعة، وترتيب العناصر لتحقيق أقصى تأثير قابل للقراءة في اللوحة المعروضة.',
      clientQuote: 'ملصق يلفت الانتباه على الفور ويمنح المشروع حضوراً بصرياً قوياً.'
    },
    23: {
      title: 'شامبو الشريفين',
      category: 'التغليف والعلامات',
      description: 'تصميم تغليف فاخر لشامبو الشريفين، مستوحى من الأناقة الشرقية ويجمع بين الأسود العميق والتفاصيل الذهبية الراقية.',
      process: 'ابتكار هوية بصرية فاخرة، وتكوين الزخارف الشرقية، وإبراز اللمسات الذهبية مع تقديم المنتج في أجواء دافئة.',
      clientQuote: 'تغليف مهيب يعبر فوراً عن الجودة والأصالة والقيمة الفاخرة للشامبو.'
    }
  }
};

const categoriesMap: Record<string, Record<string, string>> = {
  fr: {
    all: 'Tous',
    print: 'Supports Imprimés',
    pack: 'Packagings & Etiquettes',
    posters: 'Affiches'
  },
  en: {
    all: 'All',
    print: 'Print Materials',
    pack: 'Packagings & Labels',
    posters: 'Posters'
  },
  ar: {
    all: 'الكل',
    print: 'مطبوعات ورقية',
    pack: 'التغليف والعلامات',
    posters: 'الملصقات والبوسترات'
  }
};

export default function Portfolio() {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categoriesList = ['all', 'print', 'pack', 'posters'];

  const getTranslatedProject = (project: Project) => {
    const translation = projectTranslations[language]?.[project.id] || projectTranslations['fr']?.[project.id];
    if (!translation) return project;
    return {
      ...project,
      title: translation.title || project.title,
      category: translation.category,
      description: translation.description,
      process: translation.process,
      clientQuote: translation.clientQuote
    };
  };

  const filteredProjects = projects
    .map(getTranslatedProject)
    .filter((project) => {
      if (activeCategory === 'all') return true;
      const originalProject = projects.find(p => p.id === project.id);
      if (!originalProject) return true;
      if (activeCategory === 'print') return originalProject.category === 'Supports Imprimés';
      if (activeCategory === 'pack') return originalProject.category === 'Packagings & Etiquettes';
      if (activeCategory === 'posters') return originalProject.category === 'Affiches';
      return true;
    });

  const catNames = categoriesMap[language] || categoriesMap['fr'];

  return (
    <div className="pt-20">
      {/* Page Title & Meta */}
      <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-modern-blue/10 border border-modern-blue/20 text-xs font-mono text-modern-blue"
        >
          <Award size={12} className="animate-pulse" />
          <span>{language === 'ar' ? 'معرض أعمالي الإبداعية — مشاريع ممتازة' : language === 'en' ? 'AUTHOR PORTFOLIO — AWARD-WINNING PROJECTS' : 'PORTFOLIO D\'AUTEUR — PROJETS PRIMÉS'}</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight"
        >
          {language === 'ar' ? (
            <>أعمال <span className="text-gradient">مختارة.</span></>
          ) : language === 'en' ? (
            <>Selected <span className="text-gradient">Creations.</span></>
          ) : (
            <>Créations <span className="text-gradient">Sélectionnées.</span></>
          )}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-semibold text-soft-white"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{t('portfolio.status')}</span>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.12 }}
          className="text-neutral-gray text-lg md:text-xl font-sans leading-relaxed"
        >
          {t('portfolio.desc')}
        </motion.p>
      </div>

      {/* Category Filter Pills */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.2 }}
        className="flex flex-wrap justify-center gap-3 mb-16"
      >
        {categoriesList.map((categoryKey) => (
          <button
            key={categoryKey}
            onClick={() => setActiveCategory(categoryKey)}
            className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
              activeCategory === categoryKey 
                ? 'bg-gradient-to-r from-modern-blue to-soft-purple text-white border-transparent shadow-lg shadow-modern-blue/20 scale-105' 
                : 'bg-white/5 text-neutral-gray border-white/5 hover:bg-white/10 hover:text-white'
            }`}
          >
            {catNames[categoryKey]}
          </button>
        ))}
      </motion.div>

      {/* Responsive Masonry Portfolio Grid (Up to 4 columns on wide monitors) */}
      <motion.div 
        layout
        className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8"
      >
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, type: 'spring' }}
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="break-inside-avoid relative group cursor-pointer glass-card p-3"
            >
              <div className="relative w-full rounded-[1.8rem] overflow-hidden bg-navy">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={800}
                  height={1000}
                  unoptimized
                  className="w-full h-auto object-cover opacity-100 group-hover:scale-[1.03] transition-all duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                
                {/* Gradient Shadow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-modern-blue text-xs font-bold uppercase tracking-widest mb-1.5 block">{project.category}</span>
                      <h3 className="text-2xl font-heading font-extrabold text-white mb-1">{project.title}</h3>
                      <p className="text-neutral-gray text-[10px] font-mono">{project.tools}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white text-navy flex items-center justify-center rotate-45 group-hover:rotate-0 transition-transform duration-500 shadow-xl border border-white/10">
                      <ArrowUpRight size={22} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Immersive Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy/95 backdrop-blur-2xl overflow-y-auto px-4 md:px-8 py-12 flex justify-center items-start"
          >
            <motion.div 
              initial={{ opacity: 0, y: 60, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 60, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              className="max-w-6xl w-full glass-card p-6 md:p-12 border border-white/10 relative mt-12 flex flex-col gap-10 bg-navy/85"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all cursor-pointer hover:rotate-90"
              >
                <X size={20} />
              </button>

              {/* Header Title & Specs */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-modern-blue tracking-widest uppercase">{selectedProject.category}</span>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white">{selectedProject.title}</h2>
                </div>
                <div className="flex gap-8 text-xs font-mono">
                  <div>
                    <span className="block text-neutral-gray uppercase tracking-wider">{language === 'ar' ? 'الأدوات' : language === 'en' ? 'Tools' : 'Outils'}</span>
                    <span className="text-white mt-1 block font-bold">{selectedProject.tools}</span>
                  </div>
                </div>
              </div>

              {/* Complex Double Grid Details */}
              <div className="grid lg:grid-cols-5 gap-12">
                {/* Specifications Column (Left) */}
                <div className="lg:col-span-2 space-y-8 flex flex-col justify-between">
                  <div className="space-y-8">
                    <p className="text-neutral-gray leading-relaxed text-lg md:text-xl">
                      {selectedProject.description}
                    </p>

                    {/* Typography block */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                        <FileText size={14} className="text-modern-blue" /> {language === 'ar' ? 'تنسيق الخطوط والخطابة' : language === 'en' ? 'Typographic Pairing' : 'Association Typographique'}
                      </h4>
                      <div className="bg-white/5 border border-white/5 rounded-2xl p-5 flex justify-between text-xs">
                        <div>
                          <span className="text-neutral-gray block">{language === 'ar' ? 'العناوين' : 'Titre Display'}</span>
                          <span className="text-white font-extrabold mt-1 block text-sm">{selectedProject.typography.heading}</span>
                        </div>
                        <div>
                          <span className="text-neutral-gray block">{language === 'ar' ? 'النصوص' : 'Corps de texte'}</span>
                          <span className="text-white font-extrabold mt-1 block text-sm">{selectedProject.typography.body}</span>
                        </div>
                      </div>
                    </div>

                    {/* Process approach */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                        <Compass size={14} className="text-modern-blue" /> {language === 'ar' ? 'منهجية العمل والعملية الإبداعية' : language === 'en' ? 'Approach & Creative Process' : 'Démarche & Processus Créatif'}
                      </h4>
                      <p className="text-sm text-neutral-gray/90 leading-relaxed font-sans">
                        {selectedProject.process}
                      </p>
                    </div>
                  </div>

                  {/* Client quote testimonial row */}
                  <div className="border-t border-white/10 pt-6 mt-8">
                    <p className="text-xs italic text-neutral-gray leading-relaxed">
                      &ldquo;{selectedProject.clientQuote}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Cover High fidelity Mockup Layout (Right) */}
                <div className="lg:col-span-3 space-y-6">
                  <div className={`relative ${selectedProject.category === 'Affiches' || selectedProject.category === 'الملصقات والبوسترات' ? 'aspect-[3/4]' : 'aspect-[4/3]'} rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-navy p-2.5`}>
                    <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden bg-black/20">
                      {/* Blurred background element to enhance depth and ambiance */}
                      <Image
                        src={selectedProject.image}
                        alt=""
                        fill
                        unoptimized
                        className="object-cover blur-3xl opacity-40 scale-110 pointer-events-none"
                        referrerPolicy="no-referrer"
                      />
                      {/* Sharp, high-fidelity uncropped foreground image */}
                      <Image
                        src={selectedProject.image}
                        alt={`${selectedProject.title}`}
                        fill
                        unoptimized
                        className="object-contain relative z-10 p-2 select-none"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
