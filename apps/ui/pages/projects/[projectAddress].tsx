import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify';
import { formatEther } from '@ethersproject/units'
import { useWeb3React } from '@web3-react/core';
import Image from 'next/image'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useGetProjectDetails } from '../../state/projects/hooks'
import BaseModal from '../../components/BaseModal'
import Countdown from '../../components/Countdown'
import InputField from '../../components/InputField'
import NeomorphicCheckbox from '../../components/Checkbox';
import Loading from '../../components/Loading'
import MintSection from '../../components/MintSection'
import ToastLink from '../../components/ToastLink';
import PieChart from '../../components/PieChart'
import ConfigureModal from '../../components/ProjectDetails/ConfigureModal';
import { SectionTitle } from '../../components/ProjectSection'
import { truncateAddress } from '../../components/WalletIndicator'
import {
  BASE_BORDER_RADIUS,
  BASE_BOX_SHADOW,
  DISABLED_WHITE,
  BG_NORMAL,
  PINK,
  PLAIN_WHITE,
  PrimaryButton,
  BaseButton,
  INSET_BASE_BOX_SHADOW
} from '../../themes';
import useProjectContract from '../../hooks/useProjectContract'

import { ProjectData } from '../../state/projects/hooks'



// TODO
// author view
// contributor view
// anyone else

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

const Author = styled.div`
  margin-block-end: 2rem;
  padding: 1rem !important;
  text-transform: uppercase;
  font-family: 'Roboto Mono Bold';
  display: flex;
  justify-content: space-between;
`;

const Key = styled.span`
  display: inline-block;
  margin-block-end: 1rem;
`;

const Val = styled.span`
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

const PieChartWrapper = styled.div`
  display: inline-block;
  margin: 0 auto;
  margin-block: 2rem;
`;

const Title = styled(SectionTitle)`
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

export const StyledPrimaryButton = styled(PrimaryButton)`
  font-family: 'Roboto Mono Bold';
  padding: 1rem;
  width: 209px;

  :disabled {
    background-color: ${DISABLED_WHITE};
    :hover {
      pointer-events: none;
    }
  }

  @media (max-width: 900px) {
    width: 100%;
  }
`;

interface MintButtonProps {
  disabled: boolean;
}

const MintButton = styled(BaseButton)<MintButtonProps>`
  font-family: 'Roboto Mono Bold';
  padding: 1rem;
  width: 209px;
  color: ${({ disabled }) => disabled ? DISABLED_WHITE : PINK};

  :disabled {
    :hover {
      pointer-events: none;
    }
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

const AuthorSection = styled.section`
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

const ContentWrapper = styled.div`
  margin: 2rem;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalHeader = styled.h2`
  display: inline-block;
`;

const ModalText = styled.span`
  display: inline-block;
  margin-block: 1rem 2rem;
  text-align: center;
`;

interface TriggerButtonTypes {
  disabled: boolean;
}

const TriggerButton = styled(BaseButton)<TriggerButtonTypes>`
  background-color: ${BG_NORMAL};
  color: ${({ disabled }) => disabled ? DISABLED_WHITE : PINK};
  font-family: 'Roboto Mono Bold';
  padding: 1rem;
  width: 230px;

  :disabled {
    :hover {
      pointer-events: none;
    }
  }

  @media (max-width: 900px) {
    width: 100%;
  }
`;
const ActionItems = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const ActionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  margin-block-end: 1rem;
`;

const DoneAction = styled.div`
  background-color: ${BG_NORMAL};
  color: ${DISABLED_WHITE};
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${INSET_BASE_BOX_SHADOW};
  font-family: 'Roboto Mono Bold';
  font-size: 13px;
  text-align: center;
  padding: 1rem;
  width: 230px;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const CTAWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProjectDetailView = () => {
  const { account, chainId } = useWeb3React();
  const router = useRouter();
  let projectAddress = router.query.projectAddress;
  projectAddress = Array.isArray(projectAddress) ? projectAddress[0] : projectAddress;
  const getProjectDetails = useGetProjectDetails(projectAddress as string);
  const ProjectContract = useProjectContract(projectAddress as string);
  const [daoData, setDaoData] = useState<ProjectData | null>(null);
  const [coverImgLink, setCoverImgLink] = useState<string>(null);
  const [successfullyLoaded, setSuccessfullyLoaded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showBuyModal, setShowBuyModal] = useState<boolean>(false);
  // todo: big integer
  const [mintPending, setMintPending] = useState<boolean>(false);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [triggerPending, setTriggerPending] = useState(false);
  const [nextEditionPending, setNextEditionPending] = useState(false);
  const [showNextEditionModal, setShowNextEditionModal] = useState(false);
  const [blurb, setBlurb] = useState<null | string>(null);
  const [showAuthorMintModal, setShowAuthorMintModal] = useState<boolean>(false);
  const [authorMintInput, setAuthorMintInput] = useState<string>('');
  const [authorMintPending, setAuthorMintPending] = useState<boolean>(false);
  const [showConfigureModal, setShowConfigureModal] = useState<boolean>(false);
  const [configurePending, setConfigurePending] = useState<boolean>(false);
  
  const callGetProjectDetails = useCallback(async(projectAddress: string) => {
    const ProjectData: ProjectData = await getProjectDetails(projectAddress);
    console.log({ ProjectData });
    setDaoData(ProjectData);
    setCoverImgLink(`https://ipfs.io/ipfs/${ProjectData.imgIpfsHash}`);
    setSuccessfullyLoaded(true);
  }, [getProjectDetails]);

  const fetchBlurb = useCallback(async() => {
    if (daoData && daoData.blurbIpfsHash) {
      const response = await fetch(`https://ipfs.io/ipfs/${daoData.blurbIpfsHash}`);
      if(!response.ok) {
        setBlurb('Something went wrong while loading this blurb. Sorry. Maybe refresh?');
      } else {
        const fetchedBlurb = await response.text()
        setBlurb(fetchedBlurb);
      }
    } else {
      setBlurb('Something went wrong while loading this blurb. Sorry. Maybe refresh?');
    }
  }, [daoData]);

  const isAuthor = useMemo(() => {
    if (daoData && account.toLowerCase() === daoData.author.toLowerCase()) {
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

  const canTriggerNextEdition = useMemo(() => {
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

  useEffect(() => {
    if (projectAddress) {
      // @ts-ignore
      callGetProjectDetails(projectAddress);
    }
  }, [projectAddress]);

  useEffect(() => {
    if (daoData) {
      fetchBlurb();
    }
  }, [daoData, fetchBlurb]);

  const mint = useCallback(async() => {
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
        // refetch
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

  const configure = useCallback(async(
    imgHash: string,
    blurbHash: string,
    genre: string,
    subtitle: string
  ) => {
    try {
      setConfigurePending(true);
      const Tx = await ProjectContract.configureProjectDetails(
        imgHash,
        blurbHash,
        genre,
        subtitle
      );
      const { hash } = Tx;
      toast.info(
        <ToastLink
          hash={hash}
          chainId={chainId}
          message={'Configuring...'}
        />
      );
      ProjectContract.provider.once(hash, (transaction) => {
        setConfigurePending(false);
        setShowConfigureModal(false);
        // @ts-ignore
        callGetProjectDetails(projectAddress);
      });
    } catch(e: unknown) {
      // @ts-ignore
      toast.error(e.reason ?? 'Something went wrong.');
      setConfigurePending(false);
      setShowConfigureModal(false);
    }
  }, [ProjectContract, callGetProjectDetails, chainId, projectAddress]);

  const authorMint = useCallback(async () => {
    setAuthorMintPending(true);
    try {
      const Tx = await ProjectContract.authorMint(authorMintInput);
      const { hash } = Tx;
      toast.info(
        <ToastLink
          hash={hash}
          chainId={chainId}
          message={'Author Mint pending...'}
        />
      );
      ProjectContract.provider.once(hash, (transaction) => {
        // refetch
        // @ts-ignore
        callGetProjectDetails(projectAddress);
        setAuthorMintPending(false);
        toast.success('Minted!');
        setShowAuthorMintModal(false);
      });
    } catch (e: unknown) {
      // @ts-ignore
      toast.error(e.reason ?? 'Something went wrong.');
      setAuthorMintPending(false);
      setShowAuthorMintModal(false);
    }
  }, [
    ProjectContract,
    authorMintInput,
    callGetProjectDetails,
    chainId,
    projectAddress,
  ]);

  const triggerFirstAuction = useCallback(async () => {
    if (
      daoData &&
      daoData.author &&
      account &&
      account.toLowerCase() === daoData.author.toLowerCase()
    ) {
      try {
        setTriggerPending(true);
        // TODO: understand the rate
        const Tx = await ProjectContract.triggerFirstAuction(100000000);
        const { hash } = Tx;
        toast.info(
          <ToastLink
            hash={hash}
            chainId={chainId}
            message={'Triggering auctions...'}
          />
        );
        ProjectContract.provider.once(hash, (transaction) => {
          // refetch
          // @ts-ignore
          callGetProjectDetails(projectAddress);
          setTriggerPending(false);
          toast.success('Auctions have started!');
        });
      } catch (e: unknown) {
        // @ts-ignore
        toast.error(e.reason ?? 'Something went wrong.');
        console.log({ e });
        setTriggerPending(false);
      }
    }
  }, [
    daoData,
    account,
    ProjectContract,
    chainId,
    callGetProjectDetails,
    projectAddress,
  ]);

  const enableNextEdition = useCallback(async()=> {
    try {
      setNextEditionPending(true);
      // TODO: make it dynamic
      const Tx = await ProjectContract.enableNextEdition(10, 500000000000000000);
      const { hash } = Tx;
      toast.info(
        <ToastLink
          hash={hash}
          chainId={chainId}
          message={'Enabling next edition...'}
        />
      );
      ProjectContract.provider.once(hash, (transaction) => {
        // refetch
        // @ts-ignore
        callGetProjectDetails(projectAddress);
        setNextEditionPending(false);
        toast.success('Next Edition unlocked!');
      });
    } catch (e: unknown) {
      // @ts-ignore
      toast.error(e.reason ?? 'Something went wrong.');
      console.log({ e });
      setNextEditionPending(false);
    }
  }, [ProjectContract, callGetProjectDetails, chainId, projectAddress]);

  const showsAuctionText = useCallback(() => {
    const now = Math.round((new Date()).getTime() / 1000);
  
    if (!daoData) return;
    const { auctionsStarted, auctionsEnded, expiresAt } = daoData;
    if (auctionsEnded) {
      return <Key style={{textAlign: 'center'}}>{'Auctions finished'}</Key>
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
                <Countdown
                  end={expiresAt}
                />
              </Val>
            </>
        );
      } else {
        return <Key style={{textAlign: 'center'}}>{'Auction expired'}</Key>
      }

    }
    return <Key style={{textAlign: 'center'}}>{'Auction Has Not Started Yet'}</Key>;
  }, [daoData]);

  // show image
  // is price going down? - understand the rate...
  // ui flow of triggering

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
              {daoData.currentEdition > 1 && <MintSection />}
              {daoData.currentEdition === 1 && (
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
                            onClick={() => retriggerAuction()}
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
                            onClick={() => fetchCurrentPrice()}
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
                      <StyledPrimaryButton disabled>
                        Get Current Price
                      </StyledPrimaryButton>
                    )}
                  </FlexWrapper>
                </>
              )}
            </InfoRight>
          </MainInfoWrapper>
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
                <ShareTitle>Moonlit Foundation</ShareTitle>
                <ShareAddress>{truncateAddress(daoData.factory)}</ShareAddress>
                <SharePercentage>15 %</SharePercentage>
              </Share>
            </Shares>
            {/* Pie Chart for Contributions Section - also for Create Flow */}
            {/* <PieChart part={Number(30)} whole={Number(90)} /> */}
          </ShareSection>
          <DescriptionSection>
            <Title style={{ maxWidth: '200px' }}>Blurb</Title>
            <Description>
              {blurb ?? <Loading height={20} dotHeight={20} />}
            </Description>
          </DescriptionSection>
          {isAuthor && (
            <AuthorSection>
              <Title style={{ maxWidth: '300px' }}>
                Control Settings for Author
              </Title>
              <ActionItems>
                {configured ? (
                  <ActionItem>
                    <DoneAction>{'Configured'}</DoneAction>
                    <NeomorphicCheckbox check readonly />
                  </ActionItem>
                ) : (
                  <ActionItem>
                    <TriggerButton
                      onClick={() => setShowConfigureModal(true)}
                      disabled={configurePending}
                    >
                      {configurePending ? (
                        <Loading height={20} dotHeight={20} />
                      ) : (
                        'Configure Your Project'
                      )}
                    </TriggerButton>
                    <NeomorphicCheckbox check={false} readonly />
                  </ActionItem>
                )}
                {daoData.premintedByAuthor ? (
                  <ActionItem>
                    <DoneAction>{`Minted Your ${daoData.premintedByAuthor} Copies`}</DoneAction>
                    <NeomorphicCheckbox check readonly />
                  </ActionItem>
                ) : (
                  <ActionItem>
                    <TriggerButton
                      onClick={() => setShowAuthorMintModal(true)}
                      disabled={authorMintPending}
                    >
                      {authorMintPending ? (
                        <Loading height={20} dotHeight={20} />
                      ) : (
                        'Mint Your Copies'
                      )}
                    </TriggerButton>
                    <NeomorphicCheckbox check={false} readonly />
                  </ActionItem>
                )}
                {daoData.auctionsStarted ? (
                  <ActionItem>
                    <DoneAction>{'Triggered Auctions'}</DoneAction>
                    <NeomorphicCheckbox check readonly />
                  </ActionItem>
                ) : (
                  <ActionItem>
                    <TriggerButton
                      onClick={triggerFirstAuction}
                      disabled={
                        triggerPending || daoData.premintedByAuthor === 0
                      }
                    >
                      {triggerPending ? (
                        <Loading height={20} dotHeight={20} />
                      ) : (
                        'Trigger Auctions'
                      )}
                    </TriggerButton>
                    <NeomorphicCheckbox
                      check={daoData.auctionsStarted}
                      readonly
                    />
                  </ActionItem>
                )}
                {canTriggerNextEdition ? (
                  <ActionItem>
                    <TriggerButton
                      onClick={() => setShowNextEditionModal(true)}
                      disabled={nextEditionPending}
                    >
                      {nextEditionPending ? (
                        <Loading height={20} dotHeight={20} />
                      ) : (
                        'Enable Next Edition'
                      )}
                    </TriggerButton>
                    <NeomorphicCheckbox check={false} readonly />
                  </ActionItem>
                ) : (
                  <ActionItem>
                    <DoneAction>{'Enable Next Edition'}</DoneAction>
                    <NeomorphicCheckbox check={false} readonly />
                  </ActionItem>
                )}
              </ActionItems>
            </AuthorSection>
          )}
        </>
      )}
      {showConfigureModal && (
        <ConfigureModal
          onConfigure={configure}
          configurePending={configurePending}
        />
      )}
      {showAuthorMintModal && (
        <BaseModal onClose={() => setShowAuthorMintModal(false)}>
          <ContentWrapper>
            <ModalHeader>Claim Your Copies</ModalHeader>
            <ModalText>
              {`You as an author can mint an amount of your project's Genesis
              Edition NFTs for yourself. Only after minting this amount, can you
              trigger the public auctions for your first edition. MAX: ${daoData.currenEditionMaxSupply}`}
            </ModalText>
            <CTAWrapper>
              <InputField
                value={authorMintInput}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const onlyNumbers = /^[0-9\b]+$/;
                  if (
                    e.target.value === '' ||
                    onlyNumbers.test(e.target.value)
                  ) {
                    setAuthorMintInput(e.target.value);
                  }
                }}
                error={
                  (Number(authorMintInput) < 1 ||
                    Number(authorMintInput) > daoData.currenEditionMaxSupply) &&
                  'Incorrect amount.'
                }
              />

              <MintButton
                disabled={
                  authorMintPending ||
                  Number(authorMintInput) < 1 ||
                  Number(authorMintInput) > daoData.currenEditionMaxSupply
                }
                onClick={authorMint}
              >
                {authorMintPending ? (
                  <Loading height={20} dotHeight={20} />
                ) : (
                  'MINT'
                )}
              </MintButton>
            </CTAWrapper>
          </ContentWrapper>
        </BaseModal>
      )}
      {showBuyModal && (
        <BaseModal onClose={() => setShowBuyModal(false)}>
          <ContentWrapper>
            <ModalHeader>{`Current Price: ${formatEther(
              parseInt(currentPrice._hex, 16).toString()
            )} MATIC`}</ModalHeader>
            <ModalText>
              In a dutch auction the price keeps going down. Don't miss the
              chance and mint now, before someone else does.
            </ModalText>
            <MintButton disabled={mintPending} onClick={mint}>
              {mintPending ? <Loading height={20} dotHeight={20} /> : 'MINT'}
            </MintButton>
          </ContentWrapper>
        </BaseModal>
      )}
      {showNextEditionModal && (
        <BaseModal onClose={() => setShowNextEditionModal(false)}>
          <ContentWrapper>
            <ModalHeader>{'Trigger Next Edition'}</ModalHeader>
            <ModalText>Specify the max amount and price per mint.</ModalText>
            Two inputs and CTA with loading here
          </ContentWrapper>
        </BaseModal>
      )}
    </Root>
  );
}

export default ProjectDetailView
