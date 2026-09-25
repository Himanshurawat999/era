import { Preloader } from '@/components/sections/Preloader';
import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { Reasons } from '@/components/sections/Reasons';
import { Concept } from '@/components/sections/Concept';
import { GoldenMile } from '@/components/sections/GoldenMile';
import { LocationMap } from '@/components/sections/LocationMap';
import { MasterPlan } from '@/components/sections/MasterPlan';
import { ApartmentTypes } from '@/components/sections/ApartmentTypes';
import { Amenities } from '@/components/sections/Amenities';
import { LiveIn } from '@/components/sections/LiveIn';
import { InteriorGallery } from '@/components/sections/InteriorGallery';
import { Architecture } from '@/components/sections/Architecture';
import { FinalCta } from '@/components/sections/FinalCta';
import { Footer } from '@/components/sections/Footer';
import { CookieBanner } from '@/components/ui/CookieBanner';

export default function Home() {
  return (
    <>
      <Preloader />
      <Header />
      <main>
        <Hero />
        <Reasons />
        <Concept />
        <GoldenMile />
        <LocationMap />
        <MasterPlan />
        <ApartmentTypes />
        <Amenities />
        <LiveIn />
        <InteriorGallery />
        <Architecture />
        <FinalCta />
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
}
