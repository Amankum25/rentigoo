import { Star, MapPin, Shield } from "lucide-react";

const FeaturedOwners = () => {
  const owners = [
    {
      name: "Sarah Johnson",
      rating: 4.9,
      reviews: 127,
      location: "Downtown",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
      verified: true,
      items: 15
    },
    {
      name: "Michael Chen", 
      rating: 4.8,
      reviews: 93,
      location: "Midtown",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
      verified: true,
      items: 22
    },
    {
      name: "Emily Rodriguez",
      rating: 5.0,
      reviews: 156,
      location: "Uptown", 
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
      verified: true,
      items: 8
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Meet Our Featured Owners
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Trusted community members sharing their items with verified renters
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {owners.map((owner, index) => (
            <div 
              key={index}
              className="glass-card p-8 text-center group hover:scale-105 transition-all duration-300 hover:shadow-glow"
            >
              {/* Avatar */}
              <div className="relative mb-6">
                <img
                  src={owner.avatar}
                  alt={owner.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300"
                />
                {owner.verified && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                      <Shield className="h-3 w-3" />
                      <span>Verified</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Owner info */}
              <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {owner.name}
              </h3>
              
              {/* Rating */}
              <div className="flex items-center justify-center space-x-2 mb-3">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(owner.rating) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-foreground font-medium">
                  {owner.rating}
                </span>
                <span className="text-muted-foreground text-sm">
                  ({owner.reviews} reviews)
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center justify-center space-x-2 mb-4">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground text-sm">{owner.location}</span>
              </div>

              {/* Items count */}
              <div className="text-sm text-primary font-medium">
                {owner.items} items available
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Want to become a featured owner?
          </p>
          <button className="text-primary hover:text-primary-hover font-medium underline underline-offset-4 transition-colors">
            Learn about our owner program
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedOwners;