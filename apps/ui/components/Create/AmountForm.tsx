import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { FadeIn, Wrapper, InputDescription } from '../../pages/create';
import ActionButton from '../ActionButton';
import InputField from '../InputField';
import { POP } from '../../themes';
import Title from '../Title';

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
        <Title size="m">Genesis Edition Total Amount</Title>
        <InputDescription>
          The first edition of a work is called Genesis Edition. Holders of a
          Genesis Edition will have special benefits. The Genesis Edition will
          be sold in a reverse auction. Determine its total amount. Keep in mind
          that you can only trigger the sale of a subsequent edition after the
          Genesis Edition has sold out.
        </InputDescription>
        <Title size="xs" color={POP} margin="0 0 2rem 0" width="75%">
          Caution: The matic your project earns by selling the NFTs are only
          distributed after an edition sells out. Make sure you choose an amount
          you are confident of selling. Otherwise the matic earned stays locked
          inside the contract.
        </Title>
        <InputWrapper>
          <InputField
            value={firstEdMaxAmount}
            onChange={onChange}
            placeholder={100}
            error={
              (firstEdMaxAmount > 1000 || firstEdMaxAmount < 10) &&
              'Min 10, max 1000.'
            }
            type="number"
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
