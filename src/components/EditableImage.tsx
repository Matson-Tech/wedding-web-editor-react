
import React, { useState } from 'react';
import { useWedding } from '../contexts/WeddingContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner';
import { Edit, Image } from 'lucide-react';

interface EditableImageProps {
  path: string;
  className?: string;
  alt: string;
}

export const EditableImage: React.FC<EditableImageProps> = ({ 
  path, 
  className = '',
  alt
}) => {
  const { isAuthenticated, weddingData, updateWeddingData, saveData } = useWedding();
  const [isOpen, setIsOpen] = useState(false);
  const [tempUrl, setTempUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const getValue = (data: any, path: string) => {
    return path.split('.').reduce((obj, key) => obj?.[key], data);
  };

  const currentUrl = getValue(weddingData, path);

  const handleEdit = () => {
    setTempUrl(currentUrl || '');
    setIsOpen(true);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      updateWeddingData(path, tempUrl);
      await saveData();
      setIsOpen(false);
      toast.success('Image updated successfully!');
    } catch (error) {
      toast.error('Failed to save changes');
      console.error('Save error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setTempUrl(currentUrl || '');
    setIsOpen(false);
  };

  return (
    <div className="relative group">
      <img 
        src={currentUrl} 
        alt={alt}
        className={className}
      />
      {isAuthenticated && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 backdrop-blur-sm shadow-md hover:bg-white h-10 w-10 p-0"
              onClick={handleEdit}
            >
              <Edit className="h-4 w-4 text-gray-600" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                Update Background Image
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="imageUrl" className="text-sm font-medium">
                  Image URL
                </label>
                <Input
                  id="imageUrl"
                  value={tempUrl}
                  onChange={(e) => setTempUrl(e.target.value)}
                  placeholder="Enter image URL..."
                />
              </div>
              {tempUrl && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Preview</label>
                  <div className="w-full h-32 rounded-md overflow-hidden bg-gray-100">
                    <img 
                      src={tempUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              )}
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={isSaving || !tempUrl}>
                  {isSaving ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
