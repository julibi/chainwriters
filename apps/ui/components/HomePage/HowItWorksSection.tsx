import React from 'react';
import styled from 'styled-components';
import { BASE_BORDER_RADIUS, BASE_BOX_SHADOW } from '../../themes';
import Loading from '../Loading';

import { SectionTitle, SectionTitleWrapper } from './ProjectSection';

const Root = styled.div``;

const HowItWorksSection = () => {
  return (
    <Root>
      <SectionTitleWrapper>
        <SectionTitle>How does it work?</SectionTitle>
      </SectionTitleWrapper>
    </Root>
  );
};

export default HowItWorksSection;
