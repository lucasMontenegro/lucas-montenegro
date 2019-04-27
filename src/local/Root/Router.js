import React from 'react';
import { Switch, Route } from "react-router-dom";
import store from './store';
import { actions } from './state';

export default function Router ({ render }) {
  return (
    <Switch>
      {Object.keys(render).map(key => {
        const item = render[key];
        return (
          <Route
            {...item.route}
            key={key}
            component={undefined}
            children={undefined}
            render={props => {
              store.dispatch(actions.setTitle(item.title));
              return <item.Component {...props} />;
            }}
          />
        );
      })}
    </Switch>
  );
}
