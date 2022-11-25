import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../hooks/theme';
import { ElementThemeProps } from '../themes';
import { BASE_BORDER_RADIUS, FONT_SERIF_REGULAR } from '../themes';
import Title from './Title';

interface InfoCardProps {
  title: string;
  text: string;
}

const Root = styled.div<ElementThemeProps>`
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${({ theme }) => theme.BASE_BOX_SHADOW};
  width: fit-content;
  height: 400px;
  font-family: ${FONT_SERIF_REGULAR};
  padding: 2rem;

  @media (max-width: 900px) {
    height: fit-content;
  }
`;

const InfoCard = ({ title, text }: InfoCardProps) => {
  const theme = useTheme();
  return (
    <Root theme={theme}>
      <Title margin="0 1rem 1rem 0" padding="0" size="s" textAlign="left">
        {title}
      </Title>
      <p>{text}</p>
    </Root>
  );
};

export default InfoCard;
