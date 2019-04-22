import React from 'react';
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

const PureTitleSwitch = ({ t }) => {
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

export default PureTitleSwitch;
