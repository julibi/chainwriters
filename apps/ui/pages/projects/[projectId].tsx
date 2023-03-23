import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';
import { BigNumber } from 'ethers';
import Image from 'next/image';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import Blurb from './Blurb';
import ActionButton from '../../components/ActionButton';
import BaseModal from '../../components/BaseModal';
import NextLink from '../../components/NextLink';
import AuthorSection from '../../components/ProjectDetails/AuthorSection';
import AuctionSection from '../../components/ProjectDetails/AuctionSection';
import Checkbox from '../../components/Checkbox';
import Title from '../../components/Title';
import Loading from '../../components/Loading';
import MintSection from '../../components/ProjectDetails/MintSection';
import TooltippedIndicator from '../../components/TooltippedIndicator';
import { useCollection } from '../../hooks/collection';
import { useAuctions } from '../../hooks/auctions';
import { useGetProject } from '../../hooks/projects/useGetProject';
import { useGetProjectId } from '../../hooks/projects/useGetProjectId';
import useAuctionsManager from '../../hooks/useAuctionsManager';
import { useTheme } from '../../hooks/theme';
import useMoonpageManager from '../../hooks/useMoonpageManager';
import { formatNumber } from '../../utils/formatNumber';
import { getCoverImageUrl } from '../../utils/getCoverImageUrl';
import {
  BASE_BORDER_RADIUS,
  DISABLED_WHITE,
  POP,
  PrimaryButton,
  BaseButton,
  FONT_SERIF_BOLD,
  FONT_SERIF_REGULAR,
  ElementThemeProps,
} from '../../themes';
import { MOONPAGE_DEV_ADDRESS } from '../../../constants';
import {
  Edition,
  Project,
} from '../../providers/projects-provider/projects-provider.types';
import Votings from './Votings';
import { useBallotsFactory } from '../../hooks/ballotFactory';
import ProfileLink from '../../components/ProfileLink';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-block-start: 3rem;
  min-height: 700px;
`;

const MainInfoWrapper = styled.section<ElementThemeProps>`
  display: flex;
  width: 90%;
  max-width: 1200px;
  color: ${({ theme }) => theme.MAIN_TEXT_COLOR};
  margin-block-end: 2rem;

  animation: fadein 2s;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const InfoRight = styled.div<ElementThemeProps>`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: ${FONT_SERIF_BOLD};

  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${({ theme }) => theme.BASE_BOX_SHADOW};
  padding: 2rem;

  @media (max-width: 900px) {
    margin-block-end: 2rem;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 100%;
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

const ReadIndicator = styled(BaseButton)`
  position: absolute;
  z-index: 10;
  top: 1rem;
  left: 1rem;
  font-family: ${FONT_SERIF_BOLD};
  background-color: ${POP};
  box-shadow: none;

  animation: fadein 2s;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Indicators = styled.div`
  position: absolute;
  bottom: 12px;
  right: 12px;
  display: flex;
  justify-content: space-between;
`;

const Author = styled.div`
  margin-block-end: 1rem;
  padding: 1rem !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Language = styled.div`
  padding: 1rem !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Genre = styled.div`
  padding: 1rem !important;
  margin-block-end: 1rem;
  display: flex;
  justify-content: space-between;
`;

export const StyledPrimaryButton = styled(PrimaryButton)`
  font-family: ${FONT_SERIF_BOLD};
  padding: 1rem;
  width: 209px;

  :disabled {
    background-color: ${DISABLED_WHITE};
  }

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const InfoLeft = styled.div<ElementThemeProps>`
  flex: 1;
  margin-inline-end: 2rem;
  display: flex;
  flex-direction: column;

  > div {
    padding: 2rem;
    border-radius: ${BASE_BORDER_RADIUS};
    box-shadow: ${({ theme }) => theme.BASE_BOX_SHADOW};
  }

  @media (max-width: 900px) {
    margin-inline: 0;
    margin-block-end: 2rem;
  }
`;

const ShareSection = styled.section<ElementThemeProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 1200px;
  color: ${({ theme }) => theme.MAIN_TEXT_COLOR};
  margin-block-end: 2rem;
  padding: 2rem;
  font-family: ${FONT_SERIF_REGULAR};
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${({ theme }) => theme.BASE_BOX_SHADOW};

  animation: fadein 2s;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Shares = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  font-size: 14px;
  font-family: ${FONT_SERIF_REGULAR};
`;

const Share = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ShareTitle = styled.span`
  margin-block-end: 1rem;
  text-transform: capitalize;
`;

const ShareAddress = styled.span`
  display: inline-block;
  margin-block-end: 1rem;
`;

const SharePercentage = styled.span`
  display: inline-block;
`;

export const ContentWrapper = styled.div`
  margin: 2rem;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 900px) {
    margin: 0;
  }
`;

export const ModalHeader = styled.h2`
  display: inline-block;
`;

export const ModalText = styled.span`
  display: inline-block;
  margin-block: 1rem 2rem;
  text-align: center;
  font-family: ${FONT_SERIF_REGULAR};

  @media (max-width: 900px) {
    margin-block: 1rem 0rem;
  }
`;

export const CTAWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const VotingsWrapper = styled.div`
  width: 90%;
  max-width: 1200px;
  margin-block-end: 2rem;
  animation: fadein 2s;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ProjectDetailView = () => {
  const router = useRouter();
  const votingsRef = useRef(null);
  const { account } = useWeb3React();
  const theme = useTheme();
  const projectId = useGetProjectId();
  const { fetchBallotAddress } = useBallotsFactory();
  const {
    project: fetchedProject,
    refetch,
    isLoading: isProjectLoading,
  } = useGetProject(projectId);

  const { buy, buyStatus, startAuctions } = useCollection();
  const auctionsManager = useAuctionsManager();
  const mpManager = useMoonpageManager();
  const { retriggerAuction } = useAuctions();
  const [coverImgLink, setCoverImgLink] = useState<string>(null);
  const [isGettingCurrentPrice, setIsGettingCurentPrice] =
    useState<boolean>(false);
  const [updatedProject, setUpdatedProject] = useState<Project | null>(null);
  const [showBuyModal, setShowBuyModal] = useState<boolean>(false);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [agreed, setAgreed] = useState<boolean>(false);
  const project = useMemo(
    () => updatedProject || fetchedProject,
    [fetchedProject, updatedProject]
  );

  const scrollToVotings = useCallback(() => {
    const timeout = setTimeout(
      () => votingsRef?.current?.scrollIntoView(),
      1300
    );
    return () => {
      clearTimeout(timeout);
    };
  }, [votingsRef]);

  const refetchAuctionStateAndCount = useCallback(async () => {
    const auctionData = await auctionsManager.auctions(projectId);
    const editionData = await mpManager.editions(projectId);

    setUpdatedProject({
      ...project,
      auctionsStarted: auctionData.auctionsStarted,
      auctionsEnded: auctionData.auctionsEnded,
      currentId: editionData.currentTokenId,
      mintCount: project.mintCount.add(1),
    });
  }, [auctionsManager, mpManager, project, projectId]);

  const refetchCount = useCallback(async () => {
    const editionData = await mpManager.editions(projectId);
    setUpdatedProject({
      ...project,
      currentId: editionData.currentTokenId,
      mintCount: editionData.currentEdLastTokenId
        .sub(editionData.currentTokenId)
        .sub(1),
    });
  }, [mpManager, project, projectId]);

  const refetchEdition = useCallback(async () => {
    const editionData = await mpManager.editions(projectId);
    const newEdition = project.editions.length + 1;

    setUpdatedProject({
      ...project,
      currentId: editionData.currentTokenId,
      mintCount: editionData.currentEdLastTokenId.sub(
        editionData.currentTokenId
      ),
      editions: [
        ...project.editions,
        {
          edition: BigNumber.from(newEdition.toString()),
          startId: editionData.currentTokenId,
          endId: editionData.currentEdLastTokenId,
          mintPrice: editionData.mintPrice,
        } as Edition,
      ],
    });
  }, [mpManager, project, projectId]);

  const updateBallotAddress = useCallback(async () => {
    const ballotAddress = await fetchBallotAddress(projectId);
    // @ts-ignore
    setUpdatedProject({ ...project, ballotAddress });
  }, [fetchBallotAddress, project, projectId]);

  const isAuthor = useMemo(() => {
    if (
      project &&
      account &&
      account.toLowerCase() === project.creator?.toLowerCase()
    ) {
      return true;
    }
    return false;
  }, [project, account]);

  const authorShare = useMemo(() => {
    let result = 85;
    if (project && project.contributors?.length > 0) {
      const contributorsShareTotal = project.contributors?.reduce(
        (partialSum, a) => partialSum + Number(a.sharePercentage),
        0
      );
      result = result - contributorsShareTotal;
    }
    return result;
  }, [project]);

  const currentEdition = useMemo(() => {
    return project
      ? project.editions.find((edition) => {
          return Number(edition.edition) === project.editions.length;
        })
      : undefined;
  }, [project]);

  const handleClickRead = useCallback(
    (e) => {
      e.preventDefault();
      router.push(`/projects/${projectId}/read`);
    },
    [projectId, router]
  );

  const toggleChecked = useCallback(() => {
    setAgreed(!agreed);
  }, [agreed]);

  const fetchCurrentPrice = useCallback(async () => {
    setIsGettingCurentPrice(true);
    let price: BigInt | undefined;
    try {
      price = await auctionsManager.getPrice(
        projectId,
        project?.initialMintPrice
      );
      setCurrentPrice(price);
      setShowBuyModal(true);
    } catch (e) {
      toast.error(e?.message);
    }
    setIsGettingCurentPrice(false);
  }, [auctionsManager, projectId, project?.initialMintPrice]);

  const handleClickBuy = useCallback(async () => {
    if (!project?.initialMintPrice) return;
    await buy({
      projectId,
      initialMintPrice: project.initialMintPrice,
      onError: undefined,
      onSuccess: () => {
        setShowBuyModal(false);
        refetch();
        refetchAuctionStateAndCount();
        setAgreed(false);
      },
    });
  }, [buy, project, projectId, refetch, refetchAuctionStateAndCount]);

  const handleRetriggerAuction = useCallback(async () => {
    await retriggerAuction({
      projectId,
      onError: undefined,
      onSuccess: () => {
        refetch();
      },
    });
  }, [retriggerAuction, projectId, refetch]);

  const handleStartAuctions = useCallback(
    async (amountForCreator: number) => {
      await startAuctions({
        projectId,
        amountForCreator,
        initialMintPrice: project?.initialMintPrice,
        onError: undefined,
        onSuccess: () => {
          refetch();
        },
      });
    },
    [project?.initialMintPrice, projectId, refetch, startAuctions]
  );

  const getImageUrl = useCallback(async () => {
    const imgUrl = await getCoverImageUrl(projectId, project?.imgIpfsHash);
    setCoverImgLink(imgUrl);
  }, [project?.imgIpfsHash, projectId]);

  useEffect(() => {
    getImageUrl();
  }, [getImageUrl]);

  useEffect(() => {
    const hash = router.asPath.split('#')[1];
    if (hash === 'votings' && scrollToVotings) {
      scrollToVotings();
    }
  }, [router.asPath, scrollToVotings]);

  if ((!project || project.isDeleted) && !isProjectLoading) {
    return (
      <Root>
        <Title size="xl">{`The project you are looking for does not exist :(`}</Title>
      </Root>
    );
  }

  return (
    <Root>
      {isProjectLoading ? (
        <Loading height={530} />
      ) : (
        <>
          <MainInfoWrapper theme={theme}>
            <InfoLeft theme={theme}>
              <Title padding="0 1rem 1rem 1rem" color={POP}>
                {project.title}
              </Title>
              {project.subtitle && (
                <Title size="s" padding="0 1rem 1rem 1rem">
                  {project.subtitle}
                </Title>
              )}
              <ImageWrapper>
                <ReadIndicator onClick={handleClickRead}>READ</ReadIndicator>
                <Image
                  priority
                  src={coverImgLink ?? '/ImgPlaceholder.png'}
                  height={'100%'}
                  width={'100%'}
                  alt={'Project Image'}
                  quality={65}
                  layout="responsive"
                />
                <Indicators>
                  {project?.isFrozen ? (
                    <TooltippedIndicator
                      tooltipContent="Project was locked by autor. Content won't change anymore."
                      icon={<LockIcon htmlColor="#fff" fontSize="inherit" />}
                    />
                  ) : (
                    <TooltippedIndicator
                      tooltipContent="Author can still change the content."
                      icon={
                        <LockOpenIcon htmlColor="#fff" fontSize="inherit" />
                      }
                    />
                  )}
                </Indicators>
              </ImageWrapper>
              <Author>
                <Title padding="0" size="xs" width="fit-content">
                  {'Author '}
                </Title>
                <Title padding="0" size="xs" width="fit-content">
                  <ProfileLink account={project.creator} />
                </Title>
              </Author>
              <Genre>
                <Title padding="0" size="xs" width="fit-content">
                  {'Genre '}
                </Title>
                <Title padding="0" size="xs" width="fit-content">
                  {project.genre ?? 'Unknown'}
                </Title>
              </Genre>
              <Language>
                <Title padding="0" size="xs" width="fit-content">
                  {'Original Language '}
                </Title>
                <Title padding="0" size="xs" width="fit-content">
                  {project.originalLanguage ?? 'Unknown'}
                </Title>
              </Language>
            </InfoLeft>
            <InfoRight theme={theme}>
              {project.editions?.length > 1 && (
                <MintSection
                  currentEdition={currentEdition}
                  project={project}
                  refetch={refetchCount}
                />
              )}
              {project.editions?.length === 1 && (
                <AuctionSection
                  isAuthor={isAuthor}
                  project={project}
                  isGettingCurrentPrice={isGettingCurrentPrice}
                  onFetchCurrentPrice={fetchCurrentPrice}
                  onRetriggerAuction={handleRetriggerAuction}
                  onStartAuctions={handleStartAuctions}
                />
              )}
            </InfoRight>
          </MainInfoWrapper>
          <Blurb
            blurbIpfsHash={project?.blurbIpfsHash}
            projectId={projectId}
            isAllowedToEdit={
              project?.creator.toLowerCase() === account?.toLowerCase()
            }
          />
          <VotingsWrapper ref={votingsRef}>
            <Votings
              creator={project?.creator}
              projectId={projectId}
              ballotAddress={project?.ballotAddress}
              onFinishSettingUpBallot={updateBallotAddress}
            />
          </VotingsWrapper>
          <ShareSection theme={theme}>
            <Title>Contributors</Title>
            <Shares>
              <Share>
                <ShareTitle>Creator</ShareTitle>
                <ShareAddress>
                  <ProfileLink account={project?.creator} />
                </ShareAddress>
                <SharePercentage>{`${authorShare} %`}</SharePercentage>
              </Share>
              {project.contributors?.map((cntrb, i) => (
                <Share key={i}>
                  <ShareTitle>
                    {cntrb.role?.length ? cntrb.role : 'Unknown role'}
                  </ShareTitle>
                  <ShareAddress>
                    <ProfileLink account={cntrb.address} />
                  </ShareAddress>
                  <SharePercentage>{`${cntrb.sharePercentage} %`}</SharePercentage>
                </Share>
              ))}
              <Share>
                <ShareTitle>Moonpage</ShareTitle>
                <ShareAddress>
                  <ProfileLink account={MOONPAGE_DEV_ADDRESS} />
                </ShareAddress>
                <SharePercentage>15 %</SharePercentage>
              </Share>
            </Shares>
          </ShareSection>
          {isAuthor && (
            <AuthorSection
              currentEdition={currentEdition}
              projectId={projectId}
              project={project}
              refetch={refetchEdition}
            />
          )}
        </>
      )}
      {showBuyModal && (
        <BaseModal
          onClose={() => {
            setShowBuyModal(false);
            setAgreed(false);
          }}
        >
          <ContentWrapper>
            <Title size="m" padding="1rem 0 0 0">
              Current Price:
            </Title>
            <Title color={POP} size="s" padding="0 0 0 1rem">{`${formatNumber(
              currentPrice
            )} MATIC`}</Title>
            <ModalText>
              {`In a dutch auction the price keeps going down. Don't miss the
              chance and mint now!`}
            </ModalText>
            <Checkbox onChange={toggleChecked} check={agreed} readonly={false}>
              <span>
                I have read and understood the
                <NextLink
                  href="https://moonpage.gitbook.io/moonpage-terms-of-service/"
                  name="Terms of Service (Last updated: 14.11.2022)."
                />
                and want to mint this NFT.
              </span>
            </Checkbox>
            <ActionButton
              disabled={
                buyStatus === 'confirming' || buyStatus === 'waiting' || !agreed
              }
              loading={buyStatus === 'confirming' || buyStatus === 'waiting'}
              onClick={handleClickBuy}
              text="MINT"
            />
          </ContentWrapper>
        </BaseModal>
      )}
    </Root>
  );
};

export default ProjectDetailView;
