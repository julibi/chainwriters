import React, { useState } from 'react';
import styled from 'styled-components';

import { useTheme } from '../hooks/theme';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem;
`;

const RadioInput = styled.input.attrs({ type: 'checkbox' })`
  display: inline-block;
  /* Double-sized Checkboxes */
  -ms-transform: scale(1.2); /* IE */
  -moz-transform: scale(1.2); /* FF */
  -webkit-transform: scale(1.2); /* Safari and Chrome */
  -o-transform: scale(1.2); /* Opera */
  transform: scale(1.2);

  :hover {
    cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};
  }
`;

const BlockSpan = styled.span`
  display: inline-block;
  margin-inline-start: 1.5rem;
  color: gray;
  font-size: 14px;

  @media (max-width: 900px) {
    font-size: 10px;
  }
`;

interface CheckboxProps {
  readonly?: boolean;
  check: boolean;
  children?: React.ReactChild;
  onChange?: () => void;
}

const Checkbox = ({
  readonly = false,
  check,
  children,
  onChange,
}: CheckboxProps) => {
  const theme = useTheme();
  const [checked, setChecked] = useState<boolean>(check);
  const toggleChecked = () => {
    setChecked(!checked);
  };
  return (
    <Wrapper>
      <RadioInput
        disabled={readonly}
        type="checkbox"
        onChange={() => {
          !readonly && toggleChecked();
          onChange();
        }}
        checked={checked}
      />
      {children && <BlockSpan>{children}</BlockSpan>}
    </Wrapper>
  );
};

export default Checkbox;
