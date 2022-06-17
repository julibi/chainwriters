import { useRouter } from 'next/router';
import styled from 'styled-components';
import React, { useCallback, useEffect, useState } from 'react';
import { truncateAddress } from '../../../components/WalletIndicator';
import useShowText from '../../../hooks/useShowText';
import Loading from '../../../components/Loading';
import TypeWriter from '../../../components/TypeWriter';
import {
  BASE_BORDER_RADIUS,
  BASE_BOX_SHADOW,
  PLAIN_WHITE,
} from '../../../themes';

const animation = (animationseconds: number) => `
  animation: fadein ${animationseconds}s;

  @keyframes fadein {
      from { opacity: 0; }
      to   { opacity: 1; }
  }
`;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem;

  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${BASE_BOX_SHADOW};
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
  font-family: 'Roboto Mono Bold', Serif;
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const Title = styled.h1``;

const Wrapper = styled.div`
  padding-inline: 2rem;
  margin-block-end: 1rem;

  ${animation(2)}
`;

const SubTitle = styled.h3`
  font-family: 'Roboto Mono Bold', Serif;
`;

const Author = styled.h3`
  font-family: 'Roboto Mono Bold', Serif;
`;

const TextWrapper = styled.div`
  flex: 1;
  padding: 2rem;
  margin-block-end: 1rem;

  ${animation(4)};
`;

const Text = styled.p``;

interface ReadData {
  author: string;
  title: string;
  subtitle?: string;
  genre?: string;
  textIpfsHash: string;
  createdAt: string;
}

const Read = () => {
  const router = useRouter();
  let projectAddress = router.query.projectAddress;
  projectAddress = Array.isArray(projectAddress)
    ? projectAddress[0]
    : projectAddress;
  const getShowText = useShowText(projectAddress as string);
  const [isNFTOwner, setIsNFTOwner] = useState<boolean>(false);
  const [data, setData] = useState<ReadData | null>(null);
  const [mainText, setMainText] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleClickGoBack = useCallback(
    (e) => {
      e.preventDefault();
      router.push(`/projects/${projectAddress}`);
    },
    [projectAddress, router]
  );

  const fetchIsAllowed = useCallback(async () => {
    setLoading(true);
    const context = await getShowText();
    if (context) {
      const { allowed, text, readingData } = context;
      setIsNFTOwner(allowed);
      setData(readingData);
      setMainText(text);
      setLoading(false);
      return;
    }
    setLoading(false);
  }, [getShowText]);

  useEffect(() => {
    fetchIsAllowed();
  }, [fetchIsAllowed]);

  if (loading && !data) {
    return (
      <Root>
        <Loading height={530} />
      </Root>
    );
  }

  if (!isNFTOwner && !loading) {
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
            text={data.title}
          />
        </TitleWrapper>
        <BackArrow onClick={handleClickGoBack}>
          Back to Project
          <Arrow className="arrow" />
        </BackArrow>
      </TopRow>
      <FlexWrapper>
        {data.subtitle && (
          <Wrapper>
            <SubTitle>{data.subtitle}</SubTitle>
          </Wrapper>
        )}
        <Wrapper>
          <Author>{`By ${truncateAddress(data.author)}`}</Author>
        </Wrapper>
      </FlexWrapper>
      <TextWrapper>
        <Text>{mainText}</Text>
      </TextWrapper>
    </Root>
  );
};

export default Read;
