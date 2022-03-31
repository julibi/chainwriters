import React, { MouseEvent, useCallback, useMemo, useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { create } from 'ipfs-http-client'
import { toast } from 'react-toastify'
import { parseEther } from 'ethers/lib/utils'
import { useWeb3React } from '@web3-react/core';
import Checkbox from '../components/Checkbox'
import CreateProgressBar from '../components/CreateProgressBar'
import useFactoryContract from '../hooks/useFactoryContract'
import {
  BaseButton,
  BaseInput,
  BASE_BORDER_RADIUS,
  BASE_BOX_SHADOW,
  BG_NORMAL,
  INSET_BASE_BOX_SHADOW,
  PINK,
  PLAIN_WHITE,
  StyledLink,
} from '../themes';
import ToastLink from '../components/ToastLink'
import Loading from '../components/Loading'
import useDaoContract from '../state/useDaoContract'
import useCreateSetGenre from '../state/projects/create/hooks'
import SuccessToast from '../components/SuccessToast'
import PendingToast from '../components/PendingToast'

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

const Form = styled.div`
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
  margin-block-end: 1rem;
`;

const TextInput = styled.textarea`
  height: 600px;
  width: 100%;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 14px;
  line-height: 170%;
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${INSET_BASE_BOX_SHADOW};
  margin-block-end: 2rem;
  padding: 1rem;
  color: ${PLAIN_WHITE};
  background-color: ${BG_NORMAL};
  outline: none;
`;

const SubmitButton = styled.input`
  font-family: 'Roboto Mono';
  text-transform: uppercase;
  text-align: center;
  color: ${PLAIN_WHITE};
  background-color: ${BG_NORMAL};
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${BASE_BOX_SHADOW};
  padding: 1rem;

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

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;
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

const Content = styled.div`
  display: flex;

  @media (max-width: 900px) {
    flex-direciont: column;
  }
`;

const DaoCard = styled.div`
  flex: 1;
  margin-inline-end: 3rem;
`;

const AdditionalInputs = styled.div`
  flex: 1;
`;


const Info = styled.p`
  text-transform: none;
`;

const AdditionalInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AdditionalInput = styled(StyledInput)`
  flex: 3;
  margin-inline-end: 1rem;
`;

const AdditionalInputSubmit = styled(BaseButton)`
  flex: 1;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 300px;
`;

const InputName = styled.h2`
  text-align: center;
  text-transform: uppercase;
  font-family: 'Roboto Mono Bold';
  border-radius: ${BASE_BORDER_RADIUS};

  padding: 1rem;
  display: inline-block;
  margin-block-end: 1rem;
`;

const InputDescription = styled.p`
  margin-block-end: 2rem;
  display: inline-block;
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
  const [daoAddress, setDaoAddress] = useState<string>('');
  const [creatingDao, setCreatingDao] = useState<boolean>(false);

  const [contributor1, setContributor1] = useState<string>('');
  const [contributor2, setContributor2] = useState<string>('');
  const [contributor3, setContributor3] = useState<string>('');
  const [subtitle, setSubtitle] = useState<string>('');
  const [authorMaxClaimable, setAuthorMaxClaimable] = useState<number>(0);
  const getDaoContract = useDaoContract();
  const createSetGenre = useCreateSetGenre();
  const uploadText = useCallback(async () => {
    try {
      const added = await client.add(text);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setTextIPFS(url);
      console.log({ url });
      return added.path;
    } catch (e) {
      console.log({ e });
      toast.error('Something went wrong while uploading your text to ipfs.');
    }
  }, [client, text]);

  const createDao = async () => {
    setCreatingDao(true);
    const ipfsHash = await uploadText();
    const mintPrice = parseEther(firstEdMintPrice);

    try {
      const Tx = await FactoryContract.createDao(
        title,
        ipfsHash,
        mintPrice,
        firstEdMaxAmount
      );
      const { hash } = Tx;
      PendingToast(chainId, hash);
      FactoryContract.provider.once(hash, (transaction) => {
        const newDaoAddress = transaction.logs[0].address;
        setDaoAddress(newDaoAddress);
        SuccessToast(chainId, hash);
        setCreatingDao(false);
        setCurrentStep(currentStep + 1);
      });
    } catch (e) {
      setCreatingDao(false);
      console.log({ e });
      toast.error(e.reason ?? 'Something went wrong.');
    }
  };

  const handleGenre = (value: string) => {
    setGenre(value);
  };

  const handleContributor1 = (value: string) => {
    setContributor1(value);
  };

  const handleContributor2 = (value: string) => {
    setContributor2(value);
  };

  const handleContributor3 = (value: string) => {
    setContributor3(value);
  };

  const handleSubtitle = (value: string) => {
    setSubtitle(value);
  };

  const handleAuthorMaxClaimable = (value: string) => {
    setAuthorMaxClaimable(Number(value));
  };

  const NameForm = () => (
    <FadeIn>
      <Wrapper>
        <InputName>TITLE</InputName>
        <InputDescription>What is the title of your project?</InputDescription>
        <StyledInput
          value={title}
          onChange={(e) =>
            // TODO validation - does the title exist already from the same author?
            setTitle(e.target.value)
          }
        />
        <SubmitButton
          onClick={() => setCurrentStep(currentStep + 1)}
          value="Continue"
          disabled={title.length < 1}
        />
      </Wrapper>
    </FadeIn>
  );

  const TextForm = () => (
    <FadeIn>
      <Wrapper>
        <InputName>TEXT</InputName>
        <InputDescription>
          Type in the main text of your project. The material all this magic is
          about.
        </InputDescription>
        {/* TODO was this text already uploaded? */}
        <TextInput value={text} onChange={(e) => setText(e.target.value)} />
        <SubmitButton
          onClick={() => setCurrentStep(currentStep + 1)}
          value="Continue"
          disabled={text.length < 1}
        />
      </Wrapper>
    </FadeIn>
  );

  const AmountForm = () => (
    <FadeIn>
      <Wrapper>
        <InputName>EARLY SUPPORTER AMOUNT TO REACH</InputName>
        <InputDescription>
          How many people do you want to push your project? The number you
          specify here is the amount of people that need to fund your project,
          in order for your project to turn it into an NFT Collection. These
          people - including you – can then claim an NFT of the Collection...
        </InputDescription>
        <StyledInput
          value={firstEdMaxAmount}
          onChange={(e) => setFirstEdMaxAmount(Number(e.target.value))}
          placeholder={'2000'}
        />
        <SubmitButton
          onClick={() => setCurrentStep(currentStep + 1)}
          value="Continue"
          disabled={firstEdMaxAmount < 2}
        />
      </Wrapper>
    </FadeIn>
  );

  const PriceForm = () => (
    <FadeIn>
      <Wrapper>
        <InputName>PRICE PER FUNDING SPOT (MATIC)</InputName>
        <InputDescription>
          With this number you specify the Matic Price someone needs to pay to
          get a spot as a supporter. It can also be regarded as the price for a
          Genesis Edition NFT of your project.
        </InputDescription>
        {/* TODO validation so that it is 0.1 and not 0,1 */}
        <StyledInput
          value={firstEdMintPrice}
          onChange={(e) =>  setFirstEdMintPrice(e.target.value)}
          placeholder={'50'}
        />
        <SubmitButton
          onClick={() => setCurrentStep(currentStep + 1)}
          value="Continue"
          disabled={Number(firstEdMintPrice) < 0.01}
        />
      </Wrapper>
    </FadeIn>
  );

  const ReviewForm = () => {
    return (
      <FadeIn>
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
            // TODO: contract - should be able to freeze a contract or destruct 
            description='I am aware that any form of plagiarism or hateful content can be banned from the platfom at any time. Other lawyer gibberish.'
            onClick={() => setAgreed(!agreed)}
          />
          <SubmitButton
            disabled={!agreed}
            style={{ marginBlockEnd: '0' }}
            value="Create Project"
            onClick={createDao}
          />
        </>
      </FadeIn>
    );
  };

  const Waiting = () => (
    <FadeIn>
      <LoadingWrapper>
        <Loading height={200} />
        <ReviewItem>
          {`We're creating the Smart Contract for you.
            This takes a minute. Be patient and don't refresh the page plz :)`}
        </ReviewItem>
      </LoadingWrapper>
    </FadeIn>
  );

  // TODO make congrats screen look nice and special
  const Congrats = () => (
    <FadeIn>
      <Wrapper>
        <InputName>Congratulations!</InputName>
        <InputDescription>
          The Dao smart contract for your project was created!
          The address is:
        </InputDescription>
        <ReviewItem style={{ marginBlockEnd: '1rem' }}>
          {daoAddress}
        </ReviewItem>

        <InputDescription style={{ textAlign: 'center', maxWidth: 500 }}>
          {`We will guide you to the page, where you can see a dashboard of your project, in a minute. But first let's configure some more things. All of them are OPTIONAL, so you can skip them if you like.`}
        </InputDescription>

        <SubmitButton
          onClick={() => setCurrentStep(currentStep + 1)}
          value="Continue"
        />
      </Wrapper>
    </FadeIn>
  );

  const Part3Form = () => {
    return (
      <FadeIn>
        <Content>
          <DaoCard>
            <ReviewItemWrapper>
              <BlockSpan>Title</BlockSpan>
              <ReviewItem>{title}</ReviewItem>
            </ReviewItemWrapper>
            <ReviewItemWrapper style={{ lineBreak: 'anywhere' }}>
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
          </DaoCard>
          <AdditionalInputs>
            <StyledLabel>
              <BlockSpan>Genre</BlockSpan>
              <AdditionalInputWrapper>
                <AdditionalInput
                  value={genre}
                  onChange={(e) => handleGenre(e.target.value)}
                />
                <AdditionalInputSubmit
                  onClick={async () => {
                    const daoContract = getDaoContract(daoAddress);
                    await createSetGenre(
                      daoContract,
                      genre,
                      setLoading,
                      PendingToast,
                      SuccessToast
                    );
                  }}
                >
                  {loading ? <Loading height={50} /> : 'Set'}
                </AdditionalInputSubmit>
              </AdditionalInputWrapper>
            </StyledLabel>
            <StyledLabel>
              <BlockSpan>Contributor 1</BlockSpan>
              <AdditionalInputWrapper>
                <AdditionalInput
                  value={genre}
                  onChange={(e) => handleContributor1(e.target.value)}
                />
                <AdditionalInputSubmit>Set</AdditionalInputSubmit>
              </AdditionalInputWrapper>
            </StyledLabel>
            <StyledLabel>
              <BlockSpan>Contributor 2</BlockSpan>
              <AdditionalInputWrapper>
                <AdditionalInput
                  value={genre}
                  onChange={(e) => handleContributor2(e.target.value)}
                />
                <AdditionalInputSubmit>Set</AdditionalInputSubmit>
              </AdditionalInputWrapper>
            </StyledLabel>
            <StyledLabel>
              <BlockSpan>Contributor 3</BlockSpan>
              <AdditionalInputWrapper>
                <AdditionalInput
                  value={genre}
                  onChange={(e) => handleContributor3(e.target.value)}
                />
                <AdditionalInputSubmit>Set</AdditionalInputSubmit>
              </AdditionalInputWrapper>
            </StyledLabel>
            <StyledLabel>
              <BlockSpan>Subtitle</BlockSpan>
              <AdditionalInputWrapper>
                <AdditionalInput
                  value={genre}
                  onChange={(e) => handleSubtitle(e.target.value)}
                />
                <AdditionalInputSubmit>Set</AdditionalInputSubmit>
              </AdditionalInputWrapper>
            </StyledLabel>
            <StyledLabel>
              <BlockSpan>Max 1st Edition NFTs claimable by You</BlockSpan>
              <AdditionalInputWrapper>
                <AdditionalInput
                  value={genre}
                  onChange={(e) => handleAuthorMaxClaimable(e.target.value)}
                />
                <AdditionalInputSubmit>Set</AdditionalInputSubmit>
              </AdditionalInputWrapper>
            </StyledLabel>
            {/* TODO: you basically have lots of submit buttons here... */}
            <SubmitButton
              // type="submit"
              value="Finish"
            />
          </AdditionalInputs>
        </Content>
      </FadeIn>
    );
  };

  return (
    <Root>
      {/* <ProgressBarWrapper>
        <CreateProgressBar currentStep={currentStep}/>
      </ProgressBarWrapper> */}
      <FormWrapper>
        <Form>
          {currentStep === 0 && !creatingDao && NameForm()}
          {currentStep === 1 && !creatingDao && TextForm()}
          {currentStep === 2 && !creatingDao && AmountForm()}
          {currentStep === 3 && !creatingDao && PriceForm()}
          {currentStep === 4 && !creatingDao && ReviewForm()}
          {creatingDao && <Waiting />}
          {currentStep === 5 && !creatingDao && Congrats()}
        </Form>
      </FormWrapper>
    </Root>
  );
};;;

export default Create