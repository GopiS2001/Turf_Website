import Image from "next/image";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { whatsappLink } from "@/lib/site";

export function CtaBand() {
  return (
    <section className="relative isolate overflow-hidden py-24">
      <Image src="/images/stadium.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-navy/85" aria-hidden />
      <div className="container-x flex flex-col items-center text-center" data-reveal>
        <p className="text-xs font-semibold tracking-[0.25em] text-accent uppercase">Ready to play?</p>
        <h2 className="font-display mt-3 max-w-3xl text-5xl leading-[0.95] tracking-wide text-white uppercase sm:text-6xl lg:text-7xl">
          Grab your squad. <span className="text-turf">The pitch is waiting.</span>
        </h2>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <a href="#booking" className="btn-accent px-8 py-4 text-base">
            Book a Slot
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-light px-8 py-4 text-base"
          >
            <WhatsAppIcon className="h-5 w-5" /> WhatsApp us
          </a>
        </div>
      </div>
    </section>
  );
}
