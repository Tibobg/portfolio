"use client";
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import manifest from "@/../public/photos/manifest.json";
import GlassBlock from "@/components/GlassBlock";
import Link from "next/link";

const PHOTO_URLS = (manifest as string[]).map((n) => `/photos/${n}`);

// ---------- Types ----------
type PiledPhoto = { id: string; url: string; rot: number; x: number; y: number; z: number };
type FlyingPhoto = { id: string; url: string; from: "left" | "right"; tx: number; ty: number; trot: number };
type BackdropPhoto = { id: string; url: string; x: number; y: number; rot: number; z: number };

// ---------- Utils ----------
const rand = (min: number, max: number) => Math.random() * (max - min) + min;
const uid = (p = "id") => `${p}_${Math.random().toString(36).slice(2, 9)}`;

// ---------- Polaroid ----------
function PolaroidImg({ src, alt, width, className }: { src: string; alt: string; width: number; className?: string }) {
  const frame = Math.max(6, Math.round(width * 0.05));
  const frameBottom = Math.max(frame * 2, Math.round(width * 0.18));
  return (
    <div className={className ?? ""} style={{ width }}>
      <div className="relative rounded-xl bg-white shadow-2xl" style={{ padding: frame, paddingBottom: frameBottom }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="block w-full h-auto object-cover" draggable={false} />
      </div>
    </div>
  );
}

// ---------- Pile + Vol ----------
function PhotoPile({ photos, className = "" }: { photos: string[]; className?: string }) {
  const arrivedRef = useRef<Set<string>>(new Set());
  const lastUrlRef = useRef<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [piled, setPiled] = useState<PiledPhoto[]>([]);
  const [flying, setFlying] = useState<FlyingPhoto[]>([]);
  const [vw, setVw] = useState(0);
  const [vh, setVh] = useState(0);

  const isMobile = vw < 768;

  const POLAROID_W   = isMobile ? 140 : 220;
  const BACKDROP_W   = isMobile ? 120 : 180;
  const BACKDROP_COUNT = isMobile ? 18  : 30;

  useLayoutEffect(() => {
    const onResize = () => { setVw(window.innerWidth); setVh(window.innerHeight); };
    onResize(); window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!photos.length || vw === 0 || vh === 0) return;

    const pickTarget = () => {
      const tx = rand(vw * 0.08, vw * 0.92);
      const bandTop    = isMobile ? Math.min(vh * 0.24, 180) : Math.min(vh * 0.30, 260);
      const bandBottom = isMobile ? Math.min(vh * 0.40, 300) : Math.min(vh * 0.58, 460);
      return { tx, ty: rand(bandTop, bandBottom) };
    };

    const tick = () => {
      let url = photos[Math.floor(Math.random() * photos.length)];
      if (photos.length > 1 && url === lastUrlRef.current) url = photos[Math.floor(Math.random() * photos.length)];
      lastUrlRef.current = url;
      const from: "left" | "right" = Math.random() > 0.5 ? "left" : "right";
      const { tx, ty } = pickTarget();
      const trot = rand(-8, 8);
      setFlying((curr) => [...curr, { id: uid("fly"), url, from, tx, ty, trot }]);
    };

    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    tick();
    intervalRef.current = setInterval(tick, 2500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); intervalRef.current = null; };
  }, [photos, vw, vh, isMobile]);

  const center = useMemo(
    () => ({ x: vw / 2 - POLAROID_W / 2, y: Math.min(vh * 0.58, 480) }),
    [vw, vh, POLAROID_W]);

  const onArrive = (f: FlyingPhoto) => {
    setPiled((curr) => {
      const z = (curr.at(-1)?.z ?? 0) + 1;
      return [...curr, { id: uid("pile"), url: f.url, rot: f.trot, x: f.tx - POLAROID_W / 2 - center.x, y: f.ty - center.y, z }].slice(-36);
    });
  };

  const backdrop = useMemo<BackdropPhoto[]>(() => {
      if (!photos.length || vw === 0 || vh === 0) return [];
  
      // échantillonne et mélange
      const pool = [...photos];
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      const take = pool.slice(0, Math.min(BACKDROP_COUNT, pool.length));
  
      // params de répartition
      const rows = 3;
      const cols = take.length; // on « étire » en X puis on ajoute du jitter
      const usableW = vw * 0.90 - vw * 0.10; // 10% → 90%
      const baseGutter = usableW / Math.max(1, cols - 1);
      const x0 = vw * 0.10;
  
      const rowY = (r: number) =>
        (isMobile ? Math.min(vh * 0.26, 200) : Math.min(vh * 0.38, 300)) + (r - 1) * (isMobile ? 104 : 140);
  
      const items: BackdropPhoto[] = [];
      for (let i = 0; i < take.length; i++) {
        const r = i % rows;               // 0,1,2 → rangée
        const col = i;                    // on étire sur tout l’horizon
        const jitterX = rand(-baseGutter * 0.35, baseGutter * 0.35);
        const x = x0 + col * baseGutter + jitterX;
  
        const jitterY = rand(-22, 22);
        const y = rowY(r) + jitterY;
  
        items.push({
          id: uid("bg"),
          url: take[i],
          x: x - BACKDROP_W / 2,
          y,
          rot: rand(-12, 12),
          z: 1 + r, // 1..3
        });
      }
      return items;
    }, [photos, vw, vh, BACKDROP_COUNT, BACKDROP_W, isMobile]);

  return (
    <div className={`relative -mx-[calc((100vw-100%)/2)] w-screen ${className}`}>
      <div
        className={`relative ${isMobile ? "h-[78vw] min-h-[360px] max-h-[640px]" : "h-[60vw] min-h-[420px] max-h-[760px] overflow-visible"}`}
      >
        {/* Bandeau de fond */}
        <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden>
          {backdrop.map((b) => (
            <div key={b.id} className="absolute" style={{ left: b.x, top: b.y, zIndex: b.z }}>
              <div className="origin-center" style={{ transform: `rotate(${b.rot}deg)` }}>
                <PolaroidImg src={b.url} alt="backdrop" width={BACKDROP_W} className="opacity-100" />
              </div>
            </div>
          ))}
        </div>

        {/* Tas actuel */}
        <div className="absolute inset-0 pointer-events-none z-20" aria-hidden>
          {piled.map((p) => (
            <motion.div
              key={p.id}
              className="absolute will-change-transform"
              style={{ left: center.x + p.x, top: center.y + p.y, zIndex: p.z }}
              initial={false}                              // <- ne pas rejouer une entrée
              animate={{ rotate: p.rot, scale: 1, opacity: 1 }}  // <- déjà visible
              transition={{ type: "spring", stiffness: 120, damping: 16 }}
            >
              <PolaroidImg src={p.url} alt="photo" width={POLAROID_W} />
            </motion.div>
          ))}
        </div>

        {/* Photos en vol */}
        <div className="absolute inset-0 z-30 pointer-events-none">
        <AnimatePresence initial={false}>
          {flying.map((f) => {
            const fromLeft = f.from === "left";
            return (
              <motion.div key={f.id} className="absolute will-change-transform"
                initial={{ x: fromLeft ? -POLAROID_W - 120 : vw + 120, y: rand(vh * 0.05, vh * 0.80), rotate: fromLeft ? rand(-12, 6) : rand(-6, 12), opacity: 0.95 }}
                animate={{ x: f.tx - POLAROID_W / 2, y: f.ty, rotate: f.trot, opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0 } }}
                transition={{ type: "spring", stiffness: 110, damping: 18, mass: 0.8 }}
                onAnimationComplete={() => {
                  if (arrivedRef.current.has(f.id)) return;
                  arrivedRef.current.add(f.id);
                  onArrive(f);
                  requestAnimationFrame(() => setFlying((curr) => curr.filter((x) => x.id !== f.id)));
                }}
                style={{ zIndex: 999 }}>
                <PolaroidImg src={f.url} alt="flying" width={POLAROID_W} />
              </motion.div>
            );
          })}
        </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function PhotoSection() {
  const [vw, setVw] = React.useState(0);
  React.useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Map largeur -> marginTop (px) pour < 1024px
  const mtMobilePx = React.useMemo(() => {
    if (vw === 0 || vw >= 1024) return undefined; // ≥1024px: Tailwind prend le relai
    // IMPORTANT: du plus petit au plus grand breakpoint
    const table: Array<[number, number]> = [
      [336, -370],
      [375, -340],
      [416, -310],
      [470, -290],
      [557, -270],
      [676, -240],
      [768, -220],
      [881, -280],
      [1024, -250],
    ];
    for (const [bp, mt] of table) {
      if (vw < bp) return mt;
    }
    return undefined;
  }, [vw]);
  return (
    <>
      {/* Header dans la bulle */}
      <div className="items-stretch px-4">
        <GlassBlock className="mt-12 md:mt-20 p-3 md:p-5 flex flex-col items-stretch gap-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center">PHOTO</h2>
          <Link href="https://flic.kr/s/aHBqjCyfCd" target="_blank" className="mt-auto self-center pt-3">
              <button className="btn-cv btn-cv--sweep ">
                <span>GALERIE</span>
              </button>
            </Link>
          <p className="text-foreground/80 leading-relaxed text-left">
            Passionné par la photographie animalière et de portrait, avec également un intérêt pour les paysages, je cherche avant tout à capturer des instants vrais et naturels.
          </p>
          <p className="mt-2 text-foreground/80 leading-relaxed">
            La photo est pour moi une façon de garder une trace des moments passés, de conserver un souvenir fidèle de ce que j’ai vécu ou observé.
            Que ce soit un regard, une lumière ou une scène du quotidien, chaque image est l’occasion de figer un instant qui m’a marqué.
          </p>
          <p className="mt-2 text-foreground/80 leading-relaxed">
            Mon travail se partage entre la photo en extérieur, où j’explore la nature et la faune, et la photo de portrait, où je m’attache à retranscrire l’expression et la personnalité des sujets.
          </p>
          <p className="mt-2 text-foreground/80 leading-relaxed">
            Je participe également à certains événements en tant que photographe, ce qui me permet de découvrir de nouveaux contextes, de nouvelles personnes et d’enrichir ma pratique à travers des expériences variées.
          </p>
          <p className="mt-4 text-foreground/80 leading-relaxed">
            Légèrement philosophe dans certains moments, l’idée que mes photos prennent le dessus sur mes mots me faisait très envie, car parfois des photos valent mieux que mille mots. Ce texte n’est toutefois pas sensé être lu, vous êtes un sacré filou d’avoir pu y accéder mais merci d’être là en tout cas... Voilà voilà... Elles sont bien mes photos hein? 
          </p>
        </GlassBlock>
      </div>
      <div style={mtMobilePx !== undefined ? { marginTop: `${mtMobilePx}px` } : undefined}>
        <PhotoPile
          photos={PHOTO_URLS}
          className="md:-mt-56 lg:-mt-64 z-20"
        />
      </div>
    </>
  );
}
