import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import {
  PINK,
  INTER_BOLD,
  INTER_LIGHT,
  INSET_BASE_BOX_SHADOW,
} from '../../themes';
import ActionButton from '../ActionButton';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 8rem 8rem 8rem;

  @media (max-width: 900px) {
    padding: 0 2rem 2rem 2rem;
  }
`;

const BlocksWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 4rem;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Block = `
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 45%;
  max-width: 600px;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: ${INSET_BASE_BOX_SHADOW};

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const CreatorsBlock = styled.div`
  ${Block}
  color: ${PINK};

  @media (max-width: 900px) {
    margin-block-end: 2rem;
  }
`;

const CollectorsBlock = styled.div`
  ${Block}
`;

const Text = styled.p`
  font-family: ${INTER_LIGHT};
  max-width: 1000px;
  display: inline-block;
  font-size: 24px;
  line-height: 24px;

  :after {
    content: '';
    width: 100%;
    height: 1em;
    display: inline-block;
  }
`;

const SubHeader = styled.h3`
  font-family: ${INTER_BOLD};
  font-size: 24px;
  text-align: center;
  margin-block-start: 0;
`;

const MainSellingPointsSection = () => {
  const router = useRouter();
  return (
    <Root>
      <BlocksWrapper>
        <CreatorsBlock>
          <SubHeader>Creators</SubHeader>
          <Text>{'Publish and sell your text as NFT collection'}</Text>
          <Text>{'Receive creator royalties'}</Text>
          <Text>{'Create a community of readers'}</Text>
          <ActionButton
            onClick={() => {
              router.push(`/create`);
            }}
            disabled={false}
            loading={false}
            margin="2rem auto 0"
            text="CREATE NOW"
          />
        </CreatorsBlock>
        <CollectorsBlock>
          <SubHeader>Collectors</SubHeader>
          <Text>{'Collect text NFT gems and unlock the content'}</Text>
          <Text>{'Be part of an exclusive community'}</Text>
          <Text>{'(Beta) Vote with the NFTs'}</Text>
          <ActionButton
            onClick={() => {
              router.push(`/projects`);
            }}
            color="#fff"
            disabled={false}
            loading={false}
            margin="2rem auto 0"
            text="BROWSE"
          />
        </CollectorsBlock>
      </BlocksWrapper>
    </Root>
  );
};

export default MainSellingPointsSection;
