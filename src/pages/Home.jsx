import React from "react";
import Layout from "../components/Layout";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* Hero Section - matching Browse page style */}
      <section className="relative pt-8 pb-12 md:pt-16 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-background" />
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-hero text-4xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">Welcome to</span>{' '}
              <span className="text-foreground">RentiGoo</span>
            </h1>
            <p className="text-body-large text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Your trusted marketplace for sharing and renting items. Discover amazing products from your community or list your own items to start earning.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Button 
                size="lg"
                onClick={() => navigate('/browse')}
                className="bg-gradient-to-r from-primary to-primary-hover hover:shadow-glow transition-all duration-300"
              >
                Start Browsing
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/create-listing')}
                className="border-primary/20 hover:border-primary/40"
              >
                List Your Items
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
