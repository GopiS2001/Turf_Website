"use client";

import { format } from "date-fns";
import { CheckCircle2, FileDown, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { formatINR, fromISODate } from "@/lib/pricing";
import { whatsappLink } from "@/lib/site";
import type { BookingConfirmation } from "@/lib/types";

export function BookingConfirmationModal({
  booking,
  onClose,
}: {
  booking: BookingConfirmation | null;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (booking && !dialog.open) dialog.showModal();
    if (!booking && dialog.open) dialog.close();
  }, [booking]);

  const when = booking ? format(fromISODate(booking.date), "EEE, d MMM yyyy") : "";
  const shareText = booking
    ? `Booked at 90s Turf! ${when}, ${booking.timeIn} – ${booking.timeOut}. Ref ${booking.bookingCode}.${booking.pdfUrl ? ` Details: ${booking.pdfUrl}` : ""}`
    : "";

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => e.target === dialogRef.current && onClose()}
      aria-labelledby="booking-confirmed-title"
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl bg-white p-0 shadow-2xl backdrop:bg-navy/70 backdrop:backdrop-blur-sm"
    >
      {booking && (
        <div className="relative p-7 sm:p-8">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-cream"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <CheckCircle2 className="h-14 w-14 text-turf" />
          <h2 id="booking-confirmed-title" className="font-display mt-4 text-4xl tracking-wide text-navy">
            You&apos;re booked!
          </h2>
          <p className="mt-1 text-sm text-muted">
            See you on the pitch, {booking.customerName.split(" ")[0]}. Show this reference at the desk.
          </p>

          <div className="mt-6 rounded-xl border border-dashed border-turf/40 bg-turf-50 p-4 text-center">
            <p className="text-xs font-semibold tracking-widest text-turf uppercase">Booking reference</p>
            <p className="font-display mt-1 text-3xl tracking-wider text-navy">{booking.bookingCode}</p>
          </div>

          <dl className="mt-6 space-y-2.5 text-sm">
            {[
              ["Date", when],
              ["Time", `${booking.timeIn} – ${booking.timeOut}`],
              ["Duration", `${booking.totalHours} hour${booking.totalHours === 1 ? "" : "s"}`],
              ["Turf amount", formatINR(booking.turfAmount)],
              ...(booking.additionalGuests > 0
                ? [[`Extra players (${booking.additionalGuests})`, formatINR(booking.additionalGuestAmount)]]
                : []),
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4">
                <dt className="text-muted">{k}</dt>
                <dd className="font-medium text-navy">{v}</dd>
              </div>
            ))}
            <div className="flex justify-between gap-4 border-t border-line pt-3">
              <dt className="font-semibold text-navy">Total to pay at venue</dt>
              <dd className="font-display text-3xl leading-none text-turf">{formatINR(booking.totalAmount)}</dd>
            </div>
          </dl>

          {booking.pdfUrl && (
            <a
              href={booking.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn mt-7 w-full border border-turf/30 bg-turf-50 text-turf hover:bg-turf hover:text-white"
            >
              <FileDown className="h-4 w-4" /> Download booking PDF
            </a>
          )}

          <div className={`grid gap-3 sm:grid-cols-2 ${booking.pdfUrl ? "mt-3" : "mt-7"}`}>
            <a
              href={whatsappLink(shareText)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn border border-line text-navy hover:border-[#25d366] hover:text-[#128c4a]"
            >
              <WhatsAppIcon className="h-4 w-4" /> Share
            </a>
            <button type="button" onClick={onClose} className="btn-primary">
              Done
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}
