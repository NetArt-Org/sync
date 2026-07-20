export function BackgroundLayer() {
  return (
    <div
      data-anim="bg"
      aria-hidden="true"
      className="pointer-events-none absolute inset-[-10%]"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 68% 38%, rgba(26,71,200,0.10) 0%, rgba(26,71,200,0) 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(10,17,40,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,17,40,0.05) 1px, transparent 1px)",
          backgroundSize: "clamp(28px, 4vw, 48px) clamp(28px, 4vw, 48px)",
          maskImage:
            "radial-gradient(65% 65% at 65% 45%, black 0%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(65% 65% at 65% 45%, black 0%, transparent 75%)",
        }}
      />
    </div>
  );
}
