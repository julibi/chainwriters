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
import { BASE_BORDER_RADIUS, BASE_BOX_SHADOW, DISABLED_WHITE, PINK, PLAIN_WHITE, PrimaryButton } from '../../themes'
import useProjectContract from '../../hooks/useProjectContract'
import { NULL_ADDRESS } from '../../../constants'
import MintSection from 'apps/ui/components/MintSection';

// TODO
// author view
// contributor view
// anyone else

interface DaoData {
  address: string;
  title: string;
  author: string;
  createdAt: string;
  genre: null | string
  subtitle: null | string;
}

interface Contributor {
  address: string;
  role: string;
  share: number;
}

interface BigIntHexNoUnderscore {
  hex: number;
}

interface AuctionData {
  auctionStarted: boolean;
  auctionPhaseFinished: boolean;
  expiresAt: number;
  totalSupply: number;
  currentEdition: number;
  max: number;
  price: BigIntHexNoUnderscore;
}
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

const ProjectDetailView = () => {
  const { account } = useWeb3React();
  const router = useRouter();
  const { projectAddress } = router.query;
  const getProjectDetails = useGetProjectDetails();
  const ProjectContract = useProjectContract(projectAddress as string);
  const [daoData, setDaoData] = useState<DaoData | null>(null);
  const [coverImgLink, setCoverImgLink] = useState<string>(null);
  const [successfullyLoaded, setSuccessfullyLoaded] = useState<boolean>(false);
  
  const [contributors, setContributors] = useState<Contributor[] | null>(null);
  const [isAuthor, setIsAuthor] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showBuyModal, setShowBuyModal] = useState<boolean>(false);
  // todo: big integer
  const [mintPending, setMintPending] = useState<boolean>(false);
  const [auctionData, setAuctionData] = useState<AuctionData | null>(null);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [totalSupply, setTotalSupply] = useState<number | null>(null);
  
  const callGetProjectDetails = useCallback(async(projectAddress: string) => {
    const { contribs, auctions } = await getProjectDetails(projectAddress);
    const contributorsData = contribs.results.PROJECT_CONTRIBS.callsReturnContext.map((contrib, i) => {
      return {
        address: contrib.returnValues[0],
        share: parseInt(contrib.returnValues[1].hex, 16),
        role: ""
      };
    })
    .filter(element => element.address !== NULL_ADDRESS);
    setContributors(contributorsData);
    const auctionData = auctions.results.PROJECT_AUCTIONS.callsReturnContext;
    const auctionStarted = auctionData.find(x => x.reference == 'auctionStarted').returnValues[0];
    const auctionPhaseFinished = auctionData.find(x => x.reference == 'auctionPhaseFinished').returnValues[0];
    const expiresAt = parseInt(auctionData.find(x => x.reference == 'expiresAt').returnValues[0].hex.toString(), 16)
    const genEdTotalSupply = parseInt(auctionData.find(x => x.reference == 'genEdTotalSupply').returnValues[0].hex.toString(), 16);
    const currentEdition = parseInt(auctionData.find(x => x.reference == 'currentEdition').returnValues[0].hex, 16);
    const currentEditionMax = parseInt(auctionData.find(x => x.reference == 'currentEditionMax').returnValues[0].hex, 16);
    const initialMintPrice = auctionData.find(x => x.reference == 'initialMintPrice').returnValues[0];
    
    setAuctionData({
      auctionStarted,
      auctionPhaseFinished,
      expiresAt,
      totalSupply: genEdTotalSupply,
      currentEdition,
      max: currentEditionMax,
      price: initialMintPrice
    });

    const mockDao = {
      address: "0xE5D7BFed391508d5191DEb18301b63dc84FcD444",
      title: "MOCK DAO",
      author: "0x61a2ef03e18A78B8337Cd7409C02b61D694F28C0",
      createdAt: "1649784856",
      genre: null,
      subtitle: "My Subtitle"
    };

    setDaoData(mockDao);
  
  }, [getProjectDetails]);
  
  const authorShare = useMemo(() => {
    if (contributors && daoData) {      
      const contributorsShareTotal = contributors.reduce((partialSum, a) => partialSum + a.share, 0);
      const result = 85 - contributorsShareTotal;
      return result;
    }
  }, [contributors, daoData]);

  const mint = useCallback(async() => {
    // pass the amount
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

  useEffect(() => {
    if (projectAddress && !successfullyLoaded) {
      // @ts-ignore
      callGetProjectDetails(projectAddress);
      setSuccessfullyLoaded(true);

      ProjectContract.project()
        .then((x: any) => {
          setCoverImgLink("https://ipfs.io/ipfs/Qmdp4FB1QBXnMbPP3QfR7jKgBD2o5HMdDpdrXWad991Sf4");
          setSuccessfullyLoaded(true);
          if (x.author_address == account) {
            setIsAuthor(true);
          }
        })
        .catch((e: unknown) => {
          console.log({ e });
        });
    }
  }, [
    account,
    projectAddress,
    ProjectContract,
    callGetProjectDetails,
    successfullyLoaded,
  ]);

  const fetchCurrentEditionTotalSupply = useCallback(async() => {
    if (auctionData && auctionData.currentEdition) {
      const totalSupplyBig = await ProjectContract.totalSupply(auctionData.currentEdition);
      setTotalSupply(parseInt(totalSupplyBig._hex, 16));
    }
  }, [ProjectContract, auctionData]);

  useEffect(() => {
    if (auctionData && auctionData.currentEdition) {
      fetchCurrentEditionTotalSupply();
    }
  }, [auctionData, fetchCurrentEditionTotalSupply]);

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

  const showsAuctionText = () => {
    if (!auctionData) return;
    if (auctionData.auctionPhaseFinished) {
      return <Key>{'Auctions finished'}</Key>
    }
    if (auctionData.expiresAt > 0) {
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
                end={auctionData.expiresAt}
              />
            </Val>
          </>
      );
    }
    return <Key>{'Auction Has Not Started Yet'}</Key>;
  };

  return (
    <Root>
      {!daoData && <Loading height={530} />}
      {daoData && (
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
              {(auctionData.currentEdition > 1 && auctionData && totalSupply < auctionData.max) ?
                <MintSection /> :
                <>                
                  <AuctionTitle>AUCTION</AuctionTitle>
                  <FlexWrapper>
                    <InfoBlock style={{ marginInlineEnd: '2rem' }}>
                     {showsAuctionText()}
                    </InfoBlock>
                    <InfoBlock>
                      <Key>{'Starting Price'}</Key>
                      {auctionData && (
                        <Val>{`${formatEther(auctionData.price.hex)} MATIC`}</Val>
                      )}
                    </InfoBlock>
                  </FlexWrapper>
                  {auctionData && (
                    <PieChartWrapper>
                      <PieChart
                        part={auctionData.totalSupply}
                        whole={auctionData.max}
                      />
                    </PieChartWrapper>
                  )}
                  <FlexWrapper style={{ marginBlockEnd: '0' }}>
                    <InfoBlock style={{ marginInlineEnd: '2rem' }}>
                      <Key>{'Genesis Edition Total'}</Key>
                      {auctionData && (
                        <Val
                          style={{
                            fontSize: '22px',
                            fontFamily: 'Nunito Sans Bold',
                          }}
                        >
                          {auctionData.max}
                        </Val>
                      )}
                    </InfoBlock>
                    {auctionData.auctionStarted && !auctionData.auctionPhaseFinished &&
                    <>
                      {
                        (Math.floor(Date.now() / 1000) > auctionData.expiresAt) ? (
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
                    {(!auctionData.auctionStarted || auctionData.auctionPhaseFinished) &&
                      <StyledPrimaryButton disabled>
                        Get Current Price
                      </StyledPrimaryButton>
                    }
                  </FlexWrapper>
                </>
              }
            </InfoRight>
          </MainInfoWrapper>
          {/* <ShareSection>
            <Title style={{ maxWidth: '200px' }}>Contributors</Title>
            <Shares>
              <Share>
                <ShareTitle>Author</ShareTitle>
                <ShareAddress>{truncateAddress(daoData.author)}</ShareAddress>
                <SharePercentage>{`${authorShare} %`}</SharePercentage>
              </Share>
              {contributors.map((contributor, i) => (
                <Share key={i}>
                  <ShareTitle>
                    {contributor.role.length
                      ? contributor.role
                      : 'Unknown role'}
                  </ShareTitle>
                  <ShareAddress>
                    {truncateAddress(contributor.address)}
                  </ShareAddress>
                  <SharePercentage>{`${contributor.share} %`}</SharePercentage>
                </Share>
              ))}
              <Share>
                <ShareTitle>Moonlit Foundation</ShareTitle>
                <ShareAddress>{truncateAddress(factoryOwner)}</ShareAddress>
                <SharePercentage>15 %</SharePercentage>
              </Share>
            </Shares>
            <PieChart
                  part={Number(daoData.fundedAmount)}
                  whole={Number(daoData.firstEditionMax)}
                />
          </ShareSection> */}
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
          {isAuthor && <div>YOU ARE THE AUTHOR</div>}
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
