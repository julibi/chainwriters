import useBallot from '../../hooks/useBallot';
import React from 'react';

const Votings = ({ projectId, ballotAddress }) => {
  const { voteSettings, vote } = useBallot(ballotAddress);
  console.log({ voteSettings });
  return <div>Votings</div>;
};

export default Votings;
