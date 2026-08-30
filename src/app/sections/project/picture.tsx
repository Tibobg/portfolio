"use client";
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import manifest from "@/../public/photos/manifest.json";
import GlassBlock from "@/components/GlassBlock";
import Link from "next/link";
import { useTranslations } from "next-intl";

const PHOTO_URLS = (manifest as string[]).map((n) => `/photos/${n}`);

type PiledPhoto   = { id: string; url: string; rot: number; absX: number; absY: number; z: number };
type FlyingPhoto  = { id: string; url: string; from: "left" | "right"; tx: number; ty: number; trot: number; startY: number; startRot: number };
type BackdropPhoto= { id: string; url: string; x: number; y: number; rot: number; z: number };

const rand = (min: number, max: number) => Math.random() * (max - min) + min;
const uid  = (p = "id") => `${p}_${Math.random().toString(36).slice(2, 9)}`;

function PolaroidImg({ src, alt, width, className }: { src: string; alt: string; width: number; className?: string }) {
  const frame = Math.max(6, Math.round(width * 0.05));
  const frameBottom = Math.max(frame * 2, Math.round(width * 0.18));
  const imgHeight = Math.round(width * 1.25);
  return (
    <div className={className ?? ""} style={{ width }}>
      <div className="relative rounded-xl bg-white shadow-2xl" style={{ padding: frame, paddingBottom: frameBottom }}>
        <img src={src} alt={alt} width={width} height={imgHeight} loading="lazy" className="block w-full h-auto object-cover" draggable={false} />
      </div>
    </div>
  );
}

function PhotoPile({ photos, className = "" }: { photos: string[]; className?: string }) {
  const t = useTranslations("Projects.Photo");
  const arrivedRef = useRef<Set<string>>(new Set());
  const lastUrlRef = useRef<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dimsRef = useRef({ vw: 0, vh: 0 });

  const [piled, setPiled] = useState<PiledPhoto[]>([]);
  const [flying, setFlying] = useState<FlyingPhoto[]>([]);
  const [vw, setVw] = useState(0);
  const [vh, setVh] = useState(0);

  const isMobile = vw < 768;
  const POLAROID_W = isMobile ? 140 : 220;
  const BACKDROP_W = isMobile ? 120 : 180;
  const BACKDROP_COUNT = isMobile ? 18 : 30;

  useLayoutEffect(() => {
    const onResize = () => { 
      setVw(window.innerWidth); 
      setVh(window.innerHeight); 
      dimsRef.current = { vw: window.innerWidth, vh: window.innerHeight };
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!photos.length) return;
    const pickTarget = () => {
      const { vw, vh } = dimsRef.current;
      if (vw === 0 || vh === 0) return null;
      const mobile = vw < 768;
      const tx = rand(vw * 0.08, vw * 0.92);
      const bandTop    = mobile ? Math.min(vh * 0.24, 180) : Math.min(vh * 0.30, 260);
      const bandBottom = mobile ? Math.min(vh * 0.40, 300) : Math.min(vh * 0.58, 460);
      return { tx, ty: rand(bandTop, bandBottom), mobile };
    };
    const tick = () => {
      let url = photos[Math.floor(Math.random() * photos.length)];
      if (photos.length > 1 && url === lastUrlRef.current) url = photos[Math.floor(Math.random() * photos.length)];
      lastUrlRef.current = url;
      const from: "left" | "right" = Math.random() > 0.5 ? "left" : "right";
      const target = pickTarget();
      if (!target) return;
      const { tx, ty } = target;
      const trot = rand(-8, 8);
      const startY = rand(dimsRef.current.vh * 0.05, dimsRef.current.vh * 0.80);
      const startRot = from === "left" ? rand(-12, 6) : rand(-6, 12);
      setFlying((curr) => [...curr, { id: uid("fly"), url, from, tx, ty, trot, startY, startRot }]);
    };
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    tick();
    intervalRef.current = setInterval(tick, 2500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); intervalRef.current = null; };
  }, [photos]);

  const onArrive = useCallback((f: FlyingPhoto) => {
    if (arrivedRef.current.has(f.id)) return;
    arrivedRef.current.add(f.id);
    const pw = dimsRef.current.vw < 768 ? 140 : 220;
    setPiled((curr) => {
      const z = (curr.at(-1)?.z ?? 0) + 1;
      return [...curr, { id: uid("pile"), url: f.url, rot: f.trot, absX: f.tx - pw / 2, absY: f.ty, z }].slice(-36);
    });
  }, []);

  const backdropRef = useRef<BackdropPhoto[]>([]);
  const lastDimsRef = useRef({ vw: 0, vh: 0 });

  const backdrop = useMemo<BackdropPhoto[]>(() => {
    const { vw, vh } = dimsRef.current;
    if (!photos.length || vw === 0 || vh === 0) return [];
    const last = lastDimsRef.current;
    if (Math.abs(vw - last.vw) < 80 && Math.abs(vh - last.vh) < 80 && backdropRef.current.length > 0) {
      return backdropRef.current;
    }
    lastDimsRef.current = { vw, vh };
    const pool = [...photos];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    const take = pool.slice(0, Math.min(BACKDROP_COUNT, pool.length));
    const rows = 3;
    const cols = take.length;
    const usableW = vw * 0.90 - vw * 0.10;
    const baseGutter = usableW / Math.max(1, cols - 1);
    const x0 = vw * 0.10;
    const rowY = (r: number) =>
      (vw < 768 ? Math.min(vh * 0.26, 200) : Math.min(vh * 0.38, 300)) + (r - 1) * (vw < 768 ? 104 : 140);
    const items: BackdropPhoto[] = [];
    for (let i = 0; i < take.length; i++) {
      const r = i % rows;
      const col = i;
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
        z: 1 + r
      });
    }
    backdropRef.current = items;
    return items;
  }, [photos, vw, vh, BACKDROP_COUNT, BACKDROP_W]);

  return (
    <div className={`relative -mx-[calc((100vw-100%)/2)] w-screen ${className}`}>
      <div className={`${isMobile ? "h-[78vw] min-h-[360px] max-h-[640px]" : "h-[60vw] min-h-[420px] max-h-[760px] overflow-visible"} relative`}>
        {/* Bandeau de fond */}
        <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden>
          {backdrop.map((b) => (
            <div key={b.id} className="absolute" style={{ left: 0, top: 0, zIndex: b.z, transform: `translate3d(${b.x}px, ${b.y}px, 0)` }}>
              <div className="origin-center" style={{ transform: `rotate(${b.rot}deg)` }}>
                <PolaroidImg src={b.url} alt={t("altBackdrop")} width={BACKDROP_W} className="opacity-100" />
              </div>
            </div>
          ))}
        </div>

        {/* Tas */}
        <div className="absolute inset-0 pointer-events-none z-20" aria-hidden>
          {piled.map((p) => (
            <motion.div
              key={p.id}
              className="absolute will-change-transform"
              style={{ left: 0, top: 0, zIndex: p.z }}
              initial={false}
              animate={{ x: p.absX, y: p.absY, rotate: p.rot, scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 16 }}
            >
              <PolaroidImg src={p.url} alt={t("altPhoto")} width={POLAROID_W} />
            </motion.div>
          ))}
        </div>

        {/* En vol */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          <AnimatePresence initial={false}>
            {flying.map((f) => {
              const fromLeft = f.from === "left";
              return (
                <motion.div
                  key={f.id}
                  className="absolute will-change-transform"
                  initial={{ x: fromLeft ? -POLAROID_W - 120 : vw + 120, y: f.startY, rotate: f.startRot, opacity: 0.95 }}
                  animate={{ x: f.tx - POLAROID_W / 2, y: f.ty, rotate: f.trot, opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0 } }}
                  transition={{ type: "spring", stiffness: 110, damping: 18, mass: 0.8 }}
                  onAnimationComplete={() => {
                    onArrive(f);
                    setFlying((curr) => curr.filter((x) => x.id !== f.id));
                  }}
                  style={{ zIndex: 999 }}
                >
                  <PolaroidImg src={f.url} alt={t("altFlying")} width={POLAROID_W} />
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
  const t = useTranslations("Projects.Photo");

  return (
    <div className="items-stretch px-4">
      <div className="relative">
        <GlassBlock className="mt-12 md:mt-20 p-3 md:p-5 flex flex-col items-stretch gap-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center">{t("title")}</h2>
          <Link href="https://flic.kr/s/aHBqjCyfCd" target="_blank" className="mt-auto self-center pt-3">
            <button className="btn-cv btn-cv--sweep"><span>{t("cta")}</span></button>
          </Link>
          <p className="text-foreground/80 leading-relaxed text-left">{t("p1")}</p>
          <p className="mt-2 text-foreground/80 leading-relaxed">{t("p2")}</p>
          <p className="mt-2 text-foreground/80 leading-relaxed">{t("p3")}</p>
          <p className="mt-2 text-foreground/80 leading-relaxed">{t("p4")}</p>
          <p className="mt-4 text-foreground/80 leading-relaxed">{t("p5")}</p>
        </GlassBlock>

        <div className="absolute left-1/2 -translate-x-1/2 top-[60%] md:top-[50%] w-screen z-20">
          <PhotoPile photos={PHOTO_URLS} />
        </div>
      </div>

      <div className="h-[46vw] min-h-[220px] max-h-[380px] md:h-[32vw] md:min-h-[260px] md:max-h-[440px]" />
    </div>
  );
}