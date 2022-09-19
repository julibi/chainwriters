import React, { ChangeEvent } from 'react';
import {
  FlexContainer,
  FadeIn,
  Wrapper,
  InputName,
  InputDescription,
} from '../../pages/create';
import ActionButton from '../ActionButton';
import InputField from '../InputField';

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
        <InputName>SUBTITLE</InputName>
        <InputDescription>Does your text have a subtitle?</InputDescription>
        <InputField
          error={subtitle.length < 3 && 'At least 3 characters.'}
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
