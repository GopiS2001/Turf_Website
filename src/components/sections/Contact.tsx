"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Clock, ExternalLink, Loader2, Mail, MapPin, Navigation, Phone, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { createEnquiry } from "@/lib/api";
import { directionsUrl, mapEmbedUrl, site, telLink } from "@/lib/site";
import { enquirySchema, type EnquiryInput } from "@/lib/validation";

const info = [
  { icon: MapPin, label: "Visit us", value: site.address, href: site.map.placeUrl, external: true },
  { icon: Phone, label: "Call us", value: site.phone, href: telLink },
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: Clock, label: "Hours", value: site.hours },
];

export function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryInput>({ resolver: zodResolver(enquirySchema) });

  async function onSubmit(values: EnquiryInput) {
    try {
      await createEnquiry(values);
      toast.success("Thanks! We'll get back to you within a few hours.");
      reset();
    } catch (err) {
      toast.error((err as Error).message);
    }
  }

  const fieldClass = (hasError: boolean) => `field ${hasError ? "field-error" : ""}`;

  return (
    <section id="contact" className="section-y bg-cream">
      <div className="container-x">
        <SectionTitle
          eyebrow="Contact us"
          title={
            <>
              Let&apos;s <span className="text-turf">talk football</span>
            </>
          }
          description="Planning a tournament, corporate match or birthday? Send us a message and we'll help you set it up."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[2fr_3fr]">
          <div className="space-y-4" data-reveal>
            {info.map(({ icon: Icon, label, value, href, external }) => (
              <div key={label} className="flex gap-4 rounded-2xl bg-white p-5 shadow-card">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-turf text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold tracking-widest text-muted uppercase">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                      className="mt-1 block font-medium break-words text-navy hover:text-turf"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="mt-1 font-medium text-navy">{value}</p>
                  )}
                </div>
              </div>
            ))}
            <div className="overflow-hidden rounded-2xl bg-white shadow-card">
              <iframe
                title="90s Turf location map"
                src={mapEmbedUrl}
                className="h-72 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="grid grid-cols-2 gap-3 p-4">
                <a
                  href={site.map.placeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn border border-line px-3 text-navy hover:border-turf hover:text-turf"
                >
                  <ExternalLink className="h-4 w-4" /> Open in Maps
                </a>
                <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="btn-primary px-3">
                  <Navigation className="h-4 w-4" /> Directions
                </a>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="rounded-2xl bg-white p-6 shadow-card sm:p-10"
            data-reveal
          >
            <h3 className="font-display text-3xl tracking-wide text-navy">Send an enquiry</h3>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="c-name" className="label">Full name</label>
                <input id="c-name" {...register("name")} autoComplete="name" className={fieldClass(!!errors.name)} />
                <FieldError message={errors.name?.message} />
              </div>
              <div>
                <label htmlFor="c-phone" className="label">Mobile number</label>
                <input
                  id="c-phone"
                  type="tel"
                  inputMode="tel"
                  {...register("phone")}
                  autoComplete="tel"
                  className={fieldClass(!!errors.phone)}
                />
                <FieldError message={errors.phone?.message} />
              </div>
              <div>
                <label htmlFor="c-email" className="label">Email</label>
                <input
                  id="c-email"
                  type="email"
                  {...register("email")}
                  autoComplete="email"
                  className={fieldClass(!!errors.email)}
                />
                <FieldError message={errors.email?.message} />
              </div>
              <div>
                <label htmlFor="c-subject" className="label">Subject</label>
                <input
                  id="c-subject"
                  {...register("subject")}
                  placeholder="e.g. Corporate tournament"
                  className={fieldClass(!!errors.subject)}
                />
                <FieldError message={errors.subject?.message} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="c-message" className="label">Message</label>
                <textarea
                  id="c-message"
                  rows={5}
                  {...register("message")}
                  placeholder="Tell us the date, number of players and anything else we should know."
                  className={`${fieldClass(!!errors.message)} resize-y`}
                />
                <FieldError message={errors.message?.message} />
              </div>
            </div>
            <button type="submit" disabled={isSubmitting} className="btn-primary mt-7 w-full py-4 sm:w-auto sm:px-10">
              {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-4 w-4" />}
              {isSubmitting ? "Sending…" : "Send message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1.5 text-xs text-red-600">
      {message}
    </p>
  );
}
