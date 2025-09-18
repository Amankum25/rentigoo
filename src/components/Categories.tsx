import { Button } from "@/components/ui/button";
import { Sofa, Smartphone, Car, Wrench, Camera, Gamepad2 } from "lucide-react";

const Categories = () => {
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

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Browse by Category
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover thousands of items across multiple categories, all available for rent
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="glass-card p-8 group hover:scale-105 transition-all duration-300 cursor-pointer hover:shadow-glow"
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-sm font-medium text-primary mb-2">
                      {category.count}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Button 
            size="lg"
            variant="outline"
            className="glass border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 px-8 py-6 text-lg"
          >
            View All Categories
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Categories;