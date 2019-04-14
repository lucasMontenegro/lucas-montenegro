import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from "react-router-dom";
import styled from 'styled-components';

import LanguageToggle from './LanguageToggle';
import Spinner from '../Spinner';
import { palette } from '../../nuts-and-bolts';

const NavBarLink = styled(NavLink).attrs({
  activeClassName: 'active'
})`
  text-decoration: none;
  color: black;

  &.active {
    color: ${palette.green};
  }

  &:hover {
    color: ${palette.lightGreen};
  }
`;

const Nav = styled.nav`
  & * {
    box-sizing: border-box;
  }

  & > ul {
    list-style: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;

    margin: 0;
    border: 0;
    padding: 0;
    height: 3em;

    > li:first-child {
      margin-right: auto;
    }

    > li {
      margin: 0 1ch;
    }
  }
`;

export const PureNavBar = ({ t }) => (
  <Nav>
    <ul>
      <li>
        <NavBarLink exact to="/">Lucas Montenegro</NavBarLink>
      </li>
      <li>
        <NavBarLink exact to="/my-projects">
          {t('myProjects.title')}
        </NavBarLink>
      </li>
      <li>
        <LanguageToggle />
      </li>
    </ul>
  </Nav>
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
