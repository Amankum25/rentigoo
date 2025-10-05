import React, { Suspense } from 'react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import LightParticles from '@/components/LightParticles';
import Layout from '@/components/Layout';

// Pre-load critical components for faster rendering
const Hero = React.lazy(() => import("@/components/Hero"));
const HowItWorks = React.lazy(() => import("@/components/HowItWorks"));
const Categories = React.lazy(() => import("@/components/Categories"));
const FeaturedOwners = React.lazy(() => import("@/components/FeaturedOwners"));
const Testimonials = React.lazy(() => import("@/components/Testimonials"));

const AnimatedSection = ({ children, className = "", delay = 0 }) => {
  const [ref, isVisible] = useScrollAnimation(0.1);
  
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-16'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Index = () => {
  return (
    <Layout>
      <div className="relative">
        {/* Light particles background - CSS-based for better performance */}
        <LightParticles count={10} />
        
        <Suspense fallback={
          <div className="min-h-screen">
            <div className="h-16"></div>
          </div>
        }>
          <AnimatedSection>
            <Hero />
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <HowItWorks />
          </AnimatedSection>
          <AnimatedSection delay={400}>
            <Categories />
          </AnimatedSection>
          <AnimatedSection delay={600}>
            <FeaturedOwners />
          </AnimatedSection>
          <AnimatedSection delay={800}>
            <Testimonials />
          </AnimatedSection>
        </Suspense>
      </div>
    </Layout>
  );
};

export default Index;
