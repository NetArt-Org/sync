"use client";

import { useMemo, useRef, type ComponentRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { scrollState } from "../store";

/**
 * The hero: a single dark, liquid-metal sculpture at the world origin — the
 * centrepiece of the whole experience. It slowly breathes and morphs, catching
 * studio reflections as it turns. Scroll choreographs it: the form tightens and
 * unfurls, the rim light shifts colour, and (with the camera rig) hidden
 * surfaces are revealed. No particles, no wireframe — just sculpted light.
 */

const smoothstep = (e0: number, e1: number, x: number) => {
  const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};

export default function HeroSculpture({ reduced = false }: { reduced?: boolean }) {
  const spin = useRef<THREE.Group>(null);
  const mat = useRef<ComponentRef<typeof MeshDistortMaterial>>(null);
  const rim = useRef<THREE.PointLight>(null);
  const key = useRef<THREE.DirectionalLight>(null);
  const halo = useRef<THREE.Sprite>(null);

  // Responsive geometry: simplify on smaller screens (keeps 60fps on mobile).
  const detail = useMemo(() => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1280;
    if (w < 640) return 7;
    if (w < 1024) return 12;
    return 18;
  }, []);

  const haloTex = useMemo(() => {
    const s = 256;
    const c = document.createElement("canvas");
    c.width = c.height = s;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    g.addColorStop(0, "rgba(120,150,255,0.9)");
    g.addColorStop(0.35, "rgba(70,90,200,0.35)");
    g.addColorStop(1, "rgba(40,50,120,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, s, s);
    const t = new THREE.CanvasTexture(c);
    t.needsUpdate = true;
    return t;
  }, []);

  // Rim-light palette shifts across the journey ("lighting changes to reveal
  // new details"): cool blue -> electric violet -> bright brand blue.
  const cA = useMemo(() => new THREE.Color("#3b6bff"), []);
  const cB = useMemo(() => new THREE.Color("#7b3cff"), []);
  const cC = useMemo(() => new THREE.Color("#2ea8ff"), []);
  const rimColor = useMemo(() => new THREE.Color(), []);

  useFrame((state) => {
    const p = scrollState.progress;
    const t = reduced ? 0 : state.clock.elapsedTime;

    if (spin.current) {
      spin.current.rotation.y = t * 0.09 + p * Math.PI * 1.5;
      spin.current.rotation.x = Math.sin(t * 0.16) * 0.14 + p * 0.55;
      spin.current.rotation.z = Math.cos(t * 0.12) * 0.06;
    }

    if (mat.current) {
      // calm -> dramatic peak mid-scroll -> settle
      const drama = Math.sin(smoothstep(0, 1, p) * Math.PI);
      mat.current.distort = 0.15 + drama * 0.4;
      mat.current.envMapIntensity = 1.0 + drama * 0.9;
    }

    if (rim.current) {
      if (p < 0.5) rimColor.copy(cA).lerp(cB, p * 2);
      else rimColor.copy(cB).lerp(cC, (p - 0.5) * 2);
      rim.current.color.copy(rimColor);
      rim.current.intensity = 34 + (reduced ? 0 : Math.sin(t * 0.6) * 4);
    }
    if (key.current) {
      key.current.intensity = 2.2 + p * 0.8;
    }

    if (halo.current) {
      const op = 0.22 + (reduced ? 0 : Math.sin(t * 0.4) * 0.06) + p * 0.1;
      (halo.current.material as THREE.SpriteMaterial).opacity = op;
      const hs = 7 + p * 3;
      halo.current.scale.set(hs, hs, 1);
    }
  });

  return (
    <>
      {/* soft volumetric backlight behind the form */}
      <sprite ref={halo} position={[0, 0.2, -2.4]} scale={[7, 7, 1]}>
        <spriteMaterial
          map={haloTex}
          transparent
          opacity={0.22}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>

      <group ref={spin}>
        <mesh castShadow={false} receiveShadow={false}>
          <icosahedronGeometry args={[1.5, detail]} />
          <MeshDistortMaterial
            ref={mat}
            color="#0a0e1c"
            metalness={0.94}
            roughness={0.16}
            envMapIntensity={1.1}
            distort={0.2}
            speed={reduced ? 0 : 1.1}
          />
        </mesh>
      </group>

      {/* dramatic lighting (kept outside the spin so it stays directional) */}
      <ambientLight intensity={0.18} />
      <directionalLight ref={key} position={[4, 6, 5]} intensity={2.4} color="#eaf1ff" />
      <pointLight ref={rim} position={[-4, -1.5, -3]} intensity={34} distance={22} color="#3b6bff" />
      <pointLight position={[5, 2, -4]} intensity={12} distance={18} color="#12306b" />
    </>
  );
}
