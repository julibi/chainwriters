import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useMemo,
  useState,
} from 'react';
import styled from 'styled-components';
import { create } from 'ipfs-http-client';
import { toast } from 'react-toastify';
import { parseEther } from 'ethers/lib/utils';
import { useWeb3React } from '@web3-react/core';
import ProgressBar from '../components/ProgressBar';
import useFactoryContract from '../hooks/useFactoryContract';
import {
  BaseButton,
  BASE_BORDER_RADIUS,
  BASE_BOX_SHADOW,
  BG_NORMAL,
  INSET_BASE_BOX_SHADOW,
  PINK,
  PLAIN_WHITE,
} from '../themes';
import useDaoContract from '../state/useDaoContract';
import {
  useCreateAuthorMint,
  useCreateSetContributors,
  useCreateSetConfiguration,
} from '../state/projects/create/hooks';
import SuccessToast from '../components/SuccessToast';
import PendingToast from '../components/PendingToast';
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

export const SubmitButton = styled(BaseButton)`
  font-family: 'Roboto Mono';
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
  font-family: 'Roboto Mono';
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
  text-transform: uppercase;
  font-family: 'Roboto Mono Bold';
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
  const FactoryContract = useFactoryContract();
  // TODO
  // @ts-ignore
  const client = create('https://ipfs.infura.io:5001/api/v0');
  const [currentStep, setCurrentStep] = useState(0);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  // need it for state? We are returning the hash after upload...
  const [textIPFS, setTextIPFS] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [firstEdMintPrice, setFirstEdMintPrice] = useState<string>('0');
  const [firstEdMaxAmount, setFirstEdMaxAmount] = useState(0);
  // TODO type for buffer
  const [imgBuffer, setImgBuffer] = useState<null | Buffer>(null);
  const [imgFile, setImgFile] = useState(null);
  const [coverImgIPFS, setCoverImgIPFS] = useState<string>('');
  const [blurb, setBlurb] = useState<string>('');
  const [blurbIPFS, setBlurbIPFS] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState('');
  const [daoAddress, setDaoAddress] = useState<string>('');
  const [creatingDao, setCreatingDao] = useState<boolean>(false);
  const [subtitle, setSubtitle] = useState<string>('');
  const [authorMintAmount, setAuthorMintAmount] = useState<number>(0);
  const getDaoContract = useDaoContract();
  const createSetConfiguration = useCreateSetConfiguration();
  const createAuthorMint = useCreateAuthorMint();
  const createSetContributors = useCreateSetContributors();
  const daoContract = useMemo(
    () => (daoAddress ? getDaoContract(daoAddress) : null),
    [daoAddress, getDaoContract]
  );
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

  const handleSetConfiguration = useCallback(async () => {
    createSetConfiguration(
      daoContract,
      coverImgIPFS,
      blurbIPFS,
      genre,
      subtitle,
      setLoading,
      PendingToast,
      (x, y, z) => {
        setCurrentStep(currentStep + 1);
        // @ts-ignore
        return <SuccessToast chainId={x} hash={y} customMessage={z} />;
      }
    )
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .then(() => {})
      .catch((e) => {
        console.log({ e });
        toast.error('Something went wrong');
      });
  }, [
    createSetConfiguration,
    daoContract,
    coverImgIPFS,
    blurbIPFS,
    subtitle,
    genre,
    currentStep,
  ]);

  const handleAuthorMint = useCallback(async () => {
    setLoading(true);
    let uri;
    // first create metadata object
    try {
      const response = await fetch(`https://ipfs.io/ipfs/${blurbIPFS}`);
      if (!response.ok) {
        setBlurb(BLURB_FETCH_ERROR);
      } else {
        const fetchedBlurb = await response.text();
        setBlurb(fetchedBlurb);
      }
      const metadataObject = {
        name: title,
        description:
          blurb && blurb !== BLURB_FETCH_ERROR
            ? `${blurb} (Created with Peppermint Poets)`
            : 'Created with Peppermint Poets',
        image: coverImgIPFS ? `ipfs://${coverImgIPFS}` : '',
      };
      const metadata = JSON.stringify(metadataObject, null, 2);
      const uploadedMeta = (await client.add(metadata)).path;
      uri = `ipfs://${uploadedMeta}`;
    } catch (e: unknown) {
      toast.error('Something went wrong while uploading metadata to IPFS.');
      setLoading(false);
      return;
    }
    // then call the contract
    createAuthorMint(
      daoContract,
      authorMintAmount,
      uri,
      setLoading,
      PendingToast,
      (x, y, z) => {
        setCurrentStep(currentStep + 1);
        // @ts-ignore
        return <SuccessToast chainId={x} hash={y} customMessage={z} />;
      }
    )
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .then(() => {})
      .catch((e) => {
        console.log({ e });
        toast.error('Something went wrong');
      });
  }, [createAuthorMint, daoContract, authorMintAmount, currentStep]);

  const handleSetContributors = useCallback(async () => {
    createSetContributors(
      daoContract,
      contributorList,
      setLoading,
      PendingToast,
      (x, y, z) => {
        setCurrentStep(currentStep + 1);
        // @ts-ignore
        return <SuccessToast chainId={x} hash={y} customMessage={z} />;
      }
    )
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .then(() => {})
      .catch((e) => {
        console.log({ e });
        toast.error('Something went wrong');
      });
  }, [createSetContributors, daoContract, contributorList, currentStep]);

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
            {currentStep === 0 && !creatingDao && (
              <NameForm
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)
                }
                onSubmit={() => setCurrentStep(currentStep + 1)}
                title={title}
              />
            )}
            {currentStep === 1 && !creatingDao && (
              <TextForm
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setText(e.target.value)
                }
                onSubmit={() => setCurrentStep(currentStep + 1)}
                text={text}
              />
            )}
            {currentStep === 2 && !creatingDao && (
              <AmountForm
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFirstEdMaxAmount(Number(e.target.value))
                }
                onSubmit={() => setCurrentStep(currentStep + 1)}
                firstEdMaxAmount={firstEdMaxAmount}
              />
            )}
            {currentStep === 3 && !creatingDao && (
              <PriceForm
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFirstEdMintPrice(e.target.value)
                }
                onSubmit={() => setCurrentStep(currentStep + 1)}
                firstEdMintPrice={firstEdMintPrice}
              />
            )}
            {currentStep === 4 && !creatingDao && (
              <ReviewForm
                agreed={agreed}
                title={title}
                text={text}
                firstEdMaxAmount={firstEdMaxAmount}
                firstEdMintPrice={firstEdMintPrice}
                onCheck={() => setAgreed(!agreed)}
                createDao={createDao}
              />
            )}
            {creatingDao && <Waiting />}
            {currentStep === 5 && !creatingDao && (
              <Congrats
                daoAddress={daoAddress}
                onSubmit={() => setCurrentStep(currentStep + 1)}
              />
            )}
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
              <AuthorClaimForm
                loading={loading}
                authorMintAmount={authorMintAmount}
                firstEdMaxAmount={firstEdMaxAmount}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setAuthorMintAmount(Number(e.target.value))
                }
                onSubmit={handleAuthorMint}
              />
            )}
            {currentStep === 12 && !creatingDao && (
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
            {currentStep === 13 && !creatingDao && (
              <Finished daoAddress={daoAddress} />
            )}
          </Form>
        </FormWrapper>
      </Content>
    </Root>
  );
};

export default Create;
