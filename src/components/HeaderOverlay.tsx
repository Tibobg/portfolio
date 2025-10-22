// components/HeaderOverlay.tsx
"use client";
import StarBorder from "@/components/StarBorder";
import Image from "next/image";
import Link from "next/link";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";

export default function HeaderOverlay() {
  const t = useTranslations("Header");

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="pointer-events-auto">
            <Link href="#home" className="inline-flex items-center gap-3" aria-label={t("homeAria")}>
              <Image
                src="/signature/image.png"
                alt={t("signatureAlt")}
                width={140}
                height={40}
                priority
                className="h-8 w-auto md:h-10 object-contain drop-shadow"
              />
            </Link>
          </div>

          {/* Actions */}
          <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
            {/* CV */}
            <Link href="/signature/ThibaultCauche.pdf" target="_blank" aria-label={t("cvAria")}>
              <button className="btn-cv btn-cv--sweep" title={t("cvTitle")} aria-label={t("cvAria")}>
                {/* <1450px : 'CV' / ≥1450px : libellé long */}
                <span className="block min-[1450px]:hidden">{t("cvShort")}</span>
                <span className="hidden min-[1450px]:block">{t("cvLong")}</span>
              </button>
            </Link>

            {/* Me contacter (icône) */}
            <Link href="#contact" className="min-[1450px]:hidden" title={t("contact")} aria-label={t("contact")}>
              <button
                className="h-[38px] w-[38px] rounded-full bg-white text-[#FF4FCA] shadow-md border border-white/60
                           flex items-center justify-center hover:shadow-lg hover:bg-white/90 transition"
              >
                <Send className="h-5 w-5" />
              </button>
            </Link>

            {/* Me contacter (StarBorder) */}
            <Link href="#contact" className="hidden min-[1450px]:block" aria-label={t("contact")}>
              <StarBorder as="span" color="#FF4FCA" speed="3s" thickness={8} className="select-none" data-label={t("contact")}>
                {t("contact")}
              </StarBorder>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
