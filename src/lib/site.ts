// Business details shown across the site. Replace the placeholders with the real turf details.
export const site = {
  name: "90s Turf",
  tagline: "Play like the 90s",
  description:
    "Floodlit 5-a-side and 7-a-side football & box cricket turf. Book hourly slots online, host tournaments, birthday games and corporate matches.",
  phone: "+91 98765 43210",
  whatsapp: "919876543210",
  email: "hello@90sturf.in",
  address: "90s Turf, Mannarpalayam Main Road, Mannarpalayam Pirivu, Salem, Tamil Nadu 636017",
  map: {
    lat: 11.6755974,
    lng: 78.1921921,
    // The turf's Google Maps listing.
    placeUrl:
      "https://www.google.com/maps/place/90s+turf/@11.6755974,78.1921921,17z/data=!4m6!3m5!1s0x3babf1007460b5cb:0xfb4cc4b55f6fea9!8m2!3d11.6755974!4d78.1921921!16s%2Fg%2F11zxkl_9yg",
  },
  hours: "Open daily · 6:00 AM – 12:00 AM",
  socials: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    youtube: "https://youtube.com/",
  },
} as const;

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "pricing", label: "Pricing" },
  { id: "gallery", label: "Gallery" },
  { id: "reviews", label: "Reviews" },
  { id: "booking", label: "Booking" },
  { id: "contact", label: "Contact" },
] as const;

export const whatsappLink = (text = "Hi 90s Turf, I'd like to book a slot.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export const mapEmbedUrl = `https://maps.google.com/maps?q=${site.map.lat},${site.map.lng}&z=16&output=embed`;

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${site.map.lat},${site.map.lng}`;

export const telLink =`tel:${site.phone.replace(/\s/g, "")}`;
