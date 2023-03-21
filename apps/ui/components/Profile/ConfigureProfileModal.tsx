import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import BaseModal from '../BaseModal';
import {
  DragNDrop,
  FileName,
  shortenImageName,
  StyledFileInput,
  StyledImageForm,
} from '../Create/CoverImageForm';
import InputField from '../InputField';
import Title from '../Title';
import ActionButton from '../ActionButton';
import { useIpfsClient } from '../../hooks/useIpfsClient';
import { useTheme } from '../../hooks/theme/useTheme';
import { IPFS_BASE_URI } from '../../constants';
import { utils } from 'ethers';
import { isValidUrl } from '../../utils/isValidUrl';

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

interface ConfigureProfileModalProps {
  onClose: () => void;
  currentName: string | null;
  currentWebsite: string | null;
  currentDescription: string | null;
  currentImageIPFSHash: string | null;
  onConfigure: ({ name, imageIPFSHash, descriptionIPFSHash, website }) => void;
  pending: boolean;
}

const ConfigureProfileModal = ({
  currentName,
  currentWebsite,
  currentDescription,
  currentImageIPFSHash,
  onClose,
  onConfigure,
  pending,
}: ConfigureProfileModalProps) => {
  const theme = useTheme();
  const client = useIpfsClient();
  const [imgBuffer, setImgBuffer] = useState<null | Buffer>(null);
  const [imgFile, setImgFile] = useState(null);
  const [name, setName] = useState<string | null>(currentName);
  const [website, setWebsite] = useState<string | null>(currentWebsite);
  const [description, setDescription] = useState<string | null>(
    currentDescription
  );
  const [isUploadingToIPFS, setIsUploadingToIPFS] = useState<boolean>(false);
  const captureFile = (file) => {
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      const buffer = Buffer.from(reader.result as ArrayBuffer);
      setImgFile(file);
      setImgBuffer(buffer);
    };
  };

  const isValidName = useMemo(() => {
    const nameLength = name?.trim().length;
    return !utils.isAddress(name) && nameLength > 2 && nameLength < 50;
  }, [name]);

  const isValidWebsite = useMemo(() => isValidUrl(website), [website]);

  const isValidDescription = useMemo(() => {
    const descriptionLength = description?.trim().length;
    return descriptionLength > 2 && descriptionLength < 100;
  }, [description]);

  const isSubmittable = useMemo(
    () => isValidName || isValidWebsite || isValidDescription || imgFile,
    [isValidName, isValidWebsite, isValidDescription, imgFile]
  );

  const handleClick = useCallback(async () => {
    try {
      setIsUploadingToIPFS(true);

      let profileImgCID = '';
      let descriptionCID = '';
      if (imgBuffer) {
        profileImgCID = (await client.add(imgBuffer)).path;
      }
      if (description) {
        descriptionCID = (await client.add(description)).path;
      }
      setIsUploadingToIPFS(false);

      onConfigure({
        name,
        imageIPFSHash: profileImgCID,
        descriptionIPFSHash: descriptionCID,
        website,
      });
    } catch (e: unknown) {
      toast.error(
        'Something went wrong while trying to uplod your data to IPFS.'
      );
    }
  }, [client, description, imgBuffer, name, onConfigure, website]);

  return (
    <BaseModal onClose={onClose}>
      <ContentWrapper>
        <div>
          <Title size="m" margin="0 0 2rem 0">
            Configure Your Profile
          </Title>
          <FlexColumn>
            <InputField
              label={'Name: '}
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setName(e.target.value);
              }}
              disabled={pending || isUploadingToIPFS}
              error={
                !isValidName &&
                'Must be more than 2 and less than 50 characters. Cannot be eth address.'
              }
              tooltipText="Required"
            />
            <InputField
              label={'Website: '}
              value={website}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setWebsite(e.target.value);
              }}
              disabled={pending || isUploadingToIPFS}
              error={website && !isValidWebsite && 'Not a valid url.'}
            />
            <InputField
              label={'Description: '}
              value={description}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setDescription(e.target.value);
              }}
              disabled={pending || isUploadingToIPFS}
              error={
                description &&
                !isValidDescription &&
                'Must be more than 2 and less than 100 characters.'
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
                theme={theme}
              >
                <Image
                  src={
                    imgFile
                      ? URL.createObjectURL(imgFile)
                      : currentImageIPFSHash
                      ? `${IPFS_BASE_URI}${currentImageIPFSHash}`
                      : '/ImgPlaceholder.png'
                  }
                  height={'100%'}
                  width={'100%'}
                  alt={'ProfileImage'}
                  quality={65}
                  layout="responsive"
                />
              </DragNDrop>
              <FlexColumn>
                <FileName>
                  {imgFile ? shortenImageName(imgFile.name) : ''}
                </FileName>
                <StyledFileInput
                  disabled={pending || isUploadingToIPFS}
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
              disabled={pending || isUploadingToIPFS || !isSubmittable}
              onClick={handleClick}
              loading={pending || isUploadingToIPFS}
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

export default ConfigureProfileModal;
