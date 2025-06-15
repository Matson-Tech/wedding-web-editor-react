
import React, { useState } from 'react';
import { useWedding } from '../contexts/WeddingContext';
import { EditableText } from './EditableText';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Heart, MessageCircle, Trash, Send, Star, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export const WishesSection: React.FC = () => {
  const { weddingData, isAuthenticated, addArrayItem, deleteArrayItemById, saveData } = useWedding();
  const [isAddingWish, setIsAddingWish] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [wishMessage, setWishMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleAddWish = async () => {
    if (!guestName.trim() || !wishMessage.trim()) {
      toast.error('Please fill in both your name and message');
      return;
    }

    try {
      setIsSaving(true);
      const newWish = {
        id: Date.now().toString(),
        name: guestName.trim(),
        message: wishMessage.trim(),
        timestamp: new Date().toISOString()
      };

      addArrayItem('wishes.list', newWish);
      await saveData();
      
      setGuestName('');
      setWishMessage('');
      setIsAddingWish(false);
      toast.success('Thank you for your wishes!');
    } catch (error) {
      toast.error('Failed to send wishes. Please try again.');
      console.error('Add wish error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteWish = async (wishId: string) => {
    try {
      setIsSaving(true);
      deleteArrayItemById('wishes.list', wishId);
      await saveData();
      toast.success('Wish deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete wish');
      console.error('Delete wish error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Safety check
  if (!weddingData.wishes) {
    return null;
  }

  // Show latest 6 wishes
  const recentWishes = weddingData.wishes.list
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 6);

  return (
    <section className="bg-gradient-to-br from-cream-50 to-rust-50 py-16 md:py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <Heart className="absolute top-20 left-20 w-16 h-16 text-rust-400 animate-pulse" />
        <MessageCircle className="absolute bottom-32 right-16 w-12 h-12 text-rust-500" />
        <Star className="absolute top-1/2 left-1/4 w-10 h-10 text-rust-300 animate-bounce" style={{ animationDelay: '1s' }} />
        <Sparkles className="absolute top-1/3 right-1/3 w-8 h-8 text-rust-400" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <EditableText path="wishes.title">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-rust-800 mb-4">
              {weddingData.wishes.title}
            </h2>
          </EditableText>
          <p className="text-lg md:text-xl text-rust-600 max-w-2xl mx-auto mb-8">
            Share your love and best wishes for our special day
          </p>
          
          {/* Add Wish Button */}
          <Dialog open={isAddingWish} onOpenChange={setIsAddingWish}>
            <DialogTrigger asChild>
              <Button className="bg-rust-700 text-cream-100 hover:bg-rust-800 px-8 py-3 text-lg font-serif">
                <Send className="mr-2 w-5 h-5" />
                Send Your Wishes
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Send Your Wedding Wishes</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Your Name</label>
                  <Input
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Your Message</label>
                  <Textarea
                    value={wishMessage}
                    onChange={(e) => setWishMessage(e.target.value)}
                    placeholder="Share your wishes for the happy couple..."
                    rows={4}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddingWish(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddWish} disabled={isSaving}>
                    {isSaving ? 'Sending...' : 'Send Wishes'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Wishes Display */}
        {recentWishes.length === 0 ? (
          <div className="text-center py-16">
            <MessageCircle className="w-16 h-16 text-rust-400 mx-auto mb-4" />
            <h3 className="text-2xl font-serif text-rust-700 mb-2">No wishes yet</h3>
            <p className="text-rust-600 mb-6">Be the first to share your wishes for the happy couple!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentWishes.map((wish) => (
              <Card key={wish.id} className="bg-white/80 backdrop-blur-sm border-rust-200 hover:shadow-lg transition-all duration-300 relative group">
                {isAuthenticated && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteWish(wish.id)}
                    disabled={isSaving}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-red-600 hover:bg-red-700"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                )}
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-serif text-rust-700 flex items-center">
                    <Heart className="w-4 h-4 mr-2 text-rust-500" />
                    {wish.name}
                  </CardTitle>
                  <p className="text-sm text-rust-500">{formatDate(wish.timestamp)}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-rust-600 leading-relaxed">{wish.message}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {weddingData.wishes.list.length > 6 && (
          <div className="text-center mt-8">
            <p className="text-rust-600">
              And {weddingData.wishes.list.length - 6} more wonderful wishes...
            </p>
          </div>
        )}
      </div>

      {/* Floating decorative elements */}
      <div className="absolute bottom-10 left-10 opacity-30">
        <div className="w-12 h-12 border border-rust-300 rounded-full animate-pulse" />
      </div>
      <div className="absolute top-20 right-10 opacity-25">
        <Sparkles className="w-8 h-8 text-rust-400 animate-bounce" style={{ animationDelay: '2s' }} />
      </div>
    </section>
  );
};
