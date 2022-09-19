import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';
import Image from 'next/image';
import styled from 'styled-components';
import { BLURB_FETCH_ERROR } from '../../constants';
import BaseModal from '../../components/BaseModal';
import Loading from '../../components/Loading';
import MintSection from '../../components/ProjectDetails/MintSection';
import { SectionTitle } from '../../components/HomePage/ProjectSection';
import { truncateAddress } from '../../components/WalletIndicator';
import {
  BASE_BORDER_RADIUS,
  BASE_BOX_SHADOW,
  DISABLED_WHITE,
  PINK,
  PLAIN_WHITE,
  PrimaryButton,
  BaseButton,
  INTER_BOLD,
} from '../../themes';

import useShowText from '../../hooks/useShowText';
import AuthorSection from '../../components/ProjectDetails/AuthorSection';
import AuctionSection from '../../components/ProjectDetails/AuctionSection';
import { useCollection } from '../../hooks/collection';
import { useAuctions } from '../../hooks/auctions';
import Checkbox from '../../components/Checkbox';
import { useGetProject } from '../../hooks/projects/useGetProject';
import { useGetProjectId } from '../../hooks/projects/useGetProjectId';
import useAuctionsManager from '../../hooks/useAuctionsManager';
import ActionButton from '../../components/ActionButton';
import { formatNumber } from '../../utils/formatNumber';
import Title from '../../components/Title';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-block-start: 3rem;
`;

const MainInfoWrapper = styled.section`
  display: flex;
  width: 90%;
  max-width: 1200px;
  color: ${PLAIN_WHITE};
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

const InfoRight = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: ${INTER_BOLD};

  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${BASE_BOX_SHADOW};
  padding: 2rem;

  @media (max-width: 900px) {
    margin-block-end: 2rem;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 100%;
  margin-block-end: 2rem;
  span {
    width: 100% !important;
    height: 100% !important;

    img {
      object-fit: contain;
    }
  }
`;

const ReadIndicator = styled(BaseButton)`
  position: absolute;
  z-index: 10;
  top: 1rem;
  left: 1rem;
  font-family: ${INTER_BOLD};
  background-color: ${PINK};

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
  font-family: ${INTER_BOLD};
  padding: 1rem;
  width: 209px;

  :disabled {
    background-color: ${DISABLED_WHITE};
  }

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const InfoLeft = styled.div`
  flex: 1;
  margin-inline-end: 2rem;
  display: flex;
  flex-direction: column;

  > div {
    padding: 2rem;
    border-radius: ${BASE_BORDER_RADIUS};
    box-shadow: ${BASE_BOX_SHADOW};
  }

  @media (max-width: 900px) {
    margin-inline: 0;
    margin-block-end: 2rem;
  }
`;

const ShareSection = styled.section`
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
`;

const Share = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ShareTitle = styled.h5`
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

const DescriptionSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  line-break: anywhere;
  max-width: 1200px;
  color: ${PLAIN_WHITE};
  margin-block-end: 2rem;
  padding: 2rem;
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${BASE_BOX_SHADOW};

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

const Description = styled.p`
  display: inline-block;

  font-size: 14px;
  line-height: 170%;
`;

export const ContentWrapper = styled.div`
  margin: 2rem;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ModalHeader = styled.h2`
  display: inline-block;
`;

export const ModalText = styled.span`
  display: inline-block;
  margin-block: 1rem 2rem;
  text-align: center;
`;

export const CTAWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProjectDetailView = () => {
  const router = useRouter();
  const { account } = useWeb3React();
  const projectId = useGetProjectId();
  const {
    project,
    refetch,
    isLoading: isProjectLoading,
  } = useGetProject(projectId);
  const { buy, buyStatus } = useCollection();
  const auctionsManager = useAuctionsManager();
  const { retriggerAuction, retriggerAuctionStatus } = useAuctions();
  const { allowedToRead } = useShowText(projectId);
  const [coverImgLink, setCoverImgLink] = useState<string>(null);
  const [isGettingCurrentPrice, setIsGettingCurentPrice] =
    useState<boolean>(false);
  const [showBuyModal, setShowBuyModal] = useState<boolean>(false);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [blurb, setBlurb] = useState<null | string>(null);
  const [agreed, setAgreed] = useState<boolean>(false);

  useEffect(() => {
    if (project?.imgIpfsHash) {
      setCoverImgLink(`https://ipfs.io/ipfs/${project.imgIpfsHash}`);
    }
  }, [project]);

  const fetchBlurb = useCallback(async () => {
    if (project?.blurbIpfsHash) {
      try {
        const response = await fetch(
          `https://ipfs.io/ipfs/${project.blurbIpfsHash}`
        );
        if (response.ok) {
          const fetchedBlurb = await response.text();
          setBlurb(fetchedBlurb);
        } else {
          setBlurb(BLURB_FETCH_ERROR);
        }
      } catch (e) {
        console.log({ e });
        setBlurb(BLURB_FETCH_ERROR);
      }
    } else {
      setBlurb(BLURB_FETCH_ERROR);
    }
  }, [project]);

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

  const currentEdition = useMemo(
    () =>
      project
        ? project.editions.find(
            (edition) => Number(edition.edition) === project.editions.length
          )
        : undefined,
    [project]
  );

  useEffect(() => {
    if (project) {
      fetchBlurb();
    }
  }, [project, fetchBlurb]);

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

  const fetchCurrentPrice = async () => {
    setIsGettingCurentPrice(true);
    const price = await auctionsManager.getPrice(
      projectId,
      project?.initialMintPrice
    );

    setCurrentPrice(price);
    setIsGettingCurentPrice(false);
    setShowBuyModal(true);
  };

  const handleClickBuy = useCallback(async () => {
    if (!project?.initialMintPrice) return;
    await buy({
      projectId,
      initialMintPrice: project.initialMintPrice,
      onError: undefined,
      onSuccess: () => {
        setShowBuyModal(false);
        refetch();
      },
    });
  }, [buy, project, projectId, refetch]);

  const handleRetriggerAuction = useCallback(async () => {
    await retriggerAuction({
      projectId,
      onError: undefined,
      onSuccess: () => {
        refetch();
      },
    });
  }, [retriggerAuction, projectId, refetch]);

  return (
    <Root>
      {!project && isProjectLoading ? (
        <Loading height={530} />
      ) : (
        <>
          <MainInfoWrapper>
            <InfoLeft>
              <Title padding="1rem 1rem 0 1rem">{project.title}</Title>
              {project.subtitle && (
                <Title size="s" padding="0 1rem 1rem 1rem">
                  {project.subtitle}
                </Title>
              )}
              <ImageWrapper>
                {allowedToRead && (
                  <ReadIndicator onClick={handleClickRead}>READ</ReadIndicator>
                )}
                <Image
                  priority
                  src={coverImgLink ?? '/ImgPlaceholder.png'}
                  height={'100%'}
                  width={'100%'}
                  alt={'Project Image'}
                  quality={65}
                  layout="responsive"
                />
              </ImageWrapper>
              <Author>
                <Title padding="0" size="xs" width="fit-content">
                  {'Author '}
                </Title>
                <Title padding="0" size="xs" width="fit-content">
                  {truncateAddress(project.creator)}
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
            <InfoRight>
              {project.editions?.length > 1 && (
                <MintSection
                  currentEdition={currentEdition}
                  project={project}
                  refetch={refetch}
                />
              )}
              {project.editions?.length === 1 && (
                <AuctionSection
                  project={project}
                  loading={
                    isGettingCurrentPrice ||
                    retriggerAuctionStatus === 'confirming' ||
                    retriggerAuctionStatus === 'waiting'
                  }
                  onFetchCurrentPrice={fetchCurrentPrice}
                  onRetriggerAuction={handleRetriggerAuction}
                />
              )}
            </InfoRight>
          </MainInfoWrapper>
          <DescriptionSection>
            <Title>Blurb</Title>
            <Description>
              {blurb ?? <Loading height={20} dotHeight={20} />}
            </Description>
          </DescriptionSection>
          <ShareSection>
            <Title>Contributors</Title>
            <Shares>
              <Share>
                <ShareTitle>Creator</ShareTitle>
                <ShareAddress>{truncateAddress(project?.creator)}</ShareAddress>
                <SharePercentage>{`${authorShare} %`}</SharePercentage>
              </Share>
              {project.contributors?.map((cntrb, i) => (
                <Share key={i}>
                  <ShareTitle>
                    {cntrb.role.length ? cntrb.role : 'Unknown role'}
                  </ShareTitle>
                  <ShareAddress>{truncateAddress(cntrb.address)}</ShareAddress>
                  <SharePercentage>{`${cntrb.sharePercentage} %`}</SharePercentage>
                </Share>
              ))}
              <Share>
                <ShareTitle>Moonpage</ShareTitle>
                <ShareAddress>
                  {/* TODO */}
                  {/* {truncateAddress(project.factory)} */}
                  replace me
                </ShareAddress>
                <SharePercentage>15 %</SharePercentage>
              </Share>
            </Shares>
          </ShareSection>
          {isAuthor && (
            <AuthorSection
              blurb={blurb}
              currentEdition={currentEdition}
              projectId={projectId}
              projectData={project}
              refetch={refetch}
            />
          )}
        </>
      )}
      {showBuyModal && (
        <BaseModal onClose={() => setShowBuyModal(false)}>
          <ContentWrapper>
            <ModalHeader>{`Current Price: ${formatNumber(
              currentPrice
            )} MATIC`}</ModalHeader>
            <ModalText>
              {`In a dutch auction the price keeps going down. Don't miss the
              chance and mint now!`}
            </ModalText>
            <Checkbox
              onChange={toggleChecked}
              check={agreed}
              readonly={false}
              label={'Legal text'}
            />
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
