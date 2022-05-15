import React, { ChangeEvent } from 'react'
import {
  FlexContainer,
  FadeIn,
  Wrapper,
  InputName,
  InputDescription,
  SubmitButton
} from '../../pages/create';
import InputField from '../InputField'


interface GenreFormProps {
  genre: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onNextStep: () => void;
}

const GenreForm = ({ genre, onChange, onNextStep }: GenreFormProps) => {
  return (
    <FadeIn>
      <Wrapper>
        <InputName>GENRE</InputName>
        <InputDescription>
          If you specify the Genre, it makes it easier for people to find your project. Also, you are giving more information for possible readers and supporters.
        </InputDescription>
        <InputField
          error={genre.length < 3 && 'At least 3 characters.'}
          onChange={onChange}
          placeholder={'Fiction'}
          value={genre}
        />
        <FlexContainer>
          <SubmitButton
            style={{marginInlineEnd: '1rem'}}
            onClick={onNextStep}
          >
            {'Skip'}
          </SubmitButton>
          <SubmitButton
            onClick={onNextStep}
            disabled={genre.length < 3}
            style={{ minWidth: '182px' }}
          >
            Set Genre
          </SubmitButton>
        </FlexContainer>
      </Wrapper>
    </FadeIn>
  )
}

export default GenreForm