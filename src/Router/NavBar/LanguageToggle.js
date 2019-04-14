import React, { Suspense } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import supportedLanguages from './supported-languages.json';
import { palette } from '../../nuts-and-bolts';

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

const Select = styled.select`
  margin: 0 0.5ch;
  border: 0;
  padding: 0.75em 2ch;
  border-radius: 2px;
  color: ${palette.gray.contrast}
  background-color: ${palette.gray.normal};
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;

  :hover {
    background-image: linear-gradient(transparent,rgba(0,0,0,.05) 40%,rgba(0,0,0,.1));
  }

  > option {
    font-weight: normal;
  }
`;

const languageList = Object.keys(supportedLanguages);

export const PureLanguageToggle = ({ currentLang, setLang }) => {
  const options = languageList.map(lang => (
    <option key={lang} value={lang}>{supportedLanguages[lang]}</option>
  ));
  return (
    <Wrapper>
      <StyledIcon icon={['fas', 'language']} />
      <Select value={currentLang()} onChange={setLang}>
        {options}
      </Select>
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
