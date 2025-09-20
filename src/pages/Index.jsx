import React, { Suspense } from 'react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import FloatingParticles from '@/components/FloatingParticles';
import Layout from '@/components/Layout';

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
        {/* Floating particles background */}
        <FloatingParticles count={30} />
        
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-pulse text-lg">Loading amazing experiences...</div>
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
