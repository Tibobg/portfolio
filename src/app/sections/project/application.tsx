"use client";
import Image from "next/image";
import Link from "next/link";
import GlassBlock from "@/components/GlassBlock";
import Section from "@/components/section";
import { useTranslations } from "next-intl";

export default function AppSection() {
  const t = useTranslations("Projects.App");

  return (
    <Section id="app" className="pt-12 md:pt-20">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-6 md:gap-12 lg:[grid-template-columns:30%_65%] items-stretch">
          {/* Texte */}
          <GlassBlock className="order-1 lg:order-2 p-3 md:p-8 flex flex-col">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center">
              {t("title")}
            </h2>

            <p className="mt-2 text-foreground/80 leading-relaxed">{t("p1")}</p>
            <p className="mt-2 text-foreground/80 leading-relaxed">{t("p2")}</p>
            <p className="mt-2 text-foreground/80 leading-relaxed">{t("p3")}</p>
            <p className="mt-2 text-foreground/80 leading-relaxed">{t("p4")}</p>

            <Link href="#" onClick={(e) => e.preventDefault()} className="mt-auto self-center pt-3">
              <button className="btn-cv btn-cv--sweep">
                <span>{t("cta")}</span>
              </button>
            </Link>
          </GlassBlock>

          {/* Image */}
          <GlassBlock className="order-2 lg:order-1 px-3 flex items-center justify-center">
            <div className="h-[340px] sm:h-[420px] md:h-[460px] lg:h-[560px] xl:h-[620px] flex items-center justify-center">
              <Image
                src="/app-screens/image.png"
                alt={t("alt")}
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
