// components/Hero.tsx
import LiquidGlass from "@/components/GlassBlock";
import Balatro from "@/components/backgrounds/Balatro"; // ton fichier

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden py-12 md:py-20"
    >
      {/* FOND ANIMÉ */}
      <Balatro
        isRotate={false}
        mouseInteraction={true}
        pixelFilter={2000}
      />

      {/* CONTENU */}
      <div className="relative z-10 w-full">
        <div className="mx-auto max-w-5xl px-4 text-center text-white">
          <LiquidGlass className="px-8 py-10 md:py-14">
            <p className="tracking-widest uppercase text-white/75 text-xs md:text-sm">
              Thibault Cauche
            </p>
            <h1 className="mt-3 text-4xl md:text-7xl font-extrabold leading-tight">CHEWLIN</h1>
            <div className="mt-8 flex items-center justify-center gap-3">
              <a href="#projets" className="rounded-full bg-white text-black px-5 py-3 hover:opacity-90">
                Voir mes projets
              </a>
              <a href="#contact" className="rounded-full border border-white/40 px-5 py-3 hover:bg-white/10">
                Me contacter
              </a>
            </div>
          </LiquidGlass>
        </div>
      </div>
    </section>
  );
}
