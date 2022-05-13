import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Loading from '../Loading'
import { BlockSpan, ReviewItem, ReviewItemWrapper, FlexContainer, FadeIn, Wrapper, InputName, InputDescription, SubmitButton } from '../../pages/create'

const ReviewItems = styled.div`
  display: flex;
  flex-direction: column;
`;

const CoverImageReview = styled.div`
  height: 100%;
  margin-block-end: 2rem;
  span {
    width: 100% !important;
    height: 100% !important;

    img {
      object-fit: contain !important;
      
    }
  }
`;

interface ConfigReviewFormProps {
  genre: string;
  subtitle: string;
  blurb: string;
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
        <InputName>Your Project Details</InputName>
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
              <ReviewItem>{blurbIPFS ? blurb : 'None specified'}</ReviewItem>
            </ReviewItemWrapper>
          </ReviewItems>
        </FlexContainer>
        <SubmitButton
          disabled={loading}
          style={{ marginBlockEnd: '0', minWidth: '182px' }}
          onClick={onSubmit}
        >
          {loading ? <Loading height={20} dotHeight={20} /> : 'Looks Good'}
        </SubmitButton>
      </Wrapper>
    </FadeIn>
  );
};

export default ConfigReviewForm