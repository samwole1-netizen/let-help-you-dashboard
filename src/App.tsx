import React, { useState } from 'react';
import { useHotelStore } from './store/useHotelStore';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Hotel, Menu, X, Instagram, Facebook, Twitter, Mail, Phone, MapPin, User as UserIcon } from 'lucide-react';
import Home from './pages/guest/Home';
import Rooms from './pages/guest/Rooms';
import AdminDashboard from './pages/admin/Dashboard';
import Auth from './pages/Auth';
import { Toaster } from 'sonner';
import { Button } from './components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useHotelStore();
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  if (isAdminPage) return null;

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-slate-900 p-2 rounded-lg">
              <Hotel className="w-6 h-6 text-amber-500" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-slate-900">REGENCY</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Home</Link>
            <Link to="/rooms" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Residences</Link>
            <Link to="/about" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Experience</Link>
            <Link to="/admin" className="text-slate-400 hover:text-amber-600 text-sm font-medium transition-colors">Admin Portal</Link>
            <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-slate-700">Hi, {user.name}</span>
                  <Button variant="ghost" size="sm" onClick={() => setUser(null)} className="text-slate-400 hover:text-red-500">Logout</Button>
                </div>
              ) : (
                <Link to="/auth">
                  <Button variant="ghost" size="sm" className="font-bold">Login</Button>
                </Link>
              )}
              <Button size="sm" className="bg-slate-900 text-white font-bold rounded-xl px-6">Book Now</Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-900 p-2">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 absolute w-full animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link to="/" className="block px-3 py-4 text-lg font-medium text-slate-900 border-b border-slate-50">Home</Link>
            <Link to="/rooms" className="block px-3 py-4 text-lg font-medium text-slate-900 border-b border-slate-50">Residences</Link>
            <Link to="/admin" className="block px-3 py-4 text-lg font-medium text-slate-900 border-b border-slate-50">Admin</Link>
            <div className="pt-4 grid grid-cols-2 gap-4">
              <Link to="/auth" className="w-full"><Button variant="outline" className="w-full">Login</Button></Link>
              <Button className="w-full bg-slate-900">Book Now</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  if (isAdminPage) return null;

  return (
    <footer className="bg-slate-900 text-slate-400 py-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="bg-amber-500 p-2 rounded-lg">
              <Hotel className="w-5 h-5 text-slate-900" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-white">REGENCY</span>
          </div>
          <p className="text-sm leading-relaxed max-w-xs">
            Experience the finest luxury and world-class hospitality in the heart of the city. Your sanctuary away from home.
          </p>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:border-amber-500 hover:text-amber-500 cursor-pointer transition-all">
              <Instagram className="w-4 h-4" />
            </div>
            <div className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:border-amber-500 hover:text-amber-500 cursor-pointer transition-all">
              <Facebook className="w-4 h-4" />
            </div>
            <div className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:border-amber-500 hover:text-amber-500 cursor-pointer transition-all">
              <Twitter className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Quick Links</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/rooms" className="hover:text-amber-500 transition-colors">Residences</Link></li>
            <li><a href="#" className="hover:text-amber-500 transition-colors">Our Story</a></li>
            <li><a href="#" className="hover:text-amber-500 transition-colors">Dining</a></li>
            <li><a href="#" className="hover:text-amber-500 transition-colors">Wellness</a></li>
            <li><a href="#" className="hover:text-amber-500 transition-colors">Careers</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Support</h4>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="hover:text-amber-500 transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-amber-500 transition-colors">Booking Policy</a></li>
            <li><a href="#" className="hover:text-amber-500 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-amber-500 transition-colors">Terms of Service</a></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Contact Us</h4>
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
            <span className="text-sm">123 Luxury Ave, Victoria Island, Lagos, Nigeria</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-amber-500 shrink-0" />
            <span className="text-sm">+234 800 REGENCY</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-amber-500 shrink-0" />
            <span className="text-sm">concierge@regency.com</span>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-slate-800 text-center text-xs">
        <p>&copy; {new Date().getFullYear()} The Grand Regency Hotel. All rights reserved.</p>
      </div>
    </footer>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans selection:bg-amber-100 selection:text-amber-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
        <Footer />
        <Toaster position="top-center" richColors />
      </div>
    </Router>
  );
}

export default App;