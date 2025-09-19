import { Button } from "@/components/ui/button";
import { Search, Calendar, Package } from "lucide-react";

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

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            How RentiGoo Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Getting what you need has never been easier. Just three simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  {/* Step number */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm z-10">
                    {index + 1}
                  </div>
                  
                  {/* Icon container */}
                  <div className={`glass-card ${step.bgColor} w-24 h-24 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-300 hover:shadow-glow`}>
                    <Icon className={`h-12 w-12 ${step.color}`} />
                  </div>

                  {/* Connecting line (except for last item) */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent transform -translate-y-1/2 z-0"></div>
                  )}
                </div>
                
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-primary to-primary-hover hover:shadow-glow transition-all duration-300 px-8 py-6 text-lg"
          >
            Start Your First Rental
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;