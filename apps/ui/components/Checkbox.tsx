import React, { useState } from 'react'
import styled from 'styled-components'
import { BaseButton, BASE_BORDER_RADIUS, BASE_BOX_SHADOW, BG_NORMAL, INSET_BASE_BOX_SHADOW, PINK, PLAIN_WHITE } from '../themes';

interface RootProps {
  agreed?: boolean;
  description?: string;
  onClick: () => void;
}

interface InputProps {
  type: string;
  checked: boolean;
  readonly: boolean;
}

interface CheckBoxProps extends RootProps{
  checked: boolean;
}

const Root = styled.div`
  margin-block-end: 2rem;
`;

const StyledLabel = styled.div`
  display: flex;
`;

const StyledInput = styled.input.attrs({ type: 'checkbox' })<InputProps>`
  // Hide checkbox visually but remain accessible to screen readers.
  // Source: https://polished.js.org/docs/#hidevisually
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const CheckBox = styled(BaseButton)<CheckBoxProps>`
  height: 30px;
  width: 30px;
  background-color: ${p => p.checked ? PLAIN_WHITE :BG_NORMAL};
  box-shadow: ${p => p.checked ? INSET_BASE_BOX_SHADOW : BASE_BOX_SHADOW};
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    cursor: pointer;
  }
`;

const InnerCircleBox = styled.div`
  border-radius: 3px;
  height: 10px;
  width: 10px;
  background-color: ${BG_NORMAL};
`;

const BlockSpan = styled.span`
  display: inline-block;
  margin-inline-start: 1rem;
`;

const Checkbox = ({ agreed, description, onClick }: RootProps) => {
  const [checked, setChecked] = useState(agreed);

  const toggleChecked = () => {
    setChecked(!checked);
  };
  // TODO: where is the checkbox?
  return (
    <Root>
      <StyledLabel>
        <StyledInput
          type='checkbox'
          checked={checked}
          readonly
        />   
        <CheckBox
          onClick={() => {
            toggleChecked();
            onClick();
          }}
          checked={checked}
          type='button'
        >{checked && <InnerCircleBox />}</CheckBox>
        <BlockSpan>{description}</BlockSpan>
      </StyledLabel>
    </Root>
  );
};

export default Checkbox;