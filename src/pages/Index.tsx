
import React from 'react';
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
import { Button } from '../components/ui/button';

const Index = () => {
  const { isLoading, isAuthenticated, setIsAuthenticated } = useWedding();

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-rust-500">
        <div className="text-center text-cream-100">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cream-100 mx-auto mb-4"></div>
          <p className="font-serif text-xl">Loading wedding details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {!isAuthenticated ? (
        <Link to="/login">
          <Button 
            variant="outline" 
            className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm hover:bg-white"
          >
            Login to Edit
          </Button>
        </Link>
      ) : (
        <Button 
          onClick={handleLogout}
          variant="outline" 
          className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm hover:bg-white"
        >
          Logout
        </Button>
      )}
      
      <HeroSection />
      <LoveStorySection />
      <AboutWeddingSection />
      <ScheduleSection />
      <GallerySection />
      <WishesSection />
      <MoreInfoSection />
      <ContactSection />
    </div>
  );
};

export default Index;
