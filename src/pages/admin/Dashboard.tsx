import React, { useState } from 'react';
import { useHotelStore } from '../../store/useHotelStore';
import { LayoutDashboard, BedDouble, CalendarCheck, Users, Settings, LogOut, Menu, Bell, Search, Plus, Edit, Trash2, TrendingUp, DollarSign, Hotel } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';

const AdminDashboard: React.FC = () => {
  const { rooms, bookings, deleteRoom } = useHotelStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'rooms' | 'bookings' | 'settings'>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const stats = [
    { title: 'Total Bookings', value: bookings.length + 12, icon: CalendarCheck, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Total Revenue', value: '$12,450', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Occupancy Rate', value: '78%', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
    { title: 'Available Rooms', value: rooms.length, icon: BedDouble, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const renderOverview = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Bookings</CardTitle>
            <Button variant="outline" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Guest</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { id: 1, guest: 'John Doe', room: 'Royal Suite', dates: 'Oct 12 - 15', status: 'confirmed', amount: '$1,350' },
                  { id: 2, guest: 'Sarah Smith', room: 'Deluxe Room', dates: 'Oct 14 - 16', status: 'pending', amount: '$560' },
                  { id: 3, guest: 'Mike Johnson', room: 'Garden Suite', dates: 'Oct 15 - 20', status: 'confirmed', amount: '$2,100' },
                ].map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.guest}</TableCell>
                    <TableCell>{item.room}</TableCell>
                    <TableCell>{item.dates}</TableCell>
                    <TableCell>
                      <Badge variant={item.status === 'confirmed' ? 'default' : 'secondary'}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start py-6 bg-slate-900" onClick={() => setActiveTab('rooms')}>
              <Plus className="mr-2 w-4 h-4" /> Add New Room
            </Button>
            <Button variant="outline" className="w-full justify-start py-6">
              <Search className="mr-2 w-4 h-4" /> Search Booking
            </Button>
            <Button variant="outline" className="w-full justify-start py-6">
              <Users className="mr-2 w-4 h-4" /> Manage Staff
            </Button>
            <Button variant="outline" className="w-full justify-start py-6">
              <Hotel className="mr-2 w-4 h-4" /> Hotel Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderRooms = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input className="pl-10 bg-white" placeholder="Search rooms..." />
        </div>
        <Button className="bg-amber-600 hover:bg-amber-700">
          <Plus className="mr-2 w-4 h-4" /> Add Room
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <Card key={room.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all">
            <div className="h-48 overflow-hidden">
              <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover" />
            </div>
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-lg">{room.name}</h4>
                <Badge variant={room.status === 'available' ? 'default' : 'outline'}>{room.status}</Badge>
              </div>
              <p className="text-slate-500 text-sm mb-4 line-clamp-1">{room.description}</p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="font-bold text-amber-600">${room.price}<span className="text-slate-400 text-xs font-normal">/night</span></span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => {
                        deleteRoom(room.id);
                        toast.success("Room deleted successfully");
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Admin Sidebar */}
      <aside className={`bg-slate-900 text-white w-64 fixed h-full transition-transform duration-300 z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-10">
            <div className="bg-amber-500 p-2 rounded-lg">
              <Hotel className="w-6 h-6 text-slate-900" />
            </div>
            <h1 className="font-serif text-xl font-bold tracking-tight">REGENCY ADMIN</h1>
          </div>

          <nav className="space-y-1">
            {[
              { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
              { id: 'rooms', icon: BedDouble, label: 'Room Management' },
              { id: 'bookings', icon: CalendarCheck, label: 'Bookings' },
              { id: 'staff', icon: Users, label: 'Staff' },
              { id: 'settings', icon: Settings, label: 'Settings' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${activeTab === item.id ? 'bg-amber-500 text-slate-900 font-bold' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 w-full p-6 border-t border-white/10">
          <button className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 sticky top-0 z-40 flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="w-5 h-5" />
            </Button>
            <h2 className="text-xl font-bold capitalize text-slate-800">{activeTab}</h2>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative text-slate-500">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </Button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold">Admin User</p>
                <p className="text-xs text-slate-500">General Manager</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold">
                AU
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="p-8">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'rooms' && renderRooms()}
          {activeTab !== 'overview' && activeTab !== 'rooms' && (
            <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400">
              <div className="bg-slate-100 p-6 rounded-full mb-4">
                <Settings className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold text-slate-600">Module Under Development</h3>
              <p>We are working hard to bring you the {activeTab} management system.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;