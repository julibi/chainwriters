import React, { ChangeEvent, useMemo, useState } from 'react'
import styled from 'styled-components'
import InputField from '../InputField'
import Loading from '../Loading'
import {
  FadeIn,
  Wrapper,
  InputName,
  InputDescription,
  Contributor
} from '../../pages/create';
import {
  BaseButton,
  BASE_BORDER_RADIUS,
  BASE_BOX_SHADOW,
  BG_NORMAL,
  INSET_BASE_BOX_SHADOW,
  PINK,
  PLAIN_WHITE,
} from '../../themes'
import validateAddress from '../../utils/validateAddress'
import { truncateAddress } from '../WalletIndicator';

const ContribList = styled.ul`
  padding: 0;
  list-style-type: none;
  width: 100%;
`;

const ContribItem = styled.li`
  display: flex;
  justify-content: space-between;
`;

const SpecialShare = styled.span`
  width: 100%;
  justify-content: space-between;
  display: flex;
  margin-block-end: 1rem;
`;

const ContribsError = styled.div`
  color: ${PINK};
  margin-block-end: 2rem;
  text-align: center;
`;

const SubmitButton = styled(BaseButton)`
  font-family: 'Roboto Mono';
  text-transform: uppercase;
  text-align: center;
  color: ${PLAIN_WHITE};
  background-color: ${BG_NORMAL};
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${BASE_BOX_SHADOW};
  padding: 1rem;

  :hover {
    cursor: pointer;
  }

  :active {
    box-shadow: ${INSET_BASE_BOX_SHADOW};
  }

  :disabled {
    color: grey;

    :hover {
      cursor: default;
    }
  }
`;

const AddContribButton = styled(SubmitButton)`
  width: 100%;
  margin-block-end: 2rem;
`;

const CTAContainer = styled.div`
  padding: 1rem;
`;

const ContribInputContainer = styled.div`
  width: 325px;
  margin-block-end: 1rem;
  display: flex;
  flex-direction: column;
`;

const FlexContainer = styled.div`
  display: flex;
`;

const ContribButtonContainer = styled(FlexContainer)`
  justify-content: space-between;
`;

interface ContributorsFormProps {
  contributors: any;
  contributorList: Contributor[];
  loading: boolean;
  onChange: (index: number, key: string, val: string | number) => void;
  onNextStep: () => void;
  onSubmit: () => void;
}

const ContributorsForm = ({
  contributors,
  contributorList,
  loading,
  onChange,
  onNextStep,
  onSubmit
}: ContributorsFormProps) => {
  const [formsAmount, setFormsAmount] = useState(1);
  const shareSelf = useMemo(() => {
    let initShareSelf = 85;
    if (contributorList.length > 0) {
      for (let i = 0; i < contributorList.length; i++) {
        initShareSelf = initShareSelf - contributorList[i].share;
      }
    }
    return initShareSelf;
  }, [contributorList]);
  const renderForm = (idx: number) => {
    return (
      <ContribInputContainer>
        <InputField
          label={'Address:'}
          disabled={loading}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onChange(idx, 'address', e.target.value);
          }}
          placeholder={'0x123'}
          value={contributors[idx]?.address}
          error={
            contributors[idx].address.length > 0 &&
            !validateAddress(contributors[idx].address) &&
            'Address not valid.'
          }
        />
        <InputField
          label={'Share in %:'}
          disabled={loading}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const inputVal = Number(e.target.value.replace(/[^0-9]/g, ''));
            onChange(idx, 'share', inputVal);
          }}
          placeholder={'10%'}
          value={contributors[idx].share}
        />
        <InputField
          label={'Role:'}
          disabled={loading}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onChange(idx, 'role', e.target.value);
          }}
          placeholder={'0x123'}
          value={contributors[idx].role}
        />
      </ContribInputContainer>
    );
  };

  return (
    <FadeIn>
      <Wrapper>
        <InputName>CONTRIBUTORS</InputName>
        <InputDescription>
          {`Do you want to set contributors like Co-Authors, Editors, Translators, Cover Artists etc.?
          You can input their addresses and roles and most importantly what share of the funds they will receive, once the Genesis Edition sells out.
          Each share should be a number between 0 and 85. 
          You can specify up to 3. Keep in mind that the total of shares will be deducted from you own share.
          15% are always going to the foundation.
          So a contributor with a share of 10, will receive 10% of the funds.
          --> editor is getting 10%, foundation 15% you will be left with 75%.
          WARNING: This is irreversible.`}
        </InputDescription>
        <CTAContainer>
          {contributorList.length ? (
            <ContribList>
              {contributorList.map((item, idx) => (
                <div key={idx}>
                  <ContribItem>
                    <span>Contributor {idx + 1}:</span>
                    <span>{truncateAddress(item.address)}</span>
                  </ContribItem>
                  <ContribItem>
                    <span>Share:</span>
                    <span>{item.share} %</span>
                  </ContribItem>
                  <ContribItem>
                    <span>Role:</span>
                    <span>
                      {item.role.length > 0 ? item.role : 'Unknown'}
                    </span>
                  </ContribItem>
                </div>
              ))}
            </ContribList>
          ) : null}
          <SpecialShare>
            <span>Moonlit Foundation share:</span>
            <span>15 %</span>
          </SpecialShare>
          <SpecialShare>
            <span>Your share:</span>
            <span>{shareSelf} %</span>
          </SpecialShare>
          {renderForm(1)}
          {formsAmount >= 2 && renderForm(2)}
          {formsAmount === 3 && renderForm(3)}
          {shareSelf < 0 ? (
            <ContribsError>
              <span>{'Too many shares for contributor(s).'}</span>
              <br />
              <span>{'Total cannot be higher than 100.'}</span>
            </ContribsError>
          ) : (
            ''
          )}
          <AddContribButton
            disabled={
              contributorList.length < 1 ||
              contributorList.length === 3 ||
              contributorList.length < formsAmount ||
              shareSelf < 1
            }
            onClick={() => setFormsAmount(formsAmount + 1)}
          >
            + Add More
          </AddContribButton>
          <ContribButtonContainer>
            <SubmitButton
              style={{ marginInlineEnd: '1rem' }}
              onClick={onNextStep}
              disabled={loading}
            >
              {contributorList.length > 0 ? 'Continue' : 'Skip'}
            </SubmitButton>
            <SubmitButton
              onClick={onSubmit}
              disabled={
                loading ||
                contributorList.length >= 3 ||
                contributorList.length < 1 ||
                shareSelf < 1
              }
              style={{ minWidth: '182px' }}
            >
              {loading ? (
                <Loading height={20} dotHeight={20} />
              ) : (
                'Set Contributors'
              )}
            </SubmitButton>{' '}
          </ContribButtonContainer>
        </CTAContainer>
      </Wrapper>
    </FadeIn>
  );
}

export default ContributorsForm