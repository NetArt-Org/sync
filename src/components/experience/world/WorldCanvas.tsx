"use client";

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Environment, Lightformer } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import CameraRig from "./CameraRig";
import HeroSculpture from "./HeroSculpture";
import { FOG } from "./sceneColors";
import { scrollState } from "../store";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * The single persistent 3D world: one cinematic hero sculpture, lit like a
 * studio and reflected in liquid metal, fixed behind all DOM. A procedural
 * Environment (Lightformers) supplies the reflections — no HDR asset, no grid,
 * no floor, no wireframe. Bloom + vignette + fog finish the cinematic look.
 */
export default function WorldCanvas({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div className={className} aria-hidden>
      <Canvas
        gl={{ antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0.3, 7.2], fov: 40, near: 0.1, far: 100 }}
        dpr={[1, isMobile ? 1.4 : 1.7]}
        frameloop="always"
        onCreated={(state) => {
          state.scene.fog = new THREE.Fog("#05060c", FOG.near, FOG.far);
          state.scene.background = new THREE.Color("#05060c");
          if (process.env.NODE_ENV !== "production") {
            (window as unknown as Record<string, unknown>).__world = {
              renderAt: (p: number) => {
                scrollState.progress = p;
                for (let i = 0; i < 60; i++) state.advance(performance.now() + i * 16);
              },
              state,
            };
          }
        }}
      >
        <CameraRig reduced={reduced} />
        <HeroSculpture reduced={reduced} />

        {/* Procedural studio HDRI — drives the metal's reflections. */}
        <Environment resolution={isMobile ? 128 : 256}>
          <Lightformer form="rect" intensity={3.2} position={[0, 3, 4]} scale={[8, 6, 1]} color="#aecbff" />
          <Lightformer form="rect" intensity={2.2} position={[-5, -1, 2]} scale={[6, 5, 1]} color="#6a4bff" />
          <Lightformer form="ring" intensity={2.4} position={[4, 2, -3]} scale={[4, 4, 1]} color="#2e78ff" />
          <Lightformer form="rect" intensity={1.4} position={[0, -4, 3]} scale={[9, 3, 1]} color="#0e1a3a" />
        </Environment>

        <EffectComposer multisampling={isMobile ? 0 : 4}>
          <Bloom
            intensity={isMobile ? 0.6 : 0.8}
            luminanceThreshold={0.5}
            luminanceSmoothing={0.5}
            mipmapBlur
            radius={0.55}
          />
          <Vignette offset={0.22} darkness={0.78} eskil={false} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
