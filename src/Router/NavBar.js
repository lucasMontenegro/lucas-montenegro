import React, { Suspense } from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import Spinner from './Spinner';

const supportedLanguages = ['en', 'es'];

export const PureNavBar = ({ setLang }) => {
  const langButtons = supportedLanguages.map(lang => (
    <li key={lang}>
      <button onClick={() => setLang(lang)}>{lang}</button>
    </li>
  ));
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {langButtons}
      </ul>
    </nav>
  );
}

export const LazyNavBar = () => {
  const { i18n } = useTranslation();
  const setLang = lang => i18n.changeLanguage(lang);
  return <PureNavBar setLang={setLang} />;
}

const NavBar = () => (
  <Suspense fallback={<Spinner />}>
    <LazyNavBar />
  </Suspense>
);

export default NavBar;
