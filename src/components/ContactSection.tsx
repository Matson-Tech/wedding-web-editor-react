
import React from 'react';
import { useWedding } from '../contexts/WeddingContext';
import { EditableText } from './EditableText';

export const ContactSection: React.FC = () => {
  const { weddingData } = useWedding();

  return (
    <section className="bg-gradient-to-b from-cream-300 to-cream-400 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Library Illustration */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              {/* Woman reading in library SVG */}
              <svg className="w-80 h-64 text-burgundy-700" fill="currentColor" viewBox="0 0 320 256">
                {/* Bookshelf background */}
                <rect x="20" y="50" width="280" height="200" stroke="currentColor" strokeWidth="2" fill="none"/>
                <rect x="30" y="60" width="20" height="180" />
                <rect x="60" y="60" width="20" height="180" />
                <rect x="90" y="60" width="20" height="180" />
                <rect x="120" y="60" width="20" height="180" />
                <rect x="150" y="60" width="20" height="180" />
                <rect x="180" y="60" width="20" height="180" />
                <rect x="210" y="60" width="20" height="180" />
                <rect x="240" y="60" width="20" height="180" />
                <rect x="270" y="60" width="20" height="180" />
                
                {/* Woman figure */}
                <circle cx="160" cy="140" r="15"/>
                <rect x="150" y="155" width="20" height="40"/>
                <rect x="145" y="195" width="10" height="30"/>
                <rect x="165" y="195" width="10" height="30"/>
                
                {/* Table */}
                <rect x="120" y="200" width="80" height="5"/>
                <rect x="125" y="205" width="5" height="20"/>
                <rect x="190" y="205" width="5" height="20"/>
              </svg>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-12">
            <EditableText path="contact.title">
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-burgundy-800">
                {weddingData.contact.title}
              </h2>
            </EditableText>

            {/* Bride Contact */}
            <div className="space-y-4">
              <EditableText path="contact.bride.name">
                <h3 className="font-script text-3xl md:text-4xl text-burgundy-700">
                  {weddingData.contact.bride.name}
                </h3>
              </EditableText>
              
              <div className="space-y-2 text-burgundy-600">
                <EditableText path="contact.bride.address">
                  <div>{weddingData.contact.bride.address}</div>
                </EditableText>
                <EditableText path="contact.bride.city">
                  <div>{weddingData.contact.bride.city}</div>
                </EditableText>
                <EditableText path="contact.bride.country">
                  <div>{weddingData.contact.bride.country}</div>
                </EditableText>
              </div>
              
              <div className="border-t border-burgundy-300 pt-4 space-y-1 text-burgundy-700">
                <EditableText path="contact.bride.phone">
                  <div>Telephone: {weddingData.contact.bride.phone}</div>
                </EditableText>
                <EditableText path="contact.bride.mobile">
                  <div>Mobile: {weddingData.contact.bride.mobile}</div>
                </EditableText>
                <EditableText path="contact.bride.email">
                  <div className="font-script text-lg">{weddingData.contact.bride.email}</div>
                </EditableText>
              </div>
            </div>

            {/* Groom Contact */}
            <div className="space-y-4">
              <EditableText path="contact.groom.name">
                <h3 className="font-script text-3xl md:text-4xl text-burgundy-700">
                  {weddingData.contact.groom.name}
                </h3>
              </EditableText>
              
              <div className="space-y-2 text-burgundy-600">
                <EditableText path="contact.groom.address">
                  <div>{weddingData.contact.groom.address}</div>
                </EditableText>
                <EditableText path="contact.groom.city">
                  <div>{weddingData.contact.groom.city}</div>
                </EditableText>
                <EditableText path="contact.groom.country">
                  <div>{weddingData.contact.groom.country}</div>
                </EditableText>
              </div>
              
              <div className="border-t border-burgundy-300 pt-4 space-y-1 text-burgundy-700">
                <EditableText path="contact.groom.phone">
                  <div>Telephone: {weddingData.contact.groom.phone}</div>
                </EditableText>
                <EditableText path="contact.groom.mobile">
                  <div>Mobile: {weddingData.contact.groom.mobile}</div>
                </EditableText>
                <EditableText path="contact.groom.email">
                  <div className="font-script text-lg">{weddingData.contact.groom.email}</div>
                </EditableText>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
