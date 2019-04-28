import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import store from './store';
import Nav from './Nav';
import Title from './Title';
import Counter from './Counter';

export default function Root ({ children }) {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Fragment>
            <CssBaseline />
            <Title />
            <Counter />
            <Nav />
            {children}
          </Fragment>
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
  );
}
