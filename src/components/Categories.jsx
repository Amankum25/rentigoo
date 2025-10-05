import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Sofa, Smartphone, Car, Wrench, Camera, Gamepad2 } from "lucide-react";
import { useStaggeredAnimation } from "@/hooks/use-scroll-animation";

const Categories = memo(() => {
  const categories = [
    {
      icon: Sofa,
      title: "Furniture",
      count: "2,500+ items",
      description: "Sofas, tables, chairs & more",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Smartphone,
      title: "Electronics", 
      count: "1,800+ items",
      description: "Phones, laptops, cameras",
      gradient: "from-primary to-primary-hover"
    },
    {
      icon: Car,
      title: "Vehicles",
      count: "950+ items", 
      description: "Cars, bikes, scooters",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: Wrench,
      title: "Tools",
      count: "3,200+ items",
      description: "Power tools, equipment",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      icon: Camera,
      title: "Photography",
      count: "850+ items",
      description: "Cameras, lenses, lighting",
      gradient: "from-pink-500 to-pink-600"
    },
    {
      icon: Gamepad2,
      title: "Gaming",
      count: "650+ items",
      description: "Consoles, accessories",
      gradient: "from-indigo-500 to-indigo-600"
    }
  ];

  const [setRef, visibleItems] = useStaggeredAnimation(categories, 0.15);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6 animate-fade-in-up">
            Browse by Category
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up px-4" style={{ animationDelay: '0.2s' }}>
            Discover thousands of items across multiple categories, all available for rent
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const isVisible = visibleItems.has(index);
            
            return (
              <div
                key={index}
                ref={setRef(index)}
                className={`glass-card-enhanced p-6 sm:p-8 group cursor-pointer relative overflow-hidden
                  transition-all duration-700 ease-out
                  hover:scale-105 hover:shadow-2xl hover:-translate-y-2 sm:hover:-translate-y-4
                  ${isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                  }`}
              >
                {/* Animated background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className="flex items-start space-x-6 relative z-10">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center 
                    group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-2xl transition-all duration-500 shadow-lg`}>
                    <Icon className="h-10 w-10 text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {category.title}
                    </h3>
                    <p className="text-lg font-medium text-primary mb-3 group-hover:scale-105 transition-transform duration-300 origin-left">
                      {category.count}
                    </p>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300 text-lg">
                      {category.description}
                    </p>
                  </div>
                </div>
                
                {/* Enhanced hover shine effect */}
                <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                  group-hover:left-full transition-all duration-1000 transform skew-x-12" />
              </div>
            );
          })}
        </div>

        <div className="text-center animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <Button 
            size="lg"
            variant="outline"
            className="glass border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 hover:scale-110 
              transition-all duration-300 px-8 py-6 text-lg group"
          >
            <span className="group-hover:scale-105 transition-transform duration-300">View All Categories</span>
          </Button>
        </div>
      </div>
    </section>
  );
});

export default Categories;