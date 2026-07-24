"use client";

import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "../store";
import { sampleCamera } from "./cameraPath";
import { sampleFog } from "./sceneColors";

/**
 * Drives the flight. Camera position / lookAt / fov and the world fog+background
 * are functions of the smoothed global progress, plus a gentle mouse parallax
 * and a responsive framing adjustment (further back + wider fov on small
 * screens). Movement is eased toward the target each frame for a cinematic feel.
 * Reads camera/scene/size/pointer off the per-frame state (never a hook value).
 */
export default function CameraRig({ reduced = false }: { reduced?: boolean }) {
  const target = useMemo(() => new THREE.Vector3(), []);
  const lookTarget = useMemo(() => new THREE.Vector3(), []);
  const fogColor = useMemo(() => new THREE.Color("#060912"), []);

  useFrame((state) => {
    const camera = state.camera as THREE.PerspectiveCamera;
    const scene = state.scene;
    const width = state.size.width;
    const pointer = state.pointer;

    const p = scrollState.progress;
    const cam = sampleCamera(p);

    // Responsive framing: pull back and widen on smaller viewports.
    let zMul = 1;
    let fovAdd = 0;
    if (width < 640) {
      zMul = 1.38;
      fovAdd = 9;
    } else if (width < 1024) {
      zMul = 1.16;
      fovAdd = 4;
    }

    const px = reduced ? 0 : pointer.x || 0;
    const py = reduced ? 0 : pointer.y || 0;

    target.set(cam.pos[0] + px * 0.4, cam.pos[1] + py * 0.28, cam.pos[2] * zMul);
    camera.position.lerp(target, reduced ? 1 : 0.09);

    lookTarget.set(cam.look[0] - px * 0.18, cam.look[1] - py * 0.12, cam.look[2]);
    camera.lookAt(lookTarget);

    const fov = cam.fov + fovAdd;
    if (Math.abs(camera.fov - fov) > 0.01) {
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }

    sampleFog(p, fogColor);
    if (scene.fog) (scene.fog as THREE.Fog).color.copy(fogColor);
    if (!scene.background) scene.background = fogColor.clone();
    else (scene.background as THREE.Color).copy(fogColor);
  });

  return null;
}
