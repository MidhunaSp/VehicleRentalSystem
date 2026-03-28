import React, { useState } from 'react';
import { Search, Filter, MapPin, Fuel, Users, Star, Zap, Leaf } from 'lucide-react';

interface VehicleSearchProps {
  onSelectVehicle: (vehicle: any) => void;
}

const VehicleSearch: React.FC<VehicleSearchProps> = ({ onSelectVehicle }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    priceRange: [0, 200],
    electric: false,
    instant: false,
  });

  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      name: 'Tesla Model 3',
      type: 'Electric Sedan',
      price: 89,
      location: 'Downtown Seattle',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Autopilot', 'Supercharger', 'Premium Audio'],
      batteryLevel: 92,
      range: '358 miles',
      instantBook: true,
      isElectric: true,
      carbonOffset: 45,
      available: 5, // number of vehicles available
    },
    {
      id: 2,
      name: 'BMW i4 M50',
      type: 'Electric Sports',
      price: 125,
      location: 'Bellevue',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Sport Mode', 'Premium Interior', 'Fast Charging'],
      batteryLevel: 78,
      range: '270 miles',
      instantBook: true,
      isElectric: true,
      carbonOffset: 38,
      available: 3,
    },
    {
      id: 3,
      name: 'Mercedes EQS',
      type: 'Luxury Electric',
      price: 180,
      location: 'Capitol Hill',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Luxury Interior', 'MBUX System', 'Air Suspension'],
      batteryLevel: 85,
      range: '453 miles',
      instantBook: false,
      isElectric: true,
      carbonOffset: 52,
      available: 2,
    },
    {
      id: 4,
      name: 'Ford F-150 Lightning',
      type: 'Electric Truck',
      price: 95,
      location: 'Fremont',
      rating: 4.7,
      image: 'https://imgd.aeplcdn.com/600x600/n/cw/ec/48389/left-front-three-quarter1.jpeg',
      features: ['Power Generator', 'Towing', 'Off-Road'],
      batteryLevel: 68,
      range: '300 miles',
      instantBook: true,
      isElectric: true,
      carbonOffset: 42,
      available: 4,
    },
    // Added 2 bikes
    {
      id: 5,
      name: 'Harley Davidson Iron 883',
      type: 'Motorbike',
      price: 45,
      location: 'Seattle Downtown',
      rating: 4.6,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkZa6oD5Dvr5F6_7_zvlKfAH1M6X090HajDaxpt4B9g7YccchYt7gmmsP9es0mOeQb_aI&usqp=CAU',
      features: ['V-Twin Engine', 'Custom Exhaust'],
      batteryLevel: 0,
      range: 'N/A',
      instantBook: true,
      isElectric: false,
      carbonOffset: 0,
      available: 6,
    },
    {
      id: 6,
      name: 'KTM Duke 390',
      type: 'Motorbike',
      price: 40,
      location: 'Bellevue',
      rating: 4.5,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Ktm_duke_390.jpg/1200px-Ktm_duke_390.jpg',
      features: ['Lightweight', 'Sporty Design'],
      batteryLevel: 0,
      range: 'N/A',
      instantBook: false,
      isElectric: false,
      carbonOffset: 0,
      available: 5,
    },
  ]);

  const filteredVehicles = vehicles.filter(vehicle => {
    if (searchTerm && !vehicle.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (filters.electric && !vehicle.isElectric) return false;
    if (filters.instant && !vehicle.instantBook) return false;
    if (vehicle.price < filters.priceRange[0] || vehicle.price > filters.priceRange[1]) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Search & Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search vehicles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilters(prev => ({ ...prev, electric: !prev.electric }))}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filters.electric
                ? 'bg-green-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Electric Only</span>
          </button>

          <button
            onClick={() => setFilters(prev => ({ ...prev, instant: !prev.instant }))}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filters.instant
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>Instant Book</span>
          </button>
        </div>
      </div>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map(vehicle => (
          <div
            key={vehicle.id}
            className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-200 cursor-pointer group"
            onClick={() => onSelectVehicle(vehicle)}
          >
            <div className="relative">
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 right-4 flex space-x-2">
                {vehicle.isElectric && (
                  <div className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                    <Leaf className="w-3 h-3 mr-1" />
                    Electric
                  </div>
                )}
                {vehicle.instantBook && (
                  <div className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Instant
                  </div>
                )}
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-white">{vehicle.name}</h3>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-yellow-400 font-medium">{vehicle.rating}</span>
                </div>
              </div>

              <p className="text-gray-400 text-sm mb-2">{vehicle.type}</p>
              <p className="text-gray-400 text-sm mb-2">Available: {vehicle.available}</p>

              <div className="flex items-center space-x-4 mb-4 text-sm">
                <div className="flex items-center text-gray-400">
                  <MapPin className="w-4 h-4 mr-1" />
                  {vehicle.location}
                </div>
                {vehicle.isElectric && (
                  <div className="flex items-center text-green-400">
                    <Zap className="w-4 h-4 mr-1" />
                    {vehicle.batteryLevel}%
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {vehicle.features.map((feature, index) => (
                  <span
                    key={index}
                    className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-white">₹{vehicle.price}</span>
                  <span className="text-gray-400 text-sm">/day</span>
                </div>
                {vehicle.isElectric && (
                  <div className="flex items-center text-green-400 text-sm">
                    <Leaf className="w-4 h-4 mr-1" />
                    -{vehicle.carbonOffset}kg CO₂
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleSearch;
