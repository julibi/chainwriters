import React, { MouseEventHandler, useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { formatEther } from '@ethersproject/units'
import { useWeb3React } from '@web3-react/core'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { BLURB_FETCH_ERROR } from '../../constants'
import { useGetProjectDetails } from '../../state/projects/hooks'
import BaseModal from '../../components/BaseModal'
import Loading from '../../components/Loading'
import MintSection from '../../components/ProjectDetails/MintSection'
import ToastLink from '../../components/ToastLink'
import { SectionTitle } from '../../components/HomePage/ProjectSection'
import { truncateAddress } from '../../components/WalletIndicator'
import {
  BASE_BORDER_RADIUS,
  BASE_BOX_SHADOW,
  DISABLED_WHITE,
  PINK,
  PLAIN_WHITE,
  PrimaryButton,
  BaseButton
} from '../../themes';
import useProjectContract from '../../hooks/useProjectContract'
import useShowText from '../../hooks/useShowText'
import { ProjectData } from '../../state/projects/hooks'
import AuthorSection from '../../components/ProjectDetails/AuthorSection'
import AuctionSection from '../../components/ProjectDetails/AuctionSection'

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
      from { opacity: 0; }
      to   { opacity: 1; }
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
  font-family: 'Roboto Mono Bold';

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
  font-family: 'Roboto Mono Bold';
  background-color: ${PINK};

  animation: fadein 2s;

  @keyframes fadein {
      from { opacity: 0; }
      to   { opacity: 1; }
  }
`;

const Author = styled.div`
  margin-block-end: 2rem;
  padding: 1rem !important;
  text-transform: uppercase;
  font-family: 'Roboto Mono Bold';
  display: flex;
  justify-content: space-between;
`;

export const Key = styled.span`
  display: inline-block;
  margin-block-end: 1rem;
`;

export const Val = styled.span`
  display: inline-block;
  font-family: 'Nunito Sans Bold';
  text-transform: default;
`;

const Genre = styled.div`
  padding: 1rem !important;
  text-transform: uppercase;
  font-family: 'Roboto Mono Bold';
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
  padding: .5rem 1rem;
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
  font-family: 'Roboto Mono Bold';
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
`

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
      from { opacity: 0; }
      to   { opacity: 1; }
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
      from { opacity: 0; }
      to   { opacity: 1; }
  }
`;

const Description = styled.p`
  display: inline-block;
  font-family: 'Nunito Sans', sans-serif;
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
  font-family: 'Roboto Mono Bold';
  padding: 1rem;
  width: 209px;
  color: ${({ disabled }) => disabled ? DISABLED_WHITE : PINK};

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const ProjectDetailView = () => {
  const { account, chainId } = useWeb3React();
  const router = useRouter();
  let projectAddress = router.query.projectAddress;
  projectAddress = Array.isArray(projectAddress) ? projectAddress[0] : projectAddress;
  const getProjectDetails = useGetProjectDetails(projectAddress as string);
  const ProjectContract = useProjectContract(projectAddress as string);
  const getShowText = useShowText(projectAddress as string);
  const [daoData, setDaoData] = useState<ProjectData | null>(null);
  const [coverImgLink, setCoverImgLink] = useState<string>(null);
  const [successfullyLoaded, setSuccessfullyLoaded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showBuyModal, setShowBuyModal] = useState<boolean>(false);
  // todo: big integer
  const [mintPending, setMintPending] = useState<boolean>(false);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [blurb, setBlurb] = useState<null | string>(null);
  const [isNFTOwner, setIsNFTOwner] = useState<boolean>(false);
  
  const callGetProjectDetails = useCallback(async(projectAddress: string) => {
    const ProjectData: ProjectData = await getProjectDetails(projectAddress);
    setDaoData(ProjectData);
    if (ProjectData?.imgIpfsHash) {
      setCoverImgLink(`https://ipfs.io/ipfs/${ProjectData.imgIpfsHash}`);
    }
    setSuccessfullyLoaded(true);
  }, [getProjectDetails]);

  const callGetIsNFTOwner = useCallback(async() => {
    if (daoData) {
      const context = await getShowText(daoData.currentEdition);
      if (context) {
        const { allowed } = context;
        setIsNFTOwner(allowed);
      }
    }
  }, [daoData, getShowText]);

  const fetchBlurb = useCallback(async() => {
    if (daoData && daoData.blurbIpfsHash) {
      const response = await fetch(`https://ipfs.io/ipfs/${daoData.blurbIpfsHash}`);
      if(!response.ok) {
        setBlurb(BLURB_FETCH_ERROR);
      } else {
        const fetchedBlurb = await response.text()
        setBlurb(fetchedBlurb);
      }
    } else {
      setBlurb(BLURB_FETCH_ERROR);
    }
  }, [daoData]);

  const isAuthor = useMemo(() => {
    if (daoData && account && account.toLowerCase() === daoData.author.toLowerCase()) {
      return true;
    }
    return false;
  }, [daoData, account]);

  const authorShare = useMemo(() => {
    let result = 85;
    if (daoData && daoData.contributions.length > 0) {      
      const contributorsShareTotal = daoData.contributions.reduce((partialSum, a) => partialSum + a.share, 0);
      result = result - contributorsShareTotal;
    }
    return result;
  }, [daoData]);

  useEffect(() => {
    if (projectAddress) {
      // @ts-ignore
      callGetProjectDetails(projectAddress);
    }
  }, [projectAddress]);

  useEffect(() => {
    if (daoData) {
      fetchBlurb();
      callGetIsNFTOwner();
    }
  }, [daoData, callGetIsNFTOwner, fetchBlurb]);

  const mint = useCallback(async() => {
    // is this working?
    // const isLastNFT = daoData.currentEditionTotalSupply + 1 === daoData.currentEditionMaxSupply;
    setMintPending(true);
    ProjectContract
    .buy({value: currentPrice})
    .then(mintTx => {
      const { hash } = mintTx;
      toast.info(
        <ToastLink
          hash={hash}
          chainId={chainId}
          message={'Mint pending...'}
        />
      );
      ProjectContract.provider.once(hash, (transaction) => {
        toast.success(
          <ToastLink
            hash={hash}
            chainId={chainId}
            message={'Successfyull Minted!'}
          />
        );
        setMintPending(false);
        setShowBuyModal(false);
        // @ts-ignore
        callGetProjectDetails(projectAddress);
        // if (isLastNFT) {
        //   setDaoData({...daoData, auctionsEnded: true });
        // }
      });
    })
    .catch((e: unknown) => {
      console.log({ e });
      toast.error('Sorry, something went wrong...');
      setMintPending(false);
    });
  }, [projectAddress, ProjectContract, callGetProjectDetails, chainId, currentPrice]);

  const fetchCurrentPrice = async() => {
    setLoading(true);
    const price = await ProjectContract.getPrice();
    
    setCurrentPrice(price);
    setLoading(false);
    setShowBuyModal(true);
  };

  const retriggerAuction = useCallback(async() => {
    try {
      setLoading(true);
      const Tx = await ProjectContract.retriggerAuction();
      const { hash } = Tx;
      toast.info(
        <ToastLink
          hash={hash}
          chainId={chainId}
          message={'Retriggering...'}
        />
      );
      ProjectContract.provider.once(hash, (transaction) => {
        // @ts-ignore
        callGetProjectDetails(projectAddress);
        setLoading(false);
      });
    } catch(e: unknown) {
      // @ts-ignore
      toast.error(e.reason ?? 'Something went wrong.');
      setLoading(false);
    }
  }, [ProjectContract, callGetProjectDetails, chainId, projectAddress]);

  const handleClickRead = useCallback((e) => {
    e.preventDefault();
    router.push(`/projects/${projectAddress}/read`)
  }, [projectAddress, router]);
  console.log({ daoData });
  return (
    <Root>
      {!daoData && !successfullyLoaded && <Loading height={530} />}
      {daoData && successfullyLoaded && (
        <>
          <MainInfoWrapper>
            <InfoLeft>
              <Title>
                {daoData.title}
                {daoData.subtitle && <Subtitle>{daoData.subtitle}</Subtitle>}
              </Title>
              <ImageWrapper>
                {isNFTOwner && <ReadIndicator onClick={handleClickRead}>READ</ReadIndicator>}
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
                <Val>{truncateAddress(daoData.author)}</Val>
              </Author>
              <Genre>
                <Key>{'Genre '}</Key>
                <Val>{daoData.genre ?? 'Unknown'}</Val>
              </Genre>
            </InfoLeft>
            <InfoRight>
              {daoData.currentEdition > 1 && (
                <MintSection
                  currentEdition={daoData.currentEdition}
                  totalSupply={daoData.currentEditionTotalSupply}
                  maxSupply={daoData.currentEditionMaxSupply}
                  mintPrice={daoData.currentEditionMintPrice}
                  projectContract={ProjectContract}
                  // @ts-ignore
                  refetch={() => callGetProjectDetails(projectAddress)}
                />
              )}
              {daoData.currentEdition === 1 && (
                <AuctionSection
                  daoData={daoData}
                  loading={loading}
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
            <Title style={{ maxWidth: '200px' }}>Contributors</Title>
            <Shares>
              <Share>
                <ShareTitle>Author</ShareTitle>
                <ShareAddress>{truncateAddress(daoData.author)}</ShareAddress>
                <SharePercentage>{`${authorShare} %`}</SharePercentage>
              </Share>
              {daoData.contributions.map((cntrb, i) => (
                <Share key={i}>
                  <ShareTitle>
                    {cntrb.role.length ? cntrb.role : 'Unknown role'}
                  </ShareTitle>
                  <ShareAddress>{truncateAddress(cntrb.address)}</ShareAddress>
                  <SharePercentage>{`${cntrb.share} %`}</SharePercentage>
                </Share>
              ))}
              <Share>
                <ShareTitle>PePo Dev Foundation</ShareTitle>
                <ShareAddress>{truncateAddress(daoData.factory)}</ShareAddress>
                <SharePercentage>15 %</SharePercentage>
              </Share>
            </Shares>
            {/* Pie Chart for Contributions Section - also for Create Flow */}
            {/* <PieChart part={Number(30)} whole={Number(90)} /> */}
          </ShareSection>
          {isAuthor && (
            <AuthorSection
              blurb={blurb}
              projectAddress={projectAddress}
              ProjectContract={ProjectContract}
              daoData={daoData}
              onConfigure={(genre, subtitle, imgHash, blurbHash) => {
                setDaoData({ ...daoData, genre, subtitle,imgIpfsHash: imgHash, blurbIpfsHash: blurbHash  })
              }}
              onAddContributors={(ContributorList) => {
                // @ts-ignore
                setDaoData({ ...daoData, contributions: ContributorList  })
              }}
              refetch={() => {
                // @ts-ignore
                callGetProjectDetails(projectAddress);
              }}
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
            <MintButton disabled={mintPending} onClick={mint}>
              {mintPending ? <Loading height={20} dotHeight={20} /> : 'MINT'}
            </MintButton>
          </ContentWrapper>
        </BaseModal>
      )}
    </Root>
  );
}

export default ProjectDetailView
