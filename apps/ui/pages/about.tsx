import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import {
  POP,
  FONT_SERIF_BOLD,
  StyledLink,
  FONT_SERIF_REGULAR,
} from '../themes';
import LinkWrapper from '../components/LinkWrapper';
import Title from '../components/Title';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-block-start: 3rem;
  font-family: ${FONT_SERIF_REGULAR};
`;

const Content = styled.div`
  padding: 0 3rem 3rem 3rem;

  @media (max-width: 900px) {
    padding: 0;
  }
`;

const SubHeader = styled.h3`
  font-family: ${FONT_SERIF_BOLD};
  text-align: center;
  font-size: 32px;
`;

const QAWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3rem 2rem;
`;

const CoFoundersWrapper = styled.div`
  margin: 5rem 0 3rem 0;

  @media (max-width: 900px) {
    margin: 5rem 0 2rem 0;
  }
`;

const CoFounders = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  padding: 3rem;

  @media (max-width: 900px) {
    padding: 3rem 2rem;
  }
`;

const CoFounder = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
`;

const CoFounderWithMarginBottom = styled(CoFounder)`
  @media (max-width: 900px) {
    margin-block-end: 3rem;
  }
`;

const Text = styled.p`
  max-width: 1000px;
  display: inline-block;
  font-size: 18px;
  line-height: 24px;

  :after {
    content: '';
    width: 100%;
    height: 1em;
    display: inline-block;
  }
`;

const CoFounderImgWrapper = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  overflow: hidden;
  margin-block-end: 3rem;

  span {
    width: 100% !important;
    height: 100% !important;

    img {
      object-fit: cover;
      // filter: grayscale(100%);
    }
  }
`;

const FounderDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Name = styled.span`
  display: inline-block;
  font-family: ${FONT_SERIF_BOLD};
  color: ${POP};
`;

const Field = styled.span`
  display: inline-block;
  font-family: ${FONT_SERIF_BOLD};
`;

const Introduction = styled(Text)`
  max-width: 300px;
  text-align: center;
  margin-block-start: 1rem;
`;

const About = () => {
  return (
    <Root>
      <Title>About</Title>
      <StyledLink href="https://docs.moonpage.io/">
        <Title size="m" color={POP} textAlign="center">
          Read the Moonpage Light Paper
        </Title>
      </StyledLink>
      <Content>
        <QAWrapper>
          <SubHeader>Why Moonpage?</SubHeader>
          <Text>{`There are different Web3 Publishing tools out there. Moonpage wants to focus on the writers and the craft and process of writing. We want to empower you to do more than just turning your text into one NFT and sell it. You know it best: writing is not just about three button clicks.`}</Text>
          <Text>{`We want to empower you to find early supporters when you start writing already, monetize your creative process, to experiment and gather a community around you to engage with. This way, you don’t have to write your novel for two years without knowing whether anyone will ever read it, without any financial backing. Start selling your NFTs in editions and let the hype build up! 
Become one of the first writers on the moon.`}</Text>
          <Text>{`As a publishing house or agency, you don't need to risk so much with one big publication. Let your authors experiment, see the resonance. And furthermore find new talents! Don't sleep on this upcoming new wave. Be a pioneer and join us.`}</Text>
        </QAWrapper>
        <QAWrapper>
          <SubHeader>Why Literary NFTs?</SubHeader>
          {/* <Text>{`What if you, as a writer, could publish your writings, earn the lion share, receive royalties and create communities around your work – all of this settled in a smart contract, where the rules are coded in an immutable ledger?`}</Text> */}
          <Text>{`The traditional publishing industry is a concentration of brilliant minds. They are doing a great job finding and forming talent and maintaining a high level of quality. But at the same time it is a system of strong gatekeepers. In avergage writers only get a 10% provision on the book they publish. Publishing houses are lacking liquidity and select only a handful of mostly already well known writers. Publishing a book is a big financial risk for both writers and publishing houses. It makes publishers scared to promote new faces and hard for young writers to ever reach their audience. A lot of writers – especially young ones – struggle to find a platform for their writing. „Gifted, bohemian, penniless writer“ might sound cool in theory but in reality it’s a frustrating hassle. Trust us, we‘ve been there ourselves!`}</Text>
          <Text>{`Web2 Publishing has become an alternative for many. But Web3 lets us explore many more possibilities: it’s easy for creative writers to reach their readers and experiment with their art while being empowered financially, because they are earning crypto currency. So why not infuse writing and publishing with the possibilities and the sheer fun and craziness of NFTs?`}</Text>
          <Text>{`Through NFTs literature collectibles become tradable and because they exist on a whole blockchain ecosystem and are not tied to a single application, they can become means of expression and attention with a much broader reach. This is what excites us! Sadly, less and less people are reading books and although we are consuming stories all the time through ads or streaming, we as a society seem to have forgotten to cherish the craft and the minds behind all of it. Web3 gives us the chance to infuse literature with the financial value and human attention that it really deserves.`}</Text>
          <Text>{`And when it comes to collecting: You never know if there’s a hidden Stephen King or Rilke among these web3 writers … Browse projects, read brand new stuff, get your literary NFTs of hidden future stars and see them moon!`}</Text>
        </QAWrapper>
        <QAWrapper>
          <SubHeader>Our History</SubHeader>
          <Text>{`We met in Hildesheim, Germany, in 2014, where we both studied
            Creative Writing. Works of Jack Kerouac, Bret Easton Ellis, Lucia
            Berlin, Leo Tolstoi and many more make our hearts beat faster! A few
            years after graduation Olivia had become a published and awarded
            writer and Juli had professionally immersed herself in web3
            code.`}</Text>
          <Text>
            {`After exchanging experiences of struggling as a writer and discussing
            how web3 technology could open new spaces for literature, we knew
            immediately, what we had to do: Moonpage. This is our dream. We are building, what we would've loved to have ourselves a few year back.`}
          </Text>
        </QAWrapper>
        <CoFoundersWrapper>
          <Title textAlign="center" width="100%">
            Team
          </Title>
          <CoFounders id="founders">
            <CoFounderWithMarginBottom>
              <CoFounderImgWrapper>
                <Image
                  src="/Juli.jpg"
                  quality={65}
                  layout="responsive"
                  height={'100%'}
                  width={'100%'}
                  alt={'Co-Founder Olivia'}
                  priority
                />
              </CoFounderImgWrapper>
              <FounderDescription>
                <Name>Juli</Name>
                <Field>Founder</Field>
                <Introduction>
                  Experienced software engineer specialising in Web3. As a
                  software engineer she has contributed to multiple well-known
                  NFT projects such as{' '}
                  <LinkWrapper url="https://www.polychainmonsters.com">
                    Polychain Monsters
                  </LinkWrapper>
                  {' ,'}
                  <LinkWrapper url="https://playlostglitches.com/">
                    The Lost Glitches
                  </LinkWrapper>
                  {' and '}
                  <LinkWrapper url="https://www.unic.ly/">Unicly</LinkWrapper>.
                </Introduction>
              </FounderDescription>
            </CoFounderWithMarginBottom>
            <CoFounder>
              <CoFounderImgWrapper>
                <Image
                  src="/Livitest.png"
                  quality={65}
                  layout="responsive"
                  height={'100%'}
                  width={'100%'}
                  alt={'Olivia'}
                  priority
                />
              </CoFounderImgWrapper>
              <FounderDescription>
                <Name>Olivia</Name>
                <Field>Advisor</Field>
                <Introduction>
                  Novelist and editor. Her novel{' '}
                  <LinkWrapper url="https://www.amazon.com/-/de/dp/B08S1SKVTB/ref=sr_1_1?__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=DYX2ZZ93KK68&keywords=lux+olivia+kuderewski&qid=1658173221&sprefix=lux+olivia+kuderewski%2Caps%2C140&sr=8-1">
                    Lux
                  </LinkWrapper>{' '}
                  was awarded the Prize of the Harbour Front Literature Festival
                  for the best German-language debut in 2021. In 2022, her
                  second novel{' '}
                  <LinkWrapper url="https://www.amazon.com/-/de/dp/B0B9T2H2ZQ/ref=sr_1_5?keywords=haha+heartbreak&qid=1665576640&qu=eyJxc2MiOiItMC4wMSIsInFzYSI6IjAuMDAiLCJxc3AiOiIwLjAwIn0%3D&sprefix=haha+heart%2Caps%2C161&sr=8-5">
                    Haha Heartbreak
                  </LinkWrapper>{' '}
                  was published by Voland & Quist.
                </Introduction>
              </FounderDescription>
            </CoFounder>
          </CoFounders>
        </CoFoundersWrapper>
      </Content>
    </Root>
  );
};

export default About;
