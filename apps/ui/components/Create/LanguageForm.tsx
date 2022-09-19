import { capitalizeFirstLetter } from '../../utils/capitalizestring';
import React, { useState } from 'react';
import styled from 'styled-components';
import { FadeIn, InputName, InputDescription } from '../../pages/create';
import {
  getDetectableLanguages,
  detectLanguage,
} from '../../utils/detectLanguage';
import ActionButton from '../ActionButton';
import Dropdown from '../Dropdown';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  align-items: center;
  min-height: 300px;
`;

const Text = styled.p`
  display: inline-block;
  margin-block-end: 2rem;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FlexRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LanguageSelection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-block-end: 1rem;
`;

interface LanguageFormProps {
  onSubmit: () => void;
  onLanguageSet: (val: string) => void;
  language: string;
  text: string;
}

const LanguageForm = ({
  onSubmit,
  onLanguageSet,
  language,
  text,
}: LanguageFormProps) => {
  const [showTranslationUpload, setShowTranslationUpload] =
    useState<boolean>(false);
  const [showLanguageSelection, setShowLanguageSelection] =
    useState<boolean>(false);
  const languageOptions = ['other', ...getDetectableLanguages()]
    ?.map((item) => capitalizeFirstLetter(item))
    ?.map((item) => ({
      id: item,
      value: item,
      onSelect: () => {
        onLanguageSet(item);
        setShowTranslationUpload(true);
      },
    }));

  return (
    <FadeIn>
      <Wrapper>
        <InputName>Language</InputName>
        {!showLanguageSelection && !showTranslationUpload && (
          <FlexColumn>
            <InputDescription>
              {`The original language of your text seems to be ${
                detectLanguage(text) ? detectLanguage(text)[0] : 'english'
              }. Is that correct?`}
            </InputDescription>
            <FlexRow>
              <ActionButton
                onClick={() => setShowLanguageSelection(true)}
                text="No"
                disabled={false}
                loading={false}
                margin="1rem 1rem 0 0"
                color="#fff"
              />
              <ActionButton
                onClick={() => {
                  onLanguageSet(
                    detectLanguage(text)
                      ? detectLanguage(text)[0].toString()
                      : 'Other'
                  );
                  onSubmit();
                }}
                text="Correct"
                disabled={false}
                loading={false}
                margin="1rem 0 0 0"
              />
            </FlexRow>
          </FlexColumn>
        )}
        {showLanguageSelection && (
          <FlexColumn>
            <LanguageSelection>
              <Text>Please choose the language.</Text>
              <Dropdown
                options={languageOptions}
                placeholder="Language"
                width="230px"
              />
            </LanguageSelection>
            <ActionButton
              onClick={onSubmit}
              text="Next"
              disabled={!language.length}
              loading={false}
              margin="1rem 0 0 0 "
            />
          </FlexColumn>
        )}
      </Wrapper>
    </FadeIn>
  );
};

export default LanguageForm;
