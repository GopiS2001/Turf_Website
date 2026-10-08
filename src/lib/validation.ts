import { z } from "zod";

const phone = z
  .string()
  .trim()
  .regex(/^(\+91[\s-]?)?[6-9]\d{4}\s?\d{5}$/, "Enter a valid 10-digit mobile number");

const optionalEmail = z
  .union([z.literal(""), z.email("Enter a valid email address")])
  .optional();

export const bookingDetailsSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(100),
  phone,
  email: optionalEmail,
  notes: z.string().trim().max(300, "Keep notes under 300 characters").optional(),
});
export type BookingDetailsInput = z.infer<typeof bookingDetailsSchema>;

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(100),
  email: z.email("Enter a valid email address"),
  phone,
  subject: z.string().trim().min(3, "Add a short subject").max(120),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more (at least 10 characters)")
    .max(1000),
});
export type EnquiryInput = z.infer<typeof enquirySchema>;
