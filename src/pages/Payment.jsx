import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { 
  Calendar, 
  MapPin, 
  User, 
  CreditCard, 
  Shield, 
  CheckCircle2, 
  ChevronLeft,
  IndianRupee,
  Clock,
  Info
} from "lucide-react";
import Layout from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  
  const [bookingData, setBookingData] = useState({
    startDate: '',
    endDate: '',
    deliveryAddress: '',
    specialInstructions: '',
    addInsurance: false,
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Get product data from location state or use mock data
  const product = location.state?.product || {
    id: id,
    title: "Professional DJ Mixer",
    description: "Perfect for events and parties",
    images: ["https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=60"],
    pricePerDay: 50,
    location: "Downtown",
    owner: {
      name: "Olivia Bennett",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?auto=format&fit=crop&w=200&q=60",
      verified: true
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please log in to proceed with booking");
      navigate('/browse');
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!bookingData.startDate) newErrors.startDate = 'Start date is required';
    if (!bookingData.endDate) newErrors.endDate = 'End date is required';
    if (!bookingData.deliveryAddress) newErrors.deliveryAddress = 'Delivery address is required';
    if (!bookingData.cardholderName) newErrors.cardholderName = 'Cardholder name is required';
    if (!bookingData.cardNumber) newErrors.cardNumber = 'Card number is required';
    if (!bookingData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
    if (!bookingData.cvv) newErrors.cvv = 'CVV is required';
    
    // Date validation
    if (bookingData.startDate && bookingData.endDate) {
      if (new Date(bookingData.startDate) >= new Date(bookingData.endDate)) {
        newErrors.endDate = 'End date must be after start date';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculatePricing = () => {
    if (!bookingData.startDate || !bookingData.endDate) {
      return { days: 0, dailyRate: product.pricePerDay, subtotal: 0, insurance: 0, total: 0 };
    }
    
    const start = new Date(bookingData.startDate);
    const end = new Date(bookingData.endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const dailyRate = product.pricePerDay;
    const subtotal = days * dailyRate;
    const insurance = bookingData.addInsurance ? subtotal * 0.1 : 0;
    const total = subtotal + insurance;
    
    return { days, dailyRate, subtotal, insurance, total };
  };

  const pricing = calculatePricing();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const booking = {
        id: Date.now(),
        productId: product.id,
        userId: user?.id,
        ...bookingData,
        pricing,
        status: 'confirmed',
        bookingReference: `RG${Date.now().toString().slice(-6)}`,
        createdAt: new Date().toISOString()
      };
      
      toast.success(`Booking confirmed! Reference: ${booking.bookingReference}`);
      
      // Navigate to dashboard or booking confirmation page
      setTimeout(() => {
        navigate('/dashboard', { 
          state: { 
            newBooking: booking,
            message: 'Your booking has been confirmed successfully!' 
          }
        });
      }, 1000);
      
    } catch (error) {
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        {/* Back button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(`/product/${product.id}`)}
          className="mb-6 group"
        >
          <ChevronLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Product
        </Button>

        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8">Complete Your Booking</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Product Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
                  
                  <div className="space-y-4">
                    {/* Product Info */}
                    <div className="flex space-x-4">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{product.title}</h4>
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3" />
                          <span>{product.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          <img
                            src={product.owner.avatar}
                            alt={product.owner.name}
                            className="w-6 h-6 rounded-full"
                          />
                          <span className="text-sm text-muted-foreground">{product.owner.name}</span>
                          {product.owner.verified && (
                            <Shield className="h-3 w-3 text-green-500" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="border-t pt-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <IndianRupee className="h-4 w-4 text-primary" />
                        <span className="font-semibold">Pricing Details</span>
                      </div>
                      
                      {pricing.days > 0 ? (
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>₹{pricing.dailyRate}/day × {pricing.days} days</span>
                            <span>₹{pricing.subtotal.toFixed(2)}</span>
                          </div>
                          {bookingData.addInsurance && (
                            <div className="flex justify-between">
                              <span>Damage Protection (10%)</span>
                              <span>₹{pricing.insurance.toFixed(2)}</span>
                            </div>
                          )}
                          <div className="border-t pt-2 font-semibold flex justify-between">
                            <span>Total</span>
                            <span className="text-primary">₹{pricing.total.toFixed(2)}</span>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">Select dates to see pricing</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Booking Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Rental Period */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Calendar className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold">Rental Period</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Start Date *</label>
                        <input
                          type="date"
                          name="startDate"
                          value={bookingData.startDate}
                          onChange={handleInputChange}
                          className={`w-full p-3 border rounded-xl ${
                            errors.startDate ? 'border-red-400' : 'border-border'
                          } focus:outline-none focus:ring-2 focus:ring-primary`}
                          min={new Date().toISOString().split('T')[0]}
                        />
                        {errors.startDate && (
                          <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">End Date *</label>
                        <input
                          type="date"
                          name="endDate"
                          value={bookingData.endDate}
                          onChange={handleInputChange}
                          className={`w-full p-3 border rounded-xl ${
                            errors.endDate ? 'border-red-400' : 'border-border'
                          } focus:outline-none focus:ring-2 focus:ring-primary`}
                          min={bookingData.startDate || new Date().toISOString().split('T')[0]}
                        />
                        {errors.endDate && (
                          <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Delivery Information */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <MapPin className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold">Delivery Information</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Delivery Address *</label>
                        <textarea
                          name="deliveryAddress"
                          value={bookingData.deliveryAddress}
                          onChange={handleInputChange}
                          rows={3}
                          className={`w-full p-3 border rounded-xl ${
                            errors.deliveryAddress ? 'border-red-400' : 'border-border'
                          } focus:outline-none focus:ring-2 focus:ring-primary resize-none`}
                          placeholder="Enter your complete delivery address"
                        />
                        {errors.deliveryAddress && (
                          <p className="text-red-500 text-sm mt-1">{errors.deliveryAddress}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Special Instructions (Optional)</label>
                        <textarea
                          name="specialInstructions"
                          value={bookingData.specialInstructions}
                          onChange={handleInputChange}
                          rows={2}
                          className="w-full p-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                          placeholder="Any special instructions for delivery or pickup"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Additional Options */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Shield className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold">Additional Options</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <label className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="addInsurance"
                          checked={bookingData.addInsurance}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                        <div>
                          <span className="font-medium">Damage Protection Insurance</span>
                          <p className="text-sm text-muted-foreground">
                            Protect yourself against accidental damage (10% of rental cost)
                          </p>
                        </div>
                      </label>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Information */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold">Payment Information</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Cardholder Name *</label>
                        <input
                          type="text"
                          name="cardholderName"
                          value={bookingData.cardholderName}
                          onChange={handleInputChange}
                          className={`w-full p-3 border rounded-xl ${
                            errors.cardholderName ? 'border-red-400' : 'border-border'
                          } focus:outline-none focus:ring-2 focus:ring-primary`}
                          placeholder="Full name as on card"
                        />
                        {errors.cardholderName && (
                          <p className="text-red-500 text-sm mt-1">{errors.cardholderName}</p>
                        )}
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Card Number *</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={bookingData.cardNumber}
                          onChange={handleInputChange}
                          className={`w-full p-3 border rounded-xl ${
                            errors.cardNumber ? 'border-red-400' : 'border-border'
                          } focus:outline-none focus:ring-2 focus:ring-primary font-mono`}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                        {errors.cardNumber && (
                          <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Expiry Date *</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={bookingData.expiryDate}
                          onChange={handleInputChange}
                          className={`w-full p-3 border rounded-xl ${
                            errors.expiryDate ? 'border-red-400' : 'border-border'
                          } focus:outline-none focus:ring-2 focus:ring-primary font-mono text-center`}
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                        {errors.expiryDate && (
                          <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">CVV *</label>
                        <input
                          type="text"
                          name="cvv"
                          value={bookingData.cvv}
                          onChange={handleInputChange}
                          className={`w-full p-3 border rounded-xl ${
                            errors.cvv ? 'border-red-400' : 'border-border'
                          } focus:outline-none focus:ring-2 focus:ring-primary font-mono text-center`}
                          placeholder="123"
                          maxLength={4}
                        />
                        {errors.cvv && (
                          <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <div className="flex flex-col space-y-4">
                  <Button
                    type="submit"
                    disabled={isProcessing || pricing.total === 0}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:shadow-lg disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Processing Payment...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Shield className="h-5 w-5" />
                        <span>
                          Complete Booking {pricing.total > 0 ? `- ₹${pricing.total.toFixed(2)}` : ''}
                        </span>
                      </div>
                    )}
                  </Button>
                  
                  <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>Your payment information is secure and encrypted</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;