import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Layout = ({ children }) => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-16 min-h-screen">
      {/* pt-16 accounts for fixed header height (64px) */}
      {children}
    </main>
    <Footer />
  </div>
);

export default Layout;
