import React from 'react'
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
}

const ReviewForm = ({
  agreed,
  createDao,
  title,
  text,
  firstEdMaxAmount,
  firstEdMintPrice,
  onCheck
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
        <Checkbox
          // TODO: contract - should be able to freeze a contract or destruct
          description="I am aware that any form of plagiarism or hateful content can be banned from the platfom at any time. Other lawyer gibberish."
          onClick={onCheck}
          agreed={agreed}
        />
        <SubmitButton
          disabled={!agreed}
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