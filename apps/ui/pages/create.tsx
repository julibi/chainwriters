import React, { MouseEvent, useState } from 'react'
import styled from 'styled-components'
import { BaseInput, BASE_BORDER_RADIUS, BASE_BOX_SHADOW, BG_NORMAL, INSET_BASE_BOX_SHADOW, PLAIN_WHITE } from '../themes';

const Root = styled.div`
  display: flex;
  justify-content: center;
  margin-block-start: 3rem;
`;

const StyledForm = styled.form`
  width: 90%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  font-family: 'Roboto Mono';
  margin-block-end: 2rem;
`;

const Title = styled(StyledLabel)`
  width: 50%;
  max-width: 400px;
`;

const Text = styled(StyledLabel)`
  width: 100%;
`;

const BlockSpan = styled.span`
  display: inline-block;
  margin-block-end: 1rem;
`;

const StyledInput = styled(BaseInput)`
  display: inline-block;
`;

const TextInput = styled.textarea`
  height: 800px;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 14px;
  line-height: 170%;
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${INSET_BASE_BOX_SHADOW};
  padding: 1rem;
  color: ${PLAIN_WHITE};
  background-color: ${BG_NORMAL};
  outline: none;
`;

const SubmitButton = styled.input`
  background-color: ${BG_NORMAL};
  color: ${PLAIN_WHITE};
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${BASE_BOX_SHADOW};
  padding: 1rem;

  :hover {
    cursor: pointer;
  }

  :active {
    box-shadow: ${INSET_BASE_BOX_SHADOW};
  }
`;

const Create = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const handleSubmitStep = (e: MouseEvent,step: number) => {
    e.preventDefault();
    if (step === 1) {
      console.log('Finished Step 1!');
    }
  };

  const handleTitle = (value: string) => {
    setTitle(value);
  };

  const handleText = (value: string) => {
    setText(value);
  };

  return (
    <Root>
      {/* @ts-ignore */}
      <StyledForm onSubmit={(e:MouseEvent) => handleSubmitStep(e, 1)}>
        <Title>
          <BlockSpan>Title</BlockSpan>
          <StyledInput value={title} onChange={(e) => handleTitle(e.target.value)} />
        </Title>
        <Text>
          <BlockSpan>Text</BlockSpan>
          <TextInput value={text} onChange={(e) => handleText(e.target.value)} />
        </Text>
        <SubmitButton type="submit" value="Submit" />
      </StyledForm>
    </Root>
  );
}

export default Create