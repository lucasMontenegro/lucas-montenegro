import React, { Suspense } from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import Spinner from './Spinner';

const NavBar = () => (
  <Suspense fallback={<Spinner />}>
    <Bar />
  </Suspense>
);

const Bar = () => {
  const { i18n } = useTranslation();

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <button onClick={() => changeLanguage('en')}>en</button>
        </li>
        <li>
          <button onClick={() => changeLanguage('es')}>es</button>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
