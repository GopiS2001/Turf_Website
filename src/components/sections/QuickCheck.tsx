"use client";

import { CalendarDays, Clock, Users } from "lucide-react";
import { addDays } from "date-fns";
import { useState } from "react";
import { BOOKING_WINDOW_DAYS, fromISODate, toISODate } from "@/lib/pricing";
import { useToday } from "@/lib/useToday";

export const PICK_DATE_EVENT = "nt:pick-date";

export function QuickCheck() {
  const today = useToday();
  const [picked, setPicked] = useState<string | null>(null);
  const date = picked ?? today ?? "";

  const maxDate = today
    ? toISODate(addDays(fromISODate(today), BOOKING_WINDOW_DAYS - 1))
    : undefined;

  function check(e: React.FormEvent) {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent(PICK_DATE_EVENT, { detail: date }));
    document.getElementById("booking")?.scrollIntoView();
  }

  return (
    <form
      onSubmit={check}
      className="rounded-2xl border border-white/10 bg-white/10 p-6 text-white shadow-2xl backdrop-blur-md sm:p-8"
    >
      <h2 className="font-display text-3xl tracking-wide">Check availability</h2>
      <p className="mt-1 text-sm text-white/60">See open slots for the next two weeks.</p>

      <label htmlFor="quick-date" className="mt-6 mb-1.5 block text-sm font-medium text-white/80">
        Match date
      </label>
      <div className="relative">
        <CalendarDays className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-accent" />
        <input
          id="quick-date"
          type="date"
          required
          value={date}
          min={today || undefined}
          max={maxDate}
          onChange={(e) => setPicked(e.target.value)}
          className="w-full rounded-lg border border-white/15 bg-navy/60 py-3 pr-4 pl-11 text-sm text-white [color-scheme:dark] outline-none focus:border-accent"
        />
      </div>

      <ul className="mt-5 grid grid-cols-2 gap-3 text-sm text-white/70">
        <li className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2.5">
          <Clock className="h-4 w-4 text-accent" /> 6 AM – 12 AM
        </li>
        <li className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2.5">
          <Users className="h-4 w-4 text-accent" /> Up to 14 players
        </li>
      </ul>

      <button type="submit" className="btn-accent mt-6 w-full py-3.5 text-base">
        View Slots
      </button>
    </form>
  );
}
