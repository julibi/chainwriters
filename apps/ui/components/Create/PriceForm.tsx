import React, { ChangeEvent } from 'react'
import {
  FadeIn,
  Wrapper,
  InputName,
  InputDescription,
  SubmitButton,
} from '../../pages/create';
import InputField from '../InputField'

interface PriceFormProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  firstEdMintPrice: string;
}

const PriceForm = ({ onChange, onSubmit, firstEdMintPrice }: PriceFormProps) => {
  return (
    <FadeIn>
      <Wrapper>
        <InputName>STARTING PRICE(MATIC)</InputName>
        <InputDescription>
          The Genesis Edition is sold in a dutch auction. In a dutch auction the
          price keeps going down during a given time – in our case: 24 hours –
          until someone buys. Then the next dutch auction starts, until all
          copies are sold out. Determine the starting price for all your Genesis
          Edition copies in Matic. You will be able to determine the price for
          each new edition that you unlock.
        </InputDescription>
        {/* TODO validation so that it is 0.1 and not 0,1 */}
        <InputField
          error={Number(firstEdMintPrice) < 0.01 && 'At least 0.01 Matic.'}
          onChange={onChange}
          placeholder={'50'}
          value={firstEdMintPrice}
        />
        <SubmitButton
          onClick={onSubmit}
          disabled={Number(firstEdMintPrice) < 0.01}
        >
          {'Continue'}
        </SubmitButton>
      </Wrapper>
    </FadeIn>
  );
};

export default PriceForm