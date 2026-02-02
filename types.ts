export interface Room {
  id: string;
  name: string;
  price: number;
  capacity: number;
  description: string;
  images: string[];
  amenities: string[];
}

export interface BookingFormData {
  checkIn: string;
  checkOut: string;
  guests: number;
  name: string;
  email: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}