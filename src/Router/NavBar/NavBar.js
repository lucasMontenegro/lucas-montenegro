import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';

import Navbar from 'react-bootstrap/Navbar';

import { LinkContainer } from 'react-router-bootstrap';
import Spinner from '../Spinner';
import LanguageDropDown from './LanguageDropDown';
import ProjectsDropDown from './ProjectsDropDown';

export const PureNavBar = ({ t }) => (
  <Navbar bg="light">
    <LinkContainer exact to="/">
      <Navbar.Brand>Lucas Montenegro</Navbar.Brand>
    </LinkContainer>
    <ProjectsDropDown />
    <div className="mr-auto"></div>
    <LanguageDropDown />
  </Navbar>
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
