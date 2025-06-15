
import React from 'react';
import { useWedding } from '../contexts/WeddingContext';
import { HeroSection } from '../components/HeroSection';
import { LoveStorySection } from '../components/LoveStorySection';
import { AboutWeddingSection } from '../components/AboutWeddingSection';
import { ScheduleSection } from '../components/ScheduleSection';
import { MoreInfoSection } from '../components/MoreInfoSection';
import { ContactSection } from '../components/ContactSection';
import { LoginModal } from '../components/LoginModal';

const Index = () => {
  const { isLoading } = useWedding();

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
      <LoginModal />
      <HeroSection />
      <LoveStorySection />
      <AboutWeddingSection />
      <ScheduleSection />
      <MoreInfoSection />
      <ContactSection />
    </div>
  );
};

export default Index;
