import { useWeb3React } from '@web3-react/core'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import React, { useCallback, useEffect, useState } from 'react'
import client from '../../../apolloclient'
import { truncateAddress } from '../../../components/WalletIndicator'
import useProjectContract from '../../../hooks/useProjectContract'
import { GET_ONE_DAO } from '../../../state/projects/hooks'
import Loading from '../../../components/Loading'
import Typewriter from '../../../components/Typewriter'
import { BASE_BORDER_RADIUS, BASE_BOX_SHADOW, PLAIN_WHITE } from '../../../themes'

const animation = (animationseconds: number) => `
  animation: fadein ${animationseconds}s;

  @keyframes fadein {
      from { opacity: 0; }
      to   { opacity: 1; }
  }
`;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem;

  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${BASE_BOX_SHADOW};
`;

const TopRow = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
`;

const BackArrow = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  z-index: 1;
  display: flex;
  align-items: center;

  :hover {
    cursor: pointer;
  }

  @media (max-width: 900px) {
    top: 1rem;
  }
`;

const Arrow = styled.i`
  border: solid ${PLAIN_WHITE};
  border-width: 0 2px 2px 0;
  display: inline-block;
  margin-inline-start: .5rem;
  padding: 3px;
  transform: rotate(320deg);
`;

const TitleWrapper = styled.div`
  padding: 2rem;
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const Title = styled.h1``;

const Wrapper = styled.div`
  padding-inline: 2rem;
  margin-block-end: 1rem;

  ${animation(2)}
`;

const SubTitle = styled.h3`
  font-family: 'Roboto Mono Bold', Serif;
`;

const Author = styled.h3`
  font-family: 'Roboto Mono Bold', Serif;
`;

const TextWrapper = styled.div`
  flex: 1;
  padding: 2rem;
  margin-block-end: 1rem;

  ${animation(4)};
`;

const Text = styled.p``;

interface ReadData {
  author: string;
  title: string;
  subtitle?: string;
  genre?: string;
  textIpfsHash: string;
  createdAt: string;
}

const Read = () => {
  const { account } = useWeb3React();
  const router = useRouter();
  let projectAddress = router.query.projectAddress;
  projectAddress = Array.isArray(projectAddress) ? projectAddress[0] : projectAddress;
  const ProjectContract = useProjectContract(projectAddress as string);
  const [allowed, setAllowed] = useState<boolean>(false);
  const [readingData, setReadingData] = useState<ReadData | null>(null);
  const [text, setText] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleClickGoBack = useCallback((e) => {
    e.preventDefault();
    router.push(`/projects/${projectAddress}`)
  }, [projectAddress, router]);

  const fetchAllowed = useCallback(async() => {
    if (account && ProjectContract) {
      setLoading(true);
      const balancesOfUser = [];
      try {
        const currentEditionBigInt = await ProjectContract.currentEdition();
        const currentEdition = parseInt(currentEditionBigInt._hex, 16);
        for (let i = 1; i < currentEdition + 1; i++) {
          const balanceOfBig = await ProjectContract.balanceOf(account, i);
          const balance = parseInt(balanceOfBig._hex, 16);
          balancesOfUser.push({ id: i, balance });
        }
        const hasAtLeastOne = !!balancesOfUser.find(x => x.balance > 0);
        setAllowed(hasAtLeastOne);
      } catch(e: unknown) {
        console.log({ e });
      }
      setLoading(false);
    }
  }, [account, ProjectContract]);

  const fetchText = useCallback(async() => {
    if (ProjectContract) {
      setLoading(true);
      const {
        data: { dao },
      } = await client.query({
        query: GET_ONE_DAO,
        // @ts-ignore
        variables: { address: projectAddress.toLowerCase() },
      });
      if (dao) {
        try {
          const response = await fetch(`https://ipfs.io/ipfs/${dao.textIpfsHash}`);
          if(response.ok) {
            const fetchedText = await response.text();
            console.log({ fetchedText });
            setText(fetchedText);
          }
          setReadingData({
            author: dao.author,
            title: dao.title,
            subtitle: dao.subtitle,
            genre: dao.genre,
            textIpfsHash: dao.textIpfshash,
            createdAt: dao.createdAt
          });
        } catch(e: unknown) {
          console.log({ e });
        }
      }
      setLoading(false);
    }
  }, [ProjectContract, projectAddress]);

  useEffect(() => {
    fetchAllowed();
  }, [account, ProjectContract, fetchAllowed]);

  useEffect(() => {
    if (allowed) {
      fetchText();
    }
  }, [allowed, fetchText]);

  if (loading && !readingData) {
    return (
      <Root>
        <Loading height={530} />
      </Root>
    );
  }

  if (!allowed && !loading) {
    return (
      <Root>
        <Title>Sorry, you need to own an NFT to read this.</Title>
      </Root>
    );
  }
  return (
    <Root>
      <TopRow>
        <TitleWrapper>
          <Typewriter typedText={readingData.title} />
        </TitleWrapper>
        <BackArrow onClick={handleClickGoBack}>
          Back to Project
          <Arrow className="arrow" />
        </BackArrow>
      </TopRow>
      <FlexWrapper>
        {readingData.subtitle && (
          <Wrapper>
            <SubTitle>{readingData.subtitle}</SubTitle>
          </Wrapper>
        )}
        <Wrapper>
          <Author>{`By ${truncateAddress(readingData.author)}`}</Author>
        </Wrapper>
      </FlexWrapper>
      <TextWrapper>
        <Text>{text}</Text>
      </TextWrapper>
    </Root>
  );
}

export default Read