import React, { useState } from 'react';
import { Leaf, Zap, TreePine, Award, TrendingUp, Globe, Recycle } from 'lucide-react';

const SustainabilityTracker: React.FC = () => {
  const [sustainabilityStats, setSustainabilityStats] = useState({
    carbonOffset: 2847,
    electricMiles: 12450,
    treesEquivalent: 67,
    greenCredits: 2847,
    co2Reduction: 78,
    renewableEnergy: 92,
  });

  const achievements = [
    { name: 'Carbon Neutral', description: 'Offset 1000kg+ CO₂', icon: Leaf, earned: true },
    { name: 'Electric Pioneer', description: '10,000+ electric miles', icon: Zap, earned: true },
    { name: 'Green Champion', description: '50+ green rentals', icon: TreePine, earned: true },
    { name: 'Eco Influencer', description: 'Referred 10+ eco users', icon: Globe, earned: false },
  ];

  const monthlyData = [
    { month: 'Jan', co2Saved: 245, electricMiles: 1200, greenCredits: 189 },
    { month: 'Feb', co2Saved: 312, electricMiles: 1450, greenCredits: 234 },
    { month: 'Mar', co2Saved: 289, electricMiles: 1320, greenCredits: 198 },
    { month: 'Apr', co2Saved: 367, electricMiles: 1680, greenCredits: 278 },
    { month: 'May', co2Saved: 334, electricMiles: 1590, greenCredits: 245 },
    { month: 'Jun', co2Saved: 298, electricMiles: 1380, greenCredits: 212 },
  ];

  const impactProjects = [
    { name: 'Amazon Rainforest Protection', contribution: 45, impact: '12 trees protected', status: 'active' },
    { name: 'Solar Farm Development', contribution: 78, impact: '156 kWh renewable energy', status: 'completed' },
    { name: 'Ocean Cleanup Initiative', contribution: 23, impact: '34 lbs ocean plastic removed', status: 'active' },
  ];

  const marketplaceRewards = [
    { reward: '10% Rental Discount', cost: 500, available: true },
    { reward: 'Free EV Upgrade', cost: 1000, available: true },
    { reward: 'Plant a Tree', cost: 250, available: true },
    { reward: 'Carbon Offset Certificate', cost: 750, available: false },
  ];

  const handleRedeem = (reward: { reward: string; cost: number; available: boolean }) => {
    if (!reward.available) {
      alert(`Sorry, "${reward.reward}" is currently unavailable.`);
      return;
    }

    if (sustainabilityStats.greenCredits >= reward.cost) {
      alert(`Success! You have redeemed "${reward.reward}" for ${reward.cost} credits.`);
      setSustainabilityStats(prev => ({
        ...prev,
        greenCredits: prev.greenCredits - reward.cost,
      }));
    } else {
      alert(`Insufficient credits to redeem "${reward.reward}".`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-blue-600">
          <Leaf className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Sustainability Tracker</h1>
          <p className="text-gray-400">Track your environmental impact and earn green rewards</p>
        </div>
      </div>

      {/* Impact Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'CO₂ Offset', value: `${sustainabilityStats.carbonOffset}kg`, icon: Leaf, color: 'green' },
          { label: 'Electric Miles', value: `${sustainabilityStats.electricMiles.toLocaleString()}`, icon: Zap, color: 'blue' },
          { label: 'Trees Equivalent', value: sustainabilityStats.treesEquivalent, icon: TreePine, color: 'emerald' },
          { label: 'Green Credits', value: sustainabilityStats.greenCredits, icon: Award, color: 'yellow' },
          { label: 'CO₂ Reduction', value: `${sustainabilityStats.co2Reduction}%`, icon: TrendingUp, color: 'purple' },
          { label: 'Renewable %', value: `${sustainabilityStats.renewableEnergy}%`, icon: Recycle, color: 'teal' },
        ].map((stat, index) => {
          const colors = {
            green: 'from-green-500 to-green-600',
            blue: 'from-blue-500 to-blue-600',
            emerald: 'from-emerald-500 to-emerald-600',
            yellow: 'from-yellow-500 to-orange-500',
            purple: 'from-purple-500 to-purple-600',
            teal: 'from-teal-500 to-teal-600',
          };

          return (
            <div key={index} className="bg-gray-800 rounded-xl p-4 border border-gray-700">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${colors[stat.color]} w-fit mb-3`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xl font-bold text-white">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Impact Projects */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">Impact Projects You're Supporting</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {impactProjects.map((project, index) => (
            <div key={index} className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-medium">{project.name}</h4>
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  project.status === 'active' ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'
                }`}>
                  {project.status}
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Your Contribution:</span>
                  <span className="text-white font-medium">₹{project.contribution}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Impact:</span>
                  <span className="text-green-400 font-medium">{project.impact}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Green Credits Marketplace */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Green Credits Marketplace</h3>
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-400 font-bold">{sustainabilityStats.greenCredits} Credits Available</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {marketplaceRewards.map((item, index) => (
            <div key={index} className="bg-gray-700 rounded-lg p-4">
              <div className="text-white font-medium mb-2">{item.reward}</div>
              <div className="flex items-center justify-between">
                <span className="text-yellow-400 font-bold">{item.cost} credits</span>
                <button
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    item.available && sustainabilityStats.greenCredits >= item.cost
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={!item.available || sustainabilityStats.greenCredits < item.cost}
                  onClick={() => handleRedeem(item)}
                >
                  Redeem
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SustainabilityTracker;
