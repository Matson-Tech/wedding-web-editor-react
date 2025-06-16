import React, { useState, useRef, useEffect } from 'react';
import { useWedding } from '../contexts/WeddingContext';
import { EditableText } from './EditableText';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Heart, MessageCircle, Trash, Send, Star, Sparkles, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { toast } from 'sonner';

export const WishesSection: React.FC = () => {
  const { weddingData, isAuthenticated, addArrayItem, deleteArrayItemById, saveData } = useWedding();
  const [isAddingWish, setIsAddingWish] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [wishMessage, setWishMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoScrollRef = useRef<NodeJS.Timeout>();

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

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    stopAutoScroll();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    startAutoScroll();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    stopAutoScroll();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    startAutoScroll();
  };

  const scrollToNext = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardWidth = container.querySelector('.wish-card')?.getBoundingClientRect().width || 0;
    const scrollAmount = cardWidth + 24;
    
    // Check if we're at the end
    if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
      // Instantly jump to start
      container.scrollTo({ left: 0, behavior: 'auto' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollToPrev = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardWidth = container.querySelector('.wish-card')?.getBoundingClientRect().width || 0;
    const scrollAmount = cardWidth + 24;
    
    // Check if we're at the start
    if (container.scrollLeft <= 0) {
      // Instantly jump to end
      container.scrollTo({ left: container.scrollWidth, behavior: 'auto' });
    } else {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const startAutoScroll = () => {
    if (isHovered) return;
    stopAutoScroll();
    autoScrollRef.current = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const cardWidth = container.querySelector('.wish-card')?.getBoundingClientRect().width || 0;
        const scrollAmount = cardWidth + 24;
        
        // Check if we've reached the end
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
          // Instantly jump to the start without animation
          container.scrollTo({ left: 0, behavior: 'auto' });
        } else {
          container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }, 2000);
  };

  const stopAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);

  // Safety check
  if (!weddingData.wishes) {
    return null;
  }

  // Create an array with duplicated wishes for infinite scroll effect
  const wishes = weddingData.wishes.list
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  
  // Duplicate the wishes array multiple times to ensure smooth infinite scroll
  const duplicatedWishes = [...wishes, ...wishes, ...wishes];

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
          
          <Dialog open={isAddingWish} onOpenChange={setIsAddingWish}>
            <DialogTrigger asChild>
              <Button className="bg-rust-700 text-cream-100 hover:bg-rust-800 px-8 py-3 text-lg font-serif transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
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
        {wishes.length === 0 ? (
          <div className="text-center py-16">
            <MessageCircle className="w-16 h-16 text-rust-400 mx-auto mb-4" />
            <h3 className="text-2xl font-serif text-rust-700 mb-2">No wishes yet</h3>
            <p className="text-rust-600 mb-6">Be the first to share your wishes for the happy couple!</p>
          </div>
        ) : (
          <div 
            className="relative"
            onMouseEnter={() => {
              setIsHovered(true);
              stopAutoScroll();
            }}
            onMouseLeave={() => {
              setIsHovered(false);
              startAutoScroll();
            }}
          >
            {/* Navigation Buttons */}
            <button
              onClick={scrollToPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 -translate-x-1/2 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-rust-700" />
            </button>
            <button
              onClick={scrollToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 translate-x-1/2 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-rust-700" />
            </button>

            {/* Scrollable Container */}
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto pb-8 px-4 snap-x snap-mandatory scrollbar-hide"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onScroll={(e) => {
                const container = e.currentTarget;
                // If we're near the end, jump to the start
                if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
                  container.scrollTo({ left: 0, behavior: 'auto' });
                }
                // If we're near the start and scrolling backwards, jump to the end
                if (container.scrollLeft <= 0 && container.scrollLeft < 0) {
                  container.scrollTo({ left: container.scrollWidth - container.clientWidth, behavior: 'auto' });
                }
              }}
              style={{ 
                cursor: isDragging ? 'grabbing' : 'grab',
                msOverflowStyle: 'none',  /* IE and Edge */
                scrollbarWidth: 'none',  /* Firefox */
                '&::-webkit-scrollbar': {  /* Chrome, Safari and Opera */
                  display: 'none'
                }
              }}
            >
              {duplicatedWishes.map((wish, index) => (
                <Card
                  key={`${wish.id}-${index}`}
                  className="wish-card min-w-[300px] max-w-[400px] flex-shrink-0 snap-center bg-white/90 backdrop-blur-sm border-rust-200 hover:shadow-xl transition-all duration-500 relative group transform hover:-translate-y-1"
                >
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
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-serif text-rust-700 flex items-center">
                        <Heart className="w-4 h-4 mr-2 text-rust-500" />
                        {wish.name}
                      </CardTitle>
                      <Quote className="w-5 h-5 text-rust-400 opacity-50" />
                    </div>
                    <p className="text-sm text-rust-500">{formatDate(wish.timestamp)}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-rust-600 leading-relaxed italic">{wish.message}</p>
                  </CardContent>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rust-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Card>
              ))}
            </div>
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
