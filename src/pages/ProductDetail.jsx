import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Mock data - shows actual product information based on ID
const getProductData = (id) => {
  const baseProducts = {
    1: { 
      title: "Professional DJ Mixer", 
      price: 550, 
      location: "Downtown",
      description: "This professional DJ mixer is perfect for any event, from small parties to large gatherings. It features a user-friendly interface, high-quality sound output, and durable construction. Rent it today and take your event's music to the next level!",
      images: [
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&h=400&q=80",
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&h=400&q=80",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&h=400&q=80",
        "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&h=400&q=80",
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&h=400&q=80"
      ]
    },
    2: { 
      title: "Vintage Camera", 
      price: 35, 
      location: "Midtown",
      description: "Professional vintage camera perfect for photography enthusiasts and content creators. Fully functional with original lens and accessories included.",
      images: [
        "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=600&h=400&q=80",
        "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=600&h=400&q=80",
        "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=600&h=400&q=80",
        "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=600&h=400&q=80",
        "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=600&h=400&q=80"
      ]
    },
    3: { 
      title: "Electric Scooter", 
      price: 25, 
      location: "Uptown",
      description: "Modern electric scooter perfect for city commuting and short trips. Long battery life and comfortable ride experience.",
      images: [
        "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=600&h=400&q=80",
        "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=600&h=400&q=80",
        "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=600&h=400&q=80",
        "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=600&h=400&q=80",
        "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=600&h=400&q=80"
      ]
    }
  };

  const base = baseProducts[id] || baseProducts[1];
  
  return {
    id: parseInt(id),
    title: base.title,
    description: base.description,
    images: base.images,
    pricePerDay: base.price,
    location: base.location,
    owner: {
      name: "Olivia Bennett",
      joinedDate: "Joined 2021",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?auto=format&fit=crop&w=100&q=60"
    },
    rentalDetails: {
      rentalPrice: `₹${base.price}/day`,
      minimumRentalPeriod: "1 day",
      securityDeposit: `₹${base.price * 2}`,
      cancellationPolicy: "Flexible"
    }
  };
};

const Calendar = ({ month, year, selectedDates = [] }) => {
  const monthNames = ["January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"];
  
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };
  
  const daysInMonth = getDaysInMonth(month, year);
  const firstDay = getFirstDayOfMonth(month, year);
  
  const days = [];
  
  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }
  
  const isSelected = (day) => {
    if (month === 6) { // July (0-indexed)
      return [5, 6, 7].includes(day);
    }
    if (month === 7) { // August
      return [1, 2, 3, 4, 7].includes(day);
    }
    return false;
  };
  
  return (
    <div className="w-full max-w-xs">
      <div className="text-center text-sm font-medium text-gray-800 mb-3">
        {monthNames[month]} {year}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 p-2">
            {day}
          </div>
        ))}
        {days.map((day, index) => (
          <div key={index} className="h-8 flex items-center justify-center">
            {day && (
              <div className={`
                w-6 h-6 flex items-center justify-center rounded text-xs cursor-pointer
                ${isSelected(day) 
                  ? 'bg-green-500 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
                }
              `}>
                {day}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const Button = ({ children, onClick, className }) => (
  <button onClick={onClick} className={className}>
    {children}
  </button>
);

const ProductDetail = () => {
  const [currentMonth, setCurrentMonth] = useState(6); // July
  const [currentYear] = useState(2024);
  
  const product = getProductData(1); // Default to product 1
  
  const handleRentNow = () => {
    alert(`Rent Now clicked for ${product.title}`);
  };
  
  const nextMonth = () => {
    if (currentMonth < 7) setCurrentMonth(currentMonth + 1);
  };
  
  const prevMonth = () => {
    if (currentMonth > 6) setCurrentMonth(currentMonth - 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 max-w-4xl bg-white rounded-lg shadow-sm">
        {/* Breadcrumb */}
        <div className="text-xs text-gray-500 mb-4">
          Home / Electronics / DJ Equipment
        </div>

        {/* Product Images */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {product.images.map((img, i) => (
            <div key={i} className="flex-shrink-0 w-24 h-16 bg-gray-100 rounded border overflow-hidden">
              <img 
                src={img} 
                alt={`${product.title} ${i+1}`} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-xl font-medium text-gray-900 mb-4">
          {product.title} - Rent for Your Next Event
        </h1>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          {product.description}
        </p>

        {/* About the Owner */}
        <div className="mb-6">
          <h2 className="text-sm font-medium text-gray-900 mb-3">About the Owner</h2>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
              <img 
                src={product.owner.avatar} 
                alt={product.owner.name} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">{product.owner.name}</div>
              <div className="text-xs text-green-600">{product.owner.joinedDate}</div>
            </div>
          </div>
        </div>

        {/* Rental Details */}
        <div className="mb-6">
          <h2 className="text-sm font-medium text-gray-900 mb-3">Rental Details</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Rental Price</span>
              <span className="text-gray-900">{product.rentalDetails.rentalPrice}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Minimum Rental Period</span>
              <span className="text-gray-900">{product.rentalDetails.minimumRentalPeriod}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Security Deposit</span>
              <span className="text-gray-900">{product.rentalDetails.securityDeposit}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Cancellation Policy</span>
              <span className="text-gray-900">{product.rentalDetails.cancellationPolicy}</span>
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="mb-8">
          <h2 className="text-sm font-medium text-gray-900 mb-4">Availability</h2>
          <div className="flex items-center justify-center gap-4">
            <button 
              onClick={prevMonth}
              disabled={currentMonth <= 6}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <div className="flex gap-8">
              <Calendar month={6} year={2024} />
              <Calendar month={7} year={2024} />
            </div>
            
            <button 
              onClick={nextMonth}
              disabled={currentMonth >= 7}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Rent Now Button */}
        <div className="flex justify-end">
          <Button 
            onClick={handleRentNow} 
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-2 rounded text-sm font-medium"
          >
            Rent Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;