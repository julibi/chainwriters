import React from 'react';
import { FadeIn, Wrapper, InputDescription } from '../../pages/create';
import ActionButton from '../ActionButton';
import ConfettiCanon from '../ConfettiCanon';
import Title from '../Title';

interface CongratsProps {
  onSubmit: () => void;
}

const Congrats = ({ onSubmit }: CongratsProps) => {
  return (
    <FadeIn>
      <Wrapper>
        <ConfettiCanon show />
        <Title size="m">Congratulations!</Title>
        <InputDescription>
          Now, your work exists on the blockchain!
        </InputDescription>
        <InputDescription style={{ textAlign: 'center', maxWidth: 500 }}>
          {`Let's configure a few more things. It's optional, so you can skip them if you like.`}
        </InputDescription>
        <ActionButton
          disabled={false}
          loading={false}
          onClick={onSubmit}
          text="Continue"
          margin="1rem 0 0 0"
        />
      </Wrapper>
    </FadeIn>
  );
};

export default Congrats;
