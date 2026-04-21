import { create } from 'zustand';
import { User, Room, Booking, HotelInfo } from '../types';

interface HotelState {
  user: User | null;
  rooms: Room[];
  bookings: Booking[];
  hotelInfo: HotelInfo;
  setUser: (user: User | null) => void;
  addRoom: (room: Room) => void;
  updateRoom: (id: string, room: Partial<Room>) => void;
  deleteRoom: (id: string) => void;
  addBooking: (booking: Booking) => void;
  updateBooking: (id: string, booking: Partial<Booking>) => void;
  updateHotelInfo: (info: Partial<HotelInfo>) => void;
}

export const useHotelStore = create<HotelState>((set) => ({
  user: null,
  rooms: [
    {
      id: '1',
      name: 'Royal Ocean Suite',
      type: 'Suite',
      price: 450,
      capacity: 2,
      description: 'Experience ultimate luxury with panoramic ocean views and bespoke amenities.',
      images: ['https://storage.googleapis.com/dala-prod-public-storage/generated-images/87fdac91-6420-4b2c-9c11-c405f851854e/luxury-suite-3d280c52-1776794071152.webp'],
      amenities: ['Ocean View', 'King Bed', 'Private Balcony', 'Mini Bar', 'Free WiFi'],
      status: 'available',
    },
    {
      id: '2',
      name: 'Deluxe Garden Room',
      type: 'Deluxe',
      price: 280,
      capacity: 2,
      description: 'A serene sanctuary overlooking our lush botanical gardens.',
      images: ['https://storage.googleapis.com/dala-prod-public-storage/generated-images/87fdac91-6420-4b2c-9c11-c405f851854e/standard-room-25b83b42-1776794070257.webp'],
      amenities: ['Garden View', 'Queen Bed', 'Smart TV', 'Workspace'],
      status: 'available',
    },
  ],
  bookings: [],
  hotelInfo: {
    name: 'The Grand Regency',
    description: 'A sanctuary of elegance and modern luxury in the heart of the city.',
    address: '123 Luxury Ave, Victoria Island, Lagos',
    phone: '+234 800 REGENCY',
    email: 'contact@grandregency.com',
    images: ['https://storage.googleapis.com/dala-prod-public-storage/generated-images/87fdac91-6420-4b2c-9c11-c405f851854e/hotel-lobby-6673bcb5-1776794071145.webp'],
    policies: ['Check-in: 2:00 PM', 'Check-out: 11:00 AM', 'No Smoking', 'No Pets'],
  },
  setUser: (user) => set({ user }),
  addRoom: (room) => set((state) => ({ rooms: [...state.rooms, room] })),
  updateRoom: (id, updatedRoom) =>
    set((state) => ({
      rooms: state.rooms.map((r) => (r.id === id ? { ...r, ...updatedRoom } : r)),
    })),
  deleteRoom: (id) =>
    set((state) => ({
      rooms: state.rooms.filter((r) => r.id !== id),
    })),
  addBooking: (booking) => set((state) => ({ bookings: [...state.bookings, booking] })),
  updateBooking: (id, updatedBooking) =>
    set((state) => ({
      bookings: state.bookings.map((b) => (b.id === id ? { ...b, ...updatedBooking } : b)),
    })),
  updateHotelInfo: (info) =>
    set((state) => ({
      hotelInfo: { ...state.hotelInfo, ...info },
    })),
}));