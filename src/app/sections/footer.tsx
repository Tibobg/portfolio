"use client";

import React from "react";
import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Footer() {
  const year = new Date().getFullYear();
  const t = useTranslations("Footer");

  return (
    <footer className="relative border-t border-white/10 bg-black/20">
      <div className="mx-auto max-w-5xl px-4 py-10 md:py-12 pb-24 md:pb-17">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1 text-white/80">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <a href="mailto:thibault.cauche@gmail.com" className="hover:underline" aria-label={t("emailAria")}>
                thibault.cauche@gmail.com
              </a>
            </div>
            <p className="text-sm text-white/60">
              © Thibault {year}. {t("rights")}
            </p>
          </div>
          <div className="text-sm text-white/50">
            <p>{t("madeWith")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
