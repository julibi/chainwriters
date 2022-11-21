import React from 'react';
import styled from 'styled-components';
import Circle from './Circle';
import { ElementThemeProps, POP } from '../themes';
import { useTheme } from '../hooks/theme';

const Pie = styled.div<ElementThemeProps>`
  width: 280px;
  height: 280px;
  border-radius: 50%;
  padding: 70px;
  box-shadow: ${({ theme }) => theme.BASE_BOX_SHADOW};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PieHole = styled.div<ElementThemeProps>`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  box-shadow: ${({ theme }) => theme.INSET_BASE_BOX_SHADOW};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PieHoleData = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 16px;
`;

const StyledCircle = styled(Circle)`
  box-shadow: 0px 0px 50px 4px ${POP};
`;

interface PieChart {
  part: number;
  whole: number;
  colorStyle?: 'gradient' | 'simple';
}

const PieChart = ({ part, whole, colorStyle = 'gradient' }: PieChart) => {
  const theme = useTheme();
  return (
    <Pie theme={theme}>
      <StyledCircle
        percentage={parseInt(((part / whole) * 100).toString())}
        colorStyle={colorStyle}
      />
      <PieHole theme={theme}>
        <PieHoleData>{`${part}/${whole} Minted`}</PieHoleData>
      </PieHole>
    </Pie>
  );
};

export default PieChart;
