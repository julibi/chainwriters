import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import Jazzicon from '@metamask/jazzicon'

const Avatar = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

export interface JazzIcon {
  address: string | undefined | null;
}

const AccountAvatar = ({ address } : JazzIcon) => {
  const ref = useRef<HTMLDivElement>();
  useEffect(() => {
    if (address && ref.current) {
      ref.current.innerHTML = "";
      ref.current.appendChild(Jazzicon(16, parseInt(address.slice(2, 10), 16)));
    }
  }, [address]);

  return (
    <div>
      <Avatar ref={ref as any} />
    </div>
  )
}

export default AccountAvatar;