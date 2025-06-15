
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWedding } from '../contexts/WeddingContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { ArrowLeft, Plus, Trash, Camera, Heart, Star } from 'lucide-react';
import { toast } from 'sonner';

const Gallery = () => {
  const { weddingData, isAuthenticated, addArrayItem, deleteArrayItemById, saveData } = useWedding();
  const [isAddingPhoto, setIsAddingPhoto] = useState(false);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoAlt, setNewPhotoAlt] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleAddPhoto = async () => {
    if (!newPhotoUrl.trim()) {
      toast.error('Please enter a photo URL');
      return;
    }

    try {
      setIsSaving(true);
      const newPhoto = {
        id: Date.now().toString(),
        url: newPhotoUrl.trim(),
        alt: newPhotoAlt.trim() || 'Wedding photo'
      };

      addArrayItem('gallery.photos', newPhoto);
      await saveData();
      
      setNewPhotoUrl('');
      setNewPhotoAlt('');
      setIsAddingPhoto(false);
      toast.success('Photo added successfully!');
    } catch (error) {
      toast.error('Failed to add photo');
      console.error('Add photo error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeletePhoto = async (photoId: string) => {
    try {
      setIsSaving(true);
      deleteArrayItemById('gallery.photos', photoId);
      await saveData();
      toast.success('Photo deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete photo');
      console.error('Delete photo error:', error);
    } finally {
      setIsSaving(false);
    }
  };

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
                    Add Photo
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Photo</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Photo URL</label>
                      <Input
                        value={newPhotoUrl}
                        onChange={(e) => setNewPhotoUrl(e.target.value)}
                        placeholder="https://example.com/photo.jpg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Photo Description</label>
                      <Input
                        value={newPhotoAlt}
                        onChange={(e) => setNewPhotoAlt(e.target.value)}
                        placeholder="Description of the photo"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsAddingPhoto(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddPhoto} disabled={isSaving}>
                        {isSaving ? 'Adding...' : 'Add Photo'}
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
                      disabled={isSaving}
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
