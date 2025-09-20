import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, Search, User, X, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";
import LoginModal from "./LoginModal";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  const handleAvatarClick = () => {
    navigate('/dashboard');
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass-card border-0 border-b border-border/50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-hover rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm poppins-bold">R</span>
              </div>
              <span className="text-xl poppins-bold text-foreground tracking-tight">RentiGoo</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="poppins-medium text-foreground hover:text-primary transition-colors duration-200">Home</Link>
              <Link to="/browse" className="poppins-medium text-foreground hover:text-primary transition-colors duration-200">Browse</Link>
              <Link to="/create-listing" className="poppins-medium text-foreground hover:text-primary transition-colors duration-200">Create Listing</Link>
              <Link to="/booking" className="poppins-medium text-foreground hover:text-primary transition-colors duration-200">Booking</Link>
              <Link to="/membership" className="poppins-medium text-foreground hover:text-primary transition-colors duration-200">Membership</Link>
              <Link to="/how-it-works" className="poppins-medium text-foreground hover:text-primary transition-colors duration-200">How It Works</Link>
              <Link to="/support" className="poppins-medium text-foreground hover:text-primary transition-colors duration-200">Support</Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Search className="h-5 w-5" />
              </Button>
              
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={handleAvatarClick}>
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
                  <Button variant="ghost" onClick={handleLogout} className="text-muted-foreground hover:text-foreground">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsLoginModalOpen(true)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Sign In
                  </Button>
                  <Button 
                    onClick={() => setIsLoginModalOpen(true)}
                    className="bg-gradient-to-r from-primary to-primary-hover hover:shadow-glow transition-all duration-300"
                  >
                    Get Started
                  </Button>
                </>
              )}
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
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Mobile Menu */}
          <div className="fixed top-16 left-0 right-0 z-50 md:hidden glass-card border-t border-border/50">
            <div className="container mx-auto px-4 py-6 space-y-4">
              <nav className="space-y-2">
                <Link 
                  to="/" 
                  className="block px-4 py-3 text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/browse" 
                  className="block px-4 py-3 text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Browse
                </Link>
                <Link 
                  to="/create-listing" 
                  className="block px-4 py-3 text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Create Listing
                </Link>
                <Link 
                  to="/booking" 
                  className="block px-4 py-3 text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Booking
                </Link>
                <Link 
                  to="/membership" 
                  className="block px-4 py-3 text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Membership
                </Link>
                <Link 
                  to="/how-it-works" 
                  className="block px-4 py-3 text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  How It Works
                </Link>
                <Link 
                  to="/support" 
                  className="block px-4 py-3 text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Support
                </Link>
              </nav>
              <div className="flex flex-col space-y-3 px-4 pt-4 border-t border-border/50">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={handleAvatarClick}>
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm font-medium">{user.name}</span>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={handleLogout}
                      className="justify-center w-full"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsLoginModalOpen(true)}
                      className="justify-center"
                    >
                      Sign In
                    </Button>
                    <Button 
                      onClick={() => setIsLoginModalOpen(true)}
                      className="justify-center bg-gradient-to-r from-primary to-primary-hover"
                    >
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  );
};

export default Header;