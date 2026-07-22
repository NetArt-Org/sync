"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "../store";
import { mulberry32 } from "./rng";

/**
 * The narrative object: a field of "screen" slabs that begins scattered
 * (measurement in silos), converges into one aligned wall (single-source view),
 * then radiates outward (outcomes blooming). One InstancedMesh, morphed by the
 * global scroll progress.
 */

const COUNT = 44;
const smoothstep = (e0: number, e1: number, x: number) => {
  const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};

type Slab = {
  scatter: THREE.Vector3;
  converge: THREE.Vector3;
  radiate: THREE.Vector3;
  scatterRot: THREE.Euler;
  scale: number;
  phase: number;
};

export default function Monoliths({ reduced = false }: { reduced?: boolean }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const slabs = useMemo<Slab[]>(() => {
    const rand = mulberry32(13317);
    const cols = 8;
    const list: Slab[] = [];
    for (let i = 0; i < COUNT; i++) {
      // scattered: chaotic spread along the early flight
      const scatter = new THREE.Vector3(
        (rand() - 0.5) * 26,
        (rand() - 0.5) * 15,
        -4 - rand() * 40
      );
      // converged: an aligned wall facing the camera near z = −44
      const col = i % cols;
      const row = Math.floor(i / cols);
      const converge = new THREE.Vector3(
        (col - (cols - 1) / 2) * 1.5,
        (row - 2.5) * 2.3,
        -44 - (rand() - 0.5) * 1.2
      );
      // radiated: a big ring blooming outward near z = −78
      const a = (i / COUNT) * Math.PI * 2;
      const r = 12 + rand() * 5;
      const radiate = new THREE.Vector3(
        Math.cos(a) * r,
        Math.sin(a) * r * 0.6,
        -74 - rand() * 12
      );
      list.push({
        scatter,
        converge,
        radiate,
        scatterRot: new THREE.Euler(
          (rand() - 0.5) * 1.6,
          (rand() - 0.5) * 2.2,
          (rand() - 0.5) * 1.2
        ),
        scale: 0.7 + rand() * 0.7,
        phase: rand() * Math.PI * 2,
      });
    }
    return list;
  }, []);

  const tmpA = useMemo(() => new THREE.Vector3(), []);
  const tmpB = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    const m = mesh.current;
    if (!m) return;
    const p = scrollState.progress;
    const t = reduced ? 0 : state.clock.elapsedTime;

    const convergeAmt = smoothstep(0.3, 0.47, p);
    const radiateAmt = smoothstep(0.63, 0.8, p);
    const appear = smoothstep(0.1, 0.2, p);
    const disappear = 1 - smoothstep(0.86, 0.96, p);
    const vis = appear * disappear;

    for (let i = 0; i < COUNT; i++) {
      const s = slabs[i];
      // position: scatter → converge → radiate
      tmpA.copy(s.scatter).lerp(s.converge, convergeAmt);
      tmpA.lerp(s.radiate, radiateAmt);
      // idle drift
      const bob = Math.sin(t * 0.5 + s.phase) * 0.25 * (1 - convergeAmt);
      dummy.position.set(tmpA.x, tmpA.y + bob, tmpA.z);

      // rotation: chaotic when scattered, aligned (facing camera) when converged
      const rx = s.scatterRot.x * (1 - convergeAmt);
      const ry = s.scatterRot.y * (1 - convergeAmt) + t * 0.05 * (1 - convergeAmt);
      const rz = s.scatterRot.z * (1 - convergeAmt);
      dummy.rotation.set(rx, ry, rz);

      const sc = s.scale * (0.6 + 0.4 * convergeAmt) * (vis > 0 ? 1 : 0.001);
      dummy.scale.set(sc, sc, sc);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    }
    m.instanceMatrix.needsUpdate = true;

    const mat = m.material as THREE.MeshStandardMaterial;
    tmpB.set(0, 0, 0);
    mat.opacity = 0.9 * vis;
    // shift emissive from cold (silos) to brand blue (converged)
    mat.emissiveIntensity = 0.25 + convergeAmt * 0.5;
  });

  return (
    <instancedMesh
      ref={mesh}
      args={[undefined, undefined, COUNT]}
      frustumCulled={false}
    >
      <boxGeometry args={[1.5, 2.4, 0.07]} />
      <meshStandardMaterial
        color="#0b1a3a"
        emissive="#2f6bff"
        emissiveIntensity={0.3}
        metalness={0.6}
        roughness={0.3}
        transparent
        opacity={0}
      />
    </instancedMesh>
  );
}
