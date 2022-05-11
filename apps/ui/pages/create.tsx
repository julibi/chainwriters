import React, { ChangeEvent, FormEvent, useCallback, useMemo, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { create } from 'ipfs-http-client'
import { toast } from 'react-toastify'
import { parseEther } from 'ethers/lib/utils'
import { useWeb3React } from '@web3-react/core'
import Checkbox from '../components/Checkbox'
import CreateProgressBar from '../components/CreateProgressBar'
import useFactoryContract from '../hooks/useFactoryContract'
import {
  BaseButton,
  BASE_BORDER_RADIUS,
  BASE_BOX_SHADOW,
  BG_NORMAL,
  INSET_BASE_BOX_SHADOW,
  PINK,
  PLAIN_WHITE,
} from '../themes';
import Loading from '../components/Loading'
import useDaoContract from '../state/useDaoContract'
import {
  useCreateAuthorMint,
  useCreateSetContributors,
  useCreateSetConfiguration,
} from '../state/projects/create/hooks';
import SuccessToast from '../components/SuccessToast'
import PendingToast from '../components/PendingToast'
import { truncateAddress } from '../components/WalletIndicator'
import InputField, { StyledInputError } from '../components/InputField'


interface SyntheticEvent {
  target: {
    files: Blob[]
  };
  preventDefault: () => void;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-block-start: 3rem;
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
  margin-block-start: 1rem;
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

const BlockSpan = styled.span`
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

const SubmitButton = styled(BaseButton)`
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

const ReviewItems = styled.div`
  display: flex;
  flex-direction: column;
`;

const CoverImageReview = styled.div`
  height: 100%;
  margin-block-end: 2rem;
  span {
    width: 100% !important;
    height: 100% !important;

    img {
      object-fit: contain !important;
      
    }
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
  text-align: center;
`;

const FlexContainer = styled.div`
  display: flex;
`;

const StyledImageForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const DragNDrop = styled.div`
  width: 100%;
  height: 300px;
  align-items: center;
  box-shadow: ${INSET_BASE_BOX_SHADOW};
  margin: 0 0 2rem 0;

  > span {
    width:100% !important;
    height:100% !important;
    object-fit: cover !important;
    overflow: hidden !important;
  }
`;

const UploadCTAWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-block-end: 2rem;
`;

const StyledSubmitButton = styled(SubmitButton)`
  color: ${PINK};
`;

const StyledFileInput = styled.input`
  color: transparent;
  margin-block: 1rem;
  
  ::-webkit-file-upload-button {
    width: 100%;
    border-width: 0;
    font-family: 'Roboto Mono';
    text-transform: uppercase;
    text-align: center;
    color: ${BG_NORMAL};
    background-color: ${PLAIN_WHITE};
    border-radius: ${BASE_BORDER_RADIUS} !important;
    padding: 1rem;
  
    :hover {
      cursor: pointer;
    }
  
    :disabled {
      color: grey;
  
      :hover {
        cursor: default;
      }
    }
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FileName = styled.span`
  display: inline-block;
  height: 24px;
`;

export interface Contributor {
  address: string;
  share: number;
  role: string;
}

const ContribList = styled.ul`
  padding: 0;
  list-style-type: none;
  width: 100%;
`;

const ContribItem = styled.li`
  display: flex;
  justify-content: space-between;
`;

const SpecialShare = styled.span`
  width: 100%;
  justify-content: space-between;
  display: flex;
  margin-block-end: 1rem;
`;

const AddContribButton = styled(SubmitButton)`
  width: 100%;
  margin-block-end: 2rem;
`;

const CTAContainer = styled.div`
  padding: 1rem;
`;

const ContribInputContainer = styled.div`
  margin-block-end: 1rem;
  display: flex;
  flex-direction: column;
`;

const ContribButtonContainer = styled(FlexContainer)`
  justify-content: space-between;
`;

const Create = () => {
  const router = useRouter();
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
  const [firstEdMintPrice, setFirstEdMintPrice] = useState('0');
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
  const daoContract = useMemo(() => daoAddress ? getDaoContract(daoAddress) : null, [daoAddress, getDaoContract]);
  const contribInitialState = {
    1: { address: '', share: 0, role: '' },
    2: { address: '', share: 0, role: '' },
    3: { address: '', share: 0, role: '' },
  };

  const [contributors, setContributors] = useState(contribInitialState);
  const [shareSelf, setShareSelf] = useState<number>(85);
  const [showInputError, setShowInputError] = useState<boolean>(false);
  const contributorIndex = useMemo(() => {
    let idx = 0;
    for (const contrib in contributors) {
      if ((contributors[contrib].address.length > 0) && (contributors[contrib].length > 0)) {
        idx ++;
      }
    }
    return idx;
  }, [contributors]);

  const contributorList = useMemo(() => {
    const contribsArray = [];
    Object.entries(contributors).map(contrib => {
      if (contrib[1].address.length > 0 && contrib[1].share > 0) {
        contribsArray.push(contrib[1]);
      }
    })
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

  const shortenImageName = (filename: string) => {
    const filenameStart = filename.substring(0, 6);
    const filenameLength = filename.length;
    const cut = filenameLength - 6;
    const filenameEnd = filename.substring(filenameLength, cut);
    return `${filenameStart}...${filenameEnd}`; 
  };

  const captureFile = (file: any) => {
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      // @ts-ignore
      const buffer = Buffer.from(reader.result);
      setImgFile(file);
      setImgBuffer(buffer);
    }
  };

  const submitImage = useCallback(async(event: SyntheticEvent) => {
    event.preventDefault();
    const added = await client.add(imgBuffer);
    // const url = `https://ipfs.infura.io/ipfs/${added.path}`;
    // TODO what about pinning?
    setCoverImgIPFS(added.path);
    setCurrentStep(currentStep + 1);
  }, [client, imgBuffer, currentStep])

  const handleSetBlurb = useCallback(async() => {
    const added = await client.add(blurb);
    setBlurbIPFS(added.path);
    setCurrentStep(currentStep + 1);
  }, [blurb, client, currentStep]);

  const handleSetConfiguration = useCallback(async() => {
      createSetConfiguration(
        daoContract,
        coverImgIPFS,
        blurbIPFS,
        subtitle,
        genre,
        setLoading,
        PendingToast,
        (x, y, z) => {
          setCurrentStep(currentStep + 1);
          // @ts-ignore
          return <SuccessToast chainId={x} hash={y} customMessage={z} />
        }
      )
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .then(() => {})
      .catch((e) => {
        console.log({e});
        toast.error('Something went wrong');
      });
  }, [createSetConfiguration, daoContract, coverImgIPFS, blurbIPFS, subtitle, genre, currentStep]);
  
  const handleAuthorMint = useCallback(async() => {
    createAuthorMint(
      daoContract,
      authorMintAmount,
      setLoading,
      PendingToast,
      (x, y, z) => {
        setCurrentStep(currentStep + 1);
        // @ts-ignore
        return <SuccessToast chainId={x} hash={y} customMessage={z} />
      }
    )
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    .then(() => {})
    .catch((e) => {
      console.log({e});
      toast.error('Something went wrong');
    });
}, [createAuthorMint, daoContract, authorMintAmount, currentStep]);

  const handleSetContributors = useCallback(async () => {
    createSetContributors(
      daoContract,
      contributors,
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
  }, [createSetContributors, daoContract, contributors, currentStep]);

  const NameForm = () => (
    <FadeIn>
      <Wrapper>
        <InputName>TITLE</InputName>
        <InputDescription>What is the title of your project?</InputDescription>
        <InputField
          error={title.length < 1 && 'At least 1 character.'}
          onChange={(e: FormEvent<HTMLInputElement>) =>
            // TODO validation - does the title exist already from the same author?
            // @ts-ignore
            setTitle(e.target.value)
          }
          value={title}
        />
        <SubmitButton
          onClick={() => setCurrentStep(currentStep + 1)}
          disabled={title.length < 1}
        >
          {'Continue'}
        </SubmitButton>
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
        <TextInput
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <StyledInputError>
          {text.length < 1 ? 'At least 1 character.' : ' '}
        </StyledInputError>
        <SubmitButton
          onClick={() => setCurrentStep(currentStep + 1)}
          disabled={text.length < 1}
        >
          {'Continue'}
        </SubmitButton>
      </Wrapper>
    </FadeIn>
  );

  const AmountForm = () => (
    <FadeIn>
      <Wrapper>
        <InputName>TOTAL AMOUNT OF GENESIS EDITION</InputName>
        <InputDescription>
          The first edition of a work is called Genesis Edition. Holders of a Genesis Edition will have special benefits.
          The Genesis Edition will be sold over a Dutch Auction. Determine its total amount. Keep in mind that you can only trigger the sale of
          a subsequent edition after the Genesis Edition has sold out.
        </InputDescription>
        <InputField
          value={firstEdMaxAmount}
          // @ts-ignore
          onChange={(e) => setFirstEdMaxAmount(Number(e.target.value))}
          placeholder={'2000'}
          error={(firstEdMaxAmount < 2) && 'At least 2.'}
        />
        <SubmitButton
          onClick={() => setCurrentStep(currentStep + 1)}
          disabled={firstEdMaxAmount < 2}
        >
          {'Continue'}
        </SubmitButton>
      </Wrapper>
    </FadeIn>
  );

  const PriceForm = () => (
    <FadeIn>
      <Wrapper>
        <InputName>STARTING PRICE(MATIC)</InputName>
        <InputDescription>
          The Genesis Edition is sold in a dutch auction.
          In a dutch auction the price keeps going down during a given time – in our case: 24 hours – until someone buys.
          Then the next dutch auction starts, until all copies are sold out.
          Determine the starting price for all your Genesis Edition copies in Matic.
          You will be able to determine the price for each new edition that you unlock.
        </InputDescription>
        {/* TODO validation so that it is 0.1 and not 0,1 */ }
        <InputField
          error={(Number(firstEdMintPrice) < 0.01) && 'At least 0.01 Matic.'}
          // @ts-ignore
          onChange={(e) => setFirstEdMintPrice(e.target.value)}
          placeholder={'50'}
          value={firstEdMintPrice}
        />
        <SubmitButton
          onClick={() => setCurrentStep(currentStep + 1)}
          disabled={Number(firstEdMintPrice) < 0.01}
        >
          {'Continue'}
        </SubmitButton>
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
            <BlockSpan>Max Amount Genesis Edition</BlockSpan>
            <ReviewItem>{firstEdMaxAmount}</ReviewItem>
          </ReviewItemWrapper>
          <ReviewItemWrapper>
            <BlockSpan>Dutch Auction Starting Price (MATIC)</BlockSpan>
            <ReviewItem>{firstEdMintPrice}</ReviewItem>
          </ReviewItemWrapper>
          <Checkbox
            // TODO: contract - should be able to freeze a contract or destruct 
            description='I am aware that any form of plagiarism or hateful content can be banned from the platfom at any time. Other lawyer gibberish.'
            onClick={() => setAgreed(!agreed)}
            agreed={agreed}
          />
          <SubmitButton
            disabled={!agreed}
            style={{ marginBlockEnd: '0', minWidth: '182px' }}
            onClick={createDao}
          >
            {'Create Project'}
          </SubmitButton>
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
        <ReviewItem style={{ marginBlockEnd: '1rem', overflowWrap: 'anywhere' }}>
          {daoAddress}
        </ReviewItem>
        <InputDescription style={{ textAlign: 'center', maxWidth: 500 }}>
          {`We will guide you to the page, where you can see a dashboard of your project, in a minute. But first let's configure some more things. All of them are OPTIONAL, so you can skip them if you like.`}
        </InputDescription>
        <SubmitButton
          onClick={() => {
            setCurrentStep(currentStep + 1);
            setCurrentStep(currentStep + 1);
          }}
        >
          {'Continue'}
        </SubmitButton>
      </Wrapper>
    </FadeIn>
  );

  const CoverImageForm = () => (
    <FadeIn>
      <Wrapper>
        <InputName>COVER IMAGE</InputName>
        <InputDescription>Upload a Cover Image</InputDescription>
        {/* @ts-ignore */}
        <StyledImageForm onSubmit={(e: any) => submitImage(e)}>
          <DragNDrop
            onDragOver={(e: any) => {
              e.preventDefault();
            }}
            onDrop={(e: any) => {
              e.preventDefault();
              const file = e.dataTransfer.files[0];
              captureFile(file);
            }}
          >
            <Image
              src={
                imgFile ? URL.createObjectURL(imgFile) : '/ImgPlaceholder.png'
              }
              height={'100%'}
              width={'100%'}
              alt={'Cover'}
              quality={65}
              layout="responsive"
            />
          </DragNDrop>
          <UploadCTAWrapper>
            <FileName>{imgFile ? shortenImageName(imgFile.name) : ''}</FileName>
            <StyledFileInput
              type="file"
              onChange={(evt: any) => {
                evt.preventDefault();
                const file = evt.target.files[0];
                captureFile(file);
              }}
            />
            <ButtonsWrapper>
              <SubmitButton
                onClick={() => setCurrentStep(currentStep + 1)}
              >
                Skip
              </SubmitButton>
              <StyledSubmitButton disabled={!imgBuffer}>
                Set Image
              </StyledSubmitButton>
            </ButtonsWrapper>
          </UploadCTAWrapper>
        </StyledImageForm>
      </Wrapper>
    </FadeIn>
  );

  const BlurbForm = () => (
    <FadeIn>
      <Wrapper>
        <InputName>BLURB</InputName>
        <InputDescription>
          Write a short text to introduce your project and captivate readers! A
          short summary? Or just the first few lines?
        </InputDescription>
        <TextInput
          style={{ height: '200px' }}
          value={blurb}
          onChange={(e) => setBlurb(e.target.value)}
        />
        <StyledInputError>
          {blurb.length < 20 ? 'At least 20 characters.' : ' '}
        </StyledInputError>
        <ButtonsWrapper>
          <SubmitButton
            onClick={() => setCurrentStep(currentStep + 1)}
            >
            {'Skip'}
          </SubmitButton>
          <SubmitButton
            onClick={handleSetBlurb}
            disabled={blurb.length < 20}
            style={{ minWidth: '182px', marginInlineStart: '1rem' }}
            >
            Set Blurb
          </SubmitButton>
        </ButtonsWrapper>
      </Wrapper>
    </FadeIn>
  );

  const GenreForm = () => (
    <FadeIn>
      <Wrapper>
        <InputName>GENRE</InputName>
        <InputDescription>
          If you specify the Genre, it makes it easier for people to find your project. Also, you are giving more information for possible readers and supporters.
        </InputDescription>
        <InputField
          error={genre.length < 3 && 'At least 3 characters.'}
          // @ts-ignore
          onChange={(e) => setGenre(e.target.value)}
          placeholder={'Fiction'}
          value={genre}
        />
        <FlexContainer>
          <SubmitButton
            style={{marginInlineEnd: '1rem'}}
            onClick={() => setCurrentStep(currentStep + 1)}
          >
            {'Skip'}
          </SubmitButton>
          <SubmitButton
            onClick={() => setCurrentStep(currentStep + 1)}
            disabled={genre.length < 3}
            style={{ minWidth: '182px' }}
          >
            Set Genre
          </SubmitButton>
        </FlexContainer>
      </Wrapper>
    </FadeIn>
  );

  const SubTitleForm = () => (
    <FadeIn>
      <Wrapper>
        <InputName>SUBTITLE</InputName>
        <InputDescription>
          Does your text have a subtitle?
        </InputDescription>
        <InputField
          error={subtitle.length < 3 && 'At least 3 characters.'}
          // @ts-ignore
          onChange={(e) => setSubtitle(e.target.value)}
          value={subtitle}
        />
        <FlexContainer>
          <SubmitButton
            style={{marginInlineEnd: '1rem'}}
            onClick={() => setCurrentStep(currentStep + 1)}
          >
            {'Skip'}
          </SubmitButton>
          <SubmitButton
            onClick={() => setCurrentStep(currentStep + 1)}
            disabled={subtitle.length < 1}
            style={{ minWidth: '182px' }}
          >
            {loading ? <Loading height={20} dotHeight={20} /> : 'Set Subtitle'}
          </SubmitButton>
        </FlexContainer>
      </Wrapper>
    </FadeIn>
  );

  const ConfigReviewForm = () => (
    <FadeIn>
      <Wrapper>
        <InputName>Your Project Details</InputName>
        <InputDescription>
          {`Review this data closely before submitting it.`}
        </InputDescription>
        <FlexContainer>
          <CoverImageReview>
            <Image
              src={
                imgFile ? URL.createObjectURL(imgFile) : '/ImgPlaceholder.png'
              }
              height={'100%'}
              width={'100%'}
              alt={'Cover'}
            />
          </CoverImageReview>
          <ReviewItems>
            <ReviewItemWrapper>
              <BlockSpan>Subtitle</BlockSpan>
              <ReviewItem>{subtitle.length ? subtitle : 'None specified'}</ReviewItem>
            </ReviewItemWrapper>
            <ReviewItemWrapper>
              <BlockSpan>Genre</BlockSpan>
              <ReviewItem>{genre.length ? genre : 'None specified'}</ReviewItem>
            </ReviewItemWrapper>
            <ReviewItemWrapper>
              <BlockSpan>Blurb</BlockSpan>
              <ReviewItem>{blurbIPFS ? blurb : 'None specified' }</ReviewItem>
            </ReviewItemWrapper>
          </ReviewItems>
        </FlexContainer>
        <SubmitButton
          disabled={loading}
          style={{ marginBlockEnd: '0', minWidth: '182px' }}
          onClick={handleSetConfiguration}
        >
          {loading ? <Loading height={20} dotHeight={20} /> : 'Looks Good'}
        </SubmitButton>
      </Wrapper>
    </FadeIn>
  );

  const AuthorClaimForm = () => (
    <FadeIn>
      <Wrapper>
        <InputName>AMOUNT CLAIMABLE BY YOU</InputName>
        <InputDescription>
          {`You as an author can mint an amount of your project's Genesis Edition NFTs for yourself. 
          Only after minting this amount, can you trigger the public auctions for your first edition.
          Why yould you want more than 1 for yourself? Maybe you want to keep a couple more
          as giveaways in the future to engage with your readers and community?
          Or maybe you want to gift them to co-authors and other contributors? Up to you :)
          `}
        </InputDescription>
        <InputField
          // validation, needs to be smaller than total amount
          disabled={loading}
          error={authorMintAmount >= firstEdMaxAmount && 'Must be smaller than Max Amount.'}
          // @ts-ignore
          onChange={(e) => setAuthorMintAmount(Number(e.target.value))}
          placeholder={'6'}
          value={authorMintAmount}
        />
        <FlexContainer>
          <SubmitButton
            onClick={handleAuthorMint}
            disabled={loading || authorMintAmount == 0 || authorMintAmount >= firstEdMaxAmount}
            style={{ minWidth: '182px' }}
          >
            {loading ? <Loading height={20} dotHeight={20} /> : 'Mint'}
          </SubmitButton>
        </FlexContainer>
      </Wrapper>
    </FadeIn>
  );

  const ContributorsForm = () => {
    const [formsAmount, setFormsAmount] = useState(1);

    const renderForm = (idx: number) => {
      return(
        <ContribInputContainer>
        <InputField
          label={'Address:'}
          disabled={loading}
          onChange={(e) => {
            console.log(contributors[idx]);
            // @ts-ignore
            setContributors({
              ...contributors,
              // @ts-ignore
              [idx]: { ...contributors[idx], address: e.target.value }
            })
          }}
          placeholder={'0x123'}
          value={contributors[idx]?.address}
          // TODO: validation: is not an address.
        />
        <InputField
          label={'Share in %:'}
          disabled={loading}
          onChange={(e) => {
            // @ts-ignore
            const inputVal = Number(e.target.value.replace(/[^0-9]/g, ''));
            setContributors({
              ...contributors,
              // @ts-ignore
              [idx]: { ...contributors[idx], share: inputVal }
            })
            // setShowInputError(85 - otherShares < 0);
          }}
          placeholder={'10%'}
          value={contributors[idx].share}
          // TODO only full numbers
        />
        <InputField
          label={'Role:'}
          disabled={loading}
          onChange={(e) =>
            // @ts-ignore
            setContributors({
              ...contributors,
              // @ts-ignore
              [idx]: { ...contributors[idx], role: e.target.value }
            })
          }
          placeholder={'0x123'}
          value={contributors[idx].role}
          // TODO: validation: is not an address.
        />
        <StyledInputError style={{ display: 'flex' }}>
          {showInputError ? 'Share too high.' : ''}
        </StyledInputError>
      </ContribInputContainer>
      );
    };
    return (
      <FadeIn>
        <Wrapper>
          <InputName>CONTRIBUTORS</InputName>
          <InputDescription>
            {`Do you want to set contributors like Co-Authors, Editors, Translators, Cover Artists etc.?
            You can input their addresses and roles and most importantly what share of the funds they will receive, once the Genesis Edition sells out.
            Each share should be a number between 0 and 85. 
            You can specify up to 3. Keep in mind that the total of shares will be deducted from you own share.
            15% are always going to the foundation.
            So a contributor with a share of 10, will receive 10% of the funds.
            --> editor is getting 10%, foundation 15% you will be left with 75%.
            WARNING: This is irreversible.`}
          </InputDescription>
          <CTAContainer>
            {contributorList.length ? (
              <ContribList>
                {contributorList.map((item, idx) => (
                  <div key={idx}>
                    <ContribItem>
                      <span>Contributor {idx + 1}:</span>
                      <span>{truncateAddress(item.address)}</span>
                    </ContribItem>
                    <ContribItem>
                      <span>Share:</span>
                      <span>{item.share} %</span>
                    </ContribItem>
                    <ContribItem>
                      <span>Role:</span>
                      <span>{item.role.length > 0 ? item.role : 'Unknown'}</span>
                    </ContribItem>
                  </div>
                ))}
              </ContribList>
            ) : null}
            <SpecialShare>
              <span>Moonlit Foundation share:</span>
              <span>15 %</span>
            </SpecialShare>
            <SpecialShare>
              <span>Your share:</span>
              <span>{shareSelf} %</span>
            </SpecialShare>
            {renderForm(1)}
            {formsAmount >= 2 && renderForm(2)}
            {formsAmount === 3 && renderForm(3)}
            <AddContribButton
              disabled={
                contributorList.length < 1 ||
                contributorList.length === 3 ||
                contributorList.length < formsAmount
              }
              onClick={() => setFormsAmount(formsAmount + 1)}
            >
              Add Another Contributor
            </AddContribButton>
            <ContribButtonContainer>
              <SubmitButton
                style={{ marginInlineEnd: '1rem' }}
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={loading}
              >
                {contributorIndex > 0 ? 'Continue' : 'Skip'}
              </SubmitButton>
              <SubmitButton
                onClick={handleSetContributors}
                disabled={loading || contributorIndex == 3 || shareSelf <= 0}
                style={{ minWidth: '182px' }}
              >
                {loading ? (
                  <Loading height={20} dotHeight={20} />
                ) : (
                  'Set Contributors'
                )}
              </SubmitButton>{' '}
            </ContribButtonContainer>
          </CTAContainer>
        </Wrapper>
      </FadeIn>
    );
  };

  const Finished = () => {
    return (
      <FadeIn>
        <Wrapper>
          <InputName>DONE!</InputName>
          <InputDescription>
            {`You have completed configuring your Project's DAO Contract. Visit your newly created Project page.`}
          </InputDescription>
          <SubmitButton onClick={(e) => {
              e.preventDefault()
              router.push(`projects/${daoAddress}`)
            }}
          >
            SEE PROJECT
          </SubmitButton>
        </Wrapper>
      </FadeIn>
    );
  };

  return (
    <Root>
      <ProgressBarWrapper>
        <CreateProgressBar currentStep={currentStep} />
      </ProgressBarWrapper>
      <FormWrapper>
        <Form>
          {currentStep === 0 && !creatingDao && ContributorsForm()}
          {/* {currentStep === 0 && !creatingDao && NameForm()} */}
          {currentStep === 1 && !creatingDao && TextForm()}
          {currentStep === 2 && !creatingDao && AmountForm()}
          {currentStep === 3 && !creatingDao && PriceForm()}
          {currentStep === 4 && !creatingDao && ReviewForm()}
          {creatingDao && <Waiting />}
          {currentStep === 5 && !creatingDao && Congrats()}
          {currentStep === 6 && !creatingDao && CoverImageForm()}
          {currentStep === 7 && !creatingDao && BlurbForm()}
          {currentStep === 8 && !creatingDao && GenreForm()}
          {currentStep === 9 && !creatingDao && SubTitleForm()}
          {currentStep === 10 && !creatingDao && ConfigReviewForm()}
          {currentStep === 11 && !creatingDao && AuthorClaimForm()}
          {currentStep === 12 && !creatingDao && ContributorsForm()}
          {currentStep === 13 && !creatingDao && Finished()}
        </Form>
      </FormWrapper>
    </Root>
  );
};

export default Create