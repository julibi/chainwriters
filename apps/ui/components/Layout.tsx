import React, { ReactChild } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import StickyBottom from './StickyBottom';

interface LayoutProps {
  children: ReactChild;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
