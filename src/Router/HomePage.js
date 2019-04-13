import React, { Suspense } from 'react';
import { Link } from "react-router-dom";
import { useTranslation, Trans } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Spinner from './Spinner';

export const PureHomePage = ({ t }) => (
  <main>
    <section>
      <header><h3>{t('home.welcome.header')}</h3></header>
      <p>
        {t('home.welcome.hi')}
      </p>
      <p>
        <Trans i18nKey="home.welcome.thisWebsite">
          start
          <Link to="/my-projects">link</Link>
          end
        </Trans>
      </p>
    </section>
    <section>
      <header><h3>{t('home.skills.title')}</h3></header>
      <h4>Front-end</h4>
      <ul>
        <li>HTML5</li>
        <li>CSS</li>
        <li>JavaScript</li>
        <li>React + Redux</li>
      </ul>
      <h4>Back-end</h4>
      <ul>
        <li>NodeJS</li>
        <li>ExpressJS</li>
        <li>MongoDB (node-mongodb-native)</li>
        <li>PostgreSQL (pg-promise)</li>
      </ul>
      <h4>Testing</h4>
      <ul>
        <li>Unit Testing</li>
        <li>Mocha + Chai</li>
        <li>Jest</li>
      </ul>
      <h4>{t('home.skills.tools.title')}</h4>
      <ul>
        <li>Git</li>
        <li>Vagrant</li>
        <li>Postman</li>
        <li>Webpack</li>
      </ul>
    </section>
    <section>
      <header><h3>{t('home.contact.title')}</h3></header>
      <ul>
        <li>
          <a href="https://www.linkedin.com/in/lucas-montenegro-1b191915a/">
            <FontAwesomeIcon icon={['fab', 'linkedin']} />
            Linkedin
          </a>
        </li>
        <li>
          <a href="https://github.com/lucasMontenegro/">
            <FontAwesomeIcon icon={['fab', 'github']} />
            GitHub
          </a>
        </li>
      </ul>
    </section>
  </main>
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
