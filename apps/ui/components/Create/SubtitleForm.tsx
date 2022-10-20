import React, { ChangeEvent } from 'react';
import { FlexContainer, FadeIn, Wrapper } from '../../pages/create';
import ActionButton from '../ActionButton';
import InputField from '../InputField';
import Title from '../Title';

interface SubtitleFormProps {
  subtitle: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onNextStep: () => void;
  reset: () => void;
}

const SubtitleForm = ({
  onChange,
  onNextStep,
  subtitle,
  reset,
}: SubtitleFormProps) => {
  return (
    <FadeIn>
      <Wrapper>
        <Title size="m">Subtitle</Title>
        <InputField
          error={subtitle.length < 1 && 'At least 1 character.'}
          // @ts-ignore
          onChange={onChange}
          value={subtitle}
        />
        <FlexContainer>
          <ActionButton
            color="#fff"
            onClick={() => {
              reset();
              onNextStep();
            }}
            disabled={false}
            loading={false}
            margin="0 1rem 0 0"
            text="Skip"
          />
          <ActionButton
            onClick={onNextStep}
            disabled={subtitle.length < 1}
            loading={false}
            margin="0 1rem 0 0"
            text="Set Subtitle"
          />
        </FlexContainer>
      </Wrapper>
    </FadeIn>
  );
};

export default SubtitleForm;
