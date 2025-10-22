// components/nav.tsx
"use client";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { Home, User, GraduationCap, Code2, Rocket, Send } from "lucide-react";

// ⬇️ i18n
import { useTranslations } from "next-intl";
import Link from "next/link";

const items = [
  { href: "#home", key: "home", icon: Home },
  { href: "#about", key: "about", icon: User },
  { href: "#timeline", key: "parcours", icon: GraduationCap }, // ou "journey"
  { href: "#skills", key: "skills", icon: Code2 },
  { href: "#projects", key: "projects", icon: Rocket },
  { href: "#contact", key: "contact", icon: Send },
];

export default function Nav() {
  const t = useTranslations("Nav");
  const [mode, setMode] = useState<"hero" | "sidebar">("hero");

  useEffect(() => {
    const hero = document.getElementById("hero");
    let ticking = false;
    const measure = () => {
      if (!hero) return setMode("sidebar");
      const rect = hero.getBoundingClientRect();
      const heroVisible = rect.bottom > 72 && rect.top < window.innerHeight;
      setMode(heroVisible ? "hero" : "sidebar");
    };
    const onScrollOrResize = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        measure();
      });
    };
    measure();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  return (
    <>
      {/* TOPBAR */}
      <AnimatePresence>
        <motion.nav
          key="topbar"
          className={clsx(
            "fixed z-40 left-1/2 -translate-x-1/2",
            "bottom-4 min-[1220px]:top-6 min-[1220px]:bottom-auto",
            mode === "sidebar" ? "min-[1220px]:hidden" : "min-[1220px]:block"
          )}
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
        >
          <motion.div
            layout
            className={clsx(
              "rounded-full bg-white/15 backdrop-blur-xl border border-white/25 shadow-lg",
              "px-3 py-1 min-[1220px]:px-4 min-[1220px]:py-1 max-[359px]:px-2 max-[359px]:py-0.5"
            )}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
          >
            <ul
              className={clsx(
                "flex text-white/90 items-center justify-center",
                "gap-3 text-base min-[1220px]:gap-4 min-[1220px]:text-sm",
                "max-[359px]:gap-2 max-[359px]:text-sm"
              )}
            >
              {items.map((it) => (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    className={clsx(
                      "rounded-full hover:bg-white/20 transition flex items-center justify-center",
                      "h-[44px] w-[44px] p-0 min-[1220px]:h-auto min-[1220px]:w-auto min-[1220px]:px-3 min-[1220px]:py-1.5",
                      "max-[359px]:h-[36px] max-[359px]:w-[36px]"
                    )}
                    title={t(it.key)}
                  >
                    {/* <1220px: icône */}
                    <span className="min-[1220px]:hidden">
                      <it.icon className="h-5 w-5 text-white max-[359px]:h-4 max-[359px]:w-4" strokeWidth={2} />
                    </span>
                    {/* ≥1220px: label */}
                    <span className="hidden min-[1220px]:inline">{t(it.key)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.nav>
      </AnimatePresence>

      {/* SIDEBAR */}
      <AnimatePresence>
        {mode === "sidebar" && (
          <motion.nav
            key="sidebar"
            className={clsx(
              "hidden min-[1220px]:block fixed z-40 left-4 top-1/2 -translate-y-1/2",
              "p-2 rounded-2xl backdrop-blur-xl border border-white/20 shadow-lg bg-white/10"
            )}
            initial={{ opacity: 0, x: -80, scaleY: 0.8 }}
            animate={{ opacity: 1, x: 0, scaleY: 1 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
          >
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{
                hidden: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
                show: { transition: { staggerChildren: 0.05 } },
              }}
              className="flex flex-col gap-2"
            >
              {items.map((it) => (
                <motion.li
                  key={it.href}
                  variants={{ hidden: { opacity: 0, y: 10, scale: 0.95 }, show: { opacity: 1, y: 0, scale: 1 } }}
                >
                  <Link
                    href={it.href}
                    className="group flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-white/20 text-white"
                    title={t(it.key)}
                  >
                    <it.icon className="h-5 w-5 text-white" strokeWidth={2} />
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
