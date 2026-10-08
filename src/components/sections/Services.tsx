import { Briefcase, Cake, Megaphone, Trophy, type LucideIcon } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { Service } from "@/lib/types";

function FootballIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="m12 7 4 3-1.5 4.5h-5L8 10z" />
      <path d="M12 7V2.5M16 10l4.3-1.4M14.5 14.5l2.7 3.8M9.5 14.5l-2.7 3.8M8 10 3.7 8.6" />
    </svg>
  );
}

function CricketIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m3 21 3-3" />
      <path d="M6 18 17.5 6.5l3 3L9 21H6z" />
      <path d="m15.5 4.5 4 4" />
      <circle cx="6" cy="6" r="2.5" />
    </svg>
  );
}

const icons: Record<Service["icon"], LucideIcon | typeof FootballIcon> = {
  football: FootballIcon,
  cricket: CricketIcon,
  trophy: Trophy,
  briefcase: Briefcase,
  cake: Cake,
  whistle: Megaphone,
};

export function Services({ services }: { services: Service[] }) {
  return (
    <section id="services" className="section-y relative overflow-hidden bg-white">
      <div className="container-x">
        <SectionTitle
          eyebrow="What we offer"
          title={
            <>
              More than <span className="text-turf">just a pitch</span>
            </>
          }
          description="From a quick after-work kickabout to a full-day tournament, we've got the ground, the gear and the team to make it happen."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = icons[service.icon];
            return (
              <article
                key={service.id}
                data-reveal
                style={{ "--reveal-delay": `${(i % 3) * 100}ms` } as React.CSSProperties}
                className="group relative overflow-hidden rounded-2xl border border-line bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-card"
              >
                <span
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-turf transition-transform duration-300 group-hover:scale-x-100"
                  aria-hidden
                />
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-turf-50 text-turf transition-colors duration-300 group-hover:bg-turf group-hover:text-white">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="font-display mt-6 text-3xl tracking-wide text-navy">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{service.description}</p>
                <span
                  className="font-display absolute right-6 bottom-2 text-7xl text-navy/[0.04]"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
