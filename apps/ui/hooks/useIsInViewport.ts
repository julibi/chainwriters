import { useState, useEffect } from 'react';

const useIsInViewport = (ref) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      // Update our state when observer callback fires
      console.log({ entry });

      setIsIntersecting(entry.isIntersecting);
    });
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      observer.unobserve(currentRef);
    };
  }, [ref]);

  return isIntersecting;
};

export default useIsInViewport;
