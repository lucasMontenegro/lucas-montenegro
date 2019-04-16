import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import supportedLanguages from './supported-languages.json';

const languageList = Object.keys(supportedLanguages);

export const PureLanguageDropDownNew = ({ setLang }) => {
  const items = languageList.map(lang => (
    <Dropdown.Item key={lang} eventKey={lang}>
      {supportedLanguages[lang]}
    </Dropdown.Item>
  ));
  return (
    <Dropdown onSelect={setLang}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        <FontAwesomeIcon
          icon={['fas', 'language']}
          style={{ fontSize: '1.5em' }}
        />
      </Dropdown.Toggle>
      <Dropdown.Menu>{items}</Dropdown.Menu>
    </Dropdown>
  );
}

export const LazyLanguageDropDownNew = () => {
  const { i18n } = useTranslation();
  const setLang = lang => i18n.changeLanguage(lang);
  return <PureLanguageDropDownNew setLang={setLang} />;
}

const LanguageDropDownNew = () => (
  <Suspense fallback={<span>...</span>}>
    <LazyLanguageDropDownNew />
  </Suspense>
);

export default LanguageDropDownNew;
