import React from 'react'
import {
  FadeIn,
  Wrapper,
  InputName,
  InputDescription,
  SubmitButton
} from '../../pages/create';

interface CongratsProps {
  onSubmit: () => void;
}

const Congrats = ({ onSubmit }: CongratsProps) => {
  return (
    <FadeIn>
    <Wrapper>
      <InputName>Congratulations!</InputName>
      <InputDescription>
        Now, your work exists on the blockchain!
      </InputDescription>
      <InputDescription style={{ textAlign: 'center', maxWidth: 500 }}>
        {`Now let's configure a few more things. It's optional, so you can skip them if you like.`}
      </InputDescription>
      <SubmitButton
        onClick={onSubmit}
      >
        {'Continue'}
      </SubmitButton>
    </Wrapper>
  </FadeIn>
  )
}

export default Congrats