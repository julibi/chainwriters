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
      <StickyBottom
        text={
          'Welcome! This page is WIP. Launch to Polygon Mainnet is planned for 1st August 2022!'
        }
      />
      <Footer />
    </div>
  );
};

export default Layout;
