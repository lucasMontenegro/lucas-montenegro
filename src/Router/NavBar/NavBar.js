import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import Spinner from '../Spinner';
import { Switch, Route } from "react-router-dom";

const routes = {
  '/': {
    exact: true,
    title: 'Lucas Montenegro'
  },
  '/todo': {
    exact: true,
    title: 'Todo List'
  }
};
const paths = Object.keys(routes);

const TitleSwitch = ({ t }) => {
  const children = paths.map(path => {
    const { exact, title, i18n } = routes[path];
    return (
      <Route
        key={path}
        exact={exact}
        path={path}
        component={() => title || (i18n ? t(i18n) : 'title')}
        />
    );
  });
  return <Switch>{children}</Switch>;
}

export const PureNavBar = ({ t }) => (
  <div id="TitleSwitch"><TitleSwitch t={t} /></div>
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
