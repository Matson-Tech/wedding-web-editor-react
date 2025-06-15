
import React from 'react';
import { useWedding } from '../contexts/WeddingContext';
import { EditableText } from './EditableText';
import { Button } from './ui/button';
import { Plus, Trash2 } from 'lucide-react';

export const ScheduleSection: React.FC = () => {
  const { weddingData, isAuthenticated, addArrayItem, deleteArrayItem } = useWedding();

  const handleAddEvent = () => {
    addArrayItem('schedule.events', { time: '12:00 PM', event: 'New Event' });
  };

  const handleDeleteEvent = (index: number) => {
    deleteArrayItem('schedule.events', index);
  };

  return (
    <section className="bg-gradient-to-br from-cream-200 to-cream-300 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Cathedral Illustration */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              {/* Cathedral SVG */}
              <svg className="w-80 h-96 text-burgundy-700" fill="currentColor" viewBox="0 0 300 400">
                {/* Cathedral structure - simplified */}
                <path d="M50 350 L50 150 L75 100 L125 80 L175 80 L225 100 L250 150 L250 350 Z"/>
                <path d="M75 350 L75 180 L100 160 L200 160 L225 180 L225 350"/>
                <circle cx="150" cy="120" r="25"/>
                <rect x="125" y="200" width="50" height="80"/>
                <rect x="90" y="220" width="20" height="60"/>
                <rect x="190" y="220" width="20" height="60"/>
                {/* Small tower */}
                <path d="M275 350 L275 200 L285 190 L295 200 L295 350"/>
                {/* Cross */}
                <path d="M148 90 L152 90 L152 105 L148 105 Z"/>
                <path d="M145 95 L155 95 L155 99 L145 99 Z"/>
              </svg>
              
              {/* Flying bird */}
              <div className="absolute top-10 right-10">
                <svg className="w-8 h-6 text-burgundy-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2 12c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2zm10-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm8 8c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Schedule Content */}
          <div className="space-y-8">
            <div>
              <EditableText path="schedule.title">
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-burgundy-800 mb-4">
                  {weddingData.schedule.title}
                </h2>
              </EditableText>
              
              <EditableText path="schedule.date">
                <p className="font-script text-xl md:text-2xl text-burgundy-600">
                  {weddingData.schedule.date}
                </p>
              </EditableText>
            </div>

            {/* Events Timeline */}
            <div className="space-y-6">
              {weddingData.schedule.events.map((event, index) => (
                <div key={index} className="flex items-center space-x-6 border-b border-burgundy-300 pb-4 group">
                  <EditableText path={`schedule.events.${index}.time`}>
                    <div className="font-serif text-xl md:text-2xl font-semibold text-burgundy-800 min-w-[120px]">
                      {event.time}
                    </div>
                  </EditableText>
                  
                  <EditableText path={`schedule.events.${index}.event`}>
                    <div className="font-script text-2xl md:text-3xl text-burgundy-700 flex-1">
                      {event.event}
                    </div>
                  </EditableText>

                  {isAuthenticated && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteEvent(index)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}

              {isAuthenticated && (
                <Button
                  onClick={handleAddEvent}
                  variant="outline"
                  className="w-full mt-6 border-burgundy-400 text-burgundy-700 hover:bg-burgundy-50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Event
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
