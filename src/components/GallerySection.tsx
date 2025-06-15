
import React from 'react';
import { useWedding } from '../contexts/WeddingContext';
import { EditableText } from './EditableText';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Camera, Heart, Star } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const { weddingData } = useWedding();

  // Safety check to prevent runtime errors
  if (!weddingData.gallery || !weddingData.gallery.photos) {
    return null;
  }

  // Show only first 6 photos for home page
  const previewPhotos = weddingData.gallery.photos.slice(0, 6);

  return (
    <section className="bg-cream-50 py-16 md:py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <Camera className="absolute top-20 left-20 w-16 h-16 text-rust-400" />
        <Heart className="absolute bottom-32 right-16 w-12 h-12 text-rust-500" />
        <Star className="absolute top-1/2 left-1/4 w-10 h-10 text-rust-300" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <EditableText path="gallery.title">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-rust-800 mb-4">
              {weddingData.gallery.title}
            </h2>
          </EditableText>
          <p className="text-lg md:text-xl text-rust-600 max-w-2xl mx-auto">
            A glimpse into our journey together
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {previewPhotos.map((photo, index) => (
            <div 
              key={photo.id} 
              className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 aspect-square"
            >
              <img
                src={photo.url}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Decorative corner elements */}
              <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-cream-200 opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-cream-200 opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link to="/gallery">
            <Button 
              variant="outline" 
              className="bg-rust-700 text-cream-100 border-rust-700 hover:bg-rust-800 hover:border-rust-800 px-8 py-3 text-lg font-serif"
            >
              View All Photos
              <Camera className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute bottom-10 left-10 opacity-30">
        <div className="w-12 h-12 border border-rust-300 rounded-full animate-pulse" />
      </div>
      <div className="absolute top-20 right-10 opacity-25">
        <Heart className="w-8 h-8 text-rust-400 animate-bounce" style={{ animationDelay: '1s' }} />
      </div>
    </section>
  );
};
