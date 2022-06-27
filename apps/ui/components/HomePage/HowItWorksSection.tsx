import React, { useState } from 'react';
import styled from 'styled-components';
import {
  BaseButton,
  BASE_BORDER_RADIUS,
  BASE_BOX_SHADOW,
  FadeInBaseAnimation,
  INSET_BASE_BOX_SHADOW,
  PINK,
  PLAIN_WHITE,
  ROBOTO_FONT_BOLD,
} from '../../themes';

import { SectionTitle, SectionTitleWrapper } from './ProjectSection';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 6rem 6rem 6rem;
  @media (max-width: 900px) {
    margin: 2rem;
  }
`;

const Content = styled.div`
  margin-block-start: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${INSET_BASE_BOX_SHADOW};
  padding: 2rem 2rem 0 2rem;
`;

const NavButton = styled(BaseButton)`
  max-width: 200px;
  font-size: 24px;
  margin-block-end: 3rem;
`;

const Authors = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;

const Instruction = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-block-end: 2rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
`;

interface InstructionStepProps {
  active: boolean;
}

const InstructionStep = styled(BaseButton)<InstructionStepProps>`
  height: 60px;
  width: 60px;
  border-radius: 50%;
  box-shadow: ${({ active }) =>
    active ? INSET_BASE_BOX_SHADOW : BASE_BOX_SHADOW};
`;

const InstructionHeader = styled.h5`
  display: inline-block;
  color: ${PINK};
  font-family: ${ROBOTO_FONT_BOLD};
  font-size: 18px;
  margin: 1rem;
`;

const InstructionDescription = styled.span`
  display: inline-block;
  margin: 0 1rem 1rem calc(60px + 1rem);
  color: ${PLAIN_WHITE};
  ${FadeInBaseAnimation};
`;

const VideoWrapper = styled.div`
  width: 500px;
`;

interface InstructionCompProps {
  index: number;
  onClick: (number) => void;
  currentStep: number;
  title: string;
  description: string;
}

const InstructionComp = ({
  currentStep,
  index,
  onClick,
  title,
  description,
}: InstructionCompProps) => {
  return (
    <Instruction>
      <Header>
        <InstructionStep
          active={currentStep === index}
          disabled={currentStep === index}
          onClick={() => onClick(index)}
        >
          1
        </InstructionStep>
        <InstructionHeader>{title}</InstructionHeader>
      </Header>
      {currentStep === index && (
        <InstructionDescription>{description}</InstructionDescription>
      )}
    </Instruction>
  );
};

const HowItWorksSection = () => {
  const [authorInstructionsStep, setAuthorInstructionsStep] = useState<
    1 | 2 | 3 | 4 | 5 | 6
  >(1);
  return (
    <Root>
      <SectionTitleWrapper>
        <SectionTitle>How does it work?</SectionTitle>
      </SectionTitleWrapper>
      <Content>
        <NavButton>Authors</NavButton>
        <Wrapper>
          <Authors>
            <InstructionComp
              index={1}
              currentStep={authorInstructionsStep}
              onClick={() => setAuthorInstructionsStep(1)}
              title="Connect your wallet"
              description="blblblblaab lf b rebl rebsjfes ablabaabl aaa"
            />
            <InstructionComp
              index={2}
              currentStep={authorInstructionsStep}
              onClick={() => setAuthorInstructionsStep(2)}
              title="Create Your Project"
              description="blblblCreate Your Projectblaab lf b rebl rebsjfes ablabaabl aaa"
            />
          </Authors>
          <VideoWrapper></VideoWrapper>
        </Wrapper>
      </Content>
    </Root>
  );
};

export default HowItWorksSection;
