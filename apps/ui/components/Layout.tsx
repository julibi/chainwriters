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
        Go to the "Experimental" tab and create the first AI infused text NFTs
        with ChatGPT. Tell the AI what kind of text you want and it creates a
        draft for you to use.
      </Marquee>
      {children}

      <Footer />
    </div>
  );
};

export default Layout;
