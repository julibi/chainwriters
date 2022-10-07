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
      <StickyBottom text="Currently only addresses on the allowlist can create projects. Join us on telegram to get on it!" />
      <Footer />
    </div>
  );
};

export default Layout;
