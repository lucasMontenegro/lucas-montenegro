import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';

import { LocalLink } from '../nuts-and-bolts';
import Spinner from './Spinner';

export const PureMyProjects = ({ t }) => (
  <main>
    <header><h3>{t('myProjects.title')}</h3></header>
    <p>
      {t('myProjects.description')}
    </p>
      <ul>
        <li>
          <LocalLink to="/todo">
            {t('myProjects.apps.todo.title')}
          </LocalLink>
        </li>
        <li>
          <LocalLink to="/json-editor">
            {t('myProjects.apps.jsonEditor.title')}
          </LocalLink>
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
