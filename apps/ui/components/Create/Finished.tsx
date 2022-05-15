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
  daoAddress: string;
}

const Finished = ({ daoAddress }: FinishedProps) => {
  const router = useRouter();
  return (
    <FadeIn>
    <Wrapper>
      <InputName>DONE!</InputName>
      <InputDescription>
        {`You have completed configuring your Project's DAO Contract. Visit your newly created Project page.`}
      </InputDescription>
      <SubmitButton onClick={(e) => {
          e.preventDefault()
          router.push(`projects/${daoAddress}`)
        }}
      >
        SEE PROJECT
      </SubmitButton>
    </Wrapper>
  </FadeIn>
  )
}

export default Finished