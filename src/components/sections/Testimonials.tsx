"use client";

import { Quote, Star } from "lucide-react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { Review } from "@/lib/types";

function Stars({ rating, className = "h-4 w-4" }: { rating: number; className?: string }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`${className} ${i < rating ? "fill-accent text-accent" : "fill-line text-line"}`}
        />
      ))}
    </div>
  );
}

export function Testimonials({ reviews }: { reviews: Review[] }) {
  const average = reviews.reduce((s, r) => s + r.rating, 0) / Math.max(reviews.length, 1);

  return (
    <section id="reviews" className="section-y overflow-hidden bg-cream">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_2fr] lg:items-center">
        <div>
          <SectionTitle
            align="left"
            eyebrow="Testimonials"
            title={
              <>
                Players who <span className="text-turf">trust us</span>
              </>
            }
            description="Regulars, captains and parents on why they keep coming back."
          />
          <div className="mt-8 inline-flex items-center gap-5 rounded-2xl bg-white p-5 shadow-card" data-reveal>
            <p className="font-display text-6xl leading-none text-navy">{average.toFixed(1)}</p>
            <div>
              <Stars rating={Math.round(average)} className="h-5 w-5" />
              <p className="mt-1.5 text-sm text-muted">Average from {reviews.length} player reviews</p>
            </div>
          </div>
        </div>

        <div className="min-w-0" data-reveal>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{ 768: { slidesPerView: 2 } }}
            autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: true }}
            loop
            className="!pb-14 [--swiper-pagination-bullet-inactive-color:#192335] [--swiper-pagination-color:#097e52]"
          >
            {reviews.map((r) => (
              <SwiperSlide key={r.id} className="!h-auto">
                <figure className="flex h-full flex-col rounded-2xl bg-white p-8 shadow-card">
                  <div className="flex items-center justify-between">
                    <Stars rating={r.rating} />
                    <Quote className="h-10 w-10 fill-turf-50 text-turf-50" />
                  </div>
                  <blockquote className="mt-5 flex-1 leading-relaxed text-navy/80">“{r.comment}”</blockquote>
                  <figcaption className="mt-8 flex items-center gap-4 border-t border-line pt-6">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-navy font-semibold text-white">
                      {r.name
                        .split(" ")
                        .map((p) => p[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                    <span>
                      <span className="block font-semibold text-navy">{r.name}</span>
                      <span className="block text-sm text-muted">{r.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
