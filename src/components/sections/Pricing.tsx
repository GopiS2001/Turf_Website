import { Check, Moon, Sun, Trophy } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { formatINR } from "@/lib/pricing";
import type { PlanId, PricingPlan } from "@/lib/types";

const planIcons: Record<PlanId, typeof Sun> = {
  "weekday-day": Sun,
  "weekday-night": Moon,
  weekend: Trophy,
};

export function Pricing({ plans }: { plans: PricingPlan[] }) {
  return (
    <section id="pricing" className="section-y relative overflow-hidden bg-navy">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:56px_56px]"
        aria-hidden
      />
      <div className="container-x relative">
        <SectionTitle
          tone="light"
          eyebrow="Simple pricing"
          title={
            <>
              Pay per hour. <span className="text-accent">No surprises.</span>
            </>
          }
          description="Every booking includes balls, bibs, changing rooms and parking. Bring extra friends for a small per-guest fee."
        />

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => {
            const Icon = planIcons[plan.id];
            const featured = plan.popular;
            return (
              <article
                key={plan.id}
                data-reveal
                style={{ "--reveal-delay": `${i * 120}ms` } as React.CSSProperties}
                className={`relative flex flex-col rounded-2xl p-8 transition-transform duration-300 hover:-translate-y-1 ${
                  featured
                    ? "bg-turf text-white shadow-2xl shadow-turf/30 lg:-my-4 lg:py-12"
                    : "bg-white text-navy"
                }`}
              >
                {featured && (
                  <span className="absolute top-0 right-8 -translate-y-1/2 rounded-full bg-accent px-4 py-1 text-xs font-bold tracking-widest text-navy uppercase">
                    Most popular
                  </span>
                )}
                <div className="flex items-center gap-3">
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-xl ${
                      featured ? "bg-white/15" : "bg-turf-50 text-turf"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-3xl leading-none tracking-wide">{plan.name}</h3>
                    <p className={`mt-1 text-xs ${featured ? "text-white/70" : "text-muted"}`}>{plan.timing}</p>
                  </div>
                </div>

                <p className="mt-8 flex items-end gap-1">
                  <span className="font-display text-6xl leading-none">{formatINR(plan.pricePerHour)}</span>
                  <span className={`mb-1 text-sm ${featured ? "text-white/70" : "text-muted"}`}>/ hour</span>
                </p>
                <p className={`mt-2 text-sm ${featured ? "text-white/80" : "text-muted"}`}>
                  {plan.maxGuests} players included · {formatINR(plan.pricePerGuest)} per extra guest
                </p>

                <ul className={`mt-8 space-y-3 border-t pt-8 text-sm ${featured ? "border-white/20" : "border-line"}`}>
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <Check className={`h-4 w-4 shrink-0 ${featured ? "text-accent" : "text-turf"}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <a href="#booking" className={`w-full ${featured ? "btn-accent" : "btn-primary"}`}>
                    Book this slot
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
