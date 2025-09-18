import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Categories from "@/components/Categories";
import FeaturedOwners from "@/components/FeaturedOwners";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <HowItWorks />
      <Categories />
      <FeaturedOwners />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
