import React, { useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import {
  SectionTitle,
  SectionTitleWrapper,
} from '../components/HomePage/ProjectSection';
import {
  BASE_BORDER_RADIUS,
  ElementThemeProps,
  FONT_SERIF_BOLD,
  FONT_SERIF_REGULAR,
} from '../themes';
import Loading from '../components/Loading';
import { useGetProjectsOfAccount } from '../hooks/user/useGetProjectsOfAccount';
import BookshelfItem from '../components/Profile/BookshelfItem';
import { useGetContributionsOfAccount } from '../hooks/user/useGetContributionsOfAccount';
import { useUser } from '../hooks/user/useUser';
import { useTheme } from '../hooks/theme';
import OwnProject from '../components/Profile/OwnProject';
import ContributorProject from '../components/Profile/ContributorProject';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3rem;

  @media (max-width: 900px) {
    margin: 3rem 2rem;
  }
`;

const ItemsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const NotExist = styled.div`
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NotExistText = styled.span`
  display: inline-block;
  font-family: ${FONT_SERIF_REGULAR};
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

const SubHeader = styled.h3<ElementThemeProps>`
  display: inline-block;
  font-family: ${FONT_SERIF_BOLD};
  text-align: center;
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${({ theme }) => theme.BASE_BOX_SHADOW};
  margin-block-end: 3rem;
  padding: 0.5rem;
  width: fit-content;
`;

const MyProfile = () => {
  const router = useRouter();
  const theme = useTheme();
  const { account } = useWeb3React();
  const { detailedNfts, isLoading: ownedNftsLoading } = useUser();

  const { projects: ownProjects, isLoading: ownProjectsLoading } =
    useGetProjectsOfAccount();
  const { contributions, isLoading: contributionsLoading } =
    useGetContributionsOfAccount();

  const handleClickRead = useCallback(
    (e, projectId) => {
      e.preventDefault();
      router.push(`/projects/${projectId}/read`);
    },
    [router]
  );

  const handleClickDetails = useCallback(
    (e, projectId) => {
      e.preventDefault();
      router.push(`/projects/${projectId}`);
    },
    [router]
  );

  return (
    <Root>
      <SectionTitleWrapper>
        <SectionTitle>My Profile</SectionTitle>
      </SectionTitleWrapper>
      {!account ? (
        <NotExist>
          <NotExistText>{`Looks like you're not connected.`}</NotExistText>
        </NotExist>
      ) : (
        <>
          <Section>
            <SubHeader theme={theme}>My NFTs</SubHeader>
            {ownedNftsLoading && <Loading height={300} />}
            {!ownedNftsLoading && !detailedNfts && (
              <NotExist>
                <NotExistText>{`You do not own any Moonpage NFTs :(`}</NotExistText>
              </NotExist>
            )}
            {!ownedNftsLoading && detailedNfts && (
              <ItemsWrapper>
                {detailedNfts.map((nft, idx) => (
                  <BookshelfItem
                    key={idx}
                    nft={nft}
                    onClickDetails={(e) => handleClickDetails(e, nft.projectId)}
                    onClickRead={(e) => handleClickRead(e, nft.projectId)}
                  />
                ))}
              </ItemsWrapper>
            )}
          </Section>
          <Section>
            <SubHeader theme={theme}>My Projects</SubHeader>
            {ownProjectsLoading && <Loading height={300} />}
            {!ownProjectsLoading && !ownProjects?.length && (
              <NotExist>
                <NotExistText>{`You have not created any Moonpage subcollections.`}</NotExistText>
              </NotExist>
            )}
            {!ownProjectsLoading &&
              ownProjects?.map((project, idx) => (
                <OwnProject
                  key={idx}
                  title={project.title}
                  onClickDetails={(e) => handleClickDetails(e, project.id)}
                  onClickRead={(e) => handleClickRead(e, project.id)}
                />
              ))}
          </Section>
          <Section>
            <SubHeader theme={theme}>My Contributions</SubHeader>
            {contributionsLoading && <Loading height={300} />}
            {!contributionsLoading && !contributions?.length && (
              <NotExist>
                <NotExistText>{`You have not created any Moonpage subcollections.`}</NotExistText>
              </NotExist>
            )}
            {!contributionsLoading &&
              contributions?.map((contrib, idx) => (
                <ContributorProject
                  key={idx}
                  creator={contrib.project.creator}
                  title={contrib.project.title}
                  projectId={Number(contrib.project.id)}
                  contributionRole={contrib.role}
                  contributionSharePercentage={Number(contrib.sharePercentage)}
                  onClickDetails={(e) =>
                    handleClickDetails(e, contrib.project.id)
                  }
                  onClickRead={(e) => handleClickRead(e, contrib.project.id)}
                />
              ))}
          </Section>
        </>
      )}
    </Root>
  );
};

export default MyProfile;
