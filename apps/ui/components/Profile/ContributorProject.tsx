import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import {
  BaseButton,
  BASE_BORDER_RADIUS,
  POP,
  ElementThemeProps,
  FONT_SERIF_REGULAR,
} from '../../themes';
import { useTheme } from '../../hooks/theme';
import Title from '../Title';
import ProfileLink from '../ProfileLink';

interface ContributorProjectProps {
  title: string;
  creator: string;
  projectId: number;
  contributionRole: string;
  contributionSharePercentage: number;
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
  font-family: ${FONT_SERIF_REGULAR};
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${({ theme }) => theme.BASE_BOX_SHADOW};
`;

const Project = styled.span`
  padding: 1rem 0 1rem 0;
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

const ContributorProject = ({
  creator,
  title,
  contributionRole,
  contributionSharePercentage,
  onClickDetails,
  onClickRead,
}: ContributorProjectProps) => {
  const theme = useTheme();
  return (
    <Item theme={theme}>
      <Project>
        <Title size="xs" color="POP" padding="0">
          {title}
        </Title>
        <span> - by </span>
        <ProfileLink account={creator} />
      </Project>
      <span>{`${contributionSharePercentage}% for ${contributionRole}`}</span>
      <ButtonsWrapper>
        <DetailsButton onClick={onClickDetails}>Project</DetailsButton>
        <ReadButton onClick={onClickRead}>Read</ReadButton>
      </ButtonsWrapper>
    </Item>
  );
};

export default ContributorProject;
