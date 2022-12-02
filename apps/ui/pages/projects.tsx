import React, {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import Image from 'next/image';
import styled, { useTheme } from 'styled-components';
import {
  SectionTitleWrapper,
  SectionTitle,
} from '../components/HomePage/ProjectSection';
import { ProjectItem } from '../components/ProjectItem';
import { useProjects } from '../hooks/projects';
// import Dropdown from '../components/Dropdown';
import { BaseButton, BaseInput, Cross, FONT_SERIF_BOLD } from '../themes';
import Loading from '../components/Loading';

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const Padding = styled.div`
  height: 3rem;
`;

const Content = styled.div`
  margin: 3rem 2rem;
`;

const Filtering = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4rem;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 0;
    margin: 0 0 1rem 1rem;
  }
`;

const Search = styled.div`
  margin: 1rem 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

interface ButtonProps {
  disabled: boolean;
}

const SearchButton = styled(BaseButton)<ButtonProps>`
  display: flex;
  align-items: center;
  margin-inline-start: 2.5rem;
  padding: 1rem;

  :disabled {
    pointer-events: none;
    box-shadow: ${({ theme }) => theme.INSET_BASE_BOX_SHADOW};
  }

  @media (max-width: 900px) {
    margin-inline-start: 3rem;
  }
`;

const ResetButton = styled(BaseButton)`
  display: flex;
  align-items: center;
  margin-inline-start: 1rem;
  padding: 1rem;

  :disabled {
    pointer-events: none;
    box-shadow: ${({ theme }) => theme.INSET_BASE_BOX_SHADOW};
  }

  @media (max-width: 900px) {
    margin-inline-start: 0;
    margin-block-start: 1rem;
  }
`;

const SearchInput = styled(BaseInput)`
  display: inline-block;
  margin-inline-end: 1rem;
  padding: 1rem;
  width: 350px;
  height: 50px;

  @media (max-width: 900px) {
    width: 200px;
  }
`;

const NoResultsWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
`;

const NoResults = styled.h3`
  display: inline-block;
  font-family: ${FONT_SERIF_BOLD};
`;

const ProjectItems = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: auto;
  grid-gap: 1rem;
  padding: 3rem;

  @media (max-width: 900px) {
    flex-direction: column;
    justify-content: center;
    padding: 0;
  }
`;

interface Project {
  id: string;
  creator: string;
  createdAt?: string;
  title: string;
  imgIpfsHash?: string;
  subtitle?: string;
  genre?: string;
  auctionsStarted: boolean;
  auctionsEnded: boolean;
}

const Projects = () => {
  const theme = useTheme();
  const [searchedProjects, setSearchedProjects] = useState<Project[] | null>(
    null
  );
  const [searchInput, setSearchInput] = useState<string>('');
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const {
    allProjects: projects,
    refetchAllProjects,
    areAllProjectsLoading,
  } = useProjects();
  // TODO: this is just local filtering - do it with graphql useQuery
  const search = useCallback(() => {
    const projectsArray = projects;
    if (
      projectsArray &&
      projectsArray.length > 0 &&
      searchInput.trim().length > 0
    ) {
      const search = searchInput.trim().toLowerCase();
      const result = projectsArray.filter(
        (project: Project) =>
          project.title.toLowerCase().includes(search) ||
          project.subtitle?.toLowerCase().includes(search) ||
          project.creator.toLowerCase().includes(search)
      );
      setHasSearched(true);
      if (result.length > 0) {
        setSearchedProjects(result);
      }
    }
  }, [projects, searchInput]);

  const reset = () => {
    setSearchInput('');
    setSearchedProjects(null);
    setHasSearched(false);
  };

  useEffect(() => {
    refetchAllProjects();
  }, []);

  return (
    <Root>
      <Padding />
      <SectionTitleWrapper>
        <SectionTitle>Projects</SectionTitle>
      </SectionTitleWrapper>
      <Content>
        <Filtering>
          <Search>
            <SearchInput
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                  search();
                }
              }}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const input = e.target.value;
                setSearchInput(input);
              }}
              value={searchInput}
            />
            <Cross onClick={() => setSearchInput('')} />
            <SearchButton
              // @ts-ignore
              onClick={search}
              disabled={
                !projects || projects.length < 1 || searchInput.length < 1
              }
              theme={theme}
            >
              <Image
                src={'/SearchIcon.svg'}
                height={'16px'}
                width={'20px'}
                alt="SearchIcon"
              />
            </SearchButton>
            <ResetButton
              onClick={reset}
              disabled={!searchedProjects && !hasSearched}
              theme={theme}
            >
              Reset
            </ResetButton>
          </Search>
          {/* <Dropdown
            options={[
              {
                id: 1,
                value: 'Newest first',
                onSelect: () => {
                  const { error, loading, data } = fetchAllDesc();
                  if (!error && !loading) {
                    if (searchInput.length > 0 && hasSearched) {
                      search(data.daos);
                    } else {
                      refetchAllProjects();
                    }
                  }
                },
              },
              {
                id: 2,
                value: 'Oldest first',
                onSelect: () => {
                  const { error, loading, data } = fetchAllAsc();
                  if (!error && !loading) {
                    if (searchInput.length > 0 && hasSearched) {
                      search(data.daos);
                    } else {
                      refetchAllProjects();
                    }
                  }
                },
              },
              {
                id: 3,
                value: 'Auctions only',
                onSelect: () => {
                  // TODO - fetch the right projects
                  const { error, loading, data } = fetchProjects();
                  if (!error && !loading) {
                    if (searchInput.length > 0 && hasSearched) {
                      search(data.daos);
                    } else {
                      refetchAllProjects();
                    }
                  }
                },
              },
            ]}
          /> */}
        </Filtering>
        {areAllProjectsLoading && !projects && <Loading height={530} />}
        <ProjectItems>
          {hasSearched && !searchedProjects && (
            <NoResultsWrapper>
              <NoResults>No results</NoResults>
            </NoResultsWrapper>
          )}
          {hasSearched &&
            searchedProjects &&
            searchedProjects.map(
              (
                { title, createdAt, creator, genre, subtitle, imgIpfsHash, id },
                idx
              ) => (
                <ProjectItem
                  key={idx}
                  id={id}
                  title={title}
                  createdAt={createdAt}
                  creator={creator}
                  imgIpfsHash={imgIpfsHash}
                  subtitle={subtitle}
                  genre={genre}
                />
              )
            )}
          {!hasSearched &&
            !searchedProjects &&
            projects &&
            projects.map(
              (
                { title, createdAt, creator, genre, subtitle, imgIpfsHash, id },
                idx
              ) => (
                <ProjectItem
                  key={idx}
                  id={id}
                  createdAt={createdAt}
                  creator={creator}
                  title={title}
                  imgIpfsHash={imgIpfsHash}
                  subtitle={subtitle}
                  genre={genre}
                />
              )
            )}
        </ProjectItems>
      </Content>
    </Root>
  );
};

export default Projects;
