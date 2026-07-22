"use client";

/**
 * Precision measurement reticle for the intro calibration beat. Parts carry
 * plain class names so a GSAP timeline can choreograph them.
 */
export default function Reticle({ className }: { className?: string }) {
  const nodes = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
    return { x: 200 + Math.cos(a) * 104, y: 200 + Math.sin(a) * 104 };
  });
  const ticks = Array.from({ length: 48 }, (_, i) => (i / 48) * 360);

  return (
    <svg className={className} viewBox="0 0 400 400" fill="none" aria-hidden>
      <g stroke="rgba(255,255,255,0.5)" strokeWidth="1">
        <line className="r-cross" x1="-400" y1="200" x2="800" y2="200" strokeDasharray="2 6" />
        <line className="r-cross" x1="200" y1="-400" x2="200" y2="800" strokeDasharray="2 6" />
      </g>

      <g className="r-bracket" stroke="#fff" strokeWidth="2.5">
        <path d="M70 92 V70 H92" />
        <path d="M308 70 H330 V92" />
        <path d="M330 308 V330 H308" />
        <path d="M92 330 H70 V308" />
      </g>

      <circle className="r-ring-outer" cx="200" cy="200" r="150" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" strokeDasharray="1.5 7" />

      <g className="r-ticks" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5">
        {ticks.map((deg, i) => (
          <line key={i} x1="200" y1="58" x2="200" y2={i % 4 === 0 ? 48 : 53} transform={`rotate(${deg} 200 200)`} />
        ))}
      </g>

      <circle className="r-ring-mid" cx="200" cy="200" r="104" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" />

      <g className="r-scan">
        <line x1="200" y1="200" x2="200" y2="96" stroke="url(#scanGrad)" strokeWidth="2.5" strokeLinecap="round" />
      </g>

      <g className="r-nodes">
        {nodes.map((n, i) => (
          <rect key={i} className="r-node" x={n.x - 4} y={n.y - 4} width="8" height="8" fill="#fff" stroke="#1a47c8" strokeWidth="1.5" />
        ))}
      </g>

      <circle className="r-ring-inner" cx="200" cy="200" r="52" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeDasharray="4 4" />
      <g className="r-center">
        <circle cx="200" cy="200" r="16" stroke="#7bb8ff" strokeWidth="2" />
        <circle cx="200" cy="200" r="4" fill="#fff" />
      </g>

      <defs>
        <linearGradient id="scanGrad" x1="200" y1="200" x2="200" y2="96" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#7bb8ff" stopOpacity="0" />
          <stop offset="1" stopColor="#bcd6ff" stopOpacity="0.95" />
        </linearGradient>
      </defs>
    </svg>
  );
}
