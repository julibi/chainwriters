import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import {
  FadeIn,
  Wrapper,
  InputName,
  InputDescription,
} from '../../pages/create';
import ActionButton from '../ActionButton';
import InputField from '../InputField';

const InputWrapper = styled.div`
  width: 230px;
`;

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
        <InputWrapper>
          <InputField
            value={firstEdMaxAmount}
            onChange={onChange}
            placeholder={'2000'}
            error={
              (firstEdMaxAmount > 1000 || firstEdMaxAmount < 10) &&
              'Min 10, max 1000.'
            }
          />
        </InputWrapper>
        <ActionButton
          onClick={onSubmit}
          disabled={firstEdMaxAmount > 1000 || firstEdMaxAmount < 10}
          text="Continue"
          loading={false}
          margin="1rem 0 0 0"
        />
      </Wrapper>
    </FadeIn>
  );
};

export default AmountForm;
