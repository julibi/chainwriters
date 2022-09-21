import LanguageDetect from 'languagedetect';

type LanguageProbability = [string, number];

export const detectLanguage = (input: string) => {
  const lngDetector = new LanguageDetect();
  let result: LanguageProbability[];
  if (input) {
    result = lngDetector.detect(input);
    if (result?.length && result[0][1] > 0.2) {
      // we want to treat "pidgin" like english - coz could also just be slang/internat language
      if (result[0][0] === 'pidgin') {
        return ['english', result[0][1]];
      }
      return result[0];
    } else {
      return undefined;
    }
  }
  return undefined;
};

export const getDetectableLanguages = () => {
  const lngDetector = new LanguageDetect();
  return lngDetector.getLanguages();
};
