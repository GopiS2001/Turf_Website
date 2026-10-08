"use client";

import { Expand } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { GalleryCategory, GalleryImage } from "@/lib/types";

const filters: ("All" | GalleryCategory)[] = ["All", "Matches", "Turf", "Cricket", "Events"];

export function Gallery({ images }: { images: GalleryImage[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [index, setIndex] = useState(-1);

  const visible = useMemo(
    () => (filter === "All" ? images : images.filter((img) => img.category === filter)),
    [filter, images],
  );

  return (
    <section id="gallery" className="section-y bg-white">
      <div className="container-x">
        <SectionTitle
          eyebrow="Gallery"
          title={
            <>
              Moments on <span className="text-turf">the turf</span>
            </>
          }
          description="Late-night finals, birthday kickabouts and fresh-cut lines — a look at life at 90s Turf."
        />

        <div className="mt-10 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Gallery filter">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                filter === f ? "bg-navy text-white" : "bg-cream text-navy hover:bg-turf-50 hover:text-turf"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {visible.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setIndex(i)}
              className="group relative mb-5 block w-full break-inside-avoid overflow-hidden rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turf"
              aria-label={`Open image: ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="h-auto w-full transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-navy/85 via-navy/10 to-transparent p-5 text-left opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                <span>
                  <span className="block text-xs font-semibold tracking-widest text-accent uppercase">
                    {img.category}
                  </span>
                  <span className="mt-1 block text-sm font-medium text-white">{img.alt}</span>
                </span>
                <Expand className="h-5 w-5 shrink-0 text-white" />
              </span>
            </button>
          ))}
        </div>
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={visible.map((img) => ({ src: img.src, alt: img.alt, width: img.width, height: img.height }))}
      />
    </section>
  );
}
