import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";
import { CATEGORIES } from "../lib/mockListings";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { 
  Camera, Upload, Check, CheckCircle2, Clock, X, 
  IndianRupee, MapPin, Info, Tag, Calendar, 
  ShieldCheck, PlusCircle, Star, Eye, Package,
  AlertCircle, TrendingUp
} from "lucide-react";

const CreateListing = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    pricePerDay: "",
    category: "",
    location: "",
    condition: "good",
    images: [],
    features: [""],
    specifications: {
      brand: "",
      model: "",
      year: "",
      dimensions: ""
    },
    availabilityDates: {
      start: "",
      end: ""
    },
    deliveryOptions: {
      pickup: true,
      delivery: false,
      deliveryFee: ""
    }
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login to create a listing");
      navigate("/", { replace: true });
      return;
    }
  }, [isAuthenticated, navigate]);

  // Suggest price based on category
  useEffect(() => {
    if (formData.category && !formData.pricePerDay) {
      let suggestedPrice = 0;
      switch(formData.category) {
        case "Electronics":
          suggestedPrice = 35;
          break;
        case "Furniture":
          suggestedPrice = 25;
          break;
        case "Tools":
          suggestedPrice = 20;
          break;
        case "Vehicles":
          suggestedPrice = 80;
          break;
        case "Photography":
          suggestedPrice = 45;
          break;
        case "Gaming":
          suggestedPrice = 15;
          break;
        default:
          suggestedPrice = 20;
      }
      
      setFormData(prev => ({
        ...prev,
        pricePerDay: suggestedPrice.toString()
      }));
    }
  }, [formData.category]);

  // Cleanup blob URLs on component unmount to prevent security errors
  useEffect(() => {
    return () => {
      formData.images.forEach(imageUrl => {
        if (imageUrl && imageUrl.startsWith('blob:')) {
          URL.revokeObjectURL(imageUrl);
        }
      });
    };
  }, []);

  const steps = [
    { id: 1, title: "Basic Info", description: "Item details and description" },
    { id: 2, title: "Pricing & Location", description: "Set price and availability" },
    { id: 3, title: "Photos & Features", description: "Upload images and add features" },
    { id: 4, title: "Review & Publish", description: "Preview and publish listing" }
  ];

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.title.trim()) {
          newErrors.title = "Title is required";
        } else if (formData.title.length < 5) {
          newErrors.title = "Title must be at least 5 characters";
        }
        
        if (!formData.description.trim()) {
          newErrors.description = "Description is required";
        } else if (formData.description.length < 20) {
          newErrors.description = "Description must be at least 20 characters";
        }
        
        if (!formData.category) {
          newErrors.category = "Category is required";
        }
        break;
        
      case 2:
        if (!formData.pricePerDay || parseFloat(formData.pricePerDay) <= 0) {
          newErrors.pricePerDay = "Valid price is required";
        }
        
        if (!formData.location.trim()) {
          newErrors.location = "Location is required";
        }
        
        if (formData.deliveryOptions.delivery && !formData.deliveryOptions.deliveryFee) {
          newErrors.deliveryFee = "Delivery fee is required if offering delivery";
        }
        break;
        
      case 3:
        if (formData.images.length === 0) {
          newErrors.images = "At least one image is required";
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(3)) { // Validate all previous steps
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newListing = {
        id: Date.now(),
        ...formData,
        price: formData.pricePerDay, // For backward compatibility
        pricePerDay: parseFloat(formData.pricePerDay),
        createdBy: user.name,
        userId: user.id,
        owner: user.name,
        ownerAvatar: user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        createdAt: new Date().toISOString(),
        rating: 4.5 + Math.random() * 0.5, // Random rating for demo
        reviews: Math.floor(Math.random() * 50) + 1,
        available: true,
        features: formData.features.filter(f => f.trim() !== "")
      };

      const existingListings = JSON.parse(localStorage.getItem('rentigoo_listings') || '[]');
      const updatedListings = [newListing, ...existingListings];
      localStorage.setItem('rentigoo_listings', JSON.stringify(updatedListings));

      toast.success("🎉 Listing created successfully!");
      setCurrentStep(4);
      
      setTimeout(() => {
        navigate("/dashboard", { state: { message: "Listing created successfully!" } });
      }, 2000);
      
    } catch (error) {
      toast.error("Failed to create listing. Please try again.");
      console.error("Error creating listing:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  const addFeature = () => {
    if (formData.features.length < 8) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, ""]
      }));
    }
  };

  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      features: newFeatures.length > 0 ? newFeatures : [""]
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.images.length > 5) {
      toast.warning("Maximum 5 images allowed");
      return;
    }
    
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...imageUrls]
    }));

    if (errors.images) {
      setErrors(prev => ({ ...prev, images: "" }));
    }
  };

  const removeImage = (index) => {
    setFormData(prev => {
      const imageToRemove = prev.images[index];
      // Clean up blob URL to prevent memory leaks and security errors
      if (imageToRemove && imageToRemove.startsWith('blob:')) {
        URL.revokeObjectURL(imageToRemove);
      }
      return {
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      };
    });
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center gap-2 md:gap-4 mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <Badge 
            className={`flex items-center gap-2 px-4 py-2 transition-all duration-300 ${
              currentStep >= step.id 
                ? 'bg-primary text-primary-foreground shadow-glow' 
                : 'bg-muted text-muted-foreground hover:bg-muted/70'
            }`}
          >
            <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
              currentStep >= step.id 
                ? 'bg-white/20 text-white' 
                : 'bg-background text-foreground'
            }`}>
              {currentStep > step.id ? (
                <Check className="h-3 w-3" />
              ) : (
                step.id
              )}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-medium">
                {step.title}
              </p>
            </div>
          </Badge>
          {index < steps.length - 1 && (
            <div className={`w-8 h-px mx-2 transition-colors ${
              currentStep > step.id ? 'bg-primary' : 'bg-border'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Item Title *</label>
        <input 
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full p-3 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
            errors.title ? 'border-red-500' : 'border-border hover:border-primary/50'
          }`}
          placeholder="e.g., Professional DSLR Camera Canon EOS R5"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Description *</label>
        <textarea 
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="5"
          className={`w-full p-3 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-colors resize-none ${
            errors.description ? 'border-red-500' : 'border-border hover:border-primary/50'
          }`}
          placeholder="Describe your item in detail. Include condition, features, what makes it special..."
        />
        <div className="flex justify-between items-center mt-1">
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          <p className="text-sm text-muted-foreground">{formData.description.length}/500</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Category *</label>
        <select 
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={`w-full p-3 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
            errors.category ? 'border-red-500' : 'border-border hover:border-primary/50'
          }`}
        >
          <option value="">Select a category</option>
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Condition</label>
        <select 
          name="condition"
          value={formData.condition}
          onChange={handleChange}
          className="w-full p-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-colors hover:border-primary/50"
        >
          <option value="new">New</option>
          <option value="like-new">Like New</option>
          <option value="excellent">Excellent</option>
          <option value="good">Good</option>
          <option value="fair">Fair</option>
        </select>
      </div>
    </div>
  );

  const renderPricingLocation = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Daily Price (₹) *</label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <input 
              type="number"
              name="pricePerDay"
              value={formData.pricePerDay}
              onChange={handleChange}
              className={`w-full pl-10 p-3 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
                errors.pricePerDay ? 'border-red-500' : 'border-border hover:border-primary/50'
              }`}
              placeholder="25.00"
              min="0"
              step="0.01"
            />
          </div>
          {errors.pricePerDay && <p className="text-red-500 text-sm mt-1">{errors.pricePerDay}</p>}
          {formData.category && (
            <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
              <TrendingUp className="inline h-4 w-4" />
              Suggested: ${(() => {
                switch(formData.category) {
                  case "Electronics": return "35";
                  case "Furniture": return "25";
                  case "Tools": return "20";
                  case "Vehicles": return "80";
                  case "Photography": return "45";
                  case "Gaming": return "15";
                  default: return "20";
                }
              })()} per day
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Location *</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <input 
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={`w-full pl-10 p-3 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
                errors.location ? 'border-red-500' : 'border-border hover:border-primary/50'
              }`}
              placeholder="City, State"
            />
          </div>
          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
        </div>
      </div>

      <Card className="border border-border/50 bg-muted/30">
        <CardContent className="p-4">
          <h3 className="font-medium text-foreground mb-3">Delivery Options</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input 
                type="checkbox"
                name="deliveryOptions.pickup"
                checked={formData.deliveryOptions.pickup}
                onChange={handleChange}
                className="rounded border-border focus:ring-primary"
              />
              <span className="text-sm text-foreground">Pickup available</span>
            </label>
            
            <label className="flex items-center gap-2">
              <input 
                type="checkbox"
                name="deliveryOptions.delivery"
                checked={formData.deliveryOptions.delivery}
                onChange={handleChange}
                className="rounded border-border focus:ring-primary"
              />
              <span className="text-sm text-foreground">Delivery available</span>
            </label>
            
            {formData.deliveryOptions.delivery && (
              <div className="ml-6">
                <input 
                  type="number"
                  name="deliveryOptions.deliveryFee"
                  value={formData.deliveryOptions.deliveryFee}
                  onChange={handleChange}
                  className={`p-2 border rounded-lg w-32 bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
                    errors.deliveryFee ? 'border-red-500' : 'border-border hover:border-primary/50'
                  }`}
                  placeholder="Delivery fee"
                  min="0"
                  step="0.01"
                />
                {errors.deliveryFee && <p className="text-red-500 text-sm mt-1">{errors.deliveryFee}</p>}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Available From</label>
          <input 
            type="date"
            name="availabilityDates.start"
            value={formData.availabilityDates.start}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            className="w-full p-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-colors hover:border-primary/50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Available Until</label>
          <input 
            type="date"
            name="availabilityDates.end"
            value={formData.availabilityDates.end}
            onChange={handleChange}
            min={formData.availabilityDates.start || new Date().toISOString().split('T')[0]}
            className="w-full p-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-colors hover:border-primary/50"
          />
        </div>
      </div>
    </div>
  );

  const renderPhotosFeatures = () => (
    <div className="space-y-6">
      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Photos ({formData.images.length}/5) *</label>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          {formData.images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Upload ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg border border-border group-hover:border-primary/50 transition-colors"
              />
              <Button
                type="button"
                onClick={() => removeImage(index)}
                size="sm"
                variant="destructive"
                className="absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3 w-3" />
              </Button>
              {index === 0 && (
                <Badge className="absolute bottom-2 left-2 bg-primary text-primary-foreground text-xs">
                  Main
                </Badge>
              )}
            </div>
          ))}
          
          {formData.images.length < 5 && (
            <label className="border-2 border-dashed border-border rounded-lg h-32 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors bg-muted/20 hover:bg-muted/30">
              <Camera className="h-8 w-8 text-muted-foreground mb-2" />
              <span className="text-sm text-muted-foreground">Add Photo</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          )}
        </div>
        
        {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}
        <p className="text-sm text-muted-foreground flex items-center gap-1">
          <Info className="inline h-4 w-4" />
          First image will be used as the main photo. JPG, PNG files up to 5MB each.
        </p>
      </div>

      {/* Features */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Key Features</label>
        <div className="space-y-3">
          {formData.features.map((feature, index) => (
            <div key={index} className="flex gap-2">
              <input 
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                className="flex-1 p-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-colors hover:border-primary/50"
                placeholder="e.g., 45MP Full Frame, Weather Sealed"
              />
              {formData.features.length > 1 && (
                <Button
                  type="button"
                  onClick={() => removeFeature(index)}
                  variant="ghost"
                  size="sm"
                  className="p-2 text-red-500 hover:bg-red-50 hover:text-red-600"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          
          {formData.features.length < 8 && (
            <Button
              type="button"
              onClick={addFeature}
              variant="ghost"
              className="flex items-center gap-1 text-primary hover:text-primary-hover text-sm"
            >
              <PlusCircle className="h-4 w-4" />
              Add Feature
            </Button>
          )}
        </div>
      </div>

      {/* Specifications */}
      <Card className="border border-border/50 bg-muted/30">
        <CardContent className="p-4">
          <h3 className="font-medium text-foreground mb-3">Specifications (Optional)</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input 
              type="text"
              name="specifications.brand"
              value={formData.specifications.brand}
              onChange={handleChange}
              className="p-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-colors hover:border-primary/50"
              placeholder="Brand"
            />
            <input 
              type="text"
              name="specifications.model"
              value={formData.specifications.model}
              onChange={handleChange}
              className="p-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-colors hover:border-primary/50"
              placeholder="Model"
            />
            <input 
              type="text"
              name="specifications.year"
              value={formData.specifications.year}
              onChange={handleChange}
              className="p-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-colors hover:border-primary/50"
              placeholder="Year"
            />
            <input 
              type="text"
              name="specifications.dimensions"
              value={formData.specifications.dimensions}
              onChange={handleChange}
              className="p-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-colors hover:border-primary/50"
              placeholder="Dimensions"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderReviewPublish = () => (
    <div className="space-y-6">
      <div className="text-center">
        <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-display text-2xl font-bold text-foreground mb-2">Review Your Listing</h2>
        <p className="text-subtitle text-muted-foreground">Everything looks good! Your listing is ready to go live.</p>
      </div>

      <Card className="border border-border/50 bg-muted/20">
        <CardContent className="p-6">
          <div className="flex gap-4">
            {formData.images[0] && (
              <img 
                src={formData.images[0]} 
                alt={formData.title}
                className="w-32 h-32 object-cover rounded-lg border border-border"
              />
            )}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-foreground mb-2">{formData.title}</h3>
              <p className="text-muted-foreground mb-2 line-clamp-2">{formData.description}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Tag className="h-4 w-4" />
                  {formData.category}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {formData.location}
                </span>
                <span className="flex items-center gap-1">
                  <IndianRupee className="h-4 w-4" />
                  ₹{formData.pricePerDay}/day
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground">What happens next?</h4>
              <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                <li>• Your listing will be live immediately</li>
                <li>• Users can contact you through the platform</li>
                <li>• You'll receive notifications for booking requests</li>
                <li>• You can edit or deactivate your listing anytime</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  if (!isAuthenticated) {
    return (
      <Layout>
        <section className="relative pt-8 pb-12 md:pt-16 md:pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-background" />
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="relative container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-foreground mb-2">Authentication Required</h1>
              <p className="text-muted-foreground mb-6">Please login to create a listing</p>
              <Button 
                onClick={() => navigate("/")}
                className="bg-gradient-to-r from-primary to-primary-hover hover:shadow-glow transition-all duration-300"
              >
                Go to Home
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section - matching Browse page style */}
      <section className="relative pt-8 pb-12 md:pt-16 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-background" />
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-hero text-4xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">List Your</span>{' '}
              <span className="text-foreground">Item</span>
            </h1>
            <p className="text-body-large text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Share your items with the community and start earning. Create professional listings in just a few simple steps.
            </p>
            
            {/* Step Indicator */}
            {renderStepIndicator()}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="relative pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Form Content */}
            <Card className="glass-card rounded-xl border border-primary/10 overflow-hidden">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit}>
                  {currentStep === 1 && renderBasicInfo()}
                  {currentStep === 2 && renderPricingLocation()}
                  {currentStep === 3 && renderPhotosFeatures()}
                  {currentStep === 4 && renderReviewPublish()}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8 pt-6 border-t border-border">
                    <Button
                      type="button"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      variant={currentStep === 1 ? "ghost" : "outline"}
                      className={currentStep === 1 ? "cursor-not-allowed opacity-50" : ""}
                    >
                      Previous
                    </Button>

                    {currentStep < 4 ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="bg-gradient-to-r from-primary to-primary-hover hover:shadow-glow transition-all duration-300"
                      >
                        Next Step
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={`bg-gradient-to-r ${
                          isSubmitting
                            ? 'from-gray-400 to-gray-500 cursor-not-allowed'
                            : 'from-green-600 to-green-700 hover:shadow-glow'
                        } transition-all duration-300`}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Publishing...
                          </div>
                        ) : (
                          'Publish Listing'
                        )}
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Preview Button */}
            {currentStep >= 3 && formData.images.length > 0 && (
              <div className="text-center mt-6">
                <Button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  variant="ghost"
                  className="text-primary hover:text-primary-hover"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  {showPreview ? 'Hide Preview' : 'Preview Listing'}
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CreateListing;