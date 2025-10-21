"use client";
import { useRef, useEffect, useState, useMemo, useId, FC, PointerEvent } from 'react';
import './CurvedLoop.css';

interface CurvedLoopProps {
  marqueeText?: string;
  speed?: number;
  className?: string;
  curveAmount?: number;
  direction?: 'left' | 'right';
  interactive?: boolean;
  /** Taille mini (px) pour le texte */
  minFontPx?: number;
  /** Taille maxi (px) pour le texte */
  maxFontPx?: number;
  /** Part de largeur viewport (vw) pour la taille fluide */
  vwFactor?: number; // ex: 3.2 = 3.2vw
}

const CurvedLoop: FC<CurvedLoopProps> = ({
  marqueeText = '',
  speed = 2,
  className,
  curveAmount = 400,
  direction = 'left',
  interactive = true,
  minFontPx = 14,
  maxFontPx = 28,
  vwFactor = 3.2,
}) => {
  const text = useMemo(() => {
    const hasTrailing = /\s|\u00A0$/.test(marqueeText);
    return (hasTrailing ? marqueeText.replace(/\s+$/, '') : marqueeText) + '\u00A0';
  }, [marqueeText]);

  const [pathLength, setPathLength] = useState(0);
  const measureRef = useRef<SVGTextElement | null>(null);
  const textPathRef = useRef<SVGTextPathElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const [spacing, setSpacing] = useState(0);
  const [offset, setOffset] = useState(0);
  const uid = useId();
  const pathId = `curve-${uid}`;
  const pathD = `M-10040,120 Q500,${curveAmount} 10040,120`;

  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef<'left' | 'right'>(direction);
  const velRef = useRef(0);
  const offsetRef = useRef(0);
  const lastTsRef = useRef<number | null>(null);

  const wrap = (v: number, w: number) => {
    const r = v % w;
    return r < 0 ? r + w : r;
  };

  const totalText = useMemo(() => {
  if (!spacing || !pathLength) return text;
    const repeats = Math.ceil(pathLength / spacing) + 8;
    return Array(repeats).fill(text).join('');
  }, [text, spacing, pathLength]);


  const ready = spacing > 0 && pathLength > 0;


  useEffect(() => {
    if (measureRef.current) setSpacing(measureRef.current.getComputedTextLength());
  }, [text, className]);

  useEffect(() => {
    if (!spacing) return;
    if (textPathRef.current) {
      const initial = -(spacing - 1);
      textPathRef.current.setAttribute('startOffset', initial + 'px');
      setOffset(initial);
    }
  }, [spacing]);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [curveAmount]);

  useEffect(() => {
    offsetRef.current = 0;
    lastTsRef.current = null;
  }, [spacing]);

  useEffect(() => {
    if (!spacing || !ready) return;

    let raf = 0;

    // Interprète `speed` comme des pixels par seconde (ex : 40 = lent, 120 = rapide)
    const pxPerSec = Math.max(5, speed); // tu peux mettre * 20 si tu préfères garder la même "échelle"
    const dirSign = () => (dirRef.current === "right" ? 1 : -1);

    const tick = (now: number) => {
      // si on drag, on laisse la main à onPointerMove (pas d'auto défilement)
      if (!dragRef.current && textPathRef.current) {
        if (lastTsRef.current == null) lastTsRef.current = now;
        const dt = (now - lastTsRef.current) / 1000; // secondes
        lastTsRef.current = now;

        // avance l'offset en continu (0..spacing)
        offsetRef.current = wrap(
          offsetRef.current + dirSign() * pxPerSec * dt,
          spacing
        );

        // startOffset attendu par <textPath> est négatif
        const start = -offsetRef.current;
        textPathRef.current.setAttribute("startOffset", start + "px");
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [spacing, ready, speed]);


  const onPointerDown = (e: PointerEvent) => {
    if (!interactive) return;
    dragRef.current = true;
    lastXRef.current = e.clientX;
    velRef.current = 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent) => {
  if (!interactive || !dragRef.current || !textPathRef.current) return;

    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx;

    // Convertit l’attribut en offset positif puis applique le drag
    const currentStart = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');
    const currentPos = wrap(-currentStart, spacing); // 0..spacing
    const nextPos = wrap(currentPos - dx, spacing);  // -dx car startOffset est négatif

    offsetRef.current = nextPos;
    textPathRef.current.setAttribute('startOffset', -nextPos + 'px');
  };

  const endDrag = () => {
    if (!interactive) return;
    dragRef.current = false;
    dirRef.current = velRef.current > 0 ? 'right' : 'left';
  };

  const cursorStyle = interactive ? (dragRef.current ? 'grabbing' : 'grab') : 'auto';

  return (
    <div
      className="curved-loop-jacket"
      style={{
      visibility: ready ? 'visible' : 'hidden',
      cursor: interactive ? (dragRef.current ? 'grabbing' : 'grab') : 'auto',
      pointerEvents: interactive ? 'auto' : 'none',   // <-- AJOUT
    }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <svg className="curved-loop-svg" viewBox="0 0 1440 120">
        <text
          ref={measureRef}
          xmlSpace="preserve"
          className={className}
          fontWeight="800"
          style={{
            visibility: 'hidden',
            opacity: 0,
            pointerEvents: 'none',
            letterSpacing: '0.06em',
          }}
        >
          {text}
        </text>
        <defs>
          <path ref={pathRef} id={pathId} d={pathD} fill="none" stroke="transparent" />
        </defs>
        {ready && (
          <text
            fontWeight="800"
            xmlSpace="preserve"
            className={className}
            stroke="rgba(0,0,0,0.35)"
            strokeWidth={2}
            paintOrder="stroke fill"
            style={{ letterSpacing: '0.06em' }}
          >
            <textPath ref={textPathRef} href={`#${pathId}`} xmlSpace="preserve">
              {totalText}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

export default CurvedLoop;
