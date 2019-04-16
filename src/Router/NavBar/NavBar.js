import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { LinkContainer } from 'react-router-bootstrap';
import Spinner from '../Spinner';
import LanguageDropDown from './LanguageDropDown';

export const PureNavBar = ({ t }) => (
  <Navbar bg="light">
    <LinkContainer exact to="/">
      <Navbar.Brand>Lucas Montenegro</Navbar.Brand>
    </LinkContainer>
    <Nav className="mr-auto">
      <Nav.Item>
        <LinkContainer exact to="/my-projects">
          <Nav.Link>{t('myProjects.title')}</Nav.Link>
        </LinkContainer>
      </Nav.Item>
    </Nav>
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
