import { Button } from "@/components/ui/button";
import { ArrowRight, Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const AnimatedCounter = ({ target, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const countRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const increment = target / (duration / 16);
          let current = 0;
          
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return (
    <span ref={countRef}>
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const TypewriterText = ({ words, className = "" }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentWord = words[currentWordIndex];
      
      if (isDeleting) {
        setCurrentText(currentWord.substring(0, currentText.length - 1));
      } else {
        setCurrentText(currentWord.substring(0, currentText.length + 1));
      }

      if (!isDeleting && currentText === currentWord) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-blue-50 animate-gradient-x"></div>
      
      {/* Geometric floating shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-teal-200 to-teal-300 rounded-full opacity-30 animate-float blur-sm"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-blue-200 to-blue-300 rounded-lg opacity-40 animate-float-delayed blur-sm"></div>
      <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-gradient-to-br from-purple-200 to-purple-300 rounded-xl opacity-35 animate-float-slow blur-sm"></div>
      <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-gradient-to-br from-pink-200 to-pink-300 rounded-full opacity-25 animate-float-reverse blur-sm"></div>

      {/* Background with parallax effect */}
      <picture className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20">
        <source srcSet="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80&fm=webp" type="image/webp" />
        <img 
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Hero background" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-75"
          style={{ transform: `translateY(${scrollY * 0.3}px) scale(1.05)` }}
          loading="lazy"
        />
      </picture>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-up">
          {/* Enhanced headline with gradient text */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight">
              <span className="block bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent animate-slide-in-left mb-2">
                Share. Rent.
              </span>
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-slide-in-right">
                <TypewriterText 
                  words={["Thrive.", "Explore.", "Connect."]} 
                  className="inline-block"
                />
              </span>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up font-light" style={{ animationDelay: '0.5s' }}>
              Discover amazing items from your neighbors or share your own treasures with the community
            </p>
          </div>

          {/* Enhanced search bar with glassmorphism */}
          <div className="max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
            <div className="glass-card-enhanced p-3 flex items-center space-x-3 hover:shadow-2xl hover:scale-105 transition-all duration-500 backdrop-blur-lg">
              <div className="flex-1 flex items-center space-x-4 px-6">
                <Search className="h-6 w-6 text-teal-500" />
                <input 
                  type="text" 
                  placeholder="What would you like to find today?"
                  className="flex-1 bg-transparent border-none outline-none text-gray-800 placeholder:text-gray-500 text-lg"
                />
              </div>
              <Button className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 px-8 py-4 text-lg font-semibold">
                Search
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Enhanced action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 px-10 py-5 text-lg font-semibold group"
            >
              <Search className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
              Start Exploring
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-teal-500 text-teal-600 hover:bg-teal-50 hover:border-teal-600 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 px-10 py-5 text-lg font-semibold backdrop-blur-sm bg-white/50"
            >
              List Your Item
            </Button>
          </div>

          {/* Enhanced stats with animated counters */}
          <div className="grid grid-cols-3 gap-8 pt-16 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '1.1s' }}>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                <AnimatedCounter target={25} suffix="K+" />
              </div>
              <div className="text-lg text-gray-600 font-medium mt-2">Items Available</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                <AnimatedCounter target={10} suffix="K+" />
              </div>
              <div className="text-lg text-gray-600 font-medium mt-2">Happy Users</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                <AnimatedCounter target={50} suffix="+" />
              </div>
              <div className="text-lg text-gray-600 font-medium mt-2">Cities</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-teal-400 rounded-full flex justify-center hover:border-teal-500 transition-colors duration-300 backdrop-blur-sm bg-white/30">
          <div className="w-1.5 h-4 bg-gradient-to-b from-teal-400 to-teal-600 rounded-full mt-3 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;