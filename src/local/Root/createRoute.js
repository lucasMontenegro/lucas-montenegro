import React, { Fragment } from 'react';
import { Route } from "react-router-dom";

function createRoute (opts) {
  const {
    language,
    localPath,
    i18lPath,
    toLocal,
    toI18l,
    component: Cmp,
  } = opts;

  return props => (
    <Fragment>
      <Route
        {...props}
        exact
        strict={false}
        path={'/' + language + localPath}
        component={Cmp}
      />
      <Route
        {...props}
        exact
        strict={false}
        path={'/' + language + i18lPath}
        render={routeProps => {
          routeProps.history.replace(toLocal(routeProps.location));
          return <Cmp {...routeProps} i18l />;
        }}
      />
    </Fragment>
  );
}
