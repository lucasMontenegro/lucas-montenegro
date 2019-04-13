import React, { Suspense } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import supportedLanguages from './supported-languages.json';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & > * {
    margin: 0.25ch;
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 2em;
`;

const languageList = Object.keys(supportedLanguages);

export const PureLanguageToggle = ({ currentLang, setLang }) => {
  const options = languageList.map(lang => (
    <option key={lang} value={lang}>{supportedLanguages[lang]}</option>
  ));
  return (
    <Wrapper>
      <StyledIcon icon={['fas', 'language']} />
      <select value={currentLang()} onChange={setLang}>
        {options}
      </select>
    </Wrapper>
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
