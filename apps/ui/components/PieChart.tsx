import React from 'react'
import styled from 'styled-components'
import Circle from './Circle'
import { BASE_BOX_SHADOW, INSET_BASE_BOX_SHADOW, PINK } from '../themes'

const Pie = styled.div`
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

const PieHole = styled.div`
  width: 78px;
  height: 78px;
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
  box-shadow: 0px 0px 50px 4px ${PINK};
`;

interface PieChart {
  part: string;
  whole: string;
}

const PieChart = ({ part, whole }) => {
  return (
    <Pie>
      <StyledCircle percentage={parseInt((part/whole * 100).toString())} />
      <PieHole>
        <PieHoleData>{`${part}/${whole} Spots Taken`}</PieHoleData>
      </PieHole>
    </Pie>
  );
}

export default PieChart