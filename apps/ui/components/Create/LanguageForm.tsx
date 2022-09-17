import { capitalizeFirstLetter } from '../../utils/capitalizestring';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { FadeIn, InputName, InputDescription } from '../../pages/create';
import {
  getDetectableLanguages,
  detectLanguage,
} from '../../utils/detectLanguage';
import ActionButton from '../ActionButton';
import Dropdown from '../Dropdown';
import RichText from './RichText';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  align-items: center;
  min-height: 200px;
`;

const RichTextWrapper = styled.section`
  margin-block-start: 3rem;
`;

const Text = styled.p`
  display: inline-block;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FlexRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LanguageSelection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
`;

interface LanguageFormProps {
  onKeyDown: (val: string) => void;
  onSubmit: () => void;
  onLanguageSet: (val: string) => void;
  language: string;
  text: string;
  translation: string;
}

const LanguageForm = ({
  onKeyDown,
  onSubmit,
  onLanguageSet,
  language,
  text,
  translation,
}: LanguageFormProps) => {
  const [showTranslationUpload, setShowTranslationUpload] =
    useState<boolean>(false);
  const [showLanguageSelection, setShowLanguageSelection] =
    useState<boolean>(false);
  const isEnglish = useMemo(
    () => detectLanguage(text)?.[0] === 'english',
    [text]
  );
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
                  // TODO: if it is not english, user should be able to claim it is english
                  if (isEnglish) {
                    onLanguageSet('English');
                    onSubmit();
                  } else {
                    onLanguageSet(
                      detectLanguage(text)
                        ? detectLanguage(text)[0].toString()
                        : 'Other'
                    );
                    setShowTranslationUpload(true);
                  }
                }}
                text="Correct"
                disabled={false}
                loading={false}
                margin="1rem 0 0 0"
              />
            </FlexRow>
          </FlexColumn>
        )}
        {showLanguageSelection && !language && (
          <LanguageSelection>
            <Text>Please choose the language.</Text>
            <Dropdown options={languageOptions} placeholder="Language" />
          </LanguageSelection>
        )}
        {language !== 'english' && showTranslationUpload && (
          <>
            <Text>
              If available, provide an English translation for your original
              text.
            </Text>
            <RichTextWrapper>
              <RichText onKeyDown={(val) => onKeyDown(val)} />
            </RichTextWrapper>
            <FlexRow>
              <ActionButton
                onClick={() => onSubmit()}
                text="Later"
                disabled={false}
                loading={false}
                margin="1rem 1rem 0 0"
                color="#fff"
              />
              <ActionButton
                onClick={() => onSubmit()}
                text="Use this translation"
                disabled={translation.trim().length < 1}
                loading={false}
                margin="1rem 0 0 0"
              />
            </FlexRow>
          </>
        )}
      </Wrapper>
    </FadeIn>
  );
};

export default LanguageForm;
