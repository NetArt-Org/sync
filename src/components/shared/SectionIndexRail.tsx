import { SECTION_INDEX } from "@/constants/hero";

export function SectionIndexRail() {
  const dots = Array.from({ length: SECTION_INDEX.steps - 2 });

  return (
    <div
      aria-hidden="true"
      className="hidden select-none flex-col items-center gap-3 text-[0.7rem] font-semibold tracking-wide text-[#0a1128]/40 lg:flex"
    >
      <span className="text-[#1A47C8]">{SECTION_INDEX.current}</span>
      <span className="h-1.5 w-1.5 rounded-full bg-[#1A47C8]" />
      {dots.map((_, index) => (
        <span key={index} className="h-1.5 w-1.5 rounded-full bg-[#0a1128]/15" />
      ))}
      <span>{SECTION_INDEX.total}</span>
    </div>
  );
}
