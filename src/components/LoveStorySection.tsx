import React from 'react';
import { useWedding } from '../contexts/WeddingContext';
import { EditableText } from './EditableText';
import { EditableImage } from './EditableImage';
import { Camera, MapPin, Calendar } from 'lucide-react';

export const LoveStorySection: React.FC = () => {
  const { weddingData } = useWedding();

  return (
    <section className="bg-rust-500 py-16 md:py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <Camera className="absolute top-20 right-20 w-16 h-16 text-cream-200" />
        <MapPin className="absolute bottom-32 left-16 w-12 h-12 text-cream-300" />
        <Calendar className="absolute top-1/2 right-1/4 w-10 h-10 text-cream-200" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Text Content */}
          <div className="text-cream-50 space-y-8">
            {/* Decorative elements with icons */}
            <div className="mb-8 flex items-center space-x-4">
              <svg className="w-12 h-16 text-rust-800" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L8 6h8l-4-4zm0 4c-2 0-4 1-4 3v2c0 1 1 2 2 2h4c1 0 2-1 2-2V9c0-2-2-3-4-3zm-2 10h4v6h-4v-6z"/>
              </svg>
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-rust-700 rounded-full"></div>
                <div className="w-2 h-2 bg-rust-600 rounded-full"></div>
                <div className="w-2 h-2 bg-rust-700 rounded-full"></div>
              </div>
            </div>

            <EditableText path="loveStory.title">
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-cream-100">
                {weddingData.loveStory.title}
              </h2>
            </EditableText>

            <EditableText path="loveStory.content" isTextarea>
              <p className="text-lg md:text-xl leading-relaxed text-cream-200">
                {weddingData.loveStory.content}
              </p>
            </EditableText>

            {/* Additional decorative icons */}
            <div className="flex items-center space-x-6 pt-6">
              <div className="flex items-center space-x-2 text-cream-300">
                <MapPin className="w-5 h-5" />
                <span className="text-sm font-script">Where we met</span>
              </div>
              <div className="flex items-center space-x-2 text-cream-300">
                <Calendar className="w-5 h-5" />
                <span className="text-sm font-script">First date</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            {/* Photo frame decorations */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border-2 border-cream-200 rounded-full opacity-60"></div>
            <div className="absolute -top-2 -right-6 w-6 h-6 border-2 border-cream-300 rotate-45 opacity-50"></div>
            
            <div className="bg-rust-600 p-4 rounded-lg shadow-2xl relative">
              <EditableImage 
                path="loveStory.image"
                alt={weddingData.loveStory.imageAlt || "Our love story"}
                className="w-full h-96 md:h-[500px] object-cover rounded"
              />
              
              {/* Photo corner elements */}
              <div className="absolute top-2 left-2">
                <Camera className="w-6 h-6 text-cream-200 opacity-70" />
              </div>
            </div>
            
            {/* Decorative frame corners */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-l-3 border-t-3 border-cream-200"></div>
            <div className="absolute -top-2 -right-2 w-6 h-6 border-r-3 border-t-3 border-cream-200"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-3 border-b-3 border-cream-200"></div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-3 border-b-3 border-cream-200"></div>

            {/* Floating decorative elements around image */}
            <div className="absolute -bottom-6 -right-8 w-12 h-12 border border-cream-300 rounded-full opacity-40"></div>
            <div className="absolute -top-8 -left-6 w-4 h-4 bg-cream-200 rounded-full opacity-50"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
