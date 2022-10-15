import React from 'react';
import styled from 'styled-components';
import { Node } from 'slate';
import Image from 'next/image';
import {
  BlockSpan,
  ReviewItem,
  ReviewItemWrapper,
  FadeIn,
  Wrapper,
  InputDescription,
} from '../../pages/create';
import ActionButton from '../ActionButton';
import Title from '../Title';
import RichTextRead from '../RichTextRead';

const FlexContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const ReviewItems = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const CoverImageReview = styled.div`
  flex: 1;
  margin-block-end: 2rem;
  span {
    width: 100% !important;
    height: 100% !important;

    img {
      object-fit: contain !important;
    }
  }

  @media (max-width: 900px) {
    span {
      height: 300px !important;
    }
  }
`;

interface ConfigReviewFormProps {
  genre: string;
  subtitle: string;
  blurb: Node[];
  imgFile: Blob | MediaSource;
  loading: boolean;
  onSubmit: () => void;
  blurbIPFS: string;
}

const ConfigReviewForm = ({
  blurb,
  blurbIPFS,
  genre,
  imgFile,
  loading,
  onSubmit,
  subtitle,
}: ConfigReviewFormProps) => {
  return (
    <FadeIn>
      <Wrapper>
        <Title size="m">Your Project Details</Title>
        <InputDescription>
          {`Review this data closely before submitting it.`}
        </InputDescription>
        <FlexContainer>
          <CoverImageReview>
            <Image
              src={
                imgFile ? URL.createObjectURL(imgFile) : '/ImgPlaceholder.png'
              }
              height={'100%'}
              width={'100%'}
              alt={'Cover'}
            />
          </CoverImageReview>
          <ReviewItems>
            <ReviewItemWrapper>
              <BlockSpan>Subtitle</BlockSpan>
              <ReviewItem>
                {subtitle.length ? subtitle : 'None specified'}
              </ReviewItem>
            </ReviewItemWrapper>
            <ReviewItemWrapper>
              <BlockSpan>Genre</BlockSpan>
              <ReviewItem>{genre.length ? genre : 'None specified'}</ReviewItem>
            </ReviewItemWrapper>
            <ReviewItemWrapper>
              <BlockSpan>Blurb</BlockSpan>
              <ReviewItem>
                {blurbIPFS ? <RichTextRead text={blurb} /> : 'None specified'}
              </ReviewItem>
            </ReviewItemWrapper>
          </ReviewItems>
        </FlexContainer>
        <ActionButton
          disabled={loading}
          onClick={onSubmit}
          margin="1rem 0 0 0"
          text="Looks Good"
          loading={loading}
          web3Connectable
        />
      </Wrapper>
    </FadeIn>
  );
};

export default ConfigReviewForm;
