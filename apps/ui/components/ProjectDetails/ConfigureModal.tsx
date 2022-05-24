import React, { ChangeEvent, useState } from 'react'
import { create } from 'ipfs-http-client'
import Image from 'next/image'
import styled from 'styled-components'
import BaseModal from '../BaseModal'
import Loading from '../Loading'
import InputField from '../InputField'
import { BaseButton, DISABLED_WHITE, PINK } from '../../themes'
import { TextInput } from '../../pages/create'
import {
  StyledImageForm,
  DragNDrop,
  StyledFileInput,
  FileName,
  shortenImageName,
} from '../Create/CoverImageForm';
import { toast } from 'react-toastify'

const ContentWrapper = styled.div`
  margin: 2rem;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow:scroll;
  height:600px;
`;

const ModalHeader = styled.h2`
  display: inline-block;
`;

const ModalText = styled.span`
  display: inline-block;
  margin-block: 1rem 2rem;
  text-align: center;
`;

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  display: inline-block;
  margin-block-end: 0.5rem;
`;

interface MintButtonProps {
  disabled: boolean;
}

const MintButton = styled(BaseButton)<MintButtonProps>`
  font-family: 'Roboto Mono Bold';
  padding: 1rem;
  width: 209px;
  color: ${({ disabled }) => disabled ? DISABLED_WHITE : PINK};

  :disabled {
    :hover {
      pointer-events: none;
    }
  }

  @media (max-width: 900px) {
    width: 100%;
  }
`;

interface ConfigureModalProps {
  onClose: () => void;
  onConfigure: (
    imgHash: string,
    blurbHash: string,
    genre: string,
    subtitle: string
  ) => void;
  pending: boolean;
}

const ConfigureModal = ({ onConfigure, onClose, pending }: ConfigureModalProps) => {
  // @ts-ignore
  const client = create('https://ipfs.infura.io:5001/api/v0');
  const [imgBuffer, setImgBuffer] = useState<null | Buffer>(null);
  const [imgFile, setImgFile] = useState(null);
  const [blurb, setBlurb] = useState<string>('');
  const [genre, setGenre] = useState('');
  const [subtitle, setSubtitle] = useState<string>('');

  const captureFile = (file: any) => {
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      // @ts-ignore
      const buffer = Buffer.from(reader.result);
      setImgFile(file);
      setImgBuffer(buffer);
    }
  };

  return (
    <BaseModal onClose={onClose}>
      <ContentWrapper>
        <ModalHeader>Configure Your Project</ModalHeader>
        <ModalText>
          {`Set a cover image, a subtitle, a genre and write a blurb.
          The more you specify, the better!`}
        </ModalText>
        <FlexColumn>
          <FlexRow>
            <InputField
              label={'Subtitle: '}
              value={subtitle}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setSubtitle(e.target.value);
              }}
            />
            <InputField
              label={'Genre: '}
              value={genre}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setGenre(e.target.value)}
            />
          </FlexRow>
          <Label>{'Blurb:'}</Label>
          <TextInput
            style={{ height: '200px' }}
            value={blurb}
            // @ts-ignore
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setBlurb(e.target.value)
            }
          />
          <StyledImageForm>
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
            <FlexColumn>
              <FileName>
                {imgFile ? shortenImageName(imgFile.name) : ''}
              </FileName>
              <FlexRow>
                <StyledFileInput
                  style={{ maxWidth: '200px' }}
                  type="file"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault();
                    const file = e.target.files[0];
                    captureFile(file);
                  }}
                />
              </FlexRow>
            </FlexColumn>
          </StyledImageForm>
          <MintButton
            style={{ margin: '1rem auto' }}
            disabled={pending}
            onClick={async() => {
              try {
                let blurbCID = '';
                let coverImgCID = '';
                if (imgBuffer) {
                  coverImgCID = (await client.add(imgBuffer)).path;
                }
                if (blurb) {
                  blurbCID =  (await client.add(blurb)).path;
                }
                onConfigure(coverImgCID, blurbCID, genre, subtitle)
              } catch (e: unknown) {
                toast.error('Something went wrong while trying to uplod your data to IPFS.');
              }
            }}
          >
            {pending ? (
              <Loading height={20} dotHeight={20} />
            ) : (
              'Configure'
            )}
          </MintButton>
        </FlexColumn>
      </ContentWrapper>
    </BaseModal>
  );
}

export default ConfigureModal