import { useBallotsFactory } from '../../hooks/ballotFactory';
import React from 'react';
import styled from 'styled-components';

import { FONT_SERIF_BLACK, POP } from '../../themes';
import Loading from '../Loading';

import Title from '../Title';
import VotingTeaserBox from '../VotingTeaserBox';

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
  padding: 3rem;

  @media (max-width: 900px) {
    padding: 3rem;
  }
`;

const VotingsSection = () => {
  const { votingsData, votingsLoading } = useBallotsFactory();

  return (
    <Root>
      <Title color={POP}>Recent Votings</Title>
      {votingsLoading && !votingsData && <Loading height={530} />}
      <Votings>
        {votingsData?.map(
          ({ id, proposal, totalCount, voteEnding, project }, idx) => (
            <VotingTeaserBox
              key={id}
              ballotAddress={project.ballotAddress}
              projectId={project.id}
              title={project.title}
              proposal={proposal}
              totalCount={totalCount}
              voteEnding={voteEnding}
            />
          )
        )}
      </Votings>
    </Root>
  );
};

export default VotingsSection;
