"use client";
import { useEffect, useState } from "react";
import GradualBlur from "@/components/GradualBlur";

export default function GradualBlurOverlay() {
  const [below1220, setBelow1220] = useState(false);

  useEffect(() => {
    const onResize = () => setBelow1220(window.innerWidth < 1220);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      {/* Bottom blur (always) */}
      <GradualBlur
        target="page"
        position="bottom"
        height="5rem"
        strength={1}
        divCount={3}
        curve="bezier"
        exponential
        opacity={1}
        className="pointer-events-none"
        style={{ zIndex: 20 }}   // nav is z-50 → stays above
      />

      {/* Top blur only when mobile/bottom nav is shown */}
      {below1220 && (
        <GradualBlur
          target="page"
          position="top"
          height="6rem"       // tweak if you want thicker/thinner
          strength={1}
          divCount={3}
          curve="bezier"
          exponential
          opacity={1}
          className="pointer-events-none"
          style={{ zIndex: 20 }}
        />
      )}
    </>
  );
}
