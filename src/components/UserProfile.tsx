import React, { useState } from 'react';
import { User, Star, Shield, Leaf, Trophy, CreditCard } from 'lucide-react';

interface Booking {
  id: string;
  vehicle: string;
  startDate: string;
  endDate: string;
  duration: string;
  cost: string;
  status: string;
  location: string;
  rating: number | null;
  review: string | null;
}

const UserProfile: React.FC = () => {
  // State for booking history
  const [bookingHistory, setBookingHistory] = useState<Booking[]>([
    { id: 'BK001', vehicle: 'Tesla Model 3', startDate: '2024-01-15', endDate: '2024-01-18', duration: '3 days', cost: '₹267', status: 'completed', location: 'Downtown Seattle', rating: 5, review: 'Excellent vehicle, smooth ride and great battery life!' },
    { id: 'BK002', vehicle: 'BMW i4 M50', startDate: '2024-01-10', endDate: '2024-01-12', duration: '2 days', cost: '₹250', status: 'completed', location: 'Bellevue Mall', rating: 5, review: 'Amazing performance and luxury features.' },
    { id: 'BK003', vehicle: 'Mercedes EQS', startDate: '2024-01-05', endDate: '2024-01-06', duration: '1 day', cost: '₹180', status: 'completed', location: 'Capitol Hill', rating: 4, review: 'Luxurious but a bit expensive for daily use.' },
    { id: 'BK004', vehicle: 'Honda Civic', startDate: '2024-01-20', endDate: '2024-01-22', duration: '2 days', cost: '₹120', status: 'active', location: 'University District', rating: null, review: null },
    { id: 'BK005', vehicle: 'Tesla Model Y', startDate: '2024-01-25', endDate: '2024-01-27', duration: '2 days', cost: '₹200', status: 'upcoming', location: 'Fremont', rating: null, review: null },
  ]);

  // Action handlers
  const handleViewDetails = (booking: Booking) => {
    alert(
      `Booking Details:\nVehicle: ${booking.vehicle}\nLocation: ${booking.location}\nStart: ${booking.startDate}\nEnd: ${booking.endDate}\nDuration: ${booking.duration}\nCost: ${booking.cost}\nStatus: ${booking.status}`
    );
  };

  const handleModifyBooking = (id: string) => {
    const newStart = prompt('Enter new start date (YYYY-MM-DD):');
    const newEnd = prompt('Enter new end date (YYYY-MM-DD):');
    if (newStart && newEnd) {
      setBookingHistory(prev =>
        prev.map(b =>
          b.id === id ? { ...b, startDate: newStart, endDate: newEnd } : b
        )
      );
      alert('Booking modified successfully!');
    }
  };

  const handleCancelBooking = (id: string) => {
    const confirmCancel = window.confirm('Are you sure you want to cancel this booking?');
    if (confirmCancel) {
      setBookingHistory(prev =>
        prev.map(b => (b.id === id ? { ...b, status: 'cancelled' } : b))
      );
      alert('Booking cancelled!');
    }
  };

  const handleRateReview = (id: string) => {
    const rating = prompt('Enter rating (1-5):');
    const review = prompt('Enter your review:');
    if (rating && review) {
      setBookingHistory(prev =>
        prev.map(b =>
          b.id === id ? { ...b, rating: parseInt(rating), review } : b
        )
      );
      alert('Thank you for your feedback!');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-600 text-white';
      case 'active': return 'bg-blue-600 text-white';
      case 'upcoming': return 'bg-yellow-600 text-white';
      case 'cancelled': return 'bg-red-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  // Achievements
  const achievements = [
    { name: 'Eco Warrior', description: 'Rented 50 electric vehicles', icon: Leaf, color: 'green' },
    { name: 'Premium Member', description: 'Active premium subscription', icon: Shield, color: 'blue' },
    { name: 'Top Reviewer', description: 'Left 100+ helpful reviews', icon: Star, color: 'yellow' },
    { name: 'Early Adopter', description: 'Member since 2023', icon: Trophy, color: 'purple' },
  ];

  // Recent rentals
  const rentalHistory = [
    { vehicle: 'Tesla Model 3', date: '2024-01-15', duration: '3 days', cost: '₹267', rating: 5 },
    { vehicle: 'BMW i4', date: '2024-01-10', duration: '2 days', cost: '₹250', rating: 5 },
    { vehicle: 'Mercedes EQS', date: '2024-01-05', duration: '1 day', cost: '₹180', rating: 4 },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header - KEEP UNCHANGED */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">Midhunaa</h1>
            <p className="text-gray-400">Premium Member since 2023</p>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-yellow-400 font-medium">4.9</span>
                <span className="text-gray-400 text-sm">(127 reviews)</span>
              </div>
              <div className="flex items-center space-x-1">
                <Leaf className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-medium">2,847 Green Credits</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[ 
          { label: 'Total Rentals', value: '127', icon: Star },
          { label: 'CO₂ Saved', value: '2.8t', icon: Leaf },
          { label: 'Money Saved', value: '₹4,230', icon: CreditCard },
          { label: 'Miles Driven', value: '12,450', icon: Trophy },
        ].map((stat, index) => (
          <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
            <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-gray-400 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => {
            const colors = {
              green: 'from-green-500 to-green-600',
              blue: 'from-blue-500 to-blue-600',
              yellow: 'from-yellow-500 to-orange-500',
              purple: 'from-purple-500 to-purple-600',
            };
            return (
              <div key={index} className="flex items-center space-x-4 bg-gray-700 p-4 rounded-lg">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${colors[achievement.color]}`}>
                  <achievement.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">{achievement.name}</p>
                  <p className="text-gray-400 text-sm">{achievement.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Rentals */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">Recent Rentals</h3>
        <div className="space-y-4">
          {rentalHistory.map((rental, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-700 rounded-lg p-4">
              <div>
                <p className="text-white font-medium">{rental.vehicle}</p>
                <p className="text-gray-400 text-sm">{rental.date} • {rental.duration}</p>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">{rental.cost}</p>
                <div className="flex items-center space-x-1">
                  {[...Array(rental.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking History */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-6">Booking History</h3>
        <div className="space-y-4">
          {bookingHistory.map((booking) => (
            <div key={booking.id} className="bg-gray-700 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-semibold text-white">{booking.vehicle}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
                    <span>Booking ID: {booking.id}</span>
                    <span>📍 {booking.location}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>📅 {booking.startDate} to {booking.endDate}</span>
                    <span>⏱️ {booking.duration}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-white mb-2">{booking.cost}</div>
                  {booking.rating && (
                    <div className="flex items-center space-x-1">
                      {[...Array(booking.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {booking.review && (
                <div className="bg-gray-600 rounded-lg p-4 mt-4">
                  <p className="text-gray-300 text-sm italic">"{booking.review}"</p>
                </div>
              )}

              <div className="mt-4 flex space-x-3">
                {booking.status === 'active' && (
                  <>
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                      onClick={() => handleViewDetails(booking)}
                    >
                      View Details
                    </button>
                    <button
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors"
                      onClick={() => alert('Contact support clicked!')}
                    >
                      Contact Support
                    </button>
                  </>
                )}
                {booking.status === 'upcoming' && (
                  <>
                    <button
                      className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors"
                      onClick={() => handleModifyBooking(booking.id)}
                    >
                      Modify Booking
                    </button>
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors"
                      onClick={() => handleCancelBooking(booking.id)}
                    >
                      Cancel Booking
                    </button>
                  </>
                )}
                {booking.status === 'completed' && !booking.rating && (
                  <button
                    className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-700 transition-colors"
                    onClick={() => handleRateReview(booking.id)}
                  >
                    Rate & Review
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
