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
        The Dao smart contract for your project was created!
      </InputDescription>
      <InputDescription style={{ textAlign: 'center', maxWidth: 500 }}>
        {`We will guide you to the page, where you can see a dashboard of your project, in a minute. But first let's configure some more things. All of them are OPTIONAL, so you can skip them if you like.`}
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