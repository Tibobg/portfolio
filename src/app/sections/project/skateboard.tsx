"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Section from "@/components/section";
import GlassBlock from "@/components/GlassBlock";

export default function SkateboardSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  const [isTinyMobile, setIsTinyMobile] = useState(false);

  useEffect(() => {
    // Détection des largeurs
    const checkWidth = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsSmallMobile(width < 650);
      setIsTinyMobile(width < 450);
    };
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  return (
    <Section id="skateboard" className="pt-12 md:pt-20">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-6 md:gap-12 md:[grid-template-columns:65%_30%] items-stretch">
          
          {/* Gauche : texte + bouton */}
          <GlassBlock className="p-3 md:p-8 flex flex-col h-full">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center">
              SKATEBOARD
            </h2>

            <p className="mt-4 text-foreground/80 leading-relaxed">
              Chaque skateboard que je conçois est avant tout une création artistique,
              pensée pour être exposée et apporter une touche unique à un intérieur.
            </p>
            <p className="mt-4 text-foreground/80 leading-relaxed">
              Je réalise des planches décoratives sur mesure, où chacun peut choisir
              la forme du deck, les motifs et les finitions. Certaines pièces sont même
              découpées directement dans le bois, offrant une liberté totale de
              personnalisation et un rendu authentique.
            </p>
            <p className="mt-4 text-foreground/80 leading-relaxed">
              Mon approche mêle design, équilibre visuel et originalité, pour créer des
              objets capables d’exprimer une identité propre.
            </p>
            <p className="mt-4 text-foreground/80 leading-relaxed">
              Leur esthétique épurée et leurs formes sur mesure en font des objets à la
              croisée du design et de l’artisanat, entre objet décoratif et expérience
              de mouvement.
            </p>

            <Link href="https://flic.kr/s/aHBqjCy3tV" target="_blank" className="mt-auto self-center pt-3">
              <button className="btn-cv btn-cv--sweep ">
                <span>VOIR PLUS</span>
              </button>
            </Link>
          </GlassBlock>

          {/* Droite : visuel deck */}
          <GlassBlock className="flex items-center justify-center">
            <div
              className={`relative w-full flex items-center justify-center transition-all duration-500 ${
                isMobile ? "h-[220px]" : "h-[600px] lg:h-[680px]"
              }`}
            >
              <Image
                src="/skateboards/image.png"
                alt="Skateboard deck"
                width={160}
                height={100}
                className={`object-contain select-none pointer-events-none
                            w-full h-auto origin-center transition-transform duration-500
                            ${
                              isMobile
                                ? isTinyMobile
                                  ? "rotate-90 max-h-[300px]"
                                  : isSmallMobile
                                  ? "rotate-90 max-h-[400px]"
                                  : "rotate-90 max-h-[600px]"
                                : "rotate-0 max-h-[90%]"
                            }
                            drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]`}
                priority
              />
            </div>
          </GlassBlock>
        </div>
      </div>
    </Section>
  );
}
