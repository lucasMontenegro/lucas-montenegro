import React from 'react';
import { Switch, Route } from "react-router-dom";
import { withTranslation } from 'react-i18next';

const routes = {
  '/': {
    exact: true,
    title: 'Lucas Montenegro',
  },
  '/todo': {
    exact: true,
    i18n: 'myProjects.apps.todo.title',
  }
};
const paths = Object.keys(routes);

const PureTitle = ({ t }) => {
  const children = paths.map(path => {
    const { exact, title, i18n } = routes[path];
    const Text = title ? (() => title)
      : i18n ? (() => t(i18n))
      : undefined;
    return (
      <Route
        key={path}
        exact={exact}
        path={path}
        component={Text}
        />
    );
  });
  return <Switch>{children}</Switch>;
}

const LazyTitle = withTranslation()(PureTitle);

export default LazyTitle;
