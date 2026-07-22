"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Cinematic hero atmosphere for the dark "Powered by AI" screen:
 * a slow drift of cool measurement motes plus soft depth glow. Three.js
 * carries the ambient life behind the crisp DOM hero.
 */

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function useDotTexture() {
  return useMemo(() => {
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
    const tex = new THREE.CanvasTexture(c);
    tex.needsUpdate = true;
    return tex;
  }, []);
}

function Motes({ reduced }: { reduced: boolean }) {
  const tex = useDotTexture();
  const ref = useRef<THREE.Points>(null);
  const { pointer } = useThree();
  const COUNT = 520;

  const { positions, speeds } = useMemo(() => {
    const rand = mulberry32(770422);
    const positions = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (rand() - 0.5) * 22;
      positions[i * 3 + 1] = (rand() - 0.5) * 14;
      positions[i * 3 + 2] = (rand() - 0.5) * 10 - 2;
      speeds[i] = 0.12 + rand() * 0.4;
    }
    return { positions, speeds };
  }, []);

  useFrame((state, delta) => {
    const pts = ref.current;
    if (!pts) return;
    const arr = pts.geometry.attributes.position.array as Float32Array;
    if (!reduced) {
      for (let i = 0; i < COUNT; i++) {
        arr[i * 3 + 1] += speeds[i] * delta * 0.5;
        if (arr[i * 3 + 1] > 7) arr[i * 3 + 1] = -7;
      }
      pts.geometry.attributes.position.needsUpdate = true;
      pts.rotation.y = THREE.MathUtils.lerp(pts.rotation.y, pointer.x * 0.12, 0.03);
      pts.rotation.x = THREE.MathUtils.lerp(pts.rotation.x, -pointer.y * 0.08, 0.03);
    }
    void state;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={tex}
        size={0.12}
        sizeAttenuation
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.9}
      />
    </points>
  );
}

export default function HeroAtmosphere({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  return (
    <div className={className} aria-hidden>
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 9], fov: 45 }}
        dpr={[1, 1.75]}
      >
        <Motes reduced={reduced} />
      </Canvas>
    </div>
  );
}
