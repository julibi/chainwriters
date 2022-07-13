import React from 'react';
import styled from 'styled-components';
import { SectionTitle, SectionTitleWrapper } from './ProjectSection';
import { BG_DARK, PINK, INTER_BOLD, INTER_LIGHT } from '../../themes';

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
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 4rem;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;

const AuthorBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 45%;
  max-width: 600px;
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
  max-width: 600px;
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
  font-family: ${INTER_LIGHT};
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
  font-family: ${INTER_BOLD};
  font-size: 24px;
  text-align: center;
  margin-block-start: 0;
`;

const MainSellingPointsSection = () => {
  return (
    <Root>
      <SectionTitleWrapper>
        <SectionTitle>What is Moonpage?</SectionTitle>
      </SectionTitleWrapper>
      <BlocksWrapper>
        <AuthorBlock>
          <SubHeader>Creators</SubHeader>
          <Text>{'Publish and sell your text as NFT collection'}</Text>
          <Text>{'Receive creator royalties'}</Text>
          <Text>{'Create a community of readers'}</Text>
        </AuthorBlock>
        <ReaderBlock>
          <SubHeader>Collectors</SubHeader>
          <Text>{'Collect text NFT gems and unlock the content'}</Text>
          <Text>{'Be part of an exclusive community'}</Text>
          <Text>{'(Beta) Vote with the NFTs'}</Text>
        </ReaderBlock>
      </BlocksWrapper>
    </Root>
  );
};

export default MainSellingPointsSection;
