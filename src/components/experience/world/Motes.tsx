"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { mulberry32 } from "./rng";

/** Cool measurement motes drifting through the whole world for depth + life. */
export default function Motes({
  count = 600,
  reduced = false,
}: {
  count?: number;
  reduced?: boolean;
}) {
  const ref = useRef<THREE.Points>(null);

  const tex = useMemo(() => {
    const s = 64;
    const c = document.createElement("canvas");
    c.width = c.height = s;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    g.addColorStop(0, "rgba(200,224,255,1)");
    g.addColorStop(0.4, "rgba(120,184,255,0.5)");
    g.addColorStop(1, "rgba(120,184,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, s, s);
    const t = new THREE.CanvasTexture(c);
    t.needsUpdate = true;
    return t;
  }, []);

  const { positions, speeds } = useMemo(() => {
    const rand = mulberry32(90210);
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand() - 0.5) * 46;
      positions[i * 3 + 1] = (rand() - 0.5) * 24;
      positions[i * 3 + 2] = -rand() * 100 + 10; // spread along the flight
      speeds[i] = 0.1 + rand() * 0.4;
    }
    return { positions, speeds };
  }, [count]);

  useFrame((_, delta) => {
    const pts = ref.current;
    if (!pts || reduced) return;
    const arr = pts.geometry.attributes.position.array as Float32Array;
    const dt = Math.min(delta, 0.05);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * dt * 0.5;
      if (arr[i * 3 + 1] > 12) arr[i * 3 + 1] = -12;
    }
    pts.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={tex}
        size={0.14}
        sizeAttenuation
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.85}
      />
    </points>
  );
}
