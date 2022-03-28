import React, { MouseEvent, useState } from 'react'
import styled from 'styled-components'
import { create } from 'ipfs-http-client';
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
// @ts-ignore
  const client = create('https://ipfs.infura.io:5001/api/v0');
  const [currentStep, setCurrentStep] = useState(0);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [textIPFS, setTextIPFS] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [firstEdMintPrice, setFirstEdMintPrice] = useState('');
  const [firstEdMaxAmount, setFirstEdMaxAmount] = useState('');
  const [imageIPFS, setImageIPFS] = useState('');
  const handleSubmitStep = async(e: MouseEvent) => {
    e.preventDefault();

    if (currentStep === 0) {
      const added = await client.add(text);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      if (!added.path) return;
      setTextIPFS(url);
      console.log({url});
    }

    setCurrentStep(currentStep + 1);
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

  const handlePrice = (value: string) => {
    setFirstEdMintPrice(value);
  };

  const handleAmount = (value: string) => {
    setFirstEdMaxAmount(value);
  };

  const Part1Form = () => {
    return (
      <>
        <Title>
          <BlockSpan>Title</BlockSpan>
          <StyledInput
            value={title}
            onChange={(e) => handleTitle(e.target.value)}
          />
        </Title>
        <Text>
          <BlockSpan>Text</BlockSpan>
          <TextInput
            value={text}
            onChange={(e) => handleText(e.target.value)}
          />
        </Text>
        <Checkbox
          description={
            'I am aware that any form of plagiarism or hateful content can be banned from them Moonlit Foundation at any time. And other law content text.'
          }
          onClick={toggleAgreed}
        />
        <SubmitButton
          type="submit"
          value="Continue"
          disabled={!agreed || text.length < 1 || title.length < 1}
        />
      </>
    );
  };

  const Part2Form = () => {
    return (
      <>
        <StyledLabel>
          <BlockSpan>Price Per Funding Spot (MATIC)</BlockSpan>
          <StyledInput
            value={firstEdMintPrice}
            onChange={(e) => handlePrice(e.target.value)}
          />
        </StyledLabel>
        <StyledLabel>
          <BlockSpan>Max Funding Spot (MATIC)</BlockSpan>
          <StyledInput
            value={firstEdMaxAmount}
            onChange={(e) => handleAmount(e.target.value)}
          />
        </StyledLabel>
        <StyledLabel>
          <BlockSpan>Cover Image</BlockSpan>
          <StyledInput
            value={'BLA'}
            onChange={() => {console.log('BLA')}}
          />
        </StyledLabel>
      </>
    );
  };

  return (
    <Root>
      <ProgressBarWrapper>
        <CreateProgressBar currentStep={currentStep}/>
      </ProgressBarWrapper>
      <FormWrapper>

      {/* @ts-ignore */}
        <StyledForm onSubmit={(e:MouseEvent) => handleSubmitStep(e)}>
        {currentStep === 0 && Part1Form()}
        {currentStep === 1 && Part2Form()}
        </StyledForm>
      </FormWrapper>
    </Root>
  );
}

export default Create