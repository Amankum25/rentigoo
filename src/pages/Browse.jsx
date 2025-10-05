import React, { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Star, Search, Filter, X, ChevronRight, MapPin, Calendar, Shield, Heart } from "lucide-react";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import Layout from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";

const mockListings = [
  {
    id: 1,
    title: "Modern Sofa",
    description: "Comfortable and stylish sofa for your living room",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=60",
    category: "Furniture",
    price: 45,
    location: "Downtown",
    rating: 4.8,
    reviews: 24
  },
  {
    id: 2,
    title: "Vintage Camera",
    description: "Classic camera for professional photography enthusiasts",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=60",
    category: "Electronics",
    price: 35,
    location: "Midtown",
    rating: 4.9,
    reviews: 18
  },
  {
    id: 3,
    title: "Electric Scooter",
    description: "Eco-friendly scooter for swift commuting",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=60",
    category: "Vehicles",
    price: 25,
    location: "Uptown",
    rating: 4.7,
    reviews: 32
  },
  {
    id: 4,
    title: "Mountain Bike",
    description: "Durable bike for outdoor adventures",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=60",
    category: "Vehicles",
    price: 30,
    location: "Suburbs",
    rating: 4.6,
    reviews: 15
  },
  {
    id: 5,
    title: "Designer Dress",
    description: "Elegant dress for special occasions",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=60",
    category: "Fashion",
    price: 50,
    location: "Downtown",
    rating: 4.9,
    reviews: 42
  },
  {
    id: 6,
    title: "Gaming Console",
    description: "Latest gaming system for entertainment",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=800&q=60",
    category: "Electronics",
    price: 40,
    location: "Midtown",
    rating: 4.8,
    reviews: 28
  },
  {
    id: 7,
    title: "Camping Gear",
    description: "Complete set for outdoor camping adventures",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=60",
    category: "Sports",
    price: 35,
    location: "Uptown",
    rating: 4.7,
    reviews: 19
  },
  {
    id: 8,
    title: "Kitchen Appliances",
    description: "Modern appliances for cooking enthusiasts",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=60",
    category: "Electronics",
    price: 30,
    location: "Suburbs",
    rating: 4.5,
    reviews: 13
  }
];

const CATEGORIES = ["Furniture", "Electronics", "Vehicles", "Fashion", "Sports"];

const Browse = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedAvailability, setSelectedAvailability] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  const handleRentNow = (item) => {
    if (!isAuthenticated) {
      toast.error("Please login to book items");
      return;
    }
    
    // Navigate directly to booking page with the listing data
    navigate(`/booking/${item.id}`, { 
      state: { 
        listing: {
          id: item.id,
          title: item.title,
          description: item.description,
          image: item.image,
          pricePerDay: item.pricePerDay,
          owner: item.owner,
          location: item.location,
          category: item.category
        }
      } 
    });
  };

  // Get user-created listings from localStorage
  const userListings = JSON.parse(localStorage.getItem('rentigoo_listings') || '[]');
  
  // Format user listings to match the expected structure
  const formattedUserListings = userListings.map(listing => ({
    ...listing,
    image: listing.images && listing.images.length > 0 ? listing.images[0] : "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=60",
    rating: listing.rating || 0,
    reviews: listing.reviews || 0
  }));
  
  // Combine user listings with mock listings
  const allListings = [...formattedUserListings, ...mockListings];

  const filteredListings = useMemo(() => {
    let filtered = [...allListings];
    
    // Search filter
    if (search) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    // Price filter
    if (selectedPrice !== "All") {
      const [min, max] = selectedPrice === "50+" ? [50, Infinity] : selectedPrice.split("-").map(Number);
      filtered = filtered.filter(item => parseFloat(item.price) >= min && (max === undefined || parseFloat(item.price) <= max));
    }
    
    // Location filter
    if (selectedLocation !== "All") {
      filtered = filtered.filter(item => item.location === selectedLocation);
    }
    
    // Sort logic
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "price-desc":
        filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        // newest (default) - prioritize user listings first
        filtered.sort((a, b) => {
          if (a.createdAt && !b.createdAt) return -1;
          if (!a.createdAt && b.createdAt) return 1;
          if (a.createdAt && b.createdAt) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          }
          return b.id - a.id;
        });
        break;
    }
    
    return filtered;
  }, [allListings, search, selectedCategory, selectedPrice, selectedLocation, selectedAvailability, sortBy]);

  const activeFilterCount = [
    search && 1,
    selectedCategory !== "All" && 1,
    selectedPrice !== "All" && 1,
    selectedLocation !== "All" && 1,
    selectedAvailability !== "All" && 1,
    sortBy !== "newest" && 1,
  ].filter(Boolean).length;

  function clearFilters() {
    setSearch("");
    setSelectedCategory("All");
    setSelectedPrice("All");
    setSelectedLocation("All");
    setSelectedAvailability("All");
    setSortBy("newest");
  }

  return (
    <Layout>
      {/* Hero / Header */}
      <section className="relative pt-6 pb-8 sm:pt-8 sm:pb-12 md:pt-16 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-background" />
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="relative container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-4 sm:space-y-6">
            <h1 className="text-hero text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">Browse</span>{' '}
              <span className="text-foreground">Listings</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              Discover items from trusted owners. Filter by category, price, and availability to find exactly what you need.
            </p>
            
            {/* Prominent Search */}
            <div className="glass-card p-2 flex items-center space-x-2 max-w-xl w-full">
              <div className="flex items-center space-x-3 px-3 flex-1">
                <Search className="h-5 w-5 text-muted-foreground" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search items, locations, owners..."
                  className="flex-1 bg-transparent border-none outline-none text-sm md:text-base"
                />
              </div>
              <Button variant="outline" className="md:hidden" onClick={() => setShowFilters(true)}>
                <Filter className="h-4 w-4" />
                {activeFilterCount > 0 && (
                  <span className="ml-1 text-xs bg-primary text-primary-foreground rounded-full px-2 py-0.5">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </div>
            
            {/* Category chips - Mobile optimized */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
              <Badge
                onClick={() => setSelectedCategory("All")}
                className={`cursor-pointer px-3 sm:px-4 py-2 transition flex-shrink-0 ${
                  selectedCategory === "All" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/70"
                }`}
              >
                All
              </Badge>
              {CATEGORIES.map(c => (
                <Badge
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`cursor-pointer px-3 sm:px-4 py-2 transition whitespace-nowrap flex-shrink-0 ${
                    selectedCategory === c ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/70"
                  }`}
                >
                  {c}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative pb-16 sm:pb-20 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 grid gap-6 sm:gap-8 md:grid-cols-12">
          {/* Sidebar Filters (desktop) */}
          <aside className="hidden md:block md:col-span-3">
            <div className="glass-card rounded-xl p-5 space-y-6 sticky top-28 border border-primary/10">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Filters</h2>
                {activeFilterCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs hover:text-primary">
                    Reset
                  </Button>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium mb-1 block">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    {CATEGORIES.map(c => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium mb-1 block">Price Range</label>
                <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select price range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Prices</SelectItem>
                    <SelectItem value="0-25">₹0 - ₹25</SelectItem>
                    <SelectItem value="25-50">₹25 - ₹50</SelectItem>
                    <SelectItem value="50+">₹50+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium mb-1 block">Location</label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Locations</SelectItem>
                    <SelectItem value="Downtown">Downtown</SelectItem>
                    <SelectItem value="Midtown">Midtown</SelectItem>
                    <SelectItem value="Uptown">Uptown</SelectItem>
                    <SelectItem value="Suburbs">Suburbs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="text-xs text-muted-foreground pt-2 border-t">{filteredListings.length} results</div>
            </div>
          </aside>

          {/* Mobile Filter Drawer */}
          {showFilters && (
            <div className="fixed inset-0 z-50 md:hidden">
              <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
              <div className="absolute top-0 right-0 w-80 max-w-full h-full bg-card border-l border-border flex flex-col">
                <div className="p-4 flex items-center justify-between border-b">
                  <h2 className="font-semibold">Filters</h2>
                  <Button size="icon" variant="ghost" onClick={() => setShowFilters(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-4 space-y-6 overflow-y-auto">
                  <div className="space-y-2">
                    <label className="text-xs font-medium mb-1 block">Category</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All</SelectItem>
                        {CATEGORIES.map(c => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium mb-1 block">Price Range</label>
                    <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select price range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Prices</SelectItem>
                        <SelectItem value="0-25">₹0 - ₹25</SelectItem>
                        <SelectItem value="25-50">₹25 - ₹50</SelectItem>
                        <SelectItem value="50+">₹50+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium mb-1 block">Location</label>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Locations</SelectItem>
                        <SelectItem value="Downtown">Downtown</SelectItem>
                        <SelectItem value="Midtown">Midtown</SelectItem>
                        <SelectItem value="Uptown">Uptown</SelectItem>
                        <SelectItem value="Suburbs">Suburbs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium mb-1 block">Sort By</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="price-asc">Price: Low to High</SelectItem>
                        <SelectItem value="price-desc">Price: High to Low</SelectItem>
                        <SelectItem value="rating">Rating</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1" onClick={() => setShowFilters(false)}>Apply</Button>
                    <Button variant="outline" className="flex-1" onClick={clearFilters}>Reset</Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="md:col-span-9 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Results</h2>
              <div className="hidden md:flex gap-2">
                {activeFilterCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs hover:text-primary">
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
            
            {filteredListings.length === 0 && (
              <div className="p-10 text-center border rounded-lg bg-muted/20">
                <p className="font-medium">No listings match your filters.</p>
                <p className="text-sm text-muted-foreground">Try adjusting search or filters.</p>
              </div>
            )}
            
            {filteredListings.length > 0 && (
              <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredListings.map(item => (
                  <Card key={item.id} className="border border-border hover:shadow-lg transition-all duration-300 group overflow-hidden">
                    <div className="relative overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {item.createdBy && (
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 border-green-300">
                            User Listed
                          </Badge>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-3 sm:p-4">
                      <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300 text-sm sm:text-base">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium text-foreground">{item.rating}</span>
                          <span className="text-xs text-muted-foreground">({item.reviews})</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{item.location}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-foreground">₹{item.pricePerDay || item.price}</span>
                          <span className="text-sm text-muted-foreground ml-1">/day</span>
                        </div>
                        <Button 
                          size="sm" 
                          className="bg-gradient-to-r from-primary to-primary-hover hover:shadow-glow transition-all duration-300"
                          onClick={() => handleRentNow(item)}
                        >
                          Rent Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Browse;