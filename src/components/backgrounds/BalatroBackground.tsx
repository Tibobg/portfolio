// BalatroBackground.tsx
"use client";
import Balatro from "./Balatro";

type Props = {
  isRotate?: boolean;
  mouseInteraction?: boolean;
  pixelFilter?: number;
  className?: string;
};

export default function BalatroBackground({
  isRotate = false,
  mouseInteraction = true,
  pixelFilter = 700,
  className = "",
}: Props) {
  return (
    <div
      className={`absolute inset-0 -z-10 pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <Balatro
        isRotate={isRotate}
        mouseInteraction={mouseInteraction}
        pixelFilter={pixelFilter}
      />
    </div>
  );
}
