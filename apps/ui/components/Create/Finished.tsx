import React from 'react';
import { useRouter } from 'next/router';
import { FadeIn, Wrapper, InputDescription } from '../../pages/create';
import ActionButton from '../ActionButton';
import Title from '../Title';

interface FinishedProps {
  projectId: string;
}

const Finished = ({ projectId }: FinishedProps) => {
  const router = useRouter();
  return (
    <FadeIn>
      <Wrapper>
        <Title size="m">Done</Title>
        <InputDescription>
          {`You have completed configuring your Project. Visit the newly created Project page.`}
        </InputDescription>
        <ActionButton
          onClick={(e) => {
            e.preventDefault();
            router.push(`projects/${projectId}`);
          }}
          disabled={false}
          loading={false}
          margin="1rem 0 0 0"
          text="See Project"
        />
      </Wrapper>
    </FadeIn>
  );
};

export default Finished;
