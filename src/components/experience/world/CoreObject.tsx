"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "../store";

const smoothstep = (e0: number, e1: number, x: number) => {
  const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};

/** The glowing SYNC "core" — focal point of the intro, dissolves as we fly in. */
export default function CoreObject({ reduced = false }: { reduced?: boolean }) {
  const group = useRef<THREE.Group>(null);
  const solid = useRef<THREE.Mesh>(null);
  const wire = useRef<THREE.Mesh>(null);

  const geom = useMemo(() => new THREE.IcosahedronGeometry(1.6, 1), []);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const p = scrollState.progress;
    const t = reduced ? 0 : state.clock.elapsedTime;
    // visible in the intro, gone by the time we enter the silos
    const vis = 1 - smoothstep(0.08, 0.2, p);
    g.visible = vis > 0.001;
    g.rotation.y = t * 0.18;
    g.rotation.x = Math.sin(t * 0.3) * 0.14;
    const pulse = 1 + Math.sin(t * 1.6) * 0.04;
    g.scale.setScalar(pulse * (0.6 + 0.4 * vis));
    if (solid.current) {
      const m = solid.current.material as THREE.MeshStandardMaterial;
      m.opacity = 0.5 * vis;
      m.emissiveIntensity = 0.7 + Math.sin(t * 1.6) * 0.15;
    }
    if (wire.current) {
      (wire.current.material as THREE.MeshBasicMaterial).opacity = 0.8 * vis;
    }
  });

  return (
    <group ref={group}>
      <mesh ref={solid} geometry={geom}>
        <meshStandardMaterial
          color="#123fb0"
          emissive="#3b82f6"
          emissiveIntensity={0.8}
          metalness={0.4}
          roughness={0.25}
          transparent
          opacity={0.5}
        />
      </mesh>
      <mesh ref={wire} geometry={geom} scale={1.02}>
        <meshBasicMaterial color="#bcd6ff" wireframe transparent opacity={0.8} />
      </mesh>
      <pointLight color="#5b9bff" intensity={6} distance={18} />
    </group>
  );
}
