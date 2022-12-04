import React, { ChangeEvent, useCallback, useState } from 'react';

import Image from 'next/image';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { Node } from 'slate';
import BaseModal from '../BaseModal';
import InputField from '../InputField';
import {
  StyledImageForm,
  DragNDrop,
  StyledFileInput,
  FileName,
  shortenImageName,
} from '../Create/CoverImageForm';
import { useIpfsClient } from '../../hooks/useIpfsClient';
import ActionButton from '../ActionButton';
import Dropdown from '../Dropdown';
import { GENRES } from '../../constants';
import Title from '../Title';
import RichText from '../Create/RichText';
import { useTheme } from '../../hooks/theme';

const ContentWrapper = styled.div`
  padding: 2rem;
  width: 100%;
  height: 600px;
  overflow: scroll;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  display: inline-block;
  margin-block-end: 0.5rem;
`;

const DropdownWrapper = styled.div`
  margin-block-end: 3rem;
`;

const RichTextWrapper = styled.div`
  margin-block-end: 3rem;
`;

interface ConfigureModalProps {
  onClose: () => void;
  onConfigure: ({
    imgHash,
    imgFile,
    animationHash,
    blurb,
    blurbHash,
    genre,
    subtitle,
  }) => void;
  pending: boolean;
}

const ConfigureModal = ({
  onConfigure,
  onClose,
  pending,
}: ConfigureModalProps) => {
  const theme = useTheme();
  const client = useIpfsClient();
  const [imgBuffer, setImgBuffer] = useState<null | Buffer>(null);
  const [imgFile, setImgFile] = useState(null);
  const [blurb, setBlurb] = useState<Node[] | undefined>();
  const [genre, setGenre] = useState('');
  const [subtitle, setSubtitle] = useState<string>('');
  const [uploadPending, setUploadPending] = useState<boolean>(false);
  const genreOptions = GENRES?.map((item) => ({
    id: item,
    value: item,
    onSelect: () => setGenre(item),
  }));
  const captureFile = (file) => {
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      const buffer = Buffer.from(reader.result as ArrayBuffer);
      setImgFile(file);
      setImgBuffer(buffer);
    };
  };

  const handleClick = useCallback(async () => {
    try {
      setUploadPending(true);
      let blurbCID = '';
      let coverImgCID = '';
      if (imgBuffer) {
        coverImgCID = (await client.add(imgBuffer)).path;
      }
      if (blurb) {
        const uploadContent =
          typeof blurb === 'string' ? blurb : JSON.stringify(blurb);
        blurbCID = (await client.add(uploadContent)).path;
      }

      onConfigure({
        imgHash: coverImgCID,
        imgFile,
        animationHash: '',
        blurb,
        blurbHash: blurbCID,
        genre,
        subtitle,
      });
      setUploadPending(false);
    } catch (e: unknown) {
      setUploadPending(false);
      toast.error(
        'Something went wrong while trying to uplod your data to IPFS.'
      );
    }
  }, [blurb, client, genre, imgBuffer, imgFile, onConfigure, subtitle]);

  return (
    <BaseModal onClose={onClose}>
      <ContentWrapper>
        <div>
          <Title size="m" margin="0 0 2rem 0">
            Configure Your Project
          </Title>
          <FlexColumn>
            <InputField
              label={'Subtitle: '}
              value={subtitle}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setSubtitle(e.target.value);
              }}
            />
            <DropdownWrapper>
              <Dropdown
                options={genreOptions}
                placeholder="Genre"
                width="100%"
              />
            </DropdownWrapper>
            <Label>{'Blurb:'}</Label>
            <RichTextWrapper>
              <RichText onKeyDown={(val: Node[]) => setBlurb(val)} />
            </RichTextWrapper>
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
                theme={theme}
              >
                <Image
                  src={
                    imgFile
                      ? URL.createObjectURL(imgFile)
                      : '/ImgPlaceholder.png'
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
                <StyledFileInput
                  disabled={pending}
                  type="file"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault();
                    const file = e.target.files[0];
                    captureFile(file);
                  }}
                />
              </FlexColumn>
            </StyledImageForm>
            <ActionButton
              disabled={pending}
              onClick={handleClick}
              loading={uploadPending || pending}
              width="100%"
              text="Configure"
              web3Connectable
            />
          </FlexColumn>
        </div>
      </ContentWrapper>
    </BaseModal>
  );
};

export default ConfigureModal;
