import React, { useCallback, useMemo } from 'react';
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
import { Project } from '../../providers/projects-provider/projects-provider.types';
import { BigNumber } from 'ethers';

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
  project: Project;
  loading: boolean;
  onRetriggerAuction: VoidFunction;
  onFetchCurrentPrice: VoidFunction;
}

const AuctionSection = ({
  project,
  loading,
  onFetchCurrentPrice,
  onRetriggerAuction,
}: AuctionSectionProps) => {
  const totalSupply = useMemo(() => {
    if (project) {
      return project.mintCount;
    } else {
      return BigNumber.from('0');
    }
  }, [project]);

  const maxSupply = useMemo(() => {
    if (project && project.editions) {
      const edition = project.editions ? project.editions[0] : undefined;
      return edition?.endId.sub(edition?.startId).add(BigNumber.from('1'));
    }
    return undefined;
  }, [project]);

  const showsAuctionText = useCallback(() => {
    const now = Math.round(new Date().getTime() / 1000);

    if (!project) return;
    const { auctionsStarted, auctionsEnded, currentAuctionExpiresAt } = project;
    if (auctionsEnded) {
      return <Key style={{ textAlign: 'center' }}>{'Auctions finished'}</Key>;
    }
    if (auctionsStarted) {
      if (Number(currentAuctionExpiresAt) > now) {
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
              <Countdown end={Number(currentAuctionExpiresAt)} />
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
  }, [project]);

  return (
    <>
      <AuctionTitle>AUCTION</AuctionTitle>
      <FlexWrapper>
        <InfoBlock>{showsAuctionText()}</InfoBlock>
        <InfoBlock>
          <Key>{'Starting Price'}</Key>
          {project && (
            <Val>{`${formatEther(
              parseInt(project.editions[0].mintPrice._hex, 16).toString()
            )} MATIC`}</Val>
          )}
        </InfoBlock>
      </FlexWrapper>
      <PieChartWrapper>
        <PieChart part={Number(project.mintCount)} whole={Number(maxSupply)} />
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
            {Number(totalSupply)}
          </Val>
        </InfoBlock>
        {project.auctionsStarted && !project.auctionsEnded && (
          <>
            {Math.floor(Date.now() / 1000) >
            Number(project.currentAuctionExpiresAt) ? (
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
        {(!project.auctionsStarted || project.auctionsEnded) && (
          <StyledPrimaryButton disabled>Get Current Price</StyledPrimaryButton>
        )}
      </FlexWrapper>
    </>
  );
};

export default AuctionSection;
