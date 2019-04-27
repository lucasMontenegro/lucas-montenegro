import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import store from './store';
import { actions } from './state';
import Nav from './Nav';
import Title from './Title';

export default function ({ routes }) {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Fragment>
            <CssBaseline />
            <Nav />
            <Title />
            <Switch>
              {routes.map(Cmp => (
                <Route
                  {...Cmp.route}
                  key={Cmp.name}
                  component={undefined}
                  children={undefined}
                  render={props => {
                    store.dispatch(actions.setTitle(Cmp.title));
                    return <Cmp {...props} />;
                  }}
                />
              ))}
            </Switch>
          </Fragment>
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
  );
}
