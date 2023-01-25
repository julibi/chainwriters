import React from 'react';
import styled from 'styled-components';
import { isDev } from '../utils/isDev';

export const Link = styled.a`
  color: #232630;
`;

export interface ToastLinkTypes {
  message: string;
  linkText?: string;
}

const ToastLink = ({ message, linkText }: ToastLinkTypes) => {
  return (
    <>
      <p>{`${message}`}</p>
      {linkText && (
        <Link
          rel="noreferrer"
          target="_blank"
          href={`https://${isDev() ? 'testnets.' : ''}opensea.io/account`}
        >
          {linkText}
        </Link>
      )}
    </>
  );
};

export default ToastLink;
