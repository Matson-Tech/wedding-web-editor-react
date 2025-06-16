import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWedding } from '../contexts/WeddingContext';
import { HeroSection } from '../components/HeroSection';
import { LoveStorySection } from '../components/LoveStorySection';
import { AboutWeddingSection } from '../components/AboutWeddingSection';
import { ScheduleSection } from '../components/ScheduleSection';
import { GallerySection } from '../components/GallerySection';
import { WishesSection } from '../components/WishesSection';
import { MoreInfoSection } from '../components/MoreInfoSection';
import { ContactSection } from '../components/ContactSection';
import { JewelPartners } from '../components/JewelPartners';
import { BackgroundMusic } from '../components/BackgroundMusic';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

const Index = () => {
  const { isLoading, isAuthenticated } = useWedding();

  useEffect(() => {
    if (isAuthenticated) {
      toast.info('Tap or hover over content to edit', {
        duration: 5000,
        position: 'top-center',
        dismissible: true,
        action: {
          label: 'Got it',
          onClick: () => toast.dismiss()
        }
      });
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-rust-500">
        <div className="text-center text-cream-100">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cream-100 mx-auto mb-4"></div>
          {/* <p className="font-serif text-xl">Loading wedding details...</p> */}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {!isAuthenticated ? (
        <Link to="/login">
          <Button 
            variant="outline" 
            className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm hover:bg-white"
            style={{display: 'none'}}
          >
            Login to Edit
          </Button>
        </Link>
      ) : (
        <Link to="/logout">
          <Button 
            variant="outline" 
            className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm hover:bg-white"
          >
            Logout
          </Button>
        </Link>
      )}
      
      <div className="relative">
        <BackgroundMusic />
        <HeroSection />
      </div>
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

export default Index;
