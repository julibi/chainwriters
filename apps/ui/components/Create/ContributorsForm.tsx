import React, { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import styled from 'styled-components';
import InputField from '../InputField';
import Loading from '../Loading';
import {
  FadeIn,
  Wrapper,
  InputName,
  InputDescription,
} from '../../pages/create';
import {
  BaseButton,
  BASE_BORDER_RADIUS,
  BASE_BOX_SHADOW,
  BG_NORMAL,
  PINK,
  PLAIN_WHITE,
} from '../../themes';
import validateAddress from '../../utils/validateAddress';
import { truncateAddress } from '../WalletIndicator';
import { Contributor } from '../../providers/projects-provider/projects-provider.types';
import ActionButton from '../ActionButton';

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
  text-transform: uppercase;
  text-align: center;
  color: ${PLAIN_WHITE};
  background-color: ${BG_NORMAL};
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${BASE_BOX_SHADOW};
  padding: 1rem;

  :disabled {
    color: grey;
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
  contributorsList: Contributor[];
  loading: boolean;
  onChange: (index: number, key: string, val: string | number) => void;
  onNextStep?: () => void;
  onSubmit: (e: FormEvent<HTMLButtonElement>) => void;
}

const ContributorsForm = ({
  contributors,
  contributorsList,
  loading,
  onChange,
  onNextStep,
  onSubmit,
}: ContributorsFormProps) => {
  const [formsAmount, setFormsAmount] = useState(1);
  const shareSelf = useMemo(() => {
    let initShareSelf = 85;
    if (contributorsList?.length > 0) {
      for (let i = 0; i < contributorsList.length; i++) {
        initShareSelf = initShareSelf - Number(contributorsList[i].share);
      }
    }
    return initShareSelf;
  }, [contributorsList]);
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
          placeholder={'e.g. Editor, Translator, Marketing'}
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
          {`You can specify up to 3 contributors, like Co-Authors, Editors, Translators, Cover Artists etc.
          Shares will be distributed after an edition sells out.  
          Keep in mind that the total of shares will be deducted from you own share.
          15% are always going to the Moonpage project.`}
        </InputDescription>
        <CTAContainer>
          {contributorsList.length ? (
            <ContribList>
              {contributorsList.map((item, idx) => (
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
                    <span>{item.role.length > 0 ? item.role : 'Unknown'}</span>
                  </ContribItem>
                </div>
              ))}
            </ContribList>
          ) : null}
          <SpecialShare>
            <span>Moonpage share:</span>
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
              loading ||
              contributorsList.length < 1 ||
              contributorsList.length === 3 ||
              contributorsList.length < formsAmount ||
              shareSelf < 1
            }
            onClick={() => setFormsAmount(formsAmount + 1)}
          >
            + Add More
          </AddContribButton>
          <ContribButtonContainer>
            {onNextStep && (
              <SubmitButton
                style={{ marginInlineEnd: '1rem' }}
                onClick={onNextStep}
                disabled={loading}
              >
                {contributorsList.length > 0 ? 'Continue' : 'Skip'}
              </SubmitButton>
            )}
            <ActionButton
              onClick={onSubmit}
              disabled={
                loading ||
                contributorsList.length > 3 ||
                contributorsList.length < 1 ||
                shareSelf < 1
              }
              loading={loading}
              text='Set Contributors'
              margin='0'
              width='100%'
            />     
          </ContribButtonContainer>
        </CTAContainer>
      </Wrapper>
    </FadeIn>
  );
};

export default ContributorsForm;
