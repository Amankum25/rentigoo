import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email.trim()) {
      toast.error("Please enter your email address");
      return;
    }
    
    if (!formData.password.trim()) {
      toast.error("Please enter your password");
      return;
    }
    
    if (!isLogin && !formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    try {
      // Simple mock authentication
      const userData = {
        id: Date.now(),
        name: isLogin ? 'John Doe' : formData.name,
        email: formData.email,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=60'
      };
      
      login(userData);
      onClose();
      
      // Reset form
      setFormData({
        email: '',
        password: '',
        name: ''
      });

      // Redirect to Dashboard
      toast.success("Welcome to RentiGoo!");
      navigate('/dashboard');
      
    } catch (error) {
      toast.error("Authentication failed. Please try again.");
      console.error("Login error:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div 
        className="glass-card rounded-2xl shadow-2xl max-w-md w-full mx-4 border border-primary/20 transform transition-all duration-300 scale-100"
        style={{
          animation: isOpen ? 'modalSlideIn 0.3s ease-out' : ''
        }}
      >
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-hover rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">
                {isLogin ? '👋' : '🚀'}
              </span>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
              {isLogin ? 'Welcome Back!' : 'Join RentiGoo'}
            </h2>
            <p className="text-muted-foreground mt-2">
              {isLogin ? 'Sign in to continue your journey' : 'Create your account to get started'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="transform transition-all duration-300">
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-xl glass-card focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-border rounded-xl glass-card focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-border rounded-xl glass-card focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-primary-hover text-white py-3 px-6 rounded-xl font-semibold text-lg hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {isLogin ? '🔓 Sign In' : '✨ Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:text-primary-hover text-sm font-medium transition-colors duration-200"
            >
              {isLogin ? "Don't have an account? Sign up here" : "Already have an account? Sign in"}
            </button>
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-muted hover:bg-muted/70 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-200"
          >
            ✕
          </button>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default LoginModal;