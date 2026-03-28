import React from 'react';
import { Car, Zap, DollarSign, Leaf, TrendingUp, MapPin, Clock, Shield } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Active Rentals', value: '12', icon: Car, color: 'blue' },
    { label: 'Green Credits', value: '2,847', icon: Leaf, color: 'green' },
    { label: 'Total Savings', value: '$1,234', icon: DollarSign, color: 'yellow' },
    { label: 'Carbon Offset', value: '156kg', icon: Zap, color: 'purple' },
  ];

  const recentActivity = [
    { action: 'Tesla Model 3 rental completed', time: '2 hours ago', type: 'success' },
    { action: 'BMW i4 inspection scheduled', time: '4 hours ago', type: 'info' },
    { action: 'Smart contract executed', time: '6 hours ago', type: 'success' },
    { action: 'Green credits earned: +50', time: '1 day ago', type: 'green' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Welcome to Rent Sphere!</h1>
          <p className="text-gray-400 mt-1">Here's your Rent Sphere dashboard</p>
        </div>
        <div className="flex items-center space-x-2 bg-green-600 px-4 py-2 rounded-lg">
          <Shield className="w-5 h-5" />
          <span className="font-medium">Premium Member</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const colors = {
            blue: 'from-blue-500 to-blue-600',
            green: 'from-green-500 to-green-600',
            yellow: 'from-yellow-500 to-orange-500',
            purple: 'from-purple-500 to-purple-600',
          };
          
          return (
            <div key={stat.label} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${colors[stat.color]}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Rentals */}
        <div className="lg:col-span-2 bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">Current Rentals</h3>
          <div className="space-y-4">
            {[
              { name: 'Tesla Model 3', location: 'Downtown Seattle', time: '2 days remaining', status: 'active', battery: 78 },
              { name: 'BMW i4', location: 'Bellevue Mall', time: '6 hours remaining', status: 'active', battery: 92 },
            ].map((rental, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Car className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{rental.name}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" />{rental.location}</span>
                      <span className="flex items-center"><Clock className="w-4 h-4 mr-1" />{rental.time}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 font-medium">{rental.battery}%</span>
                  </div>
                  <span className="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded-full mt-1">
                    Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => {
              const colors = {
                success: 'text-green-400',
                info: 'text-blue-400',
                green: 'text-emerald-400',
              };
              
              return (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${colors[activity.type].replace('text-', 'bg-')}`} />
                  <div>
                    <p className="text-white text-sm">{activity.action}</p>
                    <p className="text-gray-400 text-xs">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;