import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import {
  BaseButton,
  FONT_SERIF_BOLD,
  ElementThemeProps,
  BASE_BORDER_RADIUS,
} from '../themes';
import { FlexContainer } from '../pages/create';
import { useTheme } from '../hooks/theme';

interface RootProps {
  width?: string | number;
}

const Root = styled(BaseButton)<RootProps>`
  font-family: ${FONT_SERIF_BOLD};
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

const Options = styled.div<ElementThemeProps>`
  position: absolute;
  top: 70px;
  left: 0;
  z-index: 1;
  background-color: ${({ theme }) => theme.BG_NORMAL};
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${({ theme }) => theme.BASE_BOX_SHADOW};
  width: 100%;
  max-height: 200px;
  overflow-y: scroll;
  padding: 1rem;

  display: flex;
  flex-direction: column;
`;

const Option = styled(BaseButton)`
  font-family: ${FONT_SERIF_BOLD};
  margin-block-end: 1rem;
  padding: 1rem;

  display: flex;
`;

const FieldComment = styled.span`
  height: 12px;
  font-size: 12px;
  margin-inline-start: 0.5rem;
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
  isRequiredField?: boolean;
}

const Dropdown = ({
  isDisabled,
  isRequiredField = false,
  options,
  preselected,
  placeholder,
  width,
}: DropdownProps) => {
  const theme = useTheme();
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
    <>
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
          <Options theme={theme}>
            {options.map((opt) => (
              <Option
                theme={theme}
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
      {isRequiredField && <FieldComment>*Required field</FieldComment>}
    </>
  );
};

export default Dropdown;
