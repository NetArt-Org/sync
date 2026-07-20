export function PlayMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="5" fill="currentColor" />
      <path d="M10 8.7v6.6l6-3.3-6-3.3z" fill="white" />
    </svg>
  );
}
