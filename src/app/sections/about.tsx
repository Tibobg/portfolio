// components/about.tsx
"use client";

import ShinyText from "@/components/ShinyText";
import { useTranslations } from "next-intl";

export default function AboutSection() {
  const t = useTranslations("About");

  return (
    <section
      id="about"
      className="flex flex-col items-center justify-center pt-12 md:pt-20 text-center text-white bg-transparent"
    >
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-6">
          {t("title")}
        </h2>

        <div className="max-w-4xl">
          <ShinyText
            text={t("tagline")}
            disabled={false}
            speed={3}
            className="font-bold leading-tight 
                      text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 
                      text-balance"
          />
        </div>
      </div>
    </section>
  );
}
