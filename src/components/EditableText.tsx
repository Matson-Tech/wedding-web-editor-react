
import React, { useState } from 'react';
import { useWedding } from '../contexts/WeddingContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import { Edit } from 'lucide-react';

interface EditableTextProps {
  path: string;
  children: React.ReactNode;
  isTextarea?: boolean;
  className?: string;
}

export const EditableText: React.FC<EditableTextProps> = ({ 
  path, 
  children, 
  isTextarea = false,
  className = ''
}) => {
  const { isAuthenticated, weddingData, updateWeddingData, saveData } = useWedding();
  const [isOpen, setIsOpen] = useState(false);
  const [tempValue, setTempValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const getValue = (data: any, path: string) => {
    return path.split('.').reduce((obj, key) => obj?.[key], data);
  };

  const currentValue = getValue(weddingData, path);

  const handleEdit = () => {
    setTempValue(currentValue || '');
    setIsOpen(true);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      updateWeddingData(path, tempValue);
      await saveData();
      setIsOpen(false);
      toast.success('Content updated successfully!');
    } catch (error) {
      toast.error('Failed to save changes');
      console.error('Save error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setTempValue(currentValue || '');
    setIsOpen(false);
  };

  return (
    <div className={`relative group ${className}`}>
      {children}
      {isAuthenticated && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white shadow-md hover:bg-gray-50 h-8 w-8 p-0"
              onClick={handleEdit}
            >
              <Edit className="h-4 w-4 text-gray-600" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Content</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {isTextarea ? (
                <Textarea
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="min-h-[100px]"
                  placeholder="Enter your content..."
                />
              ) : (
                <Input
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  placeholder="Enter your content..."
                />
              )}
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={isSaving}>
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
