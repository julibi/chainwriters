import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify';
import { formatEther } from '@ethersproject/units'
import { useWeb3React } from '@web3-react/core';
import Image from 'next/image'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useGetProjectDetails } from '../../state/projects/hooks'
import BaseModal from '../../components/BaseModal'
import Countdown from '../../components/Countdown'
import Loading from '../../components/Loading'
import PieChart from '../../components/PieChart'
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
} from '../../themes';
import useProjectContract from '../../hooks/useProjectContract'
import MintSection from '../../components/MintSection'
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
  justify-content: space-between;
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
      cursor: auto;
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
  margin-block: 1rem;
  text-align: center;
`;

const TriggerButton = styled(BaseButton)`
  background-color: ${BG_NORMAL};
  color: ${PINK};
  font-family: 'Roboto Mono Bold';
  padding: 1rem;
  width: 209px;

  :disabled {
    :hover {
      cursor: auto;
    }
  }

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const ProjectDetailView = () => {
  const { account } = useWeb3React();
  const router = useRouter();
  let projectAddress = router.query.projectAddress;
  projectAddress = Array.isArray(projectAddress) ? projectAddress[0] : projectAddress;
  const getProjectDetails = useGetProjectDetails();
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
  
  const callGetProjectDetails = useCallback(async(projectAddress: string) => {
    const ProjectData: ProjectData = await getProjectDetails(projectAddress);
    setDaoData(ProjectData);
    setSuccessfullyLoaded(true);
  }, [getProjectDetails]);
  
  // if current Edition is not Genesis, we fetch the total Supply by ID
  const totalSupplyOfCurrentEdition = useMemo(async() => {
    if (daoData && daoData.currentEdition > 1) { 
      const totalSupply = await ProjectContract.totalSupply(daoData.currentEdition);     
      return totalSupply;
    }
  }, [daoData, ProjectContract]);

  const isAuthor = useMemo(() => {
    if (daoData && account.toLowerCase() === daoData.author.toLowerCase()) {
      return true;
    }
    return false;
  }, [daoData, account]);

  const authorShare = useMemo(() => {
    if (daoData && daoData.contributions.length > 0) {      
      const contributorsShareTotal = daoData.contributions.reduce((partialSum, a) => partialSum + a.share, 0);
      const result = 85 - contributorsShareTotal;
      return result;
    }
  }, [daoData]);

  useEffect(() => {
    if (projectAddress) {
      // @ts-ignore
      callGetProjectDetails(projectAddress);
    }
  }, [projectAddress]);

  const mint = useCallback(async() => {
      ProjectContract
      .buy({value: currentPrice})
      .then(mintTx => {
        const { hash } = mintTx;
        setMintPending(true);
        toast.info(`Pending: ${hash}`);
        ProjectContract.provider.once(hash, (transaction) => {
          toast.success(`Success: ${hash}`);
          setMintPending(false);
        });
      })
      .catch(e => {
        console.log({ e });
        toast.error('Something went wrong.');
        setMintPending(false);
      });
  }, [ProjectContract, currentPrice]);

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
      ProjectContract.provider.once(hash, (transaction) => {
        // refetch
        // @ts-ignore
        callGetProjectDetails(projectAddress);
        setLoading(false);
      });
    } catch(e: unknown) {
      console.log({ e });
      setLoading(false);
    }
  }, [ProjectContract, callGetProjectDetails, projectAddress]);

  const triggerFirstAuction = useCallback(async () => {
    if (
      daoData &&
      daoData.author &&
      account.toLowerCase() === daoData.author.toLowerCase()
    ) {
      try {
        setTriggerPending(true);
        // TODO: understand the rate
        const Tx = await ProjectContract.triggerFirstAuction(100000000);
        const { hash } = Tx;
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
    account,
    daoData,
    ProjectContract,
    callGetProjectDetails,
    projectAddress,
  ]);

  const showsAuctionText = useCallback(() => {
    if (!daoData) return;
    const { auctionsStarted, auctionsEnded, expiresAt } = daoData;
    if (auctionsEnded) {
      return <Key>{'Auctions finished'}</Key>
    }
    if (auctionsStarted) {
      if (expiresAt > 0) {
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
      }
    }
    return <Key>{'Auction Has Not Started Yet'}</Key>;
  }, [daoData]);

// Mint button should be disabled while loading
// pending and success messages are weird
// is price going down? - understand the rate...

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
              {(daoData.currentEdition > 1) && <MintSection />}
                {daoData.currentEdition === 1 &&
                  <>                
                  <AuctionTitle>AUCTION</AuctionTitle>
                  <FlexWrapper>
                    <InfoBlock style={{ marginInlineEnd: '2rem' }}>
                     {showsAuctionText()}
                    </InfoBlock>
                    <InfoBlock>
                      <Key>{'Starting Price'}</Key>
                      {daoData && (
                        // @ts-ignore
                        <Val>{`${formatEther(parseInt(daoData.editions[0].mintPrice._hex, 16).toString())} MATIC`}</Val>
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
                    <InfoBlock style={{ marginInlineEnd: '2rem' }}>
                      <Key>{'Genesis Edition Total'}</Key>
                        <Val
                          style={{
                            fontSize: '22px',
                            fontFamily: 'Nunito Sans Bold',
                          }}
                        >
                          {daoData.totalSupplyGenEd}
                        </Val>
                    </InfoBlock>
                    {daoData.auctionsStarted && !daoData.auctionsEnded &&
                    <>
                      {
                        (Math.floor(Date.now() / 1000) > daoData.expiresAt) ? (
                          <StyledPrimaryButton
                            onClick={() => retriggerAuction()}
                            disabled={loading}
                          >
                            {loading ? <Loading height={20} dotHeight={20} short /> : 'Retrigger Auction'}
                          </StyledPrimaryButton>
                        ) : (
                          <StyledPrimaryButton
                            onClick={() => fetchCurrentPrice()}
                            disabled={loading}
                          >
                            {loading ? <Loading height={20} dotHeight={20} short /> : 'Get Current Price'}
                          </StyledPrimaryButton>
                        )
                      }
                    </>
                    }
                    {(!daoData.auctionsStarted || daoData.auctionsEnded) &&
                      <StyledPrimaryButton disabled>
                        Get Current Price
                      </StyledPrimaryButton>
                    }
                  </FlexWrapper>
                </>
              }
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
                    {cntrb.role.length
                      ? cntrb.role
                      : 'Unknown role'}
                  </ShareTitle>
                  <ShareAddress>
                    {truncateAddress(cntrb.address)}
                  </ShareAddress>
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
            <Title style={{ maxWidth: '200px' }}>Description</Title>
            <Description>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
              dolor sit amet.
            </Description>
          </DescriptionSection>
          {isAuthor && 
            <AuthorSection>
              <Title style={{ maxWidth: '300px' }}>Control Settings for Author</Title>
              <TriggerButton
                onClick={triggerFirstAuction}
                disabled={daoData.auctionsStarted}
              >
               {triggerPending ? <Loading height={20} dotHeight={20} /> : 'Trigger Auctions'}
              </TriggerButton>
            </AuthorSection>
          }
        </>
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
            <StyledPrimaryButton onClick={mint}>MINT</StyledPrimaryButton>
          </ContentWrapper>
        </BaseModal>
      )}
    </Root>
  );
}

export default ProjectDetailView
