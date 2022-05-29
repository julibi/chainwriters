import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { BASE_BORDER_RADIUS, BG_NORMAL, INSET_BASE_BOX_SHADOW, BaseButton, BASE_BOX_SHADOW } from '../themes'

const Root = styled(BaseButton)`
  font-family: 'Nunito Sans Bold', sans-serif;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  width: 150px;
  height: 50px;
  position: relative;
  display: flex;
  align-items: center;
`;

const ArrowDown = styled.div`
`;

const Options = styled.div`
  position: absolute;
  top: 70px;
  left: 0;
  z-index: 1;
  background-color: ${BG_NORMAL};
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${BASE_BOX_SHADOW};
  width: 100%;
  padding: 1rem;
`;

const Option = styled.div`
  margin-block-end: 1rem;
  padding: 1rem;
  :hover {
    box-shadow: ${INSET_BASE_BOX_SHADOW};
  }

  :active {
    box-shadow: ${INSET_BASE_BOX_SHADOW};
  }
`;

const Dropdown = () => {
  const [ showDropdown, setShowDropdown ] = useState(false);
  const ref = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <Root
      onClick={toggleDropdown}
      ref={ref}
    >
      {`Filter`}
      <ArrowDown>
        <Image
          height={'12px'}
          width={'16px'}
          src={'/ArrowDown.svg'}
          alt={'ArrowDown'}
        />
      </ArrowDown>
      {showDropdown && (
        <Options>
          <Option>Option 1</Option>
          <Option>Option 2</Option>
          <Option>Option 3</Option>
        </Options>
      )}
    </Root>
  );
}

export default Dropdown