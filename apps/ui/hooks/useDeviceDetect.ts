import { useEffect, useState } from "react";

export const useDeviceDetect = () => {
  const [width, setWidth] = useState<number>();
  const handleWindowSizeChange = () => {
      setWidth(window.innerWidth);
  }
  
  useEffect(() => {
      setWidth(window.innerWidth);
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);

  const isMobile = width <= 768;
  return isMobile;
}

