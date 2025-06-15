
import React from 'react';
import { useWedding } from '../contexts/WeddingContext';
import { EditableText } from './EditableText';

export const AboutWeddingSection: React.FC = () => {
  const { weddingData } = useWedding();

  return (
    <section className="bg-gradient-to-b from-cream-300 to-cream-400 py-16 md:py-24">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <EditableText path="aboutWedding.title">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-burgundy-800 mb-6">
              {weddingData.aboutWedding.title}
            </h2>
          </EditableText>
          
          <EditableText path="aboutWedding.subtitle">
            <p className="text-lg md:text-xl text-burgundy-700 max-w-3xl mx-auto">
              {weddingData.aboutWedding.subtitle}
            </p>
          </EditableText>
        </div>

        {/* Three Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          
          {/* Getting There */}
          <div className="text-center space-y-6">
            {/* Building Icon */}
            <div className="flex justify-center mb-6">
              <svg className="w-20 h-24 text-burgundy-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 21h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18V7H3v2zm0-4h18V3H3v2z"/>
              </svg>
            </div>
            
            <EditableText path="aboutWedding.sections.gettingThere.title">
              <h3 className="font-script text-3xl md:text-4xl text-burgundy-800 mb-4">
                {weddingData.aboutWedding.sections.gettingThere.title}
              </h3>
            </EditableText>
            
            <EditableText path="aboutWedding.sections.gettingThere.content" isTextarea>
              <p className="text-burgundy-700 leading-relaxed">
                {weddingData.aboutWedding.sections.gettingThere.content}
              </p>
            </EditableText>
          </div>

          {/* What to Wear */}
          <div className="text-center space-y-6">
            {/* Dancing Couple Icon */}
            <div className="flex justify-center mb-6">
              <svg className="w-20 h-24 text-burgundy-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.5 5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm7 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM3.5 11c-.8 0-1.5.7-1.5 1.5S2.7 14 3.5 14 5 13.3 5 12.5 4.3 11 3.5 11zm17 0c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5z"/>
              </svg>
            </div>
            
            <EditableText path="aboutWedding.sections.whatToWear.title">
              <h3 className="font-script text-3xl md:text-4xl text-burgundy-800 mb-4">
                {weddingData.aboutWedding.sections.whatToWear.title}
              </h3>
            </EditableText>
            
            <EditableText path="aboutWedding.sections.whatToWear.content" isTextarea>
              <p className="text-burgundy-700 leading-relaxed">
                {weddingData.aboutWedding.sections.whatToWear.content}
              </p>
            </EditableText>
          </div>

          {/* Parking Options */}
          <div className="text-center space-y-6">
            {/* Luggage Icon */}
            <div className="flex justify-center mb-6">
              <svg className="w-20 h-24 text-burgundy-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9.5 16c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5-.7-1.5-1.5-1.5-1.5.7-1.5 1.5zm8.5 0c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5-.7-1.5-1.5-1.5-1.5.7-1.5 1.5zM17 6H7c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/>
              </svg>
            </div>
            
            <EditableText path="aboutWedding.sections.parkingOptions.title">
              <h3 className="font-script text-3xl md:text-4xl text-burgundy-800 mb-4">
                {weddingData.aboutWedding.sections.parkingOptions.title}
              </h3>
            </EditableText>
            
            <EditableText path="aboutWedding.sections.parkingOptions.content" isTextarea>
              <p className="text-burgundy-700 leading-relaxed">
                {weddingData.aboutWedding.sections.parkingOptions.content}
              </p>
            </EditableText>
          </div>
        </div>
      </div>
    </section>
  );
};
