import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import { formatEther } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { BLURB_FETCH_ERROR } from '../../constants';
import BaseModal from '../../components/BaseModal';
import Loading from '../../components/Loading';
import MintSection from '../../components/ProjectDetails/MintSection';
import ToastLink from '../../components/ToastLink';
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
import useMoonpageCollection from '../../hooks/useMoonpageCollection';
import useAuctionsManager from '../../hooks/useAuctionsManager';
import Checkbox from '../../components/Checkbox';
import { useProjects } from '../../hooks/useProjects';
import { BigNumber } from 'ethers';

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
  margin-block-end: 2rem;
  padding: 1rem !important;
  text-transform: uppercase;
  font-family: ${INTER_BOLD};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Key = styled.span`
  display: inline-block;
`;

export const Val = styled.span`
  display: inline-block;
  font-family: ${INTER_BOLD};
  text-transform: default;
`;

const Genre = styled.div`
  padding: 1rem !important;
  text-transform: uppercase;
  font-family: ${INTER_BOLD};
  display: flex;
  justify-content: space-between;
`;

export const Title = styled(SectionTitle)`
  text-align: center;
  margin-block-end: 2rem;
  display: flex;
  flex-direction: column;
`;

const Info = styled.h4`
  display: inline-block;
  margin-block-start: 0;
  padding: 0.5rem 1rem;
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${BASE_BOX_SHADOW};
`;

const Subtitle = styled(Info)`
  font-size: 14px;
  margin: 0;
  padding: 0;
  box-shadow: none;
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

export interface MintButtonProps {
  disabled: boolean;
  onClick: MouseEventHandler<HTMLButtonElement> &
    ((amount: number, price: string) => Promise<void>);
}

export const MintButton = styled(BaseButton)<MintButtonProps>`
  font-family: ${INTER_BOLD};
  padding: 1rem;
  width: 209px;
  color: ${({ disabled }) => (disabled ? DISABLED_WHITE : PINK)};

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const ProjectDetailView = () => {
  const { account, chainId } = useWeb3React();
  const router = useRouter();
  const projectId: string = Array.isArray(router.query.projectId)
    ? router.query.projectId[0]
    : router.query.projectId;
  const { data, refetch, isLoading: isProjectLoading } = useProjects();
  const collection = useMoonpageCollection();
  const auctionsManager = useAuctionsManager();
  const { allowedToRead } = useShowText(projectId);
  const [coverImgLink, setCoverImgLink] = useState<string>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showBuyModal, setShowBuyModal] = useState<boolean>(false);
  const [mintPending, setMintPending] = useState<boolean>(false);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [blurb, setBlurb] = useState<null | string>(null);
  const [agreed, setAgreed] = useState<boolean>(false);
  console.log({ data });
  useEffect(() => {
    if (data?.imgIpfsHash) {
      setCoverImgLink(`https://ipfs.io/ipfs/${data.imgIpfsHash}`);
    }
  }, [data]);

  const fetchBlurb = useCallback(async () => {
    if (data?.blurbIpfsHash) {
      try {
        const response = await fetch(
          `https://ipfs.io/ipfs/${data.blurbIpfsHash}`
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
  }, [data]);

  const isAuthor = useMemo(() => {
    if (
      data &&
      account &&
      account.toLowerCase() === data.creator?.toLowerCase()
    ) {
      return true;
    }
    return false;
  }, [data, account]);

  const authorShare = useMemo(() => {
    let result = 85;
    if (data && data.contributors?.length > 0) {
      const contributorsShareTotal = data.contributors?.reduce(
        (partialSum, a) => partialSum + Number(a.sharePercentage),
        0
      );
      result = result - contributorsShareTotal;
    }
    return result;
  }, [data]);

  const currentEdition = useMemo(
    () => (data && data.editions ? data.editions[0] : undefined),
    [data]
  );

  const isLastNFT = useMemo(
    () => Number(data?.currentId) === Number(currentEdition?.endId),
    [data, currentEdition]
  );

  useEffect(() => {
    if (data) {
      fetchBlurb();
    }
  }, [data, fetchBlurb]);

  const mint = useCallback(async () => {
    setMintPending(true);
    collection
      .buy(projectId, { value: currentPrice })
      .then((mintTx) => {
        const { hash } = mintTx;
        toast.info(
          <ToastLink
            hash={hash}
            chainId={chainId}
            message={'Mint pending...'}
          />
        );
        collection.provider.once(hash, (transaction) => {
          toast.success(
            <ToastLink
              hash={hash}
              chainId={chainId}
              message={'Successfyull Minted!'}
            />
          );
          setMintPending(false);
          setShowBuyModal(false);
          refetch();
        });
      })
      .catch((e: unknown) => {
        console.log({ e });
        toast.error('Sorry, something went wrong...');
        setMintPending(false);
      });
  }, [collection, projectId, currentPrice, chainId, refetch]);

  const fetchCurrentPrice = async () => {
    setLoading(true);
    const price = await auctionsManager.getPrice(
      projectId,
      data?.initialMintPrice
    );

    setCurrentPrice(price);
    setLoading(false);
    setShowBuyModal(true);
  };

  const retriggerAuction = useCallback(async () => {
    try {
      setLoading(true);
      const Tx = await auctionsManager.retriggerAuction(projectId);
      const { hash } = Tx;
      toast.info(
        <ToastLink hash={hash} chainId={chainId} message={'Retriggering...'} />
      );
      auctionsManager.provider.once(hash, (transaction) => {
        refetch();
        setLoading(false);
      });
    } catch (e: unknown) {
      // @ts-ignore
      toast.error(e.reason ?? 'Something went wrong.');
      setLoading(false);
    }
  }, [auctionsManager, chainId, projectId, refetch]);

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

  return (
    <Root>
      {!data && isProjectLoading ? (
        <Loading height={530} />
      ) : (
        <>
          <MainInfoWrapper>
            <InfoLeft>
              <Title>
                {data.title}
                {data.subtitle && <Subtitle>{data.subtitle}</Subtitle>}
              </Title>
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
                <Key>{'Author '}</Key>
                <Val>{truncateAddress(data.creator)}</Val>
              </Author>
              <Genre>
                <Key>{'Genre '}</Key>
                <Val>{data.genre ?? 'Unknown'}</Val>
              </Genre>
            </InfoLeft>
            <InfoRight>
              {data.editions?.length > 1 && (
                <MintSection
                  projectId={projectId}
                  currentEdition={data.editions.length}
                  totalSupply={data.currentId.sub(currentEdition?.startId)}
                  maxSupply={currentEdition?.endId
                    .sub(currentEdition?.startId)
                    .add(BigNumber.from('1'))}
                  mintPrice={currentEdition.mintPrice}
                  refetch={refetch}
                />
              )}
              {data.editions?.length === 1 && (
                <AuctionSection
                  projectData={data}
                  loading={loading}
                  totalSupply={data.mintCount}
                  maxSupply={currentEdition?.endId
                    .sub(currentEdition?.startId)
                    .add(BigNumber.from('1'))}
                  startingPrice={data.initialMintPrice}
                  onFetchCurrentPrice={fetchCurrentPrice}
                  onRetriggerAuction={retriggerAuction}
                />
              )}
            </InfoRight>
          </MainInfoWrapper>
          <DescriptionSection>
            <Title style={{ maxWidth: '200px' }}>Blurb</Title>
            <Description>
              {blurb ?? <Loading height={20} dotHeight={20} />}
            </Description>
          </DescriptionSection>
          <ShareSection>
            <Title>Contributors</Title>
            <Shares>
              <Share>
                <ShareTitle>Author</ShareTitle>
                <ShareAddress>{truncateAddress(data?.creator)}</ShareAddress>
                <SharePercentage>{`${authorShare} %`}</SharePercentage>
              </Share>
              {data.contributors?.map((cntrb, i) => (
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
                  {/* {truncateAddress(data.factory)} */}
                  replace me
                </ShareAddress>
                <SharePercentage>15 %</SharePercentage>
              </Share>
            </Shares>
            {/* Pie Chart for Contributions Section - also for Create Flow */}
            {/* <PieChart part={Number(30)} whole={Number(90)} /> */}
          </ShareSection>
          {isAuthor && (
            <AuthorSection
              blurb={blurb}
              projectId={projectId}
              projectData={data}
              onConfigure={refetch}
              onAddContributors={refetch}
              refetch={refetch}
            />
          )}
        </>
      )}
      {showBuyModal && (
        <BaseModal onClose={() => setShowBuyModal(false)}>
          <ContentWrapper>
            <ModalHeader>{`Current Price: ${formatEther(
              parseInt(currentPrice._hex, 16).toString()
            )} MATIC`}</ModalHeader>
            <ModalText>
              {`In a dutch auction the price keeps going down. Don't miss the
              chance and mint now!`}
            </ModalText>
            <Checkbox
              onChange={toggleChecked}
              check={agreed}
              readonly={false}
              // TODO
              label={'Legal text'}
            />
            <MintButton disabled={mintPending || !agreed} onClick={mint}>
              {mintPending ? <Loading height={20} dotHeight={20} /> : 'MINT'}
            </MintButton>
          </ContentWrapper>
        </BaseModal>
      )}
    </Root>
  );
};

export default ProjectDetailView;
