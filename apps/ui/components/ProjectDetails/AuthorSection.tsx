import React, { useMemo } from 'react'
import styled from 'styled-components'
import {
  PLAIN_WHITE,
  BASE_BORDER_RADIUS,
  BASE_BOX_SHADOW,
  BG_NORMAL,
  DISABLED_WHITE,
  INSET_BASE_BOX_SHADOW,
  BaseButton,
  PINK,
} from '../../themes';
import { SectionTitle } from '../../components/ProjectSection'
import Emoji from '../Emojis'
import Checkmark from '../Checkmark'
import Loading from '../Loading'
import MoreDetails from '../MoreDetails'
import { ProjectData } from '../../state/projects/hooks'
import ProgressBar from '../ProgressBar'


const Root = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 1200px;
  color: ${PLAIN_WHITE};
  margin-block-end: 2rem;
  padding: 2rem;
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${BASE_BOX_SHADOW};
`;

const Title = styled(SectionTitle)`
  text-align: center;
  margin-block-end: 2rem;
  display: flex;
  flex-direction: column;
`;


interface TriggerButtonTypes {
  disabled: boolean;
}

const TriggerButton = styled(BaseButton)<TriggerButtonTypes>`
  background-color: ${BG_NORMAL};
  color: ${({ disabled }) => disabled ? DISABLED_WHITE : PINK};
  font-family: 'Roboto Mono Bold';
  width: 230px;
  margin: 1rem 1rem 0 0;
  padding: 1rem;

  :disabled {
    :hover {
      pointer-events: none;
    }
  }

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const ProgressBarWrapper = styled.div`
  width: 100%;
  margin-block-end: 2rem;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
`;

const ProgressBarIndicator = styled.span`
  display: inline-block;
  margin-inline-end: 1rem;
  margin-block-start: 0.5rem;
`;

const ActionItems = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

const Flex = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const DoneAction = styled.div`
  background-color: ${BG_NORMAL};
  color: ${DISABLED_WHITE};
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${INSET_BASE_BOX_SHADOW};
  font-family: 'Roboto Mono Bold';
  font-size: 13px;
  text-align: center;
  margin-block-start: 1rem;
  padding: 1rem;
  width: 230px;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

interface AuthorSectionProps {
  daoData: ProjectData;
  configurePending: boolean;
  contributorsPending: boolean;
  authorMintPending: boolean;
  triggerPending: boolean;
  unlockEditionPending: boolean;

  onConfigure: VoidFunction;
  onAddContributors: VoidFunction;
  onAuthorMint: VoidFunction;
  onTriggerFirstAuction: VoidFunction;
  onUnlockNextEdition: VoidFunction;
}

const AuthorSection = ({
  daoData,
  configurePending,
  contributorsPending,
  authorMintPending,
  triggerPending,
  unlockEditionPending,
  onConfigure,
  onAddContributors,
  onAuthorMint,
  onTriggerFirstAuction,
  onUnlockNextEdition
}: AuthorSectionProps) => {
  const canTriggerNextEdition = useMemo(() => {
    console.log({ daoData });
    let canTrigger = false;
    if (
      daoData &&
      daoData.currenEditionMaxSupply === daoData.currentEditionTotalSupply
    ) {
      canTrigger = true;
    }
    return canTrigger;
  }, [daoData]);

  const configured = useMemo(() => {
    let hasConfigured = false;
    if (daoData) {
      if (
        daoData.blurbIpfsHash ||
        daoData.imgIpfsHash ||
        daoData.genre ||
        daoData.subtitle
      ) {
        hasConfigured = true;
      }
    }
    return hasConfigured;
  }, [daoData]);

  const calculatedProgress = useMemo(():number => {
    let percentage = 0;
    if (!daoData) return percentage;
    if (configured) {
      percentage = 33;
    }
    if (daoData.premintedByAuthor > 0) {
      percentage = 66;
    }
    if (daoData.auctionsStarted) {
      percentage = 100;
    }
    return percentage;
  }, [daoData, configured]);

  const calculatedProgressIndicationText = useMemo(():string => {
    let text = 'Next: Configure';

    switch (calculatedProgress) {
      case 33:
        text = 'Next: Premint';
        break;
      case 66:
        text = 'Next: Start Auctions'
        break;
      case 100:
        text = 'Done!'
        break;
      default:
        break;
    }

    return text;
  }, [calculatedProgress]);

  return (
    <Root>
    <Title style={{ maxWidth: '300px' }}>
      Control Settings for Author
    </Title>
    <Title>
      Launching <Emoji symbol="🚀" label="Rocket" />
    </Title>
    <ProgressBarWrapper>
      <ProgressBar completed={calculatedProgress} />
      <ProgressBarIndicator>
        {calculatedProgressIndicationText}
      </ProgressBarIndicator>
    </ProgressBarWrapper>
    <ActionItems>
      <MoreDetails
        title={
          configured || daoData.auctionsStarted ? (
            <Flex>
              <span>{'1) Configure Project'}</span>
              <Checkmark />
            </Flex>
          ) : (
            '1) Configure Project'
          )
        }
        styles={{ marginBlockEnd: '1rem' }}
      >
        <>
          <p>
            Save more information about this work in the contract, to
            make your project more appealing and trustworthy. This
            action can only be done before triggering the auctions.
          </p>
          {configured || daoData.auctionsStarted ? (
            <DoneAction>{'Configure Project'}</DoneAction>
          ) : (
            <TriggerButton
              onClick={onConfigure}
              disabled={configurePending}
            >
              {configurePending ? (
                <Loading height={20} dotHeight={20} />
              ) : (
                'Configure Your Project'
              )}
            </TriggerButton>
          )}
        </>
      </MoreDetails>
      <MoreDetails
        title={
          daoData.auctionsStarted ||
          daoData.contributions.length > 0 ? (
            <Flex>
              <span>{'2) Add Contributors'}</span>
              <Checkmark />
            </Flex>
          ) : (
            '2) Add Contributors'
          )
        }
        styles={{ marginBlockEnd: '1rem' }}
      >
        <>
          <p>
            This is optional. You can specify what share of the fund
            contributors to your project will receive. This action can
            only be done before triggering the auctions.
          </p>
          {daoData.auctionsStarted ||
          daoData.contributions.length > 0 ? (
            <DoneAction>{'Add Contributors'}</DoneAction>
          ) : (
            <TriggerButton
              onClick={onAddContributors}
              disabled={contributorsPending}
            >
              {contributorsPending ? (
                <Loading height={20} dotHeight={20} />
              ) : (
                'Add Contributors'
              )}
            </TriggerButton>
          )}
        </>
      </MoreDetails>
      <MoreDetails
        open={
          daoData.premintedByAuthor === 0 &&
          (configured || daoData.contributions.length > 0)
        }
        title={
          daoData.premintedByAuthor > 0 ? (
            <Flex>
              <span>{`3) Minted Your ${daoData.premintedByAuthor} ${
                daoData.premintedByAuthor === 1 ? 'Copy' : 'Copies'
              }`}</span>
              <Checkmark />
            </Flex>
          ) : (
            '3) Mint Your Copies'
          )
        }
        styles={{ marginBlockEnd: '1rem' }}
      >
        <>
          <p>
            Make sure to claim some NFTs for yourself :) This is
            mandatory for triggering the auction in the next.
          </p>
          {daoData.premintedByAuthor > 0 ? (
            <DoneAction>{'Mint Your Copies'}</DoneAction>
          ) : (
            <TriggerButton
              onClick={onAuthorMint}
              disabled={authorMintPending}
            >
              {authorMintPending ? (
                <Loading height={20} dotHeight={20} />
              ) : (
                'Mint Your Copies'
              )}
            </TriggerButton>
          )}
        </>
      </MoreDetails>
      <MoreDetails
        open={
          daoData.premintedByAuthor > 0 && !daoData.auctionsStarted
        }
        title={
          daoData.auctionsStarted ? (
            <Flex>
              <span>{'4) Trigger Auctions'}</span>
              <Checkmark />
            </Flex>
          ) : (
            '4) Trigger Auctions'
          )
        }
        styles={{ marginBlockEnd: '1rem' }}
      >
        <>
          <p>
            Start the auctions for your Genesis Edition. Once you do
            that, you will not be able to configure or add
            contributors anymore. You need to claim your NFTs before
            you can trigger it.
          </p>
          {daoData.premintedByAuthor > 0 &&
          !daoData.auctionsStarted ? (
            <TriggerButton
              onClick={onTriggerFirstAuction}
              disabled={triggerPending}
            >
              {triggerPending ? (
                <Loading height={20} dotHeight={20} />
              ) : (
                'Trigger Auctions'
              )}
            </TriggerButton>
          ) : (
            <DoneAction>{'Trigger Auctions'}</DoneAction>
          )}
        </>
      </MoreDetails>
    </ActionItems>
    <Title style={{ marginBlockStart: '1rem' }}>Others</Title>
    <ActionItems>
      <MoreDetails
        open={canTriggerNextEdition}
        title={'Unlock Next Edition'}
        styles={{ marginBlockEnd: '1rem' }}
      >
        <>
          <p>
            When all NFTs of the last editions have sold out, you can
            lick off your next one!
          </p>
          {!canTriggerNextEdition ? (
            <DoneAction>{'Unlock Next Edition'}</DoneAction>
          ) : (
            <TriggerButton
              onClick={onUnlockNextEdition}
              disabled={unlockEditionPending}
            >
              {unlockEditionPending ? (
                <Loading height={20} dotHeight={20} />
              ) : (
                'Unlock'
              )}
            </TriggerButton>
          )}
        </>
      </MoreDetails>
    </ActionItems>
  </Root>
  )
}

export default AuthorSection