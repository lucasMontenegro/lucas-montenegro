import React, { Suspense } from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Spinner from './Spinner';

export const PureHomePage = ({ t }) => (
  <main>
    <section>
      <header><h3>{t('welcome')}</h3></header>
      <p>
        Hi! My name is Lucas Montenegro and I am a self-taught Junior Web
        Developer from Argentina. I started learning programming in 2018 and
        I'm currently looking to get my first software development job.
      </p>
      <p>
        This is my personal website where I host the learning projects I'm
        working on. Take a look at them in the page called
        "<Link to="my-projects">My Projects</Link>".
      </p>
    </section>
    <section>
      <header><h3>My Skills</h3></header>
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
      <h4>Tools</h4>
      <ul>
        <li>Git</li>
        <li>Vagrant</li>
        <li>Postman</li>
        <li>Webpack</li>
      </ul>
    </section>
    <section>
      <header><h3>Contact</h3></header>
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
