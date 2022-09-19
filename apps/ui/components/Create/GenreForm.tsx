import React from 'react';
import styled from 'styled-components';
import {
  FlexContainer,
  FadeIn,
  Wrapper,
  InputName,
  InputDescription,
} from '../../pages/create';
import Dropdown from '../Dropdown';
import { GENRES } from '../../constants';
import ActionButton from '../ActionButton';

const DropdownWrapper = styled.div`
  margin-block-end: 2rem;
`;

interface GenreFormProps {
  genre: string;
  onGenreSet: (x: string) => void;
  onNextStep: () => void;
  reset: () => void;
}

const GenreForm = ({
  genre,
  onGenreSet,
  onNextStep,
  reset,
}: GenreFormProps) => {
  const genreOptions = GENRES?.map((item) => ({
    id: item,
    value: item,
    onSelect: () => onGenreSet(item),
  }));
  return (
    <FadeIn>
      <Wrapper>
        <InputName>GENRE</InputName>
        <InputDescription>
          If you specify the Genre, it makes it easier for people to find your
          project. Also, you are giving more information for possible readers
          and supporters.
        </InputDescription>
        <DropdownWrapper>
          <Dropdown options={genreOptions} placeholder="Genre" />
        </DropdownWrapper>
        <FlexContainer>
          <ActionButton
            disabled={false}
            loading={false}
            margin="0 1rem 0 0"
            onClick={() => {
              reset();
              onNextStep();
            }}
            text="Skip"
            color="#fff"
          />
          <ActionButton
            onClick={onNextStep}
            disabled={genre.length < 3}
            loading={false}
            margin="0"
            text="Set Genre"
          />
        </FlexContainer>
      </Wrapper>
    </FadeIn>
  );
};

export default GenreForm;
