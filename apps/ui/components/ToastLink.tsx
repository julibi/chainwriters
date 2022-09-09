import React from 'react';
import styled from 'styled-components';
import getPolygonScanLink from '../utils/getPolygonScanLink';

export const Link = styled.a`
  color: #232630;
  text-decoration: none;
`;

export interface ToastLinkTypes {
  hash?: string;
  chainId?: number | undefined;
  message: string;
  linkText?: string
}

const ToastLink = ({hash, chainId, message, linkText}: ToastLinkTypes) => {
  return (
    <>
      <p>{`${message}`}</p>
      {hash && chainId &&<Link
        rel="noreferrer"
        target="_blank"
        href={getPolygonScanLink(hash, chainId)}
      >
       { !linkText && 'View on Polygonscan ↗' } 
      </Link>}
  </>
  )
}

export default ToastLink
