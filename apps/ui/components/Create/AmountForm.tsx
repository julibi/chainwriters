import React, { ChangeEvent } from 'react';
import {
  FadeIn,
  Wrapper,
  InputName,
  InputDescription,
  SubmitButton,
} from '../../pages/create';
import InputField from '../InputField';

interface AmountFormProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  firstEdMaxAmount: number;
}

const AmountForm = ({
  onChange,
  onSubmit,
  firstEdMaxAmount,
}: AmountFormProps) => {
  return (
    <FadeIn>
      <Wrapper>
        <InputName>TOTAL AMOUNT OF GENESIS EDITION</InputName>
        <InputDescription>
          The first edition of a work is called Genesis Edition. Holders of a
          Genesis Edition will have special benefits. The Genesis Edition will
          be sold over a Dutch Auction. Determine its total amount. Keep in mind
          that you can only trigger the sale of a subsequent edition after the
          Genesis Edition has sold out.
        </InputDescription>
        <InputField
          value={firstEdMaxAmount}
          onChange={onChange}
          placeholder={'2000'}
          error={firstEdMaxAmount < 4 && 'At least 4.'}
        />
        <SubmitButton onClick={onSubmit} disabled={firstEdMaxAmount < 2}>
          {'Continue'}
        </SubmitButton>
      </Wrapper>
    </FadeIn>
  );
};

export default AmountForm;
