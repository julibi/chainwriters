import React, { ReactChild } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import Marquee from 'react-fast-marquee';

interface LayoutProps {
  children: ReactChild;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Navbar />
      <Marquee gradient={false} speed={70}>
        Start a vote regarding your project now! Go to your project's page and
        scroll down to the Voting section.
      </Marquee>
      {children}

      <Footer />
    </div>
  );
};

export default Layout;
