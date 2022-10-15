import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { PLAIN_WHITE, BASE_BORDER_RADIUS, BASE_BOX_SHADOW } from '../../themes';

import Emoji from '../Emojis';
import Checkmark from '../Checkmark';
import MoreDetails from '../../components/MoreDetails';
import ProgressBar from '../ProgressBar';
import ConfigureModal from './ConfigureModal';
import ContributorsModal from './ContributorsModal';
import {
  Edition,
  Project,
} from '../../providers/projects-provider/projects-provider.types';
import { useManager } from '../../hooks/manager';
import ActionButton from '../ActionButton';
import StartAuctionsModal from './StartAuctionsModal';
import { useCollection } from '../../hooks/collection';
import EnableNextEditionModal from './EnableNextEditionModal';
import Title from '../Title';

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

interface AuthorSectionProps {
  currentEdition?: Edition;
  projectData: Project;
  projectId: string;
  refetch: VoidFunction;
}

const AuthorSection = ({
  currentEdition,
  projectData,
  projectId,
  refetch,
}: AuthorSectionProps) => {
  const {
    configureProject,
    configureStatus,
    setContributors,
    setContributorsStatus,
    enableNextEdition,
    enableNextEditionStatus,
  } = useManager();
  const { startAuctions, startAuctionsStatus } = useCollection();
  const [showConfigureModal, setShowConfigureModal] = useState<boolean>(false);
  const [showContributorsModal, setShowContributorsModal] =
    useState<boolean>(false);
  const [showAuthorMintModal, setShowAuthorMintModal] =
    useState<boolean>(false);
  const [showEnableNextEditionModal, setShowEnableNextEditionModal] =
    useState(false);

  const configured = useMemo(() => {
    let hasConfigured = false;
    if (projectData) {
      if (
        projectData.blurbIpfsHash ||
        projectData.imgIpfsHash ||
        projectData.genre ||
        projectData.subtitle
      ) {
        hasConfigured = true;
      }
    }
    return hasConfigured;
  }, [projectData]);

  const currentEndId = useMemo(
    () => (currentEdition ? Number(currentEdition.endId) : 0),
    [currentEdition]
  );

  const canTriggerNextEdition = useMemo(
    () => Number(projectData.currentId) > currentEndId,
    [currentEndId, projectData.currentId]
  );

  const calculatedProgress = useMemo((): number => {
    let percentage = 0;
    if (!projectData) return percentage;
    if (configured) {
      percentage = 50;
    }
    if (projectData.auctionsStarted) {
      percentage = 100;
    }
    return percentage;
  }, [projectData, configured]);

  const calculatedProgressIndicationText = useMemo((): string => {
    let text = 'Next: Configure';

    switch (calculatedProgress) {
      case 50:
        text = 'Next: Start Auctions';
        break;
      case 100:
        text = 'Done!';
        break;
      default:
        break;
    }

    return text;
  }, [calculatedProgress]);

  const handleConfigure = useCallback(
    async (args) =>
      await configureProject({
        projectId,
        imgHash: args.imgHash,
        animationHash: args.animationHash,
        blurbHash: args.blurbHash,
        genre: args.genre,
        subtitle: args.subtitle,
        onError: undefined,
        onSuccess: () => {
          setShowConfigureModal(false);
          refetch();
        },
        refetchWithTimeout: true,
      }),
    [projectId, refetch, configureProject]
  );

  const handleSetContributors = useCallback(
    async (contributorsList) =>
      await setContributors({
        projectId,
        contributorsList,
        onError: undefined,
        onSuccess: () => {
          setShowContributorsModal(false);
          refetch();
        },
        refetchWithTimeout: true,
      }),
    [projectId, refetch, setContributors]
  );

  const handleStartAuctions = useCallback(
    async (amountForCreator: number) =>
      await startAuctions({
        projectId,
        amountForCreator,
        initialMintPrice: projectData.initialMintPrice,
        onSuccess: () => {
          setShowAuthorMintModal(false);
          refetch();
        },
      }),
    [projectData.initialMintPrice, projectId, refetch, startAuctions]
  );

  const handleEnableNextEdition = useCallback(
    async (price: string, amount: number) =>
      await enableNextEdition({
        projectId,
        amount,
        price,
        onSuccess: () => {
          setShowEnableNextEditionModal(false);
          refetch();
        },
      }),
    [enableNextEdition, projectId, refetch]
  );

  const beforeAuction = () => {
    return (
      <>
        <Title size="m" margin="0 0 3rem 0">
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
              configured || projectData.auctionsStarted ? (
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
                Save more information about this work in the contract, to make
                your project more appealing and trustworthy.
              </p>
              <ActionButton
                disabled={configured || projectData.auctionsStarted}
                text="Configure Your Project"
                loading={
                  configureStatus == 'confirming' ||
                  configureStatus == 'waiting'
                }
                onClick={() => setShowConfigureModal(true)}
              />
            </>
          </MoreDetails>
          <MoreDetails
            title={
              projectData.auctionsStarted ||
              projectData.contributors?.length > 0 ? (
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
                contributors to your project will receive. This action can only
                be done before triggering the auctions.
              </p>
              <ActionButton
                disabled={
                  setContributorsStatus === 'confirming' ||
                  setContributorsStatus === 'waiting' ||
                  projectData.auctionsStarted ||
                  !!projectData.contributors?.length
                }
                text="Add Contributors"
                loading={
                  setContributorsStatus === 'confirming' ||
                  setContributorsStatus === 'waiting'
                }
                onClick={() => setShowContributorsModal(true)}
              />
            </>
          </MoreDetails>
          <MoreDetails
            open={
              Number(projectData.premintedByAuthor) > 0 &&
              !projectData.auctionsStarted
            }
            title={
              projectData.auctionsStarted ? (
                <Flex>
                  <span>{'3) Start Auctions'}</span>
                  <Checkmark />
                </Flex>
              ) : (
                '3) Start Auctions'
              )
            }
            styles={{ marginBlockEnd: '1rem' }}
          >
            <>
              <p>
                Start the auctions for your Genesis Edition. Make sure to claim
                an amount of NFTs for yourself. At least 1 and max 4.
              </p>
              <ActionButton
                disabled={
                  startAuctionsStatus === 'confirming' ||
                  startAuctionsStatus === 'waiting' ||
                  projectData.auctionsStarted ||
                  !!Number(projectData.premintedByAuthor)
                }
                text="Start Auctions"
                loading={
                  startAuctionsStatus === 'confirming' ||
                  startAuctionsStatus === 'waiting'
                }
                onClick={() => setShowAuthorMintModal(true)}
              />
            </>
          </MoreDetails>
        </ActionItems>
      </>
    );
  };

  return (
    <Root>
      <Title size="l">Project Settings</Title>
      {!projectData.auctionsStarted && beforeAuction()}
      <Title size="m" margin="3rem 0 3rem 0">
        Editions
      </Title>
      <ActionItems>
        <MoreDetails
          open={canTriggerNextEdition}
          title={'Unlock Next Edition'}
          styles={{ marginBlockEnd: '1rem' }}
        >
          <>
            <p>
              When all NFTs of the last editions have sold out, you can start
              the next one!
            </p>
            <ActionButton
              disabled={
                !canTriggerNextEdition ||
                enableNextEditionStatus === 'confirming' ||
                enableNextEditionStatus === 'waiting'
              }
              text="Unlock Next Edition"
              loading={
                enableNextEditionStatus === 'confirming' ||
                enableNextEditionStatus === 'waiting'
              }
              onClick={() => setShowEnableNextEditionModal(true)}
            />
          </>
        </MoreDetails>
      </ActionItems>
      {showConfigureModal && (
        <ConfigureModal
          onClose={() => setShowConfigureModal(false)}
          onConfigure={handleConfigure}
          pending={
            configureStatus == 'confirming' || configureStatus == 'waiting'
          }
        />
      )}
      {showContributorsModal && (
        <ContributorsModal
          onClose={() => setShowContributorsModal(false)}
          onSetContributors={handleSetContributors}
          pending={
            setContributorsStatus === 'confirming' ||
            setContributorsStatus === 'waiting'
          }
        />
      )}

      {showAuthorMintModal && (
        <StartAuctionsModal
          onClose={() => setShowAuthorMintModal(false)}
          onStartAuctions={handleStartAuctions}
          pending={
            startAuctionsStatus === 'confirming' ||
            startAuctionsStatus === 'waiting'
          }
        />
      )}
      {showEnableNextEditionModal && (
        <EnableNextEditionModal
          onClose={() => setShowEnableNextEditionModal(false)}
          onEnableNextEdition={handleEnableNextEdition}
          pending={
            enableNextEditionStatus === 'confirming' ||
            enableNextEditionStatus === 'waiting'
          }
          project={projectData}
        />
      )}
    </Root>
  );
};

export default AuthorSection;
