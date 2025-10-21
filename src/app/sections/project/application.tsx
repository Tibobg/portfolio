"use client";
import Image from "next/image";
import Link from "next/link";
import GlassBlock from "@/components/GlassBlock";
import Section from "@/components/section";

export default function MaquetteSection() {
  return (
    <Section id="maquette" className="pt-12 md:pt-20">
      <div className="mx-auto max-w-5xl">
        {/* 1 col by default; switch to 30% / 65% only from lg */}
        <div className="grid grid-cols-1 gap-6 md:gap-12 lg:[grid-template-columns:30%_65%] items-stretch">

          {/* Text block — first on mobile, second on large screens */}
          <GlassBlock className="order-1 lg:order-2 p-3 md:p-8 flex flex-col">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center">
              APPLICATION
            </h2>

            <p className="mt-2 text-foreground/80 leading-relaxed">
              Conçue entièrement avec Flutter, cette application mobile a pour
              objectif d’offrir une expérience simple, esthétique et interactive
              autour de la création et de la personnalisation de skateboards décoratifs.
            </p>
            <p className="mt-2 text-foreground/80 leading-relaxed">
              L’utilisateur peut y créer un compte, parcourir l’ensemble de mes
              créations, acheter des modèles déjà disponibles, ou concevoir sa propre
              planche en choisissant le type de deck et le visuel qui lui correspond.
            </p>
            <p className="mt-2 text-foreground/80 leading-relaxed">
              L’application intègre également des fonctionnalités de sélection de date
              de livraison et de messagerie directe, permettant un contact personnalisé
              entre le client et moi pour suivre ou ajuster sa commande.
            </p>
            <p className="mt-2 text-foreground/80 leading-relaxed">
              Ce projet m’a permis de combiner design, expérience utilisateur et logique
              full-stack au sein d’un environnement mobile, tout en explorant la
              puissance et la flexibilité de Flutter pour créer une interface fluide et
              cohérente.
            </p>

            <Link href="#" onClick={(e) => e.preventDefault()} className="mt-auto self-center pt-3">
              <button className="btn-cv btn-cv--sweep">
                <span>A VENIR</span>
              </button>
            </Link>
          </GlassBlock>

          {/* Image block — second on mobile, first on large screens */}
          <GlassBlock className="order-2 lg:order-1 px-3 flex items-center justify-center">
            <div className="h-[340px] sm:h-[420px] md:h-[460px] lg:h-[560px] xl:h-[620px] flex items-center justify-center">
              <Image
                src="/app-screens/image.png"
                alt="Aperçu application sur téléphone"
                width={1400}
                height={2800}
                className="h-full w-auto object-contain select-none pointer-events-none"
                priority
              />
            </div>
          </GlassBlock>

        </div>
      </div>
    </Section>
  );
}
