import React from 'react'
import { useRouter } from 'next/router'
import {
  FadeIn,
  Wrapper,
  InputName,
  InputDescription,
  SubmitButton,
} from '../../pages/create';

interface FinishedProps {
  projectId: string;
}

const Finished = ({ projectId }: FinishedProps) => {
  const router = useRouter();
  return (
    <FadeIn>
    <Wrapper>
      <InputName>DONE!</InputName>
      <InputDescription>
        {`You have completed configuring your Project. Visit the newly created Project page.`}
      </InputDescription>
      <SubmitButton onClick={(e) => {
          e.preventDefault()
          router.push(`projects/${projectId}`)
        }}
      >
        SEE PROJECT
      </SubmitButton>
    </Wrapper>
  </FadeIn>
  )
}

export default Finished