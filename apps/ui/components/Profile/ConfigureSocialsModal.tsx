import React, { ChangeEvent, useCallback, useState } from 'react';

import styled from 'styled-components';
import { toast } from 'react-toastify';
import BaseModal from '../BaseModal';

import Title from '../Title';
import ActionButton from '../ActionButton';
import InputField from '../InputField';
import {
  DISCORD_BASE_URI,
  INSTAGRAM_BASE_URI,
  PARAGRAPHXYZ_BASE_URI,
  TWITTER_BASE_URI,
  YOUTUBE_BASE_URI,
} from '../../constants';

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  padding: 2rem;
  width: 100%;
  height: 600px;
  overflow: scroll;
`;

const DicsordExplanatoryLink = styled.a`
  color: #fff;
`;

type Socials = {
  discord: string | null;
  instagram: string | null;
  paragraphxyz: string | null;
  substack: string | null;
  twitter: string | null;
  youtube: string | null;
};

interface ConfigureSocialsModalProps {
  currentSocials: Socials;
  onClose: () => void;
  onConfigureSocials: ({
    discord,
    instagram,
    paragraphxyz,
    substack,
    twitter,
    youtube,
  }) => void;
  pending: boolean;
}

const ConfigureSocialsModal = ({
  currentSocials,
  onClose,
  onConfigureSocials,
  pending,
}: ConfigureSocialsModalProps) => {
  const [socialMedias, setSocialMedias] = useState(currentSocials);

  const handleTextChange = useCallback(
    (value, socialMediaName) => {
      if (
        ![
          'discord',
          'instagram',
          'paragraphxyz',
          'substack',
          'twitter',
          'youtube',
        ].includes(socialMediaName)
      )
        return;

      setSocialMedias({ ...socialMedias, [socialMediaName]: value });
    },
    [socialMedias]
  );

  const handleSubmit = useCallback(async () => {
    try {
      onConfigureSocials(socialMedias);
    } catch (e: unknown) {
      toast.error(
        'Something went wrong while trying to uplod your data to IPFS.'
      );
    }
  }, [onConfigureSocials, socialMedias]);

  return (
    <BaseModal onClose={onClose}>
      <ContentWrapper>
        <FlexColumn>
          <Title size="m" margin="0 0 2rem 0">
            What is your social media?
          </Title>
          <InputField
            disabled={pending}
            value={socialMedias.discord}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleTextChange(e.target.value, 'discord')
            }
            type="text"
            label="Discord"
            tooltipText={
              <span>
                Your Channel- or User ID. If you don't know it, check{' '}
                <DicsordExplanatoryLink
                  href="https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-#:~:text=Obtaining%20Server%20IDs%20%2D%20Mobile%20App,name%20and%20select%20Copy%20ID."
                  target="_blank"
                  rel="noreferrer"
                >
                  these instructions.
                </DicsordExplanatoryLink>
              </span>
            }
            leftHardCodedValue={`${DISCORD_BASE_URI}/`}
          />
          <InputField
            disabled={pending}
            value={socialMedias.instagram}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleTextChange(e.target.value, 'instagram')
            }
            type="text"
            label="Instagram"
            leftHardCodedValue={`${INSTAGRAM_BASE_URI}/`}
          />
          <InputField
            disabled={pending}
            value={socialMedias.paragraphxyz}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleTextChange(e.target.value, 'paragraphxyz')
            }
            type="text"
            label="Paragraph.xyz"
            tooltipText={`Account name. E.G. "janedoe" for "https://paragraph.xyz/@janedoe"`}
            leftHardCodedValue={`${PARAGRAPHXYZ_BASE_URI}/@`}
          />
          <InputField
            disabled={pending}
            value={socialMedias.substack}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleTextChange(e.target.value, 'substack')
            }
            type="text"
            label="Substack"
            tooltipText={`Name of your profile. E.G. "janedoe" for "https://janedoe.substack.com".`}
            leftHardCodedValue="https://"
            rightHardCodedValue=".substack.com"
          />
          <InputField
            disabled={pending}
            value={socialMedias.twitter}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleTextChange(e.target.value, 'twitter')
            }
            type="text"
            label="Twitter"
            leftHardCodedValue={`${TWITTER_BASE_URI}/`}
          />
          <InputField
            disabled={pending}
            value={socialMedias.youtube}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleTextChange(e.target.value, 'youtube')
            }
            type="text"
            label="Youtube Name"
            leftHardCodedValue={`${YOUTUBE_BASE_URI}/@`}
          />
          <ActionButton
            disabled={pending}
            onClick={handleSubmit}
            loading={pending}
            width="100%"
            text="Configure"
            web3Connectable
          />
        </FlexColumn>
      </ContentWrapper>
    </BaseModal>
  );
};

export default ConfigureSocialsModal;
