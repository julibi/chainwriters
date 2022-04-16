import React, { useCallback, useEffect, useState } from 'react'
import { formatEther, parseEther } from '@ethersproject/units'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Loading from '../../components/Loading'
import PieChart from '../../components/PieChart'
import { useGetProjectDetails } from '../../state/projects/hooks'
import { SectionTitle } from '../../components/ProjectSection'
import { BASE_BORDER_RADIUS, BASE_BOX_SHADOW, PLAIN_WHITE } from '../../themes'
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
  justify-content: center;
  margin-block-start: 3rem;
`;

const MainInfoWrapper = styled.section`
  display: flex;
  width: 90%;
  max-width: 1200px;
  color: ${PLAIN_WHITE};

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

const InfoRight = styled.div`
  flex: 1;

  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${BASE_BOX_SHADOW};
  margin-inline-start: 2rem;
  padding: 2rem;
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

const ProjectDetailView = () => {
  const router = useRouter();
  const { projectAddress } = router.query;
  const getProjectDetails = useGetProjectDetails();
  const ProjectContract = useProjectContract(projectAddress as string);
  const [daoData, setDaoData] = useState<DaoData | null>(null);
  const [successfullyLoaded, setSuccessfullyLoaded] = useState<boolean>(false);

  const callGetProjectDetails = useCallback(async(projectAddress: string) => {
    const result = await getProjectDetails(projectAddress);
    const mockDao = {
      address: "0xE5D7BFed391508d5191DEb18301b63dc84FcD444",
      title: "MOCK DAO",
      author: "0x61a2ef03e18A78B8337Cd7409C02b61D694F28C0",
      mintPrice: "2000000000000000",
      fundedAmount: "10",
      firstEditionMax: "12",
      createdAt: "1649784856",
      genre: null,
      subtitle: null
    };
    setDaoData(mockDao);
  }, [getProjectDetails]);

  useEffect(() => {
    if (projectAddress && !successfullyLoaded) {
      // @ts-ignore
      callGetProjectDetails(projectAddress);

      ProjectContract.project()
        .then((x: any) => {
          console.log(x);
          setSuccessfullyLoaded(true);
        })
        .catch((e: unknown) => {
          console.log({ e });
        });
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
            <PieChart
              part={daoData.fundedAmount}
              whole={daoData.firstEditionMax}
            />
          </InfoLeft>
          <InfoRight>
            <Image
              src={'/ImgPlaceholder.png'}
              height={'100%'}
              width={'100%'}
              alt={'Project Image'}
            />
          </InfoRight>
        </MainInfoWrapper>
      )}
    </Root>
  );
}

export default ProjectDetailView
