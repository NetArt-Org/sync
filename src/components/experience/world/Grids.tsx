"use client";

import { useMemo } from "react";
import * as THREE from "three";

/** A receding measurement grid floor — spatial reference for the flight. */
export default function Grids() {
  const tex = useMemo(() => {
    const size = 512;
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const ctx = c.getContext("2d")!;
    ctx.clearRect(0, 0, size, size);
    ctx.strokeStyle = "rgba(120,170,255,0.55)";
    ctx.lineWidth = 1;
    const step = size / 16;
    for (let i = 0; i <= 16; i++) {
      ctx.beginPath();
      ctx.moveTo(i * step, 0);
      ctx.lineTo(i * step, size);
      ctx.moveTo(0, i * step);
      ctx.lineTo(size, i * step);
      ctx.stroke();
    }
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(30, 60);
    t.needsUpdate = true;
    return t;
  }, []);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -7.5, -45]}>
      <planeGeometry args={[120, 240]} />
      <meshBasicMaterial
        map={tex}
        transparent
        opacity={0.16}
        depthWrite={false}
        color="#7bb8ff"
      />
    </mesh>
  );
}
