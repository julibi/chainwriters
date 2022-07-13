import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import {
  BaseButton,
  BASE_BORDER_RADIUS,
  BASE_BOX_SHADOW,
  FadeInBaseAnimation,
  INSET_BASE_BOX_SHADOW,
  PINK,
  PLAIN_WHITE,
  ROBOTO_FONT_BOLD,
} from '../../themes';

import { SectionTitle, SectionTitleWrapper } from './ProjectSection';

const Root = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 6rem 3rem 6rem;
  @media (max-width: 900px) {
    margin: 2rem;
  }
`;

const Content = styled.div`
  margin-block-start: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${INSET_BASE_BOX_SHADOW};
  margin-block-end: 3rem;
  padding: 2rem 2rem 0 2rem;

  @media (max-width: 900px) {
    flex-direction: column-reverse;
    padding: 2rem;
  }
`;

const NavButton = styled(BaseButton)`
  max-width: 200px;
  font-size: 24px;
  margin-block-end: 3rem;
`;

const Authors = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;

const Instruction = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-block-end: 1rem;

  @media (max-width: 900px) {
    width: 250px;
    margin-block-end: 0;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
`;

interface InstructionStepProps {
  active: boolean;
}

const InstructionStep = styled(BaseButton)<InstructionStepProps>`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  box-shadow: ${({ active }) =>
    active ? INSET_BASE_BOX_SHADOW : BASE_BOX_SHADOW};
  padding: 0;

  @media (max-width: 900px) {
    height: 40px;
    width: 40px;
    padding: 0;
  }
`;

const InstructionHeader = styled.h5`
  display: inline-block;
  color: ${PINK};
  font-family: ${ROBOTO_FONT_BOLD};
  font-size: 18px;
  margin: 1rem;

  @media (max-width: 900px) {
    font-size: 14px;
  }
`;

const InstructionDescription = styled.span`
  display: inline-block;
  margin: 0 1rem 1rem calc(50px + 1rem);
  color: ${PLAIN_WHITE};
  ${FadeInBaseAnimation};

  @media (max-width: 900px) {
    margin: 1rem 0 1rem 1rem;
  }
`;

const VideoWrapper = styled.div`
  width: 500px;
  margin: 0 auto;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

interface InstructionCompProps {
  index: number;
  onClick: (number) => void;
  currentStep: number;
  title: string;
  description: string[];
}

const Video = styled(ReactPlayer)`
  width: 500px !important;
  height: 100% !important;
  display: inline-block;

  @media (max-width: 900px) {
    width: 100% !important;
  }
`;

const Collectors = styled(Authors)`
  margin-inline-start: 2rem;

  @media (max-width: 900px) {
    margin-inline-start: 0;
  }
`;

const CollectorsWrapper = styled(Wrapper)`
  flex-direction: row-reverse;

  @media (max-width: 900px) {
    flex-direction: column;
    margin-block-end: 0;
  }
`;

const InstructionComp = ({
  currentStep,
  index,
  onClick,
  title,
  description,
}: InstructionCompProps) => {
  return (
    <Instruction>
      <Header>
        <InstructionStep
          active={currentStep === index}
          disabled={currentStep === index}
          onClick={() => onClick(index)}
        >
          {index}
        </InstructionStep>
        <InstructionHeader>{title}</InstructionHeader>
      </Header>
      {currentStep === index &&
        description.map((text, idx) => (
          <InstructionDescription key={idx}>{text}</InstructionDescription>
        ))}
    </Instruction>
  );
};

const HowItWorksSection = () => {
  const [authorInstructionsStep, setAuthorInstructionsStep] = useState<
    1 | 2 | 3 | 4
  >(1);
  const [collectorInstructionsStep, setCollectorInstructionsStep] = useState<
    1 | 2 | 3 | 4
  >(1);
  return (
    <Root id="howitworks">
      <SectionTitleWrapper>
        <SectionTitle>How does it work?</SectionTitle>
      </SectionTitleWrapper>
      <Content>
        <NavButton disabled>Authors</NavButton>
        <Wrapper>
          <Authors>
            <InstructionComp
              index={1}
              currentStep={authorInstructionsStep}
              onClick={() => setAuthorInstructionsStep(1)}
              title="Create Your Project"
              // you don't have a wallet yet?
              // don't have MATIC yet?
              // why polygon? coz cheap, fast and secure - might launch on more networks in the future
              description={[
                `After connecting your wallet, go to the Create tab in the navigation.
              You will be guided through the process step by step.`,
                `Set the title, input the text and set the amount of nfts
              you want to sell for the first edition, called Genesis Edition.
              Remember that you might want to claim some NFTs for yourself
              and that 2 NFTs always go to Moonpage automatically.`,
              ]}
            />
            <InstructionComp
              index={2}
              currentStep={authorInstructionsStep}
              onClick={() => setAuthorInstructionsStep(2)}
              title="Configure"
              description={[
                `Next, set the price. Each NFT of the Genesis Edition will be sold in dutch auction that can take up to 24 hours.
              The price you set is the starting price and during the course of the day it goes down.`,
                `Once an edition sells out, you will be able to unlock the next edition and sell more.
                But only the Genesis Edition is sold in a dutch auction.
              Following editions will be sold with fixed minting price that you determine.`,
                `Confirm and voila, your project is created!
                The next steps are optional but recommended.
                Set a cover image, this is what will be shown on marketplaces such as Opensea. Specify a genre and write a blurb,
                to give potential collectors insight to your text before minting.`,
              ]}
            />
            <InstructionComp
              index={3}
              currentStep={authorInstructionsStep}
              onClick={() => setAuthorInstructionsStep(3)}
              title="Claim your own NFTs"
              description={[
                `Almost there. Before you can trigger the auction, you have to claim an amount of the NFTs for yourself.
                This transaction will also transfer 2 NFTs to the Moonpage project.`,
                `Next, you can add up to 3 contributors. This is optional.`,
                `An example: You are sharing income with an editor and a cover artist. Enter their addresses, roles and shares.
                 After an edition sells out, the revenue will be split and transferred like this:`,
                `editor - 15%, cover-artist - 5%, Moonpage project - 15%, YOU – 65%.`,
              ]}
            />
            <InstructionComp
              index={4}
              currentStep={authorInstructionsStep}
              onClick={() => setAuthorInstructionsStep(4)}
              title="Start Selling!"
              description={[
                `After finishing the creation flow, you are forwarded to your project's page. Scroll down and click on "Trigger Auctions".`,
                `You can also find your project under "My bookshelf" in the navigation.`,
                `Congratulations! You have published your text to the Blockchain. Seriously... THIS IS BIG. Go tell everyone to mint your writing!`,
              ]}
            />
          </Authors>
          <VideoWrapper>
            <Video
              url={'author_step_2.mov'}
              controls={false}
              loop
              muted
              playing
              playsinline
            />
          </VideoWrapper>
        </Wrapper>
        <NavButton disabled>Collectors</NavButton>
        <CollectorsWrapper>
          <Collectors>
            <InstructionComp
              index={1}
              currentStep={collectorInstructionsStep}
              onClick={() => setCollectorInstructionsStep(1)}
              title="Browse Projects"
              description={[
                `After connecting your wallet, click on "Projects" in the navigation.`,
                `You can search or filter for all kinds of projects here. You can also find top projects on the homepage right below this section.`,
              ]}
            />
            <InstructionComp
              index={2}
              currentStep={collectorInstructionsStep}
              onClick={() => setCollectorInstructionsStep(2)}
              title="Mint"
              description={[
                `Every project is an ERC-1155 collection and each edition has a different ID,
                meaning that all Genesis Edition NFTs have the token ID 1, the second edition NFTs have the ID 2 etc.`,
                `Only the Genesis Edition NFTs are sold over a dutch auction. On a project's page click on the big "Get Current Price"-button.
                This will open a modal with the current price and the option to mint.
                If it is not a Genesis Edition, you will see the mint button right away. Click and confirm the transaction.`,
                `After a while the transaction will go through and tataaa, you are the owner of a literature NFT!`,
              ]}
            />
            <InstructionComp
              index={3}
              currentStep={collectorInstructionsStep}
              onClick={() => setCollectorInstructionsStep(3)}
              title="My Bookshelf"
              description={[
                `As an NFT owner, you see a little "READ" button on the cover of the matching project's page. Click on it to read.`,
                `Alternatively, you can go to "My Bookshelf", where you find a list of the NFTs you own, the ones you contributed to and the ones you created.`,
                `Further features for NFT + Genesis Edition NFT owners will be unlocked in the future, so hold on tight!`,
              ]}
            />
          </Collectors>
          <VideoWrapper>
            <Video
              url={'author_step_2.mov'}
              controls={false}
              loop
              muted
              playing
              playsinline
            />
          </VideoWrapper>
        </CollectorsWrapper>
      </Content>
    </Root>
  );
};

export default HowItWorksSection;
