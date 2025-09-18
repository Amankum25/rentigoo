import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Alex Thompson",
      role: "Photographer",
      content: "Needed a specific camera lens for a weekend project and found it on RentiGoo. So much more secure and easy to use than other platforms.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      name: "Jessica Park",
      role: "Interior Designer", 
      content: "Amazing selection of furniture for staging. The quality is excellent and the owners are super responsive. Highly recommend!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      name: "David Kumar",
      role: "Student",
      content: "As a student, buying expensive equipment isn't feasible. RentiGoo lets me access professional tools when I need them without breaking the bank.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            What Our Users Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied renters and owners in our community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="glass-card p-8 relative group hover:scale-105 transition-all duration-300 hover:shadow-glow"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6">
                <Quote className="h-8 w-8 text-primary/20 group-hover:text-primary/40 transition-colors" />
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star 
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground mb-8 leading-relaxed text-lg">
                "{testimonial.content}"
              </p>

              {/* User info */}
              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                />
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Ready to share your own experience?
          </p>
          <button className="text-primary hover:text-primary-hover font-medium underline underline-offset-4 transition-colors">
            Join our community today
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;