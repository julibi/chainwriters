import React, { useState } from 'react';
import Image from 'next/image';
import { IPFS_BASE_URI, PINATA_GATE_URI } from '../../constants';
import AccountAvatar from '../AccountAvatar';

type ProfileImageProps = {
  account?: string;
  imageIPFSHash?: string;
  height?: number;
};

const ProfileImage = ({
  account,
  imageIPFSHash,
  height,
}: ProfileImageProps) => {
  const [fallbackImageUrl, setFallbackImageUrl] = useState<string | null>(null);

  if (!account) {
    return (
      <Image
        height={'100%'}
        width={'100%'}
        src="/ImagePlaceholder.png"
        alt={`Placeholder Image`}
        priority
        layout="responsive"
      />
    );
  }

  if (account && !imageIPFSHash) {
    return <AccountAvatar address={account} size={height} />;
  }

  if (account && imageIPFSHash) {
    return (
      <Image
        onError={() => {
          setFallbackImageUrl(`${IPFS_BASE_URI}${imageIPFSHash}`);
        }}
        height={'100%'}
        width={'100%'}
        src={fallbackImageUrl ?? `${PINATA_GATE_URI}${imageIPFSHash}`}
        alt={`Image of ${account}`}
        priority
        layout="responsive"
      />
    );
  }
};

export default ProfileImage;
