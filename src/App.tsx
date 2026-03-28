import React, { useState } from 'react';
import Header from './components/Header';
import AuthModal from './components/AuthModal';
import Dashboard from './components/Dashboard';
import VehicleSearch from './components/VehicleSearch';
import BookingSystem from './components/BookingSystem';
import UserProfile from './components/UserProfile';
import AIRecommendations from './components/AIRecommendations';
import IoTMonitoring from './components/IoTMonitoring';
import ARInspection from './components/ARInspection';
import SustainabilityTracker from './components/SustainabilityTracker';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState<any>(null);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'search':
        return <VehicleSearch
          onSelectVehicle={(vehicle) => {
            setSelectedVehicle(vehicle);
            setActiveTab('booking'); // automatically go to booking page
          }}
        />;
      case 'booking':
        return <BookingSystem vehicle={selectedVehicle} />;
      case 'profile':
        return <UserProfile />;
      case 'ai-recommendations':
        return <AIRecommendations />;
      case 'iot-monitoring':
        return <IoTMonitoring />;
      case 'ar-inspection':
        return <ARInspection />;
      case 'sustainability':
        return <SustainabilityTracker />;
      default:
        return <Dashboard />;
    }
  };

  const handleLogin = (userData: any) => {
    setUser(userData);
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setActiveTab('dashboard');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Welcome to Rent Sphere</h1>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Your next-generation vehicle rental platform with AI recommendations, IoT monitoring, and sustainability tracking.
          </p>
          <button
            onClick={() => setShowAuthModal(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            Get Started
          </button>
        </div>

        {showAuthModal && (
          <AuthModal
            onClose={() => setShowAuthModal(false)}
            onLogin={handleLogin}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header always visible */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onLogout={handleLogout}
      />
      <main className="container mx-auto px-4 py-6">
        {renderActiveTab()}
      </main>
    </div>
  );
}

export default App;
