import { capitalizeFirstLetter } from '../../utils/capitalizestring';
import React from 'react';
import styled from 'styled-components';
import {
  FadeIn,
  ReviewItemWrapper,
  BlockSpan,
  ReviewItem,
} from '../../pages/create';
import Checkbox from '../Checkbox';
import ActionButton from '../ActionButton';

interface ReviewFormProps {
  agreed: boolean;
  createDao: () => void;
  onCheck: () => void;
  firstEdMaxAmount: number;
  firstEdMintPrice: string;
  language: string;
  text: string;
  title: string;
  pending: boolean;
}

const CheckboxWrapper = styled.div`
  margin: 0 0 2.5rem -1rem;
`;

const ReviewForm = ({
  agreed,
  createDao,
  language,
  title,
  text,
  firstEdMaxAmount,
  firstEdMintPrice,
  onCheck,
  pending,
}: ReviewFormProps) => {
  return (
    <FadeIn>
      <>
        <ReviewItemWrapper>
          <BlockSpan>Title</BlockSpan>
          <ReviewItem>{title}</ReviewItem>
        </ReviewItemWrapper>
        <ReviewItemWrapper>
          <BlockSpan>Text</BlockSpan>
          <ReviewItem>{text}</ReviewItem>
        </ReviewItemWrapper>
        <ReviewItemWrapper>
          <BlockSpan>Language</BlockSpan>
          <ReviewItem>{capitalizeFirstLetter(language)}</ReviewItem>
        </ReviewItemWrapper>
        <ReviewItemWrapper>
          <BlockSpan>Max Amount Genesis Edition</BlockSpan>
          <ReviewItem>{firstEdMaxAmount}</ReviewItem>
        </ReviewItemWrapper>
        <ReviewItemWrapper>
          <BlockSpan>Dutch Auction Starting Price (MATIC)</BlockSpan>
          <ReviewItem>{firstEdMintPrice}</ReviewItem>
        </ReviewItemWrapper>
        <CheckboxWrapper>
          <Checkbox
            label={`
            By checking this box, I confirm that this work to be published (including the cover image) does not contain any hateful content,
            potential copyright issue, plagiarism, illegal or illegitimate content (hereafter defined as "harmful content").
            Moonpage can freeze the project if it detects any harmful content,
            which will disable the distribution of any funds and will also disable further minting of the infringing project.
            In the event of doubt, Moonpage may at its discretion denylist any involved wallet address.
            Being denylisted prevents this wallet address from any further action on this platform.
            Neither Moonpage, nor the NFT owners of a project hold any copyright. The copyright remains with the author. 
            `}
            onChange={onCheck}
            check={agreed}
          />
        </CheckboxWrapper>
        <ActionButton
          disabled={!agreed || pending}
          onClick={createDao}
          loading={pending}
          text="Create Project"
        />
      </>
    </FadeIn>
  );
};

export default ReviewForm;
