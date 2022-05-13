import React, { ChangeEvent } from 'react'
import Loading from '../Loading'
import {
  FlexContainer,
  FadeIn,
  Wrapper,
  InputName,
  InputDescription,
  SubmitButton,
} from '../../pages/create';
import InputField from '../InputField'

interface AuthorClaimFormProps {
  loading: boolean;
  authorMintAmount: number;
  firstEdMaxAmount: number;
  onSubmit: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const AuthorClaimForm = ({
  loading,
  authorMintAmount,
  firstEdMaxAmount,
  onSubmit,
  onChange
}: AuthorClaimFormProps) => {
  return (
    <FadeIn>
    <Wrapper>
      <InputName>AMOUNT CLAIMABLE BY YOU</InputName>
      <InputDescription>
        {`You as an author can mint an amount of your project's Genesis Edition NFTs for yourself. 
        Only after minting this amount, can you trigger the public auctions for your first edition.
        Why yould you want more than 1 for yourself? Maybe you want to keep a couple more
        as giveaways in the future to engage with your readers and community?
        Or maybe you want to gift them to co-authors and other contributors? Up to you :)
        `}
      </InputDescription>
      <InputField
        // validation, needs to be smaller than total amount
        disabled={loading}
        error={authorMintAmount >= firstEdMaxAmount && 'Must be smaller than Max Amount.'}
        onChange={onChange}
        placeholder={'6'}
        value={authorMintAmount}
      />
      <FlexContainer>
        <SubmitButton
          onClick={onSubmit}
          disabled={loading || authorMintAmount == 0 || authorMintAmount >= firstEdMaxAmount}
          style={{ minWidth: '182px' }}
        >
          {loading ? <Loading height={20} dotHeight={20} /> : 'Mint'}
        </SubmitButton>
      </FlexContainer>
    </Wrapper>
  </FadeIn>
  )
}

export default AuthorClaimForm