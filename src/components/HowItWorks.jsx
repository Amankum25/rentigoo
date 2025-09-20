import { Button } from "@/components/ui/button";
import { Search, Calendar, Package } from "lucide-react";
import { useStaggeredAnimation } from "@/hooks/use-scroll-animation";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Browse & Find",
      description: "Browse our vast marketplace to find exactly what you need.",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: Calendar,
      title: "Book Instantly", 
      description: "Choose your dates and pay securely through our trusted platform.",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Package,
      title: "Enjoy & Return",
      description: "Use your item and return it when you're done. It's that simple.",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    }
  ];

  const [setRef, visibleItems] = useStaggeredAnimation(steps, 0.2);

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-in-up">
            How RentiGoo Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Getting what you need has never been easier. Just three simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isVisible = visibleItems.has(index);
            
            return (
              <div 
                key={index} 
                ref={setRef(index)}
                className={`text-center group transition-all duration-700 ease-out relative
                  ${isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                  }`}
              >
                {/* Step number positioned before the content */}
                <div className={`absolute -top-6 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-primary rounded-full flex items-center justify-center 
                  text-white poppins-bold text-sm z-10 group-hover:scale-125 transition-all duration-300
                  ${isVisible ? 'animate-bounce-in' : ''}`}
                  style={{ animationDelay: `${index * 0.2 + 0.5}s` }}
                >
                  {index + 1}
                </div>
                
                <div className="relative mb-8 pt-6">
                  {/* Icon container with enhanced animations */}
                  <div className={`glass-card ${step.bgColor} w-24 h-24 rounded-2xl flex items-center justify-center mx-auto 
                    group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500 hover:shadow-glow relative overflow-hidden`}>
                    <Icon className={`h-12 w-12 ${step.color} group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`} />
                    
                    {/* Ripple effect on hover */}
                    <div className="absolute inset-0 rounded-2xl bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500" />
                  </div>

                  {/* Animated connecting line */}
                  {index < steps.length - 1 && (
                    <div className={`hidden md:block absolute top-1/2 left-full w-full h-0.5 transform -translate-y-1/2 z-0
                      bg-gradient-to-r from-primary/30 to-transparent transition-all duration-1000
                      ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}
                      style={{ transformOrigin: 'left', animationDelay: `${index * 0.2 + 0.8}s` }}
                    />
                  )}
                </div>
                
                <h3 className={`text-2xl font-semibold text-foreground mb-4 transition-all duration-500
                  group-hover:text-primary group-hover:scale-105
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${index * 0.2 + 0.3}s` }}
                >
                  {step.title}
                </h3>
                <p className={`text-muted-foreground leading-relaxed transition-all duration-500
                  group-hover:text-foreground
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${index * 0.2 + 0.4}s` }}
                >
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-primary to-primary-hover hover:shadow-glow hover:scale-110 
              transition-all duration-300 px-8 py-6 text-lg group relative overflow-hidden"
          >
            <span className="relative z-10 group-hover:scale-105 transition-transform duration-300">
              Start Your First Rental
            </span>
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-hover to-primary scale-x-0 group-hover:scale-x-100 
              transition-transform duration-300 origin-left" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;