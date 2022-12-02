import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { BigNumber } from 'ethers';
import {
  BASE_BORDER_RADIUS,
  POP,
  FONT_SERIF_BOLD,
  FONT_SERIF_LIGHT,
  ElementThemeProps,
} from '../themes';
import { useTheme } from '../hooks/theme';
import { truncateAddress } from './WalletIndicator';
import { getCoverImageUrl } from '../utils/getCoverImageUrl';
import { Tooltip } from './Tooltip';
import { formatEtherBigNumber } from '../utils/formatEtherBigNumber';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import TooltippedIndicator from './TooltippedIndicator';

const Root = styled.div<ElementThemeProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 260px;
  height: 400px;
  margin: 1rem;
  padding: 1rem;

  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${({ theme }) => theme.BASE_BOX_SHADOW};

  :hover {
    cursor: pointer;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  flex: 1;

  span {
    width: 100% !important;
    height: 100% !important;

    img {
      object-fit: contain !important;
    }
  }
`;

const Indicators = styled.div`
  position: absolute;
  bottom: 12px;
  right: 12px;

  display: flex;
  justify-content: space-between;
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

const Label = styled.span<ElementThemeProps>`
  color: ${({ theme }) => theme.MAIN_TEXT_COLOR};
`;

interface ProjectItemTypes {
  id: string;
  tvl: BigNumber;
  createdAt: string;
  creator: string;
  title: string;
  imgIpfsHash: string;
  isFrozen: boolean;
  isPaused: boolean;
  subtitle: string;
  genre: string;
}

const ProjectItem = ({
  id,
  createdAt,
  creator,
  isFrozen,
  isPaused,
  title,
  imgIpfsHash,
  subtitle,
  genre,
  tvl,
}: ProjectItemTypes) => {
  const router = useRouter();
  const theme = useTheme();
  const [coverImgLink, setCoverImgLink] = useState<string>(null);

  const handleClick = (e) => {
    e.preventDefault();
    router.push(`projects/${id}`);
  };
  const created = new Date(Number(createdAt) * 1000).toLocaleDateString(
    'en-US'
  );

  const getImageUrl = useCallback(async () => {
    if (id && imgIpfsHash?.length) {
      const imgUrl = await getCoverImageUrl(id, imgIpfsHash);
      setCoverImgLink(imgUrl);
    }
  }, [id, imgIpfsHash]);

  useEffect(() => {
    getImageUrl();
  }, [getImageUrl]);

  return (
    <Root onClick={handleClick} theme={theme}>
      <ImageWrapper>
        <Image
          src={coverImgLink ?? '/ImgPlaceholder.png'}
          height={'100%'}
          width={'100%'}
          alt={'Project Image'}
          priority
        />
        <Indicators>
          {isFrozen ? (
            <TooltippedIndicator
              tooltipContent="Project was locked by autor. Content won't change anymore."
              icon={<LockIcon htmlColor="#fff" fontSize="inherit" />}
            />
          ) : (
            <TooltippedIndicator
              tooltipContent="Author can still change the content."
              icon={<LockOpenIcon htmlColor="#fff" fontSize="inherit" />}
            />
          )}
        </Indicators>
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
          <Label theme={theme}>Author</Label>
          <div>{truncateAddress(creator)}</div>
        </Flex>
        <Flex>
          <Tooltip
            content="Total Value Locked. Matic collected in this edition."
            theme={theme}
          >
            <Label theme={theme}>TVL</Label>
          </Tooltip>
          <div>{`${tvl ? formatEtherBigNumber(tvl) : 0} Matic`}</div>
        </Flex>
      </InfoWrapper>
    </Root>
  );
};

export { ProjectItem };
