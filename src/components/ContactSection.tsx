
import React from 'react';
import { useWedding } from '../contexts/WeddingContext';
import { EditableText } from './EditableText';
import { Phone, Mail, MapPin, Heart, Book, User } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { weddingData } = useWedding();

  return (
    <section className="bg-gradient-to-b from-cream-300 to-cream-400 py-16 md:py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <Mail className="absolute top-20 left-20 w-20 h-20 text-burgundy-600" />
        <Phone className="absolute bottom-32 right-16 w-16 h-16 text-burgundy-700" />
        <Heart className="absolute top-1/2 left-1/4 w-12 h-12 text-burgundy-600" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Enhanced Library Illustration */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              {/* Library with person reading SVG */}
              <svg className="w-80 h-64 text-burgundy-700" fill="currentColor" viewBox="0 0 320 256">
                {/* Bookshelf background */}
                <rect x="20" y="50" width="280" height="200" stroke="currentColor" strokeWidth="2" fill="none"/>
                
                {/* Books on shelves */}
                <rect x="30" y="60" width="20" height="180" />
                <rect x="60" y="60" width="20" height="180" />
                <rect x="90" y="60" width="20" height="180" />
                <rect x="120" y="60" width="20" height="180" />
                <rect x="150" y="60" width="20" height="180" />
                <rect x="180" y="60" width="20" height="180" />
                <rect x="210" y="60" width="20" height="180" />
                <rect x="240" y="60" width="20" height="180" />
                <rect x="270" y="60" width="20" height="180" />
                
                {/* Shelf lines */}
                <line x1="25" y1="120" x2="295" y2="120" stroke="currentColor" strokeWidth="1"/>
                <line x1="25" y1="180" x2="295" y2="180" stroke="currentColor" strokeWidth="1"/>
                
                {/* Person reading */}
                <circle cx="160" cy="140" r="15"/>
                <rect x="150" y="155" width="20" height="40"/>
                <rect x="145" y="195" width="10" height="30"/>
                <rect x="165" y="195" width="10" height="30"/>
                
                {/* Open book */}
                <rect x="140" y="190" width="40" height="15" rx="2"/>
                <line x1="160" y1="190" x2="160" y2="205" stroke="currentColor" strokeWidth="1"/>
                
                {/* Table */}
                <rect x="120" y="200" width="80" height="5"/>
                <rect x="125" y="205" width="5" height="20"/>
                <rect x="190" y="205" width="5" height="20"/>
                
                {/* Decorative lamp */}
                <circle cx="200" cy="180" r="8" fill="none" stroke="currentColor" strokeWidth="1"/>
                <rect x="198" y="170" width="4" height="10"/>
              </svg>
              
              {/* Floating decorative elements */}
              <div className="absolute top-10 right-10 animate-pulse">
                <Book className="w-8 h-8 text-burgundy-600 opacity-60" />
              </div>
              
              <div className="absolute bottom-10 left-10 animate-bounce" style={{ animationDelay: '1s' }}>
                <Mail className="w-6 h-6 text-burgundy-500 opacity-70" />
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-12">
            <div className="text-center lg:text-left">
              <EditableText path="contact.title">
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-burgundy-800 flex items-center justify-center lg:justify-start">
                  <User className="w-8 h-8 mr-4" />
                  {weddingData.contact.title}
                </h2>
              </EditableText>
              
              {/* Decorative divider */}
              <div className="flex items-center justify-center lg:justify-start space-x-4 mt-6">
                <div className="w-8 h-px bg-burgundy-600"></div>
                <Heart className="w-5 h-5 text-burgundy-600" />
                <div className="w-8 h-px bg-burgundy-600"></div>
              </div>
            </div>

            {/* Bride Contact */}
            <div className="space-y-4 bg-white/50 p-6 rounded-lg border border-burgundy-200">
              <EditableText path="contact.bride.name">
                <h3 className="font-script text-3xl md:text-4xl text-burgundy-700 flex items-center">
                  <User className="w-6 h-6 mr-3 text-burgundy-600" />
                  {weddingData.contact.bride.name}
                </h3>
              </EditableText>
              
              <div className="space-y-2 text-burgundy-600 ml-9">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <EditableText path="contact.bride.address">
                    <span>{weddingData.contact.bride.address}</span>
                  </EditableText>
                </div>
                <EditableText path="contact.bride.city">
                  <div className="ml-6">{weddingData.contact.bride.city}</div>
                </EditableText>
                <EditableText path="contact.bride.country">
                  <div className="ml-6">{weddingData.contact.bride.country}</div>
                </EditableText>
              </div>
              
              <div className="border-t border-burgundy-300 pt-4 space-y-2 text-burgundy-700 ml-9">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <EditableText path="contact.bride.phone">
                    <span>Telephone: {weddingData.contact.bride.phone}</span>
                  </EditableText>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <EditableText path="contact.bride.mobile">
                    <span>Mobile: {weddingData.contact.bride.mobile}</span>
                  </EditableText>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <EditableText path="contact.bride.email">
                    <span className="font-script text-lg">{weddingData.contact.bride.email}</span>
                  </EditableText>
                </div>
              </div>
            </div>

            {/* Groom Contact */}
            <div className="space-y-4 bg-white/50 p-6 rounded-lg border border-burgundy-200">
              <EditableText path="contact.groom.name">
                <h3 className="font-script text-3xl md:text-4xl text-burgundy-700 flex items-center">
                  <User className="w-6 h-6 mr-3 text-burgundy-600" />
                  {weddingData.contact.groom.name}
                </h3>
              </EditableText>
              
              <div className="space-y-2 text-burgundy-600 ml-9">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <EditableText path="contact.groom.address">
                    <span>{weddingData.contact.groom.address}</span>
                  </EditableText>
                </div>
                <EditableText path="contact.groom.city">
                  <div className="ml-6">{weddingData.contact.groom.city}</div>
                </EditableText>
                <EditableText path="contact.groom.country">
                  <div className="ml-6">{weddingData.contact.groom.country}</div>
                </EditableText>
              </div>
              
              <div className="border-t border-burgundy-300 pt-4 space-y-2 text-burgundy-700 ml-9">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <EditableText path="contact.groom.phone">
                    <span>Telephone: {weddingData.contact.groom.phone}</span>
                  </EditableText>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <EditableText path="contact.groom.mobile">
                    <span>Mobile: {weddingData.contact.groom.mobile}</span>
                  </EditableText>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <EditableText path="contact.groom.email">
                    <span className="font-script text-lg">{weddingData.contact.groom.email}</span>
                  </EditableText>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
