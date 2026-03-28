import React, { useState } from 'react';
import { Brain, Route } from 'lucide-react';

const AIRecommendations: React.FC = () => {
  const [preferences, setPreferences] = useState({
    tripType: 'business',
    passengers: '1-2',
    duration: 'day',
    ecoFriendly: true,
    budget: 'medium',
  });

  const recommendations = [
    {
      vehicle: 'Tesla Model 3',
      match: 95,
      reason: 'Perfect for business trips with excellent efficiency and professional appeal',
      image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 89, // price in dollars
      ecoFriendly: true,
      passengers: '1-2',
      tripType: ['business', 'leisure'],
      features: ['Autopilot', 'Premium Audio', 'Supercharger Access'],
      route: { distance: '245 miles', chargingStops: 1, estimatedTime: '4h 30m' },
    },
    {
      vehicle: 'BMW i4 M50',
      match: 88,
      reason: 'Great balance of performance and sustainability for your business needs',
      image: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 125,
      ecoFriendly: true,
      passengers: '5+',
      tripType: ['business', 'adventure'],
      features: ['Sport Mode', 'Premium Interior', 'Fast Charging'],
      route: { distance: '245 miles', chargingStops: 2, estimatedTime: '4h 45m' },
    },
    {
      vehicle: 'Mercedes EQS',
      match: 82,
      reason: 'Luxury option with exceptional range for longer business trips',
      image: 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 180,
      ecoFriendly: false,
      passengers: '3-4',
      tripType: ['business'],
      features: ['Luxury Interior', 'MBUX System', 'Air Suspension'],
      route: { distance: '245 miles', chargingStops: 0, estimatedTime: '4h 15m' },
    },
  ];

  // Conversion: 1 USD = 83 INR (example)
  const usdToInr = (usd: number) => `₹${usd * 83}`;

  // Filter vehicles based on preferences
  const filteredRecommendations = recommendations.filter((rec) => {
    const budgetMatch =
      (preferences.budget === 'low' && rec.price <= 80) ||
      (preferences.budget === 'medium' && rec.price > 80 && rec.price <= 150) ||
      (preferences.budget === 'high' && rec.price > 150);

    const tripMatch = rec.tripType.includes(preferences.tripType);
    const passengersMatch = rec.passengers === preferences.passengers;
    const ecoMatch = !preferences.ecoFriendly || rec.ecoFriendly;

    return budgetMatch && tripMatch && passengersMatch && ecoMatch;
  });

  return (
    <div className="space-y-6">
      {/* Preferences Form */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">AI-Powered Recommendations</h1>
            <p className="text-gray-400">Let our AI find the perfect vehicle for your needs</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          {/* Trip Type */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Trip Type</label>
            <select
              value={preferences.tripType}
              onChange={(e) => setPreferences(prev => ({ ...prev, tripType: e.target.value }))}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="business">Business</option>
              <option value="leisure">Leisure</option>
              <option value="family">Family</option>
              <option value="adventure">Adventure</option>
            </select>
          </div>

          {/* Passengers */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Passengers</label>
            <select
              value={preferences.passengers}
              onChange={(e) => setPreferences(prev => ({ ...prev, passengers: e.target.value }))}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1-2">1-2 People</option>
              <option value="3-4">3-4 People</option>
              <option value="5+">5+ People</option>
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
            <select
              value={preferences.duration}
              onChange={(e) => setPreferences(prev => ({ ...prev, duration: e.target.value }))}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="hours">Few Hours</option>
              <option value="day">Full Day</option>
              <option value="weekend">Weekend</option>
              <option value="week">Week+</option>
            </select>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Budget</label>
            <select
              value={preferences.budget}
              onChange={(e) => setPreferences(prev => ({ ...prev, budget: e.target.value }))}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Budget (≤ 80 )</option>
              <option value="medium">Standard (80–150 )</option>
              <option value="high">Premium (150+ )</option>
            </select>
          </div>

          {/* Eco-Friendly */}
          <div className="flex items-end">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.ecoFriendly}
                onChange={(e) => setPreferences(prev => ({ ...prev, ecoFriendly: e.target.checked }))}
                className="w-4 h-4 text-green-600 bg-gray-700 border-gray-600 rounded focus:ring-green-500"
              />
              <span className="text-green-400 text-sm">Eco-Friendly</span>
            </label>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="space-y-6">
        {filteredRecommendations.length > 0 ? (
          filteredRecommendations.map((rec, index) => (
            <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl font-bold text-white">#{index + 1}</div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{rec.vehicle}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-green-400 font-medium">{rec.match}% Match</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-white">{usdToInr(rec.price)}</span>
                  <span className="text-gray-400 text-sm">/day</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <img src={rec.image} alt={rec.vehicle} className="w-full h-32 object-cover rounded-lg" />
                </div>
                <div className="lg:col-span-2 space-y-4">
                  <p className="text-gray-300">{rec.reason}</p>
                  <div className="flex flex-wrap gap-2">
                    {rec.features.map((feature, fIndex) => (
                      <span key={fIndex} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Route className="w-5 h-5 text-blue-400" />
                      <span className="text-white font-medium">Optimized Route</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Distance:</span>
                        <div className="text-white font-medium">{rec.route.distance}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Charging Stops:</span>
                        <div className="text-white font-medium">{rec.route.chargingStops}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Est. Time:</span>
                        <div className="text-white font-medium">{rec.route.estimatedTime}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-300 text-center">No vehicles match your preferences.</p>
        )}
      </div>
    </div>
  );
};

export default AIRecommendations;
