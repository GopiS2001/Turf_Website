export type PlanId = "weekday-day" | "weekday-night" | "weekend";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: "football" | "cricket" | "trophy" | "briefcase" | "cake" | "whistle";
}

export interface PricingPlan {
  id: PlanId;
  name: string;
  timing: string;
  pricePerHour: number;
  maxGuests: number;
  pricePerGuest: number;
  features: string[];
  popular?: boolean;
}

export type GalleryCategory = "Turf" | "Matches" | "Cricket" | "Events";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  width: number;
  height: number;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
}

export type SlotStatus = "available" | "booked" | "past";

export interface Slot {
  hour: number;
  status: SlotStatus;
  planId: PlanId;
  price: number;
}

export interface BookingRequest {
  date: string; // yyyy-MM-dd
  startHour: number;
  hours: number;
  guests: number;
  name: string;
  phone: string;
  email?: string;
  notes?: string;
}

export interface BookingConfirmation {
  bookingCode: string;
  date: string;
  timeIn: string;
  timeOut: string;
  totalHours: number;
  turfAmount: number;
  additionalGuests: number;
  additionalGuestAmount: number;
  totalAmount: number;
  customerName: string;
  /** Booking confirmation PDF (live API only; not in demo mode). */
  pdfUrl?: string;
}

export interface EnquiryRequest {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
