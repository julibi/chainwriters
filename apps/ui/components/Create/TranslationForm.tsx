import { FadeIn, Wrapper } from '../../pages/create';
import React from 'react';
import styled from 'styled-components';
import ActionButton from '../ActionButton';
import RichText from './RichText';

const Text = styled.p`
  display: inline-block;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FlexRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RichTextWrapper = styled.section`
  margin-block-start: 3rem;
`;

interface TranslationFormProps {
  onKeyDown: (val: string) => void;
  onNextStep: () => void;
  onSubmit: () => void;
  reset: () => void;
  pending: boolean;
  translation: string;
}

const TranslationForm = ({
  onKeyDown,
  onSubmit,
  onNextStep,
  reset,
  pending,
  translation,
}: TranslationFormProps) => {
  return (
    <FadeIn>
      <Wrapper>
        <FlexColumn>
          <Text>
            If available, provide an English translation for your original text.
          </Text>
          <RichTextWrapper>
            <RichText onKeyDown={(val) => onKeyDown(val)} />
          </RichTextWrapper>
          <FlexRow>
            <ActionButton
              onClick={() => {
                reset();
                onNextStep();
              }}
              text="Later"
              disabled={pending}
              loading={false}
              margin="3rem 1rem 0 0"
              color="#fff"
            />
            <ActionButton
              onClick={onSubmit}
              text="Use this translation"
              disabled={translation.trim().length < 1 || pending}
              loading={pending}
              margin="3rem 0 0 0"
            />
          </FlexRow>
        </FlexColumn>
      </Wrapper>
    </FadeIn>
  );
};

export default TranslationForm;
