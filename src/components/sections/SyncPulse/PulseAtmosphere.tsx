"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Ambient brand-colored depth field: soft translucent panels drifting through
 * space — a visual metaphor for many screens resolving into one view.
 * Intentionally quiet; it sits behind the content and never competes with it.
 */

const PANEL_COUNT = 16;

// Rounded-rectangle soft gradient sprite, drawn once and reused as a texture.
function usePanelTexture() {
  return useMemo(() => {
    const size = 256;
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const ctx = c.getContext("2d")!;
    const r = 44;
    const w = size,
      h = size;
    // rounded rect path
    ctx.beginPath();
    ctx.moveTo(r, 0);
    ctx.arcTo(w, 0, w, h, r);
    ctx.arcTo(w, h, 0, h, r);
    ctx.arcTo(0, h, 0, 0, r);
    ctx.arcTo(0, 0, w, 0, r);
    ctx.closePath();
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "rgba(120,170,255,0.55)");
    g.addColorStop(0.5, "rgba(60,120,235,0.30)");
    g.addColorStop(1, "rgba(26,71,200,0.14)");
    ctx.fillStyle = g;
    ctx.fill();
    // inner sheen border
    ctx.lineWidth = 3;
    ctx.strokeStyle = "rgba(255,255,255,0.5)";
    ctx.stroke();
    const tex = new THREE.CanvasTexture(c);
    tex.needsUpdate = true;
    return tex;
  }, []);
}

type PanelData = {
  base: THREE.Vector3;
  rot: number;
  rotSpeed: number;
  drift: number;
  phase: number;
  scale: [number, number];
};

function Panels({ reduced }: { reduced: boolean }) {
  const tex = usePanelTexture();
  const group = useRef<THREE.Group>(null);
  const meshes = useRef<THREE.Mesh[]>([]);
  const { viewport, pointer } = useThree();

  const panels = useMemo<PanelData[]>(() => {
    const rand = mulberry32(20260722);
    return Array.from({ length: PANEL_COUNT }, () => {
      const depth = -2 - rand() * 9; // z
      const spread = 6 + Math.abs(depth) * 0.7;
      const s = 0.9 + rand() * 2.2;
      return {
        base: new THREE.Vector3(
          (rand() - 0.5) * spread * 2,
          (rand() - 0.5) * spread * 1.3,
          depth
        ),
        rot: (rand() - 0.5) * 0.7,
        rotSpeed: (rand() - 0.5) * 0.06,
        drift: 0.3 + rand() * 0.6,
        phase: rand() * Math.PI * 2,
        scale: [s, s * 1.6],
      };
    });
  }, []);

  useFrame((state) => {
    const t = reduced ? 0 : state.clock.elapsedTime;
    // gentle pointer parallax on the whole field
    if (group.current) {
      const px = reduced ? 0 : pointer.x;
      const py = reduced ? 0 : pointer.y;
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, px * 0.14, 0.04);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -py * 0.1, 0.04);
    }
    meshes.current.forEach((m, i) => {
      if (!m) return;
      const p = panels[i];
      m.position.x = p.base.x + Math.sin(t * 0.12 * p.drift + p.phase) * 0.6;
      m.position.y = p.base.y + Math.cos(t * 0.1 * p.drift + p.phase) * 0.5;
      m.rotation.z = p.rot + t * p.rotSpeed;
    });
    void viewport;
  });

  return (
    <group ref={group}>
      {panels.map((p, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) meshes.current[i] = el;
          }}
          position={p.base}
          scale={[p.scale[0], p.scale[1], 1]}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            map={tex}
            transparent
            opacity={0.5}
            depthWrite={false}
            blending={THREE.NormalBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

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

export default function PulseAtmosphere({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  return (
    <div className={className} aria-hidden>
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 8], fov: 42 }}
        dpr={[1, 1.75]}
      >
        <fog attach="fog" args={["#eef3fc", 6, 16]} />
        <Panels reduced={reduced} />
      </Canvas>
    </div>
  );
}
