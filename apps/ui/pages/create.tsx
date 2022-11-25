import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useMemo,
  useState,
} from 'react';
import styled from 'styled-components';
import { parseEther } from 'ethers/lib/utils';
import { Node } from 'slate';
import ProgressBar from '../components/ProgressBar';
import {
  BASE_BORDER_RADIUS,
  POP,
  FONT_SERIF_BOLD,
  FONT_SERIF_REGULAR,
  ElementThemeProps,
} from '../themes';
import NameForm from '../components/Create/NameForm';
import TextForm from '../components/Create/TextForm';
import AmountForm from '../components/Create/AmountForm';
import PriceForm from '../components/Create/PriceForm';
import ReviewForm from '../components/Create/ReviewForm';
import Congrats from '../components/Create/Congrats';
import CoverImageForm from '../components/Create/CoverImageForm';
import BlurbForm from '../components/Create/BlurbForm';
import GenreForm from '../components/Create/GenreForm';
import SubtitleForm from '../components/Create/SubtitleForm';
import ConfigReviewForm from '../components/Create/ConfigReviewForm';
import ContributorsForm from '../components/Create/ContributorsForm';
import Finished from '../components/Create/Finished';
import { useFactory } from '../hooks/factory';
import { useIpfsClient } from '../hooks/useIpfsClient';
import { BigNumber } from 'ethers';
import { useManager } from '../hooks/manager';
import { useTheme } from '../hooks/theme';
import LanguageForm from '../components/Create/LanguageForm';
import TranslationForm from '../components/Create/TranslationForm';
import Title from '../components/Title';
import { useCollection } from '../hooks/collection';
import { useRouter } from 'next/router';
import ConfettiCanon from '../components/ConfettiCanon';
import useUploadTextToIpfs from '../hooks/useUploadTextToIpfs';

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

const Form = styled.div<ElementThemeProps>`
  width: 100%;
  max-width: 1200px;
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${({ theme }) => theme.BASE_BOX_SHADOW};
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
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

export const ReviewItem = styled.p`
  display: inline-block;
  font-style: italic;
  color: ${POP};
  font-family: ${FONT_SERIF_REGULAR};
  font-size: 16px;
`;

export const ReviewItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  font-family: ${FONT_SERIF_BOLD};
  border-radius: ${BASE_BORDER_RADIUS};

  padding: 1rem;
  display: inline-block;
  margin-block-end: 1rem;
`;

export const InputDescription = styled.p`
  margin-block-end: 2rem;
  display: inline-block;
  text-align: center;
  width: 75%;
  font-family: ${FONT_SERIF_REGULAR};

  @media (max-width: 900px) {
    width: 100%;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const BlockSpan = styled.span`
  display: inline-block;
  margin-block-end: 1rem;
  font-family: ${FONT_SERIF_REGULAR};
`;

export interface Contributor {
  address: string;
  share: number;
  role: string;
}

const Create = () => {
  const theme = useTheme();
  const client = useIpfsClient();
  const { uploadText } = useUploadTextToIpfs();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [title, setTitle] = useState('');
  const [text, setText] = useState<Node[] | string | undefined>();
  const [language, setLanguage] = useState<string>('');
  const [translation, setTranslation] = useState<Node[] | undefined>();
  // const [textIPFS, setTextIPFS] = useState<null | string>(null);
  const [agreedToTerm1, setAgreedToTerm1] = useState(false);
  const [agreedToTerm2, setAgreedToTerm2] = useState(false);
  const [firstEdMintPrice, setFirstEdMintPrice] = useState<string>('0');
  const [firstEdMaxAmount, setFirstEdMaxAmount] = useState(0);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [imgBuffer, setImgBuffer] = useState<null | Buffer>(null);
  const [imgFile, setImgFile] = useState(null);
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);
  const [coverImgIPFS, setCoverImgIPFS] = useState<string>('');
  const [blurb, setBlurb] = useState<Node[] | undefined>();
  const [blurbIPFS, setBlurbIPFS] = useState<string>('');
  const [genre, setGenre] = useState('');
  const [subtitle, setSubtitle] = useState<string>('');
  const [isPinPending, setIsPinPending] = useState<boolean>(false);

  const { createProject } = useFactory();
  const {
    configureProject,
    configureStatus,
    setContributors,
    setContributorsStatus,
    updateTranslation,
    updateTranslationStatus,
  } = useManager();
  const { startAuctions } = useCollection();
  const nothingConfigured = useMemo(() => {
    if (
      !subtitle.trim().length &&
      !genre.trim().length &&
      !blurb?.length &&
      !coverImgIPFS.trim().length
    )
      return true;
    return false;
  }, [subtitle, genre, blurb, coverImgIPFS]);

  const handleCreateProject = useCallback(async () => {
    setIsPinPending(true);
    const hash = await uploadText(text);
    setIsPinPending(false);

    await createProject({
      title,
      textIpfsHash: hash,
      originalLanguage: language,
      initialMintPrice: parseEther(firstEdMintPrice),
      firstEditionAmount: BigNumber.from(firstEdMaxAmount.toString()),
      onSuccess: (newProjectId: string) => {
        setCurrentStep(currentStep + 1);
        setProjectId(newProjectId);
      },
      onError: undefined,
    });
  }, [
    createProject,
    currentStep,
    firstEdMaxAmount,
    firstEdMintPrice,
    language,
    title,
    text,
    uploadText,
  ]);

  const handleUpdateTranslation = useCallback(async () => {
    setIsPinPending(true);
    const hash = await uploadText(translation);
    setIsPinPending(false);

    await updateTranslation({
      projectId,
      translationIpfsHash: hash,
      onSuccess: () => {
        setCurrentStep(currentStep + 1);
      },
      onError: undefined,
    });
  }, [currentStep, projectId, translation, updateTranslation, uploadText]);

  const handleConfigure = useCallback(async () => {
    // TODO: add animationhash
    await configureProject({
      projectId,
      imgHash: coverImgIPFS,
      animationHash: '',
      blurbHash: blurbIPFS,
      genre,
      subtitle,
      onSuccess: () => {
        setCurrentStep(currentStep + 1);
      },
    });
  }, [
    blurbIPFS,
    configureProject,
    coverImgIPFS,
    currentStep,
    genre,
    projectId,
    subtitle,
  ]);

  const contribInitialState = {
    1: { address: '', share: 0, role: '' },
    2: { address: '', share: 0, role: '' },
    3: { address: '', share: 0, role: '' },
  };
  const [contribs, setContribs] = useState(contribInitialState);
  const contributorsList = useMemo(() => {
    const contribsArray = [];
    Object.entries(contribs).map((contrib) => {
      if (contrib[1].address.length > 0 && contrib[1].share > 0) {
        contribsArray.push(contrib[1]);
      }
    });
    return contribsArray;
  }, [contribs]);

  const handleSetContributors = useCallback(async () => {
    await setContributors({
      projectId,
      contributorsList,
      onSuccess: () => {
        setCurrentStep(currentStep + 1);
      },
    });
  }, [contributorsList, currentStep, projectId, setContributors]);

  const captureFile = (file: any) => {
    // TODO: add loading
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
      setIsUploadingImage(true);
      event.preventDefault();
      const added = await client.add(imgBuffer);

      setCoverImgIPFS(added.path);
      setCurrentStep(currentStep + 1);
      setIsUploadingImage(false);
    },
    [client, imgBuffer, currentStep]
  );

  const handleSetBlurb = useCallback(async () => {
    setIsPinPending(true);
    const hash = await uploadText(blurb);
    setIsPinPending(false);

    setBlurbIPFS(hash);
    setCurrentStep(currentStep + 1);
  }, [blurb, currentStep, uploadText]);

  const handleStartAuctions = useCallback(
    async (authorMintInput: number) => {
      await startAuctions({
        projectId,
        amountForCreator: authorMintInput,
        initialMintPrice: parseEther(firstEdMintPrice),
        onSuccess: () => router.push(`projects/${projectId}`),
      });
    },
    [firstEdMintPrice, projectId, router, startAuctions]
  );

  return (
    <Root>
      <Title color={POP} margin="0 0 4rem 0">
        Create
      </Title>
      <Content>
        <ProgressBarWrapper>
          <ProgressBar completed={currentStep ? (currentStep / 14) * 100 : 0} />
        </ProgressBarWrapper>
        <FormWrapper>
          <ConfettiCanon show={!!projectId} />
          <Form theme={theme}>
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
                onKeyDown={(val: Node[]) => setText(val)}
                onSubmit={() => setCurrentStep(currentStep + 1)}
                text={text as Node[]}
              />
            )}
            {currentStep === 2 && (
              <LanguageForm
                onLanguageSet={(val: string) => setLanguage(val)}
                onSubmit={() => setCurrentStep(currentStep + 1)}
                language={language}
                text={text}
              />
            )}
            {currentStep === 3 && (
              <AmountForm
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFirstEdMaxAmount(Number(e.target.value))
                }
                onSubmit={() => setCurrentStep(currentStep + 1)}
                firstEdMaxAmount={firstEdMaxAmount}
              />
            )}
            {currentStep === 4 && (
              <PriceForm
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFirstEdMintPrice(e.target.value)
                }
                onSubmit={() => setCurrentStep(currentStep + 1)}
                firstEdMintPrice={firstEdMintPrice}
              />
            )}
            {/* TODO: enable changing things here */}
            {currentStep === 5 && (
              <ReviewForm
                agreedToTerm1={agreedToTerm1}
                agreedToTerm2={agreedToTerm2}
                language={language}
                title={title}
                text={text as Node[]}
                firstEdMaxAmount={firstEdMaxAmount}
                firstEdMintPrice={firstEdMintPrice}
                onCheckTerm1={() => setAgreedToTerm1(!agreedToTerm1)}
                onCheckTerm2={() => setAgreedToTerm2(!agreedToTerm2)}
                isPinPending={isPinPending}
                createDao={handleCreateProject}
              />
            )}
            {currentStep === 6 && (
              <Congrats
                onSubmit={() => {
                  if (language == 'English') {
                    setCurrentStep(currentStep + 2);
                  } else {
                    setCurrentStep(currentStep + 1);
                  }
                }}
              />
            )}
            {currentStep === 7 && (
              <TranslationForm
                onKeyDown={(val: Node[]) => setTranslation(val)}
                onSubmit={handleUpdateTranslation}
                translation={translation}
                pending={
                  updateTranslationStatus === 'confirming' ||
                  updateTranslationStatus === 'waiting' ||
                  isPinPending
                }
                reset={() => setTranslation(undefined)}
                onNextStep={() => setCurrentStep(currentStep + 1)}
              />
            )}
            {currentStep === 8 && (
              <CoverImageForm
                captureFile={captureFile}
                imgFile={imgFile}
                imgBuffer={imgBuffer}
                onNextStep={() => setCurrentStep(currentStep + 1)}
                onSubmit={submitImage}
                pending={isUploadingImage}
                reset={() => setCoverImgIPFS('')}
              />
            )}
            {currentStep === 9 && (
              <BlurbForm
                blurb={blurb}
                onKeyDown={(val: Node[]) => setBlurb(val)}
                onNextStep={() => setCurrentStep(currentStep + 1)}
                onSubmit={handleSetBlurb}
                pending={isPinPending}
                reset={() => setBlurb(undefined)}
              />
            )}
            {currentStep === 10 && (
              <GenreForm
                genre={genre}
                onGenreSet={(x: string) => setGenre(x)}
                onNextStep={() => setCurrentStep(currentStep + 1)}
                reset={() => setGenre('')}
              />
            )}
            {currentStep === 11 && (
              <SubtitleForm
                subtitle={subtitle}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSubtitle(e.target.value)
                }
                onNextStep={() =>
                  setCurrentStep(currentStep + (nothingConfigured ? 2 : 1))
                }
                reset={() => setSubtitle('')}
              />
            )}
            {currentStep === 12 && (
              <ConfigReviewForm
                genre={genre}
                subtitle={subtitle}
                blurb={blurb}
                imgFile={imgFile}
                loading={
                  configureStatus === 'confirming' ||
                  configureStatus === 'waiting' ||
                  isPinPending
                }
                blurbIPFS={blurbIPFS}
                onSubmit={handleConfigure}
              />
            )}
            {currentStep === 13 && (
              <ContributorsForm
                contributors={contribs}
                contributorsList={contributorsList}
                loading={
                  setContributorsStatus === 'confirming' ||
                  setContributorsStatus === 'waiting'
                }
                onChange={(idx, key, val) =>
                  setContribs({
                    ...contribs,
                    [idx]: { ...contribs[idx], [key]: val },
                  })
                }
                onNextStep={() => setCurrentStep(currentStep + 1)}
                onSubmit={handleSetContributors}
              />
            )}
            {currentStep === 14 && (
              <Finished
                projectId={projectId}
                onStartAuctions={handleStartAuctions}
              />
            )}
          </Form>
        </FormWrapper>
      </Content>
    </Root>
  );
};

export default Create;
