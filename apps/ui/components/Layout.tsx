import React, { ReactChild } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactChild;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Navbar />
      {/* <StyledMarquee gradient={false}>
        Call for Writers - Be one of the first 100 creators on Moonpage! This
        will get you a post on our Twitter and Instagram channels with a snippet
        from your project and you will be able to claim an exclusive Early
        Creator Badge soon.
      </StyledMarquee> */}
      {children}

      <Footer />
    </div>
  );
};

export default Layout;
