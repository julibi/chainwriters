import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
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
import useLocalStorage from '../../hooks/useLocalStorage';

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

export type Profile = {
  name: string | null;
  description: string;
  descriptionIPFSHash: string;
  img: { imgurl: string | null; file: Blob | null; buffer: Buffer | null };
  imageIPFSHash: string;
  website: string;
};

interface ConfigureProfileModalProps {
  onClose: () => void;
  currentProfile: Profile;
  onConfigure: ({
    name,
    imageIPFSHash,
    descriptionIPFSHash,
    website,
    hasNewDescriptionHash,
    hasNewImageHash,
  }) => void;
  pending: boolean;
}

const ConfigureProfileModal = ({
  currentProfile,
  onClose,
  onConfigure,
  pending,
}: ConfigureProfileModalProps) => {
  const theme = useTheme();
  const client = useIpfsClient();
  const [storedValue, setValue] = useLocalStorage('profile', currentProfile);
  const [profile, setProfile] = useState(currentProfile);
  const [isUploadingToIPFS, setIsUploadingToIPFS] = useState<boolean>(false);
  const captureFile = (file: Blob) => {
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      const buffer = Buffer.from(reader.result as ArrayBuffer);
      const imgurl = URL.createObjectURL(file);
      handleChange('img', { file, imgurl, buffer });
    };
  };

  const isValidName = useMemo(() => {
    const { name } = profile;
    const nameLength = name?.trim().length;
    return !utils.isAddress(name) && nameLength > 2 && nameLength < 50;
  }, [profile]);

  const isValidWebsite = useMemo(
    () => isValidUrl(profile?.website),
    [profile.website]
  );

  const isValidDescription = useMemo(() => {
    const { description } = profile;
    const descriptionLength = description?.trim().length;
    return descriptionLength > 2 && descriptionLength < 100;
  }, [profile]);

  const isSubmittable = useMemo(
    () =>
      isValidName || isValidWebsite || isValidDescription || profile?.img?.file,
    [isValidName, isValidWebsite, isValidDescription, profile?.img?.file]
  );

  const imageURL = useMemo(() => {
    if (profile?.img?.file instanceof Blob) {
      return URL.createObjectURL(profile?.img?.file);
    } else if (profile?.img?.imgurl) {
      return profile?.img?.imgurl;
    } else if (currentProfile?.imageIPFSHash) {
      return `${IPFS_BASE_URI}${currentProfile?.imageIPFSHash}`;
    } else {
      return '/ImgPlaceholder.png';
    }
  }, [currentProfile?.imageIPFSHash, profile?.img]);

  const handleChange = useCallback(
    (key: string, value: any) => {
      if (
        ![
          'name',
          'description',
          'descriptionIPFSHash',
          'img',
          'imageIPFSHash',
          'website',
        ].includes(key)
      )
        return;
      const newObject = { ...profile, [key]: value };
      setProfile(newObject);
      setValue(newObject);
    },
    [profile, setValue]
  );

  const handleClick = useCallback(async () => {
    try {
      setIsUploadingToIPFS(true);
      const { description, img, name, website } = profile;
      let profileImgCID = '';
      let descriptionCID = '';
      let hasNewDescriptionHash = false;
      let hasNewImageHash = false;

      if (img.buffer) {
        //@ts-ignore
        profileImgCID = (await client.add(img.buffer.data)).path;
        hasNewImageHash = true;
      } else {
        if (currentProfile?.imageIPFSHash) {
          profileImgCID = currentProfile?.imageIPFSHash;
        }
      }
      if (description && description !== currentProfile?.description) {
        descriptionCID = (await client.add(description)).path;
        hasNewDescriptionHash = true;
      } else {
        if (currentProfile?.descriptionIPFSHash) {
          descriptionCID = currentProfile?.descriptionIPFSHash;
        }
      }
      setIsUploadingToIPFS(false);

      onConfigure({
        name,
        imageIPFSHash: profileImgCID,
        descriptionIPFSHash: descriptionCID,
        website,
        hasNewDescriptionHash,
        hasNewImageHash,
      });
    } catch (e: unknown) {
      console.log({ e });
      toast.error(
        'Something went wrong while trying to uplod your data to IPFS.'
      );
    }
  }, [
    client,
    currentProfile?.description,
    currentProfile?.descriptionIPFSHash,
    currentProfile?.imageIPFSHash,
    onConfigure,
    profile,
  ]);

  useEffect(() => {
    setProfile({
      name: storedValue?.name ?? currentProfile?.name,
      description: storedValue?.description ?? currentProfile?.description,
      descriptionIPFSHash:
        storedValue?.descriptionIPFSHash ?? currentProfile?.descriptionIPFSHash,
      img: storedValue?.img ?? currentProfile?.img,
      imageIPFSHash:
        storedValue?.imageIPFSHash ?? currentProfile?.imageIPFSHash,
      website: storedValue?.website ?? currentProfile?.website,
    });
  }, [
    currentProfile?.description,
    currentProfile?.descriptionIPFSHash,
    currentProfile?.imageIPFSHash,
    currentProfile?.img,
    currentProfile?.name,
    currentProfile?.website,
    storedValue?.description,
    storedValue?.descriptionIPFSHash,
    storedValue?.imageIPFSHash,
    storedValue?.img,
    storedValue?.name,
    storedValue?.website,
  ]);

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
              value={profile.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                handleChange('name', e.target.value);
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
              value={profile.website}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                handleChange('website', e.target.value);
              }}
              disabled={pending || isUploadingToIPFS}
              error={profile?.website && !isValidWebsite && 'Not a valid url.'}
            />
            <InputField
              label={'Description: '}
              value={profile?.description}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                handleChange('description', e.target.value);
              }}
              disabled={pending || isUploadingToIPFS}
              error={
                profile?.description &&
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
                  src={imageURL}
                  height={'100%'}
                  width={'100%'}
                  alt={'ProfileImage'}
                  quality={65}
                  layout="responsive"
                />
              </DragNDrop>
              <FlexColumn>
                <FileName>
                  {profile?.img?.file && Object.keys(profile?.img?.file)?.length
                    ? shortenImageName(profile?.img?.file['name'])
                    : ''}
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
