"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";


export default function ThreeCanvas({ children }: { children?: React.ReactNode }) {
return (
<div className="h-[60vh] w-full rounded-2xl border">
<Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
<ambientLight intensity={0.6} />
<directionalLight position={[5,5,5]} intensity={1} />
<Environment preset="city" />
{children}
<OrbitControls enableZoom={false} />
</Canvas>
</div>
);
}