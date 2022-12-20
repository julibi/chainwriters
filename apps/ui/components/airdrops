import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import {
  SectionTitle,
  SectionTitleWrapper,
} from '../components/HomePage/ProjectSection';

import { truncateAddress } from '../components/WalletIndicator';
import useMoonpageAirdrop from '../hooks/useMoonpageAirdrop';
import {
  FONT_SERIF_BLACK,
  FONT_SERIF_BOLD,
  FONT_SERIF_REGULAR,
} from '../themes';
import ActionButton from '../components/ActionButton';
import { getGasMargin } from '../utils/getGasMargin';

const airdropItems = [
  {
    title: 'You, In Time',
    subtitle: "A New Year's Gift",
    author: '0xf61F0326822721139cEDE8DE0886Bf84F5580a98',
    image:
      'https://moonpage-metadata-backend-prod.herokuapp.com/file/project-16',
    genre: 'Poetry',
    blurb:
      'This is the first NFT airdropped by Moonpage to our early supporters as a Christmas and New Year’s Gift. 2022 is coming to an end and it may have a different meaning to each of us. But whatever happened in our 2022, we believe the last days of a year are a good time to take a little breather and reflect. So for this project, we paired up with a talented young @schmorfer (twitter), @drioko (instagram) from Portugal.  He is gifting you a poem that will accompany you during this special season.',
    start: '2022-12-21',
    end: '2023-01-04',
    running: true,
  },
];

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3rem;

  @media (max-width: 900px) {
    margin: 3rem 2rem;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem;

  @media (max-width: 900px) {
    padding: 0;
  }
`;

const AirdropItem = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 800px;
  font-family: ${FONT_SERIF_REGULAR};

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  margin-inline-end: 2rem;

  @media (max-width: 900px) {
    margin-block-end: 2rem;
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
`;

const Title = styled.h2`
  font-family: ${FONT_SERIF_BOLD};
`;

const Bold = styled.span`
  font-family: ${FONT_SERIF_BLACK};
`;

const Airdrops = () => {
  const MoonpageAirdrop = useMoonpageAirdrop();
  const [isLoading, setIsLoading] = useState(false);

  const handleClaim = useCallback(async () => {
    try {
      setIsLoading(true);

      const { maxFeePerGas, maxPriorityFeePerGas } = await getGasMargin();

      const Tx = await MoonpageAirdrop.claim({
        maxFeePerGas,
        maxPriorityFeePerGas,
      });
      const { hash } = Tx;

      MoonpageAirdrop.provider.once(hash, async (transaction) => {
        toast.info('Successfully claimed!');
        setIsLoading(false);
      });
    } catch (e) {
      setIsLoading(false);
      console.log({ e });
      toast.info(
        e?.data?.message
          ? e.data.message.split(':')[1].trim()
          : 'Not registered for this airdrop.'
      );
    }
  }, [MoonpageAirdrop]);

  return (
    <Root>
      <SectionTitleWrapper>
        <SectionTitle>Airdrops</SectionTitle>
      </SectionTitleWrapper>
      <Content>
        {airdropItems?.map((item, idx) => (
          <AirdropItem key={idx}>
            <Left>
              <Image
                height={'400px'}
                width={'400px'}
                src={item.image}
                alt={'Cover Image'}
              />
              <ActionButton
                onClick={handleClaim}
                width="100%"
                loading={isLoading}
                disabled={isLoading}
                text="Claim"
              />
            </Left>
            <Right>
              <Title>{item.title}</Title>
              <Bold>{item.subtitle}</Bold>
              <span>
                Poem in English By: <Bold>{truncateAddress(item.author)}</Bold>
              </span>
              <br />
              <p>{item.blurb}</p>
              <br />
              <Bold>
                Requirements: Follow moonpage on twitter & fill out form
              </Bold>
            </Right>
          </AirdropItem>
        ))}
      </Content>
    </Root>
  );
};

export default Airdrops;
