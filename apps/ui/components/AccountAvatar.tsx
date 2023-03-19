import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Jazzicon from '@metamask/jazzicon';

const Avatar = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

export interface JazzIcon {
  address: string | undefined | null;
  size?: number;
}

const AccountAvatar = ({ address, size = 16 }: JazzIcon) => {
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    if (address && ref.current) {
      ref.current.innerHTML = '';
      ref.current.appendChild(
        Jazzicon(size, parseInt(address.slice(2, 10), 16))
      );
    }
  }, [address, size]);

  return (
    <div>
      <Avatar ref={ref as any} />
    </div>
  );
};

export default AccountAvatar;
