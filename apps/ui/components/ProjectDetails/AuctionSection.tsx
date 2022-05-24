import React, { useCallback } from 'react'
import styled from 'styled-components'
import { formatEther } from '@ethersproject/units'
import {
  BASE_BORDER_RADIUS,
  BASE_BOX_SHADOW,
  PINK,
} from '../../themes'
import Countdown from '../Countdown'
import Loading from '../Loading'
import PieChart from '../PieChart'
import { Key, Val, StyledPrimaryButton } from '../../pages/projects/[projectAddress]'
import { ProjectData } from '../../state/projects/hooks'

const AuctionTitle = styled.h2`
  text-align: center;
  text-transform: uppercase;
  font-family: 'Roboto Mono Bold';
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
  daoData: ProjectData;
  loading: boolean;
  onRetriggerAuction: VoidFunction;
  onFetchCurrentPrice: VoidFunction;
}

const AuctionSection = ({
  daoData,
  loading,
  onFetchCurrentPrice,
  onRetriggerAuction,
}: AuctionSectionProps) => {
  const showsAuctionText = useCallback(() => {
    const now = Math.round(new Date().getTime() / 1000);

    if (!daoData) return;
    const { auctionsStarted, auctionsEnded, expiresAt } = daoData;
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
                fontFamily: 'Nunito Sans Bold',
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
  }, [daoData]);

  return (
    <>
      <AuctionTitle>AUCTION</AuctionTitle>
      <FlexWrapper>
        <InfoBlock>{showsAuctionText()}</InfoBlock>
        <InfoBlock>
          <Key>{'Starting Price'}</Key>
          {daoData && (
            <Val>{`${formatEther(
              parseInt(
                // @ts-ignore
                daoData.editions[0].mintPrice._hex,
                16
              ).toString()
            )} MATIC`}</Val>
          )}
        </InfoBlock>
      </FlexWrapper>
      <PieChartWrapper>
        <PieChart
          part={daoData.totalSupplyGenEd}
          whole={daoData.editions[0].maxSupply}
        />
      </PieChartWrapper>
      <FlexWrapper style={{ marginBlockEnd: '0' }}>
        <InfoBlock>
          <Key>{'Minted'}</Key>
          <Val
            style={{
              fontSize: '22px',
              fontFamily: 'Nunito Sans Bold',
            }}
          >
            {daoData.totalSupplyGenEd}
          </Val>
        </InfoBlock>
        {daoData.auctionsStarted && !daoData.auctionsEnded && (
          <>
            {Math.floor(Date.now() / 1000) > daoData.expiresAt ? (
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
        {(!daoData.auctionsStarted || daoData.auctionsEnded) && (
          <StyledPrimaryButton disabled>Get Current Price</StyledPrimaryButton>
        )}
      </FlexWrapper>
    </>
  );
};

export default AuctionSection