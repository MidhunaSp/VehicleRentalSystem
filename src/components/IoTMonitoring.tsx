import React from 'react';
import { Wifi, Battery, Gauge, Thermometer, AlertTriangle, CheckCircle, Zap } from 'lucide-react';

const IoTMonitoring: React.FC = () => {
  const vehicles = [
    {
      id: 1,
      name: 'Tesla Model 3',
      location: 'Downtown Seattle',
      status: 'active',
      battery: 78,
      range: 280,
      temperature: 72,
      tirePressure: { fl: 32, fr: 33, rl: 31, rr: 32 },
      diagnostics: {
        engine: 'optimal',
        brakes: 'good',
        transmission: 'optimal',
        suspension: 'good',
      },
      alerts: [],
    },
    {
      id: 2,
      name: 'BMW i4 M50',
      location: 'Bellevue Mall',
      status: 'charging',
      battery: 45,
      range: 122,
      temperature: 68,
      tirePressure: { fl: 30, fr: 31, rl: 29, rr: 30 },
      diagnostics: {
        engine: 'optimal',
        brakes: 'good',
        transmission: 'optimal',
        suspension: 'good',
      },
      alerts: [
        { type: 'warning', message: 'Low tire pressure detected (RL: 29 PSI)' }
      ],
    },
    {
      id: 3,
      name: 'Mercedes EQS',
      location: 'Capitol Hill',
      status: 'parked',
      battery: 92,
      range: 416,
      temperature: 75,
      tirePressure: { fl: 34, fr: 35, rl: 34, rr: 35 },
      diagnostics: {
        engine: 'optimal',
        brakes: 'excellent',
        transmission: 'optimal',
        suspension: 'excellent',
      },
      alerts: [],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'charging': return 'text-blue-400';
      case 'parked': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getBatteryColor = (level: number) => {
    if (level > 60) return 'text-green-400';
    if (level > 30) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getDiagnosticColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-400';
      case 'optimal': return 'text-green-400';
      case 'good': return 'text-blue-400';
      case 'warning': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-blue-600">
          <Wifi className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">IoT Vehicle Monitoring</h1>
          <p className="text-gray-400">Real-time health and status monitoring for all vehicles</p>
        </div>
      </div>

      <div className="space-y-6">
        {vehicles.map(vehicle => (
          <div key={vehicle.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">{vehicle.name}</h3>
                <p className="text-gray-400">{vehicle.location}</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(vehicle.status).replace('text-', 'bg-')}`}></div>
                <span className={`font-medium capitalize ${getStatusColor(vehicle.status)}`}>
                  {vehicle.status}
                </span>
              </div>
            </div>

            {/* Alerts */}
            {vehicle.alerts.length > 0 && (
              <div className="mb-6">
                {vehicle.alerts.map((alert, index) => (
                  <div key={index} className="flex items-center space-x-3 bg-yellow-900/20 border border-yellow-600 rounded-lg p-4">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <span className="text-yellow-300">{alert.message}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Battery Status */}
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Battery className={`w-5 h-5 ${getBatteryColor(vehicle.battery)}`} />
                  <span className="text-white font-medium">Battery</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Level</span>
                    <span className={`font-bold ${getBatteryColor(vehicle.battery)}`}>
                      {vehicle.battery}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        vehicle.battery > 60 ? 'bg-green-500' :
                        vehicle.battery > 30 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${vehicle.battery}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Range</span>
                    <span className="text-white font-medium">{vehicle.range} mi</span>
                  </div>
                </div>
              </div>

              {/* Temperature */}
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Thermometer className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-medium">Temperature</span>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{vehicle.temperature}°F</div>
                  <div className="text-green-400 text-sm">Optimal</div>
                </div>
              </div>

              {/* Tire Pressure */}
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Gauge className="w-5 h-5 text-orange-400" />
                  <span className="text-white font-medium">Tire Pressure</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">FL:</span>
                    <span className={vehicle.tirePressure.fl < 30 ? 'text-red-400' : 'text-white'}>
                      {vehicle.tirePressure.fl} PSI
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">FR:</span>
                    <span className={vehicle.tirePressure.fr < 30 ? 'text-red-400' : 'text-white'}>
                      {vehicle.tirePressure.fr} PSI
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">RL:</span>
                    <span className={vehicle.tirePressure.rl < 30 ? 'text-red-400' : 'text-white'}>
                      {vehicle.tirePressure.rl} PSI
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">RR:</span>
                    <span className={vehicle.tirePressure.rr < 30 ? 'text-red-400' : 'text-white'}>
                      {vehicle.tirePressure.rr} PSI
                    </span>
                  </div>
                </div>
              </div>

              {/* System Diagnostics */}
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-white font-medium">Diagnostics</span>
                </div>
                <div className="space-y-2 text-sm">
                  {Object.entries(vehicle.diagnostics).map(([system, status]) => (
                    <div key={system} className="flex justify-between">
                      <span className="text-gray-400 capitalize">{system}:</span>
                      <span className={`font-medium capitalize ${getDiagnosticColor(status)}`}>
                        {status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Real-time Data Stream */}
            <div className="mt-6 bg-gray-700 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Zap className="w-5 h-5 text-blue-400" />
                <span className="text-white font-medium">Live Data Stream</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm">Live</span>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-gray-400">Speed</div>
                  <div className="text-white font-bold">0 mph</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400">Power</div>
                  <div className="text-white font-bold">0 kW</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400">Efficiency</div>
                  <div className="text-white font-bold">4.2 mi/kWh</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400">Last Update</div>
                  <div className="text-white font-bold">2s ago</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IoTMonitoring;