import React from 'react';
import styled from 'styled-components';
import { SocialIcon } from 'react-social-icons';
import { BASE_BORDER_RADIUS } from '../../themes';
import { useTheme } from '../../hooks/theme';
import { SocialProps } from './ProfileSection';

const Social = styled.div<SocialProps>`
  width: 150px;
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${({ theme, isConfigured }) =>
    isConfigured ? theme.BASE_BOX_SHADOW : theme.INSET_BASE_BOX_SHADOW};
  padding: 0.5rem;
  margin: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledSocialIcon = styled(SocialIcon)`
  width: 30px !important;
  height: 30px !important;
`;

const mainTextColor = (theme) => theme.MAIN_TEXT_COLOR;

type SocialItemProps = {
  link: string;
  name: string;
  isConfigured: boolean;
};

const SocialItem = ({ link, name, isConfigured }: SocialItemProps) => {
  const theme = useTheme();
  return (
    <Social theme={theme} isConfigured={isConfigured}>
      <StyledSocialIcon
        url={link}
        bgColor={mainTextColor(theme)}
        target="_blank"
        network={name.toLowerCase()}
      />
      {link ? (
        <a target="_blank" rel="noopener noreferrer" href={link}>
          {name}
        </a>
      ) : (
        <span>Not specified</span>
      )}
    </Social>
  );
};

export default SocialItem;
