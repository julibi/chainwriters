import React, { MouseEvent, useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { create } from 'ipfs-http-client'
import { toast } from 'react-toastify'
import { parseEther } from 'ethers/lib/utils'
import { useWeb3React } from '@web3-react/core';
import Checkbox from '../components/Checkbox'
import CreateProgressBar from '../components/CreateProgressBar'
import useFactoryContract from '../hooks/useFactoryContract'
import { BaseInput, BASE_BORDER_RADIUS, BASE_BOX_SHADOW, BG_NORMAL, INSET_BASE_BOX_SHADOW, PINK, PLAIN_WHITE } from '../themes'
import ToastLink from '../components/ToastLink'
import Loading from '../components/Loading'

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
  width: 90%;
  max-width: 1200px;
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

const ShortInput = styled(StyledLabel)`
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

// interface StyledInputProps {
//   placeholder?: string | number;
//   value: string | number;
//   onChange: (e) => void;
// } 

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
  font-family: 'Roboto Mono';
  text-transform: uppercase;
  color: ${PLAIN_WHITE};
  background-color: ${BG_NORMAL};
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

const FadeIn = styled.div`
  width: 100%;
  animation: fadein 2s;

  @keyframes fadein {
      from { opacity: 0; }
      to   { opacity: 1; }
  }
`;

const ReviewItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  font-family: 'Roboto Mono';
  margin-block-end: 2rem;
`;

const ReviewItem = styled.p`
  display: inline-block;
  font-style: italic;
  color: ${PINK};
`;

const Create = () => {
  const { chainId } = useWeb3React();
  const FactoryContract = useFactoryContract();
// @ts-ignore
  const client = create('https://ipfs.infura.io:5001/api/v0');
  const [currentStep, setCurrentStep] = useState(0);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  // need it for state? We are returning the hash after upload...
  const [textIPFS, setTextIPFS] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [firstEdMintPrice, setFirstEdMintPrice] = useState('0');
  const [firstEdMaxAmount, setFirstEdMaxAmount] = useState(0);
  const [imageIPFS, setImageIPFS] = useState('');
  const [loading, setLoading] = useState(false); 
  const [genre, setGenre] = useState(''); 

  const uploadText = useCallback(async() => {
    try {
      const added = await client.add(text);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;    
      setTextIPFS(url);
      console.log({url});
      return added.path;
    } catch (e) {
      console.log({e});
      toast.error('Something went wrong while uploading your text to ipfs.');
    }
  }, [client, text]);

  const createDao = async() => {
    setLoading(true);
    const ipfsHash = await uploadText();
    const mintPrice = parseEther(firstEdMintPrice);

    try {
      const Tx = await FactoryContract.createDao(title, ipfsHash, mintPrice, firstEdMaxAmount);
      const { hash } = Tx;
      toast.info(
        <ToastLink
          hash={hash}
          chainId={chainId}
          message={'Pending transaction...'}
        />
      );
      FactoryContract.provider.once(hash, (transaction) => {
        const newDaoAddress = transaction.logs[0].address;
        toast.success(
          <ToastLink
            hash={hash}
            chainId={chainId}
            message={'Success!'}
          />
        );
        setLoading(false);
        setCurrentStep(currentStep + 1);
      });
    } catch(e) {
      setLoading(false);
      console.log({e});
      toast.error(e.reason ?? 'Something went wrong.');
    }

  };

  const handleSubmitStep = async(e: MouseEvent) => {
    e.preventDefault();

    if (currentStep === 1) {
      await createDao();
      return;
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
    setFirstEdMaxAmount(Number(value));
  };

  const handleGenre = (value: string) => {
    setGenre(value);
  };

  const isButtonDisabled = useMemo(() => {
    if (currentStep === 0) {
      if (text.length < 1 || title.length < 1 || firstEdMaxAmount < 2 || Number(firstEdMintPrice) < 0.01) {
        return true;
      } else {
        return false;
      }
    }
    if (currentStep === 1) {
      if (!agreed) {
        return true;
      } else {
        return false;
      }
    }
  }, [
    currentStep,
    agreed,
    text,
    title,
    firstEdMaxAmount,
    firstEdMintPrice
  ]);

  const Part1Form = () => {
    return (
      <FadeIn>
        <ShortInput>
          <BlockSpan>Title</BlockSpan>
          <StyledInput
            value={title}
            onChange={(e) => handleTitle(e.target.value)}
          />
        </ShortInput>
        <Text>
          <BlockSpan>Text</BlockSpan>
          <TextInput
            value={text}
            onChange={(e) => handleText(e.target.value)}
          />
        </Text>
        <ShortInput>
          <BlockSpan>Price Per Funding Spot (MATIC)</BlockSpan>
          {/* TODO validation so that it is 0.1 and not 0,1 */}
          <StyledInput
            value={firstEdMintPrice}
            onChange={(e) => handlePrice(e.target.value)}
            placeholder={'50'}
          />
        </ShortInput>
        <ShortInput>
          <BlockSpan>Max Funding Spot (MATIC)</BlockSpan>
          <StyledInput
            value={firstEdMaxAmount}
            onChange={(e) => handleAmount(e.target.value)}
            placeholder={'2000'}
          />
        </ShortInput>
        <SubmitButton
          type="submit"
          value="Continue"
          disabled={isButtonDisabled}
        />
      </FadeIn>
    );
  };

  const Part2Form = () => {
    return (
      <FadeIn>
        {!loading && 
          <>
            <ReviewItemWrapper>
              <BlockSpan>Title</BlockSpan>
              <ReviewItem>{title}</ReviewItem>
            </ReviewItemWrapper>
            <ReviewItemWrapper>
              <BlockSpan>Text</BlockSpan>
              <ReviewItem>{text}</ReviewItem>
            </ReviewItemWrapper>
            <ReviewItemWrapper>
              <BlockSpan>Price Per Funding Spot (MATIC)</BlockSpan>
              <ReviewItem>{firstEdMaxAmount}</ReviewItem>
            </ReviewItemWrapper>
            <ReviewItemWrapper>
              <BlockSpan>Max Funding Spot (MATIC)</BlockSpan>
              <ReviewItem>{firstEdMintPrice}</ReviewItem>
            </ReviewItemWrapper>
            <Checkbox
              description={
                'I am aware that any form of plagiarism or hateful content can be banned from them Moonlit Foundation at any time. And other law content text.'
              }
              onClick={toggleAgreed}
            />
            <SubmitButton
              style={{'marginBlockEnd': '0' }}
              type="submit"
              value="Create Project"
              disabled={isButtonDisabled}
            />
          </>
        }
        {loading &&
          <div>
            <Loading height={500} />
            <ReviewItem>{`We're creating the Smart Contract for you. This take a minute. Be patient and don't refresh the page plz`}</ReviewItem>
          </div>
        }
      </FadeIn>
    );
  };

  const Part3Form = () => {
    return (
      <FadeIn>
        <ShortInput>
          <BlockSpan>Genre</BlockSpan>
          <StyledInput
            value={genre}
            onChange={(e) => handleGenre(e.target.value)}
          />
        </ShortInput>
        {/* TODO: you basically have lots of submit buttons here... */}
        <SubmitButton
          type="submit"
          value="Continue"
          disabled={isButtonDisabled}
        />
      </FadeIn>
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
          {currentStep === 2 && Part3Form()}
        </StyledForm>
      </FormWrapper>
    </Root>
  );
}

export default Create