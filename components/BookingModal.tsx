import React, { useState } from 'react';
import { Room, BookingFormData } from '../types';
import { Button } from './Button';

interface BookingModalProps {
  room: Room;
  onClose: () => void;
  onSubmit: (data: BookingFormData) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ room, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<BookingFormData>({
    checkIn: '',
    checkOut: '',
    guests: 1,
    name: '',
    email: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-strange-black/80 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md p-6 relative animate-[fadeIn_0.3s_ease-out]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-1">RESERVATION</h2>
          <p className="text-gray-500 text-sm">Booking: <span className="text-strange-accent">{room.name}</span></p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase mb-1">Check In</label>
              <input 
                type="date" 
                name="checkIn"
                required
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-strange-black transition-colors bg-transparent"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase mb-1">Check Out</label>
              <input 
                type="date" 
                name="checkOut"
                required
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-strange-black transition-colors bg-transparent"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1">Guests</label>
            <select 
              name="guests"
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-strange-black transition-colors bg-transparent"
              onChange={handleChange}
              value={formData.guests}
            >
              {[...Array(room.capacity)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1} Person{i > 0 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1">Name</label>
            <input 
              type="text" 
              name="name"
              required
              placeholder="Your full name"
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-strange-black transition-colors bg-transparent"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1">Email</label>
            <input 
              type="email" 
              name="email"
              required
              placeholder="hello@example.com"
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-strange-black transition-colors bg-transparent"
              onChange={handleChange}
            />
          </div>

          <div className="pt-4">
            <Button type="submit" fullWidth>
              CONFIRM BOOKING — ₩{room.price.toLocaleString()}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};