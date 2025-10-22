"use client";
import PhotoSection from "./picture";
import MaquettesSection from "./application";
import SkateboardsSection from "./skateboard";
import GlassBlock from "@/components/GlassBlock";
import { useTranslations } from "next-intl";

export default function Projects() {
  const t = useTranslations("Projects.Intro");

  return (
    <section id="projects" className="font-amiko relative z-0">
      <div className="mx-auto max-w-5xl px-4">
        <div className="items-stretch">
          <GlassBlock className="p-3 md:p-5 flex flex-col items-stretch gap-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center">
              {t("title")}
            </h2>
            <p className="text-foreground/80 leading-relaxed">{t("p1")}</p>
            <p className="text-foreground/80 leading-relaxed">{t("p2")}</p>
            <p className="text-foreground/80 leading-relaxed">{t("p3")}</p>
            <p className="text-foreground/80 leading-relaxed">{t("p4")}</p>
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
