import React from 'react'
import styled from 'styled-components'
import {
  FadeIn,
  SubmitButton,
  ReviewItemWrapper,
  BlockSpan,
  ReviewItem
} from '../../pages/create';
import Checkbox from '../Checkbox'

interface ReviewFormProps {
  agreed: boolean;
  createDao: () => void;
  onCheck: () => void;
  firstEdMaxAmount: number;
  firstEdMintPrice: string;
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
  title,
  text,
  firstEdMaxAmount,
  firstEdMintPrice,
  onCheck,
  pending
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
          <BlockSpan>Max Amount Genesis Edition</BlockSpan>
          <ReviewItem>{firstEdMaxAmount}</ReviewItem>
        </ReviewItemWrapper>
        <ReviewItemWrapper>
          <BlockSpan>Dutch Auction Starting Price (MATIC)</BlockSpan>
          <ReviewItem>{firstEdMintPrice}</ReviewItem>
        </ReviewItemWrapper>
        <CheckboxWrapper>
          <Checkbox
            // TODO: contract - should be able to freeze a contract or destruct
            label="I am aware that any form of plagiarism or hateful content can be banned from the platfom at any time. Other lawyer gibberish."
            onChange={onCheck}
            check={agreed}
          />
        </CheckboxWrapper>
        <SubmitButton
          disabled={!agreed || pending}
          style={{ marginBlockEnd: '0', minWidth: '182px' }}
          onClick={createDao}
        >
          {'Create Project'}
        </SubmitButton>
      </>
    </FadeIn>
  );
};

export default ReviewForm