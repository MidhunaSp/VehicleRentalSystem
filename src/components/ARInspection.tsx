import React, { useState } from 'react';
import { Camera, Scan, CheckCircle, AlertTriangle, XCircle, Eye, Zap } from 'lucide-react';

const ARInspection: React.FC = () => {
  const [selectedVehicle, setSelectedVehicle] = useState('tesla-model-3');
  const [inspectionMode, setInspectionMode] = useState('damage-detection');
  const [isScanning, setIsScanning] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const vehicles = [
    { id: 'tesla-model-3', name: 'Tesla Model 3', status: 'available' },
    { id: 'bmw-i4', name: 'BMW i4 M50', status: 'maintenance' },
    { id: 'mercedes-eqs', name: 'Mercedes EQS', status: 'rented' },
  ];

  const inspectionResults = {
    'tesla-model-3': {
      overall: 'excellent',
      issues: [],
      highlights: [
        { area: 'Front Bumper', status: 'excellent', confidence: 98 },
        { area: 'Left Door', status: 'excellent', confidence: 95 },
        { area: 'Right Door', status: 'excellent', confidence: 97 },
        { area: 'Rear Bumper', status: 'excellent', confidence: 96 },
        { area: 'Hood', status: 'excellent', confidence: 99 },
        { area: 'Trunk', status: 'excellent', confidence: 94 },
      ],
    },
    'bmw-i4': {
      overall: 'good',
      issues: [
        { area: 'Front Bumper', type: 'Minor Scratch', severity: 'low', confidence: 87 },
      ],
      highlights: [
        { area: 'Front Bumper', status: 'minor-damage', confidence: 87 },
        { area: 'Left Door', status: 'excellent', confidence: 95 },
        { area: 'Right Door', status: 'excellent', confidence: 97 },
        { area: 'Rear Bumper', status: 'excellent', confidence: 96 },
        { area: 'Hood', status: 'excellent', confidence: 99 },
        { area: 'Trunk', status: 'excellent', confidence: 94 },
      ],
    },
    'mercedes-eqs': {
      overall: 'fair',
      issues: [
        { area: 'Right Door', type: 'Dent', severity: 'medium', confidence: 92 },
        { area: 'Left Mirror', type: 'Crack', severity: 'high', confidence: 89 },
      ],
      highlights: [
        { area: 'Front Bumper', status: 'excellent', confidence: 98 },
        { area: 'Left Door', status: 'excellent', confidence: 95 },
        { area: 'Right Door', status: 'damage', confidence: 92 },
        { area: 'Rear Bumper', status: 'excellent', confidence: 96 },
        { area: 'Hood', status: 'excellent', confidence: 99 },
        { area: 'Left Mirror', status: 'damage', confidence: 89 },
      ],
    },
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-400 bg-green-900/20 border-green-600';
      case 'good': return 'text-blue-400 bg-blue-900/20 border-blue-600';
      case 'fair': return 'text-yellow-400 bg-yellow-900/20 border-yellow-600';
      case 'damage': return 'text-red-400 bg-red-900/20 border-red-600';
      case 'minor-damage': return 'text-orange-400 bg-orange-900/20 border-orange-600';
      default: return 'text-gray-400 bg-gray-900/20 border-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return CheckCircle;
      case 'good': return CheckCircle;
      case 'fair': return AlertTriangle;
      case 'damage': return XCircle;
      case 'minor-damage': return AlertTriangle;
      default: return AlertTriangle;
    }
  };

  const handleStartCamera = () => {
    setCameraActive(true);
    // Simulate camera initialization
    setTimeout(() => {
      alert('Camera initialized! Point your device at the vehicle to begin inspection.');
    }, 500);
  };

  const handleBeginScan = () => {
    if (!cameraActive) {
      alert('Please start the camera first!');
      return;
    }
    
    setIsScanning(true);
    setScanProgress(0);
    
    // Simulate scanning progress
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          alert('Scan complete! Results updated below.');
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const currentResults = inspectionResults[selectedVehicle];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600">
          <Camera className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">AR Vehicle Inspection</h1>
          <p className="text-gray-400">AI-powered damage detection and virtual inspection</p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Select Vehicle</label>
            <select
              value={selectedVehicle}
              onChange={(e) => setSelectedVehicle(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {vehicles.map(vehicle => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Inspection Mode</label>
            <select
              value={inspectionMode}
              onChange={(e) => setInspectionMode(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="damage-detection">Damage Detection</option>
              <option value="interior-scan">Interior Scan</option>
              <option value="tire-inspection">Tire Inspection</option>
              <option value="full-inspection">Full Vehicle Scan</option>
            </select>
          </div>
        </div>
      </div>

      {/* AR Inspection Interface */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">AR Inspection View</h3>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-red-400 text-sm font-medium">Live AR Feed</span>
          </div>
        </div>

        {/* Simulated AR View */}
        <div className="relative bg-gray-900 rounded-lg p-8 min-h-80 flex items-center justify-center border-2 border-dashed border-gray-600">
          {isScanning ? (
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Scan className="w-12 h-12 text-white animate-spin" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Scanning Vehicle...</h4>
              <div className="w-64 bg-gray-700 rounded-full h-2 mx-auto mb-4">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
              <p className="text-gray-400">{scanProgress}% Complete</p>
            </div>
          ) : (
            <div className="text-center">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 ${
                cameraActive 
                  ? 'bg-gradient-to-r from-green-500 to-blue-600' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-600'
              }`}>
                <Eye className="w-12 h-12 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">
                {cameraActive ? 'Camera Active' : 'AR Camera View'}
              </h4>
              <p className="text-gray-400 mb-4">
                {cameraActive 
                  ? 'Camera is ready. Begin scanning to inspect the vehicle.' 
                  : 'Start the camera to begin vehicle inspection'
                }
              </p>
              <div className="flex justify-center space-x-4">
                <button 
                  onClick={handleStartCamera}
                  disabled={cameraActive}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    cameraActive
                      ? 'bg-green-600 text-white cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <Camera className="w-4 h-4" />
                  <span>{cameraActive ? 'Camera Active' : 'Start Camera'}</span>
                </button>
                <button 
                  onClick={handleBeginScan}
                  disabled={isScanning}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    isScanning
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  <Scan className="w-4 h-4" />
                  <span>{isScanning ? 'Scanning...' : 'Begin Scan'}</span>
                </button>
              </div>
            </div>
          )}

          {/* AR Overlay Elements */}
          <div className={`absolute top-4 left-4 bg-black/60 text-white px-3 py-2 rounded-lg text-sm ${
            cameraActive ? 'block' : 'hidden'
          }`}>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>AI Analysis: {isScanning ? 'Scanning' : 'Ready'}</span>
            </div>
          </div>
          
          <div className={`absolute top-4 right-4 bg-black/60 text-white px-3 py-2 rounded-lg text-sm ${
            cameraActive ? 'block' : 'hidden'
          }`}>
            Confidence: {isScanning ? `${Math.min(scanProgress + 20, 100)}%` : '94%'}
          </div>
          
          <div className={`absolute bottom-4 left-4 bg-black/60 text-white px-3 py-2 rounded-lg text-sm ${
            cameraActive ? 'block' : 'hidden'
          }`}>
            Mode: {inspectionMode.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </div>
        </div>
      </div>

      {/* Inspection Results */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Inspection Results</h3>
          <div className={`inline-flex items-center px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(currentResults.overall)}`}>
            <div className="w-2 h-2 bg-current rounded-full mr-2"></div>
            Overall: {currentResults.overall.charAt(0).toUpperCase() + currentResults.overall.slice(1)}
          </div>
        </div>

        {/* Issues Found */}
        {currentResults.issues.length > 0 && (
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-white mb-4">Issues Detected</h4>
            <div className="space-y-3">
              {currentResults.issues.map((issue, index) => (
                <div key={index} className="bg-red-900/20 border border-red-600 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                      <div>
                        <span className="text-white font-medium">{issue.area}: {issue.type}</span>
                        <div className="text-red-400 text-sm">Severity: {issue.severity}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium">{issue.confidence}%</div>
                      <div className="text-gray-400 text-sm">Confidence</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Vehicle Parts Status */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Vehicle Parts Analysis</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {currentResults.highlights.map((part, index) => {
              const StatusIcon = getStatusIcon(part.status);
              return (
                <div key={index} className="bg-gray-700 rounded-lg p-4 text-center">
                  <StatusIcon className={`w-8 h-8 mx-auto mb-2 ${getStatusColor(part.status).split(' ')[0]}`} />
                  <div className="text-white text-sm font-medium mb-1">{part.area}</div>
                  <div className="text-gray-400 text-xs">{part.confidence}% confidence</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* AI Analysis Summary */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">AI Analysis Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {currentResults.highlights.filter(h => h.status === 'excellent').length}
            </div>
            <div className="text-gray-400">Perfect Condition</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">
              {currentResults.issues.filter(i => i.severity === 'low' || i.severity === 'medium').length}
            </div>
            <div className="text-gray-400">Minor Issues</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-400 mb-2">
              {currentResults.issues.filter(i => i.severity === 'high').length}
            </div>
            <div className="text-gray-400">Major Issues</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARInspection;