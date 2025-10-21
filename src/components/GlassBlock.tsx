// components/GlassBlock.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

type Variants = "maquette" | "base" | "soft";

type GlassProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: Variants;
};

export default function GlassBlock({
  className,
  children,
  variant = "maquette",
  ...rest
}: GlassProps) {
  const base = "relative rounded-2xl backdrop-blur-xl shadow-lg shadow-black/10";

  const variants = {
    maquette: cn(
      "border border-white/20 bg-white/5",
      "before:absolute before:inset-0 before:rounded-2xl before:pointer-events-none",
      "before:bg-[radial-gradient(120%_60%_at_0%_0%,rgba(255,255,255,0.18),transparent_60%),radial-gradient(120%_60%_at_100%_0%,rgba(255,255,255,0.10),transparent_60%)]",
      "after:absolute after:inset-0 after:rounded-2xl after:pointer-events-none after:ring-1 after:ring-inset after:ring-white/10"
    ),
    base: cn(
      "border border-white/15 bg-white/6",
      "after:absolute after:inset-0 after:rounded-2xl after:pointer-events-none after:ring-1 after:ring-inset after:ring-white/10"
    ),
    soft: "border border-white/10 bg-white/5",
  } as const;

  return (
    <div className={cn(base, variants[variant], className)} {...rest}>
      {children}
    </div>
  );
}
