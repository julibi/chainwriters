import React, { useCallback } from 'react';
import styled from 'styled-components';
import { formatEther } from '@ethersproject/units';
import {
  BASE_BORDER_RADIUS,
  BASE_BOX_SHADOW,
  PINK,
  INTER_BOLD,
} from '../../themes';
import Countdown from '../Countdown';
import Loading from '../Loading';
import PieChart from '../PieChart';
import {
  Key,
  Val,
  StyledPrimaryButton,
} from '../../pages/projects/[projectId]';
import { BigNumber } from 'ethers';
import { ProjectData } from '../../state/projects/types';

const AuctionTitle = styled.h2`
  text-align: center;
  text-transform: uppercase;
  font-family: ${INTER_BOLD};
  margin-block-start: -1rem;
  margin-block-end: 3rem;
  padding: 0;
`;

const InfoBlock = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${BASE_BOX_SHADOW};

  @media (max-width: 900px) {
    width: 100%;
    margin-block-end: 2rem;
  }
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const PieChartWrapper = styled.div`
  display: inline-block;
  margin: 0 auto;
  margin-block: 2rem;
`;

interface AuctionSectionProps {
  projectData: ProjectData;
  loading: boolean;
  onRetriggerAuction: VoidFunction;
  onFetchCurrentPrice: VoidFunction;
  totalSupply: BigNumber;
  maxSupply: BigNumber;
  startingPrice: BigNumber;
}

const AuctionSection = ({
  projectData,
  loading,
  onFetchCurrentPrice,
  onRetriggerAuction,
  totalSupply,
  maxSupply,
  startingPrice,
}: AuctionSectionProps) => {
  const showsAuctionText = useCallback(() => {
    const now = Math.round(new Date().getTime() / 1000);

    if (!projectData) return;
    const { auctionsStarted, auctionsEnded, expiresAt } = projectData;
    if (auctionsEnded) {
      return <Key style={{ textAlign: 'center' }}>{'Auctions finished'}</Key>;
    }
    if (auctionsStarted) {
      if (expiresAt > now) {
        return (
          <>
            <Key>{'Auction ends in'}</Key>
            <Val
              style={{
                fontSize: '22px',
                color: `${PINK}`,
                fontFamily: 'Inter Bold',
              }}
            >
              <Countdown end={expiresAt} />
            </Val>
          </>
        );
      } else {
        return <Key style={{ textAlign: 'center' }}>{'Auction expired'}</Key>;
      }
    }
    return (
      <Key style={{ textAlign: 'center' }}>{'Auction Has Not Started Yet'}</Key>
    );
  }, [projectData]);

  return (
    <>
      <AuctionTitle>AUCTION</AuctionTitle>
      <FlexWrapper>
        <InfoBlock>{showsAuctionText()}</InfoBlock>
        <InfoBlock>
          <Key>{'Starting Price'}</Key>
          {projectData && (
            <Val>{`${formatEther(
              parseInt(projectData.editions[0].mintPrice._hex, 16).toString()
            )} MATIC`}</Val>
          )}
        </InfoBlock>
      </FlexWrapper>
      <PieChartWrapper>
        <PieChart part={Number(totalSupply)} whole={Number(maxSupply)} />
      </PieChartWrapper>
      <FlexWrapper style={{ marginBlockEnd: '0' }}>
        <InfoBlock>
          <Key>{'Minted'}</Key>
          <Val
            style={{
              fontSize: '22px',
              fontFamily: 'Inter Bold',
            }}
          >
            {totalSupply}
          </Val>
        </InfoBlock>
        {projectData.auctionsStarted && !projectData.auctionsEnded && (
          <>
            {Math.floor(Date.now() / 1000) > projectData.expiresAt ? (
              <StyledPrimaryButton
                onClick={onRetriggerAuction}
                disabled={loading}
              >
                {loading ? (
                  <Loading height={20} dotHeight={20} short />
                ) : (
                  'Retrigger Auction'
                )}
              </StyledPrimaryButton>
            ) : (
              <StyledPrimaryButton
                onClick={onFetchCurrentPrice}
                disabled={loading}
              >
                {loading ? (
                  <Loading height={20} dotHeight={20} short />
                ) : (
                  'Get Current Price'
                )}
              </StyledPrimaryButton>
            )}
          </>
        )}
        {(!projectData.auctionsStarted || projectData.auctionsEnded) && (
          <StyledPrimaryButton disabled>Get Current Price</StyledPrimaryButton>
        )}
      </FlexWrapper>
    </>
  );
};

export default AuctionSection;
