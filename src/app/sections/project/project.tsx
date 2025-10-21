"use client";
import PhotoSection from "./picture";
import MaquettesSection from "./application";
import SkateboardsSection from "./skateboard";
import GlassBlock from "@/components/GlassBlock";

export default function Projects() {
  return (
    <section id="projets" className="font-amiko relative z-0">
      <div className="mx-auto max-w-5xl px-4">
        <div className="items-stretch">
                <GlassBlock className=" p-3 md:p-5 flex flex-col items-stretch gap-4">
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center">PROJETS</h2>
          <p className="text-foreground/80 leading-relaxed">
            Chaque projet que je réalise est une nouvelle aventure, un terrain d’expérimentation où je peux mélanger technique, design et créativité.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            Que ce soit à travers le développement web, la conception d’objets ou la création visuelle, j’aime explorer différentes façons de donner vie à mes idées. Ces projets sont pour moi une manière concrète d’apprendre, d’évoluer, et de repousser mes limites tout en cultivant ma curiosité.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            Vous découvrirez ici plusieurs univers qui me passionnent : du développement d’une application de vente et de personnalisation de skateboards, à la fabrication artisanale de mes propres decks de décoration, en passant par la photographie et la vidéo par drone.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            Chacun de ces projets représente une part de ma vision : créer avec sens, apprendre en faisant, et partager des expériences uniques.
          </p>
          </GlassBlock>
        </div>
          <MaquettesSection />
          <SkateboardsSection />
      </div>

      {/* Section Photo en-dessous, full-bleed */}
      <PhotoSection />
    </section>
  );
}
