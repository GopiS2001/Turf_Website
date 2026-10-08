import {
  CLOSE_HOUR,
  OPEN_HOUR,
  calculateTotal,
  findPlan,
  fromISODate,
  hourLabel,
  planIdFor,
} from "../pricing";
import type { BookingConfirmation, BookingRequest, Slot } from "../types";
import { pricingPlans } from "./data";

const STORAGE_KEY = "nt_mock_bookings";

interface StoredBooking extends BookingConfirmation {
  startHour: number;
  hours: number;
}

function readBookings(): StoredBooking[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]") as StoredBooking[];
  } catch {
    return [];
  }
}

function writeBookings(bookings: StoredBooking[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  } catch {
    // Storage unavailable (private mode) — the booking still confirms for this session.
  }
}

/** Deterministic "already booked" slots so the demo grid looks realistic. */
function isSeedBooked(date: string, hour: number) {
  let hash = 0;
  for (const ch of `${date}:${hour}`) hash = (Math.imul(hash, 31) + ch.charCodeAt(0)) >>> 0;
  // Avalanche so neighbouring hours don't get neighbouring values.
  hash = Math.imul(hash ^ (hash >>> 16), 0x45d9f3b) >>> 0;
  hash = (hash ^ (hash >>> 16)) >>> 0;
  const isPeak = hour >= 18 || hour <= 7;
  return hash % 100 < (isPeak ? 30 : 15);
}

export function mockSlots(date: string, now = new Date()): Slot[] {
  const day = fromISODate(date);
  const isToday = day.toDateString() === now.toDateString();
  const taken = new Set(
    readBookings()
      .filter((b) => b.date === date)
      .flatMap((b) => Array.from({ length: b.hours }, (_, i) => b.startHour + i)),
  );

  const slots: Slot[] = [];
  for (let hour = OPEN_HOUR; hour < CLOSE_HOUR; hour++) {
    const planId = planIdFor(day, hour);
    const status =
      isToday && hour <= now.getHours()
        ? "past"
        : taken.has(hour) || isSeedBooked(date, hour)
          ? "booked"
          : "available";
    slots.push({ hour, status, planId, price: findPlan(pricingPlans, planId).pricePerHour });
  }
  return slots;
}

export function mockCreateBooking(req: BookingRequest): BookingConfirmation {
  const slots = mockSlots(req.date);
  const wanted = Array.from({ length: req.hours }, (_, i) => req.startHour + i);
  const chosen = wanted.map((h) => slots.find((s) => s.hour === h));
  if (chosen.some((s) => !s || s.status !== "available")) {
    throw new Error("Sorry, one of those slots was just taken. Please pick another time.");
  }

  const firstPlan = findPlan(pricingPlans, chosen[0]!.planId);
  const price = calculateTotal({
    hourlyRates: chosen.map((s) => s!.price),
    guests: req.guests,
    maxGuests: firstPlan.maxGuests,
    pricePerGuest: firstPlan.pricePerGuest,
  });

  const existing = readBookings();
  const seq = String(existing.length + 1).padStart(4, "0");
  const booking: StoredBooking = {
    bookingCode: `NT-${req.date.replaceAll("-", "")}-${seq}`,
    date: req.date,
    timeIn: hourLabel(req.startHour),
    timeOut: hourLabel(req.startHour + req.hours),
    customerName: req.name,
    startHour: req.startHour,
    hours: req.hours,
    ...price,
  };
  writeBookings([...existing, booking]);
  return booking;
}
