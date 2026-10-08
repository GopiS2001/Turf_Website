import type { PlanId, PricingPlan } from "./types";

export const OPEN_HOUR = 6;
export const CLOSE_HOUR = 24;
export const NIGHT_START_HOUR = 18;
export const MAX_BOOKING_HOURS = 6;
export const BOOKING_WINDOW_DAYS = 14;

export function planIdFor(date: Date, hour: number): PlanId {
  const day = date.getDay();
  if (day === 0 || day === 6) return "weekend";
  return hour >= NIGHT_START_HOUR ? "weekday-night" : "weekday-day";
}

export interface PriceBreakdown {
  totalHours: number;
  turfAmount: number;
  additionalGuests: number;
  additionalGuestAmount: number;
  totalAmount: number;
}

/**
 * turfAmount            = sum of each booked hour's rate
 * additionalGuests      = max(0, guests - maxGuests)
 * additionalGuestAmount = additionalGuests × pricePerGuest
 * totalAmount           = turfAmount + additionalGuestAmount
 */
export function calculateTotal(input: {
  hourlyRates: number[];
  guests: number;
  maxGuests: number;
  pricePerGuest: number;
}): PriceBreakdown {
  const turfAmount = input.hourlyRates.reduce((sum, rate) => sum + rate, 0);
  const additionalGuests = Math.max(0, input.guests - input.maxGuests);
  const additionalGuestAmount = additionalGuests * input.pricePerGuest;
  return {
    totalHours: input.hourlyRates.length,
    turfAmount,
    additionalGuests,
    additionalGuestAmount,
    totalAmount: turfAmount + additionalGuestAmount,
  };
}

export function findPlan(plans: PricingPlan[], id: PlanId): PricingPlan {
  const plan = plans.find((p) => p.id === id);
  if (!plan) throw new Error(`Unknown pricing plan: ${id}`);
  return plan;
}

export const formatINR = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

export function hourLabel(hour: number) {
  const h = hour % 24;
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:00 ${h < 12 ? "AM" : "PM"}`;
}

export const toISODate = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

export const fromISODate = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};
