import React, { Suspense } from 'react';

const Header = React.lazy(() => import("@/components/Header"));
const Hero = React.lazy(() => import("@/components/Hero"));
const HowItWorks = React.lazy(() => import("@/components/HowItWorks"));
const Categories = React.lazy(() => import("@/components/Categories"));
const FeaturedOwners = React.lazy(() => import("@/components/FeaturedOwners"));
const Testimonials = React.lazy(() => import("@/components/Testimonials"));
const Footer = React.lazy(() => import("@/components/Footer"));

const Index = () => {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
        <Header />
        <Hero />
        <HowItWorks />
        <Categories />
        <FeaturedOwners />
        <Testimonials />
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
