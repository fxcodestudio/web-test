import React, { useState } from 'react';
import { Room } from '../types';
import { Button } from './Button';

interface RoomCardProps {
  room: Room;
  onBook: (room: Room) => void;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room, onBook }) => {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIdx((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIdx((prev) => (prev - 1 + room.images.length) % room.images.length);
  };

  return (
    <div className="flex flex-col gap-4 group">
      {/* Image Container (Instagram style aspect ratio 4:5 or similar) */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        <img 
          src={room.images[currentImageIdx]} 
          alt={room.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {room.images.map((_, idx) => (
            <div 
              key={idx} 
              className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentImageIdx ? 'bg-white scale-125' : 'bg-white/50'}`} 
            />
          ))}
        </div>

        {/* Arrow Controls - Visible on Hover */}
        <button 
          onClick={prevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <button 
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-baseline">
          <h3 className="text-lg font-bold tracking-tight">{room.name}</h3>
          <span className="text-sm font-medium">₩{room.price.toLocaleString()}</span>
        </div>
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
          {room.description}
        </p>
        <div className="pt-2">
           <Button onClick={() => onBook(room)} variant="outline" fullWidth>
             RESERVE
           </Button>
        </div>
      </div>
    </div>
  );
};