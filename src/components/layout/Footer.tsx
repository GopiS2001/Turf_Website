import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { SocialIcons } from "@/components/ui/SocialIcons";
import { navLinks, site, telLink } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-900 text-white">
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-turf/20 blur-3xl"
        aria-hidden
      />
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">{site.description}</p>
          <SocialIcons className="mt-6" />
        </div>

        <div>
          <h3 className="font-display text-2xl tracking-wider">Quick Links</h3>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            {navLinks.map(({ id, label }) => (
              <li key={id}>
                <a href={`#${id}`} className="text-white/60 transition hover:text-accent">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-2xl tracking-wider">Contact</h3>
          <ul className="mt-5 space-y-4 text-sm text-white/60">
            <li>
              <a
                href={site.map.placeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 hover:text-white"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {site.address}
              </a>
            </li>
            <li>
              <a href={telLink} className="flex gap-3 hover:text-white">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex gap-3 hover:text-white">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                {site.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-2xl tracking-wider">Opening Hours</h3>
          <ul className="mt-5 space-y-3 text-sm text-white/60">
            <li className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
              <span className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-accent" /> Mon – Fri
              </span>
              <span className="text-white">6 AM – 12 AM</span>
            </li>
            <li className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
              <span className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-accent" /> Sat – Sun
              </span>
              <span className="text-white">6 AM – 12 AM</span>
            </li>
          </ul>
          <a href="#booking" className="btn-accent mt-6">
            Book a Slot
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Built for the love of the game.</p>
        </div>
      </div>
    </footer>
  );
}
