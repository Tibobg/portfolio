"use client";

import React from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { GraduationCap, Briefcase } from "lucide-react";
import type { Variants } from "framer-motion";
import GlassBlock from "@/components/GlassBlock";

// --- Types
interface Entry {
  title: string;
  place?: string;
  city?: string;
  years?: string;
  details?: string[];
}

// --- Demo data (remplace avec tes vraies données)
const studies: Entry[] = [
  {
    title: "Master Développement Web",
    place: "Ynov Bordeaux",
    years: "2023 – 2025",
    details: [
      "Formation d’expertise centrée sur le développement web, l’architecture logicielle et le cloud",
      "Approfondissement des compétences en intégration et déploiement continu (CI/CD)",
      "Mise en œuvre d’applications modernes avec séparation front-end / back-end et services cloud",
      "Initiation à la gestion de projets IT, aux méthodologies de tests et aux pratiques DevOps",
      "Approche orientée innovation, performance et qualité logicielle",
    ],
  },
  {
    title: "Master 1 Architecture Logicielle & Systèmes d’Information",
    place: "3iL Limoges",
    years: "2022",
    details: [
      "Approfondissement des architectures logicielles et des systèmes d’information",
      "Découverte des pratiques DevOps, CI/CD et automatisation du déploiement",
      "Introduction à la gestion de projets numériques et à la modélisation UML",
      "Étude des technologies cloud, du Big Data et des solutions d’automatisation",
      "Approche centrée sur la qualité du code, la sécurité et la performance",
    ],
  },
  {
    title: "Bachelor Développement Logiciel & Web",
    place: "3iL Limoges",
    years: "2021 – 2022",
    details: [
      "Conception et développement d’applications web modernes en environnement full-stack",
      "Création d’interfaces réactives et accessibles selon les bonnes pratiques UX/UI",
      "Mise en place et sécurisation d’API et de bases de données relationnelles",
      "Introduction aux outils DevOps, à la gestion de versions avec Git et aux méthodologies agiles",
      "Approche globale centrée sur la qualité du code et l’expérience utilisateur",
    ],
  },
  {
    title: "Prépa Intégrée École d’Ingénieur",
    place: "3iL Limoges",
    years: "2018 – 2021",
    details: [
      "Formation pluridisciplinaire alliant sciences, mathématiques et informatique",
      "Apprentissage des bases du développement (algorithmique, C, Java, Python, web)",
      "Introduction aux architectures réseaux, à la modélisation orientée objet et à la conception logicielle",
      "Approfondissement des compétences en communication, culture scientifique et stratégie d’entreprise",
      "Stage en entreprise et projets interdisciplinaires favorisant la mise en pratique des connaissances",
    ],
  },
];

const jobs: Entry[] = [
  {
    title: "Alternant ingénieur d’études et de développement",
    place: "IMH Niort",
    years: "2023 – 2025",
    details: ["Participation au développement d’applications modulaires basées sur une architecture microservices", "Mise en place de tableaux de bord pour le suivi et l’analyse des performances des systèmes", "Automatisation des déploiements et intégration continue via des pipelines CI/CD"]
  },
  {
    title: "Alternant développeur front-end / designer",
    place: "LENRA La Rochelle",
    years: "2021 – 2022",
    details: ["Conception et développement d’un site e-commerce complet, de la maquette au déploiement", "Création d’interfaces modernes et intuitives en collaboration avec l’équipe design", "Optimisation de l’expérience utilisateur et mise en ligne du projet final"],
  },
  {
    title: "CDD Réseau & architecture informatique",
    place: "Léa Nature Périgny",
    years: "Juillet - Août 2021",
    details: ["Maintenance et amélioration des outils internes basés sur une architecture microservices", "Mise en place d’outils de suivi technique et de logs centralisés", "Déploiement automatisé et supervision via pipelines CI/CD"]
  },
  {
    title: "Stagiaire développeur d'application",
    place: "Léa Nature Périgny",
    years: "Mai - Juillet 2021",
    details: ["Amélioration d’une application interne en concevant de nouvelles pages pour en faciliter l’usage par les employés", "Découverte du développement applicatif au sein d’une équipe technique expérimentée", "Première approche des concepts de microservices et des outils de CI/CD"]
  },
];

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

// --- Small helpers
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

function TimelineItem({ entry, index }: { entry: Entry; index: number }) {
  return (
    <motion.li
      variants={fadeUp}
      initial="hidden"   // <- on remet l'état initial
      animate="show"     // <- animé à chaque (re)mount
      exit="hidden"      // <- si tu veux une petite sortie
      className="group relative grid grid-cols-[1.25rem_1fr] gap-4 md:grid-cols-[1.5rem_1fr]"
    >

      {/* Line + dot */}
      <div className="relative flex h-full w-5 md:w-6 items-start justify-center">
        {/* vertical line */}
        <span className="absolute left-1/2 top-2 -translate-x-1/2 h-full w-px bg-white/15" aria-hidden />
        {/* dot */}
        <span
          className="relative z-10 mt-1 h-3 w-3 md:h-3.5 md:w-3.5 rounded-full bg-white/80 ring-4 ring-white/10 group-hover:bg-white"
          aria-hidden
        />
      </div>

      {/* Card */}
      <GlassBlock variant="base" className="p-4 md:p-5 transition-transform duration-300 group-hover:translate-x-0.5">
        <div className="flex flex-wrap items-baseline gap-2">
          <h3 className="text-base md:text-lg font-semibold tracking-tight text-white">{entry.title}</h3>
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
  const [mode, setMode] = React.useState<"pro" | "etudes">("pro");
  const items = mode === "pro" ? jobs : studies;

  return (
    <section id="parcours" className="relative overflow-hidden py-12 md:py-20">
       <div className="mx-auto max-w-5xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="relative mb-6 md:mb-12 max-[600px]:mb-0 "
        >
          <h2 className="text-center text-3xl md:text-4xl font-bold tracking-tight text-white max-[600px]:mb-2">
            PARCOURS
          </h2>

          <LayoutGroup>
            <div
  className="absolute right-0 top-1/2 -translate-y-1/2 
             flex flex-wrap items-center justify-center gap-2 
             rounded-full border border-white/10 bg-white/[0.04] p-1
             max-[600px]:static max-[600px]:mt-8 
             max-[600px]:mx-auto max-[600px]:w-fit max-[600px]:px-2"
>
              {/* Animated pill that adapts to the selected button size */}
              <button
                onClick={() => setMode('pro')}
                className="relative rounded-full px-3.5 py-1.5 text-sm"
                aria-pressed={mode === 'pro'}
              >
                {mode === 'pro' && (
                  <motion.span
                    layoutId="mode-pill"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    className="absolute inset-0 rounded-full bg-white"
                  />
                )}
                <span className={`relative z-10 inline-flex items-center gap-2 font-medium ${
                  mode === 'pro' ? 'text-[#121212]' : 'text-white/75 hover:text-white'
                }`}>
                  <Briefcase className="h-4 w-4" /> Pro
                </span>
              </button>

              <button
                onClick={() => setMode('etudes')}
                className="relative rounded-full px-3.5 py-1.5 text-sm"
                aria-pressed={mode === 'etudes'}
              >
                {mode === 'etudes' && (
                  <motion.span
                    layoutId="mode-pill"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    className="absolute inset-0 rounded-full bg-white"
                  />
                )}
                <span className={`relative z-10 inline-flex items-center gap-2 font-medium ${
                  mode === 'etudes' ? 'text-[#121212]' : 'text-white/75 hover:text-white'
                }`}>
                  <GraduationCap className="h-4 w-4" /> Études
                </span>
              </button>
            </div>
          </LayoutGroup>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.ol
            key={mode}
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={listVariants}
            transition={{ duration: 0.25 }}
            className="relative ml-1.5 md:ml-2 grid gap-6 md:gap-8"
          >
            {items.map((entry, i) => (
              <TimelineItem key={i} entry={entry} index={i} />
            ))}
          </motion.ol>
        </AnimatePresence>
      </div>
    </section>
  );
}