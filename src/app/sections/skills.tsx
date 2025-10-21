"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import type { Variants } from "framer-motion";
import { Icon } from '@iconify/react';
import {
  CircleCheck, Wrench, Code2, Boxes,
  Workflow, Infinity, Cloud, ShieldCheck,
  PenTool, CircuitBoard, Network,
  GitBranch, Eye, TestTubes, ClipboardList,
} from "lucide-react";

type Category = "langages" | "frameworks" | "outils" | "autres";
type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

interface Skill {
  name: string;
  logo?: string;
  level?: "débutant" | "intermédiaire" | "avancé" | "expert";
  category: Category;
}

const ALL_SKILLS: Skill[] = [
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", level: "avancé", category: "langages" },
  { name: "Javascript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", level: "intermédiaire", category: "langages" },
  { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", level: "avancé", category: "langages" },
  { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", level: "avancé", category: "langages" },
  { name: "SQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", level: "intermédiaire", category: "langages" },
  { name: "C#", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg", level: "intermédiaire", category: "langages" },
  { name: "Dart", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg", level: "avancé", category: "langages" },
  { name: "JSON", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/json/json-original.svg", level: "intermédiaire", category: "langages" },
  { name: "Bash", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg", level: "avancé", category: "langages" },

  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", level: "avancé", category: "frameworks" },
  { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", level: "intermédiaire", category: "frameworks" },
  { name: "Nest.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg", level: "intermédiaire", category: "frameworks" },
  { name: "React Native", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", level: "intermédiaire", category: "frameworks" },
  { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", level: "avancé", category: "frameworks" },
  { name: "Flutter", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", level: "avancé", category: "frameworks" },
  { name: "Prisma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg", level: "intermédiaire", category: "frameworks" },
  { name: "Vite", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/vite.svg", level: "avancé", category: "frameworks" },
  { name: "Vue.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg", level: "intermédiaire", category: "frameworks" },

  { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", level: "avancé", category: "outils" },
  { name: "VS Code", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", level: "avancé", category: "outils" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", level: "intermédiaire", category: "outils" },
  { name: "Postman", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg", level: "intermédiaire", category: "outils" },
  { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", level: "avancé", category: "outils" },
  { name: "Elasticsearch", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg", level: "intermédiaire", category: "outils" },
  { name: "Notion", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/notion.svg", level: "avancé", category: "outils" },
  { name: "Trello", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/trello.svg", level: "avancé", category: "outils" },
  { name: "Jira", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/jira.svg", level: "intermédiaire", category: "outils" },
  { name: "pnpm", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/pnpm.svg", level: "avancé", category: "outils" },
  { name: "npm", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg", level: "avancé", category: "outils" },
  { name: "Visual Studio", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg", level: "intermédiaire", category: "outils" },

  { name: "Méthodologies Agile/Scrum", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/scrumalliance.svg", level: "intermédiaire", category: "autres" },
  { name: "UI/UX Design", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/devops.svg", level: "avancé", category: "autres" },
  { name: "DevOps", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/devops.svg", level: "intermédiaire", category: "autres" },
  { name: "Architecture logicielle", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/archlinux.svg", level: "intermédiaire", category: "autres" },
  { name: "Microservices", logo: "/skills/Microservices.svg", level: "intermédiaire", category: "autres" },
  { name: "API REST", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/postman.svg", level: "intermédiaire", category: "autres" },
  { name: "CI/CD", logo: "/skills/cicd.svg", level: "intermédiaire", category: "autres" },
  { name: "Sécurité & Authentification", logo: "/skills/Sécurite.svg", level: "avancé", category: "autres" },
  { name: "SEO & Accessibilité", logo: "/skills/Accessibilite.svg", level: "avancé", category: "autres" },
  { name: "TU & TA", logo: "/skills/Tests.svg", level: "avancé", category: "autres" },
  { name: "Gestion de projet", logo: "/skills/Gestion.svg", level: "avancé", category: "autres" },
];

const CATEGORIES: { key: Category; label: string; icon: IconType }[] = [
  { key: "langages", label: "Langages", icon: Code2 },
  { key: "frameworks", label: "Frameworks", icon: Boxes },
  { key: "outils", label: "Outils", icon: Wrench },
  { key: "autres", label: "Autres", icon: CircleCheck },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: (t: number) => 1 - Math.pow(1 - t, 2),
    },
  },
};

export default function SkillsSection() {
  const [active, setActive] = React.useState<Category>("langages");
  const filtered = React.useMemo(() => ALL_SKILLS.filter((s) => s.category === active), [active]);

  return (
    <section id="competences" className="relative">
      <div className="mx-auto max-w-5xl px-4">
        <div className="relative mb-8 flex flex-col items-center gap-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">COMPÉTENCES</h2>

          <LayoutGroup>
            <div className="flex flex-wrap justify-center items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] p-1">
              {CATEGORIES.map(({ key, label, icon: Icon }) => (
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
                    <Icon className="h-4 w-4" /> {label}
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
              <SkillCard key={skill.name} skill={skill} />
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
                <span>Voir mon GitHub</span>
            </a>
        </div>
      </div>
    </section>
  );
}

function AutoFitText({
  children,
  max = 18,   // taille max en px
  min = 11,   // taille mini en px
  step = 0.5, // pas de réduction
  className = "",
}: {
  children: React.ReactNode;
  max?: number;
  min?: number;
  step?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);

  const fit = React.useCallback(() => {
    const el = ref.current;
    if (!el) return;

    // On force une ligne
    el.style.whiteSpace = "nowrap";

    // On repart du max à chaque mesure
    let size = max;
    el.style.fontSize = `${size}px`;

    const parent = el.parentElement as HTMLElement | null;
    const limit = parent?.clientWidth ?? el.clientWidth;

    // Réduit tant que ça dépasse et qu'on n'a pas atteint min
    while (size > min && el.scrollWidth > limit) {
      size -= step;
      el.style.fontSize = `${size}px`;
    }
  }, [max, min, step]);

  React.useEffect(() => {
    fit();
    const ro = new ResizeObserver(fit);
    const parent = ref.current?.parentElement;
    if (parent) ro.observe(parent);
    return () => ro.disconnect();
  }, [fit, children]);

  return (
    <span ref={ref} className={className} style={{ display: "block" }}>
      {children}
    </span>
  );
}
function SkillName({
  text,
  max = 18,
  min = 11,
  step = 0.5,
  className = "",
}: {
  text: string;
  max?: number;
  min?: number;
  step?: number;
  className?: string;
}) {
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
    while (
      size > min &&
      (el.scrollWidth > limitW || (count > 1 && getLineCount() > 2)) &&
      guard-- > 0
    ) {
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
    // 1 mot -> une ligne + autofit
    return (
      <span ref={ref} className={className} style={{ display: "block" }}>
        {text}
      </span>
    );
  }

  if (count === 2) {
    // 2 mots -> retour autorisé après le 1er
    return (
      <span
        ref={ref}
        className={className}
        style={{ display: "inline-block", whiteSpace: "normal" }}
      >
        {words[0]}
        <wbr /> {words[1]}
      </span>
    );
  }

  // 3+ mots -> on regroupe tout sauf le dernier avec des NBSP pour coller le "&"
  const grouped = words.slice(0, -1).join("\u00A0"); // empêche les coupures internes (inclut le “&”)
  const last = words[words.length - 1];

  return (
    <span
      ref={ref}
      className={className}
      style={{ display: "inline-block", whiteSpace: "normal" }}
    >
      {grouped}
      <wbr /> {last}
    </span>
  );
}

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur-sm"
    >
      <div className="flex items-center gap-3">
        {/* ICON WRAPPER: give it real size */}
        <div className="relative h-12 w-12 md:h-[60px] md:w-[60px] shrink-0 rounded-xl bg-white/5 ring-1 ring-white/10 flex items-center justify-center">
  {/* SimpleIcons colorés via Iconify */}
  {skill.name === "Vite" ? (
    <Icon icon="simple-icons:vite" width="40" color="#646CFF" />
  ) : skill.name === "Trello" ? (
    <Icon icon="simple-icons:trello" width="40" color="#0079BF" />
  ) : skill.name === "Jira" ? (
    <Icon icon="simple-icons:jira" width="40" color="#0052CC" />
  ) : skill.name === "pnpm" ? (
    <Icon icon="simple-icons:pnpm" width="40" color="#F69220" />
  ) : skill.category === "autres" ? (
    // icônes lucide pour les concepts
    getOtherIcon(skill.name)
  ) : skill.logo ? (
    // logos classiques en image
    <Image src={skill.logo} alt={skill.name} fill sizes="48px" className="object-contain p-1.5" />
  ) : (
    <span className="text-white/70 text-sm font-medium">{skill.name[0]}</span>
  )}
</div>


        {/* TEXT: wrap instead of truncate */}
        <div className="min-w-0 max-w-[11rem]">
          <div className="font-semibold text-white leading-tight">
            <SkillName text={skill.name} max={18} min={11} />
          </div>
          {skill.level && (
            <p className="text-xs text-white/60 mt-0.5 capitalize">{skill.level}</p>
          )}
        </div>
      </div>

      <div className="pointer-events-none absolute -right-10 -bottom-10 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
    </motion.div>
  );
}
// Map icônes pour la catégorie "autres"
function getOtherIcon(name: string) {
  const n = name.toLowerCase();

  if (n.includes("ui") || n.includes("ux")) {
    return <PenTool size={32} className="text-pink-400" />;
  }
  if (n.includes("architecture")) {
    return <CircuitBoard size={32} className="text-indigo-400" />;
  }
  if (n.includes("microservices")) {
    return <Network size={32} className="text-emerald-400" />;
  }
  if (n.includes("ci/cd") || n.includes("ci\\cd") || n.includes("ci-cd")) {
    return <GitBranch size={32} className="text-amber-400" />;
  }
  if (n.includes("seo") || n.includes("accessibil")) {
    return <Eye size={32} className="text-sky-400" />;
  }
  if (n.includes("tu")) {
    return <TestTubes size={32} className="text-purple-400" />;
  }
  if (n.includes("gestion") || n.includes("projet")) {
    return <ClipboardList size={32} className="text-teal-300" />;
  }

  // fallbacks possibles déjà utilisés ailleurs
  if (n.includes("agile")) return <Workflow size={32} className="text-blue-400" />;
  if (n.includes("devops")) return <Infinity size={32} className="text-fuchsia-400" />;
  if (n.includes("cloud"))  return <Cloud size={32} className="text-sky-400" />;
  if (n.includes("sécur") || n.includes("auth")) return <ShieldCheck size={32} className="text-emerald-400" />;

  return <Boxes size={32} className="text-gray-400" />;                     // défaut
}


