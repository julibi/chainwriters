import React from 'react'
import styled from 'styled-components'
import { VALID_GREEN } from '../themes';

const Root = styled.div`
  width: 22px;
  height: 22px;
  -ms-transform: rotate(45deg); /* IE 9 */
  -webkit-transform: rotate(45deg); /* Chrome, Safari, Opera */
  transform: rotate(45deg);
`;

const Stem = styled.div`
  position: absolute;
  width: 3px;
  height: 9px;
  background-color: ${VALID_GREEN};
  left: 11px;
  top: 6px;
`;

const Kick = styled.div`
  position: absolute;
  width: 3px;
  height: 3px;
  background-color: ${VALID_GREEN};
  left: 8.5px;
  top: 12px;
`;

const Checkmark = () => {
  return (
    <Root>
      <Stem></Stem>
      <Kick></Kick>
    </Root>
  )
}

export default Checkmark