interface SectionTitleProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left";
  tone?: "dark" | "light";
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "dark",
}: SectionTitleProps) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-xl"} data-reveal>
      <p
        className={`mb-3 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase ${
          tone === "light" ? "text-accent" : "text-turf"
        }`}
      >
        <span className="h-px w-8 bg-current" aria-hidden />
        {eyebrow}
        {centered && <span className="h-px w-8 bg-current" aria-hidden />}
      </p>
      <h2
        className={`font-display text-4xl leading-[0.95] tracking-wide uppercase sm:text-5xl lg:text-6xl ${
          tone === "light" ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed ${
            tone === "light" ? "text-white/70" : "text-muted"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
