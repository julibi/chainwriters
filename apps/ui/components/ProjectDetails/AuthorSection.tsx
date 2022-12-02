import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import Emoji from '../Emojis';
import { BASE_BORDER_RADIUS, ElementThemeProps } from '../../themes';
import { useTheme } from '../../hooks/theme';
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

const Root = styled.section<ElementThemeProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 1200px;
  color: ${({ theme }) => theme.MAIN_TEXT_COLOR};
  margin-block-end: 2rem;
  padding: 2rem;
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${({ theme }) => theme.BASE_BOX_SHADOW};
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
  project: Project;
  projectId: string;
  refetch: VoidFunction;
}

const AuthorSection = ({
  currentEdition,
  project,
  projectId,
  refetch,
}: AuthorSectionProps) => {
  const theme = useTheme();
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
    if (project) {
      if (
        project.blurbIpfsHash ||
        project.imgIpfsHash ||
        project.genre ||
        project.subtitle
      ) {
        hasConfigured = true;
      }
    }
    return hasConfigured;
  }, [project]);

  const currentEndId = useMemo(
    () => (currentEdition ? Number(currentEdition.endId) : 0),
    [currentEdition]
  );

  const canTriggerNextEdition = useMemo(
    () => Number(project?.currentId) > currentEndId,
    [currentEndId, project?.currentId]
  );

  const calculatedProgress = useMemo((): number => {
    let percentage = 0;
    if (!project) return percentage;
    if (configured) {
      percentage = 50;
    }
    if (project.auctionsStarted) {
      percentage = 100;
    }
    return percentage;
  }, [project, configured]);

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
        imgFile: args.imgFile,
        imgHash: args.imgHash,
        animationHash: args.animationHash,
        blurb: args.blurb,
        blurbHash: args.blurbHash,
        genre: args.genre,
        subtitle: args.subtitle,
        onError: undefined,
        onSuccess: () => {
          setShowConfigureModal(false);
          refetch();
        },
      }),
    [configureProject, projectId, refetch]
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
      }),
    [projectId, refetch, setContributors]
  );

  const handleStartAuctions = useCallback(
    async (amountForCreator: number) =>
      await startAuctions({
        projectId,
        amountForCreator,
        initialMintPrice: project.initialMintPrice,
        onSuccess: () => {
          setShowAuthorMintModal(false);
          refetch();
        },
      }),
    [project.initialMintPrice, projectId, refetch, startAuctions]
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
              configured || project.auctionsStarted ? (
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
                disabled={configured || project.auctionsStarted}
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
              project.auctionsStarted || project.contributors?.length > 0 ? (
                <Flex>
                  <span>{'2) Add Contributors'}</span>
                  <Checkmark />
                </Flex>
              ) : (
                '2) Add Contributors (Optional)'
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
                  project.auctionsStarted ||
                  !!project.contributors?.length
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
              Number(project.premintedByAuthor) > 0 && !project.auctionsStarted
            }
            title={
              project.auctionsStarted ? (
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
                  project.auctionsStarted ||
                  !!Number(project.premintedByAuthor)
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
    <Root theme={theme}>
      <Title size="l">Project Settings</Title>
      {!project.auctionsStarted && beforeAuction()}
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
          project={project}
        />
      )}
    </Root>
  );
};

export default AuthorSection;
