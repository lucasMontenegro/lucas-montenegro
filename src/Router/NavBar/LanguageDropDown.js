import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import supportedLanguages from './supported-languages.json';

const languageList = Object.keys(supportedLanguages);

export const PureLanguageDropDown = ({ setLang }) => {
  const items = languageList.map(lang => (
    <Dropdown.Item key={lang} eventKey={lang}>
      {supportedLanguages[lang]}
    </Dropdown.Item>
  ));
  return (
    <Dropdown onSelect={setLang}>
      <Dropdown.Toggle variant="success" id="language-selection-dropdown">
        <FontAwesomeIcon
          icon={['fas', 'language']}
          style={{ fontSize: '1.5em' }}
        />
      </Dropdown.Toggle>
      <Dropdown.Menu>{items}</Dropdown.Menu>
    </Dropdown>
  );
}

export const LazyLanguageDropDown = () => {
  const { i18n } = useTranslation();
  const setLang = lang => i18n.changeLanguage(lang);
  return <PureLanguageDropDown setLang={setLang} />;
}

const LanguageDropDown = () => (
  <Suspense fallback={<span>...</span>}>
    <LazyLanguageDropDown />
  </Suspense>
);

export default LanguageDropDown;
