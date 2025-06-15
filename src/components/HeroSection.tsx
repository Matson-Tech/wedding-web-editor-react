
import React from 'react';
import { useWedding } from '../contexts/WeddingContext';
import { EditableText } from './EditableText';
import { Heart, Sparkles, Star } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { weddingData } = useWedding();

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-rust-600 via-rust-500 to-rust-700 flex items-center justify-center text-white overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Heart className="absolute top-20 left-20 w-8 h-8 text-cream-200 opacity-30 animate-pulse" />
        <Sparkles className="absolute top-40 right-32 w-6 h-6 text-cream-300 opacity-40 animate-bounce" />
        <Star className="absolute bottom-32 left-32 w-5 h-5 text-cream-200 opacity-35" />
        <Heart className="absolute bottom-20 right-20 w-7 h-7 text-cream-300 opacity-25 animate-pulse" style={{ animationDelay: '1s' }} />
        <Sparkles className="absolute top-1/3 left-1/4 w-4 h-4 text-cream-200 opacity-30" />
        <Star className="absolute top-2/3 right-1/4 w-6 h-6 text-cream-300 opacity-40 animate-bounce" style={{ animationDelay: '2s' }} />
      </div>
      
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
          
          <div className="font-serif text-4xl md:text-6xl lg:text-7xl text-cream-200 flex items-center justify-center space-x-4">
            <Heart className="w-8 h-8 md:w-12 md:h-12 text-cream-300" />
            <span>&</span>
            <Heart className="w-8 h-8 md:w-12 md:h-12 text-cream-300" />
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

      {/* Corner decorative elements */}
      <div className="absolute top-10 left-10">
        <svg className="w-16 h-16 text-cream-200 opacity-20" fill="currentColor" viewBox="0 0 64 64">
          <path d="M32 4 L36 20 L52 16 L40 28 L56 32 L40 36 L52 48 L36 44 L32 60 L28 44 L12 48 L24 36 L8 32 L24 28 L12 16 L28 20 Z"/>
        </svg>
      </div>
      
      <div className="absolute bottom-10 right-10">
        <svg className="w-12 h-12 text-cream-300 opacity-25" fill="currentColor" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="1" fill="none"/>
          <circle cx="24" cy="24" r="4" fill="currentColor"/>
        </svg>
      </div>
    </section>
  );
};
