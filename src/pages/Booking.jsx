import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import { AuthContext } from "../contexts/AuthContext";
import { listings } from "../lib/mockListings";

const Booking = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  
  // Get listing data from props or fetch by id
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Booking form state
  const [bookingData, setBookingData] = useState({
    startDate: "",
    endDate: "",
    deliveryAddress: "",
    addInsurance: false,
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    specialRequests: ""
  });
  
  // Pricing state
  const [pricing, setPricing] = useState({
    dailyRate: 0,
    days: 0,
    subtotal: 0,
    insurance: 0,
    total: 0
  });
  
  // Form validation
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated) {
      toast.error("Please login to make a booking");
      navigate("/", { replace: true });
      return;
    }

    // Get listing data
    let listingData = null;
    
    // Try to get from location state first (passed from product detail page)
    if (location.state?.listing) {
      listingData = location.state.listing;
    } else if (id) {
      // Fallback: find by id in mock data
      listingData = listings.find(l => l.id === parseInt(id));
    }
    
    if (listingData) {
      setListing(listingData);
      setPricing(prev => ({ ...prev, dailyRate: listingData.pricePerDay }));
    } else {
      toast.error("Listing not found");
      navigate("/browse", { replace: true });
      return;
    }
    
    setLoading(false);
  }, [isAuthenticated, navigate, id, location.state]);

  // Calculate pricing when dates change
  useEffect(() => {
    if (bookingData.startDate && bookingData.endDate && listing) {
      const start = new Date(bookingData.startDate);
      const end = new Date(bookingData.endDate);
      const timeDiff = end.getTime() - start.getTime();
      const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
      
      if (days > 0) {
        const subtotal = days * listing.pricePerDay;
        const insurance = bookingData.addInsurance ? subtotal * 0.1 : 0;
        const total = subtotal + insurance;
        
        setPricing({
          dailyRate: listing.pricePerDay,
          days,
          subtotal,
          insurance,
          total
        });
      }
    }
  }, [bookingData.startDate, bookingData.endDate, bookingData.addInsurance, listing]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate dates
    if (!bookingData.startDate) {
      newErrors.startDate = "Start date is required";
    }
    if (!bookingData.endDate) {
      newErrors.endDate = "End date is required";
    }
    if (bookingData.startDate && bookingData.endDate) {
      const start = new Date(bookingData.startDate);
      const end = new Date(bookingData.endDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (start < today) {
        newErrors.startDate = "Start date cannot be in the past";
      }
      if (end <= start) {
        newErrors.endDate = "End date must be after start date";
      }
    }
    
    // Validate delivery address
    if (!bookingData.deliveryAddress.trim()) {
      newErrors.deliveryAddress = "Delivery address is required";
    }
    
    // Validate payment information
    if (!bookingData.cardholderName.trim()) {
      newErrors.cardholderName = "Cardholder name is required";
    }
    if (!bookingData.cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required";
    } else if (bookingData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }
    if (!bookingData.expiryDate.trim()) {
      newErrors.expiryDate = "Expiry date is required";
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(bookingData.expiryDate)) {
      newErrors.expiryDate = "Expiry date must be in MM/YY format";
    }
    if (!bookingData.cvv.trim()) {
      newErrors.cvv = "CVV is required";
    } else if (!/^\d{3,4}$/.test(bookingData.cvv)) {
      newErrors.cvv = "CVV must be 3 or 4 digits";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create booking object
      const booking = {
        id: Date.now(),
        listingId: listing.id,
        listingTitle: listing.title,
        listingImage: listing.image,
        userId: user.id,
        userName: user.name,
        ownerName: listing.owner,
        ...bookingData,
        pricing,
        status: "confirmed",
        createdAt: new Date().toISOString(),
        bookingReference: `RG${Date.now().toString().slice(-6)}`
      };
      
      // Save booking to localStorage
      const existingBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
      existingBookings.push(booking);
      localStorage.setItem('userBookings', JSON.stringify(existingBookings));
      
      // Show success message
      toast.success(`Booking confirmed! Reference: ${booking.bookingReference}`);
      
      // Redirect to dashboard
      setTimeout(() => {
        navigate('/dashboard', { 
          state: { 
            message: 'Booking confirmed successfully!',
            bookingId: booking.id 
          }
        });
      }, 1500);
      
    } catch (error) {
      toast.error("Booking failed. Please try again.");
      console.error('Booking error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setBookingData(prev => ({ ...prev, cardNumber: formatted }));
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading booking details...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!listing) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Listing not found</h1>
            <button 
              onClick={() => navigate('/browse')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Back to Browse
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Background matching Browse page style */}
      <div className="relative min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-background" />
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent mb-4">
                Complete Your Booking
              </h1>
              <p className="text-muted-foreground text-lg">Secure your rental in just a few steps</p>
            </div>
            
            {/* Listing Summary */}
            <div className="glass-card rounded-2xl border border-primary/10 p-8 mb-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="relative">
                  <img 
                    src={listing.image} 
                    alt={listing.title}
                    className="w-full md:w-64 h-64 object-cover rounded-xl shadow-lg"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-3 text-foreground">{listing.title}</h2>
                  <div className="space-y-2 mb-6">
                    <p className="text-muted-foreground flex items-center">
                      <span className="font-medium mr-2">Owner:</span> {listing.owner}
                    </p>
                    <p className="text-muted-foreground flex items-center">
                      <span className="font-medium mr-2">Location:</span> {listing.location}
                    </p>
                    <p className="text-muted-foreground leading-relaxed">{listing.description}</p>
                  </div>
                  <div className="inline-flex items-center bg-gradient-to-r from-primary to-primary-hover text-white px-6 py-3 rounded-full font-bold text-xl shadow-lg">
                    ₹{listing.pricePerDay}/day
                  </div>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="glass-card rounded-2xl border border-primary/10 p-8">
                <div className="grid lg:grid-cols-2 gap-12">
                  {/* Booking Details */}
                  <div>
                    <h2 className="text-2xl font-bold mb-8 text-foreground flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-hover rounded-full flex items-center justify-center text-white font-bold mr-3">1</div>
                      Rental Details
                    </h2>
                    
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2 text-foreground">Start Date *</label>
                          <input 
                            type="date" 
                            name="startDate"
                            value={bookingData.startDate}
                            onChange={handleInputChange}
                            min={new Date().toISOString().split('T')[0]}
                            className={`w-full p-4 border rounded-xl glass-card ${errors.startDate ? 'border-red-400 ring-2 ring-red-200' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200`}
                          />
                          {errors.startDate && <p className="text-red-500 text-sm mt-2 flex items-center"><span className="mr-1">⚠️</span>{errors.startDate}</p>}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold mb-2 text-foreground">End Date *</label>
                          <input 
                            type="date" 
                            name="endDate"
                            value={bookingData.endDate}
                            onChange={handleInputChange}
                            min={bookingData.startDate || new Date().toISOString().split('T')[0]}
                            className={`w-full p-4 border rounded-xl glass-card ${errors.endDate ? 'border-red-400 ring-2 ring-red-200' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200`}
                          />
                          {errors.endDate && <p className="text-red-500 text-sm mt-2 flex items-center"><span className="mr-1">⚠️</span>{errors.endDate}</p>}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-foreground">Delivery Address *</label>
                        <textarea 
                          name="deliveryAddress"
                          value={bookingData.deliveryAddress}
                          onChange={handleInputChange}
                          rows="4"
                          className={`w-full p-4 border rounded-xl glass-card ${errors.deliveryAddress ? 'border-red-400 ring-2 ring-red-200' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none`}
                          placeholder="Enter your full delivery address..."
                        />
                        {errors.deliveryAddress && <p className="text-red-500 text-sm mt-2 flex items-center"><span className="mr-1">⚠️</span>{errors.deliveryAddress}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-foreground">Special Requests (Optional)</label>
                        <textarea 
                          name="specialRequests"
                          value={bookingData.specialRequests}
                          onChange={handleInputChange}
                          rows="3"
                          className="w-full p-4 border border-border rounded-xl glass-card focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
                          placeholder="Any special instructions or requests..."
                        />
                      </div>
                      
                      <div className="glass-card p-4 rounded-xl border border-primary/20">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input 
                            type="checkbox" 
                            name="addInsurance"
                            checked={bookingData.addInsurance}
                            onChange={handleInputChange}
                            className="mt-1 w-5 h-5 text-primary rounded focus:ring-primary" 
                          />
                          <div>
                            <span className="text-sm font-semibold text-foreground">Add Damage Protection Insurance</span>
                            <p className="text-xs text-muted-foreground mt-1">Protect yourself with comprehensive coverage (10% of rental cost)</p>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  {/* Payment Section */}
                  <div>
                    <h2 className="text-2xl font-bold mb-8 text-foreground flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-hover rounded-full flex items-center justify-center text-white font-bold mr-3">2</div>
                      Payment Information
                    </h2>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-foreground">Cardholder Name *</label>
                        <input 
                          type="text" 
                          name="cardholderName"
                          value={bookingData.cardholderName}
                          onChange={handleInputChange}
                          className={`w-full p-4 border rounded-xl glass-card ${errors.cardholderName ? 'border-red-400 ring-2 ring-red-200' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200`}
                          placeholder="John Doe"
                        />
                        {errors.cardholderName && <p className="text-red-500 text-sm mt-2 flex items-center"><span className="mr-1">⚠️</span>{errors.cardholderName}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-foreground">Card Number *</label>
                        <input 
                          type="text" 
                          name="cardNumber"
                          value={bookingData.cardNumber}
                          onChange={handleCardNumberChange}
                          maxLength={19}
                          className={`w-full p-4 border rounded-xl glass-card ${errors.cardNumber ? 'border-red-400 ring-2 ring-red-200' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 font-mono`}
                          placeholder="1234 5678 9012 3456"
                        />
                        {errors.cardNumber && <p className="text-red-500 text-sm mt-2 flex items-center"><span className="mr-1">⚠️</span>{errors.cardNumber}</p>}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2 text-foreground">Expiry Date *</label>
                          <input 
                            type="text" 
                            name="expiryDate"
                            value={bookingData.expiryDate}
                            onChange={handleInputChange}
                            className={`w-full p-4 border rounded-xl glass-card ${errors.expiryDate ? 'border-red-400 ring-2 ring-red-200' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 font-mono text-center`}
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                          {errors.expiryDate && <p className="text-red-500 text-sm mt-2 flex items-center"><span className="mr-1">⚠️</span>{errors.expiryDate}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2 text-foreground">CVV *</label>
                          <input 
                            type="text" 
                            name="cvv"
                            value={bookingData.cvv}
                            onChange={handleInputChange}
                            className={`w-full p-4 border rounded-xl glass-card ${errors.cvv ? 'border-red-400 ring-2 ring-red-200' : 'border-border'} focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 font-mono text-center`}
                            placeholder="123"
                            maxLength={4}
                          />
                          {errors.cvv && <p className="text-red-500 text-sm mt-2 flex items-center"><span className="mr-1">⚠️</span>{errors.cvv}</p>}
                        </div>
                      </div>
                      
                      {/* Pricing Breakdown */}
                      <div className="mt-8 p-6 glass-card rounded-2xl border border-primary/10">
                        <h3 className="text-xl font-bold mb-6 text-foreground flex items-center">
                          <div className="w-6 h-6 bg-gradient-to-r from-primary to-primary-hover rounded-full flex items-center justify-center text-white font-bold mr-3 text-sm">₹</div>
                          Pricing Breakdown
                        </h3>
                        
                        {pricing.days > 0 ? (
                          <div className="space-y-3">
                            <div className="flex justify-between items-center py-2 border-b border-gray-200/50">
                              <span className="text-gray-700">₹{pricing.dailyRate}/day × {pricing.days} days</span>
                              <span className="font-semibold text-gray-800">₹{pricing.subtotal.toFixed(2)}</span>
                            </div>
                            {bookingData.addInsurance && (
                              <div className="flex justify-between items-center py-2 border-b border-gray-200/50">
                                <span className="text-gray-700">Damage Protection Insurance</span>
                                <span className="font-semibold text-gray-800">₹{pricing.insurance.toFixed(2)}</span>
                              </div>
                            )}
                            <div className="flex justify-between items-center py-3 text-xl font-bold border-t-2 border-primary/20">
                              <span className="text-foreground">Total Amount:</span>
                              <span className="bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">₹{pricing.total.toFixed(2)}</span>
                            </div>
                          </div>
                        ) : (
                          <p className="text-muted-foreground text-center py-4">Select dates to see pricing</p>
                        )}
                        
                        <button 
                          type="submit"
                          disabled={isSubmitting || pricing.days <= 0}
                          className={`w-full mt-6 py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform ${
                            isSubmitting || pricing.days <= 0
                              ? 'bg-gray-300 cursor-not-allowed scale-95' 
                              : 'bg-gradient-to-r from-primary to-primary-hover hover:shadow-glow hover:scale-105 text-white shadow-lg'
                          }`}
                        >
                          {isSubmitting ? (
                            <div className="flex items-center justify-center gap-3">
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                              Processing Payment...
                            </div>
                          ) : (
                            <div className="flex items-center justify-center gap-2">
                              <span>🔒</span>
                              Confirm Booking {pricing.total > 0 ? `- ₹${pricing.total.toFixed(2)}` : ''}
                            </div>
                          )}
                        </button>
                        <p className="text-xs text-muted-foreground text-center mt-3">
                          🛡️ Your payment information is secure and encrypted
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Booking;
