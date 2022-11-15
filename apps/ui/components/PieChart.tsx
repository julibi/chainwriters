import React from 'react';
import styled from 'styled-components';
import Circle from './Circle';
import { BASE_BOX_SHADOW, INSET_BASE_BOX_SHADOW, POP } from '../themes';

const Pie = styled.div`
  width: 280px;
  height: 280px;
  border-radius: 50%;
  padding: 70px;
  box-shadow: ${BASE_BOX_SHADOW};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PieHole = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  box-shadow: ${INSET_BASE_BOX_SHADOW};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PieHoleData = styled.div`
  text-align: center;
`;

const StyledCircle = styled(Circle)`
  box-shadow: 0px 0px 50px 4px ${POP};
`;

interface PieChart {
  part: number;
  whole: number;
}

const PieChart = ({ part, whole }: PieChart) => {
  return (
    <Pie>
      <StyledCircle percentage={parseInt(((part / whole) * 100).toString())} />
      <PieHole>
        <PieHoleData>{`${part}/${whole} Minted`}</PieHoleData>
      </PieHole>
    </Pie>
  );
};

export default PieChart;
