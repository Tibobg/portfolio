"use client";

import { useRef, useState, useEffect, useMemo, useCallback, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const IMAGES = [
  "/skateboards/skate1.png",
  "/skateboards/skate2.png",
  "/skateboards/skate3.png",
  "/skateboards/skate4.png",
  "/skateboards/skate5.png",
  "/skateboards/skate6.png",
];

// ─── TAILLE & POSITION DU SKATEBOARD 3D ───
const SKATEBOARD_SCALE = 5;
const SKATEBOARD_Y_OFFSET = 0.0;
const CAMERA_DISTANCE = 9;

// ─── VITESSE DE ROTATION ───
const SPEED_SLOW = 0.010;
const SPEED_FAST = 0.100;
const BACK_THRESHOLD = 0.25;

function useSkateTextures(paths: string[]) {
  const [textures, setTextures] = useState<THREE.Texture[]>([]);
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    const loaded: THREE.Texture[] = [];
    let done = 0;
    paths.forEach((path, i) => {
      loader.load(
        path,
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.flipY = false;
          loaded[i] = tex;
          done++;
          if (done === paths.length) setTextures([...loaded]);
        },
        undefined,
        () => {
          const c = document.createElement("canvas");
          c.width = 256; c.height = 256;
          const ctx = c.getContext("2d")!;
          ctx.fillStyle = `hsl(${(i * 60) % 360}, 65%, 50%)`;
          ctx.fillRect(0, 0, 256, 256);
          ctx.fillStyle = "#fff";
          ctx.font = "bold 40px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(`Design ${i + 1}`, 128, 140);
          loaded[i] = new THREE.CanvasTexture(c);
          done++;
          if (done === paths.length) setTextures([...loaded]);
        }
      );
    });
  }, [paths]);
  return textures;
}

function SkateboardModel({
  rotationRef,
  activeTexture,
}: {
  rotationRef: React.MutableRefObject<number>;
  activeTexture: THREE.Texture | null;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/skateboard.glb");
  const model = useMemo(() => scene.clone(), [scene]);

  useEffect(() => {
    if (!activeTexture) return;
    model.traverse((child: any) => {
      if (child.isMesh && child.name === "DeckBottom") {
        const newMat = child.material.clone();
        newMat.map = activeTexture;
        newMat.needsUpdate = true;
        child.material = newMat;
      }
    });
  }, [activeTexture, model]);

  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y = rotationRef.current;
  });

  return (
    <group ref={groupRef} position={[0, SKATEBOARD_Y_OFFSET, 0]}>
      <primitive object={model} scale={SKATEBOARD_SCALE} />
    </group>
  );
}

useGLTF.preload("/models/skateboard.glb");

export default function Skateboard3D() {
  const rotationRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const hasSwitchedRef = useRef(false);
  const rafRef = useRef<number>(0);

  const textures = useSkateTextures(IMAGES);
  const activeTexture = textures[activeIndex] || null;
  const count = IMAGES.length;

  useEffect(() => {
    const loop = () => {
      if (!isDragging.current) {
        const angle = ((rotationRef.current % (2 * Math.PI)) + (2 * Math.PI)) % (2 * Math.PI);
        const distToFront = Math.min(angle, 2 * Math.PI - angle);
        const speed = SPEED_SLOW + (SPEED_FAST - SPEED_SLOW) * (distToFront / Math.PI);
        rotationRef.current += speed;

        const nearBack = Math.abs(angle - Math.PI) < BACK_THRESHOLD;
        if (nearBack && !hasSwitchedRef.current) {
          setActiveIndex((prev) => (prev + 1) % count);
          hasSwitchedRef.current = true;
        } else if (!nearBack) {
          hasSwitchedRef.current = false;
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [count]);

  const onDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    lastX.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  }, []);

  const onMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    rotationRef.current += (e.clientX - lastX.current) * 0.008;
    lastX.current = e.clientX;
  }, []);

  const onUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <div
      className="w-full h-full relative cursor-grab active:cursor-grabbing"
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerLeave={onUp}
      style={{ touchAction: "none" }}
    >
      <Canvas shadows camera={{ position: [0, 0, CAMERA_DISTANCE], fov: 40 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 8]} intensity={1.2} castShadow />
        <Environment preset="city" />
        <Suspense fallback={null}>
          <SkateboardModel rotationRef={rotationRef} activeTexture={activeTexture} />
        </Suspense>
        <ContactShadows position={[0, -3 + SKATEBOARD_Y_OFFSET, 0]} opacity={0.4} scale={10} blur={2.5} />
      </Canvas>
    </div>
  );
}