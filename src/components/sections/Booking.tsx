"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, format } from "date-fns";
import { CalendarDays, Clock, Loader2, Minus, Plus, Users } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { createBooking, getSlots, isMockMode } from "@/lib/api";
import {
  BOOKING_WINDOW_DAYS,
  MAX_BOOKING_HOURS,
  calculateTotal,
  findPlan,
  formatINR,
  fromISODate,
  hourLabel,
  toISODate,
} from "@/lib/pricing";
import { useToday } from "@/lib/useToday";
import { site, telLink } from "@/lib/site";
import type { BookingConfirmation, PricingPlan, Slot } from "@/lib/types";
import { bookingDetailsSchema, type BookingDetailsInput } from "@/lib/validation";
import { BookingConfirmationModal } from "./BookingConfirmationModal";
import { PICK_DATE_EVENT } from "./QuickCheck";

type Range = { start: number; end: number } | null;

const MIN_GUESTS = 2;
const MAX_GUESTS = 30;
const NO_SLOTS: Slot[] = [];

interface SlotsResult {
  key: string;
  slots: Slot[];
  error: string | null;
}

export function Booking({ plans }: { plans: PricingPlan[] }) {
  const today = useToday();
  const [picked, setPicked] = useState<string | null>(null);
  const [result, setResult] = useState<SlotsResult | null>(null);
  const [selection, setSelection] = useState<{ key: string; range: Range }>({ key: "", range: null });
  const [guests, setGuests] = useState(10);
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const days = useMemo(
    () =>
      today
        ? Array.from({ length: BOOKING_WINDOW_DAYS }, (_, i) => addDays(fromISODate(today), i))
        : [],
    [today],
  );
  const date = picked ?? today ?? "";

  // Slots and the selected range belong to one date + reload; changing either resets them.
  const loadKey = `${date}#${reloadKey}`;
  const loading = !date || result?.key !== loadKey;
  const slots = loading ? NO_SLOTS : result.slots;
  const loadError = loading ? null : result.error;
  const range = selection.key === loadKey ? selection.range : null;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingDetailsInput>({ resolver: zodResolver(bookingDetailsSchema) });

  useEffect(() => {
    const onPick = (e: Event) => {
      const value = (e as CustomEvent<string>).detail;
      if (value) setPicked(value);
    };
    window.addEventListener(PICK_DATE_EVENT, onPick);
    return () => window.removeEventListener(PICK_DATE_EVENT, onPick);
  }, []);

  useEffect(() => {
    if (!date) return;
    let cancelled = false;
    getSlots(date)
      .then((data) => !cancelled && setResult({ key: loadKey, slots: data, error: null }))
      .catch(
        (err: Error) => !cancelled && setResult({ key: loadKey, slots: [], error: err.message }),
      );
    return () => {
      cancelled = true;
    };
  }, [date, loadKey]);

  const selectedSlots = useMemo(
    () => (range ? slots.filter((s) => s.hour >= range.start && s.hour <= range.end) : []),
    [range, slots],
  );

  const plan = selectedSlots[0] ? findPlan(plans, selectedSlots[0].planId) : plans[0];
  const price = calculateTotal({
    hourlyRates: selectedSlots.map((s) => s.price),
    guests,
    maxGuests: plan.maxGuests,
    pricePerGuest: plan.pricePerGuest,
  });

  const setRange = useCallback(
    (update: (r: Range) => Range) =>
      setSelection((s) => ({ key: loadKey, range: update(s.key === loadKey ? s.range : null) })),
    [loadKey],
  );

  const toggleSlot = useCallback(
    (hour: number) => {
      setRange((r) => {
        if (!r) return { start: hour, end: hour };
        const length = r.end - r.start + 1;
        if (hour === r.end + 1 || hour === r.start - 1) {
          if (length >= MAX_BOOKING_HOURS) {
            toast.error(`You can book up to ${MAX_BOOKING_HOURS} hours at a time.`);
            return r;
          }
          return hour > r.end ? { ...r, end: hour } : { ...r, start: hour };
        }
        if (r.start === r.end && hour === r.start) return null;
        if (hour === r.start) return { ...r, start: r.start + 1 };
        if (hour === r.end) return { ...r, end: r.end - 1 };
        return { start: hour, end: hour };
      });
    },
    [setRange],
  );

  async function onSubmit(values: BookingDetailsInput) {
    if (!range) {
      toast.error("Pick at least one time slot first.");
      document.getElementById("slot-grid")?.scrollIntoView({ block: "center" });
      return;
    }
    try {
      const result = await createBooking({
        date,
        startHour: range.start,
        hours: range.end - range.start + 1,
        guests,
        name: values.name,
        phone: values.phone,
        email: values.email || undefined,
        notes: values.notes || undefined,
      });
      setConfirmation(result);
      reset();
      setReloadKey((k) => k + 1);
    } catch (err) {
      toast.error((err as Error).message);
      setReloadKey((k) => k + 1);
    }
  }

  const selectedDate = date ? fromISODate(date) : null;

  return (
    <section id="booking" className="section-y relative bg-white">
      <div className="container-x">
        <SectionTitle
          eyebrow="Book a slot"
          title={
            <>
              Reserve your <span className="text-turf">pitch</span>
            </>
          }
          description="Choose a date, tap one or more back-to-back hours and confirm. Pay at the venue by cash or UPI."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Step 1 + 2 */}
          <div className="min-w-0 space-y-8">
            <div className="rounded-2xl border border-line p-5 sm:p-7" data-reveal>
              <h3 className="flex items-center gap-3 text-lg font-semibold text-navy">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-turf text-sm text-white">1</span>
                Choose a date
              </h3>
              <div className="-mx-1 mt-5 flex snap-x gap-3 overflow-x-auto px-1 pb-2" role="listbox" aria-label="Booking date">
                {days.length === 0
                  ? Array.from({ length: 7 }, (_, i) => (
                      <div key={i} className="h-[84px] w-[72px] shrink-0 animate-pulse rounded-xl bg-cream" />
                    ))
                  : days.map((d) => {
                      const iso = toISODate(d);
                      const active = iso === date;
                      const weekend = d.getDay() === 0 || d.getDay() === 6;
                      return (
                        <button
                          key={iso}
                          type="button"
                          role="option"
                          aria-selected={active}
                          onClick={() => setPicked(iso)}
                          className={`w-[72px] shrink-0 snap-start rounded-xl border py-3 text-center transition ${
                            active
                              ? "border-turf bg-turf text-white shadow-lg shadow-turf/25"
                              : "border-line bg-white text-navy hover:border-turf"
                          }`}
                        >
                          <span className={`block text-xs font-medium uppercase ${active ? "text-white/80" : weekend ? "text-accent-600" : "text-muted"}`}>
                            {format(d, "EEE")}
                          </span>
                          <span className="font-display block text-3xl leading-tight">{format(d, "d")}</span>
                          <span className={`block text-[11px] ${active ? "text-white/80" : "text-muted"}`}>
                            {format(d, "MMM")}
                          </span>
                        </button>
                      );
                    })}
              </div>
            </div>

            <div id="slot-grid" className="rounded-2xl border border-line p-5 sm:p-7" data-reveal>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h3 className="flex items-center gap-3 text-lg font-semibold text-navy">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-turf text-sm text-white">2</span>
                  Pick your time
                </h3>
                <ul className="flex flex-wrap gap-4 text-xs text-muted">
                  <li className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded border border-line bg-white" /> Available
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded bg-turf" /> Selected
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded bg-red-100" /> Booked
                  </li>
                </ul>
              </div>
              {selectedDate && (
                <p className="mt-2 text-sm text-muted">
                  {format(selectedDate, "EEEE, d MMMM yyyy")} · tap back-to-back hours to book longer
                </p>
              )}

              {loadError ? (
                <div role="alert" className="mt-6 rounded-xl bg-red-50 p-5 text-sm text-red-700">
                  <p>{loadError}</p>
                  <div className="mt-3 flex flex-wrap gap-4">
                    <button type="button" onClick={() => setReloadKey((k) => k + 1)} className="font-semibold underline">
                      Try again
                    </button>
                    <a href={telLink} className="font-semibold underline">
                      Call {site.phone}
                    </a>
                  </div>
                </div>
              ) : (
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4" aria-busy={loading}>
                  {loading
                    ? Array.from({ length: 12 }, (_, i) => (
                        <div key={i} className="h-[68px] animate-pulse rounded-xl bg-cream" />
                      ))
                    : slots.map((slot) => {
                        const selected = !!range && slot.hour >= range.start && slot.hour <= range.end;
                        const disabled = slot.status !== "available";
                        return (
                          <button
                            key={slot.hour}
                            type="button"
                            disabled={disabled}
                            aria-pressed={selected}
                            onClick={() => toggleSlot(slot.hour)}
                            className={`rounded-xl border px-3 py-3 text-left transition ${
                              selected
                                ? "border-turf bg-turf text-white shadow-md shadow-turf/25"
                                : slot.status === "booked"
                                  ? "cursor-not-allowed border-red-100 bg-red-50 text-red-300"
                                  : slot.status === "past"
                                    ? "cursor-not-allowed border-line bg-cream text-muted/50"
                                    : "border-line bg-white text-navy hover:border-turf hover:bg-turf-50"
                            }`}
                          >
                            <span className="block text-sm font-semibold">
                              {hourLabel(slot.hour)}
                              <span className="hidden sm:inline"> – {hourLabel(slot.hour + 1)}</span>
                            </span>
                            <span className={`mt-0.5 block text-xs ${selected ? "text-white/80" : ""}`}>
                              {slot.status === "booked"
                                ? "Booked"
                                : slot.status === "past"
                                  ? "Closed"
                                  : formatINR(slot.price)}
                            </span>
                          </button>
                        );
                      })}
                </div>
              )}
            </div>
          </div>

          {/* Step 3: summary + details */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="h-fit rounded-2xl bg-navy p-6 text-white shadow-2xl sm:p-8 lg:sticky lg:top-24"
            data-reveal
          >
            <h3 className="flex items-center gap-3 text-lg font-semibold">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-accent text-sm text-navy">3</span>
              Your booking
            </h3>

            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="flex items-center gap-2 text-white/60">
                  <CalendarDays className="h-4 w-4" /> Date
                </dt>
                <dd className="font-medium">{selectedDate ? format(selectedDate, "EEE, d MMM yyyy") : "—"}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="flex items-center gap-2 text-white/60">
                  <Clock className="h-4 w-4" /> Time
                </dt>
                <dd className="font-medium">
                  {range ? `${hourLabel(range.start)} – ${hourLabel(range.end + 1)}` : "Select slots"}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="flex items-center gap-2 text-white/60">
                  <Users className="h-4 w-4" /> Players
                </dt>
                <dd className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.max(MIN_GUESTS, g - 1))}
                    className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 hover:bg-white/20"
                    aria-label="Fewer players"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center font-semibold" aria-live="polite">
                    {guests}
                  </span>
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.min(MAX_GUESTS, g + 1))}
                    className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 hover:bg-white/20"
                    aria-label="More players"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </dd>
              </div>
            </dl>

            <div className="mt-6 space-y-2 rounded-xl bg-white/5 p-4 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60">
                  Turf · {price.totalHours} hr{price.totalHours === 1 ? "" : "s"}
                </span>
                <span>{formatINR(price.turfAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">
                  Extra players · {price.additionalGuests} × {formatINR(plan.pricePerGuest)}
                </span>
                <span>{formatINR(price.additionalGuestAmount)}</span>
              </div>
              <p className="text-xs text-white/40">{plan.maxGuests} players included per booking.</p>
              <div className="flex items-end justify-between border-t border-white/10 pt-3">
                <span className="font-medium">Total</span>
                <span className="font-display text-4xl leading-none text-accent">{formatINR(price.totalAmount)}</span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <Field label="Full name" error={errors.name?.message}>
                <input
                  {...register("name")}
                  autoComplete="name"
                  placeholder="Your name"
                  className={`field ${errors.name ? "field-error" : ""}`}
                />
              </Field>
              <Field label="Mobile number" error={errors.phone?.message}>
                <input
                  {...register("phone")}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="98765 43210"
                  className={`field ${errors.phone ? "field-error" : ""}`}
                />
              </Field>
              <Field label="Email (optional)" error={errors.email?.message}>
                <input
                  {...register("email")}
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={`field ${errors.email ? "field-error" : ""}`}
                />
              </Field>
            </div>

            <button type="submit" disabled={isSubmitting} className="btn-accent mt-6 w-full py-4 text-base">
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Booking…
                </>
              ) : range ? (
                `Confirm booking · ${formatINR(price.totalAmount)}`
              ) : (
                "Select a slot to continue"
              )}
            </button>
            <p className="mt-3 text-center text-xs text-white/50">
              Pay at the venue · Cash, UPI or bank transfer
              {isMockMode && " · Demo mode"}
            </p>
          </form>
        </div>
      </div>

      <BookingConfirmationModal booking={confirmation} onClose={() => setConfirmation(null)} />
    </section>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-white/80">{label}</span>
      {children}
      {error && (
        <span role="alert" className="mt-1.5 block text-xs text-red-300">
          {error}
        </span>
      )}
    </label>
  );
}
