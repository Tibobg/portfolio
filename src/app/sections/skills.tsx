"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence, LayoutGroup, type Variants } from "framer-motion";
import { Icon } from "@iconify/react";
import {
  CircleCheck, Wrench, Code2, Boxes,
  Infinity, Cloud, ShieldCheck,
  PenTool, CircuitBoard, Network,
  GitBranch, Eye, TestTubes, ClipboardList
} from "lucide-react";

import { useTranslations } from "next-intl";

type Category = "languages" | "frameworks" | "tools" | "other";
type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;
type LevelCode = "beginner" | "intermediate" | "advanced" | "expert";

interface Skill {
  name: string;
  logo?: string;
  level?: LevelCode;
  // Optionnel: pour les concepts (UI/UX, CI/CD...) afin d'avoir l'icône correcte
  tag?: "uiux" | "architecture" | "microservices" | "api" | "cicd" | "security" | "a11y_seo" | "testing" | "pm" | "devops" | "cloud" | "agile";
}

const CATEGORIES_META: { key: Category; icon: IconType; iconFallback?: boolean }[] = [
  { key: "languages",  icon: Code2 },
  { key: "frameworks", icon: Boxes },
  { key: "tools",      icon: Wrench },
  { key: "other",      icon: CircleCheck }
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.35, ease: (t: number) => 1 - Math.pow(1 - t, 2) } }
};

export default function SkillsSection() {
  const t = useTranslations("Skills");

  // 1) Titre, catégories, niveaux, CTA depuis messages
  const title = t("title");
  const categories = t.raw("categories") as Record<Category, string>;
  const levelLabels = t.raw("levels") as Record<LevelCode, string>;
  const ctaGithub = t("ctaGithub");

  // 2) Items par catégorie depuis messages
  const items = t.raw("items") as Record<Category, Skill[]>;
  const [active, setActive] = React.useState<Category>("languages");
  const filtered = (items?.[active] ?? []) as Skill[];

  return (
    <section id="skills" className="relative">
      <div className="mx-auto max-w-5xl px-4">
        <div className="relative mb-8 flex flex-col items-center gap-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            {title}
          </h2>

          <LayoutGroup>
            <div className="flex flex-wrap justify-center items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] p-1">
              {CATEGORIES_META.map(({ key, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActive(key)}
                  className="relative rounded-full px-3.5 py-1.5 text-sm"
                  aria-pressed={active === key}
                >
                  {active === key && (
                    <motion.span
                      layoutId="skills-pill"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      className="absolute inset-0 rounded-full bg-white"
                    />
                  )}
                  <span
                    className={`relative z-10 inline-flex items-center gap-2 font-medium ${
                      active === key ? "text-[#121212]" : "text-white/75 hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4" /> {categories?.[key] ?? key}
                  </span>
                </button>
              ))}
            </div>
          </LayoutGroup>
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div
            key={active}
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={fadeUp}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6"
          >
            {filtered.map((skill) => (
              <SkillCard key={`${skill.name}-${skill.logo ?? "n"}`} skill={skill} levelLabels={levelLabels} />
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 flex justify-center">
          <a
            href="https://github.com/Tibobg"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cv btn-cv--sweep"
          >
            <span>{ctaGithub}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function SkillCard({ skill, levelLabels }: { skill: Skill; levelLabels: Record<LevelCode, string> }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur-sm"
    >
      <div className="flex items-center gap-3">
        {/* ICON WRAPPER */}
        <div className="relative h-12 w-12 md:h-[60px] md:w-[60px] shrink-0 rounded-xl bg-white/5 ring-1 ring-white/10 flex items-center justify-center">
          {renderSkillIcon(skill)}
        </div>

        {/* TEXT */}
        <div className="min-w-0 max-w-[11rem]">
          <div className="font-semibold text-white leading-tight">
            <SkillName text={skill.name} max={18} min={11} />
          </div>
          {skill.level && (
            <p className="text-xs text-white/60 mt-0.5 capitalize">
              {levelLabels?.[skill.level] ?? skill.level}
            </p>
          )}
        </div>
      </div>

      <div className="pointer-events-none absolute -right-10 -bottom-10 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
    </motion.div>
  );
}

function renderSkillIcon(skill: Skill) {
  // Icônes "simple-icons" spécifiques
  if (skill.name === "Vite")   return <Icon icon="simple-icons:vite"   width="40" color="#646CFF" />;
  if (skill.name === "Trello") return <Icon icon="simple-icons:trello" width="40" color="#0079BF" />;
  if (skill.name === "Jira")   return <Icon icon="simple-icons:jira"   width="40" color="#0052CC" />;
  if (skill.name === "pnpm")   return <Icon icon="simple-icons:pnpm"   width="40" color="#F69220" />;

  // Concepts "other" via tag (stable, indépendant de la langue)
  if (skill.tag) {
    switch (skill.tag) {
      case "uiux":         return <PenTool size={32} className="text-pink-400" />;
      case "architecture": return <CircuitBoard size={32} className="text-indigo-400" />;
      case "microservices":return <Network size={32} className="text-emerald-400" />;
      case "cicd":         return <GitBranch size={32} className="text-amber-400" />;
      case "a11y_seo":     return <Eye size={32} className="text-sky-400" />;
      case "testing":      return <TestTubes size={32} className="text-purple-400" />;
      case "pm":           return <ClipboardList size={32} className="text-teal-300" />;
      case "devops":       return <Infinity size={32} className="text-fuchsia-400" />;
      case "cloud":        return <Cloud size={32} className="text-sky-400" />;
      case "security":     return <ShieldCheck size={32} className="text-emerald-400" />;
      default:             return <Boxes size={32} className="text-gray-400" />;
    }
  }

  // Logo image si fourni
  if (skill.logo) {
    return <Image src={skill.logo} alt={skill.name} fill sizes="48px" className="object-contain p-1.5" />;
  }

  // Fallback
  return <span className="text-white/70 text-sm font-medium">{skill.name[0]}</span>;
}

function SkillName({ text, max = 18, min = 11, step = 0.5, className = "" }: { text: string; max?: number; min?: number; step?: number; className?: string; }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const words = text.trim().split(/\s+/);
  const count = words.length;

  const fit = React.useCallback(() => {
    const el = ref.current;
    if (!el) return;
    let size = max;
    el.style.fontSize = `${size}px`;
    el.style.lineHeight = "1.15";
    el.style.whiteSpace = count === 1 ? "nowrap" : "normal";
    const parent = el.parentElement as HTMLElement | null;
    const limitW = parent?.clientWidth ?? el.clientWidth;
    const getLineCount = () => {
      const lh = parseFloat(getComputedStyle(el).lineHeight || "0") || 0;
      return lh ? Math.round(el.scrollHeight / lh) : 1;
    };
    let guard = 100;
    while (size > min && (el.scrollWidth > limitW || (count > 1 && getLineCount() > 2)) && guard-- > 0) {
      size -= step;
      el.style.fontSize = `${size}px`;
    }
  }, [max, min, step, count]);

  React.useEffect(() => {
    fit();
    const ro = new ResizeObserver(fit);
    const parent = ref.current?.parentElement;
    if (parent) ro.observe(parent);
    return () => ro.disconnect();
  }, [fit, text]);

  if (count === 1) {
    return <span ref={ref} className={className} style={{ display: "block" }}>{text}</span>;
  }
  if (count === 2) {
    return (
      <span ref={ref} className={className} style={{ display: "inline-block", whiteSpace: "normal" }}>
        {words[0]}<wbr /> {words[1]}
      </span>
    );
  }
  const grouped = words.slice(0, -1).join("\u00A0");
  const last = words[words.length - 1];
  return (
    <span ref={ref} className={className} style={{ display: "inline-block", whiteSpace: "normal" }}>
      {grouped}<wbr /> {last}
    </span>
  );
}
