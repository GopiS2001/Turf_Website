export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#home" className={`group inline-flex items-center gap-2.5 ${className}`} aria-label="90s Turf home">
      <svg viewBox="0 0 40 40" className="h-10 w-10 shrink-0" aria-hidden>
        <circle cx="20" cy="20" r="19" fill="#097e52" />
        <circle cx="20" cy="20" r="13" fill="none" stroke="#fff" strokeWidth="2" />
        <path d="M20 13l5 3.6-1.9 5.9h-6.2L15 16.6z" fill="#ffaa00" />
        <path d="M20 1v12M20 27v12" stroke="#fff" strokeWidth="2" />
      </svg>
      <span className="leading-none">
        <span className="font-display block text-[28px] tracking-wider text-white">
          90<span className="text-accent">s</span> TURF
        </span>
        <span className="block text-[9px] font-semibold tracking-[0.35em] text-white/60 uppercase">
          Football · Cricket
        </span>
      </span>
    </a>
  );
}
