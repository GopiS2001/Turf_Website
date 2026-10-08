import type { GalleryImage, PricingPlan, Review, Service } from "../types";

export const services: Service[] = [
  {
    id: "football",
    title: "5s & 7s Football",
    description:
      "FIFA-grade artificial turf with shock pads, marked for 5-a-side and 7-a-side games. Balls and bibs on the house.",
    icon: "football",
  },
  {
    id: "cricket",
    title: "Box Cricket",
    description:
      "Fully netted box cricket with stumps, tennis balls and bats ready. Perfect for quick 6-over battles after work.",
    icon: "cricket",
  },
  {
    id: "tournaments",
    title: "Tournaments & Leagues",
    description:
      "Weekend knockouts and monthly leagues with fixtures, referees, scoreboards and trophies handled for you.",
    icon: "trophy",
  },
  {
    id: "corporate",
    title: "Corporate Matches",
    description:
      "Team-building fixtures for offices with block bookings, GST invoices, refreshments and photography add-ons.",
    icon: "briefcase",
  },
  {
    id: "parties",
    title: "Birthday Games",
    description:
      "Kids' and adults' birthday football with a coach-run session, decorations area and cake time pitch-side.",
    icon: "cake",
  },
  {
    id: "coaching",
    title: "Coaching Camps",
    description:
      "Weekend skills camps for ages 6–16 run by licensed coaches — ball control, passing, fitness and match play.",
    icon: "whistle",
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    id: "weekday-day",
    name: "Weekday Day",
    timing: "Mon – Fri · 6 AM – 6 PM",
    pricePerHour: 800,
    maxGuests: 14,
    pricePerGuest: 50,
    features: ["Up to 14 players", "Balls & bibs included", "Changing rooms", "Free parking"],
  },
  {
    id: "weekday-night",
    name: "Weekday Night",
    timing: "Mon – Fri · 6 PM – 12 AM",
    pricePerHour: 1200,
    maxGuests: 14,
    pricePerGuest: 50,
    features: [
      "Up to 14 players",
      "LED floodlights",
      "Balls & bibs included",
      "Drinking water & seating",
    ],
    popular: true,
  },
  {
    id: "weekend",
    name: "Weekend",
    timing: "Sat – Sun · 6 AM – 12 AM",
    pricePerHour: 1400,
    maxGuests: 14,
    pricePerGuest: 50,
    features: ["Up to 14 players", "Floodlights after 6 PM", "Balls & bibs included", "Scoreboard"],
  },
];

const g = (
  n: number,
  alt: string,
  category: GalleryImage["category"],
  height: number,
): GalleryImage => ({
  id: `g${n}`,
  src: `/images/gallery/g${n}.jpg`,
  alt,
  category,
  width: 1400,
  height,
});

export const gallery: GalleryImage[] = [
  g(2, "Player dribbling the ball across the green turf", "Matches", 818),
  g(5, "Striker taking a shot during an evening match", "Matches", 2105),
  g(1, "Orange football boots on the turf corner marking", "Turf", 933),
  g(7, "Red cricket ball resting in the grass", "Cricket", 937),
  g(13, "Trophy and match ball at the tournament final", "Events", 788),
  g(3, "Foot on the ball before kick-off", "Matches", 1867),
  g(4, "Freshly marked white line on the turf", "Turf", 933),
  g(8, "Cricket ground under floodlights", "Cricket", 808),
  g(11, "Close tackle on the futsal court", "Matches", 1399),
  g(6, "Match ball on the centre of the pitch", "Turf", 933),
  g(10, "Player volleying the ball in the sky-lit evening", "Events", 1810),
  g(12, "Boots and ball ready on the turf", "Turf", 1750),
  g(9, "Classic black-and-white football on the grass", "Turf", 933),
];

export const reviews: Review[] = [
  {
    id: "r1",
    name: "Karthik R.",
    role: "Weekly 7s player",
    rating: 5,
    comment:
      "Best turf around here. The grass is thick, the lights are bright, and booking a slot takes less than a minute. Our Thursday night game has a permanent home now.",
  },
  {
    id: "r2",
    name: "Priya S.",
    role: "Organised a birthday game",
    rating: 5,
    comment:
      "Hosted my son's 10th birthday here. The staff set up everything, the coach kept 20 kids busy for two hours and the parents loved the seating area.",
  },
  {
    id: "r3",
    name: "Arun M.",
    role: "Corporate team captain",
    rating: 5,
    comment:
      "We run our monthly office league here. Invoices are on time, the slots never clash and the turf is always clean. Highly recommended for teams.",
  },
  {
    id: "r4",
    name: "Vignesh K.",
    role: "Box cricket regular",
    rating: 4,
    comment:
      "Box cricket nets are solid and the pitch plays true. Weekend evenings fill up fast, so book early — the online slot grid makes that easy.",
  },
  {
    id: "r5",
    name: "Sneha J.",
    role: "Coaching camp parent",
    rating: 5,
    comment:
      "My daughter has been at the weekend camp for three months. The coaches are patient and her confidence with the ball has grown a lot.",
  },
];
