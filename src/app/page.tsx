import { FloatingActions } from "@/components/layout/FloatingActions";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { About } from "@/components/sections/About";
import { Booking } from "@/components/sections/Booking";
import { Contact } from "@/components/sections/Contact";
import { CtaBand } from "@/components/sections/CtaBand";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Pricing } from "@/components/sections/Pricing";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { getGallery, getPricing, getReviews, getServices } from "@/lib/api";

export const revalidate = 300;

export default async function HomePage() {
  const [services, plans, gallery, reviews] = await Promise.all([
    getServices(),
    getPricing(),
    getGallery(),
    getReviews(),
  ]);

  const rating = reviews.reduce((sum, r) => sum + r.rating, 0) / Math.max(reviews.length, 1);

  return (
    <>
      <Header />
      <main>
        <Hero rating={rating} />
        <About />
        <Services services={services} />
        <Pricing plans={plans} />
        <Gallery images={gallery} />
        <Testimonials reviews={reviews} />
        <Booking plans={plans} />
        <CtaBand />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
