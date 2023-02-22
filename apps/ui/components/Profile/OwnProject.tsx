import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import {
  BaseButton,
  BASE_BORDER_RADIUS,
  POP,
  ElementThemeProps,
} from '../../themes';
import { useTheme } from '../../hooks/theme';
import Title from '../Title';

interface OwnProjectProps {
  title: string;
  onClickDetails: MouseEventHandler<HTMLButtonElement>;
  onClickRead: MouseEventHandler<HTMLButtonElement>;
}

const Item = styled.div<ElementThemeProps>`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem;
  padding: 1rem;

  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${({ theme }) => theme.BASE_BOX_SHADOW};
`;

const ButtonsWrapper = styled.div`
  display: flex;
`;

const DetailsButton = styled(BaseButton)`
  padding: 1rem;
`;

const ReadButton = styled(BaseButton)`
  margin-inline-start: 1rem;
  padding: 1rem;
  background-color: ${POP};
`;

const OwnProject = ({
  title,
  onClickDetails,
  onClickRead,
}: OwnProjectProps) => {
  const theme = useTheme();
  return (
    <Item theme={theme}>
      <Title size="xs" color="POP">
        {title}
      </Title>
      <ButtonsWrapper>
        <DetailsButton onClick={onClickDetails}>Project</DetailsButton>
        <ReadButton onClick={onClickRead}>Read</ReadButton>
      </ButtonsWrapper>
    </Item>
  );
};

export default OwnProject;
