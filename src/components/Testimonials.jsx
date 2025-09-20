import { Star, Quote } from "lucide-react";
import { useStaggeredAnimation } from "@/hooks/use-scroll-animation";
import { useState, useEffect } from "react";

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
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
    },
    {
      name: "Maria Garcia",
      role: "Event Planner",
      content: "Perfect for special events! I can rent high-quality decorations and equipment without the huge upfront cost. The selection is incredible.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      name: "Ryan Wu",
      role: "Freelancer",
      content: "Game changer for my freelance work! I can access professional tools for projects without massive investments. Highly recommended platform.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
    }
  ];

  const [setRef, visibleItems] = useStaggeredAnimation(testimonials, 0.1);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-in-up">
            What Our Users Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Join thousands of satisfied renters and owners in our community
          </p>
        </div>

        {/* Featured testimonial carousel */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="glass-card p-12 text-center mx-4 relative group">
                      {/* Large quote icon */}
                      <Quote className="h-16 w-16 text-primary/20 mx-auto mb-8 group-hover:text-primary/40 
                        group-hover:scale-110 transition-all duration-500" />
                      
                      {/* Testimonial content */}
                      <blockquote className="text-2xl text-foreground leading-relaxed mb-8 font-light italic group-hover:scale-105 transition-transform duration-300">
                        "{testimonial.content}"
                      </blockquote>
                      
                      {/* User info */}
                      <div className="flex items-center justify-center space-x-4">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover ring-4 ring-primary/20 
                            group-hover:ring-primary/40 group-hover:scale-110 transition-all duration-300"
                        />
                        <div className="text-left">
                          <div className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors duration-300">
                            {testimonial.name}
                          </div>
                          <div className="text-muted-foreground text-sm group-hover:text-foreground transition-colors duration-300">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                      
                      {/* Rating stars */}
                      <div className="flex justify-center space-x-1 mt-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star 
                            key={i}
                            className="h-5 w-5 fill-yellow-400 text-yellow-400 group-hover:scale-125 
                              transition-all duration-300"
                            style={{ transitionDelay: `${i * 0.1}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Carousel indicators */}
            <div className="flex justify-center space-x-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-primary scale-125 shadow-lg' 
                      : 'bg-primary/30 hover:bg-primary/60 hover:scale-110'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Additional testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((testimonial, index) => {
            const isVisible = visibleItems.has(index);
            
            return (
              <div 
                key={index}
                ref={setRef(index)}
                className={`glass-card p-8 relative group cursor-default overflow-hidden
                  transition-all duration-700 ease-out
                  hover:scale-105 hover:shadow-glow hover:-translate-y-2
                  ${isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                  }`}
              >
                {/* Animated quote icon */}
                <div className="absolute top-6 right-6">
                  <Quote className="h-8 w-8 text-primary/20 group-hover:text-primary/40 
                    group-hover:scale-125 group-hover:rotate-12 transition-all duration-500" />
                </div>

                {/* Animated background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Rating with staggered star animation */}
                <div className={`flex items-center space-x-1 mb-6 relative z-10 transition-all duration-500
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${index * 0.2 + 0.3}s` }}
                >
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400 group-hover:scale-125 
                        group-hover:drop-shadow-lg transition-all duration-300"
                      style={{ transitionDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>

                {/* Content with typewriter effect feel */}
                <p className={`text-foreground mb-8 leading-relaxed text-lg relative z-10 
                  group-hover:text-foreground/90 transition-all duration-500
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${index * 0.2 + 0.4}s` }}
                >
                  <span className="relative">
                    "{testimonial.content}"
                    {/* Subtle text decoration */}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary/30 
                      group-hover:w-full transition-all duration-1000"></span>
                  </span>
                </p>

                {/* User info with enhanced animations */}
                <div className={`flex items-center space-x-4 relative z-10 transition-all duration-500
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${index * 0.2 + 0.5}s` }}
                >
                  <picture>
                    <source srcSet={testimonial.avatar + '&fm=webp'} type="image/webp" />
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20 
                        group-hover:ring-primary/40 group-hover:scale-110 transition-all duration-300"
                      loading="lazy"
                    />
                  </picture>
                  <div>
                    <div className="font-semibold text-foreground group-hover:text-primary 
                      group-hover:scale-105 transition-all duration-300 origin-left">
                      {testimonial.name}
                    </div>
                    <div className="text-muted-foreground text-sm group-hover:text-foreground/70 
                      transition-colors duration-300">
                      {testimonial.role}
                    </div>
                  </div>
                </div>

                {/* Hover shine effect */}
                <div className="absolute top-0 -left-full h-full w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                  group-hover:left-full transition-all duration-1000 transform skew-x-12" />

                {/* Floating elements */}
                <div className="absolute top-4 left-4 w-1 h-1 bg-primary/30 rounded-full opacity-0 
                  group-hover:opacity-100 group-hover:scale-150 transition-all duration-700" />
                <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-primary/20 rounded-full opacity-0 
                  group-hover:opacity-100 group-hover:scale-150 transition-all duration-700" style={{ transitionDelay: '0.3s' }} />
              </div>
            );
          })}
        </div>

        {/* Call to action with enhanced animation */}
        <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <p className="text-muted-foreground mb-6 group transition-colors duration-300 hover:text-foreground">
            Ready to share your own experience?
          </p>
          <button className="text-primary hover:text-primary-hover font-medium underline underline-offset-4 
            transition-all duration-300 hover:scale-110 group relative overflow-hidden">
            <span className="relative z-10 group-hover:tracking-wide transition-all duration-300">
              Join our community today
            </span>
            {/* Animated underline */}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary 
              group-hover:w-full transition-all duration-500"></span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;