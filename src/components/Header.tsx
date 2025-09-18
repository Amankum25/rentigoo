import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, Search, User, X } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-0 border-b border-border/50">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-hover rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="text-xl font-bold text-foreground">RentiGoo</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-foreground hover:text-primary transition-colors duration-200">
              Home
            </a>
            <a href="/browse" className="text-foreground hover:text-primary transition-colors duration-200">
              Browse
            </a>
            <a href="/rent-your-item" className="text-foreground hover:text-primary transition-colors duration-200">
              Rent Your Item
            </a>
            <a href="/how-it-works" className="text-foreground hover:text-primary transition-colors duration-200">
              How it Works
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="outline" className="text-muted-foreground hover:text-foreground">
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-primary to-primary-hover hover:shadow-glow transition-all duration-300">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 py-4 space-y-4">
            <nav className="space-y-2">
              <a href="/" className="block px-4 py-2 text-foreground hover:text-primary transition-colors">
                Home
              </a>
              <a href="/browse" className="block px-4 py-2 text-foreground hover:text-primary transition-colors">
                Browse
              </a>
              <a href="/rent-your-item" className="block px-4 py-2 text-foreground hover:text-primary transition-colors">
                Rent Your Item
              </a>
              <a href="/how-it-works" className="block px-4 py-2 text-foreground hover:text-primary transition-colors">
                How it Works
              </a>
            </nav>
            <div className="flex flex-col space-y-2 px-4">
              <Button variant="outline" className="justify-center">
                Sign In
              </Button>
              <Button className="justify-center bg-gradient-to-r from-primary to-primary-hover">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;