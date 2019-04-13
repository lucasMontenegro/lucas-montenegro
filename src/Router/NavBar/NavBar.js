import React, { Suspense } from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import LanguageToggle from './LanguageToggle';
import Spinner from '../Spinner';

export const PureNavBar = ({ t }) => (
  <nav>
    <ul>
      <li>
        <Link to="/">Lucas Montenegro</Link>
      </li>
      <li>
        <Link to="/my-projects">{t('myProjects.title')}</Link>
      </li>
      <li>
        <LanguageToggle />
      </li>
    </ul>
  </nav>
);

export const LazyNavBar = () => {
  const { t } = useTranslation();
  return <PureNavBar t={t} />
}

const NavBar = () => (
  <Suspense fallback={<Spinner />}>
    <LazyNavBar />
  </Suspense>
);

export default NavBar;
