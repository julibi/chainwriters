import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { BASE_BORDER_RADIUS, BG_NORMAL, INSET_BASE_BOX_SHADOW, BaseButton, BASE_BOX_SHADOW, PLAIN_WHITE } from '../themes'

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

const Options = styled.button`
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
  color: ${PLAIN_WHITE};
  font-family: 'Nunito Sans Bold', sans-serif;
  margin-block-end: 1rem;
  padding: 1rem;
  :hover {
    cursor: pointer;
    border-radius: ${BASE_BORDER_RADIUS};
    box-shadow: ${INSET_BASE_BOX_SHADOW};
  }

  :active {
    box-shadow: ${INSET_BASE_BOX_SHADOW};
  }
`;

interface DropdownProps {
  options: {id:number | string, value: string, onSelect: VoidFunction }[];
}

const Dropdown = ({ options }: DropdownProps) => {
  const [ showDropdown, setShowDropdown ] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
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
    <Root onClick={toggleDropdown} ref={ref}>
      {selected ?? 'Filter'}
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
          {options.map((option) => (
            <Option
              key={option.id}
              onClick={() => {
                option.onSelect();
                setSelected(option.value);
              }}
            >
              {option.value}
            </Option>
          ))}
        </Options>
      )}
    </Root>
  );
}

export default Dropdown