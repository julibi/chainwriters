import React, { useCallback, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import useAllNftsOfUser from '../hooks/useAllNftsOfUser'
import { SectionTitle, SectionTitleWrapper } from '../components/HomePage/ProjectSection';
import { BaseButton, BASE_BORDER_RADIUS, BASE_BOX_SHADOW, PINK } from '../themes';
import Loading from '../components/Loading'
import { useFetchContributedDaos, useFetchCreatedDaos } from '../state/mybookshelf/hooks'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem;

  @media (max-width: 900px) {
    padding: 0;
  }
`;

const SubHeader = styled.h3`
  display: inline-block;
  font-family: 'Roboto Mono Bold';
  text-align: center;
  text-transform: uppercase;
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${BASE_BOX_SHADOW};
  margin-block-end: 3rem;
  padding: 0.5rem;
  width: fit-content;
`;

const Item = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${BASE_BOX_SHADOW};
  padding: 1rem;
  margin-block-end: 1rem;
`;

const BlockSpan = styled.span`
  display: inline-block;
`;

const Title = styled(BlockSpan)`
  width: 30%;
`;

const Edition = styled(BlockSpan)`
  @media (max-width: 900px) {
    display: none;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
`;

const DetailsButton = styled(BaseButton)`
  margin-inline-start: 1rem;
`;

const ReadButton = styled(BaseButton)`
  margin-inline-start: 1rem;
  background-color: ${PINK};

  @media (max-width: 900px) {
    display: none;
  }
`;

const MyBookShelf = () => {
  const { account, chainId } = useWeb3React();
  const { allNftsOfUser, loading } = useAllNftsOfUser();
  const router = useRouter();
  const { data: created, loading: createdLoading, error: createdError } = useFetchCreatedDaos();
  const { data: contributed, loading: contributedLoading, error: contributedError } = useFetchContributedDaos();

  const handleClickRead = useCallback((e, address) => {
    e.preventDefault();
    router.push(`/projects/${address}/read`)
  }, [router]);

  const handleClickDetails = useCallback((e, address) => {
    e.preventDefault();
    router.push(`/projects/${address}`)
  }, [router]);

  return (
    <Root>
      <SectionTitleWrapper>
        <SectionTitle>My Bookshelf</SectionTitle>
      </SectionTitleWrapper>
      {loading && <Loading height={200} />}
      {!loading && !createdLoading && !createdError && (created.daos.length > 0) && (
        <Section>
          <SubHeader>My Projects</SubHeader>
          {created.daos.map((project, idx) => (
            <Item key={idx}>
              <Title>{project.title}</Title>
              <ButtonsWrapper>
                <DetailsButton
                  onClick={(e) => handleClickDetails(e, project.address)}
                >
                  View Details
                </DetailsButton>
                <ReadButton
                  onClick={(e) => handleClickRead(e, project.address)}
                >
                  Read
                </ReadButton>
              </ButtonsWrapper>
            </Item>
          ))}
        </Section>
      )}
      {!loading && !contributedLoading && !contributedError && (contributed.contributions.length > 0) && (
        <Section>
          <SubHeader>My Contributions</SubHeader>
          {contributed.contributions.map((project, idx) => (
            <Item key={idx}>
              <Title>{project.dao.title}</Title>
              <BlockSpan>{project.role}</BlockSpan>
              <BlockSpan>{`${project.share} %`}</BlockSpan>
              <ButtonsWrapper>
                <DetailsButton
                  onClick={(e) => handleClickDetails(e, project.address)}
                >
                  View Details
                </DetailsButton>
              </ButtonsWrapper>
            </Item>
          ))}
        </Section>
      )}
      {allNftsOfUser && !loading && (
        <Section>
          <SubHeader>My NFTs</SubHeader>
          {allNftsOfUser.length < 1 && (
            <BlockSpan>You do not own any Literature NFTs.</BlockSpan>
          )}
          {allNftsOfUser.length > 0 &&
            allNftsOfUser.map((nft, idx) => (
              <Item key={idx}>
                <Title>{nft.title}</Title>
                <Edition>
                  {Number(nft.id.tokenId) === 1
                    ? 'Genesis Edition'
                    : `Edition ${Number(nft.id.tokenId)}`}
                  {` x ${nft.balance}`}
                </Edition>
                <ButtonsWrapper>
                  <DetailsButton
                    onClick={(e) => handleClickDetails(e, nft.contract.address)}
                  >
                    View Details
                  </DetailsButton>
                  <ReadButton
                    onClick={(e) => handleClickRead(e, nft.contract.address)}
                  >
                    Read
                  </ReadButton>
                </ButtonsWrapper>
              </Item>
            ))}
        </Section>
      )}
    </Root>
  );
}

export default MyBookShelf