import React from 'react';
import styled from 'styled-components';
import { POP } from '../../themes';

import SlidingCard from '../SlidingCard';
import Title from '../Title';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 8rem 8rem 8rem;

  @media (max-width: 900px) {
    margin: 2rem;
  }
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: auto;
  grid-gap: 1rem;
  margin-block-end: 3rem;
`;

const authorSellingPoints = [
  {
    title: 'You could be the first cryptowriting wunderkind',
    text: 'You have written something. But you are having a hard time trying to get your work published? You want people to read your work and make a living from it? Does not have to be that way.',
  },
  {
    title: "It's so simple",
    text: "Write your text and we create NFTs out of it, so you can sell them. You don't need any technical knowledge. We do the heavy lifting for you.",
  },
  {
    title: 'You are in full control',
    text: "The copyright stays with you! You set the terms and configure your project freely. Moonpage project's are sold in editions. You set the price and amount for each edition and you determined when selling starts.",
  },
  {
    title: 'Earn the lion share',
    text: '85% of the earnings go to you. Unless you determine contributors and assign how much they get. You can determine up to three. E.G. Co-Writers, Translators, Editors, Marketers or Cover-Artists. Each time an NFT of your project is being resold on a marketplace, you get 4,9% of royalties.',
  },
  {
    title: 'Not only Perfection – Experimentation',
    text: 'Update the text as you go. No need to get it all right from the beginning. You can upload the first chapter, start selling and getting feedback. Seeing what works. You can add more chapters and fix typos. When you are done, "freeze" the data behind the NFT to signal the status to your readers.',
  },
  {
    title: 'Build an audience and a community',
    text: "Know your early supporters and interact with them. Start voting ballots regarding the NFT utility or the progression of your story and let your project's NFT holders vote!",
  },
];

const MainSellingPointsSection = () => {
  return (
    <Root>
      <Title
        color={POP}
        margin="0 0 3rem 0"
        padding="0"
        size="l"
        textAlign="left"
      >
        You deserve a place to unleash your creativity.
      </Title>
      <Cards>
        {authorSellingPoints.map((point, index) => (
          <SlidingCard
            key={index}
            delay={index}
            title={point.title}
            text={point.text}
          />
        ))}
      </Cards>
      <Title
        color={POP}
        margin="1rem 1rem 3rem 1rem"
        size="l"
        textAlign="right"
      >
        No, you’re not buying a digital book.
      </Title>
      <Cards>
        <SlidingCard delay={0} />
        <SlidingCard delay={1} />
        <SlidingCard delay={2} />
        <SlidingCard delay={3} />
      </Cards>
    </Root>
  );
};

export default MainSellingPointsSection;
