import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import {
  BaseButton,
  BASE_BORDER_RADIUS,
  BASE_BOX_SHADOW,
  FadeInBaseAnimation,
  INSET_BASE_BOX_SHADOW,
  PINK,
  PLAIN_WHITE,
  INTER_BOLD,
  StyledLink,
} from '../../themes';
import Title from '../Title';

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
  font-family: ${INTER_BOLD};
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

interface InstructionCompProps {
  index: number;
  onClick: (number) => void;
  currentStep: number;
  title: string;
  description: string[];
}

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
      <Title>How does it work?</Title>
      <StyledLink href="https://docs.moonpage.io/moonpage-docs/tutorials">
        <Title size="m">
          {`Step by step guide   `}
          <Image
            height={'34px'}
            width={'30px'}
            src={'/Docs.svg'}
            alt={'Team'}
            priority
          />
        </Title>
      </StyledLink>
      <Content>
        <NavButton disabled>Creators</NavButton>
        <Wrapper>
          <Authors>
            <InstructionComp
              index={1}
              currentStep={authorInstructionsStep}
              onClick={() => setAuthorInstructionsStep(1)}
              title="Create Your Project"
              // you don't have a wallet yet?
              // don't have MATIC yet?
              description={[
                `After connecting your wallet, go to the Create tab. Set the title, the text and the amount of NFTs in your first edition (Genesis Edition) – we guide you through the process step by step. You will find your project under the "Bookshelf“ tab later.`,
              ]}
            />
            <InstructionComp
              index={2}
              currentStep={authorInstructionsStep}
              onClick={() => setAuthorInstructionsStep(2)}
              title="Configure"
              description={[
                `Set the price for your NFTs. The first edition of all collections are called Genesis Edition. Only your Genesis Edition will be sold in a dutch auction that can take up to 24 hours, means: you set the starting price and then it goes down continually, until the auction is over.`,
                `Once it sells out, you can unlock the next edition. In all following editions you can set a fixed minting price.`,
                `Next, set a cover image. This is what will be shown on marketplaces such as OpenSea. Specify a genre and write a blurb, to give potential collectors insight to your art before minting. Confirm and voilà, your project is created!`,
              ]}
            />
            <InstructionComp
              index={3}
              currentStep={authorInstructionsStep}
              onClick={() => setAuthorInstructionsStep(3)}
              title="Contributors"
              description={[
                `Optional: You can add up to 3 contributors. Maybe you want to share your income with an editor, a cover artist or a translator. Enter their wallet addresses, roles and shares. After an edition sells out, the revenue will be split, for example like this: editor - 15%, cover-artist - 5%, Moonpage project - 15%, YOU – 65%.`,
              ]}
            />
            <InstructionComp
              index={4}
              currentStep={authorInstructionsStep}
              onClick={() => setAuthorInstructionsStep(4)}
              title="Start Selling!"
              description={[
                `After finishing the creation flow, you are forwarded to your project's page. Scroll down and click on "Start Auctions".`,
                `This transaction transfers 1 NFT of your project to Moonpage and lets you claim some for yourself.`,
                `Congratulations! You have published your text to the Blockchain. Seriously... THIS IS BIG. Go tell everyone!`,
              ]}
            />
          </Authors>
          {/* <VideoWrapper>
            <Video
              url={'author_step_2.mov'}
              controls={false}
              loop
              muted
              playing
              playsinline
            />
          </VideoWrapper> */}
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
                `After connecting your wallet, click on the "Projects" tab. You can search for all kinds of texts here. Top projects are listed on the homepage right above this section.`,
              ]}
            />
            <InstructionComp
              index={2}
              currentStep={collectorInstructionsStep}
              onClick={() => setCollectorInstructionsStep(2)}
              title="Mint"
              description={[
                `The first edition of all collections are called Genesis Edition. Only the Genesis Edition NFTs are sold in a dutch auction. On a project's page click on the "Get Current Price" Button and mint, if it’s not a Genesis Edition, you can click on "mint" right away.`,
                `Confirm the transaction, wait for a moment and tadaaa! You own your first text NFT!`,
              ]}
            />
            <InstructionComp
              index={3}
              currentStep={collectorInstructionsStep}
              onClick={() => setCollectorInstructionsStep(3)}
              title="Bookshelf"
              description={[
                `As NFT owner, you see a little "READ" button on the cover of the matching project's page. Click on it to read. Or you can go to "Bookshelf", where you find a list of the NFTs you own.`,
                `Further features for NFT owners will be unlocked in the future, so hold on tight!`,
              ]}
            />
          </Collectors>
          {/* <VideoWrapper>
            <Video
              url={'author_step_2.mov'}
              controls={false}
              loop
              muted
              playing
              playsinline
            />
          </VideoWrapper> */}
        </CollectorsWrapper>
      </Content>
    </Root>
  );
};

export default HowItWorksSection;
