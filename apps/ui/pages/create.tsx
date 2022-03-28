import React, { MouseEvent, useState } from 'react'
import styled from 'styled-components'
import Checkbox from '../components/Checkbox';
import CreateProgressBar from '../components/CreateProgressBar';
import { BaseInput, BASE_BORDER_RADIUS, BASE_BOX_SHADOW, BG_NORMAL, INSET_BASE_BOX_SHADOW, PLAIN_WHITE } from '../themes';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProgressBarWrapper = styled.div`
  width: 90%;
  max-width:1200px;
  display: flex;
  justify-content: center;
  margin-block-end: 2rem;
`;

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledForm = styled.form`
  width: 90%;
  max-width: 1200px;
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${BASE_BOX_SHADOW};
  padding: 3rem;
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
  height: 600px;
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
  margin-block-end: 3rem;

  :hover {
    cursor: pointer;
  }

  :active {
    box-shadow: ${INSET_BASE_BOX_SHADOW};
  }

  :disabled {
    color: grey;

    :hover {
      cursor: default;
    }
  }
`;

const Create = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [agreed, setAgreed] = useState(false);
  const handleSubmitStep = (e: MouseEvent,step: number) => {
    setCurrentStep(currentStep + 1);
    e.preventDefault();
    if (step === 1) {
      console.log('Finished Step 1!');
    }
  };

  const handleTitle = (value: string) => {
    // TODO validation - does the title exist already from the same author?
    setTitle(value);
  };

  const handleText = (value: string) => {
    // TODO was this text already uploaded?
    setText(value);
  };

  const toggleAgreed = () => {
    setAgreed(!agreed);
  };

  return (
    <Root>
      <ProgressBarWrapper>
        <CreateProgressBar currentStep={currentStep}/>
      </ProgressBarWrapper>
      <FormWrapper>

      {/* @ts-ignore */}
        <StyledForm onSubmit={(e:MouseEvent) => handleSubmitStep(e, currentStep)}>
          <Title>
            <BlockSpan>Title</BlockSpan>
            <StyledInput value={title} onChange={(e) => handleTitle(e.target.value)} />
          </Title>
          <Text>
            <BlockSpan>Text</BlockSpan>
            <TextInput value={text} onChange={(e) => handleText(e.target.value)} />
          </Text>
          <Checkbox
            description={"I am aware that any form of plagiarism or hateful content can be banned from them Moonlit Foundation at any time. And other law content text."}
            onClick={toggleAgreed}
            />
          <SubmitButton type="submit" value="Continue" disabled={!agreed || (text.length < 1) || (title.length < 1)} />
        </StyledForm>
      </FormWrapper>
    </Root>
  );
}

export default Create