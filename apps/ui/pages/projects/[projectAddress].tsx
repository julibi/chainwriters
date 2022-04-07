import React, { useCallback, useEffect, useState } from 'react'
import { formatEther, parseEther } from '@ethersproject/units'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Loading from '../../components/Loading'
import { useGetProjectDetails } from '../../state/projects/hooks'
import { SectionTitle } from '../../components/ProjectSection'
import { BASE_BORDER_RADIUS, BASE_BOX_SHADOW, INSET_BASE_BOX_SHADOW, PINK, PLAIN_WHITE } from '../../themes'
import timestampConverter from '../../utils/timestampConverter'
import Circle from '../../components/Circle'

import { PieChart } from 'react-minimal-pie-chart';

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

const OuterPie = styled.div`
  width: 242px;
  height: 242px;
  border-radius: 50%;
  padding: 70px;
  box-shadow: ${BASE_BOX_SHADOW};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerPie = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  box-shadow: ${INSET_BASE_BOX_SHADOW};
  position: relative;
`;

const StyledCircle = styled(Circle)`

`;

const ProjectDetailView = () => {
  const router = useRouter();
  const { projectAddress } = router.query;
  const getProjectDetails = useGetProjectDetails();
  const [daoData, setDaoData] = useState<DaoData | null>(null);

  const callGetProjectDetails = useCallback(async(projectAddress: string) => {
    const result = await getProjectDetails(projectAddress);
    setDaoData(result.dao);
  }, [getProjectDetails]);

  useEffect(() => {
    if (projectAddress) {
      // @ts-ignore
      callGetProjectDetails(projectAddress)
    }
  }, [projectAddress, callGetProjectDetails]);

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
              {/* var date = new Date(unix_timestamp * 1000); */}
              <Info>{`Created: ${timestampConverter(daoData.createdAt)}`}</Info>
            </FlexWrapper>
            <FlexWrapper>
              <Info>{`First Edition Max: ${daoData.firstEditionMax}`}</Info>
              <Info>{`Price Per Spot: ${formatEther(
                daoData.mintPrice
              )} MATIC`}</Info>
            </FlexWrapper>
            <OuterPie>
              <StyledCircle />
              <InnerPie />
            </OuterPie>
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