import { ReactChild } from 'react';
import styled from 'styled-components';
import { BASE_BOX_SHADOW, BASE_BORDER_RADIUS, BaseButton, BG_NORMAL } from '../themes';

const Root = styled.div`
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  backdrop-filter: blur(5px);
  animation: fadeIn 0.8s;
  -webkit-animation: fadeIn 0.8s;
  -moz-animation: fadeIn 0.8s;
  -o-animation: fadeIn 0.8s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @keyframes fadeIn {
    0% {
      filter: blur(5px);
    }
    100% {
      filter: blur(0);
    }
  }
  
  /* global */
  @media only screen and (max-width: 768px) {
    .content {
      border-radius: 0;
      height: 100%;
      width: 100%;
      justify-content: center;
    }
  }
`;

const Content = styled.div`
  position: relative;
  border-radius: ${BASE_BORDER_RADIUS};
  max-width: 600px;
  background-color: ${BG_NORMAL};
  padding: 1em;
  opacity: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${BASE_BOX_SHADOW}
`;

const CloseButton = styled(BaseButton)`
  position: absolute;
  top: 1rem;
  right: 1rem;

  :hover {
    cursor: pointer;
  }
`;

export interface BaseModalProps {
  onClose?:() => void;
  children: ReactChild;
}

const BaseModal = ({children, onClose}: BaseModalProps) => {
  return (
    <Root>
      <Content>
        {onClose &&
          <CloseButton
            onClick={onClose}
          >
            x
          </CloseButton>
        }
        {children}
      </Content>
    </Root>
  );
}

export default BaseModal;
