import React from 'react';
import { Car, User, Search, Calendar, Brain, Wifi, Camera, Leaf, LogOut } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: any;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, user, onLogout }) => {
  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: Car },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'booking', label: 'Booking', icon: Calendar },
    { id: 'ai-recommendations', label: 'AI Recommendations', icon: Brain },
    { id: 'iot-monitoring', label: 'IoT Monitor', icon: Wifi },
    { id: 'ar-inspection', label: 'AR Inspection', icon: Camera },
    { id: 'sustainability', label: 'Sustainability', icon: Leaf },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Car className="w-8 h-8 text-blue-400" />
              <h1 className="text-2xl font-bold text-white">Rent Sphere</h1>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-1">
            {navigation.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-300 text-sm">Welcome, User</span>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;