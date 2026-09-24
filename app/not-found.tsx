import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 relative bg-navy">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-modern-blue/10 rounded-full blur-[80px] -z-10 pointer-events-none" />

      <div className="space-y-6 max-w-md z-10">
        <div className="inline-flex p-4 rounded-full bg-white/5 border border-white/10 text-modern-blue mb-4 font-mono text-2xl font-bold">
          404
        </div>
        
        <h1 className="text-4xl md:text-5xl font-sans font-extrabold text-white tracking-tight">
          Page <span className="text-transparent bg-clip-text bg-gradient-to-r from-modern-blue to-soft-purple">Introuvable.</span>
        </h1>
        
        <p className="text-neutral-gray text-base md:text-lg leading-relaxed">
          Le design ou le support que vous recherchez n&apos;existe pas ou a été déplacé. Retournez à l&apos;accueil pour explorer mes autres projets.
        </p>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-gradient-to-r from-modern-blue to-soft-purple text-white font-bold hover:opacity-90 transition-opacity cursor-pointer text-sm shadow-lg"
          >
            Retourner à l&apos;Accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
