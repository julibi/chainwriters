import React, { useEffect, useRef } from 'react';
import Jazzicon from '@metamask/jazzicon';

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
      <div ref={ref as any} />
    </div>
  )
}

export default AccountAvatar;