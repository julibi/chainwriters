import { useMemo, useState } from 'react';
import styled from 'styled-components';
import {
  BASE_BORDER_RADIUS,
  ElementThemeProps,
  FONT_SERIF_BOLD,
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

//https://openai.com/api/pricing/
// --> should be 900.000 tokens - each call is maxed at 200
// --> after 4.500 calls we gotta pay!

// Creating with Open AI
// Form
// what would you like to create ? - type
// about what topic ? - topic
// what should the mood of it be? - mood
// --> creates text,
// --> title
// genesis edition amount
// genesis edition price
// --> create
// the rest is the same as normal create just without
// - translation
// - original language (always English)

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
  margin-block-end: 3rem;
`;

const DropdownLabel = styled.span`
  margin-block-end: 1rem;
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
};

const Experimental = () => {
  const theme = useTheme();
  const client = useIpfsClient();
  const { uploadText } = useUploadTextToIpfs();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [title, setTitle] = useState('');
  const [text, setText] = useState<Node[] | undefined>();
  const [language, setLanguage] = useState<string>('');
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
  const [moodInput, setMoodInput] = useState('');
  const [typeInput, setTypeInput] = useState('');
  const [result, setResult] = useState();
  const [isLoadingAIResponse, setIsLoadingAIResponse] = useState(false);
  const isValidPromptInput = useMemo(() => {
    return !!openAIInput?.type;
  }, [openAIInput]);

  const onSubmit = async (event) => {
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
        }),
      });
      const data = await response.json();
      setResult(data.result);
    } catch (e) {
      console.log({ e });
    }
    setIsLoadingAIResponse(false);
  };

  const onContinueWithAIResult = () => {
    const serializedText: Node[] = serializeToMarkdown(result);
    console.log({ serializedText });
    setText(serializedText);
    setCurrentStep(1);
  };

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

  return (
    <Root>
      <Title color={POP} margin="0 0 4rem 0">
        Create
      </Title>
      <Content>
        <ProgressBarWrapper>
          <ProgressBar completed={currentStep ? (currentStep / 14) * 100 : 0} />
        </ProgressBarWrapper>

        <ConfettiCanon show={!!projectId} />
        <Form theme={theme}>
          <PromptField>
            <Title>Tell the AI what kind of text you want.</Title>
            <br />
            <Container>
              <PromptInputs>
                <InputField
                  disabled={isLoadingAIResponse}
                  label="Topic"
                  type="text"
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
                <DropdownWrapper>
                  <Dropdown
                    options={promptTextTypesOptions}
                    placeholder="Format"
                    isDisabled={isLoadingAIResponse}
                    width="100%"
                  />
                </DropdownWrapper>
                <PromptButtonsWrapper>
                  <ActionButton
                    onClick={onSubmit}
                    disabled={!isValidPromptInput || isLoadingAIResponse}
                    loading={isLoadingAIResponse}
                    text="Generate Text"
                    margin="0 0 3rem 0"
                  />
                  <ActionButton
                    onClick={onContinueWithAIResult}
                    disabled={!isValidPromptInput || isLoadingAIResponse}
                    loading={isLoadingAIResponse}
                    text="Continue with Result"
                    margin="1rem 0 0 0"
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
                  }.`}</Title>
                )}
                <Result>{result}</Result>
                {isLoadingAIResponse ? (
                  <LoadingWrapper>
                    <Loading height={30} dotHeight={30} />
                  </LoadingWrapper>
                ) : (
                  text
                )}
              </PromptResults>
            </Container>
          </PromptField>
          {currentStep === 1 && (
            <TextForm
              onKeyDown={(val: Node[]) => setText(val)}
              onSubmit={() => setCurrentStep(currentStep + 1)}
              text={text as Node[]}
            />
          )}
        </Form>
      </Content>
    </Root>
  );
};

export default Experimental;
