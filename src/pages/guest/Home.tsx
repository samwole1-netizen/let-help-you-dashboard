import React, { useState } from 'react';
import { useHotelStore } from '../../store/useHotelStore';
import { Calendar, Users, Star, ArrowRight, ShieldCheck, CreditCard, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

const Home: React.FC = () => {
  const { rooms } = useHotelStore();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/87fdac91-6420-4b2c-9c11-c405f851854e/hotel-lobby-6673bcb5-1776794071145.webp"
            alt="Hero"
            className="w-full h-full object-cover brightness-[0.4]"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
              Where Luxury Meets <span className="text-amber-400">Serenity</span>
            </h1>
            <p className="text-xl md:text-2xl font-light mb-10 text-slate-200">
              Discover a sanctuary of elegance in the heart of Lagos.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 shadow-2xl max-w-3xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              <div className="flex flex-col items-start px-4 py-3 bg-white/5 rounded-xl border border-white/10">
                <label className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">Check-in</label>
                <div className="flex items-center text-white font-medium">
                  <Calendar className="w-4 h-4 mr-2 text-slate-300" />
                  <span>{format(new Date(), 'dd MMM')}</span>
                </div>
              </div>
              <div className="flex flex-col items-start px-4 py-3 bg-white/5 rounded-xl border border-white/10">
                <label className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">Check-out</label>
                <div className="flex items-center text-white font-medium">
                  <Calendar className="w-4 h-4 mr-2 text-slate-300" />
                  <span>{format(new Date(Date.now() + 86400000), 'dd MMM')}</span>
                </div>
              </div>
              <div className="flex flex-col items-start px-4 py-3 bg-white/5 rounded-xl border border-white/10">
                <label className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">Guests</label>
                <div className="flex items-center text-white font-medium">
                  <Users className="w-4 h-4 mr-2 text-slate-300" />
                  <span>2 Adults</span>
                </div>
              </div>
              <Button className="h-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-xl py-6 transition-all">
                Search Rooms
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-24 px-4 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4">Exceptional Rooms</h2>
            <p className="text-slate-600 text-lg">Each of our rooms is designed to provide a perfect blend of comfort and style.</p>
          </div>
          <Button variant="ghost" className="text-amber-600 hover:text-amber-700 font-semibold group">
            View All Rooms <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <motion.div
              key={room.id}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <Card className="overflow-hidden border-none shadow-lg group-hover:shadow-2xl transition-all duration-300 rounded-2xl bg-white">
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={room.images[0]}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-slate-900 backdrop-blur-sm border-none font-semibold px-3 py-1">
                      From ${room.price}/night
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-2">
                    <div className="flex text-amber-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-slate-400 text-sm">(4.9)</span>
                  </div>
                  <h3 className="text-2xl font-serif text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
                    {room.name}
                  </h3>
                  <p className="text-slate-500 line-clamp-2 mb-4">
                    {room.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-slate-400 border-t border-slate-100 pt-4">
                    <span className="flex items-center"><Users className="w-4 h-4 mr-1" /> {room.capacity} Guests</span>
                    <span className="flex items-center"><Sparkles className="w-4 h-4 mr-1" /> {room.type}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section className="bg-slate-900 py-24 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative z-10 rounded-3xl overflow-hidden border-8 border-slate-800 shadow-2xl">
              <img
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/87fdac91-6420-4b2c-9c11-c405f851854e/rooftop-pool-0c141681-1776794070496.webp"
                alt="Experience"
                className="w-full aspect-square object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl z-0" />
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl z-0" />
          </div>
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif leading-tight">
              Unforgettable Experiences in the Heart of the City
            </h2>
            <p className="text-slate-400 text-lg">
              Beyond world-class accommodation, we offer a lifestyle. From our rooftop pool with stunning skyline views to our Michelin-star restaurant.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: ShieldCheck, title: 'Safe & Secure', desc: '24/7 security and concierge service.' },
                { icon: CreditCard, title: 'Flexible Payments', desc: 'Book now, pay later options available.' },
                { icon: Sparkles, title: 'Prime Location', desc: 'Walking distance to major city attractions.' },
                { icon: Users, title: 'Event Spaces', desc: 'Perfect for weddings and conferences.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    <item.icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{item.title}</h4>
                    <p className="text-slate-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;