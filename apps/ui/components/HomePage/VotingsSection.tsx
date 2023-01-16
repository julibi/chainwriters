import { useBallotsFactory } from '../../hooks/ballotFactory';
import React from 'react';
import styled from 'styled-components';

import { FONT_SERIF_BLACK, POP } from '../../themes';
import Loading from '../Loading';

import Title from '../Title';

const Root = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SectionTitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const SectionTitle = styled.h1`
  text-align: center;
  font-family: ${FONT_SERIF_BLACK};
  color: ${POP};
  font-size: 54px;
  padding: 1rem;

  @media (max-width: 900px) {
    margin-block-start: 1rem;
  }
`;

const Votings = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  padding: 3rem 3rem 6rem 3rem;

  @media (max-width: 900px) {
    padding: 3rem;
  }
`;

const VotingsSection = () => {
  const { votingsData, votingsLoading } = useBallotsFactory();

  return (
    <Root>
      <Title color={POP}>Top Projects</Title>
      {votingsLoading && !votingsData && <Loading height={530} />}
      <Votings>
        {votingsData?.map(
          (
            {
              id,
              proposal,
              option1,
              option2,
              option3,
              option1Count,
              option2Count,
              option3Count,
              isVoting,
              totalCount,
              voteStarted,
              voteEnding,
              project,
            },
            idx
          ) => (
            <div key={idx}>
              <h3>{project?.title}</h3>
              <h3>{proposal}</h3>
            </div>
            // <ProjectItem
            //   key={idx}
            //   id={id}
            //   createdAt={createdAt}
            //   creator={creator}
            //   title={title}
            //   imgIpfsHash={imgIpfsHash}
            //   subtitle={subtitle}
            //   genre={genre}
            //   tvl={balance}
            //   isFrozen={isFrozen}
            //   isPaused={isPaused}
            // />
          )
        )}
      </Votings>
    </Root>
  );
};

export default VotingsSection;
