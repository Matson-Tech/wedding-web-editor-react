
import React from 'react';
import { useWedding } from '../contexts/WeddingContext';
import { EditableText } from './EditableText';
import { MapPin, Shirt, Car, Clock, Users, Gift } from 'lucide-react';

export const AboutWeddingSection: React.FC = () => {
  const { weddingData } = useWedding();

  return (
    <section className="bg-gradient-to-b from-cream-300 to-cream-400 py-16 md:py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <Gift className="absolute top-20 left-10 w-20 h-20 text-burgundy-600" />
        <Users className="absolute bottom-20 right-10 w-16 h-16 text-burgundy-700" />
        <Clock className="absolute top-1/2 left-20 w-12 h-12 text-burgundy-600" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
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

          {/* Decorative divider with icons */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <div className="w-8 h-px bg-burgundy-600"></div>
            <Gift className="w-6 h-6 text-burgundy-600" />
            <div className="w-8 h-px bg-burgundy-600"></div>
          </div>
        </div>

        {/* Three Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          
          {/* Getting There */}
          <div className="text-center space-y-6 group">
            {/* Icon with decorative border */}
            <div className="flex justify-center mb-6 relative">
              <div className="bg-burgundy-100 p-6 rounded-full group-hover:bg-burgundy-200 transition-colors duration-300">
                <MapPin className="w-12 h-12 text-burgundy-600" />
              </div>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-burgundy-300 rounded-full opacity-60"></div>
              <div className="absolute -bottom-2 -left-2 w-3 h-3 border-2 border-burgundy-400 rounded-full"></div>
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
          <div className="text-center space-y-6 group">
            {/* Icon with decorative border */}
            <div className="flex justify-center mb-6 relative">
              <div className="bg-burgundy-100 p-6 rounded-full group-hover:bg-burgundy-200 transition-colors duration-300">
                <Shirt className="w-12 h-12 text-burgundy-600" />
              </div>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-burgundy-300 rounded-full opacity-60"></div>
              <div className="absolute -bottom-2 -left-2 w-3 h-3 border-2 border-burgundy-400 rounded-full"></div>
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
          <div className="text-center space-y-6 group">
            {/* Icon with decorative border */}
            <div className="flex justify-center mb-6 relative">
              <div className="bg-burgundy-100 p-6 rounded-full group-hover:bg-burgundy-200 transition-colors duration-300">
                <Car className="w-12 h-12 text-burgundy-600" />
              </div>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-burgundy-300 rounded-full opacity-60"></div>
              <div className="absolute -bottom-2 -left-2 w-3 h-3 border-2 border-burgundy-400 rounded-full"></div>
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

        {/* Bottom decorative elements */}
        <div className="flex justify-center items-center space-x-8 mt-16">
          <Clock className="w-8 h-8 text-burgundy-500 opacity-60" />
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-burgundy-500 rounded-full"></div>
            <div className="w-2 h-2 bg-burgundy-600 rounded-full"></div>
            <div className="w-2 h-2 bg-burgundy-500 rounded-full"></div>
          </div>
          <Users className="w-8 h-8 text-burgundy-500 opacity-60" />
        </div>
      </div>
    </section>
  );
};
