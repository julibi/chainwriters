import { useRouter } from 'next/router';
import styled from 'styled-components';
import React, { useCallback, useMemo, useState } from 'react';
import { Node } from 'slate';
import useShowText from '../../../hooks/useShowText';
import { useGetProjectId } from '../../../hooks/projects';
import Loading from '../../../components/Loading';
import TypeWriter from '../../../components/TypeWriter';
import {
  BASE_BORDER_RADIUS,
  ElementThemeProps,
  FONT_SERIF_BOLD,
} from '../../../themes';
import Toggle from '../../../components/Toggle';
import RichTextRead from '../../../components/RichTextRead';
import Title from '../../../components/Title';
import RichText from '../../../components/Create/RichText';
import EditButton from '../../../components/EditButton';
import ActionButton from '../../../components/ActionButton';
import ProfileLink from '../../../components/ProfileLink';
import { useManager } from '../../../hooks/manager';
import useUploadTextToIpfs from '../../../hooks/useUploadTextToIpfs';
import { useTheme } from '../../../hooks/theme';

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
  box-shadow: ${({ theme }) => theme.BASE_BOX_SHADOW};

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

const Arrow = styled.i<ElementThemeProps>`
  border: solid ${({ theme }) => theme.MAIN_TEXT_COLOR};
  border-width: 0 2px 2px 0;
  display: inline-block;
  margin-inline-start: 0.5rem;
  padding: 3px;
  transform: rotate(320deg);
`;

const TitleWrapper = styled.div`
  padding: 2rem;
  font-size: 42px;
  font-family: ${FONT_SERIF_BOLD};
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const Wrapper = styled.div`
  padding-inline: 2rem;
  margin-block-end: 1rem;

  ${animation(2)}
`;

const SubTitle = styled.h3`
  font-family: ${FONT_SERIF_BOLD};
`;

const Author = styled.h3`
  font-family: ${FONT_SERIF_BOLD};
`;

const TextWrapper = styled.div`
  flex: 1;
  padding: 2rem;
  margin-block-end: 1rem;

  ${animation(4)};
`;

const EditButtonWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 90px;
`;

const Text = styled.p``;

const ToggleWrapper = styled.div`
  width: 180px;
`;

const RichTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Read = () => {
  const router = useRouter();
  const theme = useTheme();
  const projectId = useGetProjectId();
  const { uploadText } = useUploadTextToIpfs();
  const { updateText, updateTextStatus } = useManager();
  const {
    allowedToRead,
    isAuthor,
    isDeleted,
    project,
    text,
    textIpfsHash: originalTextIpfsHash,
    pending,
    translation,
    hasTranslation,
  } = useShowText(projectId);
  const [translationOn, setTranslationOn] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentText, setCurrentText] = useState<Node[] | undefined>();
  const [shouldResetToOriginal, setShouldResetToOriginal] =
    useState<boolean>(true);
  const textShownInEditor = useMemo(
    () => currentText ?? text,
    [text, currentText]
  );

  const handleClickGoBack = useCallback(
    (e) => {
      e.preventDefault();
      router.push(`/projects/${project.id}`);
    },
    [project, router]
  );

  const handleToggleTranslation = (checked: boolean) => {
    setTranslationOn(checked);
  };

  const handleToggleEditing = useCallback(() => {
    if (isEditing && shouldResetToOriginal) {
      setCurrentText(undefined);
    }
    setIsEditing(!isEditing);
  }, [isEditing, shouldResetToOriginal]);

  const handleUpdateText = useCallback(async () => {
    if (!text || !originalTextIpfsHash || !projectId) return null;
    const hash = await uploadText(currentText);
    await updateText({
      projectId,
      text: currentText,
      textIpfsHash: hash,
      oldTextIpfsHash: originalTextIpfsHash,
      onSuccess: () => {
        setShouldResetToOriginal(false);
        setIsEditing(false);
      },
      onError: undefined,
    });
  }, [
    currentText,
    originalTextIpfsHash,
    projectId,
    text,
    updateText,
    uploadText,
  ]);

  const correctText = useCallback(() => {
    if (text && !translationOn) {
      if (isAuthor && isEditing) {
        return (
          <RichTextWrapper>
            <RichText
              text={textShownInEditor}
              onKeyDown={(val: Node[]) => setCurrentText(val)}
              isDisabled={['confirming', 'waiting'].includes(updateTextStatus)}
            />
            <ActionButton
              onClick={handleUpdateText}
              text="Update"
              loading={['confirming', 'waiting'].includes(updateTextStatus)}
              disabled={['confirming', 'waiting'].includes(updateTextStatus)}
              margin="1rem 0 0 0"
            />
          </RichTextWrapper>
        );
      }
      return (
        <RichTextRead text={shouldResetToOriginal ? text : textShownInEditor} />
      );
    }
  }, [
    handleUpdateText,
    isAuthor,
    isEditing,
    shouldResetToOriginal,
    text,
    textShownInEditor,
    translationOn,
    updateTextStatus,
  ]);

  const correctTranslation = useCallback(() => {
    if (translation && translationOn) {
      if (isAuthor && isEditing) {
        return <RichText text={translation} onKeyDown={() => {}} />;
      }
      return <RichTextRead text={translation} />;
    }
  }, [isAuthor, isEditing, translation, translationOn]);

  if (!project || isDeleted) {
    return (
      <Root>
        <Title size="xl">{`The project you are looking for does not exist :(`}</Title>
      </Root>
    );
  }

  if (pending) {
    return (
      <Root>
        <Loading height={530} />
      </Root>
    );
  }

  // fix bug showing this for too long
  if (!allowedToRead && !pending) {
    return (
      <Root>
        <Title size="l">Sorry, you need to own an NFT to read this.</Title>
      </Root>
    );
  }

  return (
    <Root theme={theme}>
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
          <Arrow className="arrow" theme={theme} />
        </BackArrow>
      </TopRow>
      <FlexWrapper>
        {project.subtitle && (
          <Wrapper>
            <SubTitle>{project.subtitle}</SubTitle>
          </Wrapper>
        )}
        <Wrapper>
          <Author>
            <span>By </span>
            <ProfileLink account={project.creator} />
          </Author>
        </Wrapper>
      </FlexWrapper>
      {project.originalLanguage && (
        <Wrapper>
          <SubTitle>{`Original Language: ${project.originalLanguage}`}</SubTitle>
          {hasTranslation && (
            <ToggleWrapper>
              <Toggle
                label="Translation"
                onChange={handleToggleTranslation}
                isChecked={translationOn}
              />
            </ToggleWrapper>
          )}
        </Wrapper>
      )}
      <TextWrapper>
        {isAuthor && (
          <EditButtonWrapper>
            <EditButton
              disabled={!text || pending}
              onClick={handleToggleEditing}
              isEditing={isEditing}
            />
          </EditButtonWrapper>
        )}
        {correctText()}
        {correctTranslation()}
      </TextWrapper>
    </Root>
  );
};

export default Read;
