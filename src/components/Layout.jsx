import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Layout = ({ children }) => (
  <>
    <Header />
    <main className="pt-16">{/* Adjust for fixed header height */}
      {children}
    </main>
    <Footer />
  </>
);

export default Layout;
