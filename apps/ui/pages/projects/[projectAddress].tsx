import React, { useCallback, useEffect, useState } from 'react'
import { formatEther, parseEther } from '@ethersproject/units'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Loading from '../../components/Loading'
import { useGetProjectDetails } from '../../state/projects/hooks'
import PieChart from '../../components/PieChart'
import { SectionTitle } from '../../components/ProjectSection'
import { truncateAddress } from '../../components/WalletIndicator'
import { BaseButton, BASE_BORDER_RADIUS, BASE_BOX_SHADOW, DISABLED_WHITE, INSET_BASE_BOX_SHADOW, PLAIN_WHITE, PrimaryButton } from '../../themes'
import timestampConverter from '../../utils/timestampConverter'
import useProjectContract from '../../hooks/useProjectContract'

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
`;

const InfoLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${BASE_BOX_SHADOW};
  padding: 2rem;
`;

const PieChartWrapper = styled.div`
  display: inline-block;
  margin: 0 auto;
  margin-block-end: 2rem;
`;

const Title = styled(SectionTitle)`
  text-align: left;
  margin-block-end: 2rem;
`;

const Info = styled.h4`
  display: inline-block;
  margin-block-start: 0;
  padding: .5rem 1rem;
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${BASE_BOX_SHADOW};
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledControl = styled(BaseButton)``;

const StyledFakeInput = styled.span`
  width: 100px;
  display: inline-block;
  margin: 0 1rem;
  text-align: center;
`;

const DepositButton = styled(PrimaryButton)`
  font-family: 'Roboto Mono Bold';
  padding: 1rem;
  width: 209px;

  :disabled {
    background-color: ${DISABLED_WHITE};
    :hover {
      cursor: auto;
    }
  }
`;

const InfoRight = styled.div`
  flex: 1;

  margin-inline-start: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > div {
    padding: 2rem;
    border-radius: ${BASE_BORDER_RADIUS};
    box-shadow: ${BASE_BOX_SHADOW};
  }
`;

const ImageWrapper = styled.div`
  height: 100%;
  margin-block-end: 2rem;

  > span {
    object-fit: contain;
    width: 500px !important;
    height: 400px !important;
  }
`;

const Author = styled.div`
`;

const DescriptionWrapper = styled.section`
  display: flex;
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

const ProjectDetailView = () => {
  const router = useRouter();
  const { projectAddress } = router.query;
  const getProjectDetails = useGetProjectDetails();
  const ProjectContract = useProjectContract(projectAddress as string);
  const [daoData, setDaoData] = useState<DaoData | null>(null);
  const [coverImgLink, setCoverImgLink] = useState<string>(null);
  const [successfullyLoaded, setSuccessfullyLoaded] = useState<boolean>(false);
  const [mintingAmount, setMintingAmount] = useState<number>(1);
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
    const result = await getProjectDetails(projectAddress);
    const mockDao = {
      address: "0xE5D7BFed391508d5191DEb18301b63dc84FcD444",
      title: "MOCK DAO",
      author: "0x61a2ef03e18A78B8337Cd7409C02b61D694F28C0",
      mintPrice: "2000000000000000",
      fundedAmount: "8",
      firstEditionMax: "12",
      createdAt: "1649784856",
      genre: null,
      subtitle: null
    };
    setDaoData(mockDao);
    
  }, [getProjectDetails]);

  useEffect(() => {
    setCoverImgLink("https://ipfs.io/ipfs/QmbsMGBbjGjvX1ihkQQQWSxSzSdbRU9RiWMXr8e3KNWNLf");
  }, []);
  
  useEffect(() => {
    if (projectAddress && !successfullyLoaded) {
      // @ts-ignore
      callGetProjectDetails(projectAddress);
      setSuccessfullyLoaded(true);

      // ProjectContract.project()
      //   .then((x: any) => {
      //     setCoverImgLink("https://ipfs.io/ipfs/QmbsMGBbjGjvX1ihkQQQWSxSzSdbRU9RiWMXr8e3KNWNLf");
      //     setSuccessfullyLoaded(true);
      //   })
      //   .catch((e: unknown) => {
      //     console.log({ e });
      //   });
    }
  }, [
    projectAddress,
    ProjectContract,
    callGetProjectDetails,
    successfullyLoaded,
  ]);

  return (
    <Root>
      {!daoData && <Loading height={530} />}
      {daoData && (
        <>
        <MainInfoWrapper>
          <InfoLeft>
            <Title>{daoData.title}</Title>
            {daoData.subtitle && <Info>{daoData.subtitle}</Info>}
            <FlexWrapper>
              <Info>{daoData.genre ?? 'Unknown Genre'}</Info>
              <Info>{`Created: ${timestampConverter(daoData.createdAt)}`}</Info>
            </FlexWrapper>
            <FlexWrapper>
              <Info>{`First Edition Max: ${daoData.firstEditionMax}`}</Info>
              <Info>{`Price Per Spot: ${formatEther(
                daoData.mintPrice
              )} MATIC`}</Info>
            </FlexWrapper>
            <PieChartWrapper>
              <PieChart
                part={Number(daoData.fundedAmount)}
                whole={Number(daoData.firstEditionMax)}
              />
            </PieChartWrapper>
            <FlexWrapper>
              <div>
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
              </div>
              <DepositButton onClick={handleDeposit}>
                {`Deposit For ${formatEther(
                  (Number(daoData.mintPrice) * mintingAmount).toString()
                )}`}
              </DepositButton>
            </FlexWrapper>
          </InfoLeft>
          <InfoRight>
            <ImageWrapper>
              <Image
                src={coverImgLink ?? '/ImgPlaceholder.png'}
                height={'100%'}
                width={'100%'}
                alt={'Project Image'}
              />
            </ImageWrapper>
            <Author>
              <span>{`Author: ${truncateAddress(daoData.author)}`}</span>
            </Author>
          </InfoRight>
        </MainInfoWrapper>
        <DescriptionWrapper>
          <SectionTitle>Description</SectionTitle>
          "Lorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum"
        </DescriptionWrapper>
        </>
      )}
    </Root>
  );
}

export default ProjectDetailView
