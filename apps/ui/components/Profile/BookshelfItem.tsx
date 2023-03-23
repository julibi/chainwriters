import Image from 'next/image';
import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import { OwnedUserNft } from '../../providers/user-provider/user-provider.types';
import {
  BaseButton,
  BASE_BORDER_RADIUS,
  FONT_SERIF_BLACK,
  FONT_SERIF_BOLD,
  FONT_SERIF_REGULAR,
  POP,
  ElementThemeProps,
  FONT_SERIF_LIGHT,
} from '../../themes';
import { useTheme } from '../../hooks/theme';
import ProfileLink from '../ProfileLink';

interface BookshelfItemProps {
  nft: OwnedUserNft;
  onClickDetails: MouseEventHandler<HTMLButtonElement>;
  onClickRead: MouseEventHandler<HTMLButtonElement>;
}

const Item = styled.div<ElementThemeProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 260px;
  height: 400px;
  margin: 1rem;
  padding: 1rem;

  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${({ theme }) => theme.BASE_BOX_SHADOW};
`;

const ImageWrapper = styled.div`
  position: relative;
  flex: 1;

  span {
    width: 100% !important;
    height: 150px !important;

    img {
      object-fit: contain !important;
    }
  }
`;

const BlockSpan = styled.span`
  display: inline-block;
`;

const Bold = styled(BlockSpan)`
  font-family: ${FONT_SERIF_BLACK};
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

const FlexAlign = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.span<ElementThemeProps>`
  color: ${({ theme }) => theme.MAIN_TEXT_COLOR};
`;

const Edition = styled(BlockSpan)`
  @media (max-width: 900px) {
    display: none;
  }
`;

const Contribution = styled(BlockSpan)`
  @media (max-width: 900px) {
    display: none;
  }
`;

const DetailsButton = styled(BaseButton)`
  padding: 0.5rem;
  margin-block-start: 1rem;
`;

const ReadButton = styled(BaseButton)`
  margin-block-start: 1rem;
  padding: 0.5rem;
  background-color: ${POP};
`;

const BookshelfItem = ({
  nft,
  onClickDetails,
  onClickRead,
}: BookshelfItemProps) => {
  const theme = useTheme();
  const { creator, edition, imgIpfsHash, tokenId } = nft;
  return (
    <Item theme={theme}>
      <ImageWrapper>
        <Image
          src={
            imgIpfsHash
              ? `https://moonpage.mypinata.cloud/ipfs/${imgIpfsHash}`
              : '/ImgPlaceholder.png'
          }
          height={'100%'}
          width={'100%'}
          alt={'Project Image'}
          priority
        />
      </ImageWrapper>

      <InfoWrapper>
        <Title>
          <Bold>{nft?.title}</Bold>
        </Title>

        <Flex>
          <Label>ID</Label>
          <div>{tokenId}</div>
        </Flex>
        <Flex>
          <Label>Edition</Label>
          <div>{edition}</div>
        </Flex>
        <FlexAlign>
          <Label theme={theme}>Author</Label>
          <ProfileLink account={creator} />
        </FlexAlign>
        <Flex>
          <DetailsButton onClick={onClickDetails}>Project</DetailsButton>
          <ReadButton onClick={onClickRead}>Read</ReadButton>
        </Flex>
      </InfoWrapper>
    </Item>
  );
};

export default BookshelfItem;
