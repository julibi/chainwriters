import { ReactChild } from 'react';
import { FocusOn } from 'react-focus-on';
import styled from 'styled-components';
import {
  BASE_BOX_SHADOW,
  BASE_BORDER_RADIUS,
  BaseButton,
  BG_NORMAL,
  Cross,
} from '../themes';

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
`;

const Content = styled.div`
  position: relative;
  border-radius: ${BASE_BORDER_RADIUS};
  overflow-y: auto;
  max-width: 600px;
  max-height: 800px;
  background-color: ${BG_NORMAL};
  padding: 1em;
  opacity: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${BASE_BOX_SHADOW};

  @media (max-width: 900px) {
    border-radius: 0;
    height: 100%;
    width: 100%;
    overflow-y: auto;
    justify-content: center;
  }
`;

const CloseButton = styled(BaseButton)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem;

  :hover {
    cursor: pointer;
  }
`;

const CloseCross = styled(Cross)`
  opacity: 1;
  margin-left: 0;

  :before,
  :after {
    left: 10px;
  }
`;

export interface BaseModalProps {
  onClose?: () => void;
  children: ReactChild;
}

// TODO: on outside click
const BaseModal = ({ children, onClose }: BaseModalProps) => {
  return (
    <FocusOn onEscapeKey={onClose}>
      <Root>
        <Content>
          {onClose && (
            <CloseButton onClick={onClose}>
              <CloseCross />
            </CloseButton>
          )}
          {children}
        </Content>
      </Root>
    </FocusOn>
  );
};

export default BaseModal;
