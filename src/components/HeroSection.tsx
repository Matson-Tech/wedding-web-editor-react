import React from 'react';
import { useWedding } from '../contexts/WeddingContext';
import { EditableText } from './EditableText';
import { Heart, Sparkles, Star, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { supabase } from '../lib/supabase';
import imageCompression from 'browser-image-compression';
import { toast } from 'sonner';

export const HeroSection: React.FC = () => {
  const { weddingData, isAuthenticated, updateWeddingData, saveData } = useWedding();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const compressImage = async (file: File): Promise<File> => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: 'image/jpeg',
    };

    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      console.error('Compression error:', error);
      throw new Error('Failed to compress image');
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file
    if (!file.type.startsWith('image/')) {
      toast.error(`${file.name} is not an image file`);
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error(`${file.name} is larger than 5MB`);
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select an image');
      return;
    }

    try {
      setIsUploading(true);

      // Compress the image
      const compressedFile = await compressImage(selectedFile);

      // Create a unique file name
      const fileExt = 'jpg'; // Always use jpg after compression
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = fileName;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('gallery')
        .upload(filePath, compressedFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        throw new Error(error.message);
      }

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('gallery')
        .getPublicUrl(filePath);

      // Save the URL to wedding data
      updateWeddingData('heroBackground', publicUrl);
      await saveData();
      
      setIsOpen(false);
      toast.success('Background image updated successfully!');
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Failed to upload image');
    } finally {
      setIsUploading(false);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Background image */}
      <img 
        src={weddingData.heroBackground} 
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-rust-600/50 via-rust-500/50 to-rust-700/50 z-10"></div>
      
      {/* Settings Button */}
      {isAuthenticated && (
        <div className="absolute top-16 right-4 z-30">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="bg-white/90 backdrop-blur-sm shadow-md hover:bg-white h-10 w-10 p-0 rounded-full"
              >
                <Settings className="h-4 w-4 text-gray-600" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Change Background Image
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    id="hero-image-upload"
                    onChange={handleFileSelect}
                  />
                  <label
                    htmlFor="hero-image-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Settings className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">
                      Click to upload or drag and drop
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      PNG, JPG up to 5MB
                    </span>
                  </label>
                </div>

                {selectedFile && (
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => {
                      setSelectedFile(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                      }
                    }}>
                      Cancel
                    </Button>
                    <Button onClick={handleUpload} disabled={isUploading}>
                      {isUploading ? 'Uploading...' : 'Upload'}
                    </Button>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
      
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
      <div className="relative z-20 text-center px-4 animate-fade-in">
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
            {/* <Heart className="w-8 h-8 md:w-12 md:h-12 text-cream-300" /> */}
            <span>&</span>
            {/* <Heart className="w-8 h-8 md:w-12 md:h-12 text-cream-300" /> */}
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