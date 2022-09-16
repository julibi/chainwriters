import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useMemo,
  useState,
} from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { formatEther, parseEther } from 'ethers/lib/utils';
import { useWeb3React } from '@web3-react/core';
import ProgressBar from '../components/ProgressBar';
import {
  BaseButton,
  BASE_BORDER_RADIUS,
  BASE_BOX_SHADOW,
  BG_NORMAL,
  INSET_BASE_BOX_SHADOW,
  PINK,
  PLAIN_WHITE,
  INTER_BOLD,
} from '../themes';
import NameForm from '../components/Create/NameForm';
import TextForm from '../components/Create/TextForm';
import AmountForm from '../components/Create/AmountForm';
import PriceForm from '../components/Create/PriceForm';
import ReviewForm from '../components/Create/ReviewForm';
import Waiting from '../components/Create/Waiting';
import Congrats from '../components/Create/Congrats';
import CoverImageForm from '../components/Create/CoverImageForm';
import BlurbForm from '../components/Create/BlurbForm';
import GenreForm from '../components/Create/GenreForm';
import SubtitleForm from '../components/Create/SubtitleForm';
import ConfigReviewForm from '../components/Create/ConfigReviewForm';
import AuthorClaimForm from '../components/Create/AuthorClaimForm';
import ContributorsForm from '../components/Create/ContributorsForm';
import Finished from '../components/Create/Finished';
import { BLURB_FETCH_ERROR } from '../constants';
import {
  SectionTitle,
  SectionTitleWrapper,
} from '../components/HomePage/ProjectSection';
import { useFactory } from '../hooks/factory';
import { useIpfsClient } from '../hooks/useIpfsClient';
import { BigNumber } from 'ethers';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-block: 3rem 6rem;
`;

const Content = styled.div`
  padding-inline: 6rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 900px) {
    padding-inline: 2rem;
  }
`;

const ProgressBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  margin-block-end: 3rem;

  @media (max-width: 900px) {
    margin-block-end: 2rem;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  margin-block-start: 1rem;
`;

const Form = styled.div`
  width: 100%;
  max-width: 1200px;
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${BASE_BOX_SHADOW};
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

export const BlockSpan = styled.span`
  display: inline-block;
  margin-block-end: 1rem;
`;

export const ReviewItem = styled.p`
  display: inline-block;
  font-style: italic;
  color: ${PINK};
`;

export const TextInput = styled.textarea`
  height: 600px;
  width: 100%;

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

export const SubmitButton = styled(BaseButton)`
  text-transform: uppercase;
  text-align: center;
  color: ${PLAIN_WHITE};
  background-color: ${BG_NORMAL};
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${BASE_BOX_SHADOW};
  padding: 1rem;

  :disabled {
    color: grey;
  }
`;

export const FadeIn = styled.div`
  width: 100%;
  animation: fadein 2s;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ReviewItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  margin-block-end: 2rem;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 300px;
`;

export const InputName = styled.h2`
  text-align: center;
  font-family: ${INTER_BOLD};
  border-radius: ${BASE_BORDER_RADIUS};

  padding: 1rem;
  display: inline-block;
  margin-block-end: 1rem;
`;

export const InputDescription = styled.p`
  margin-block-end: 2rem;
  display: inline-block;
  text-align: center;
`;

export const FlexContainer = styled.div`
  display: flex;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export interface Contributor {
  address: string;
  share: number;
  role: string;
}

const Create = () => {
  const { chainId } = useWeb3React();
  const client = useIpfsClient();
  const [currentStep, setCurrentStep] = useState(0);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [textIPFS, setTextIPFS] = useState<null | string>(null);
  const [agreed, setAgreed] = useState(false);
  const [firstEdMintPrice, setFirstEdMintPrice] = useState<string>('0');
  const [firstEdMaxAmount, setFirstEdMaxAmount] = useState(0);
  const [imgBuffer, setImgBuffer] = useState<null | Buffer>(null);
  const [imgFile, setImgFile] = useState(null);
  const [coverImgIPFS, setCoverImgIPFS] = useState<string>('');
  const [blurb, setBlurb] = useState<string>('');
  const [blurbIPFS, setBlurbIPFS] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState('');
  const [subtitle, setSubtitle] = useState<string>('');
  const { createProject, createProjectStatus } = useFactory();

  const uploadText = useCallback(async () => {
    try {
      const added = await client.add(text);
      // const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      // TODO what about pinning?
      setTextIPFS(added.path);
      return added.path;
    } catch (e) {
      console.log({ e });
      toast.error('Something went wrong while uploading your text to ipfs.');
    }
  }, [client, text]);

  const handleCreateProject = useCallback(async () => {
    const hash = await uploadText();
    await createProject({
      title,
      textIpfsHash: hash,
      originalLanguage: 'ENG',
      // TODO: continue here
      initialMintPrice: BigNumber.from('20000000000000000'),
      firstEditionAmount: BigNumber.from(firstEdMaxAmount.toString()),
      onSuccess: () => {
        setCurrentStep(currentStep + 1)
      },
      onError: undefined
    });
  }, [createProject, currentStep, firstEdMaxAmount, title, uploadText]);

  const contribInitialState = {
    1: { address: '', share: 0, role: '' },
    2: { address: '', share: 0, role: '' },
    3: { address: '', share: 0, role: '' },
  };
  const [contributors, setContributors] = useState(contribInitialState);
  const contributorList = useMemo(() => {
    const contribsArray = [];
    Object.entries(contributors).map((contrib) => {
      if (contrib[1].address.length > 0 && contrib[1].share > 0) {
        contribsArray.push(contrib[1]);
      }
    });
    return contribsArray;
  }, [contributors]);

  const captureFile = (file: any) => {
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      // @ts-ignore
      const buffer = Buffer.from(reader.result);
      setImgFile(file);
      setImgBuffer(buffer);
    };
  };

  const submitImage = useCallback(
    async (event: FormEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const added = await client.add(imgBuffer);
      // const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      // TODO what about pinning?
      setCoverImgIPFS(added.path);
      setCurrentStep(currentStep + 1);
    },
    [client, imgBuffer, currentStep]
  );

  const handleSetBlurb = useCallback(async () => {
    const added = await client.add(blurb);
    setBlurbIPFS(added.path);
    setCurrentStep(currentStep + 1);
  }, [blurb, client, currentStep]);

  const creatingDao = useMemo(() => {
    return createProjectStatus === 'confirming' || createProjectStatus === 'waiting';
  }, [createProjectStatus]);

  return (
    <Root>
      <SectionTitleWrapper style={{ marginBlockEnd: '4rem' }}>
        <SectionTitle>Create</SectionTitle>
      </SectionTitleWrapper>
      <Content>
        <ProgressBarWrapper>
          <ProgressBar completed={currentStep ? (currentStep / 12) * 100 : 0} />
        </ProgressBarWrapper>
        <FormWrapper>
        <Form>
            {currentStep === 0 && (
              <NameForm
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)
                }
                onSubmit={() => setCurrentStep(currentStep + 1)}
                title={title}
              />
            )}
            {currentStep === 1 && (
              <TextForm
                onKeyDown={(val: string) => setText(val)}
                onSubmit={() => setCurrentStep(currentStep + 1)}
                text={text}
              />
            )}
        
            {currentStep === 2 && (
              <AmountForm
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFirstEdMaxAmount(Number(e.target.value))
                }
                onSubmit={() => setCurrentStep(currentStep + 1)}
                firstEdMaxAmount={firstEdMaxAmount}
              />
            )}
            {currentStep === 3 && (
              <PriceForm
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFirstEdMintPrice(e.target.value)
                }
                onSubmit={() => setCurrentStep(currentStep + 1)}
                firstEdMintPrice={firstEdMintPrice}
              />
            )}
            {/* TODO: enable changing things here */}
            {currentStep === 4 && !creatingDao && (
              <ReviewForm
                agreed={agreed}
                title={title}
                text={text}
                firstEdMaxAmount={firstEdMaxAmount}
                firstEdMintPrice={firstEdMintPrice}
                onCheck={() => setAgreed(!agreed)}
                createDao={handleCreateProject}
                pending={creatingDao}
              />
            )}
            {creatingDao && <Waiting />}
            {currentStep === 5 && !creatingDao && (
              <Congrats
                onSubmit={() => setCurrentStep(currentStep + 1)}
              />
            )}
            {/* 
            {currentStep === 6 && !creatingDao && (
              <CoverImageForm
                captureFile={captureFile}
                imgFile={imgFile}
                imgBuffer={imgBuffer}
                onNextStep={() => setCurrentStep(currentStep + 1)}
                onSubmit={submitImage}
              />
            )}
            {currentStep === 7 && !creatingDao && (
              <BlurbForm
                blurb={blurb}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setBlurb(e.target.value)
                }
                onNextStep={() => setCurrentStep(currentStep + 1)}
                onSubmit={handleSetBlurb}
              />
            )}
            {currentStep === 8 && !creatingDao && (
              <GenreForm
                genre={genre}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setGenre(e.target.value)
                }
                onNextStep={() => setCurrentStep(currentStep + 1)}
              />
            )}
            {currentStep === 9 && !creatingDao && (
              <SubtitleForm
                subtitle={subtitle}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSubtitle(e.target.value)
                }
                onNextStep={() => setCurrentStep(currentStep + 1)}
              />
            )}
            {currentStep === 10 && !creatingDao && (
              <ConfigReviewForm
                genre={genre}
                subtitle={subtitle}
                blurb={blurb}
                imgFile={imgFile}
                loading={loading}
                blurbIPFS={blurbIPFS}
                onSubmit={handleSetConfiguration}
              />
            )}
            {currentStep === 11 && !creatingDao && (
              <ContributorsForm
                contributors={contributors}
                contributorList={contributorList}
                loading={loading}
                onChange={(idx, key, val) =>
                  setContributors({
                    ...contributors,
                    [idx]: { ...contributors[idx], [key]: val },
                  })
                }
                onNextStep={() => setCurrentStep(currentStep + 1)}
                onSubmit={handleSetContributors}
              />
            )}
            {currentStep === 12 && !creatingDao && (
              <Finished daoAddress={daoAddress} />
            )}
            */}
          </Form> 
        </FormWrapper>
      </Content>
    </Root>
  );
};

export default Create;
