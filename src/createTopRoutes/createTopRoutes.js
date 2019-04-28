import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import appFrame from './appFrame';
import in9alPage from './in9alPage';

function createTopRoutes (l10n) {
  const _Route = ({ path, render }) => (
    <Route
      key={path}
      path={path}
      render={appFrame(render)}
    />
  );
  const _Switch = ({ lang404, children }) => {
    const path = '/language-not-found';
    return (
      <Switch>
        {children}
        <Route
          key={path}
          path={path}
          render={in9alPage(lang404)}
        />
        <Redirect key={path + '-redirect'} to={path} />
      </Switch>
    );
  }
  return l10n(_Switch, _Route);
}

export default createTopRoutes;
