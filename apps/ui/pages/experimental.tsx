import { ChangeEvent, FormEvent, useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import {
  BASE_BORDER_RADIUS,
  ElementThemeProps,
  FONT_SERIF_BOLD,
  FONT_SERIF_REGULAR,
  POP,
} from '../themes';
import { useCollection } from '../hooks/collection';
import { useRouter } from 'next/router';
import ConfettiCanon from '../components/ConfettiCanon';
import useUploadTextToIpfs from '../hooks/useUploadTextToIpfs';
import ProgressBar from '../components/ProgressBar';
import Title from '../components/Title';
import { useTheme } from '../hooks/theme';
import { useIpfsClient } from '../hooks/useIpfsClient';
import InputField from '../components/InputField';
import ActionButton from '../components/ActionButton';
import Loading from '../components/Loading';
import Dropdown from '../components/Dropdown';
import TextForm from '../components/Create/TextForm';
import { serializeToMarkdown } from '../utils/serializeMarkdown';
import { Node } from 'slate';
import NameForm from '../components/Create/NameForm';
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
import { useManager } from '../hooks/manager';
import { parseEther } from '@ethersproject/units';
import { BigNumber } from 'ethers';

//https://openai.com/api/pricing/
// --> should be 900.000 tokens - each call is maxed at 200
// --> after 4.500 calls we gotta pay!

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

const PromptField = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;
const PromptInputs = styled.div`
  flex: 1;
  flex-direction: column;
  max-width: 230px;
`;

const PromptResults = styled.div`
  flex: 1;
  padding: 1rem 1rem 1rem 3rem;

  @media (max-width: 900px) {
    padding: 2rem 0 0 0;
  }
`;

const DropdownWrapper = styled.div`
  width: 100%;
  margin-block-end: 1rem;
`;

const Label = styled.label`
  font-family: ${FONT_SERIF_REGULAR};
  display: inline-block;
  margin-block-end: 0.5rem;
`;

const LoadingWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Result = styled.p`
  font-family: ${FONT_SERIF_BOLD};
`;

const PromptButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
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

type OpenAIInput = {
  type: string;
  mood: string;
  topic: string;
  words: string;
};

const Experimental = () => {
  const { createProject } = useFactory();
  const {
    configureProject,
    configureStatus,
    setContributors,
    setContributorsStatus,
  } = useManager();
  const { startAuctions } = useCollection();
  const theme = useTheme();
  const client = useIpfsClient();
  const { uploadText } = useUploadTextToIpfs();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [title, setTitle] = useState('');
  const [text, setText] = useState<Node[] | undefined>();
  const [language, setLanguage] = useState<string>('English');
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
  const [openAIInput, setOpenAIInput] = useState<OpenAIInput | null>(null);
  const [result, setResult] = useState();
  const [isLoadingAIResponse, setIsLoadingAIResponse] = useState(false);
  const [AIError, setAIError] = useState(null);

  const isValidPromptInput = useMemo(() => {
    return !!openAIInput?.type;
  }, [openAIInput]);

  const onSubmitAIPrompt = async (event) => {
    event.preventDefault();
    setResult(null);
    setIsLoadingAIResponse(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: openAIInput.topic,
          mood: openAIInput.mood,
          type: openAIInput.type,
          words: openAIInput.words,
        }),
      });
      const data = await response.json();
      setAIError(null);
      setResult(data.result);
    } catch (e) {
      console.log({ e });
      setAIError(
        'Sorry, something went wrong while trying to talk to the AI. Refresh and try again. (2)'
      );
    }
    setIsLoadingAIResponse(false);
  };

  const onContinueWithAIResult = () => {
    const serializedText: Node[] = serializeToMarkdown(result);

    if (
      (serializedText[0] as any).children[0].text === '' &&
      (serializedText[1] as any).children[0].text === ''
    ) {
      serializedText.splice(0, 2);
    }
    setText(serializedText);
    setCurrentStep(1);
  };

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
      text,
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

  const handleConfigure = useCallback(async () => {
    // TODO: add animationhash
    await configureProject({
      projectId,
      imgFile,
      imgHash: coverImgIPFS,
      animationHash: '',
      blurb,
      blurbHash: blurbIPFS,
      genre,
      subtitle,
      onSuccess: () => {
        setCurrentStep(currentStep + 1);
      },
    });
  }, [
    blurb,
    blurbIPFS,
    configureProject,
    coverImgIPFS,
    currentStep,
    genre,
    imgFile,
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

  const promptTextTypes = ['poem', 'haiku', 'story', 'lyrics', 'riddle'];
  const promptTextTypesOptions = promptTextTypes.map((option) => ({
    id: option,
    value: option,
    onSelect: () => {
      setOpenAIInput({
        ...openAIInput,
        type: option,
      });
    },
  }));

  const wordsUsed = useMemo(() => {
    if (openAIInput?.words) {
      const listOfwords = openAIInput.words.split(',');
      const listOfwordsFormatted = listOfwords
        .join(', ')
        .replace(/, ([^,]*)$/, ' and $1');
      const wordsContained =
        listOfwords.length >= 1 ? listOfwordsFormatted : '';
      return wordsContained;
    }
  }, [openAIInput?.words]);

  return (
    <Root>
      <Title color={POP} margin="0 0 4rem 0">
        Create
      </Title>
      <Content>
        <ProgressBarWrapper>
          <ProgressBar completed={currentStep ? (currentStep / 13) * 100 : 0} />
        </ProgressBarWrapper>

        <ConfettiCanon show={!!projectId} />
        <Form theme={theme}>
          {currentStep === 0 && (
            <PromptField>
              <Title>Tell the AI what kind of text you want.</Title>
              <br />
              <Container>
                <PromptInputs>
                  <Label>Format</Label>
                  <DropdownWrapper>
                    <Dropdown
                      options={promptTextTypesOptions}
                      placeholder="Select Text Type"
                      isDisabled={isLoadingAIResponse}
                      isRequiredField
                      width="100%"
                    />
                  </DropdownWrapper>
                  <InputField
                    disabled={isLoadingAIResponse}
                    label="Topic"
                    type="text"
                    isErrorPossible={false}
                    placeholder="Christmas"
                    value={openAIInput?.topic}
                    onChange={(e) =>
                      setOpenAIInput({
                        ...openAIInput,
                        topic: (e.target as HTMLTextAreaElement).value,
                      })
                    }
                    // error={Number(firstEdMintPrice) < 0.1 && 'At least 0.1 Matic.'}
                  />
                  <InputField
                    disabled={isLoadingAIResponse}
                    label="Mood"
                    isErrorPossible={false}
                    type="text"
                    placeholder="Scary"
                    value={openAIInput?.mood}
                    onChange={(e) =>
                      setOpenAIInput({
                        ...openAIInput,
                        mood: (e.target as HTMLTextAreaElement).value,
                      })
                    }
                  />
                  <InputField
                    disabled={isLoadingAIResponse}
                    label="Words"
                    isErrorPossible={false}
                    tooltipText="Comma-seperated list of words that should be used by AI"
                    type="text"
                    placeholder="heart, apple"
                    value={openAIInput?.words}
                    onChange={(e) =>
                      setOpenAIInput({
                        ...openAIInput,
                        words: (e.target as HTMLTextAreaElement).value,
                      })
                    }
                  />
                  <PromptButtonsWrapper>
                    <ActionButton
                      onClick={onSubmitAIPrompt}
                      disabled={!isValidPromptInput || isLoadingAIResponse}
                      loading={isLoadingAIResponse}
                      text="Generate Text"
                      margin="1rem 0 1rem 0"
                    />
                    <ActionButton
                      onClick={onContinueWithAIResult}
                      disabled={!isValidPromptInput || isLoadingAIResponse}
                      loading={isLoadingAIResponse}
                      text="Continue with Draft"
                      margin="1rem 0 1rem 0"
                    />
                  </PromptButtonsWrapper>
                </PromptInputs>
                <PromptResults>
                  {isValidPromptInput && (
                    <Title
                      padding="0 0 1rem 0"
                      size="m"
                      color={POP}
                      textAlign="left"
                    >{`AI will write ${
                      ['a', 'e', 'i', 'o', 'u'].includes(
                        openAIInput?.mood?.[0]?.toLowerCase()
                      )
                        ? 'an'
                        : 'a'
                    } ${openAIInput?.mood ?? ''} ${openAIInput?.type}${
                      openAIInput?.topic ? ' about ' + openAIInput.topic : ''
                    }.${wordsUsed ? ` Words used: ${wordsUsed}.` : ''}`}</Title>
                  )}
                  {result && !AIError && <Result>{result}</Result>}
                  {!result && AIError && <Result>{AIError}</Result>}
                  {isLoadingAIResponse && (
                    <LoadingWrapper>
                      <Loading height={30} dotHeight={30} />
                    </LoadingWrapper>
                  )}
                </PromptResults>
              </Container>
            </PromptField>
          )}
          {currentStep === 1 && (
            <TextForm
              onKeyDown={(val: Node[]) => setText(val)}
              onSubmit={() => setCurrentStep(currentStep + 1)}
              text={text as Node[]}
            />
          )}
          {currentStep === 2 && (
            <NameForm
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              onSubmit={() => setCurrentStep(currentStep + 1)}
              title={title}
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
                setCurrentStep(currentStep + 1);
              }}
            />
          )}
          {currentStep === 7 && (
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
          {currentStep === 8 && (
            <BlurbForm
              blurb={blurb}
              onKeyDown={(val: Node[]) => setBlurb(val)}
              onNextStep={() => setCurrentStep(currentStep + 1)}
              onSubmit={handleSetBlurb}
              pending={isPinPending}
              reset={() => setBlurb(undefined)}
            />
          )}
          {currentStep === 9 && (
            <GenreForm
              genre={genre}
              onGenreSet={(x: string) => setGenre(x)}
              onNextStep={() => setCurrentStep(currentStep + 1)}
              reset={() => setGenre('')}
            />
          )}
          {currentStep === 10 && (
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
          {currentStep === 11 && (
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
          {currentStep === 12 && (
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
          {currentStep === 13 && (
            <Finished
              projectId={projectId}
              onStartAuctions={handleStartAuctions}
            />
          )}
        </Form>
      </Content>
    </Root>
  );
};

export default Experimental;
