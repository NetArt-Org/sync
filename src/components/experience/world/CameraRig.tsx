"use client";

import { useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "../store";
import { sampleCamera } from "./cameraPath";
import { sampleFog } from "./sceneColors";

/**
 * Drives the flight. Camera position / lookAt / fov and the world fog+background
 * colour are pure functions of the smoothed global progress, so the motion is
 * deterministic and stays in lockstep with scroll.
 */
export default function CameraRig() {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const scene = useThree((s) => s.scene);
  const lookTarget = useMemo(() => new THREE.Vector3(), []);
  const fogColor = useMemo(() => new THREE.Color("#1c3f95"), []);

  useFrame(() => {
    const p = scrollState.progress;
    const cam = sampleCamera(p);

    camera.position.set(cam.pos[0], cam.pos[1], cam.pos[2]);
    lookTarget.set(cam.look[0], cam.look[1], cam.look[2]);
    camera.lookAt(lookTarget);
    if (camera.fov !== cam.fov) {
      camera.fov = cam.fov;
      camera.updateProjectionMatrix();
    }

    sampleFog(p, fogColor);
    if (scene.fog) (scene.fog as THREE.Fog).color.copy(fogColor);
    if (!scene.background) scene.background = fogColor.clone();
    else (scene.background as THREE.Color).copy(fogColor);
  });

  return null;
}
