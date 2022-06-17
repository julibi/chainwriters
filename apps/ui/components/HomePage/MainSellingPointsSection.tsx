import React from 'react';
import styled from 'styled-components';
import { SectionTitle, SectionTitleWrapper } from './ProjectSection';
import { BG_DARK, FadeInBaseAnimation, PINK } from '../../themes';

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
  width: 45%;
  ${FadeInBaseAnimation}
  animation-delay: 3s;
`;

const ReaderBlock = styled.div`
  width: 45%;
  ${FadeInBaseAnimation}
  background-color: ${BG_DARK};
  color: ${PINK};
  padding: 3rem;
`;

const MainSellingPointsSection = () => {
  return (
    <Root>
      <SectionTitleWrapper>
        <SectionTitle>What is Peppermint Poets?</SectionTitle>
      </SectionTitleWrapper>
      <BlocksWrapper>
        <AuthorBlock>
          <div>{'• Publish your Work as NFT'}</div>
          <br />
          <div>{'• Create a community of readers and connect with it'}</div>
          <br />
          <div>{'• Receive Creator royalties'}</div>
        </AuthorBlock>
        <ReaderBlock>
          <div>{'• Find works that you like'}</div>
          <br />
          <div>{'• Buy their NFTs to read'}</div>
          <br />
          <div>{'• Vote with the NFTs - be part of a community'}</div>
        </ReaderBlock>
      </BlocksWrapper>
    </Root>
  );
};

export default MainSellingPointsSection;
