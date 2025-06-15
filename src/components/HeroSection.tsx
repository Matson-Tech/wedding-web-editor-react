
import React from 'react';
import { useWedding } from '../contexts/WeddingContext';
import { EditableText } from './EditableText';

export const HeroSection: React.FC = () => {
  const { weddingData } = useWedding();

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-rust-600 via-rust-500 to-rust-700 flex items-center justify-center text-white overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 animate-fade-in">
        <EditableText path="tagline" className="mb-6">
          <p className="font-script text-2xl md:text-3xl lg:text-4xl mb-6 text-cream-100">
            {weddingData.tagline}
          </p>
        </EditableText>
        
        <div className="space-y-4">
          <EditableText path="coupleNames.groom">
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-wide">
              {weddingData.coupleNames.groom}
            </h1>
          </EditableText>
          
          <div className="font-serif text-4xl md:text-6xl lg:text-7xl text-cream-200">
            &
          </div>
          
          <EditableText path="coupleNames.bride">
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-wide">
              {weddingData.coupleNames.bride}
            </h1>
          </EditableText>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-10 left-10 opacity-20">
        <div className="w-16 h-24 border-l-2 border-cream-200"></div>
      </div>
      <div className="absolute top-20 right-10 opacity-20">
        <div className="w-8 h-8 border border-cream-200 rounded-full"></div>
      </div>
    </section>
  );
};
