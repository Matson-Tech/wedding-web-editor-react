import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useWedding } from '../contexts/WeddingContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { ArrowLeft, Plus, Trash, Camera, Heart, Star, Upload, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '../lib/supabase';
import imageCompression from 'browser-image-compression';

interface FileUploadStatus {
  file: File;
  progress: number;
  status: 'pending' | 'compressing' | 'uploading' | 'success' | 'error';
  error?: string;
  originalSize?: number;
  compressedSize?: number;
}

const Gallery = () => {
  const { weddingData, isAuthenticated, addArrayItem, deleteArrayItemById, saveData } = useWedding();
  const [isAddingPhoto, setIsAddingPhoto] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileStatuses, setFileStatuses] = useState<FileUploadStatus[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    const files = Array.from(event.target.files || []);
    
    // Validate files
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not an image file`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is larger than 5MB`);
        return false;
      }
      return true;
    });

    setSelectedFiles(validFiles);
    setFileStatuses(validFiles.map(file => ({
      file,
      progress: 0,
      status: 'pending',
      originalSize: file.size
    })));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.error('Please select at least one image');
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);

      const uploadPromises = selectedFiles.map(async (file, index) => {
        try {
          // Update status to compressing
          setFileStatuses(prev => prev.map((status, i) => 
            i === index ? { ...status, status: 'compressing' } : status
          ));

          // Compress the image
          const compressedFile = await compressImage(file);
          
          // Update status with compression info
          setFileStatuses(prev => prev.map((status, i) => 
            i === index ? { 
              ...status, 
              file: compressedFile,
              compressedSize: compressedFile.size,
              status: 'uploading' 
            } : status
          ));

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

          // Update status to success
          setFileStatuses(prev => prev.map((status, i) => 
            i === index ? { ...status, status: 'success', progress: 100 } : status
          ));

          // Add to gallery
          const newPhoto = {
            id: Date.now().toString() + index,
            url: publicUrl,
            alt: file.name.split('.')[0]
          };

          return newPhoto;
        } catch (error: any) {
          // Update status to error
          setFileStatuses(prev => prev.map((status, i) => 
            i === index ? { ...status, status: 'error', error: error.message } : status
          ));
          throw error;
        }
      });

      const newPhotos = await Promise.all(uploadPromises);
      
      // Add all photos to the gallery
      for (const photo of newPhotos) {
        addArrayItem('gallery.photos', photo);
      }
      
      await saveData();
      setIsAddingPhoto(false);
      setSelectedFiles([]);
      setFileStatuses([]);
      toast.success(`Successfully uploaded ${newPhotos.length} photos!`);
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Failed to upload photos');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const getStatusIcon = (status: FileUploadStatus['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'uploading':
      case 'compressing':
        return <div className="h-4 w-4 animate-spin rounded-full border-2 border-rust-600 border-t-transparent" />;
      default:
        return <Camera className="h-4 w-4 text-gray-400" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDeletePhoto = async (photoId: string) => {
    try {
      const photo = weddingData.gallery.photos.find(p => p.id === photoId);
      if (!photo) return;

      // Extract file path from URL
      const url = new URL(photo.url);
      const filePath = url.pathname.split('/').pop();
      
      if (filePath) {
        // Delete from storage
        const { error: storageError } = await supabase.storage
          .from('gallery')
          .remove([filePath]);

        if (storageError) {
          console.error('Storage delete error:', storageError);
          throw new Error(storageError.message || 'Failed to delete file from storage');
        }
      }

      // Remove from gallery
      deleteArrayItemById('gallery.photos', photoId);
      await saveData();
      toast.success('Photo deleted successfully!');
    } catch (error: any) {
      console.error('Delete error:', error);
      toast.error(error.message || 'Failed to delete photo');
    }
  };

  // Safety check to prevent runtime errors
  if (!weddingData.gallery || !weddingData.gallery.photos) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <Camera className="w-16 h-16 text-rust-400 mx-auto mb-4" />
          <h2 className="text-2xl font-serif text-rust-700">Gallery not available</h2>
          <p className="text-rust-600">Please check back later.</p>
          <Link to="/">
            <Button variant="outline" className="mt-4">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-rust-700 text-cream-100 py-8 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <Camera className="absolute top-4 right-20 w-12 h-12" />
          <Heart className="absolute bottom-4 left-20 w-8 h-8 animate-pulse" />
          <Star className="absolute top-1/2 right-1/4 w-6 h-6" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" className="text-cream-100 hover:bg-rust-600">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
            
            {isAuthenticated && (
              <Dialog open={isAddingPhoto} onOpenChange={setIsAddingPhoto}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="bg-cream-100 text-rust-700 border-cream-100 hover:bg-cream-200">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Photos
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[90vw] sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Add New Photos</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4 px-1">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        accept="image/*"
                        multiple
                        className="hidden"
                        id="photo-upload"
                      />
                      <label
                        htmlFor="photo-upload"
                        className="cursor-pointer flex flex-col items-center"
                      >
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-600">
                          Click to upload or drag and drop
                        </span>
                        <span className="text-xs text-gray-500 mt-1">
                          PNG, JPG up to 5MB
                        </span>
                      </label>
                    </div>

                    {selectedFiles.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Selected Files:</h4>
                        <div className="max-h-40 overflow-y-auto space-y-1 bg-gray-50 rounded-md p-2">
                          {selectedFiles.map((file, index) => {
                            const status = fileStatuses[index];
                            return (
                              <div
                                key={index}
                                className="text-sm text-gray-600 flex items-center justify-between gap-2 bg-white p-2 rounded border border-gray-100"
                              >
                                <div className="flex items-center gap-2 min-w-0 flex-1">
                                  {getStatusIcon(status?.status || 'pending')}
                                  <span
                                    className="truncate max-w-[200px] sm:max-w-[300px]"
                                    title={file.name}
                                  >
                                    {file.name}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  {status?.status === 'uploading' && (
                                    <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                      <div
                                        className="h-full bg-rust-600 transition-all duration-300"
                                        style={{ width: `${status.progress}%` }}
                                      />
                                    </div>
                                  )}
                                  <div className="flex flex-col items-end">
                                    <span className="text-xs text-gray-500 whitespace-nowrap">
                                      {formatFileSize(status?.compressedSize || file.size)}
                                    </span>
                                    {status?.compressedSize && status.originalSize && (
                                      <span className="text-xs text-green-600">
                                        {Math.round((1 - status.compressedSize / status.originalSize) * 100)}% smaller
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedFiles([]);
                          setFileStatuses([]);
                          setIsAddingPhoto(false);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleUpload}
                        disabled={isUploading || selectedFiles.length === 0}
                      >
                        {isUploading ? 'Uploading...' : `Upload ${selectedFiles.length} Photos`}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
          
          <div className="mt-8 text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {weddingData.gallery.title}
            </h1>
            <p className="text-lg md:text-xl text-cream-200 max-w-2xl mx-auto">
              Capturing every precious moment of our journey together
            </p>
          </div>
        </div>
      </div>

      {/* Photo Gallery */}
      <div className="container mx-auto px-4 py-12">
        {weddingData.gallery.photos.length === 0 ? (
          <div className="text-center py-16">
            <Camera className="w-16 h-16 text-rust-400 mx-auto mb-4" />
            <h3 className="text-2xl font-serif text-rust-700 mb-2">No photos yet</h3>
            <p className="text-rust-600 mb-6">Start building your gallery by adding some beautiful photos!</p>
            {isAuthenticated && (
              <Button onClick={() => setIsAddingPhoto(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add First Photo
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {weddingData.gallery.photos.map((photo) => (
              <div 
                key={photo.id} 
                className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 aspect-square"
              >
                <img
                  src={photo.url}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                
                {/* Overlay with delete button for authenticated users */}
                {isAuthenticated && (
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeletePhoto(photo.id)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                
                {/* Decorative corner elements */}
                <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-cream-200 opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
                <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-cream-200 opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating decorative elements */}
      <div className="fixed bottom-10 left-10 opacity-30 pointer-events-none">
        <div className="w-12 h-12 border border-rust-300 rounded-full animate-pulse" />
      </div>
      <div className="fixed top-1/3 right-10 opacity-25 pointer-events-none">
        <Heart className="w-8 h-8 text-rust-400 animate-bounce" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
};

export default Gallery;