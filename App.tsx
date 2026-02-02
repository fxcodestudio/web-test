import React, { useState, useEffect } from 'react';
import { Room, BookingFormData } from './types';
import { ROOMS, NAV_LINKS } from './constants';
import { RoomCard } from './components/RoomCard';
import { BookingModal } from './components/BookingModal';
import { Concierge } from './components/Concierge';
import { Button } from './components/Button';

const App: React.FC = () => {
  const [hasApiKey, setHasApiKey] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Check for API Key on mount
  useEffect(() => {
    const checkApiKey = async () => {
      if (window.aistudio) {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        setHasApiKey(hasKey);
      } else {
        // Fallback for local dev environments without the AI Studio wrapper
        setHasApiKey(true);
      }
    };
    checkApiKey();
  }, []);

  const handleConnectKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      // Assume success to handle race condition
      setHasApiKey(true);
    }
  };

  const handleBook = (room: Room) => {
    setSelectedRoom(room);
  };

  const handleBookingSubmit = (data: BookingFormData) => {
    // Simulate booking process
    console.log('Booking submitted:', data);
    alert(`Thank you, ${data.name}. Your stay at ${selectedRoom?.name} is confirmed.`);
    setSelectedRoom(null);
  };

  // Render the "Gate" screen if no API key is selected
  if (!hasApiKey) {
    return (
      <div className="min-h-screen bg-strange-black text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full animate-[fadeIn_1s_ease-out]">
          <p className="text-strange-accent text-sm font-bold tracking-[0.3em] mb-6 uppercase">Restricted Area</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
            STRANGE STAY<br/>
            <span className="text-gray-500 font-serif italic font-normal text-3xl">Entrance</span>
          </h1>
          <p className="text-gray-400 mb-10 leading-relaxed text-sm">
            To enter the Strange Stay experience and converse with our Concierge, 
            valid identification (API Key) is required.
          </p>
          
          <Button onClick={handleConnectKey} variant="primary" fullWidth className="bg-white text-strange-black hover:bg-strange-accent hover:text-white mb-6">
            Present Identification (Select Key)
          </Button>

          <p className="text-xs text-gray-600">
             * Please select a paid API key from a valid Google Cloud Project.<br/>
             <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="underline hover:text-gray-400">
               Billing Documentation
             </a>
          </p>
        </div>
      </div>
    );
  }

  // Main Application
  return (
    <div className="min-h-screen bg-white relative">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-30 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="text-xl font-bold tracking-[0.2em] uppercase z-40">Strange Stay</a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <a 
                key={link.label} 
                href={link.href} 
                className="text-xs font-medium tracking-widest hover:text-strange-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button variant="primary" className="text-xs py-2 px-4">Book Now</Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden z-40 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className={`w-6 h-0.5 bg-strange-black mb-1.5 transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-strange-black mb-1.5 transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-strange-black transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>
        </div>

        {/* Mobile Fullscreen Menu */}
        <div className={`fixed inset-0 bg-white z-30 flex flex-col items-center justify-center gap-8 transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
           {NAV_LINKS.map(link => (
              <a 
                key={link.label} 
                href={link.href} 
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-light tracking-widest hover:text-strange-accent"
              >
                {link.label}
              </a>
            ))}
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 px-6 md:pt-48 md:pb-32 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
           <div>
             <p className="text-sm font-bold tracking-widest mb-4 text-strange-accent animate-[fadeIn_1s_ease-out]">WELCOME TO THE UNKNOWN</p>
             <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8 animate-[fadeIn_1.2s_ease-out]">
               ESCAPE <br/>
               THE <span className="italic font-serif font-normal">ORDINARY</span>
             </h1>
             <p className="text-gray-500 max-w-md leading-relaxed mb-8 animate-[fadeIn_1.4s_ease-out]">
               Strange Stay는 일상에서 벗어난 기묘한 휴식을 제안합니다. 
               단순한 숙박이 아닌, 감각적인 경험을 예약하세요.
             </p>
             <div className="animate-[fadeIn_1.6s_ease-out]">
                <Button onClick={() => document.getElementById('rooms')?.scrollIntoView({behavior: 'smooth'})}>
                  Explore Rooms
                </Button>
             </div>
           </div>
           <div className="relative aspect-[4/5] md:aspect-square bg-gray-100 overflow-hidden animate-[fadeIn_1.5s_ease-out]">
             <img 
               src="https://picsum.photos/1000/1000?random=99" 
               alt="Hero Mood" 
               className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
             />
             <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur px-4 py-2 text-xs font-bold">
               SEOUL, KR
             </div>
           </div>
        </div>
      </header>

      {/* Scrolling Text Divider */}
      <div className="overflow-hidden py-12 border-y border-gray-100">
        <div className="whitespace-nowrap animate-[scroll_20s_linear_infinite] opacity-20 text-6xl font-bold uppercase">
          Sleep &middot; Dream &middot; Experience &middot; Strange &middot; Stay &middot; 
          Sleep &middot; Dream &middot; Experience &middot; Strange &middot; Stay &middot;
        </div>
      </div>

      {/* Rooms Grid */}
      <section id="rooms" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl font-bold">SELECT YOUR ROOM</h2>
          <span className="text-sm text-gray-400 hidden md:block">01 — 03</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {ROOMS.map(room => (
            <RoomCard key={room.id} room={room} onBook={handleBook} />
          ))}
        </div>
      </section>

      {/* Experience / Mood Section */}
      <section id="experience" className="py-24 bg-strange-gray">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 grid grid-cols-2 gap-4">
               <img src="https://picsum.photos/600/800?random=5" className="w-full h-64 object-cover translate-y-8" alt="Mood 1"/>
               <img src="https://picsum.photos/600/800?random=6" className="w-full h-64 object-cover -translate-y-8" alt="Mood 2"/>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold mb-6">CURATED SILENCE</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                우리는 소음이 제거된 공간을 지향합니다. 오직 빛과 그림자, 그리고 당신의 생각만이 존재합니다.
                모든 객실은 고요함을 위해 설계되었으며, 최고의 린넨과 어메니티가 준비되어 있습니다.
              </p>
              <ul className="space-y-4">
                {['Premium Sound System', 'Le Labo Amenities', 'Organic Breakfast', 'Private Concierge'].map(item => (
                  <li key={item} className="flex items-center gap-4 text-sm font-medium">
                    <span className="w-1.5 h-1.5 bg-strange-accent rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="info" className="bg-strange-black text-white py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <h2 className="text-2xl font-bold tracking-widest mb-6">STRANGE STAY</h2>
            <p className="text-gray-400 max-w-xs text-sm leading-relaxed">
              An experiment in hospitality. <br/>
              Based in Seoul, open to the world.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-bold uppercase mb-4 text-gray-500">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>hello@strangestay.com</li>
              <li>+82 02 1234 5678</li>
              <li>Seoul, Gangnam-gu</li>
            </ul>
          </div>

          <div>
             <h3 className="text-sm font-bold uppercase mb-4 text-gray-500">Social</h3>
             <ul className="space-y-2 text-sm text-gray-300">
               <li><a href="#" className="hover:text-white">Instagram</a></li>
               <li><a href="#" className="hover:text-white">Twitter</a></li>
               <li><a href="#" className="hover:text-white">Facebook</a></li>
             </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-gray-800 text-center md:text-left text-xs text-gray-600 flex flex-col md:flex-row justify-between">
          <p>&copy; 2024 Strange Stay. All rights reserved.</p>
          <p>Designed by AI</p>
        </div>
      </footer>

      {/* Booking Modal */}
      {selectedRoom && (
        <BookingModal 
          room={selectedRoom} 
          onClose={() => setSelectedRoom(null)}
          onSubmit={handleBookingSubmit}
        />
      )}

      {/* AI Concierge */}
      <Concierge />

      {/* Styles for animations */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default App;