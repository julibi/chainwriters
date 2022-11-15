import React, { ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { ButtonsWrapper, FadeIn, Wrapper } from '../../pages/create';
import {
  BASE_BORDER_RADIUS,
  BG_NORMAL,
  INSET_BASE_BOX_SHADOW,
  MAIN_TEXT_COLOR,
} from '../../themes';
import ActionButton from '../ActionButton';
import Title from '../Title';

export const StyledImageForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const DragNDrop = styled.div`
  width: 100%;
  height: 300px;
  align-items: center;
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${INSET_BASE_BOX_SHADOW};
  margin: 0 0 2rem 0;

  > span {
    height: 100% !important;
  }
  img {
    object-fit: contain;
  }
`;

export const UploadCTAWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-block-end: 2rem;
`;

export const StyledFileInput = styled.input`
  color: transparent;
  margin-block: 1rem;

  ::-webkit-file-upload-button {
    width: 100%;
    border-width: 0;
    text-align: center;
    color: ${BG_NORMAL};
    background-color: ${MAIN_TEXT_COLOR};
    border-radius: ${BASE_BORDER_RADIUS} !important;
    padding: 1rem;

    :hover {
      cursor: pointer;
    }

    :disabled {
      color: grey;

      :hover {
        cursor: default;
      }
    }
  }
`;

export const FileName = styled.span`
  display: inline-block;
  height: 24px;
`;

export const shortenImageName = (filename: string) => {
  const filenameStart = filename.substring(0, 6);
  const filenameLength = filename.length;
  const cut = filenameLength - 6;
  const filenameEnd = filename.substring(filenameLength, cut);
  return `${filenameStart}...${filenameEnd}`;
};

interface CoverImageFormProps {
  captureFile: (x: any) => void;
  imgBuffer: Buffer;
  imgFile: Blob | MediaSource;
  onNextStep: () => void;
  onSubmit: (e: FormEvent<HTMLButtonElement>) => Promise<void>;
  pending: boolean;
  reset: () => void;
}

const CoverImageForm = ({
  captureFile,
  imgBuffer,
  imgFile,
  onNextStep,
  onSubmit,
  pending,
  reset,
}: CoverImageFormProps) => {
  return (
    <FadeIn>
      <Wrapper>
        <Title size="m">Cover Image</Title>
        {/* @ts-ignore */}
        <StyledImageForm onSubmit={onSubmit}>
          <DragNDrop
            onDragOver={(e: any) => {
              e.preventDefault();
            }}
            onDrop={(e: any) => {
              e.preventDefault();
              const file = e.dataTransfer.files[0];
              captureFile(file);
            }}
          >
            <Image
              src={
                imgFile ? URL.createObjectURL(imgFile) : '/ImgPlaceholder.png'
              }
              height={'100%'}
              width={'100%'}
              alt={'Cover'}
              quality={65}
              layout="responsive"
            />
          </DragNDrop>
          <UploadCTAWrapper>
            {/* @ts-expect-error name does not exist on Blob or Mediasource */}
            <FileName>{imgFile ? shortenImageName(imgFile.name) : ''}</FileName>
            <StyledFileInput
              disabled={pending}
              type="file"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                e.preventDefault();
                const file = e.target.files[0];
                captureFile(file);
              }}
            />
            <ButtonsWrapper>
              <ActionButton
                disabled={pending}
                loading={false}
                onClick={() => {
                  reset();
                  onNextStep();
                }}
                text="Skip"
                color="#fff"
              />
              <ActionButton
                // @ts-expect-error name does not exist on Blob or Mediasource
                disabled={!imgFile?.name || pending}
                loading={pending}
                onClick={onSubmit}
                text="Set Image"
              />
            </ButtonsWrapper>
          </UploadCTAWrapper>
        </StyledImageForm>
      </Wrapper>
    </FadeIn>
  );
};

export default CoverImageForm;
