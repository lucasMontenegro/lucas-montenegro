import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import supportedLanguages from './supported-languages.json';

const languageList = Object.keys(supportedLanguages);

export const PureLanguageToggle = ({ currentLang, setLang }) => {
  const options = languageList.map(lang => (
    <option key={lang} value={lang}>{supportedLanguages[lang]}</option>
  ));
  return (
    <select value={currentLang()} onChange={setLang}>
      {options}
    </select>
  );
}

const LazyLanguageToggle = () => {
  const { i18n } = useTranslation();
  const properties = {
    setLang (e) {
      i18n.changeLanguage(e.target.value);
    },
    currentLang () {
      return i18n.languages[0];
    }
  };
  return <PureLanguageToggle {...properties} />;
}

const LanguageToggle = () => (
  <Suspense fallback={<span>...</span>}>
    <LazyLanguageToggle />
  </Suspense>
);

export default LanguageToggle;
