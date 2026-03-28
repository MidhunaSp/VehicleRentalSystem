import React, { useState } from "react";
import { MapPin, CreditCard, Shield, Zap } from "lucide-react";

interface Vehicle {
  _id?: string;
  name: string;
  type: string;
  price: number;
  image: string;
  location: string;
  isElectric?: boolean;
  batteryLevel?: number;
  features: string[];
}

interface BookingSystemProps {
  vehicle: Vehicle | null;
}

const BookingSystem: React.FC<BookingSystemProps> = ({ vehicle }) => {
  const [bookingData, setBookingData] = useState({
    startDate: "",
    endDate: "",
    startTime: "09:00",
    endTime: "18:00",
    rentalType: "daily",
    insurance: false,
    addOns: [] as string[],
  });

  const [isBooking, setIsBooking] = useState(false);

  if (!vehicle) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Select a Vehicle</h3>
          <p className="text-gray-400">
            Choose a vehicle from the search results to start booking
          </p>
        </div>
      </div>
    );
  }

  // Calculate total cost based on rental type & duration
  const calculateTotal = () => {
    if (!bookingData.startDate || !bookingData.endDate) return vehicle.price;

    const start = new Date(bookingData.startDate);
    const end = new Date(bookingData.endDate);
    const days = Math.max(
      1,
      Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24))
    );

    let total = vehicle.price * days;

    // Add insurance
    if (bookingData.insurance) total += 1200 * days; // ₹1200/day for insurance

    return total;
  };

  // Handle booking confirmation (simulated)
  const handleBooking = async () => {
    if (!bookingData.startDate || !bookingData.endDate) {
      alert("⚠️ Please select both start and end dates.");
      return;
    }

    setIsBooking(true);

    try {
      const booking = {
        vehicleId: vehicle._id || vehicle.name,
        vehicleName: vehicle.name,
        ...bookingData,
        total: calculateTotal(),
      };

      // Simulate saving booking
      localStorage.setItem("latestBooking", JSON.stringify(booking));

      setTimeout(() => {
        alert("✅ Booking confirmed! Smart contract initiated.");
        setIsBooking(false);
      }, 1000);
    } catch (error) {
      console.error(error);
      alert("❌ Booking failed. Please try again.");
      setIsBooking(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Booking Form Section */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h1 className="text-2xl font-bold text-white mb-6">
          Complete Your Booking
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Vehicle Info */}
          <div>
            <img
              src={vehicle.image}
              alt={vehicle.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <div className="space-y-3">
              <div>
                <h3 className="text-xl font-bold text-white">{vehicle.name}</h3>
                <p className="text-gray-400">{vehicle.type}</p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center text-gray-400">
                  <MapPin className="w-4 h-4 mr-2" />
                  {vehicle.location}
                </div>
                {vehicle.isElectric && (
                  <div className="flex items-center text-green-400">
                    <Zap className="w-4 h-4 mr-2" />
                    {vehicle.batteryLevel ?? 0}% charged
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {vehicle.features.map((feature, index) => (
                  <span
                    key={index}
                    className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="space-y-6">
            {/* Rental Type */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Rental Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["hourly", "daily", "weekly"].map((type) => (
                  <button
                    key={type}
                    onClick={() =>
                      setBookingData((prev) => ({ ...prev, rentalType: type }))
                    }
                    className={`p-3 rounded-lg text-sm font-medium capitalize transition-colors ${
                      bookingData.rentalType === type
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Date Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={bookingData.startDate}
                  onChange={(e) =>
                    setBookingData((prev) => ({ ...prev, startDate: e.target.value }))
                  }
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={bookingData.endDate}
                  onChange={(e) =>
                    setBookingData((prev) => ({ ...prev, endDate: e.target.value }))
                  }
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Time Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Pick-up Time
                </label>
                <input
                  type="time"
                  value={bookingData.startTime}
                  onChange={(e) =>
                    setBookingData((prev) => ({ ...prev, startTime: e.target.value }))
                  }
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Return Time
                </label>
                <input
                  type="time"
                  value={bookingData.endTime}
                  onChange={(e) =>
                    setBookingData((prev) => ({ ...prev, endTime: e.target.value }))
                  }
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Insurance */}
            <div>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={bookingData.insurance}
                  onChange={(e) =>
                    setBookingData((prev) => ({ ...prev, insurance: e.target.checked }))
                  }
                  className="w-5 h-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                />
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-blue-400" />
                  <span className="text-white">Add Premium Insurance (+₹1200/day)</span>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Summary */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">Booking Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-400">Base Rate</span>
            <span className="text-white">₹{vehicle.price}/day</span>
          </div>
          {bookingData.insurance && (
            <div className="flex justify-between">
              <span className="text-gray-400">Premium Insurance</span>
              <span className="text-white">₹1200/day</span>
            </div>
          )}
          <div className="border-t border-gray-700 pt-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-white">Total</span>
              <span className="text-2xl font-bold text-white">₹{calculateTotal()}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleBooking}
          disabled={isBooking}
          className={`w-full mt-6 ${
            isBooking
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          } text-white py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2`}
        >
          <CreditCard className="w-5 h-5" />
          <span>{isBooking ? "Processing..." : "Confirm Booking & Pay"}</span>
        </button>

        <div className="mt-4 p-4 bg-green-900/20 border border-green-600 rounded-lg">
          <div className="flex items-center space-x-2 text-green-400">
            <Shield className="w-5 h-5" />
            <span className="font-medium">Blockchain-Secured Transaction</span>
          </div>
          <p className="text-green-300 text-sm mt-1">
            Your rental agreement will be secured by a smart contract for maximum transparency and security.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingSystem;
