
import React from 'react';
import { useWedding } from '../contexts/WeddingContext';
import { EditableText } from './EditableText';

export const LoveStorySection: React.FC = () => {
  const { weddingData } = useWedding();

  return (
    <section className="bg-rust-500 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Text Content */}
          <div className="text-cream-50 space-y-8">
            {/* Decorative palm tree icon */}
            <div className="mb-8">
              <svg className="w-12 h-16 text-rust-800" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L8 6h8l-4-4zm0 4c-2 0-4 1-4 3v2c0 1 1 2 2 2h4c1 0 2-1 2-2V9c0-2-2-3-4-3zm-2 10h4v6h-4v-6z"/>
              </svg>
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
          </div>

          {/* Image */}
          <div className="relative">
            <div className="bg-rust-600 p-4 rounded-lg shadow-2xl">
              <img 
                src="/lovable-uploads/d5db2c85-f185-44a6-a1f6-9993d86d9755.png"
                alt={weddingData.loveStory.imageAlt}
                className="w-full h-96 md:h-[500px] object-cover rounded"
              />
            </div>
            
            {/* Decorative frame corners */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-l-3 border-t-3 border-cream-200"></div>
            <div className="absolute -top-2 -right-2 w-6 h-6 border-r-3 border-t-3 border-cream-200"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-3 border-b-3 border-cream-200"></div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-3 border-b-3 border-cream-200"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
