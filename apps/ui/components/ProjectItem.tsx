import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import {
  BASE_BORDER_RADIUS,
  BASE_BOX_SHADOW,
  POP,
  MAIN_TEXT_COLOR,
  FONT_SERIF_BOLD,
  FONT_SERIF_LIGHT,
} from '../themes';
import { truncateAddress } from './WalletIndicator';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 260px;
  height: 400px;
  margin: 1rem;
  padding: 1rem;

  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${BASE_BOX_SHADOW};

  :hover {
    cursor: pointer;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;

  span {
    width: 100% !important;
    height: 100% !important;

    img {
      object-fit: contain !important;
    }
  }
`;

const InfoWrapper = styled.div`
  flex: 1;
  font-family: ${FONT_SERIF_LIGHT};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h4`
  color: ${POP};
  font-family: ${FONT_SERIF_BOLD};
  margin-block-end: 0;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Label = styled.span`
  color: ${MAIN_TEXT_COLOR};
`;

interface ProjectItemTypes {
  id: string;
  createdAt: string;
  creator: string;
  title: string;
  imgIpfsHash: string;
  subtitle: string;
  genre: string;
}

const ProjectItem = ({
  id,
  createdAt,
  creator,
  title,
  imgIpfsHash,
  subtitle,
  genre,
}: ProjectItemTypes) => {
  const router = useRouter();
  const handleClick = (e) => {
    e.preventDefault();
    router.push(`projects/${id}`);
  };
  const created = new Date(Number(createdAt) * 1000).toLocaleDateString(
    'en-US'
  );
  return (
    <Root onClick={handleClick}>
      <ImageWrapper>
        <Image
          src={
            imgIpfsHash
              ? `https://ipfs.io/ipfs/${imgIpfsHash}`
              : '/ImgPlaceholder.png'
          }
          height={'100%'}
          width={'100%'}
          alt={'Project Image'}
          priority
        />
      </ImageWrapper>
      <InfoWrapper>
        <Title>{title}</Title>
        <Flex>
          <Label style={{ color: POP }}>{subtitle ?? ''}</Label>
        </Flex>
        <Flex>
          <Label>Genre</Label>
          <div>{genre ?? 'Unknown'}</div>
        </Flex>
        <Flex>
          <Label>Created</Label>
          <div>{created}</div>
        </Flex>
        <Flex>
          <Label>Author</Label>
          <div>{truncateAddress(creator)}</div>
        </Flex>
      </InfoWrapper>
    </Root>
  );
};

export { ProjectItem };
