import React, { useState } from "react";
import Layout from "../components/Layout";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

const borrowerSteps = [
  { step: 1, title: "Sign Up", description: "Create an account to get started." },
  { step: 2, title: "Browse Listings", description: "Find the perfect space that meets your needs." },
  { step: 3, title: "Book a Space", description: "Reserve the space with a single click." },
  { step: 4, title: "Enjoy the Experience", description: "Make the most of your journey." }
];

const listerSteps = [
  { step: 1, title: "Create Listing", description: "Provide details about your space." },
  { step: 2, title: "Publish Listing", description: "Make your space visible to potential borrowers." },
  { step: 3, title: "Manage Bookings", description: "Review and accept booking requests." },
  { step: 4, title: "Earn Income", description: "Generate income from your space." }
];

const HowItWorks = () => {
  const [mode, setMode] = useState("borrower");
  const navigate = useNavigate();

  const steps = mode === "borrower" ? borrowerSteps : listerSteps;
  const handleCTAClick = () => {
    if (mode === "borrower") {
      navigate("/browse");
    } else {
      navigate("/create-listing");
    }
  };

  return (
    <Layout>
      {/* Hero Section - matching Browse page style */}
      <section className="relative pt-8 pb-12 md:pt-16 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-background" />
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-hero text-4xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">How It</span>{' '}
              <span className="text-foreground">Works</span>
            </h1>
            <p className="text-body-large text-muted-foreground leading-relaxed">
              Discover how you can make the most out of our platform.
            </p>
            
            {/* Mode Toggle */}
            <div className="flex justify-center space-x-4 pt-4">
              <button
                onClick={() => setMode("borrower")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${mode === "borrower" ? 'bg-gradient-to-r from-primary to-primary-hover text-white shadow-lg' : 'glass-card border border-primary/20 text-foreground hover:border-primary/40'}`}
              >
                For Borrowers
              </button>
              <button
                onClick={() => setMode("lister")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${mode === "lister" ? 'bg-gradient-to-r from-primary to-primary-hover text-white shadow-lg' : 'glass-card border border-primary/20 text-foreground hover:border-primary/40'}`}
              >
                For Listers
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="relative pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {steps.map((item, index) => (
                <div key={index} className="glass-card rounded-2xl border border-primary/10 p-8 hover:shadow-lg transition-all duration-300 group">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-hover rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 group-hover:scale-110 transition-transform duration-300">
                    {item.step}
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">{item.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative pb-24">
        <div className="container mx-auto px-4 text-center">
          <Button
            onClick={handleCTAClick}
            size="lg"
            className="bg-gradient-to-r from-primary to-primary-hover hover:shadow-glow transition-all duration-300"
          >
            {mode === "borrower" ? "Get Started as a Borrower" : "Start Listing Your Space"}
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default HowItWorks;
