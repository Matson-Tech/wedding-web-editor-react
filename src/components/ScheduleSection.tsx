
import React from 'react';
import { useWedding } from '../contexts/WeddingContext';
import { EditableText } from './EditableText';
import { Button } from './ui/button';
import { Plus, Trash2, Clock, Bell, Music, Utensils } from 'lucide-react';

export const ScheduleSection: React.FC = () => {
  const { weddingData, isAuthenticated, addArrayItem, deleteArrayItem } = useWedding();

  const handleAddEvent = () => {
    addArrayItem('schedule.events', { time: '12:00 PM', event: 'New Event' });
  };

  const handleDeleteEvent = (index: number) => {
    deleteArrayItem('schedule.events', index);
  };

  const getEventIcon = (eventName: string) => {
    const lowerEvent = eventName.toLowerCase();
    if (lowerEvent.includes('ceremony')) return <Bell className="w-5 h-5" />;
    if (lowerEvent.includes('dinner') || lowerEvent.includes('meal')) return <Utensils className="w-5 h-5" />;
    if (lowerEvent.includes('reception') || lowerEvent.includes('party') || lowerEvent.includes('dance')) return <Music className="w-5 h-5" />;
    if (lowerEvent.includes('cocktail')) return <Utensils className="w-5 h-5" />;
    return <Clock className="w-5 h-5" />;
  };

  return (
    <section className="bg-gradient-to-br from-cream-200 to-cream-300 py-16 md:py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <Clock className="absolute top-20 right-20 w-24 h-24 text-burgundy-600" />
        <Music className="absolute bottom-32 left-16 w-16 h-16 text-burgundy-700" />
        <Bell className="absolute top-1/3 left-1/4 w-12 h-12 text-burgundy-600" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Cathedral Image */}
          <div className="flex justify-center lg:justify-start relative">
            <div className="relative">
              <img 
                src="/UI/schedule-img.png" 
                alt="Wedding Cathedral" 
                className="w-80 h-96 object-fit"
              />
              
              {/* Decorative elements */}
              {/* <div className="absolute top-10 right-10 animate-bounce" style={{ animationDelay: '0.5s' }}>
                <svg className="w-8 h-6 text-burgundy-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L8 6h8l-4-4zm0 4c-2 0-4 1-4 3v2c0 1 1 2 2 2h4c1 0 2-1 2-2V9c0-2-2-3-4-3z"/>
                </svg>
              </div> */}
              
              {/* <div className="absolute bottom-20 right-20 animate-pulse">
                <Bell className="w-6 h-6 text-burgundy-500 opacity-60" />
              </div> */}
              
              {/* <div className="absolute top-1/3 left-10 animate-bounce" style={{ animationDelay: '1s' }}>
                <Music className="w-5 h-5 text-burgundy-600 opacity-70" />
              </div> */}
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
                <p className="font-script text-xl md:text-2xl text-burgundy-600 flex items-center">
                  <Clock className="w-6 h-6 mr-2" />
                  {weddingData.schedule.date}
                </p>
              </EditableText>
            </div>

            {/* Events Timeline */}
            <div className="space-y-6">
              {weddingData.schedule.events.map((event, index) => (
                <div key={index} className="flex items-center space-x-6 border-b border-burgundy-300 pb-4 group bg-white/50 p-4 rounded-lg hover:bg-white/70 transition-colors duration-200">
                  <div className="flex items-center space-x-3">
                    <div className="text-burgundy-600">
                      {getEventIcon(event.event)}
                    </div>
                    <EditableText path={`schedule.events.${index}.time`}>
                      <div className="font-serif text-xl md:text-2xl font-semibold text-burgundy-800 min-w-[120px]">
                        {event.time}
                      </div>
                    </EditableText>
                  </div>
                  
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
