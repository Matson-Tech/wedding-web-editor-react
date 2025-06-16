import { HeroSection } from '../components/HeroSection';
import { LoveStorySection } from '../components/LoveStorySection';
import { AboutWeddingSection } from '../components/AboutWeddingSection';
import { ScheduleSection } from '../components/ScheduleSection';
import { GallerySection } from '../components/GallerySection';
import { WishesSection } from '../components/WishesSection';
import { MoreInfoSection } from '../components/MoreInfoSection';
import { ContactSection } from '../components/ContactSection';
import { JewelPartners } from '../components/JewelPartners';

export const Home = () => {
  return (
    <div className="min-h-screen bg-cream-50">
      <HeroSection />
      <LoveStorySection />
      <AboutWeddingSection />
      <ScheduleSection />
      <GallerySection />
      <WishesSection />
      <MoreInfoSection />
      <JewelPartners />
      <ContactSection />
    </div>
  );
}; 