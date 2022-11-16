import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import InfoCard from './InfoCard';
import styled from 'styled-components';

const Root = styled.div``;

const SlidingCard = ({ delay }) => {
  const refCard = useRef(null);
  const isInView = useInView(refCard);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  return (
    <Root ref={refCard}>
      {isInView && shouldAnimate && (
        <motion.div
          initial={{ opacity: 0, x: 20, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: delay / 3 }}
          onAnimationComplete={() => setShouldAnimate(false)}
        >
          <InfoCard />
        </motion.div>
      )}
      {!shouldAnimate && <InfoCard />}
    </Root>
  );
};

export default SlidingCard;
