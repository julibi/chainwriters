import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import {
  BASE_BORDER_RADIUS,
  BG_NORMAL,
  INSET_BASE_BOX_SHADOW,
  BaseButton,
  BASE_BOX_SHADOW,
  PLAIN_WHITE,
  INTER_BOLD,
} from '../themes';
import { FlexContainer } from '../pages/create';

interface RootProps {
  width?: string | number;
}

const Root = styled(BaseButton)<RootProps>`
  font-family: ${INTER_BOLD};
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  width: ${({ width }) => (width ? width : '150px')};
  height: 50px;
  position: relative;
  display: flex;
  align-items: center;
`;

const ArrowDown = styled.div``;

const ImageWrapper = styled.div`
  margin-inline-end: 1rem;
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
  max-height: 200px;
  overflow-y: scroll;
  padding: 1rem;

  display: flex;
  flex-direction: column;
`;

const Option = styled(BaseButton)`
  color: ${PLAIN_WHITE};
  font-family: ${INTER_BOLD};
  margin-block-end: 1rem;
  padding: 1rem;

  display: flex;

  :hover {
    cursor: pointer;
    border-radius: ${BASE_BORDER_RADIUS};
    box-shadow: ${INSET_BASE_BOX_SHADOW};
  }

  :active {
    box-shadow: ${INSET_BASE_BOX_SHADOW};
  }
`;

interface OptionType {
  id: number | string;
  img?: string;
  value: string;
  onSelect: (network: number | string) => void;
}

interface DropdownProps {
  options: OptionType[];
  preselected?: OptionType;
  width?: string | number;
  placeholder?: string;
  isDisabled?: boolean;
}

const Dropdown = ({
  isDisabled,
  options,
  preselected,
  placeholder,
  width,
}: DropdownProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selected, setSelected] = useState<OptionType | null>(
    preselected ?? null
  );
  const ref = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
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
      disabled={isDisabled}
      onClick={toggleDropdown}
      ref={ref}
      width={width}
    >
      {selected ? (
        <FlexContainer>
          {selected.img && (
            <ImageWrapper>
              <Image
                height={'16px'}
                width={'20px'}
                src={`/${selected.img}`}
                alt={selected.value}
              />
            </ImageWrapper>
          )}
          {selected.value}
        </FlexContainer>
      ) : (
        placeholder ?? 'Filter'
      )}
      {!isDisabled && (
        <ArrowDown>
          <Image
            height={'12px'}
            width={'16px'}
            src={'/ArrowDown.svg'}
            alt={'ArrowDown'}
          />
        </ArrowDown>
      )}
      {showDropdown && (
        <Options>
          {options.map((opt) => (
            <Option
              key={opt.id}
              onClick={() => {
                opt.onSelect(opt.id);
                setSelected(opt);
              }}
            >
              {opt.img && (
                <ImageWrapper>
                  <Image
                    height={'16px'}
                    width={'20px'}
                    src={`/${opt.img}`}
                    alt={opt.value}
                  />
                </ImageWrapper>
              )}
              {opt.value}
            </Option>
          ))}
        </Options>
      )}
    </Root>
  );
};

export default Dropdown;
