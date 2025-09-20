import { Star, MapPin, Shield } from "lucide-react";
import { useStaggeredAnimation } from "@/hooks/use-scroll-animation";

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

  const [setRef, visibleItems] = useStaggeredAnimation(owners, 0.2);

  return (
    <section className="py-24 bg-gradient-to-b from-muted/20 to-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-in-up">
            Meet Our Featured Owners
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Trusted community members sharing their items with verified renters
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {owners.map((owner, index) => {
            const isVisible = visibleItems.has(index);
            
            return (
              <div 
                key={index}
                ref={setRef(index)}
                className={`glass-card p-8 text-center group cursor-pointer relative overflow-hidden
                  transition-all duration-700 ease-out
                  hover:scale-105 hover:shadow-glow hover:-translate-y-4
                  ${isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                  }`}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Avatar with enhanced animations */}
                <div className="relative mb-6 z-10">
                  <picture>
                    <source srcSet={owner.avatar + '&fm=webp'} type="image/webp" />
                    <img
                      src={owner.avatar}
                      alt={owner.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover ring-4 ring-primary/20 
                        group-hover:ring-primary/40 group-hover:scale-110 group-hover:shadow-lg
                        transition-all duration-500"
                      loading="lazy"
                    />
                  </picture>
                  {owner.verified && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1
                        group-hover:scale-110 group-hover:bg-primary-hover transition-all duration-300 shadow-lg">
                        <Shield className="h-3 w-3 group-hover:rotate-12 transition-transform duration-300" />
                        <span>Verified</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Floating particles effect */}
                  <div className="absolute -top-2 -right-2 w-2 h-2 bg-primary/30 rounded-full opacity-0 
                    group-hover:opacity-100 group-hover:animate-pulse transition-all duration-300" />
                  <div className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-primary/40 rounded-full opacity-0 
                    group-hover:opacity-100 group-hover:animate-pulse transition-all duration-300" style={{ animationDelay: '0.5s' }} />
                </div>

                {/* Owner info with staggered animations */}
                <h3 className={`text-xl font-semibold text-foreground mb-2 group-hover:text-primary group-hover:scale-105 
                  transition-all duration-300 relative z-10
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${index * 0.2 + 0.3}s` }}
                >
                  {owner.name}
                </h3>
                
                {/* Rating with animated stars */}
                <div className={`flex items-center justify-center space-x-2 mb-3 transition-all duration-500
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${index * 0.2 + 0.4}s` }}
                >
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`h-4 w-4 transition-all duration-300 group-hover:scale-125 ${
                          i < Math.floor(owner.rating) 
                            ? 'fill-yellow-400 text-yellow-400 group-hover:drop-shadow-lg' 
                            : 'text-gray-300'
                        }`}
                        style={{ transitionDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>
                  <span className="text-foreground font-medium group-hover:scale-105 transition-transform duration-300">
                    {owner.rating}
                  </span>
                  <span className="text-muted-foreground text-sm group-hover:text-foreground transition-colors duration-300">
                    ({owner.reviews} reviews)
                  </span>
                </div>

                {/* Location with icon animation */}
                <div className={`flex items-center justify-center space-x-2 mb-4 transition-all duration-500
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${index * 0.2 + 0.5}s` }}
                >
                  <MapPin className="h-4 w-4 text-muted-foreground group-hover:text-primary 
                    group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                  <span className="text-muted-foreground text-sm group-hover:text-foreground transition-colors duration-300">
                    {owner.location}
                  </span>
                </div>

                {/* Items count with counter effect */}
                <div className={`text-sm text-primary font-medium group-hover:scale-110 transition-all duration-300 relative z-10
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${index * 0.2 + 0.6}s` }}
                >
                  {owner.items} items available
                </div>

                {/* Hover shine effect */}
                <div className="absolute top-0 -left-full h-full w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                  group-hover:left-full transition-all duration-700 transform skew-x-12" />
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <p className="text-muted-foreground mb-6 transition-colors duration-300 hover:text-foreground">
            Want to become a featured owner?
          </p>
          <button className="text-primary hover:text-primary-hover font-medium underline underline-offset-4 
            transition-all duration-300 hover:scale-105 group">
            <span className="group-hover:tracking-wide transition-all duration-300">
              Learn about our owner program
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedOwners;