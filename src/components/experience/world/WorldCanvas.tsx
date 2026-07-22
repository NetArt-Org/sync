"use client";

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import CameraRig from "./CameraRig";
import Lighting from "./Lighting";
import Grids from "./Grids";
import Motes from "./Motes";
import Monoliths from "./Monoliths";
import CoreObject from "./CoreObject";
import { FOG } from "./sceneColors";
import { scrollState } from "../store";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * The single persistent 3D world. Mounted once, fixed behind all DOM. Objects
 * are reused across chapters; the camera flies through them.
 */
export default function WorldCanvas({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  const moteCount = typeof window !== "undefined" && window.innerWidth < 768 ? 260 : 600;

  return (
    <div className={className} aria-hidden>
      <Canvas
        gl={{ antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 14], fov: 42, near: 0.1, far: 200 }}
        dpr={[1, 1.75]}
        frameloop="always"
        onCreated={(state) => {
          state.scene.fog = new THREE.Fog("#1c3f95", FOG.near, FOG.far);
          state.scene.background = new THREE.Color("#1c3f95");
          if (process.env.NODE_ENV !== "production") {
            (window as unknown as Record<string, unknown>).__world = {
              renderAt: (p: number) => {
                scrollState.progress = p;
                state.advance(performance.now());
              },
              state,
            };
          }
        }}
      >
        <CameraRig />
        <Lighting />
        <Grids />
        <Monoliths reduced={reduced} />
        <CoreObject reduced={reduced} />
        <Motes count={moteCount} reduced={reduced} />
      </Canvas>
    </div>
  );
}
