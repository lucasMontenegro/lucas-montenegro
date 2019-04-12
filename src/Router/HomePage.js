import React, { Suspense } from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import Spinner from './Spinner';

export const PureHomePage = ({ t }) => (
  <div>
    <h3>{t('title')}</h3>
    <p>
      I am a self-taught, junior Web Developer, currently building this
      website as a learning project. Read more in the <Link to="/about">
      About Page</Link>.
    </p>
    <nav>
      <h4>Apps</h4>
      <ul>
        <li>
          <Link to="/todo">Todo List</Link>
        </li>
        <li>
          <Link to="/json-editor">JSON Editor</Link>
        </li>
      </ul>
    </nav>
  </div>
);

export const LazyHomePage = () => {
  const { t } = useTranslation();
  return <PureHomePage t={t} />
}

const HomePage = () => (
  <Suspense fallback={<Spinner />}>
    <LazyHomePage />
  </Suspense>
);

export default HomePage;
