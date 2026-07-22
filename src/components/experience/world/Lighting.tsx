"use client";

/** Ambient world lighting; emissive materials carry most of the glow. */
export default function Lighting() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <hemisphereLight args={["#9cc0ff", "#0a1226", 0.5]} />
      <directionalLight position={[6, 10, 4]} intensity={0.6} color="#cfe2ff" />
      <pointLight position={[0, 2, -46]} intensity={5} distance={40} color="#3b82f6" />
      <pointLight position={[0, 0, -78]} intensity={4} distance={44} color="#5b9bff" />
    </>
  );
}
