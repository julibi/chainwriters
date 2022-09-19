import React, { ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import {
  ButtonsWrapper,
  FadeIn,
  InputDescription,
  InputName,
  Wrapper,
} from '../../pages/create';
import {
  BaseButton,
  BASE_BORDER_RADIUS,
  BASE_BOX_SHADOW,
  BG_NORMAL,
  INSET_BASE_BOX_SHADOW,
  PLAIN_WHITE,
} from '../../themes';
import ActionButton from '../ActionButton';

export const SubmitButton = styled(BaseButton)`
  text-transform: uppercase;
  text-align: center;
  color: ${PLAIN_WHITE};
  background-color: ${BG_NORMAL};
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${BASE_BOX_SHADOW};
  padding: 1rem;

  :disabled {
    color: grey;
  }
`;

export const StyledImageForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const DragNDrop = styled.div`
  width: 100%;
  height: 300px;
  align-items: center;
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
    text-transform: uppercase;
    text-align: center;
    color: ${BG_NORMAL};
    background-color: ${PLAIN_WHITE};
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
  reset: () => void;
}

const CoverImageForm = ({
  captureFile,
  imgBuffer,
  imgFile,
  onNextStep,
  onSubmit,
  reset,
}: CoverImageFormProps) => {
  return (
    <FadeIn>
      <Wrapper>
        <InputName>COVER IMAGE</InputName>
        <InputDescription>Upload a Cover Image</InputDescription>
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
              type="file"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                e.preventDefault();
                const file = e.target.files[0];
                captureFile(file);
              }}
            />
            <ButtonsWrapper>
              <ActionButton
                disabled={false}
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
                disabled={!imgFile?.name}
                loading={false}
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
