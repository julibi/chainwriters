import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { FadeIn, Wrapper, InputDescription } from '../../pages/create';
import ActionButton from '../ActionButton';
import InputField from '../InputField';
import { PINK } from '../../themes';
import Title from '../Title';

const InputWrapper = styled.div`
  width: 230px;
`;

interface PriceFormProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  firstEdMintPrice: string;
}

const PriceForm = ({
  onChange,
  onSubmit,
  firstEdMintPrice,
}: PriceFormProps) => {
  return (
    <FadeIn>
      <Wrapper>
        <Title size="m">Starting Price (Matic)</Title>
        <InputDescription>
          The Genesis Edition is sold in a dutch auction. In a dutch auction the
          price keeps going down during a given time – in our case: 24 hours –
          until someone buys. Then the next dutch auction starts, until all
          copies are sold out. Determine the starting price for all your Genesis
          Edition copies in Matic. You will be able to determine the price for
          each new edition that you unlock.
        </InputDescription>
        <Title size="xs" color={PINK} margin="0 0 2rem 0" width="75%">
          Caution: The matic your project earns by selling the NFTs are only
          distributed after an edition sells out. Make sure you choose an
          appropriate price. If an edition does not sell out, the matic earned
          stays locked inside the contract.
        </Title>
        {/* TODO validation so that it is 0.1 and not 0,1 */}
        <InputWrapper>
          <InputField
            error={Number(firstEdMintPrice) < 0.1 && 'At least 0.1 Matic.'}
            onChange={onChange}
            placeholder={'50'}
            value={firstEdMintPrice}
            type="number"
          />
        </InputWrapper>
        <ActionButton
          onClick={onSubmit}
          disabled={Number(firstEdMintPrice) < 0.1}
          loading={false}
          text="Continue"
          margin="1rem 0 0 0"
        />
      </Wrapper>
    </FadeIn>
  );
};

export default PriceForm;
