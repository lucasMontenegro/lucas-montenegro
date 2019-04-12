import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

import NavBar from './NavBar';
import HomePage from './HomePage';
import TodoList from '../TodoList';
import JsonEditor from '../JsonEditor';

export const PureRouter = () => (
  <BrowserRouter>
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/todo" component={TodoList} />
        <Route exact path="/json-editor" component={JsonEditor} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default PureRouter;
