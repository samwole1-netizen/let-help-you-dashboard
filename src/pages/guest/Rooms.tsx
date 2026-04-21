import React, { useState } from 'react';
import { useHotelStore } from '../../store/useHotelStore';
import { Search, Filter, SlidersHorizontal, Users, Wifi, Wind, Coffee, Tv, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const Rooms: React.FC = () => {
  const { rooms } = useHotelStore();
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const amenities = [
    { icon: Wifi, label: 'Free WiFi' },
    { icon: Wind, label: 'Air Conditioning' },
    { icon: Coffee, label: 'Mini Bar' },
    { icon: Tv, label: 'Smart TV' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4">Our Residences</h1>
          <p className="text-slate-600 text-lg">Choose from our curated collection of luxury rooms and suites.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1 space-y-8">
            <Card className="border-none shadow-sm sticky top-28">
              <CardContent className="p-6 space-y-8">
                <div>
                  <h4 className="font-bold mb-4 flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4" /> Filters
                  </h4>
                  <div className="space-y-4">
                    <Label className="text-sm font-medium text-slate-500 uppercase tracking-wider">Price Range</Label>
                    <Slider
                      defaultValue={[0, 1000]}
                      max={1000}
                      step={50}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mt-6"
                    />
                    <div className="flex justify-between text-sm font-bold text-slate-900 mt-2">
                      <span>$0</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-sm font-medium text-slate-500 uppercase tracking-wider">Room Type</Label>
                  {['Single', 'Double', 'Suite', 'Deluxe'].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox id={type} />
                      <Label htmlFor={type} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <Label className="text-sm font-medium text-slate-500 uppercase tracking-wider">Amenities</Label>
                  {amenities.map((item) => (
                    <div key={item.label} className="flex items-center space-x-2">
                      <Checkbox id={item.label} />
                      <Label htmlFor={item.label} className="text-sm font-medium leading-none flex items-center gap-2">
                        <item.icon className="w-3 h-3 text-slate-400" /> {item.label}
                      </Label>
                    </div>
                  ))}
                </div>

                <Button className="w-full bg-slate-900">Apply Filters</Button>
              </CardContent>
            </Card>
          </aside>

          {/* Rooms Grid */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-100 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input className="border-none focus-visible:ring-0 pl-12 h-12 bg-transparent" placeholder="Search for rooms, views, or features..." />
              </div>
              <Button size="icon" variant="ghost" className="h-12 w-12 rounded-xl">
                <Filter className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {rooms.map((room) => (
                <motion.div
                  key={room.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-500 group rounded-3xl bg-white">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={room.images[0]}
                        alt={room.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-white/90 text-slate-900 border-none font-bold px-3 py-1.5 rounded-lg shadow-sm">
                          {room.type}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-8">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl font-serif text-slate-900 mb-1">{room.name}</h3>
                          <div className="flex items-center text-slate-400 text-sm">
                            <Users className="w-4 h-4 mr-1" /> Up to {room.capacity} Guests
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="block text-2xl font-bold text-slate-900">${room.price}</span>
                          <span className="text-xs text-slate-400 uppercase tracking-widest">Per Night</span>
                        </div>
                      </div>
                      <p className="text-slate-500 mb-6 text-sm leading-relaxed">
                        {room.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {room.amenities.slice(0, 3).map((amenity) => (
                          <Badge key={amenity} variant="secondary" className="bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded-md border-none">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                      <Button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold h-12 rounded-xl transition-all group">
                        Book Now <ChevronRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rooms;