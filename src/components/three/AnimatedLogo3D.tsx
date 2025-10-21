"use client";
import { MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function AnimatedLogo3D() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.6;
    // petit effet "breathing" sur l'échelle
    const s = 1 + Math.sin(performance.now() / 800) * 0.03;
    ref.current.scale.setScalar(s);
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1, 1]} />
      <MeshDistortMaterial distort={0.3} speed={2} roughness={0.2} metalness={0.1} />
    </mesh>
  );
}
