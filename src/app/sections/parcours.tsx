"use client";

import React from "react";
import { motion, AnimatePresence, LayoutGroup, type Variants } from "framer-motion";
import { GraduationCap, Briefcase } from "lucide-react";
import GlassBlock from "@/components/GlassBlock";
import { useTranslations, useLocale } from "next-intl";

type Entry = {
  title: string;
  place?: string;
  city?: string;
  years?: string;
  details?: string[];
};

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } }
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
};

function TimelineItem({ entry }: { entry: Entry }) {
  return (
    <motion.li
      variants={fadeUp}
      initial="hidden"
      animate="show"
      exit="hidden"
      className="group relative grid grid-cols-[1.25rem_1fr] gap-4 md:grid-cols-[1.5rem_1fr]"
    >
      {/* Line + dot */}
      <div className="relative flex h-full w-5 md:w-6 items-start justify-center">
        <span className="absolute left-1/2 top-2 -translate-x-1/2 h-full w-px bg-white/15" aria-hidden />
        <span className="relative z-10 mt-1 h-3 w-3 md:h-3.5 md:w-3.5 rounded-full bg-white/80 ring-4 ring-white/10 group-hover:bg-white" aria-hidden />
      </div>

      {/* Card */}
      <GlassBlock variant="base" className="p-4 md:p-5 transition-transform duration-300 group-hover:translate-x-0.5">
        <div className="flex flex-wrap items-baseline gap-2">
          <h3 className="text-base md:text-lg font-semibold tracking-tight text-white">
            {entry.title}
          </h3>
          {entry.years && (
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] md:text-xs text-white/70">
              {entry.years}
            </span>
          )}
        </div>

        {(entry.place || entry.city) && (
          <p className="mt-1 text-sm text-white/70">{entry.place || entry.city}</p>
        )}

        {entry.details && entry.details.length > 0 && (
          <ul className="mt-2 list-disc pl-4 text-sm leading-[1.75] text-white/80">
            {entry.details.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        )}
      </GlassBlock>
    </motion.li>
  );
}

export default function ParcoursSection() {
  const t = useTranslations("Timeline");
  const locale = useLocale();
  const [mode, setMode] = React.useState<"pro" | "studies">("pro");

  // ⬇️ Données brutes depuis messages avec des noms explicites
  const work = (t.raw("workEntries") as Entry[]) ?? [];
  const edu  = (t.raw("educationEntries") as Entry[]) ?? [];

  const items: Entry[] = mode === "pro" ? work : edu;

  return (
    <section id="timeline" className="relative overflow-hidden py-12 md:py-20">
      <div className="mx-auto max-w-5xl px-4">
        {/* Header + switch */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="relative mb-6 md:mb-12 max-[600px]:mb-0"
        >
          <h2 className="text-center text-3xl md:text-4xl font-bold tracking-tight text-white max-[600px]:mb-2">
            {t("title")}
          </h2>

          <LayoutGroup>
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 
                         flex flex-wrap items-center justify-center gap-2 
                         rounded-full border border-white/10 bg-white/[0.04] p-1
                         max-[600px]:static max-[600px]:mt-8 
                         max-[600px]:mx-auto max-[600px]:w-fit max-[600px]:px-2"
            >
              {/* Work */}
              <button
                onClick={() => setMode("pro")}
                className="relative rounded-full px-3.5 py-1.5 text-sm"
                aria-pressed={mode === "pro"}
                aria-label={t("proLabel")}
                title={t("proLabel")}
              >
                {mode === "pro" && (
                  <motion.span
                    layoutId="mode-pill"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    className="absolute inset-0 rounded-full bg-white"
                  />
                )}
                <span
                  className={`relative z-10 inline-flex items-center gap-2 font-medium ${
                    mode === "pro" ? "text-[#121212]" : "text-white/75 hover:text-white"
                  }`}
                >
                  <Briefcase className="h-4 w-4" /> {t("proLabel")}
                </span>
              </button>

              {/* Studies (education) */}
              <button
                onClick={() => setMode("studies")}
                className="relative rounded-full px-3.5 py-1.5 text-sm"
                aria-pressed={mode === "studies"}
                aria-label={t("studiesLabel")}
                title={t("studiesLabel")}
              >
                {mode === "studies" && (
                  <motion.span
                    layoutId="mode-pill"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    className="absolute inset-0 rounded-full bg-white"
                  />
                )}
                <span
                  className={`relative z-10 inline-flex items-center gap-2 font-medium ${
                    mode === "studies" ? "text-[#121212]" : "text-white/75 hover:text-white"
                  }`}
                >
                  <GraduationCap className="h-4 w-4" /> {t("studiesLabel")}
                </span>
              </button>
            </div>
          </LayoutGroup>
        </motion.div>

        {/* List */}
        <AnimatePresence mode="wait">
          <motion.ol
            key={mode + locale}
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={listVariants}
            transition={{ duration: 0.25 }}
            className="relative ml-1.5 md:ml-2 grid gap-6 md:gap-8"
          >
            {items.map((entry, i) => (
              <TimelineItem key={i} entry={entry} />
            ))}
          </motion.ol>
        </AnimatePresence>
      </div>
    </section>
  );
}
