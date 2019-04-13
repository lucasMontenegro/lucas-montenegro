import React, { Suspense } from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import Spinner from './Spinner';

export const PureMyProjects = ({ t }) => (
  <main>
    <header><h3>{t('myProjects.title')}</h3></header>
    <p>
      {t('myProjects.description')}
    </p>
      <ul>
        <li>
          <Link to="/todo">{t('myProjects.apps.todo.title')}</Link>
        </li>
        <li>
          <Link to="/json-editor">
            {t('myProjects.apps.jsonEditor.title')}
          </Link>
        </li>
      </ul>
  </main>
);

export const LazyMyProjects = () => {
  const { t } = useTranslation();
  return <PureMyProjects t={t} />
}

const MyProjects = () => (
  <Suspense fallback={<Spinner />}>
    <LazyMyProjects />
  </Suspense>
);

export default MyProjects;
