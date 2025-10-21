"use client";

type Ball = {
  x: string;   // "50%", "10%"
  y: string;   // "60%", "-5%"
  w?: string;  // "80vmax"
  h?: string;  // si non fourni = w
  color?: string;   // "#8b5cf6"
  opacity?: number; // 0..1
  blur?: string;    // "100px"
  speed?: string;   // "22s"
};

export default function GlobalBlobs({
  balls = [
    { x: "50%", y: "-5%",  w: "80vmax", color: "#8b5cf6", opacity: 0.24, blur: "110px", speed: "22s" },
    { x: "12%", y: "65%",  w: "60vmax", color: "#22d3ee", opacity: 0.20, blur: "95px",  speed: "24s" },
    { x: "88%", y: "60%",  w: "56vmax", color: "#f43f5e", opacity: 0.18, blur: "90px",  speed: "26s" },
  ],
  className = "",
}: { balls?: Ball[]; className?: string }) {
  return (
    <div className={`fixed inset-0 -z-10 pointer-events-none ${className}`} aria-hidden>
      {balls.map((b, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: b.x,
            top: b.y,
            width: b.w ?? "70vmax",
            height: b.h ?? b.w ?? "70vmax",
            transform: "translate(-50%,-50%)",
            // 70% -> 60% pour un coeur lumineux plus dense
            background: `radial-gradient(circle at center, ${b.color ?? "#8b5cf6"} 0%, transparent 60%)`,
            // blur plus faible -> halo plus net
            filter: `blur(${b.blur ?? "80px"})`,
            // + d’opacité par défaut
            opacity: b.opacity ?? 0.32,
            animation: `gb-breathe ${b.speed ?? "20s"} ease-in-out infinite`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes gb-breathe {
          0%,100% { transform: translate(-50%,-50%) scale(1); }
          50%     { transform: translate(-50%,-50%) scale(1.04); }
        }
        @media (prefers-reduced-motion: reduce) { span { animation: none !important; } }
      `}</style>
    </div>
  );
}
