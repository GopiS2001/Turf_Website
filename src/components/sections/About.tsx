import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { SectionTitle } from "@/components/ui/SectionTitle";

const facilities = [
  "FIFA-grade 50 mm artificial grass",
  "LED floodlights for night games",
  "5-a-side & 7-a-side markings",
  "Box cricket nets & equipment",
  "Changing rooms & washrooms",
  "Free parking & drinking water",
];

export function About() {
  return (
    <section id="about" className="section-y bg-cream">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none" data-reveal>
          <div className="relative aspect-[4/5] w-[78%] overflow-hidden rounded-2xl shadow-card">
            <Image
              src="/images/about-1.jpg"
              alt="Friends playing a competitive 7-a-side match"
              fill
              sizes="(min-width: 1024px) 40vw, 80vw"
              className="object-cover"
            />
          </div>
          <div className="absolute right-0 bottom-0 aspect-square w-[52%] overflow-hidden rounded-2xl border-8 border-cream shadow-card">
            <Image
              src="/images/about-2.jpg"
              alt="Match balls lined up on the turf"
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute top-8 -right-2 rounded-2xl bg-turf px-6 py-5 text-white shadow-card sm:right-4">
            <p className="font-display text-5xl leading-none">10+</p>
            <p className="mt-1 text-xs font-medium tracking-widest uppercase text-white/80">
              Years of
              <br />
              local football
            </p>
          </div>
        </div>

        <div>
          <SectionTitle
            align="left"
            eyebrow="About 90s Turf"
            title={
              <>
                Built for the <span className="text-turf">beautiful game</span>
              </>
            }
            description="90s Turf brings back the joy of evening street football — now on a world-class surface. We started as a group of friends who wanted a clean, safe, well-lit ground close to home. Today we host hundreds of games every month for students, office teams, families and weekend warriors."
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2" data-reveal>
            {facilities.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm font-medium text-navy">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-turf" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center gap-6" data-reveal>
            <a href="#booking" className="btn-primary">
              Reserve your pitch
            </a>
            <a href="#pricing" className="text-sm font-semibold text-navy underline-offset-4 hover:text-turf hover:underline">
              See pricing →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
