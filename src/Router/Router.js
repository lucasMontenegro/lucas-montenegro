import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { MuiThemeProvider } from '@material-ui/core/styles';

import theme from './theme';
import AppBar from './AppBar';
import HomePage from './HomePage';
import TodoList from '../TodoList';
//import JsonEditor from '../NewJsonEditor';

const Router = () => (
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <div>
        <AppBar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/todo" component={TodoList} />
          {/**}
          <Route exact path="/json-editor" component={JsonEditor} />
          {/**/}
        </Switch>
      </div>
    </MuiThemeProvider>
  </BrowserRouter>
);

export default Router;
