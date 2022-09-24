import React from 'react';
import styled from 'styled-components';
import { Node } from 'slate';
import ActionButton from '../ActionButton';
import { FadeIn, Wrapper } from '../../pages/create';
import { serialize } from '../../utils/serializeMarkdown';
import { StyledInputError } from '../InputField';
import RichText from './RichText';
import Title from '../Title';

const RichTextWrapper = styled.section`
  margin-block-end: 3rem;
`;

interface TextFormProps {
  onSubmit: () => void;
  onKeyDown: (val: Node[]) => void;
  text: Node[];
}

const TextForm = ({ onSubmit, onKeyDown, text }: TextFormProps) => {
  return (
    <FadeIn>
      <Wrapper>
        <Title size="m">Text</Title>
        <RichTextWrapper>
          <RichText onKeyDown={onKeyDown} />
        </RichTextWrapper>
        <StyledInputError>
          {text && serialize(text).trim().length < 1
            ? 'At least 1 character.'
            : ' '}
          {text?.length < 1 ? 'At least 1 character.' : ' '}
        </StyledInputError>
        <ActionButton
          onClick={onSubmit}
          disabled={text && serialize(text).trim().length < 1}
          loading={false}
          text="Continue"
          margin="1rem 0 0 0 "
        />
      </Wrapper>
    </FadeIn>
  );
};

export default TextForm;
