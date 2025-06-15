import React from 'react';
import { useWedding } from '../contexts/WeddingContext';
import { EditableText } from './EditableText';
import { FAQSection } from './FAQSection';

export const MoreInfoSection: React.FC = () => {
  const { weddingData } = useWedding();

  return (
    <section className="bg-rust-500 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Traveler Illustration */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              {/* Man with suitcase SVG */}
              <svg className="w-64 h-80 text-rust-800" fill="currentColor" viewBox="0 0 200 300">
                {/* Man figure - simplified */}
                <circle cx="100" cy="40" r="20"/>
                <rect x="85" y="60" width="30" height="60"/>
                <rect x="80" y="120" width="15" height="50"/>
                <rect x="105" y="120" width="15" height="50"/>
                <rect x="90" y="55" width="20" height="40"/>
                {/* Suitcase */}
                <rect x="130" y="200" width="40" height="60" rx="5"/>
                <rect x="135" y="195" width="30" height="10" rx="2"/>
                <circle cx="140" cy="230" r="3"/>
                <circle cx="160" cy="230" r="3"/>
              </svg>
            </div>
          </div>

          {/* Content */}
          <div className="text-cream-50 space-y-12">
            <EditableText path="moreInfo.title">
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-cream-100 mb-8">
                {weddingData.moreInfo.title}
              </h2>
            </EditableText>

            {/* FAQ Items */}
            <FAQSection sections={weddingData.moreInfo.sections} />

            {/* Decorative Elements */}
            <div className="flex justify-end space-x-8 mt-12">
              {/* Hat */}
              <svg className="w-16 h-12 text-rust-700" fill="currentColor" viewBox="0 0 64 32">
                <ellipse cx="32" cy="20" rx="25" ry="8"/>
                <ellipse cx="32" cy="16" rx="15" ry="10"/>
              </svg>
              
              {/* Bread/Croissant */}
              <svg className="w-16 h-12 text-rust-700" fill="currentColor" viewBox="0 0 64 32">
                <path d="M10 20 Q20 10, 35 15 Q50 20, 54 25 Q50 30, 35 25 Q20 30, 10 20 Z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
