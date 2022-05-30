import React, { useState } from 'react'
import styled from 'styled-components'
import { SectionTitle, SectionTitleWrapper } from './ProjectSection';
import { BG_DARK, FadeInBaseAnimation, PINK } from '../../themes'
import Typewriter from '../MyTypewriter'

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
  const [authorBulletIndex, setAuthorBulletIndex] = useState<number>(0);
  const [readerBulletIndex, setReaderBulletIndex] = useState<number>(0);
  const [showReaderBlock, setShowReaderBlock] = useState<boolean>(false);

  return (
    <Root>
      <SectionTitleWrapper>
        <SectionTitle>What is Peppermint Poets?</SectionTitle>
      </SectionTitleWrapper>
      <BlocksWrapper>
        <AuthorBlock>
          <Typewriter
            loop={1}
            cursor={false}
            deleteSpeed={0}
            fontSize={42}
            typedText={['• Publish your Work as NFT']}
            onLoopDone={() => {
              authorBulletIndex === 0 &&
                setAuthorBulletIndex(authorBulletIndex + 1);
            }}
          />
          <br />
          {authorBulletIndex > 0 && (
            <Typewriter
              loop={1}
              cursor={false}
              deleteSpeed={0}
              fontSize={42}
              typedText={[
                '• Create a community of readers and connect with it',
              ]}
              onLoopDone={() => {
                authorBulletIndex === 1 &&
                  setAuthorBulletIndex(authorBulletIndex + 1);
              }}
            />
          )}
          <br />
          {authorBulletIndex > 1 && (
            <Typewriter
              loop={1}
              cursor={false}
              deleteSpeed={0}
              fontSize={42}
              onLoopDone={() => {
                setShowReaderBlock(true);
              }}
              typedText={['• Receive Creator royalties']}
            />
          )}
        </AuthorBlock>
        {showReaderBlock && (
          <ReaderBlock>
            <Typewriter
              loop={1}
              cursor={false}
              deleteSpeed={0}
              fontSize={42}
              typedText={['• Find works that you like']}
              onLoopDone={() => {
                readerBulletIndex === 0 &&
                  setReaderBulletIndex(readerBulletIndex + 1);
              }}
            />
            <br />
            {readerBulletIndex > 0 && (
              <Typewriter
                loop={1}
                cursor={false}
                deleteSpeed={0}
                fontSize={42}
                typedText={['• Buy their NFTs to read']}
                onLoopDone={() => {
                  readerBulletIndex === 1 &&
                    setReaderBulletIndex(readerBulletIndex + 1);
                }}
              />
            )}
            <br />
            {readerBulletIndex > 1 && (
              <Typewriter
                loop={1}
                cursor={false}
                deleteSpeed={0}
                fontSize={42}
                typedText={['• Vote with the NFTs - be part of a community']}
              />
            )}
          </ReaderBlock>
        )}
      </BlocksWrapper>
    </Root>
  );
}

export default MainSellingPointsSection