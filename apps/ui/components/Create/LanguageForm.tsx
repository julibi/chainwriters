import React, { useMemo, useState } from 'react';
import {
  FadeIn,
  Wrapper,
  InputName,
  SubmitButton,
  InputDescription,
} from '../../pages/create';
import {
  getDetectableLanguages,
  detectLanguage,
} from '../../utils/detectLanguage';
import ActionButton from '../ActionButton';
import Dropdown from '../Dropdown';
import RichText from './RichText';

interface LanguageFormProps {
  onKeyDown: (val: string) => void;
  onSubmit: () => void;
  onLanguageSet: (val: string) => void;
  language: string;
  text: string;
}

const LanguageForm = ({
  onKeyDown,
  onSubmit,
  onLanguageSet,
  language,
  text,
}: LanguageFormProps) => {
  const [isCorrectLanguage, setIsCorrectLanguge] = useState<boolean>(false);
  const [showTranslationUpload, setShowTranslationUpload] =
    useState<boolean>(false);
  const [showLanguageSelection, setShowLanguageSelection] =
    useState<boolean>(false);
  const isEnglish = useMemo(
    () => detectLanguage(text)[0] === 'english',
    [text]
  );
  const languageOptions = getDetectableLanguages()?.map((item) => ({
    id: item,
    value: item,
    onSelect: () => {
      onLanguageSet(item);
      setShowTranslationUpload(true);
    },
  }));
  console.log({ language });

  return (
    <FadeIn>
      <Wrapper>
        <InputName>Language</InputName>
        <InputDescription>
          {`The original language of your text seems to be ${
            detectLanguage(text)[0]
          }. Is that correct?`}
        </InputDescription>
        {!showLanguageSelection && !showTranslationUpload && (
          <div>
            <ActionButton
              onClick={() => setShowLanguageSelection(true)}
              text="No"
              disabled={false}
              loading={false}
            />
            <ActionButton
              onClick={() => {
                if (isEnglish) {
                  onSubmit();
                } else {
                  setShowTranslationUpload(true);
                }
              }}
              text="Correct"
              disabled={false}
              loading={false}
            />
          </div>
        )}
        {showLanguageSelection && (
          <div>
            <Dropdown options={languageOptions} placeholder="Language" />
          </div>
        )}
        {language !== 'english' && showTranslationUpload && (
          <RichText onKeyDown={(val) => onKeyDown(val)} />
        )}
      </Wrapper>
    </FadeIn>
  );
};

export default LanguageForm;
