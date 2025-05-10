import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { Nr1ContextSection } from '@/components/sections/Nr1ContextSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ContactFormSection } from '@/components/sections/ContactFormSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <Nr1ContextSection />
      <AboutSection />
      <ContactFormSection />
    </>
  );
}
