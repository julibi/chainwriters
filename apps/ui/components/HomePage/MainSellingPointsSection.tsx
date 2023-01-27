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
    title: 'You could be the first cryptowriting wunderkind.',
    text: 'You are a writer. You want people to read your work. You want to make a living from it. Having a hard time trying to get published? Need feedback and financial support? You came to the right place.',
  },
  {
    title: 'Creative Process and Experimentation.',
    text: 'Update the text as you go. You can upload the first chapter, start selling and get feedback. Add more chapters and fix typos. When you are done, "freeze" the data behind the NFT to signal the status to your readers.',
  },
  {
    title: 'Slowly build a hype.',
    text: 'On Moonpage, you are not just selling your text as 1 NFT. You are selling your work in editions. Up to 1000 NFTs are reserved for your project.',
  },
  {
    title: "It's so simple.",
    text: "Upload text and follow our beautiful flow. We create NFTs out of it, so you can sell them. You don't need any technical knowledge. We do the heavy lifting for you. You only need a browser wallet.",
  },
  {
    title: 'You are in full control.',
    text: 'The copyright stays with you! You set the price and amount for each edition and determine when selling starts.',
  },
  {
    title: 'Earn the lion share and create a passive income stream.',
    text: '85% of the earnings go to you. Each time an NFT of your project is being resold on a marketplace, you get 4,9% of royalties for secondary sales. (Royalties coming soon.)',
  },
  {
    title: 'Build an audience and a community.',
    text: "Know your early supporters and engage with them. Start voting ballots regarding the NFT utility or the progression of your story and let your project's NFT holders vote!",
  },
];

const readerSellingPoints = [
  {
    title: 'This is the future of content.',
    text: 'By minting, you are directly supporting writers who may otherwise struggle to make a living off of their art.',
  },
  {
    title: 'Find Literary NFT gems.',
    text: 'Go to the "Projects" tab and find the next cryptowriting gem. A poem? A novel? An article?',
  },
  {
    title: 'Unlock the current text behind the NFT.',
    text: 'Go to a project\'s page, if you own an according NFT, you see a READ button. Click on it to read. Also, you can find all your Moonpage NFTs under the "Bookshelf" tab.',
  },
  {
    title: 'Vote with your NFTs. Be part of a community.',
    text: 'Writers can start votes regarding their project. Like "Hey, what do you want to use this NFT for? a) Private online reading b) Signed copy of my published book c) Should Character X die in the next chapter?" So vote!',
  },
  {
    title: 'More to come.',
    text: 'This is just the beginning. We have more features and utilities coming up, so stay tuned.',
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
        A place for your craft and creative process.
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
        {readerSellingPoints.map((point, index) => (
          <SlidingCard
            key={index}
            delay={index}
            title={point.title}
            text={point.text}
          />
        ))}
      </Cards>
    </Root>
  );
};

export default MainSellingPointsSection;
