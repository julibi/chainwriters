import { useRouter } from 'next/router';
import styled from 'styled-components';
import React, { useCallback, useState } from 'react';
import { truncateAddress } from '../../../components/WalletIndicator';
import useShowText from '../../../hooks/useShowText';
import { useGetProjectId } from '../../../hooks/projects';
import Loading from '../../../components/Loading';
import TypeWriter from '../../../components/TypeWriter';
import {
  BASE_BORDER_RADIUS,
  BASE_BOX_SHADOW,
  PLAIN_WHITE,
  INTER_BOLD,
} from '../../../themes';
import Toggle from '../../../components/Toggle';
import { serialize } from '../../../utils/serializeMarkdown';

import RichTextRead from '../../../components/RichTextRead';

const animation = (animationseconds: number) => `
  animation: fadein ${animationseconds}s;

  @keyframes fadein {
      from { opacity: 0; }
      to   { opacity: 1; }
  }
`;

const Root = styled.div`
  margin: 4rem 6rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${BASE_BOX_SHADOW};

  @media (max-width: 900px) {
    margin: 2rem 2rem;
  }
`;

const TopRow = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
`;

const BackArrow = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  z-index: 1;
  display: flex;
  align-items: center;

  :hover {
    cursor: pointer;
  }

  @media (max-width: 900px) {
    top: 1rem;
  }
`;

const Arrow = styled.i`
  border: solid ${PLAIN_WHITE};
  border-width: 0 2px 2px 0;
  display: inline-block;
  margin-inline-start: 0.5rem;
  padding: 3px;
  transform: rotate(320deg);
`;

const TitleWrapper = styled.div`
  padding: 2rem;
  font-size: 42px;
  font-family: ${INTER_BOLD};
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const Title = styled.h1`
  font-family: 'Inter';
  margin-block-start: 3rem;
  text-align: center;
`;

const Wrapper = styled.div`
  padding-inline: 2rem;
  margin-block-end: 1rem;

  ${animation(2)}
`;

const SubTitle = styled.h3`
  font-family: ${INTER_BOLD};
`;

const Author = styled.h3`
  font-family: ${INTER_BOLD};
`;

const TextWrapper = styled.div`
  flex: 1;
  padding: 2rem;
  margin-block-end: 1rem;

  ${animation(4)};
`;

const Text = styled.p``;

const ToggleWrapper = styled.div`
  width: 180px;
`;

const Read = () => {
  const router = useRouter();
  const projectId = useGetProjectId();
  const {
    allowedToRead,
    project,
    text,
    isLoading,
    translation,
    hasTranslation,
  } = useShowText(projectId);
  const [translationOn, setTranslationOn] = useState<boolean>(false);
  const handleClickGoBack = useCallback(
    (e) => {
      e.preventDefault();
      router.push(`/projects/${project.id}`);
    },
    [project, router]
  );
  console.log({ text });
  const handleToggle = (checked: boolean) => {
    setTranslationOn(checked);
  };

  if (isLoading && !project) {
    return (
      <Root>
        <Loading height={530} />
      </Root>
    );
  }

  if (!allowedToRead && !isLoading) {
    return (
      <Root>
        <Title>Sorry, you need to own an NFT to read this.</Title>
      </Root>
    );
  }

  return (
    <Root>
      <TopRow>
        <TitleWrapper>
          <TypeWriter
            cursor={false}
            shouldErase={false}
            shouldLoop={false}
            text={project.title}
          />
        </TitleWrapper>
        <BackArrow onClick={handleClickGoBack}>
          Back to Project
          <Arrow className="arrow" />
        </BackArrow>
      </TopRow>
      <FlexWrapper>
        {project.subtitle && (
          <Wrapper>
            <SubTitle>{project.subtitle}</SubTitle>
          </Wrapper>
        )}
        <Wrapper>
          <Author>{`By ${truncateAddress(project.creator)}`}</Author>
        </Wrapper>
      </FlexWrapper>
      {project.originalLanguage && (
        <Wrapper>
          <SubTitle>{`Original Language: ${project.originalLanguage}`}</SubTitle>
          {hasTranslation && (
            <ToggleWrapper>
              <Toggle
                label="Translation"
                onChange={handleToggle}
                isChecked={translationOn}
              />
            </ToggleWrapper>
          )}
        </Wrapper>
      )}
      <TextWrapper>
        {/* {translationOn && translation ? translation : text} */}
        {text && <RichTextRead text={text} />}
      </TextWrapper>
    </Root>
  );
};

export default Read;
