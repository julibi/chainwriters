import React from 'react';
import styled from 'styled-components';
import { SectionTitle, SectionTitleWrapper } from './ProjectSection';
import { BG_DARK, FadeInBaseAnimation, PINK, PLAIN_WHITE } from '../../themes';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 8rem 8rem 8rem;

  @media (max-width: 900px) {
    padding: 0 2rem 2rem 2rem;
  }
`;

const BlocksWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 4rem;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const AuthorBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 45%;
  ${FadeInBaseAnimation}
  animation-delay: 3s;
  background-color: ${BG_DARK};
  border-radius: 20px;
  padding: 2rem;

  @media (max-width: 900px) {
    width: 100%;
    margin-block-end: 2rem;
  }
`;

const ReaderBlock = styled.div`
  width: 45%;
  ${FadeInBaseAnimation}
  background-color: ${BG_DARK};
  color: ${PINK};

  background-color: ${BG_DARK};
  border-radius: 20px;
  padding: 2rem;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const Text = styled.p`
  max-width: 1000px;
  display: inline-block;
  font-size: 24px;
  line-height: 24px;

  :after {
    content: '';
    width: 100%;
    height: 1em;
    display: inline-block;
  }
`;

const SubHeader = styled.h3`
  font-family: 'Roboto Mono Bold', serif;
  font-size: 24px;
  text-align: center;
  text-transform: uppercase;
  margin-block-start: 0;
`;

const MainSellingPointsSection = () => {
  return (
    <Root>
      <SectionTitleWrapper>
        <SectionTitle>What is Peppermint Poets?</SectionTitle>
      </SectionTitleWrapper>
      <BlocksWrapper>
        <AuthorBlock>
          <SubHeader style={{ color: PINK }}>Authors</SubHeader>
          <Text>{'Publish and sell your text as an NFT collection'}</Text>
          <Text>{'Receive creator royalties'}</Text>
          <Text>{'Create a community of readers and connect with it'}</Text>
        </AuthorBlock>
        <ReaderBlock>
          <SubHeader style={{ color: PLAIN_WHITE }}>Collectors</SubHeader>
          <Text>{'Find works that you like'}</Text>
          <Text>{'Collect superrare NFTs and unlock the text'}</Text>
          <Text>{'Be part of an exclusive community'}</Text>
          <Text>{'(Beta) Vote with the NFTs'}</Text>
        </ReaderBlock>
      </BlocksWrapper>
    </Root>
  );
};

export default MainSellingPointsSection;
