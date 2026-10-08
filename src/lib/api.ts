import { gallery, pricingPlans, reviews, services } from "./mock/data";
import { mockCreateBooking, mockSlots } from "./mock/store";
import { site } from "./site";
import type {
  BookingConfirmation,
  BookingRequest,
  EnquiryRequest,
  GalleryImage,
  PricingPlan,
  Review,
  Service,
  Slot,
} from "./types";

/** When unset, the website runs entirely on mock data. */
const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
export const isMockMode = !API_URL;

const delay = (ms = 450) => new Promise((r) => setTimeout(r, ms));

export const OFFLINE_MESSAGE = `Online booking is unavailable right now. Please try again in a moment or call us on ${site.phone}.`;

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const isRead = !init?.method || init.method === "GET";
  const send = () =>
    fetch(`${API_URL}${path}`, {
      ...init,
      // JSON header only when there's a body, so GETs skip the CORS preflight.
      headers: init?.body ? { "Content-Type": "application/json", ...init.headers } : init?.headers,
    });

  let res: Response;
  try {
    res = await send().catch(async (err) => {
      // A read can safely be retried once (e.g. the API was restarting).
      if (!isRead) throw err;
      await delay(800);
      return send();
    });
  } catch {
    // Network failure (API down, no internet): show customers something useful.
    throw new Error(OFFLINE_MESSAGE);
  }
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { message?: string | string[] } | null;
    const message = Array.isArray(body?.message) ? body.message[0] : body?.message;
    throw new Error(message ?? `Request failed (${res.status})`);
  }
  return res.json() as Promise<T>;
}

/**
 * Page content (services, pricing, gallery, reviews). If the API can't be reached
 * the page still renders with the built-in content instead of failing.
 */
async function content<T>(path: string, fallback: T): Promise<T> {
  if (isMockMode) return fallback;
  try {
    return await request<T>(path, { next: { revalidate: 300 } });
  } catch (err) {
    console.error(`[api] ${path} unavailable, using built-in content:`, (err as Error).message);
    return fallback;
  }
}

export const getServices = (): Promise<Service[]> => content("/public/services", services);

export const getPricing = (): Promise<PricingPlan[]> => content("/public/pricing", pricingPlans);

export const getGallery = (): Promise<GalleryImage[]> => content("/public/gallery", gallery);

export const getReviews = (): Promise<Review[]> => content("/public/reviews", reviews);

export async function getSlots(date: string): Promise<Slot[]> {
  if (isMockMode) {
    await delay(250);
    return mockSlots(date);
  }
  return request(`/public/slots?date=${encodeURIComponent(date)}`);
}

export async function createBooking(body: BookingRequest): Promise<BookingConfirmation> {
  if (isMockMode) {
    await delay();
    return mockCreateBooking(body);
  }
  return request("/public/bookings", { method: "POST", body: JSON.stringify(body) });
}

export async function createEnquiry(body: EnquiryRequest): Promise<{ ok: true }> {
  if (isMockMode) {
    await delay();
    return { ok: true };
  }
  return request("/public/enquiries", { method: "POST", body: JSON.stringify(body) });
}
