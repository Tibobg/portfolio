"use client";
import { useEffect, useState } from "react";
const SECTIONS = ["hero","about","experience","projects","skills","contact"] as const;

export default function ScrollDots() {
  const [active, setActive] = useState<string>("hero");
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, { threshold: 0.6 });
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="pointer-events-none fixed right-4 top-1/2 z-40 -translate-y-1/2 space-y-3">
      {SECTIONS.map((id) => (
        <a
          key={id}
          href={`#${id}`}
          className="pointer-events-auto block h-2 w-2 rounded-full bg-foreground/30 ring-2 ring-transparent transition hover:bg-foreground/60 focus:outline-none focus:ring-foreground/80"
          style={{ transform: active === id ? "scale(1.6)" : "scale(1)" }}
        />
      ))}
    </div>
  );
}
