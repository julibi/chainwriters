import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import { truncateAddress } from '../WalletIndicator';
import { OwnedUserNft } from '../../providers/user-provider/user-provider.types';
import {
  BaseButton,
  BASE_BORDER_RADIUS,
  BASE_BOX_SHADOW,
  PINK,
} from '../../themes';

interface BookshelfItemProps {
  group: OwnedUserNft[];
  onClickDetails: MouseEventHandler<HTMLButtonElement>;
  onClickRead: MouseEventHandler<HTMLButtonElement>;
}

const Item = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${BASE_BOX_SHADOW};
  padding: 1rem;
  margin-block-end: 1rem;
`;

const BlockSpan = styled.span`
  display: inline-block;
`;

const Title = styled(BlockSpan)`
  width: 30%;
`;

const Bold = styled(BlockSpan)`
  font-family: 'Inter Black';
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

const ButtonsWrapper = styled.div`
  display: flex;

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
  }
`;

const DetailsButton = styled(BaseButton)`
  margin-inline-start: 1rem;

  @media (max-width: 900px) {
    padding: 0.5rem;
    margin-block-end: 0.5rem;
  }
`;

const ReadButton = styled(BaseButton)`
  margin-inline-start: 1rem;
  background-color: ${PINK};

  @media (max-width: 900px) {
    padding: 0.5rem;
  }
`;

const BookshelfItem = ({
  group,
  onClickDetails,
  onClickRead,
}: BookshelfItemProps) => {
  return (
    <Item>
      <Title>
        <Bold>{group[0].title}</Bold>
        {group[0].creator && (
          <span>{` - by ${truncateAddress(group[0].creator)}`}</span>
        )}
      </Title>
      {group[0].edition && (
        <>
          <Edition>
            {`Genesis Editions: ${
              group.filter((nft) => nft.edition === 1).length
            }`}
          </Edition>
          <Edition>
            {`Other Editions: ${
              group.filter((nft) => nft.edition !== 1).length
            }`}
          </Edition>
        </>
      )}
      {group[0].contributionRole && (
        <>
          <Contribution>{`${group[0].contributionSharePercentage}% for ${group[0].contributionRole}`}</Contribution>
        </>
      )}
      <ButtonsWrapper>
        <DetailsButton onClick={onClickDetails}>Project</DetailsButton>
        <ReadButton onClick={onClickRead}>Read</ReadButton>
      </ButtonsWrapper>
    </Item>
  );
};

export default BookshelfItem;
