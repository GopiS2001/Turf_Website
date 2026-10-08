import { Phone, Star } from "lucide-react";
import Image from "next/image";
import { telLink } from "@/lib/site";
import { QuickCheck } from "./QuickCheck";

export function Hero({ rating }: { rating: number }) {
  const stats = [
    { value: "18", label: "Hours open daily" },
    { value: "5s · 7s", label: "Football formats" },
    { value: rating.toFixed(1), label: "Average rating", star: true },
    { value: "5K+", label: "Games played" },
  ];

  return (
    <section id="home" className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden bg-navy">
      <Image
        src="/images/hero.jpg"
        alt="Floodlit turf at night with players mid-game"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/85 to-navy/30"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-navy to-transparent"
        aria-hidden
      />

      <div className="container-x grid items-center gap-12 pt-32 pb-12 lg:grid-cols-[1.25fr_1fr] lg:pb-40">
        <div data-reveal>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-white/80 uppercase backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
            Floodlit turf · Open till midnight
          </p>
          <h1 className="font-display text-[clamp(3.5rem,11vw,8.5rem)] leading-[0.85] tracking-wide text-white uppercase">
            Own the
            <br />
            <span className="text-turf [-webkit-text-stroke:1px_#ffffff33]">pitch</span>{" "}
            <span className="text-accent">like</span>
            <br />
            the 90s
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/70">
            Premium 5-a-side and 7-a-side football and box cricket turf near you. Pick your slot, bring your
            squad and play under the lights.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#booking" className="btn-primary px-8 py-4 text-base">
              Book a Slot
            </a>
            <a href={telLink} className="btn-outline-light px-8 py-4 text-base">
              <Phone className="h-4 w-4" /> Call Now
            </a>
          </div>
        </div>

        <div data-reveal style={{ "--reveal-delay": "150ms" } as React.CSSProperties}>
          <QuickCheck />
        </div>
      </div>

      <div className="w-full lg:absolute lg:inset-x-0 lg:bottom-0">
        <div className="container-x">
          <dl className="grid grid-cols-2 border-t border-white/10 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="border-white/10 py-6 text-center not-last:border-r max-sm:nth-2:border-r-0">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display flex items-center justify-center gap-1.5 text-4xl tracking-wide text-white">
                  {s.value}
                  {s.star && <Star className="h-6 w-6 fill-accent text-accent" />}
                </dd>
                <dd className="mt-1 text-xs tracking-widest text-white/50 uppercase">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
