import type {Metadata} from 'next';
import Image from 'next/image';
import { Inter, Space_Grotesk, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import { FaWhatsapp } from 'react-icons/fa';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { DesignSystemProvider } from '@/components/DesignSystemContext';
import { LanguageProvider } from '@/components/LanguageContext';
import { PageTransition } from '@/components/PageTransition';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'MAB',
  description: 'MAB — Portfolio de design graphique et packaging.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${playfair.variable} ${jetbrainsMono.variable}`}>
      <body suppressHydrationWarning className="min-h-screen flex flex-col relative overflow-x-hidden transition-colors duration-500 bg-navy">
        <DesignSystemProvider>
          <LanguageProvider>
            <div className="noise-bg"></div>
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
              <Image
                src="/icon.svg"
                alt=""
                fill
                sizes="100vw"
                className="absolute left-1/2 top-1/2 w-[min(92vw,900px)] md:w-[min(72vw,900px)] -translate-x-1/2 -translate-y-1/2 rotate-0 opacity-[0.035] mix-blend-screen"
              />
            </div>
            <Navbar />
            <main className="flex-grow pt-24 pb-16 px-4 md:px-8 max-w-[1440px] xl:max-w-[1600px] 2xl:max-w-[1800px] 3xl:max-w-[2200px] mx-auto w-full z-10 relative">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
            <a
              href="https://wa.me/213794782086"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contacter MAB sur WhatsApp"
              title="WhatsApp MAB"
              className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 transition-transform duration-300 hover:scale-110 hover:bg-[#20bd5a]"
            >
              <FaWhatsapp size={28} aria-hidden="true" />
            </a>
          </LanguageProvider>
        </DesignSystemProvider>
      </body>
    </html>
  );
}
