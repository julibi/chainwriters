import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { formatEther } from '@ethersproject/units';
import { BASE_BORDER_RADIUS, POP, ElementThemeProps } from '../../themes';
import Countdown from '../Countdown';
import PieChart from '../PieChart';
import { Project } from '../../providers/projects-provider/projects-provider.types';
import { BigNumber } from 'ethers';
import Title from '../Title';
import ActionButton from '../ActionButton';
import StartAuctionsModal from './StartAuctionsModal';
import { useCollection } from '../../hooks/collection';
import { useAuctions } from '../../hooks/auctions';
import { useTheme } from '../../hooks/theme';
import { formatEtherBigNumber } from '../../utils/formatEtherBigNumber';
import { Tooltip } from '../Tooltip';
import { useManager } from '../../hooks/manager';

const InfoBlock = styled.div<ElementThemeProps>`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${({ theme }) => theme.INSET_BASE_BOX_SHADOW};

  @media (max-width: 900px) {
    width: 100%;
    margin-block: 2rem;
  }
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-block-end: 2rem;

  @media (max-width: 900px) {
    flex-direction: column;
    margin-block-end: 0;
    margin-block-start: 2rem;
  }
`;

const PieChartWrapper = styled.div`
  display: inline-block;
  margin: 0 auto;
  margin-block: 2rem;
`;

interface AuctionSectionProps {
  project: Project;
  isAuthor: boolean;
  isGettingCurrentPrice: boolean;
  onRetriggerAuction: VoidFunction;
  onFetchCurrentPrice: VoidFunction;
  onStartAuctions: (amountForCreator: number) => void;
}

const AuctionSection = ({
  project,
  isAuthor,
  isGettingCurrentPrice,
  onFetchCurrentPrice,
  onRetriggerAuction,
  onStartAuctions,
}: AuctionSectionProps) => {
  const theme = useTheme();
  const { startAuctionsStatus } = useCollection();
  const { retriggerAuctionStatus } = useAuctions();
  const { deleteProjectStatus } = useManager();
  const [showStartAuctionsModal, setShowStartAuctionsModal] = useState(false);
  const totalSupply = useMemo(() => {
    if (project) {
      return project.mintCount;
    } else {
      return BigNumber.from('0');
    }
  }, [project]);

  const startAuctionsPending = useMemo(
    () =>
      startAuctionsStatus === 'confirming' || startAuctionsStatus === 'waiting',

    [startAuctionsStatus]
  );

  const deletePending = useMemo(
    () => ['confirming', 'waiting'].includes(deleteProjectStatus),
    [deleteProjectStatus]
  );

  const retriggerPending = useMemo(
    () =>
      isGettingCurrentPrice ||
      retriggerAuctionStatus === 'confirming' ||
      retriggerAuctionStatus === 'waiting',
    [isGettingCurrentPrice, retriggerAuctionStatus]
  );
  const maxSupply = useMemo(() => {
    if (project && project.editions) {
      const edition = project.editions ? project.editions[0] : undefined;
      return edition?.endId.sub(edition?.startId).add(BigNumber.from('1'));
    }
    return undefined;
  }, [project]);

  const showsAuctionText = useCallback(() => {
    const now = Math.round(new Date().getTime() / 1000);
    const { auctionsStarted, auctionsEnded, currentAuctionExpiresAt } = project;

    if (!project) return;
    if (auctionsEnded) {
      return (
        <InfoBlock theme={theme}>
          <Title size="xs">{'Auctions finished'}</Title>
        </InfoBlock>
      );
    }
    if (auctionsStarted) {
      if (Number(currentAuctionExpiresAt) > now) {
        return (
          <InfoBlock theme={theme}>
            <Title size="xs">{'Auction ends in'}</Title>
            <Title size="xs" color={POP}>
              <Countdown end={Number(currentAuctionExpiresAt)} />
            </Title>
          </InfoBlock>
        );
      } else {
        return (
          <InfoBlock theme={theme}>
            <Title size="xs">{'Auction expired'}</Title>
          </InfoBlock>
        );
      }
    }
    return isAuthor ? (
      <ActionButton
        disabled={startAuctionsPending || deletePending}
        loading={startAuctionsPending}
        margin="0"
        onClick={() => setShowStartAuctionsModal(true)}
        text="Start Auctions"
      />
    ) : (
      <InfoBlock theme={theme}>
        <Title size="xs">{'Auction Has Not Started Yet'}</Title>
      </InfoBlock>
    );
  }, [project, isAuthor, startAuctionsPending, deletePending, theme]);

  useEffect(() => {
    if (startAuctionsStatus === 'success') {
      setShowStartAuctionsModal(false);
    }
  }, [startAuctionsStatus]);

  return (
    <>
      <Title size="m">Auction</Title>
      <FlexWrapper>
        {showsAuctionText()}
        <InfoBlock theme={theme}>
          <Title size="xs">{`Starting Price ${formatEther(
            parseInt(project.editions[0].mintPrice._hex, 16).toString()
          )} MATIC`}</Title>
        </InfoBlock>
      </FlexWrapper>
      <PieChartWrapper>
        <PieChart part={Number(project.mintCount)} whole={Number(maxSupply)} />
      </PieChartWrapper>
      <FlexWrapper style={{ marginBlockEnd: '0' }}>
        <InfoBlock theme={theme}>
          <Title size="xs">{`Minted: ${Number(totalSupply)}`}</Title>
          <Title size="xs">
            <Tooltip
              content="Total Value Locked. Matic collected in this edition."
              theme={theme}
            >
              <span>{`TVL: ${formatEtherBigNumber(project.balance)}`}</span>
            </Tooltip>
          </Title>
        </InfoBlock>
        {project.auctionsStarted && !project.auctionsEnded && (
          <>
            {Math.floor(Date.now() / 1000) >
            Number(project.currentAuctionExpiresAt) ? (
              <ActionButton
                disabled={retriggerPending}
                loading={retriggerPending}
                margin="0"
                onClick={onRetriggerAuction}
                text="Retrigger Auction"
              />
            ) : (
              <ActionButton
                disabled={retriggerPending}
                loading={retriggerPending}
                margin="0"
                onClick={onFetchCurrentPrice}
                text="Get Current Price"
                web3Connectable
              />
            )}
          </>
        )}
        {(!project.auctionsStarted || project.auctionsEnded) && (
          <ActionButton
            disabled
            loading={false}
            margin="0"
            text="Get Current Price"
          />
        )}
      </FlexWrapper>
      {showStartAuctionsModal && (
        <StartAuctionsModal
          onClose={() => setShowStartAuctionsModal(false)}
          onStartAuctions={onStartAuctions}
          pending={startAuctionsPending}
        />
      )}
    </>
  );
};

export default AuctionSection;
