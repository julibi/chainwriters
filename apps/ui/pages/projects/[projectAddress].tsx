import React, { useCallback, useEffect, useState } from 'react'
import { formatEther, parseEther } from '@ethersproject/units'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Loading from '../../components/Loading'
import { useGetProjectDetails } from '../../state/projects/hooks'
import { SectionTitle } from '../../components/ProjectSection'
import { BASE_BORDER_RADIUS, BASE_BOX_SHADOW, PLAIN_WHITE } from '../../themes'


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
            {daoData.subtitle &&<Info>{daoData.subtitle}</Info>}
            <FlexWrapper>
              <Info>{daoData.genre ?? 'Unknown Genre'}</Info>
              {/* var date = new Date(unix_timestamp * 1000); */}
              <Info>{`Created: ${daoData.createdAt}`}</Info>
            </FlexWrapper>
            <FlexWrapper>
              <Info>{`First Edition Max: ${daoData.firstEditionMax}`}</Info>
              <Info>{`Price Per Spot: ${formatEther(daoData.mintPrice)} MATIC`}</Info>
            </FlexWrapper>
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