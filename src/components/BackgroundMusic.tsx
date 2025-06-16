import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';

export const BackgroundMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio element with default music
    if (!audioRef.current) {
      audioRef.current = new Audio('/music/music.mp3');
      audioRef.current.loop = true;
      
      // Try to autoplay
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Autoplay started successfully
            setIsPlaying(true);
          })
          .catch(error => {
            // Autoplay was prevented
            console.log('Autoplay prevented:', error);
            // Don't show error toast as this is expected behavior
            setIsPlaying(false);
          });
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error);
        toast.error('Failed to play music');
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="absolute top-10 right-4 z-50">
      <Button
        variant="outline"
        size="icon"
        onClick={togglePlay}
        className="bg-white/90 backdrop-blur-sm hover:bg-white"
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>
    </div>
  );
}; 