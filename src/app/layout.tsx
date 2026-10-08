import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { RevealObserver } from "@/components/RevealObserver";
import { site } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"] });
const bebas = Bebas_Neue({ variable: "--font-bebas", weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: `${site.name} — Football & Box Cricket Turf | Book Slots Online`,
  description: site.description,
  keywords: ["turf booking", "football turf", "box cricket", "5 a side", "7 a side", "90s Turf"],
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: ["/images/hero.jpg"],
    type: "website",
  },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#192335",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: site.name,
  description: site.description,
  telephone: site.phone,
  email: site.email,
  address: site.address,
  geo: { "@type": "GeoCoordinates", latitude: site.map.lat, longitude: site.map.lng },
  hasMap: site.map.placeUrl,
  openingHours: "Mo-Su 06:00-24:00",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${outfit.variable} ${bebas.variable} antialiased`} suppressHydrationWarning>
      {/* No hand-written <head>: browser extensions inject tags there, which breaks hydration. */}
      <body suppressHydrationWarning>
        {/* Runs before the page content paints, so reveal animations start hidden; without JS everything stays visible. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        {children}
        <RevealObserver />
        <Toaster position="top-center" toastOptions={{ style: { fontFamily: "var(--font-outfit)" } }} />
      </body>
    </html>
  );
}
