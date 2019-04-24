import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import AppBar from './AppBar';
import HomePage from './HomePage';
import TodoList from '../TodoList';
//import JsonEditor from '../NewJsonEditor';

const Router = () => (
  <BrowserRouter>
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
  </BrowserRouter>
);

export default Router;
