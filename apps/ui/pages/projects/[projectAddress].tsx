import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify';
import { formatEther, parseEther } from '@ethersproject/units'
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
import { BaseButton, BASE_BORDER_RADIUS, BASE_BOX_SHADOW, DISABLED_WHITE, PINK, PLAIN_WHITE, PrimaryButton } from '../../themes'
import timestampConverter from '../../utils/timestampConverter'
import useProjectContract from '../../hooks/useProjectContract'
import { NULL_ADDRESS } from '../../../constants'
import useFactoryContract from '../../hooks/useFactoryContract'

// TODO
// author view
// contributor view
// funder view
// anyone else

interface DaoData {
  address: string;
  title: string;
  author: string;
  mintPrice: string;
  fundedAmount: string;
  firstEditionMax: string;
  createdAt: string;
  genre: null | string
  subtitle: null | string;
}

interface Contributor {
  address: string;
  role: string;
  share: number;
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

const ControlWrapper = styled.div`
  @media (max-width: 900px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-block-end: 1rem;
  }
`;

const StyledControl = styled(BaseButton)``;

const StyledFakeInput = styled.span`
  width: 100px;
  display: inline-block;
  margin: 0 1rem;
  text-align: center;
`;

const StyledPrimaryButton = styled(PrimaryButton)`
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

const ExternalPieChartWrapper = styled.div`
  height: 300px;
  width: auto;
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
  const FactoryContract = useFactoryContract();
  const ProjectContract = useProjectContract(projectAddress as string);
  const [daoData, setDaoData] = useState<DaoData | null>(null);
  const [coverImgLink, setCoverImgLink] = useState<string>(null);
  const [successfullyLoaded, setSuccessfullyLoaded] = useState<boolean>(false);
  const [mintingAmount, setMintingAmount] = useState<number>(1);
  const [contributors, setContributors] = useState<Contributor[] | null>(null);
  const [factoryOwner, setFactoryOwner] = useState<string | null>(null);
  const [isAuthor, setIsAuthor] = useState<boolean>(false);
  const [loadingPrice, setLoadingPrice] = useState<boolean>(false);
  const [showBuyModal, setShowBuyModal] = useState<boolean>(false);
  // todo: big integer
  const [currentPrice, setCurrentPrice] = useState(null);
  const [mintPending, setMintPending] = useState<boolean>(false);
  const [auctionEnd, setAuctionEnd] = useState<number | null>(null);
  
  
  
  const handleIncrement = useCallback(() => {
    setMintingAmount(mintingAmount + 1);
  }, [mintingAmount]); 

  const handleDecrement = useCallback(() => {
    setMintingAmount(mintingAmount - 1);
  }, [mintingAmount]); 

  const handleDeposit = useCallback(() => {
    console.log("handleDeposit");
  }, [mintingAmount]); 

  const callGetProjectDetails = useCallback(async(projectAddress: string) => {
    const { contribs, auctions } = await getProjectDetails(projectAddress);
    console.log('multicall: ', {contribs, auctions });
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
    const auctionEnd = auctionData.find(x => x.reference == 'expiresAt').returnValues[0];
    setAuctionEnd(parseInt(auctionEnd.hex, 16));
    const mockDao = {
      address: "0xE5D7BFed391508d5191DEb18301b63dc84FcD444",
      title: "MOCK DAO",
      author: "0x61a2ef03e18A78B8337Cd7409C02b61D694F28C0",
      mintPrice: "50000000000000000",
      fundedAmount: "8",
      firstEditionMax: "12",
      createdAt: "1649784856",
      genre: null,
      // subtitle: "My Subtitle"
      subtitle: null
    };
    setDaoData(mockDao);
    try {
      const x = await FactoryContract.owner();
      setFactoryOwner(x);
    } catch(e) {
      // do nothing
    }
  }, [FactoryContract, getProjectDetails]);

  
  const authorShare = useMemo(() => {
    if (contributors && daoData) {      
      const contributorsShareTotal = contributors.reduce((partialSum, a) => partialSum + a.share, 0);
      const result = 85 - contributorsShareTotal;
      return result;
    }
  }, [contributors, daoData]);

  const mint = () => {
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
  };

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

  const fetchCurrentPrice = async() => {
    setLoadingPrice(true);
    const price = await ProjectContract.getPrice();
    setCurrentPrice(price);
    setLoadingPrice(false);
    setShowBuyModal(true);
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
              <AuctionTitle>AUCTION</AuctionTitle>
              <FlexWrapper>
                <InfoBlock style={{ marginInlineEnd: '2rem' }}>
                  <Key style={{ marginBlockEnd: '1rem' }}>{'Auction ends in'}</Key>
                  <Val style={{ fontSize: '22px', color: `${PINK}`, fontFamily: 'Nunito Sans Bold' }}><Countdown end={auctionEnd} /></Val>
                 
                </InfoBlock>
                <InfoBlock>
                  <Key style={{ marginBlockEnd: '1rem' }}>{'Starting Price'}</Key>
                  <Val>
                    {`${formatEther(daoData.mintPrice)} MATIC`}
                  </Val>
                </InfoBlock>
              </FlexWrapper>
              <PieChartWrapper>
                <PieChart
                  part={Number(daoData.fundedAmount)}
                  whole={Number(daoData.firstEditionMax)}
                />
              </PieChartWrapper>

              <FlexWrapper style={{ marginBlockEnd: '0' }}>
                <InfoBlock style={{ marginInlineEnd: '2rem' }}>
                  <Key style={{ marginBlockEnd: '1rem' }}>{'Genesis Edition Total'}</Key>
                  <Val style={{ fontSize: '22px', fontFamily: 'Nunito Sans Bold' }}>12</Val>
                </InfoBlock>
                <StyledPrimaryButton onClick={() => fetchCurrentPrice()}>
                  Get Current Price
                </StyledPrimaryButton>
              </FlexWrapper>
              
                {/* <ControlWrapper>
                  <StyledControl
                    onClick={handleDecrement}
                    disabled={mintingAmount === 1}
                  >
                    -
                  </StyledControl>
                  <StyledFakeInput>{mintingAmount}</StyledFakeInput>
                  <StyledControl
                    onClick={handleIncrement}
                    disabled={mintingAmount === 5}
                  >
                    +
                  </StyledControl>
                </ControlWrapper>
                <DepositButton onClick={handleDeposit}>
                  {`Deposit For ${formatEther(
                    (Number(daoData.mintPrice) * mintingAmount).toString()
                  )}`}
                </DepositButton> */}

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
